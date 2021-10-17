<template>
    <div
        :class="`row w-full bg-white text-gray-700 transition ${hover ? 'hover:shadow-hover' : ''
        } px-space py-half`"
    >
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        hover: {
            type: Boolean,
            defautl: false,
        },
        half: {
            type: Boolean,
            defautl: false,
        },
    },
};
</script>

<style scoped>
.row {
    border-bottom: 1px solid rgb(229, 231, 235);
}
.row:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
.row:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-bottom: none;
}
</style>