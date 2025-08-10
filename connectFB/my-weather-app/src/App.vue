<!-- src/App.vue -->
<script setup>
import Topbar from './components/Topbar.vue'  // ปรับ path ให้ถูกต้องตามโครงสร้างโปรเจกต์
</script>

<template>
  <div>
    <Topbar />
    <!-- เพิ่ม padding-top เพื่อไม่ให้เนื้อหาถูก topbar fixed บัง -->
    <div style="padding-top: 70px;">
      <router-view />
    </div>
  </div>
</template>

<style>
/* ถ้าต้องการสไตล์ global หรือเพิ่มเติมสำหรับ app */
</style>
