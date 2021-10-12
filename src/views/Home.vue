<template>
  <!-- LOADING -->
  <div class="w-full h-full flex justify-center items-center" v-if="state == states.LOADING">Loading</div>
  <!-- LOADING -->

  <!-- ERROR -->
  <div class="w-full h-full flex justify-center items-center" v-if="state == states.ERROR">Error</div>
  <!-- ERROR -->

  <!-- CONT -->
  <div v-if="state == states.READY" class="grid grid-cols-main gap-4 p-4 overflow-hidden h-full">
    <!-- USER & FILTERS -->
    <div class="w-full bg-white rounded-lg overflow-hidden">
      <img class="h-[150px] object-cover object-right" src="/header.png" alt="header" />
      <div class="p-4">
        <p>User: {{ $store.state.userName }}</p>
        <p>Points: {{ $store.state.userPoints }}</p>
        <Butt color="blue" @click="getUserHistory">get history</Butt>
        <p>OrderBy</p>
      </div>
    </div>
    <!-- USER & FILTERS -->
    <!-- RESULTS -->
    <div v-if="state == states.READY" class="grid grid-cols-4 gap-4 overflow-y-scroll">
      <!-- CARDS -->
      <div v-for="card in items" :key="card._id" class="bg-white rounded-lg p-4">
        <img
          :class="`${$store.state.userPoints < card.cost ? 'grayscale opacity-50' : ''
          }`"
          :src="card.img.url"
          :alt="card.name"
        />
        <p>{{ card.name }}</p>
        <p>{{ card.category }}</p>
        <div>
          <p>{{ card.cost }}</p>
          <!-- <p v-if="$store.state.userPoints < card.cost">
            need {{ card.cost - $store.state.userPoints }} + points
          </p>-->
        </div>
        <Butt
          v-if="$store.state.userPoints >= card.cost"
          color="blue"
          @click="redeemItem(card._id, card.cost)"
        >Reedem</Butt>
        <Butt
          v-if="$store.state.userPoints < card.cost"
          color="gray"
          @click="addMorePoints(pointsLeft(card.cost))"
        >get + {{ pointsLeft(card.cost) }} points</Butt>
      </div>
      <!-- CARDS -->
    </div>
    <!-- RESULTS -->
  </div>
  <!-- CONT -->
</template>

<script>
import {
  getHistory,
  getUserInfo,
  getItems,
  redeem,
  addPoints,
} from "../logic/api";

export default {
  mounted() {
    this.init();
  },
  methods: {
    async getUserHistory() {
      const data = await getHistory();
      //   this.items = data;
      console.log(data);
    },
    pointsLeft(points) {
      const diff = points - this.$store.state.userPoints;
      if (diff >= 5000) return 7500;
      else if (diff >= 1000) return 5000;
      else return 1000;
    },
    async redeemItem(id, cost) {
      const data = await redeem(id);
      if (data) {
        console.log("redeem ok");
        this.$store.state.userPoints -= cost;
      }
    },
    async addMorePoints(points) {
      const data = await addPoints(points);
      console.log(`${points} points added`);
      this.$store.state.userPoints = data.newPoints;
    },
    async init() {
      try {
        const results = await Promise.all([getUserInfo(), getItems()]);

        const user = results[0];
        this.$store.state.userName = user.name;
        this.$store.state.userPoints = user.points;

        this.items = results[1];

        this.state = this.states.READY;
      } catch (error) {
        console.warn("Error getting items");
        console.warn(error);
        this.state = this.states.ERROR;
      }
    },
  },
  data() {
    return {
      state: 1,
      states: {
        LOADING: 1,
        READY: 2,
        ERROR: 3,
      },
      items: [],
    };
  },
};
</script>