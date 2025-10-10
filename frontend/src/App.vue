<template>
  <div id="app">
    <Header />

    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>
