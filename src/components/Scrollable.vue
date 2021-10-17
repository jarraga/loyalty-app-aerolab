<template>
    <div :ref="reference" @scroll="scroll" :class="`overflow-y-scroll w-full`">
        <div
            v-show="showTop && (!$store.state.isLarge || shadows)"
            class="-mt-4 sticky h-[16px] bg-gradient-to-b from-gray-200 to-transparent w-full top-0 z-10"
        />
        <slot v-if="!padd" />
        <div v-if="padd" :class="`${padd ? half ? 'p-half' : 'p-space' : ''} h-full`">
            <slot />
        </div>
        <div
            v-show="showBottom && (!$store.state.isLarge || shadows)"
            class="-mt-4 sticky h-[16px] bg-gradient-to-t from-gray-200 to-transparent w-full bottom-0 z-10"
        />
    </div>
</template>

<script>
export default {
    props: {
        shadows: {
            type: Boolean,
            default: false
        },
        padd: {
            type: Boolean,
            default: false
        },
        half: {
            type: Boolean,
            default: false
        },
        reference: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            showTop: false,
            showBottom: true,
        };
    },
    mounted() {
        // window.addEventListener("resize", this.scroll);
        // this.scroll()
    },
    methods: {
        scroll() {
            const target = this.$refs[this.reference]

            if (target.scrollTop > 0) {
                this.showTop = true;
            } else {
                this.showTop = false;
            }

            if (
                target.offsetHeight + Math.ceil(target.scrollTop) >=
                target.scrollHeight
            ) {
                this.showBottom = false;
            } else {
                this.showBottom = true;
            }
        },
    },
};
</script>