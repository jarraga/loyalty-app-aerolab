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
    <SideBar />
    <!-- USER & FILTERS -->

    <!-- RESULTS -->
    <Scrollable
      :reference="'results'"
      id="results"
      :class="`grid grid-rows-results h-full ${$store.state.isMobile ? 'gap-half overflow-y-scroll' : 'gap-space overflow-hidden'}`"
    >
      <!-- GRID -->
      <div
        id="cont"
        :style="$store.state.gridStyle"
        :class="`grid w-full h-full ${$route.name == 'home' ? $store.state.isMobile ? 'gap-half' : 'gap-space' : ''}`"
      >
        <!-- CARDS -->
        <CardItem
          v-if="$route.name == 'home'"
          v-for="card in this.$store.state.items.slice($store.state.pagination.from, $store.state.pagination.to)"
          :key="card._id"
          :info="card"
        />
        <CardHistory
          v-if="$route.name == 'history'"
          v-for="(historyCard, i) in this.$store.state.itemsHistory.slice($store.state.pagination.from, $store.state.pagination.to)"
          :key="historyCard._id + i"
          :info="historyCard"
        />
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
  getUserInfo,
  getItems,
} from "../logic/api";
import { setDynamicGrid } from '../logic/dynamicGrid'
import SideBar from '../components/SideBar.vue'
import CardItem from '../components/CardItem.vue'
import CardHistory from '../components/CardHistory.vue'
import Pagination from '../components/Pagination.vue'

export default {
  components: {
    SideBar,
    CardItem,
    CardHistory,
    Pagination
  },
  mounted() {
    const cont = document.querySelector('#cont')
    const ro = new ResizeObserver(events => {
      setDynamicGrid()
    })
    ro.observe(cont)
    this.init();
  },
  methods: {
    async init() {
      try {
        const results = await Promise.all([getUserInfo(), getItems()]);

        const itemsObject = {}
        this.$store.state.buttonsStates = {}
        results[1].forEach(item => {
          itemsObject[item._id] = { ...item, redeeming: false, timesRedeemed: 0 }
          this.$store.state.buttonsStates[item._id] = null
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
        this.$store.state.items = itemsArray
        this.$store.state.itemsHistory = user.redeemHistory
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
    };
  },
  watch: {
    '$route'(to, from) {
      setDynamicGrid()
    }
  }
};
</script>

<style>
@keyframes fade {
  0% {
    opacity: 0;
    /* transform: scale(0.98); */
  }
  50% {
    /* transform: scale(1.02); */
  }
  100% {
    opacity: 1;
    /* transform: scale(1); */
  }
}
</style>