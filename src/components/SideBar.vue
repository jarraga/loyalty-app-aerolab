<template>
    <!--  DESKTOP -->
    <Cont class="p-0 overflow-hidden flex flex-col h-full relative">
        <div
            v-if="$store.state.showSideBarMobile"
            @click="$store.state.showSideBarMobile = false"
            class="absolute top-8 right-8 p-4"
        >✖️</div>

        <div
            v-if="!$store.state.isMobile"
            :class="`absolute top-0 left-0 min-w-[100%] min-h-[100px] bg-${$store.state.actualColor}-500`"
        ></div>

        <img
            v-if="!$store.state.showSideBarMobile"
            class="h-[150px] object-cover object-right"
            src="/header.png"
            alt="header"
        />
        <div :class="`p-space bg-gradient-to-b from-${$store.state.actualColor}-500 to-white z-5`">
            <p class="text-3xl">{{ $store.state.userName }}</p>
            <p class="mt-4 text-1xl">{{ $store.state.userPoints }} points</p>
        </div>
        <!-- SECTIONS -->
        <div class="grid grid-cols-2 gap-space p-space">
            <Butt
                full
                :color="$route.name == 'home' ? $store.state.actualColor : 'gray'"
                @click="$router.push({ name: 'home' })"
            >ITEMS</Butt>
            <Butt
                full
                :color="$route.name == 'history' ? $store.state.actualColor : 'gray'"
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
                            :color="$store.state.actualOrderType == 'asc' ? $store.state.actualColor : 'gray'"
                            class="m-1 flex-grow"
                            small
                            @click="changeOrderType('asc')"
                        >asc</Butt>
                        <Butt
                            :color="$store.state.actualOrderType == 'desc' ? $store.state.actualColor : 'gray'"
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
                            :color="$store.state.actualOrderBy == 'cost' ? $store.state.actualColor : 'gray'"
                            class="m-1"
                            small
                            @click="orderBy_('cost')"
                        >cost</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'name' ? $store.state.actualColor : 'gray'"
                            class="m-1"
                            small
                            @click="orderBy_('name')"
                        >name</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'category' ? $store.state.actualColor : 'gray'"
                            class="m-1"
                            small
                            @click="orderBy_('category')"
                        >category</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'timesRedeemed' ? $store.state.actualColor : 'gray'"
                            class="m-1"
                            small
                            v-if="$route.name == 'home'"
                            @click="orderBy_('timesRedeemed')"
                        >timesRedeemed</Butt>
                        <Butt
                            :color="$store.state.actualOrderBy == 'createDate' ? $store.state.actualColor : 'gray'"
                            class="m-1"
                            small
                            v-if="$route.name == 'history'"
                            @click="orderBy_('createDate')"
                        >createDate</Butt>
                    </div>
                </div>
                <!-- ORDER -->

                <!-- COLORS -->
                <div class="flex space-x-2 justify-center my-half flex-grow items-center">
                    <div
                        v-for="color in colors"
                        :key="color"
                        @click="changeColor(color)"
                        :class="`${style} ${$store.state.actualColor == color ? 'opacity-50 saturate-100' : 'opacity-10 saturate-0'} bg-${color}-500`"
                    ></div>
                </div>
                <!-- COLORS -->

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
                        <GitHub />
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
import { changeColor } from '../logic/color'
import GitHub from '../components/GitHub.vue'
export default {
    components: {
        GitHub
    },
    data() {
        return {
            colors: [
                'cyan',
                'blue',
                'purple',
                'green',
                'pink',
            ],
            style: 'cursor-pointer hover:saturate-100 hover:opacity-100  min-w-[1.5rem] min-h-[1.5rem] transition rounded-half'
        }
    },
    methods: {
        changeOrderType(order) {
            this.$store.state.actualOrderType = order
            orderBy(this.$store.state.actualOrderBy)
        },
        orderBy_(prop) {
            orderBy(prop)
        },
        changeColor
    }
}
</script>