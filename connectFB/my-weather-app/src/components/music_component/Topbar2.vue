<!-- Topbar2.vue -->
<template>
  <div class="topbar2">
    <!-- ปุ่ม Home -->
    <button class="home-btn" @click="onHomeClick" aria-label="Home">
      🏠
    </button>

    <!-- ช่องค้นหา -->
    <input
      type="text"
      class="search-bar"
      placeholder="What do you want to play?"
      v-model="searchText"
      @input="onSearchInput"
      aria-label="Search"
    />
  </div>
</template>

<script>
export default {
  name: 'Topbar2',
  data() {
    return {
      searchText: ''
    };
  },
  methods: {
    // เมื่อกดปุ่ม Home (ตอนนี้ยังไม่ทำอะไร แค่ log)
    onHomeClick() {
      console.log('Home button clicked');
    },
    // เมื่อพิมพ์ในช่องค้นหา (ยังไม่ทำอะไร แค่ log)
    onSearchInput() {
      console.log('Search input:', this.searchText);
    }
  }
};
</script>

<style scoped>
.topbar2 {
  display: flex;
  align-items: center;
  justify-content: center; /* จัดให้อยู่กึ่งกลางแนวนอน */
  gap: 12px;
  background-color: #1e1e1e; /* โทนสีเทาดำเข้ม */
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
}

/* ปุ่ม Home กลม ๆ สีเทา */
.home-btn {
  background-color: #666;      /* สีเทากลาง */
  border: none;
  border-radius: 50%;          /* เป็นวงกลม */
  width: 40px;
  height: 40px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

/* hover สีปุ่มสว่างขึ้นเล็กน้อย */
.home-btn:hover {
  background-color: #888;
}

/* ช่องค้นหา สีเทา */
.search-bar {
  width: 250px; /*ทำให้แถบค้นหาและ ปุ่ม home ออยู่ตรงกลาง ได้ไหม และขนาดแถบค้นหาเอาสัก100*/
  /* flex: 1; ขยายเต็มพื้นที่ที่เหลือ */
  background-color: #444;     /* สีเทาเข้ม */
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  box-sizing: border-box;
}

/* placeholder สีเทาอ่อน */
.search-bar::placeholder {
  color: #bbb;
}

/* focus เอาเส้นขอบออก และเปลี่ยนพื้นหลังเล็กน้อย */
.search-bar:focus {
  outline: none;
  background-color: #555;
}
</style>
