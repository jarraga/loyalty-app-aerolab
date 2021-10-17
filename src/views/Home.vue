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

  <!-- SIDEBAR OVERLAY -->
  <div
    style="animation: appear .3s;"
    v-if="$store.state.showSideBarMobile"
    class="absolute z-20 p-half h-full"
  >
    <SideBar />
  </div>
  <!-- SIDEBAR OVERLAY -->

  <!-- CONT -->
  <div
    v-show="state == states.READY"
    :class="`grid ${$store.state.isMobile ? 'gap-half p-half grid-cols-1 grid-rows-[auto,1fr,auto]' : 'gap-space p-space grid-cols-main overflow-hidden'} h-full`"
  >
    <!-- USER & FILTERS -->
    <HeaderMobile v-if="$store.state.isMobile" />
    <SideBar v-if="!$store.state.isMobile" />
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
    <Cont
      @click="$store.state.showSideBarMobile = true"
      v-if="$store.state.isMobile"
      half
      style="height: fit-content;"
      class="flex justify-between ring-blue-500 ring-2 ring-opacity-50 ring-inset"
    >
      <div class="flex space-x-2">
        <p class="font-bold">{{ $route.name == 'home' ? 'Items' : 'History' }}</p>
        <p>|</p>
        <p>Order by: {{ $store.state.actualOrderBy }}</p>
      </div>
      <p>☝🏽</p>
    </Cont>
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
import HeaderMobile from '../components/HeaderMobile.vue'
import { orderBy } from '../logic/orderBy'

export default {
  components: {
    SideBar,
    CardItem,
    CardHistory,
    Pagination,
    HeaderMobile
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
      this.state = this.states.LOADING
      try {
        const results = await Promise.all([getUserInfo(), getItems()]);

        const itemsObject = {}
        results[1].forEach(item => {
          itemsObject[item._id] = { ...item, timesRedeemed: 0 }
          this.$store.state.buttonsStates[item._id] = null
        });

        const user = results[0];
        this.$store.state.userName = user.name;
        this.$store.state.userPoints = user.points;

        // add times redeemed
        user.redeemHistory.forEach(el => {
          itemsObject[el.productId].timesRedeemed++
        })

        const itemsArray = Object.entries(itemsObject).map(([key, item]) => item)

        this.$store.state.items = itemsArray
        this.$store.state.itemsHistory = user.redeemHistory
        orderBy('cost')

        // TODO
        this.$store.state.totalItems = itemsArray.length
        this.$store.state.totalHistoryItems = this.$store.state.itemsHistory.length

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
      this.$store.state.showSideBarMobile = false

      if (to.name == 'history') {
        this.$store.state.actualOrderType = 'desc'
        orderBy('createDate')
      } else {
        this.$store.state.actualOrderType = 'asc'
        orderBy('cost')
      }
    }
  }
};
</script>

<style>
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes appear {
  0% {
    opacity: 0;
    top: 25px;
  }
  100% {
    opacity: 1;
    top: 0px;
  }
}
</style>