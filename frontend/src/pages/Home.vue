<template>
  <main class="flex-fill p-4">
    <section class="home">
      <h4 class="fw-bold my-xl-5">Dashboard</h4>
      <div class="d-flex flex-row justify-content-between align-items-center shadow card p-3">
        <p class="mb-0 fst-italic">Please clock in or clock out as appropriate.</p>
        <a class="btn btn-success" href="#" role="button">Clock in</a>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card p-3">
            <h5>Overview</h5>
            <p class="mb-0">Quick stats and summaries go here.</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card p-3">
            <h5>Recent</h5>
            <p class="mb-0">Recent activities or tasks.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
.home {
  text-align: left;
}

h1 {
  color: #42b883;
}

main {
  min-height: 100vh;
}
</style>
