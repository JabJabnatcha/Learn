<template>
  <div class="container">
    <!-- row 1 -->
    <div class="row row-12">
      <div class="col col-12">12 grid</div>
    </div>
    <!-- row 2 -->
    <div class="row row-6">
      <div class="col col-6">6 grid</div>
      <div class="col col-6">6 grid</div>
    </div>
    <!-- row 3 -->
    <div class="row row-4">
      <div class="col col-4">4 grid</div>
      <div class="col col-4">4 grid</div>
      <div class="col col-4">4 grid</div>
    </div>
    <!-- row 4 -->
    <div class="row row-3">
      <div class="col col-3">3 grid</div>
      <div class="col col-3">3 grid</div>
      <div class="col col-3">3 grid</div>
      <div class="col col-3">3 grid</div>
    </div>
    <!-- row 5 -->
    <div class="row row-2">
      <div class="col col-2">2 grid</div>
      <div class="col col-2">2 grid</div>
      <div class="col col-2">2 grid</div>
      <div class="col col-2">2 grid</div>
      <div class="col col-2">2 grid</div>
      <div class="col col-2">2 grid</div>
    </div>
    <!-- row 6 -->
    <div class="row row-1">
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
      <div class="col col-1">1 grid</div>
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
/* max-width: 960px; */
/* ทุกแถวใช้ grid container กำหนด 12 คอลัมน์เท่ากัน */
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

/* col-x คือ span grid กี่ช่องจาก 12 ช่อง */
.col-12 { grid-column: span 12; }
.col-6  { grid-column: span 6; }
.col-4  { grid-column: span 4; }
.col-3  { grid-column: span 3; }
.col-2  { grid-column: span 2; }
.col-1  { grid-column: span 1; }
</style>
