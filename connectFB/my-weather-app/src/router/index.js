// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// import หน้า mainApp.vue
import MainApp from '../views/mainApp.vue'  
import GridExample from '../views/GridExample.vue'
import TwelveGrid from '../views/12Grid.vue'  // เปลี่ยนชื่อเป็น TwelveGrid (ไม่เริ่มต้นด้วยตัวเลข)
import TwelveGrid2 from '../views/12Grid2.vue' 
import weather from '../views/weather.vue'
import spotify from '../views/spotify.vue'

const routes = [
  {
    path: '/',      // root ชี้ mainApp
    component: MainApp
  },
  {
    path: '/grid',
    component: GridExample
  },
  {
    path: '/12grid',   // ให้ path เป็น /12grid เล็กทั้งหมด เพื่อให้ตรงกับ router-link
    component: TwelveGrid
  },
  {
    path: '/12grid2',   // ให้ path เป็น /12grid เล็กทั้งหมด เพื่อให้ตรงกับ router-link
    component: TwelveGrid2
  },
  {
    path: '/weather',   // ให้ path เป็น /12grid เล็กทั้งหมด เพื่อให้ตรงกับ router-link
    component: weather
  },
  {
    path: '/spotify',   
    component: spotify
  }
]

const router = createRouter({
  history: createWebHistory(), 
  routes,
})

export default router
