<template>
  <div>
    <Topbar />
    <div class="weather min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div class="container max-w-md space-y-4">

        <!-- Card 1: Weather Widget (พื้นขาว) -->
        <div class="bg-white text-black rounded shadow p-6 text-center font-bold text-2xl">
          Weather Widget
        </div>

        <!-- Card 2: สภาพอากาศในประเทศ (พื้นเหลือง) -->
        <div class="bg-yellow-400 text-black rounded shadow p-4 font-semibold">
          <div class="mb-2">สภาพอากาศในประเทศ</div>
          <select
            v-model="city"
            @change="fetchWeather"
            class="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option v-for="option in cities" :key="option.value" :value="option.value">
              {{ option.name }}
            </option>
          </select>
        </div>

        <!-- Card 3: Weather widget (พื้นขาว) -->
        <div class="bg-white text-black rounded shadow p-6 text-center font-semibold">
          <div class="flex justify-center items-center space-x-4 mb-2">
            <img
              v-if="weather.weather && weather.weather[0]"
              :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
              :alt="weather.weather[0].description"
              class="w-20 h-20 mx-auto"
            />
            <p class="text-6xl font-bold mb-0">
              {{ Math.round(weather.main?.temp) }}
              <span class="text-3xl align-top">{{ units === 'metric' ? '℃' : '℉' }}</span>
            </p>
          </div>
          <p class="mb-2 text-lg text-gray-700">{{ weather.weather?.[0]?.description }}</p>
          <p class="text-sm text-gray-600">{{ formattedDate }}</p>
        </div>

        <!-- Card 4: ข้อมูลลม ความชื้น ความกดอากาศ (พื้นเหลือง) -->
        <div class="bg-yellow-400 text-black rounded shadow p-6 font-semibold text-center">
        <div class="flex justify-between">
            <!-- ลม -->
            <div class="flex flex-col items-center">
            <p>ลม</p>
            <p class="text-2xl">{{ weather.wind?.speed }} {{ units === 'metric' ? 'm/s' : 'mph' }}</p>
            </div>

            <!-- ความชื้น -->
            <div class="flex flex-col items-center">
            <p>ความชื้น</p>
            <p class="text-2xl">{{ weather.main?.humidity }} %</p>
            </div>

            <!-- ความกดอากาศ -->
            <div class="flex flex-col items-center">
            <p>ความกดอากาศ</p>
            <p class="text-2xl">{{ weather.main?.pressure }} hPa</p>
            </div>
        </div>
        </div>


        <!-- แสดง error ถ้ามี -->
        <p v-if="error" class="mt-4 text-center text-red-600 font-semibold">{{ error }}</p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Topbar from '../components/Topbar.vue'

const apiKey = '822aa8da99d4dfbf95501c56def12fcf'

const cities = [
  { name: 'Thailand, TH', value: 'Bangkok,th' },
  { name: 'Japan, JP', value: 'Tokyo,jp' },
  { name: 'Taiwan, TW', value: 'Taipei,tw' },
]

const city = ref(cities[0].value)
const units = ref('metric')
const weather = ref({})
const error = ref('')

const fetchWeather = async () => {
  error.value = ''
  weather.value = {}

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units.value}&lang=th`
    const res = await fetch(url)
    const data = await res.json()
    if (data.cod === 200) {
      weather.value = data
    } else {
      error.value = '❌ ไม่พบข้อมูลสภาพอากาศสำหรับเมืองนี้'
    }
  } catch {
    error.value = '⚠️ เกิดข้อผิดพลาดในการดึงข้อมูล'
  }
}

const formattedDate = computed(() => {
  if (!weather.value.dt) return ''
  const date = new Date(weather.value.dt * 1000)
  return date.toLocaleString('th-TH', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

onMounted(fetchWeather)
</script>

<style scoped>
/* Container ตรงกลางหน้าจอ */
.weather {
  min-height: 100vh; /* เต็มความสูงหน้าจอ */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6; /* สีเทาอ่อน (คล้าย bg-gray-100) */
  padding: 1rem;
  box-sizing: border-box;
}

/* กำหนด container กว้างสุด 400px และเว้นระยะห่างระหว่าง card */
.container {
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Card style พื้นขาว ตัวหนังสือดำ */
.bg-white {
  background-color: #ffffff;
  color: #000000;
  border-radius: 0.5rem; /* มุมโค้ง */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
}

/* Card style พื้นเหลือง ตัวหนังสือดำ */
.bg-yellow-400 {
  background-color: #facc15; /* สีเหลืองสดใส */
  color: #000000;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem;
}

/* ขนาดและน้ำหนักตัวอักษร */
.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

/* ขนาดตัวหนังสือ */
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
  vertical-align: top;
}

/* จัดภาพกับตัวเลขให้อยู่กลางและเว้นระยะ */
.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

/* รูปไอคอนพยากรณ์อากาศ */
.w-20 {
  width: 5rem; /* 80px */
  height: 5rem; /* 80px */
  margin-left: auto;
  margin-right: auto;
}

/* สีข้อความต่างๆ */
.text-gray-700 {
  color: #4a5568;
}

.text-gray-600 {
  color: #718096;
}

/* ขนาดตัวหนังสือเล็ก */
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

/* ช่องเลือก (select) */
select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d6f879;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
}

/* ช่องเลือก focus */
select:focus {
  outline: none;
  border-color: #f59e0b; /* สีเหลืองเข้ม */
  box-shadow: 0 0 0 3px rgba(244, 160, 0, 0.4);
}

/* เว้นระยะใต้ข้อความ */
.mb-0 {
  margin-bottom: 0;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

/* จัดข้อความภายใน Card 4 ให้อยู่กึ่งกลาง */
.text-center {
  text-align: center;
}

/* สำหรับเว้นช่องว่างระหว่าง p ใน card 4 */
.font-semibold > div + div {
  margin-top: 1rem;
}
</style>

