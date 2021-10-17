<template>
    <!--  DESKTOP -->
    <Cont v-if="!$store.state.isMobile" class="p-0 overflow-hidden flex flex-col">
        <img class="h-[150px] object-cover object-right" src="/header.png" alt="header" />
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
                    <div class="flex flex-wrap -m-1 pt-4">
                        <Butt class="m-1" small @click="orderBy('name')">asc</Butt>
                        <Butt class="m-1" small @click="orderBy('name')">desc</Butt>
                    </div>
                    <!-- SEPARATOR -->
                    <div class="min-h-[1px] max-h-[1px] w-full bg-gray-100 my-4"></div>
                    <!-- SEPARATOR -->
                    <div class="flex flex-wrap -m-1 pt-4">
                        <Butt class="m-1" small @click="orderBy('name')">name</Butt>
                        <Butt class="m-1" small @click="orderBy('cost')">cost</Butt>
                        <Butt class="m-1" small @click="orderBy('category')">category</Butt>
                        <Butt
                            class="m-1"
                            small
                            v-if="$route.name == 'home'"
                            @click="orderBy('timesRedeemed')"
                        >timesRedeemed</Butt>
                        <Butt
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

    <!--  MOBILE -->
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
    <!--  MOBILE -->
</template>

<script>
import Scrollable from "./Scrollable.vue"
export default {
    methods: {
        orderBy(property) {

            const array = this.$route.name == 'home' ? 'items' : 'itemsHistory'


            this.$store.state[array].sort((a, b) => {
                if (a[property] > b[property]) return -1
                else if (a[property] < b[property]) return 1
                return 0
            })
        },
    }
}
</script>