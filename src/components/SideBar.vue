<template>
    <!--  DESKTOP -->
    <Cont class="p-0 overflow-hidden flex flex-col h-full relative">
        <div
            v-if="$store.state.showSideBarMobile"
            @click="$store.state.showSideBarMobile = false"
            class="absolute top-8 right-8 p-4"
        >✖️</div>

        <img
            v-if="!$store.state.showSideBarMobile"
            class="h-[150px] object-cover object-right"
            src="/header.png"
            alt="header"
        />
        <div class="p-space bg-gradient-to-b from-[#15DBFF] to-white">
            <p class="text-3xl">{{ $store.state.userName }}</p>
            <p class="mt-4 text-1xl">{{ $store.state.userPoints }} points</p>
        </div>
        <!-- SECTIONS -->
        <div class="grid grid-cols-2 gap-space p-space">
            <Butt
                full
                :color="$route.name == 'home' ? 'blue' : 'gray'"
                @click="$router.push({ name: 'home' })"
            >ITEMS</Butt>
            <Butt
                full
                :color="$route.name == 'history' ? 'blue' : 'gray'"
                @click="$router.push({ name: 'history' })"
            >HISTORY</Butt>
        </div>
        <!-- SECTIONS -->
        <div class="bg-gradient-to-r from-transparent via-gray-100 to-transparent min-h-[3px]"></div>
        <div class="h-full p-space overflow-y-scroll">
            <!-- ORDER -->
            <div class="flex flex-col min-h-full">
                <div class="flex-grow">
                    <p>OrderBy</p>
                    <div class="flex flex-wrap -m-1 pt-4 justify-center">
                        <Butt
                            :color="$store.state.actualOrderType == 'asc' ? 'blue' : 'gray'"
                            class="m-1 flex-grow"
                            small
                            @click="changeOrderType('asc')"
                        >asc</Butt>
                        <Butt
                            :color="$store.state.actualOrderType == 'desc' ? 'blue' : 'gray'"
                            class="m-1 flex-grow"
                            small
                            @click="changeOrderType('desc')"
                        >desc</Butt>
                    </div>
                    <!-- SEPARATOR -->
                    <div class="min-h-[1px] max-h-[1px] w-full bg-gray-100 my-4"></div>
                    <!-- SEPARATOR -->
                    <div class="flex flex-wrap -m-1 pt-4">
                        <Butt
                            :color="$store.state.actualOrderBy == 'cost' ? 'blue' : 'gray'"
                            class="m-1"
                            small
                            @click="orderBy('cost')"
                        >cost</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'name' ? 'blue' : 'gray'"
                            class="m-1"
                            small
                            @click="orderBy('name')"
                        >name</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'category' ? 'blue' : 'gray'"
                            class="m-1"
                            small
                            @click="orderBy('category')"
                        >category</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'timesRedeemed' ? 'blue' : 'gray'"
                            class="m-1"
                            small
                            v-if="$route.name == 'home'"
                            @click="orderBy('timesRedeemed')"
                        >timesRedeemed</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'createDate' ? 'blue' : 'gray'"
                            class="m-1"
                            small
                            v-if="$route.name == 'history'"
                            @click="orderBy('createDate')"
                        >createDate</Butt>
                    </div>
                </div>

                <!-- ORDER -->
                <!-- ICONS -->
                <div class="flex justify-evenly pt-space">
                    <a
                        class="grayscale hover:grayscale-0 transition"
                        href="https://aerolab.co"
                        target="_blank"
                    >
                        <img src="/aerolab.svg" alt="aerolab" />
                    </a>
                    <a
                        class="grayscale hover:grayscale-0 transition"
                        href="https://github.com/jarraga/loyalty-app-aerolab"
                        target="_blank"
                    >
                        <img src="/github.svg" alt="github" />
                    </a>
                </div>
                <!-- ICONS -->
            </div>
        </div>
    </Cont>
    <!--  DESKTOP -->
</template>

<script>

import { orderBy } from '../logic/orderBy'
export default {
    methods: {
        changeOrderType(order) {
            console.log(order)
            this.$store.state.actualOrderType = order
            orderBy(this.$store.state.actualOrderBy)
        },
        orderBy
    }
}
</script>