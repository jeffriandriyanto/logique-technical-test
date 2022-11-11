<template>
  <div class="music-card">
    <div class="cover-wrapper">
      <img
        v-if="!data.isPlaying"
        src="../assets/svg/play-button.svg"
        class="play-btn"
        @click="play"
      />
      <img
        v-if="data.isPlaying"
        src="../assets/svg/pause-button.svg"
        class="play-btn"
        @click="pause"
      />
      <img :src="data.artworkUrl100" class="cover" />
    </div>
    <div class="detail flex flex-column justify-space-between">
      <div>
        <div class="artist">{{ data.artistName }}</div>
        <div class="title">{{ data.trackName }}</div>
      </div>

      <div class="flex justify-space-between">
        <div class="genre">{{ data.primaryGenreName }}</div>
        <div class="price flex align-center">
          <img src="../assets/svg/currency-dollar.svg" />
          <span>{{ data.trackPrice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: Object,
  },
  data: () => ({
    audio: null,
  }),
  methods: {
    play() {
      this.$emit("play", this.data);
    },
    pause() {
      this.$emit("pause", this.data);
    },
  },
});
</script>

<style lang="scss">
@import "../assets/styles/theme.scss";

.music-card {
  padding: 12px 10px;
  min-width: 280px;
  background-color: $light;
  display: flex;
  gap: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  margin-bottom: 20px;
  .cover-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .play-btn {
      position: absolute;
      width: 40px;
    }

    .cover {
      border-radius: 10px;
      height: 100px;
      width: 100px;
    }
  }

  .cover {
    border-radius: 10px;
    height: 100px;
    width: 100px;
  }

  .detail {
    width: 100%;
    color: $secondary;
    letter-spacing: 0.36px;

    .artist,
    .genre {
      font-size: 10px;
      font-weight: 500;
    }
    .artist {
      margin-bottom: 5px;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
    }
    .genre {
      color: $light;
      background: $accent-green;
      padding: 5px 13px;
      border-radius: 10px;
    }
    .price {
      img {
        margin-right: 6px;
      }
      font-size: 12px;
      font-weight: bold;
      color: $accent-yellow;
    }
  }
}
</style>
