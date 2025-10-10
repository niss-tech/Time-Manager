<template>
  <header class="app-header">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="date fst-italic">10 October 2025</div>
      <div class="time">15:18:17</div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.app-header {
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
  height: 44px; /* thin header */
  display: flex;
  align-items: center;
}
.app-header .container {
  padding: 0 1rem;
  width: 100%;
}
.app-header .date,
.app-header .time {
  font-size: 0.9rem; /* keep it small and minimalist */
  color: #495057;
}
</style>
