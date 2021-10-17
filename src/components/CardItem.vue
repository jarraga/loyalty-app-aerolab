<template>
    <Cont style="animation: fade .3s" hover class="flex flex-col justify-between relative">
        <p
            :class="`absolute top-4 left-4 px-2 py-1 bg-gray-50 rounded-full text-gray-400 text-xs uppercase bg-opacity-50 ${$store.state.isMobile ? '' : 'backdrop-blur-sm'}`"
        >{{ info.category }}</p>

        <div
            :class="`flex w-full justify-center flex-grow ${$store.state.isLarge ? 'h-px' : 'h-full'}`"
        >
            <img
                :class="`object-contain pointer-events-none ${$store.state.userPoints < info.cost ? 'grayscale opacity-50' : ''}`"
                :src="info.img.url"
                :alt="info.name"
            />
        </div>
        <p
            :class="`${$store.state.userPoints < info.cost ? 'text-gray-700' : 'text-blue-500'} text-lg font-bold`"
        >{{ info.name }}</p>
        <!-- COST & BUTTONS -->
        <div class="grid grid-cols-2 gap-half mt-2">
            <div class="flex items-center mb-2 h-full">
                <img class="h-5 mr-2" src="/coin.svg" alt="points" />
                <p>{{ info.cost }}</p>
                <p
                    class="text-xs text-gray-500 ml-4"
                >{{ info.timesRedeemed > 0 ? `Redeemed ${info.timesRedeemed} times` : 'Not yet redeemed' }}</p>
            </div>
            <Butt
                full
                v-if="$store.state.userPoints >= info.cost"
                color="blue"
                @click="redeemItem($event, info)"
            >{{ $store.state.buttonsStates[info._id] ? $store.state.buttonsStates[info._id] : 'Redeem now' }}</Butt>
            <Butt
                full
                v-if="$store.state.userPoints < info.cost"
                color="gray"
                @click="addMorePoints($event, info._id, pointsLeft(info.cost))"
            >{{ $store.state.buttonsStates[info._id] ? $store.state.buttonsStates[info._id] : `get + ${pointsLeft(info.cost)} points` }}</Butt>
        </div>
        <!-- COST & BUTTONS -->
    </Cont>
</template>

<script>
import { m } from "../../dist/assets/vendor.b2506a2a";
import {
    redeem,
    addPoints,
} from "../logic/api";

export default {
    methods: {
        pointsLeft(points) {
            const diff = points - this.$store.state.userPoints;
            if (diff >= 5000) return 7500;
            else if (diff >= 1000) return 5000;
            else return 1000;
        },
        async redeemItem(e, info) {
            this.$store.state.buttonsStates[info._id] = '...redeeming'
            try {
                await redeem(info._id);
                this.$store.state.userPoints -= info.cost;
                this.$store.state.buttonsStates[info._id] = '😃 Ok!'
                console.log({
                    ...info,
                    _id: Math.random(),
                    createDate: new Date().toISOString(),
                    productId: info._id
                })
                this.$store.state.itemsHistory.push({
                    ...info,
                    _id: Math.random(),
                    createDate: new Date().toISOString(),
                    productId: info._id
                })
                setTimeout(() => {
                    this.$store.state.buttonsStates[info._id] = null
                    e.target.blur()
                }, 1000);
            } catch (error) {
                this.$store.state.buttonsStates[id] = '💥 Error'
                setTimeout(() => {
                    this.$store.state.buttonsStates[id] = null
                    e.target.blur()
                }, 1000);
            }
        },
        async addMorePoints(e, id, points) {
            this.$store.state.buttonsStates[id] = '...adding points'
            try {
                const data = await addPoints(points);
                this.$store.state.userPoints = data.newPoints;
                this.$store.state.buttonsStates[id] = '😃 Ok!'
                setTimeout(() => {
                    this.$store.state.buttonsStates[id] = null
                    e.target.blur()
                }, 1000);
            } catch (error) {
                this.$store.state.buttonsStates[id] = '💥 Error'
                setTimeout(() => {
                    this.$store.state.buttonsStates[id] = null
                    e.target.blur()
                }, 1000);
            }
        },
    },
    props: ['info']
}
</script>