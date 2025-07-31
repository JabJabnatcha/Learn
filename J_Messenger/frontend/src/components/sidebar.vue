<template>
  <div class="sidebar">
    <h3>Friends</h3>
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
        @click="$emit('select', user)"
        :class="{ active: selectedUser?.id === user.id }"
      >
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['select'])
const users = ref([])

function selectUser(user) {
  emit('select', user)
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5264/api/user')
    users.value = await res.json()
  } catch (err) {
    console.error('Error fetching users:', err)
  }
})
</script>



<style scoped>
.sidebar {
  width: 250px;
  background: #f1f1f1;
  padding: 1rem;
  border-right: 1px solid #ccc;
  height: 100vh;
  box-sizing: border-box;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
}

.sidebar li.active {
  background: #dcdcdc;
  font-weight: bold;
}
</style>
