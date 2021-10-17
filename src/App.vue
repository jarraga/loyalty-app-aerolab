<template>
  <div class="bg-gray-200 h-screen w-full min-h-[500px] min-w-[360px] max-w-[1700px] mx-auto">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("resize", this.resize);
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    this.resize();
  },
  methods: {
    resize() {
      document.querySelector("#app").style.height = `${window.innerHeight}px`;
      if (window.innerWidth < 640) {
        this.$store.state.isMobile = true;
      } else {
        this.$store.state.isMobile = false;
      }

      if (window.innerWidth < 1024) {
        this.$store.state.isLarge = false;
      } else {
        this.$store.state.isLarge = true;
      }
      // ALTURA MINIMA DE FUNCIONAMIENTO
      // const ratio = window.innerWidth / window.innerHeight;
      // if (window.innerHeight < 500 && ratio > 1.5) {
      //   this.minHeight = true;
      // } else {
      //   this.minHeight = false;
      // }
    },
  },
  data() {
    return {
      // minHeight: false,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
* {
  font-family: "Rubik", sans-serif;
  scrollbar-width: none;
  user-select: none;
}
::-webkit-scrollbar {
  display: none;
}
</style>
