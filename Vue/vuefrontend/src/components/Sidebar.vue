<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><a href="#">🏠 หน้าแรก</a></li>
        <li><a href="#">📋 รายการชื่อ</a></li>
        <li><a href="#">⚙️ การตั้งค่า</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup></script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  height: 100vh;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 1rem;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.sidebar a:hover {
  color: #4CAF50;
}
</style>
