<template>
  <header>
    <h1>Time Manager</h1>
    <nav>
      <a href="#">Home</a>
      <a href="#">Dashboard</a>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #b8b1b1ff;
}

nav a {
  margin-left: 1rem;
  text-decoration: none;
  color: #42b883;
  font-weight: bold;
}
</style>
