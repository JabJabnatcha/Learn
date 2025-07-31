<template>
  <div class="messenger-layout">
    <Sidebar :selectedUser="selectedUser" @select="handleSelectUser" />
    <ChatWindow :user="selectedUser" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import ChatWindow from '@/components/ChatWindow.vue'

const selectedUser = ref(null)

function handleSelectUser(user) {
  selectedUser.value = user
}
</script>

<style scoped>
.messenger-layout {
  display: flex;
  height: 100vh;
}
</style>
