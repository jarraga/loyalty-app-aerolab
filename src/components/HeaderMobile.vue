<template>
    <Cont
        half
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
</template>
<script>
export default {

}
</script>