<template>
  <div class="chat-window">
    <h2 v-if="user">Chat with {{ user.username }}</h2>
    <p v-else>Please select a user to chat with</p>

    <div v-if="messages.length > 0" class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <strong>{{ msg.senderUsername }}:</strong> {{ msg.content }}
      </div>
    </div>
    <p v-else-if="user">No messages yet.</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

defineProps({
  user: Object
})

const props = defineProps(['user'])
const messages = ref([])

// ดู props.user เปลี่ยนแปลง จะ fetch ข้อความใหม่
watch(() => props.user, async (newUser) => {
  if (newUser && newUser.id) {
    try {
      // สมมติ API endpoint ของข้อความเป็น /api/messages?userId=xxx
      const res = await axios.get(`/api/messages?userId=${newUser.id}`)
      messages.value = res.data
    } catch (error) {
      console.error('Failed to load messages:', error)
      messages.value = []
    }
  } else {
    messages.value = []
  }
}, { immediate: true })
</script>

<style scoped>
.chat-window {
  flex: 1;
  padding: 1rem;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
}
.messages {
  margin-top: 1rem;
}
.message {
  margin-bottom: 0.5rem;
  padding: 0.3rem;
  border-radius: 5px;
  background-color: #f0f0f0;
}
</style>
