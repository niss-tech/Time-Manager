<template>
  <div class="profile-page container py-4">
    <div class="d-flex flex-column align-items-center">
      <div class="position-relative">
        <img :src="avatar" alt="avatar" class="profile-avatar mb-2" />
        <button class="btn btn-sm btn-outline-secondary edit-btn" @click="onEditAvatar">✎</button>
      </div>
      <h4 class="mb-4">{{ firstName }} {{ lastName }}</h4>

      <form class="w-100" @submit.prevent="onSave">
        <div class="mb-3">
          <label class="form-label">First name</label>
          <input v-model="firstName" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Last name</label>
          <input v-model="lastName" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Phone number</label>
          <input v-model="phone" type="tel" class="form-control" />
        </div>

        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Demo data; replace with real user data when auth exists
const firstName = ref('John')
const lastName = ref('Doe')
const email = ref('john.doe@example.com')
const phone = ref('+1 (555) 123-4567')
const avatar = '/vite.svg'

function onEditAvatar() {
  // placeholder for file picker or modal
  alert('Change avatar - not implemented yet')
}

function onSave() {
  // in the future save to API
  alert('Saved (demo only)')
}
</script>

<style scoped>
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e9ecef;
}
.edit-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(25%, 25%);
}
.profile-page { max-width: 720px; }
</style>
