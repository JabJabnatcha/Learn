<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>🌤️ Vue Weather Checker</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <style>
    body { font-family: Arial; padding: 2rem; background: #f0f0f0; }
    h1 { color: #333; }
    input, button { padding: 0.5rem; font-size: 16px; }
    .weather-result { margin-top: 1rem; font-size: 18px; }
    .error { color: red; margin-top: 1rem; }
  </style>
</head>
<body>
  <div id="app">
    <h1>🌤️ ตรวจสอบสภาพอากาศ (Vue)</h1>

    <input v-model="city" placeholder="กรอกชื่อเมือง เช่น Bangkok">
    <button @click="getWeather">ดูอากาศ</button>

    <div v-if="weather" class="weather-result">
      🌡️ อุณหภูมิ: {{ weather.main.temp }}°C<br>
      📌 สภาพอากาศ: {{ weather.weather[0].description }}
    </div>

    <div v-if="error" class="error">
      ❌ {{ error }}
    </div>
  </div>

  <script>
    const { createApp } = Vue;

    createApp({
      data() {
        return {
          city: '',
          weather: null,
          error: '',
          apiKey: '822aa8da99d4dfbf95501c56def12fcf'
        };
      },
      methods: {
        getWeather() {
          this.weather = null;
          this.error = '';

          const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric&lang=th`;

          axios.get(url)
            .then(response => {
              this.weather = response.data;
            })
            .catch(error => {
              console.error('เกิดข้อผิดพลาด:', error);
              this.error = 'ไม่พบเมืองนี้ หรือเกิดข้อผิดพลาด';
            });
        }
      }
    }).mount('#app');
  </script>
</body>
</html>
