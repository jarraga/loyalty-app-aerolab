<template>
    <div
        :class="`w-full bg-white text-gray-700 ${$store.state.isMobile ? 'rounded-half' : 'rounded-main'
        } transition ${hover ? 'hover:shadow-hover' : ''
        } ${half ? 'p-half' : 'p-space'}`"
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