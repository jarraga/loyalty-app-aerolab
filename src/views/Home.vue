<template>
  <!-- LOADING -->
  <div
    class="w-full h-full flex justify-center items-center p-10"
    v-if="state == states.LOADING"
  >⏳ Loading...</div>
  <!-- LOADING -->

  <!-- ERROR -->
  <div
    class="w-full h-full flex flex-col justify-center items-center p-10"
    v-if="state == states.ERROR"
  >
    <p class="mb-4 text-center text-gray-700">💥 Error, check your internet connection and try again</p>
    <Butt color="gray" @click="init">Connect</Butt>
  </div>
  <!-- ERROR -->

  <!-- CONT -->
  <div
    v-show="state == states.READY"
    :class="`grid gap-4 ${$store.state.isMobile ? 'gap-half p-half grid-cols-1 grid-rows-[auto,1fr,auto]' : 'gap-space p-space grid-cols-main overflow-hidden'} h-full`"
  >
    <!-- USER & FILTERS -->
    <Cont v-if="!$store.state.isMobile" class="p-0">
      <img class="h-[150px] object-cover object-right" src="/header.png" alt="header" />
      <div class="p-space bg-gradient-to-b from-[#15DBFF] to-white">
        <p class="text-3xl">{{ $store.state.userName }}</p>
        <p class="mt-4 text-1xl">{{ $store.state.userPoints }} points</p>
      </div>
      <!-- SECTIONS -->
      <div class="grid grid-cols-2 gap-space p-space">
        <Butt full color="blue" @click="getUserHistory">ITEMS</Butt>
        <Butt full color="gray" @click="getUserHistory">HISTORY</Butt>
      </div>
      <!-- SECTIONS -->
      <div class="bg-gradient-to-r from-transparent via-gray-100 to-transparent min-h-[3px]"></div>
      <!-- ORDER -->
      <div class="p-space">
        <p>OrderBy</p>
      </div>
      <!-- ORDER -->
    </Cont>
    <!-- USER & FILTERS -->
    <!-- USER & FILTERS MOBILE -->
    <Cont
      half
      v-if="$store.state.isMobile"
      style="background-image: url('/header.png'); height: fit-content; background-repeat: no-repeat;"
      class="bg-right backdrop-blur-md bg-cover"
    >
      <div class="flex items-center w-full justify-between">
        <p class="text-2xl">{{ $store.state.userName }}</p>
        <p
          class="ml-4 px-3 py-1 rounded-full bg-white bg-opacity-50 backdrop-blur-md"
        >{{ $store.state.userPoints }} points</p>
      </div>
    </Cont>
    <!-- USER & FILTERS MOBILE -->
    <!-- RESULTS -->
    <Scrollable
      :class="`grid grid-rows-results h-full ${$store.state.isMobile ? 'gap-half overflow-y-scroll' : 'gap-space overflow-hidden'}`"
    >
      <!-- GRID -->
      <div
        id="cont"
        ref="cont"
        :style="$store.state.gridStyle"
        :class="`grid w-full h-full ${$store.state.isMobile ? 'gap-half' : 'gap-space'}`"
      >
        <!-- CARDS -->
        <Cont
          hover
          v-for="card in items.slice($store.state.pagination.from, $store.state.pagination.to)"
          :key="card._id"
          class="flex flex-col justify-between relative w-full"
        >
          <p
            class="absolute top-4 left-4 px-2 py-1 bg-gray-50 rounded-full text-gray-400 text-xs uppercase bg-opacity-50 backdrop-blur-sm"
          >{{ card.category }}</p>

          <div
            :class="`flex justify-center flex-grow ${$store.state.isMobile ? 'h-full' : 'h-px'}`"
          >
            <img
              :class="`object-contain ${$store.state.userPoints < card.cost ? 'grayscale opacity-50' : ''}`"
              :src="card.img.url"
              :alt="card.name"
            />
          </div>
          <p
            :class="`${$store.state.userPoints < card.cost ? 'text-gray-700' : 'text-blue-500'} text-lg font-bold`"
          >{{ card.name }}</p>
          <!-- COST & BUTTONS -->
          <div class="grid grid-cols-2 gap-half mt-2">
            <div class="flex items-center mb-2 h-full">
              <img class="h-5 mr-2" src="/coin.svg" alt="points" />
              <p>{{ card.cost }}</p>
              <p
                class="text-xs text-gray-500 ml-4"
              >{{ card.timesRedeemed > 0 ? `Redeemed ${card.timesRedeemed} times` : 'Not yet redeemed' }}</p>
            </div>
            <Butt
              full
              v-if="$store.state.userPoints >= card.cost"
              color="blue"
              @click="redeemItem(card._id, card.cost)"
            >{{ buttonsStates[card._id] ? buttonsStates[card._id] : 'Redeem now' }}</Butt>
            <Butt
              full
              v-if="$store.state.userPoints < card.cost"
              color="gray"
              @click="addMorePoints(card._id, pointsLeft(card.cost))"
            >{{ buttonsStates[card._id] ? buttonsStates[card._id] : `get + ${pointsLeft(card.cost)} points` }}</Butt>
          </div>
          <!-- COST & BUTTONS -->
        </Cont>
        <!-- CARDS -->
      </div>
      <!-- GRID -->
      <!-- PAGINATION -->
      <Pagination />
      <!-- PAGINATION -->
    </Scrollable>
    <!-- RESULTS -->
    <!-- OPTIONS MOBILE -->
    <Cont v-if="$store.state.isMobile" half style="height: fit-content;">OPTIONS</Cont>
    <!-- OPTIONS MOBILE -->
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
import { setDynamicGrid } from '../logic/dynamicGrid'
import Pagination from '../components/Pagination.vue'

