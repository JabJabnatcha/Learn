<template>
  <div>
    <Topbar />
    <div class="container">
      <!-- row 1: 12 grid -->
      <div class="row">
        <div class="col col-12">12 grid</div>
      </div>

      <!-- row 2: [6 grid A (row span 2)] [6 grid] -->
      <div class="row">
        <div class="col col-6 itemA">6 grid A (row span 2)</div>
        <div class="col col-6 itemB">6 grid</div>
        <div class="col col-6 itemB">6 grid</div>
      </div>

      <!-- row 3: [6 grid A (ต่อเนื่อง)] [3 grid] [3 grid] -->
      <div class="row">
        <!-- itemA ต่อเนื่อง row span 2 -->
        <!-- ว่างไว้ตรงนี้ เพราะ itemA ยึดพื้นที่แล้ว -->
        <div class="col col-3">3 grid</div>
        <div class="col col-3">3 grid</div>
        <div class="col col-3">3 grid</div>
        <div class="col col-3">3 grid</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ไม่มี logic เพิ่มเติม
</script>

<style scoped>
.container {
  width: 100%;
  margin: auto;
}

/* grid container กำหนด 12 columns */
.row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;
  margin-bottom: 1rem;
}

.col {
  background-color: #90caf9;
  border: 1px solid #0d47a1;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  color: #0d47a1;
}

/* span กี่ช่อง */
.col-12 { grid-column: span 12; }
.col-6  { grid-column: span 6; }
.col-3  { grid-column: span 3; }

/* กำหนดให้ itemA เริ่มที่แถว 1 ถึง 3 (span 2 แถว) */
.itemA {
  grid-row-start: 1; /* เริ่มที่เส้นตารางแถวที่ 1 */
  grid-row-end: 3;   /* สิ้นสุดที่เส้นตารางแถวที่ 3 (กินพื้นที่ 2 แถว) */
  height: 300px;     /* กำหนดความสูงของกล่องเป็น 600px */
}

/* กำหนดความสูง 300px ให้กล่อง 6 grid ด้านขวา */
.itemB {
  height: 150px;
}
</style>
