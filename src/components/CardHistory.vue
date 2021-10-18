<template>
    <Row
        v-if="$store.state.isLarge"
        style="animation: fade .3s"
        hover
        class="grid grid-cols-[auto,3fr,4fr,1fr] gap-space w-full items-center"
    >
        <div :class="`flex justify-center w-12`">
            <img class="object-contain pointer-events-none" :src="info.img.url" :alt="info.name" />
        </div>

        <div class="flex flex-col max-w-full">
            <p class="text-gray-500 text-sm">{{ info.category }}</p>
            <p class="text-gray-700 font-bold truncate">{{ info.name }}</p>
        </div>

        <p class="text-center text-gray-500">{{ parseDate(info.createDate) }}</p>

        <div class="flex items-center justify-end">
            <img class="h-5 mr-2" src="/coin.svg" alt="points" />
            <p>{{ info.cost }}</p>
        </div>

        <!-- <Butt small color="gray" @click="redeemItem($event, info._id, info.cost)">View details</Butt> -->
    </Row>
    <!-- LARGE - MOBILE -->
    <Row
        v-if="!$store.state.isLarge"
        style="animation: fade .3s"
        hover
        class="grid grid-cols-[auto,1fr] gap-space w-full items-center"
    >
        <div :class="`flex justify-center w-12`">
            <img class="object-contain pointer-events-none" :src="info.img.url" :alt="info.name" />
        </div>
        <div class="flex flex-col justify-start overflow-hidden">
            <div class="flex flex-col">
                <p class="text-gray-500 text-sm">{{ info.category }}</p>
                <p class="text-gray-700 font-bold truncate">{{ info.name }}</p>
            </div>
            <p class="text-gray-500 text-sm">{{ parseDate(info.createDate) }}</p>
            <div class="flex items-center">
                <img class="h-4 mr-2" src="/coin.svg" alt="points" />
                <p>{{ info.cost }}</p>
            </div>
        </div>

        <!-- <div class="flex flex-col justify-center">
            <Butt
                small
                full
                color="gray"
                @click="redeemItem($event, info._id, info.cost)"
            >View details</Butt>
        </div>-->
    </Row>
</template>

<script>
export default {
    methods: {
        parseDate(value) {
            const date = new Date(value)
            return date.toUTCString().toLowerCase()
            // return date.toDateString()
        }

    },
    props: ['info']
}
</script>