export default {
  components: {
    Pagination
  },
  mounted() {
    const cont = document.querySelector('#cont')
    const ro = new ResizeObserver(events => {
      setDynamicGrid(events[0].target)
    })
    ro.observe(cont)
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
      this.buttonsStates[id] = '...redeeming'
      try {
        await redeem(id);
        this.$store.state.userPoints -= cost;
        this.buttonsStates[id] = '😃 Ok!'
        setTimeout(() => {
          this.buttonsStates[id] = null
        }, 1000);
      } catch (error) {
        this.buttonsStates[id] = '💥 Error'
        setTimeout(() => {
          this.buttonsStates[id] = null
        }, 1000);
      }
    },
    async addMorePoints(id, points) {
      this.buttonsStates[id] = '...adding points'
      try {
        const data = await addPoints(points);
        this.$store.state.userPoints = data.newPoints;
        this.buttonsStates[id] = '😃 Ok!'
        setTimeout(() => {
          this.buttonsStates[id] = null
        }, 1000);
      } catch (error) {
        this.buttonsStates[id] = '💥 Error'
        setTimeout(() => {
          this.buttonsStates[id] = null
        }, 1000);
      }
    },
    async init() {
      try {
        const results = await Promise.all([getUserInfo(), getItems()]);

        const itemsObject = {}
        results[1].forEach(item => {
          itemsObject[item._id] = { ...item, redeeming: false, timesRedeemed: 0 }
          this.buttonsStates[item._id] = null
        });

        const user = results[0];
        this.$store.state.userName = user.name;
        this.$store.state.userPoints = user.points;

        // agrego
        user.redeemHistory.forEach(el => {
          itemsObject[el.productId].timesRedeemed++
        })
        const itemsArray = Object.entries(itemsObject).map(([key, item]) => item)
        itemsArray.sort((a, b) => {
          if (a.cost > b.cost) return 1
          else if (a.cost < b.cost) return -1
          return 0
        })
        this.items = itemsArray
        this.$store.state.totalItems = itemsArray.length

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
      buttonsStates: {},
      items: [],

    };
  },
};
</script>