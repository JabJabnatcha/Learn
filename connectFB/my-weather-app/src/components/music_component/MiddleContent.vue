<template>
  <div class="middle-content" :style="{ maxWidth: containerWidth + 'px' }">
    <!-- Row 1: Filter buttons -->
    <div class="row filter-row">
      <button class="filter-btn active">All</button>
      <button class="filter-btn">Music</button>
      <button class="filter-btn">Podcasts</button>
    </div>

    <!-- Row 2: Slider area with 2 rows x 4 items -->
    <div class="row slider-row">
      <div class="slider-content" ref="sliderRef">
        <div class="item" v-for="(item, index) in sliderData" :key="'slider-'+index">
          <img :src="item.cover" alt="Cover" />
          <div class="text-info">
            <div class="song-title">{{ item.song }}</div>
            <div class="album-name">{{ item.album }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 3: Recommend for you -->
    <div class="row recommend-row">
      <h3>Recommend for you</h3>
      <div class="recommend-slider">
        <button class="slider-btn" @click="scrollLeft('recommend')">&lt;</button>
        <div class="recommend-items" ref="recommendRef">
          <!-- ใหญ่ช่องแรก -->
          <div class="item large" v-if="recommendData.length">
            <img :src="recommendData[0].cover" alt="Cover" />
            <div class="text-info">
              <div class="song-title">{{ recommendData[0].song }}</div>
              <div class="album-name">{{ recommendData[0].album }}</div>
            </div>
          </div>
          <!-- ช่องที่ 2 ขึ้นไป -->
          <div
            class="item small"
            v-for="(item, index) in recommendData.slice(1)"
            :key="'rec-'+index"
          >
            <img :src="item.cover" alt="Cover" />
            <div class="text-info">
              <div class="song-title">{{ item.song }}</div>
            </div>
          </div>
        </div>
        <button class="slider-btn" @click="scrollRight('recommend')">&gt;</button>
      </div>
    </div>

    <!-- Row 4: Recently Played -->
    <div class="row recently-played-row">
      <h3>Recently Played</h3>
      <div class="recommend-slider">
        <button class="slider-btn" @click="scrollLeft('recently')">&lt;</button>
        <div class="recently-played-items" ref="recentlyRef">
          <div
            class="item small"
            v-for="(item, index) in recentlyPlayedData"
            :key="'recent-'+index"
          >
            <img :src="item.cover" alt="Cover" />
            <div class="text-info">
              <div class="song-title">{{ item.song }}</div>
            </div>
          </div>
        </div>
        <button class="slider-btn" @click="scrollRight('recently')">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import rockCover from '@/assets/My_Rock_hits.jpg'
import chillCover from '@/assets/Chill_Vibes.jpg'
import popCover from '@/assets/Pop_Favorites.jpg'
import nightSkyCover from '@/assets/Night_Sky.jpg'
import oceanBreezeCover from '@/assets/Ocean_Breeze.jpg'
import cityLightsCover from '@/assets/City_Lights.jpg'
import summerDreamsCover from '@/assets/Summer_Dreams.jpg'
import jazzClassicsCover from '@/assets/Jazz_Classics.jpg'
import lateNightCover from '@/assets/Late_Night.jpg'

const containerWidth = 900

const sliderData = [
  { cover: rockCover, song: "Rock Anthem", album: "My Rock Hits" },
  { cover: chillCover, song: "Chill Vibes", album: "Chill Vibes Album" },
  { cover: popCover, song: "Pop Favorites", album: "Pop Album" },
  { cover: nightSkyCover, song: "Night Sky", album: "Night Sky Album" },
  { cover: oceanBreezeCover, song: "Ocean Breeze", album: "Ocean Breeze Album" },
  { cover: cityLightsCover, song: "City Lights", album: "City Lights Album" },
  { cover: summerDreamsCover, song: "Summer Dreams", album: "Summer Dreams Album" },
  { cover: jazzClassicsCover, song: "Jazz Classics", album: "Jazz Classics Album" },
]

const recommendData = [
  { cover: rockCover, song: "Rock Anthem", album: "My Rock Hits" },
  { cover: chillCover, song: "Chill Vibes" },
  { cover: popCover, song: "Pop Favorites" },
  { cover: nightSkyCover, song: "Night Sky" },
  { cover: oceanBreezeCover, song: "Ocean Breeze" },
  { cover: cityLightsCover, song: "City Lights" },
]

const recentlyPlayedData = [
  { cover: summerDreamsCover, song: "Summer Dreams" },
  { cover: jazzClassicsCover, song: "Jazz Classics" },
  { cover: lateNightCover, song: "Late Night" },
  { cover: chillCover, song: "Chill Vibes" },
  { cover: popCover, song: "Pop Favorites" },
  { cover: rockCover, song: "Rock Anthem" },
]

const sliderRef = ref(null)
const recommendRef = ref(null)
const recentlyRef = ref(null)

function scrollLeft(section) {
  let el
  if(section === 'slider') el = sliderRef.value
  else if(section === 'recommend') el = recommendRef.value
  else if(section === 'recently') el = recentlyRef.value

  if (el) {
    el.scrollBy({ left: -250, behavior: 'smooth' })
  }
}
function scrollRight(section) {
  let el
  if(section === 'slider') el = sliderRef.value
  else if(section === 'recommend') el = recommendRef.value
  else if(section === 'recently') el = recentlyRef.value

  if (el) {
    el.scrollBy({ left: 250, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.middle-content {
  background: #111;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  margin: 0 auto;
  max-width: 900px;

  /* ตัวแปรสำหรับปรับขนาด content */
  --item-height: 70px;
  --item-width-small: 110px;
  --item-width-large: 260px;
  --item-image-small: 80px;
  --item-image-large: 100px;
  --slider-row-height: 100px;
}

/* Filter buttons */
.filter-row {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-start;
  margin-bottom: 0.25rem; /* แถวบน-ล่างใกล้กันขึ้น */
}

.filter-btn {
  border-radius: 20px;
  border: none;
  padding: 0 15px;
  height: 30px;
  background: #333;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  white-space: nowrap;
  user-select: none;
}
.filter-btn.active,
.filter-btn:hover {
  background: #78ff66;
  color: #000;
}

/* Slider buttons */
.slider-btn {
  background: #222;
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 35px;
  height: 80px;
  cursor: pointer;
  border-radius: 10px;
  user-select: none;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: inset 0 0 5px #000;
}
.slider-btn:hover {
  background: #78ff66;
  color: #000;
}

/* Row 2 - Slider content (2 rows x 4 columns) */
.slider-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, var(--slider-row-height));
  gap: 1rem;
  flex-grow: 1;
  overflow-x: auto;
  scrollbar-width: none;
  scroll-behavior: smooth;
}
.slider-content::-webkit-scrollbar {
  display: none;
}

.slider-content .item {
  height: var(--item-height);
  background: #444;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease;
}
.slider-content .item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.slider-content .item .text-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.slider-content .item .song-title {
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.slider-content .item .album-name {
  font-size: 0.8rem;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Recommend for you */
.recommend-row h3,
.recently-played-row h3 {
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
}

.recommend-slider,
.recently-played-items {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
}

/* Recommend items container scroll */
.recommend-items,
.recently-played-items {
  display: flex;
  gap: 0.5rem;
  flex-grow: 1;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.recommend-items::-webkit-scrollbar,
.recently-played-items::-webkit-scrollbar {
  display: none;
}

/* Recommend items */
.recommend-items .item.large {
  flex: 0 0 var(--item-width-large);
  background: #555;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  gap: 12px;
  padding: 10px;
  color: white;
  font-weight: 600;
}
.recommend-items .item.large img {
  width: var(--item-image-large);
  height: var(--item-image-large);
  object-fit: cover;
  border-radius: 8px;
}
.recommend-items .item.large .text-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 120px;
}
.recommend-items .item.large .song-title {
  font-size: 1.1rem;
  margin-bottom: 4px;
}
.recommend-items .item.large .album-name {
  font-size: 0.85rem;
  color: #b3b3b3;
}

/* Recommend small items */
.recommend-items .item.small {
  flex: 0 0 var(--item-width-small);
  background: #444;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease;
}
.recommend-items .item.small img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 6px;
}

/* Recently Played items */
.recently-played-items .item.small {
  flex: 0 0 130px;
  background: #444;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease;
}
.recently-played-items .item.small img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 6px;
}

/* Responsive */
@media (max-width: 800px) {
  .recommend-items .item.large {
    flex: 0 0 180px;
  }
  .recommend-items .item.small,
  .recently-played-items .item.small {
    flex: 0 0 110px;
  }
  .slider-content {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, var(--slider-row-height));
  }
}

</style>
