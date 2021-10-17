<template>
    <img :class="imageclass" v-if="!loadOk" :src="placeholder" />
    <img :class="imageclass" v-show="loadOk" @load="replace" :src="src" />
</template>

<script>
export default {
    methods: {
        replace() {
            this.loadOk = true;
        },
    },
    data() {
        return {
            loadOk: false,
        };
    },
    props: ["src", "placeholder", "imageclass"],
};
</script>