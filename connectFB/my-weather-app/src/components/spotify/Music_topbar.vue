<template>
  <div class="music-topbar">
    <div class="center-content">
      <!-- ปุ่ม Home -->
      <button class="home-btn" @click="goHome">
        🏠
      </button>
      <!-- ปุ่มค้นหา -->
      <button class="search-btn">
        🔍
      </button>
      <!-- ช่องค้นหา -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="ค้นหาเพลง..."
        class="search-input"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicTopbar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.music-topbar {
  display: flex;
  justify-content: center; /* จัดเนื้อหาไปตรงกลาง */
  align-items: center;
  background-color: #181818;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #303030;
}

.center-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.home-btn,
.search-btn {
  background-color: #282828;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;
}

.home-btn:hover,
.search-btn:hover {
  background-color: #3e3e3e;
}

.search-input {
  background-color: #303030;
  border: none;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  color: white;
  font-size: 0.9rem;
  width: 200px;
}
</style>
