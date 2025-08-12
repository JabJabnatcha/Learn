<template>
  <section class="recommend-section">
    <h2>Recommend For You</h2>
    <ul class="recommend-list">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        :class="['recommend-item', { 'first-item': idx === 0 }]"
      >
        <img :src="item.cover" alt="Cover" />
        <div class="song-info">
          <strong>{{ item.title }}</strong>
          <p class="artist">{{ item.artist }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "RecommendForYou",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Container: แสดงรายการเป็นแถวแนวนอน เลื่อนซ้ายขวาได้ */
.recommend-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

/* รายการปกติ */
.recommend-item {
  background-color: #303030;
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 150px;   /* ความกว้างพื้นฐาน */
  max-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
}

/* รายการแรก: ให้ภาพชิดซ้ายและสูงเต็มความสูงของกรอบ */
.recommend-item.first-item {
  display: flex;
  min-width: 300px;   /* ความกว้างพื้นฐาน */
  max-width: 300px;
  flex-direction: row;
  align-items: center;
  text-align: left;
  padding: 0.5rem 1rem;
  height: 180px; /* กำหนดความสูงชัดเจนให้กล่อง */
}
/* ภาพชิดซ้าย สูงเต็มกรอบ */
.recommend-item.first-item img {
  width: auto;
  height: calc(100% - 4px); /* สูงกว่าความสูง container ลดลง 4px */
  border-radius: 6px;
  margin-right: 1rem;
  margin-left: 0;
  object-fit: cover;
}
/* ตัวหนังสืออยู่ด้านขวา */
.recommend-item.first-item .song-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;        /* ความสูงเท่ากับ li */
  min-width: 200px;
  gap: 0.2rem;
}

/* เปลี่ยนสีพื้นหลังเมื่อ hover */
.recommend-item:hover {
  background-color: #3a3a3a;
}

/* รูปปก ขนาดเท่าเดิมทุกอัน */
.recommend-item img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

/* ข้อความชื่อเพลง */
.song-info strong {
  font-size: 1rem;
  line-height: 1.2;
}

/* ข้อความชื่อศิลปิน */
.song-info .artist {
  font-size: 0.85rem;
  color: #aaa;
  margin-top: 0.25rem;
}
</style>
