<template>
  <div id="main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
#main {
  max-width: 380px;
  margin: 0 auto;
  height: 100vh;
}
</style>
