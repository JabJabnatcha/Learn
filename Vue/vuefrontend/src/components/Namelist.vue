<template>
  <div>
    <h2>รายชื่อที่เพิ่ม</h2>
    <table v-if="names.length">
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>ชั้นเรียน</th>
          <th>ลบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) in names" :key="index">
          <td>{{ person.name }}</td>
          <td>{{ person.surname }}</td>
          <td>{{ person.class }}</td>
          <td><button @click="emit('delete-name', index)">ลบ</button></td>
        </tr>
      </tbody>
    </table>
    <p v-else>ยังไม่มีรายชื่อ</p>
  </div>
</template>

<script setup>
defineProps({
  names: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['delete-name'])
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
}
th {
  background-color: #f0f0f0;
}
button {
  color: white;
  background-color: red;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}
button:hover {
  background-color: darkred;
}
</style>
