<template>
    <Cont half :class="`bg-right backdrop-blur-md bg-cover bg-${$store.state.actualColor}-500`">
        <div class="flex items-center w-full justify-between">
            <p class="text-2xl text-white">{{ $store.state.userName }}</p>
            <p
                class="ml-4 px-3 py-1 rounded-full bg-white bg-opacity-50"
            >{{ $store.state.userPoints }} points</p>
        </div>
    </Cont>
</template>
<script>
export default {

}
</script>