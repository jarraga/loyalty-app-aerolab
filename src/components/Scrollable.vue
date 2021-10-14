<template>
    <div ref="main" @scroll="scroll" class="overflow-y-scroll w-full">
        <div
            v-show="showTop && $store.state.isMobile"
            class="-mt-4 sticky h-[16px] bg-gradient-to-b from-gray-200 to-transparent w-full top-0 z-10"
        />
        <slot />
        <div
            v-show="showBottom && $store.state.isMobile"
            class="-mt-4 sticky h-[16px] bg-gradient-to-t from-gray-200 to-transparent w-full bottom-0 z-10"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            showTop: false,
            showBottom: true,
        };
    },
    methods: {
        scroll(e) {
            if (e.target.scrollTop > 0) {
                this.showTop = true;
            } else {
                this.showTop = false;
            }

            if (
                e.target.offsetHeight + Math.ceil(e.target.scrollTop) >=
                e.target.scrollHeight
            ) {
                this.showBottom = false;
            } else {
                this.showBottom = true;
            }
        },
    },
};
</script>