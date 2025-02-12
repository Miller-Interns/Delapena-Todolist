<template>
  <div class="home-container">
    <nav class="navbar">
      <router-link to="/" class="navlink">HOME</router-link>
      <router-link to="/todolist" class="navlink">APP</router-link>
    </nav>
    <div class="content">
      <h1>Kynel C. De La Peña</h1>
      <p>Date Started: January 29, 2025</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.centered {
  font-family: 'montserrat', serif;
  font-optical-sizing: 500;
  font-weight: 600;
  font-style: bold;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: skyblue;
  position: relative;
}

.navbar {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.navlink {
  text-decoration: none;
  padding: 10px 15px;
  border: 2px solid black;
  border-radius: 5px;
  background-color: white;
  color: black;
  font-weight: bold;
  transition: 0.3s;
}

.navlink:hover {
  background-color: black;
  color: white;
}

.content h1 {
  font-size: 3rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.content p {
  font-size: 2rem;
  font-weight: 500;
  margin: 0.5rem 0;
}
</style>
