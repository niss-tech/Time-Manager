<template>
  <aside class="sidenav bg-light border-end p-3 d-none d-md-block">
    <div class="profile d-flex align-items-center mb-3">
      <img :src="avatar" alt="avatar" class="avatar me-2"/>
      <div>
        <div class="fw-bold">{{ firstName }} {{ lastName }}</div>
        <small class="text-muted">Dashboard</small>
      </div>
    </div>

    <nav>
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
            <div class="d-flex align-items-center">              
              <svg class="w-25 icon flat-color" fill="#000000" viewBox="0 0 24 24" id="dashboard" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M22,4V7a2,2,0,0,1-2,2H15a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h5A2,2,0,0,1,22,4ZM9,15H4a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2H9a2,2,0,0,0,2-2V17A2,2,0,0,0,9,15Z" style="fill: #2ca9bc;"></path><path id="primary" d="M11,4v7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2H9A2,2,0,0,1,11,4Zm9,7H15a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2h5a2,2,0,0,0,2-2V13A2,2,0,0,0,20,11Z" style="fill: #000000;"></path></g></svg>
              <span>Dashboard</span>
            </div>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/Profile" class="nav-link" :class="{ active: isActive('/Profile') }">Profile</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/Teams" class="nav-link" :class="{ active: isActive('/Teams') }">Teams</router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/Login" class="nav-link" :class="{ active: isActive('/Login') }">Login</router-link>
        </li>
      </ul>
    </nav>
  </aside>

  <!-- Mobile: simple top bar with dropdown (keeps layout minimal) -->
  <div class="d-md-none mobile-sidenav p-2 bg-light border-bottom">
    <div class="d-flex align-items-center justify-content-between">
      <strong>Menu</strong>
      <button class="btn btn-sm btn-outline-secondary" @click="open = !open">☰</button>
    </div>
    <div v-if="open" class="mt-2">
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><router-link to="/" class="nav-link">Dashboard</router-link></li>
        <li class="nav-item mb-2"><router-link to="/Profile" class="nav-link">Profile</router-link></li>
        <li class="nav-item mb-2"><router-link to="/Teams" class="nav-link">Teams</router-link></li>
        <li class="nav-item mb-2"><router-link to="/Login" class="nav-link">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  firstName: { type: String, default: 'John' },
  lastName: { type: String, default: 'Doe' },
  avatar: { type: String, default: '/vite.svg' },
})

const open = ref(false)
const route = useRoute()

const { firstName, lastName, avatar } = props

function isActive(path) {
  return route.path === path
}
</script>

<style scoped>
.sidenav {
  /* responsive width: min 200px, preferred 18vw, max 320px */
  width: clamp(200px, 18vw, 320px);
  min-height: 100vh;
}
.profile { padding-bottom: 0.5rem; }
.avatar {
  /* responsive avatar: between 40px and 72px, scales with viewport */
  width: clamp(40px, 5.5vw, 72px);
  height: clamp(40px, 5.5vw, 72px);
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
}
.nav-link.active {
  font-weight: 700;
}
.mobile-sidenav .nav-link {
  padding-left: 0;
}

/* Make active link show a bottom border without shifting layout */
.nav-link {
  display: block;
  padding-bottom: 0.35rem;
  border-bottom: 3px solid transparent; /* reserve space */
}

.nav .nav-link.router-link-active,
.nav .nav-link.router-link-exact-active,
.nav .nav-link.active {
  font-weight: 700;
  color: #0d6efd;
  border-bottom-color: #0d6efd;
}
</style>
