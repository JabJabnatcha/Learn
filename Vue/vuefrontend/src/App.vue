<template>
  <div class="app-layout">
    <Sidebar />
    <div class="main-content">
      <TopBar />
      <div class="content-wrapper">
        <h1>ระบบลงชื่อ</h1>
        <InputName @add-name="addName" />
        <NameList :names="names" @delete-name="deleteName" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from './components/TopBar.vue'
import Sidebar from './components/Sidebar.vue'
import InputName from './components/InputName.vue'
import NameList from './components/NameList.vue'

const names = ref([])

function addName(newName) {
  names.value.push(newName)
}

function deleteName(index) {
  names.value.splice(index, 1)
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  padding: 1rem;
}
</style>
