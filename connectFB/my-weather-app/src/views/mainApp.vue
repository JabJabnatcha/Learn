<template>
  <Topbar />
  <div class="app">
    <h1>🌤️ ตรวจสอบสภาพอากาศ</h1>
    <input v-model="city" placeholder="กรอกชื่อเมือง เช่น Bangkok" />
    <button @click="getWeather">ดูอากาศ</button>

    <div class="weather">
      <p v-if="error" style="color:red;">{{ error }}</p>
      <p v-else-if="weather">
        🌡️ อุณหภูมิ: {{ weather.temp }}°C<br />
        📌 สภาพอากาศ: {{ weather.desc }}
      </p>
      <p v-else>ยังไม่มีข้อมูล</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const city = ref('')
const weather = ref(null)
const error = ref('')
const apiKey = '822aa8da99d4dfbf95501c56def12fcf' // << ใช้ API key จริงของคุณ

const getWeather = async () => {
  error.value = ''
  weather.value = null

  if (!city.value) {
    error.value = '❗ กรุณากรอกชื่อเมือง'
    return
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric&lang=th`
    const res = await fetch(url)
    const data = await res.json()

    if (data.cod === 200) {
      weather.value = {
        temp: data.main.temp,
        desc: data.weather[0].description
      }
    } else {
      error.value = '❌ ไม่พบเมืองนี้'
    }
  } catch (err) {
    error.value = '⚠️ เกิดข้อผิดพลาดในการดึงข้อมูล'
  }
}
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: #f0f0f0;
}
input,
button {
  padding: 0.5rem;
  font-size: 16px;
  margin-right: 0.5rem;
}
.weather {
  margin-top: 1rem;
  font-size: 18px;
}
</style>
