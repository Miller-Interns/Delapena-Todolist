<template>
  <div class="home-container">
    <nav class="navbar">
      <router-link :to="{ name: RouteNames.HOME }" class="navlink">HOME</router-link>
      <router-link :to="{ name: RouteNames.TODO_LIST }" class="navlink">APP</router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouteNames } from '../enums/RouteNames'
</script>

<style scoped>
.navbar {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

.navlink {
  text-decoration: none;
  padding: 10px 15px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.navlink:hover {
  background-color: black;
  color: white;
}
</style>
