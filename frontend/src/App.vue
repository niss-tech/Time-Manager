<template>
  <div id="app">
    <Header />
    <Home />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Home from './pages/Home.vue'
import Auth from './pages/Auth.vue'
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>
