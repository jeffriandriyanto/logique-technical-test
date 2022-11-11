<template>
  <div id="home">
    <img src="../assets/svg/logo.svg" class="logo" />

    <div class="btn-action">
      <div class="btn-primary mb-15">Artist / Album / Title</div>
      <div class="input-text">
        <input v-model="search" placeholder="Search" @keyup.enter="searchMusic()" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    search: null,
    img: null,
  }),
  methods: {
    searchMusic() {
      if (this.search) {
        this.$router.push({
          name: "Result",
          query: {
            search: this.search,
          },
        });
      }
    },
  },
});
</script>

<style lang="scss">
#home {
  background-image: linear-gradient(153deg, #712bda, #a45deb 100%);
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img.logo {
    width: 72.2px;
    height: 83.8px;
    object-fit: contain;
  }

  .btn-action {
    position: absolute;
    bottom: 30px;
    width: 83%;
  }
}
</style>
