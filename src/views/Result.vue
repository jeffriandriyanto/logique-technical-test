<template>
  <section id="results">
    <AppBar />

    <div class="container">
      <div v-if="loading" class="equalizer mx-auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <section v-else>
        <div class="query text-center">
          <span class="query">Search result for :</span>
          <span class="query-search">{{ $route.query.search }}</span>
        </div>

        <div>
          <div v-for="music in musics" :key="music.collectionId">
            <MusicCard
              :data="music"
              @play="(data) => playMusic(data)"
              @pause="pauseMusic()"
            />
          </div>
          <div v-if="musics.length === 0" class="no-result"> No Result Found</div>
        </div>

        <div
          v-if="musics.length >= perPage"
          class="btn-secondary mx-auto cursor-pointer"
          @click="loadMore"
          >Load More
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import request from "../utils/request";
import AppBar from "../components/AppBar.vue";
import MusicCard from "../components/MusicCard.vue";

export default defineComponent({
  components: {
    AppBar,
    MusicCard,
  },
  data: () => ({
    loading: false,
    audio: null,
    musicIdx: 0,
    perPage: 3,
    params: {
      term: "",
      media: "music",
      limit: 3,
    },
    musics: [],
  }),
  created() {
    this.getMusic();
  },
  watch: {
    "$route.query.search"(valueChanged) {
      if (valueChanged) this.getMusic();
    },
  },
  methods: {
    async getMusic(isloadMore) {
      if (!isloadMore) {
        this.params.limit = 3;
      }

      this.loading = true;
      this.params.term = this.$route.query.search;

      try {
        const { data } = await request({
          method: "GET",
          url: "search",
          params: { ...this.params },
        });

        this.total = data.resultCount;
        this.musics = [
          ...data.results.map((d) => {
            return { ...d, isPlaying: false };
          }),
        ];
        this.loading = false;
      } catch (error) {
        this.loading = false;
        alert(error);
      }
    },
    playMusic({ previewUrl, trackId }) {
      if (this.audio) {
        this.musics[this.musicIdx].isPlaying = false;
        this.audio.pause();
        this.audio = null;
      }

      setTimeout(() => {
        this.musicIdx = this.musics.findIndex((el) => el.trackId === trackId);
        this.musics[this.musicIdx].isPlaying = true;
        this.audio = new Audio(previewUrl);
        this.audio.play();
      }, 200);
    },
    pauseMusic() {
      if (this.audio) {
        this.musics[this.musicIdx].isPlaying = false;
        this.audio.pause();
        this.audio = null;
      }
    },
    loadMore() {
      this.params.limit += this.perPage;
      this.getMusic("loadMore");
    },
  },
});
</script>

<style lang="scss">
@import "../assets/styles/theme.scss";

#results {
  background: #f8fafc;
  height: 100%;
  position: relative;

  .container {
    padding: 15px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // min-height: 70vh;

    .no-result {
      text-align: center;
      font-weight: bold;
      font-size: 13px;
      color: $secondary;
    }

    div.query {
      margin: 38px;

      span.query {
        font-size: 14px;
        letter-spacing: 0.5px;
        padding-right: 10px;
        color: #334155;
      }

      span.query-search {
        color: $primary;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.64px;
      }
    }
  }
}
</style>
