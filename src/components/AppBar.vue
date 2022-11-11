<template>
  <div id="appbar">
    <img
      src="../assets/svg/menu.svg"
      class="icon cursor-pointer"
      @click="toDashboard()"
    />
    <img src="../assets/svg/ngmusic.svg" class="logo" />
    <img
      src="../assets/svg/search.svg"
      class="icon cursor-pointer"
      @click="openSearch()"
    />
  </div>

  <div v-if="searchModal" class="modal">
    <div class="btn-close cursor-pointer">
      <img src="../assets/svg/x.svg" @click="closeSearch()" />
    </div>

    <div class="modal-content">
      <div class="text-center">
        <div class="mb-30 search-text">Search</div>
        <div class="btn-action">
          <div class="btn-primary mb-15">Artist / Album / Title</div>
          <div class="input-text primary">
            <input
              v-model="searchValue"
              placeholder="Search"
              @keyup.enter="search"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    searchModal: false,
    searchValue: null,
  }),
  methods: {
    toDashboard() {
      this.$router.push("/");
    },
    openSearch() {
      this.searchModal = true;
      document.body.style.overflow = "hidden";
    },
    closeSearch() {
      this.searchModal = false;
      this.searchValue = null;
      document.body.style.overflow = "visible";
    },
    search() {
      this.$router.replace({
        name: "Result",
        query: {
          search: this.searchValue,
        },
      });
      setTimeout(() => {
        this.closeSearch();
      }, 200);
    },
  },
});
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(28, 28, 45, 0.9);
  transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  .btn-close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .modal-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    .search-text {
      font-size: 20px;
      font-weight: bold;
    }
    .btn-action {
      div {
        min-width: 320px;
      }
    }
  }
}

#appbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(100deg, #712bda, #a45deb 100%);
  border-radius: 0 0 80% 80% / 17px;
  color: white;
  text-align: center;
  padding: 0 15px;
  height: 60px;
  box-shadow: 0 0 6px 0 rgba(148, 77, 230, 0.75);

  img {
    &.icon {
      width: 16px;
      margin-top: -5px;
    }

    &.logo {
      width: 72px;
    }
  }
}
</style>
