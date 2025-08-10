<template>
  <Topbar />
  <div class="grid-page">
    <h1>📦 ตัวอย่างการใช้ Vue + CSS Grid</h1>

    <div class="grid-container">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="grid-item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  '🍎 Apple',
  '🍌 Banana',
  '🍊 Orange',
  '🍇 Grape',
  '🍉 Watermelon',
  '🥭 Mango',
  '🍍 Pineapple',
  '🍒 Cherry',
  '🍑 Peach'
])
</script>

<style scoped>
.grid-page {
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.grid-item {
  background-color: #e1f5fe;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
}
</style>
