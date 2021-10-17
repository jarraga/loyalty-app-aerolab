<template>
    <Cont half class="flex justify-center items-center space-x-space">
        <Butt
            :disabled="$store.state.pagination.actual == 1"
            @click="previous"
            small
            color="gray"
        >Previous</Butt>
        <div
            class="flex items-center"
        >Page {{ $store.state.pagination.actual }} of {{ $store.state.pagination.total }}</div>
        <div class="hidden lg:flex items-center">|</div>
        <div class="hidden lg:flex items-center">{{ $store.state.totalItems }} total items</div>
        <Butt
            :disabled="$store.state.pagination.actual == $store.state.pagination.total"
            @click="next"
            small
            color="gray"
        >Next</Butt>
    </Cont>
</template>

<script>
import { updatePagination } from '../logic/dynamicGrid'
export default {
    methods: {
        next() {
            if (this.$store.state.pagination.actual < this.$store.state.pagination.total) {
                this.$store.state.pagination.actual++
                updatePagination()
            }
        },
        previous() {
            if (this.$store.state.pagination.actual > 1) {
                this.$store.state.pagination.actual--
                updatePagination()
            }
        },
    }
};
</script>