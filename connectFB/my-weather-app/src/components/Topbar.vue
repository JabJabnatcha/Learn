<template>
  <nav class="topbar">
    <ul>
      <li><router-link to="/">หน้าแรก</router-link></li>
      <li><router-link to="/grid">ตัวอย่าง Grid</router-link></li>
      <li><router-link to="/12grid">12 Grid</router-link></li>
      <li><router-link to="/12grid2">12 Grid 2</router-link></li>
      <li><router-link to="/weather">weather jab</router-link></li>
      <li><router-link to="/spotify">MusicApp</router-link></li>
      <li><router-link to="/ImportIMG">ImportIMG</router-link></li>
      <li><router-link to="/Music_app2">MusicApp2</router-link></li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  background-color: #333;
  padding: 1rem 2rem;
  color: white;
  z-index: 1000;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);

  height: 60px;  /* เพิ่มความสูงที่แน่นอน เช่น 60px */
  box-sizing: border-box; /* รวม padding ในความสูง */
}


.topbar ul {
  list-style: none;
  margin: 0; padding: 0;
  display: flex;
  gap: 1.5rem;
}

.topbar li {
  list-style: none;
}

.topbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.topbar a:hover {
  color: #ffd700;
}

.topbar a.router-link-active {
  text-decoration: underline;
}
</style>
