<!--C:\Users\Laptop-JAB\Desktop\Learn\connectFB\my-weather-app\src\views\Music_app2.vue-->
<template>
  <div class="app-container">
    <!-- Topbar fixed -->
    <Topbar />

    <!-- Topbar 2 sub-header -->
    <Topbar2 />

    <!-- Main content area: sidebar ซ้าย, กลาง, ขวา -->
    <div class="main-content">
      <SidebarLeft />
      <MiddleContent />
      <SidebarRight />
    </div>

    <!-- Bottom bar -->
    <BottomBar />
  </div>
</template>

<script>
// นำเข้า components ทั้งหมด
import Topbar from '../components/Topbar.vue';
import Topbar2 from '../components//music_component/Topbar2.vue';
import SidebarLeft from '../components/music_component/SidebarLeft.vue';
import SidebarRight from '../components/music_component/SidebarRight.vue';
import MiddleContent from '../components/music_component/MiddleContent.vue';
import BottomBar from '../components/music_component/BottomBar.vue';

export default {
  name: 'MusicApp2',
  components: {
    Topbar,
    Topbar2,
    SidebarRight,
    SidebarLeft,
    MiddleContent,
    BottomBar,
  },
};
</script>

<style>
/* Layout หลัก ให้เรียงคอลัมน์จากบนลงล่าง */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  /* เว้น padding-top เท่าความสูง Topbar fixed เพื่อไม่ให้ทับ */
  padding-top: 60px; /* สมมติ Topbar สูง 60px */
}

/* Topbar2 จะอยู่ด้านล่าง Topbar ปกติ (ไม่ fixed) */
.Topbar2 {
  /* ไม่ต้อง fixed */
  width: 100%;
  background-color: #1e1e1e; /* ตัวอย่างสีโทนมืด */
}

/* ส่วนเนื้อหากลาง แบ่งเป็น 3 คอลัมน์ด้วย flex */
.main-content {
  flex: 1; /* ให้กินพื้นที่ที่เหลือ */
  display: flex;
  gap: 5px;
  padding: 10px;
  background-color: #121212; /* พื้นหลังเข้ม */
  overflow-y: auto;
}

/* Sidebar ซ้าย */
.main-content > :first-child {
  flex: flex; /* ความกว้าง fix 200px */
  background-color: #222;
  color: white;
  padding: 5px;
}

/* Middle Content */
.main-content > :nth-child(2) {
  flex: 1; /* ขยายเต็มพื้นที่ */
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 8px;
}

/* Sidebar ขวา */
.main-content > :last-child {
  flex: flex;
  background-color: #222;
  color: white;
  padding: 10px;
}

/* Bottom bar */
.BottomBar {
  height: 50px;
  background-color: #1e1e1e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
