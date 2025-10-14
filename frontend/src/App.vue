<template>
    <div>
        <template v-if="route.path === '/Login'">
            <router-view />
        </template>
        <template v-else>
            <div class="d-flex">
                <SideNav />
                <div class="flex-fill d-flex flex-column">
                    <Header />
                    <div class="flex-fill">
                        <router-view />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import SideNav from './components/SideNav.vue'

const route = useRoute()
</script>

<style>

</style>
