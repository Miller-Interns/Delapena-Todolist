<script setup lang="ts">
import { todoStore } from '../stores/todo-store';
import type { State } from '../stores/todo-store';
import { TodoStatus } from '../stores/enums';

const state: State = todoStore.state;
</script>

<template>
    <div class="home-container">
    <nav class="navbar">
      <router-link to="/" class="navlink">HOME</router-link>
      <router-link to="/about" class="navlink">APP</router-link>
    </nav>
  </div>

  <div class="todo-page">
    <h1 class="title">To-Do List</h1>

    <div class="add-category-container">
      <input v-model="state.newCategoryName" placeholder="Add Category" class="input" @keyup.enter="todoStore.addCategory" />
      <button @click="todoStore.addCategory" class="btn primary">Add Category</button>
    </div>

    <div v-for="(category, cIndex) in state.categories" :key="cIndex" class="category-container">
      <div class="category-header">
        <h2 class="category-title">{{ category.name }}</h2>
        <button @click="todoStore.removeCategory(cIndex)" class="btn danger">Delete Category</button>
      </div>

      <div class="add-todo-container">
        <input v-model="category.newTodo" placeholder="Add To-Do" class="input" @keyup.enter="todoStore.addTodo(category)" />
        <button @click="todoStore.addTodo(category)" class="btn primary">Add To-Do</button>
      </div>

      <ul class="todo-list">
        <li
          v-for="(todo, tIndex) in category.todos"
          :key="tIndex"
          class="todo-item"
          draggable="true"
          @dragstart="todoStore.dragStart(category, tIndex)"
          @dragover.prevent
          @drop="todoStore.drop(category, tIndex)"
        >
          <div class="todo-content">
            <input
              type="checkbox"
              :checked="todo.status === TodoStatus.COMPLETED"
              @change="todoStore.toggleTodoStatus(todo)"
            />
            <span :class="{ done: todo.status === TodoStatus.COMPLETED }">{{ todo.text }}</span>

            <div class="action-buttons">
              <button
                v-if="state.editingTodo === todo"
                @click="todoStore.saveEdit(category, tIndex)"
                class="btn success small"
              >
                Save
              </button>
              <button
                v-if="state.editingTodo === todo"
                @click="todoStore.cancelEdit"
                class="btn small"
              >
                Cancel
              </button>
              <button v-else @click="todoStore.startEditing(todo)" class="btn small">Edit</button>
              <button @click="todoStore.removeTodo(category, tIndex)" class="btn danger small">Delete</button>
            </div>
          </div>

          <p v-if="todo.status === TodoStatus.COMPLETED" class="completed-message">
            Task has been completed!
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

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
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navlink:hover {
  background-color: black;
  color: white;
}

.todo-page {
  padding: 2rem;
  text-align: center;
  background: skyblue;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-family: 'Arial', sans-serif;
}

.add-category-container,
.add-todo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
}

.input {
  flex: 1;
  padding: 0.7rem;
  border: 1px solid black;
  border-radius: 6px;
  font-size: 1rem;
}

.input.small {
  width: 200px;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;
}

.btn.primary {
  background: blue;
  color: white;
}

.btn.primary:hover {
  opacity: 0.8;
}

.btn.danger {
  background: red;
  color: white;
}

.btn.danger:hover {
  opacity: 0.8;
}

.btn.success {
  background: #2ecc71;
  color: white;
}

.btn.success:hover {
  background: #27ae60;
}

.category-container {
  background: beige;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.completed-message {
  text-align: center;
  color: black;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0 1rem;
  flex: 1;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>
