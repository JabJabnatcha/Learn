<template>
  <div>
    <button @click="showPopup = true">เพิ่มรายชื่อ</button>

    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-form">
        <h3>เพิ่มรายชื่อ</h3>
        <input v-model="form.name" placeholder="ชื่อ" />
        <input v-model="form.surname" placeholder="นามสกุล" />
        <input v-model="form.class" placeholder="ชั้นเรียน" />
        <div class="actions">
          <button @click="submit">บันทึก</button>
          <button @click="showPopup = false">ยกเลิก</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add-name'])
const showPopup = ref(false)

const form = ref({
  name: '',
  surname: '',
  class: ''
})

function submit() {
  if (form.value.name && form.value.surname && form.value.class) {
    emit('add-name', { ...form.value })
    form.value = { name: '', surname: '', class: '' }
    showPopup.value = false
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
}

button:first-child {
  background-color: #28a745;
  color: white;
}

button:last-child {
  background-color: #f36c6c;
}
</style>
