<template>
  <div class="mid-content">
    <!-- Row 1: ปุ่มเลือก Music / Podcasts / All -->
    <div class="filter-row">
      <button
        :class="{ active: selectedFilter === 'All' }"
        @click="selectedFilter = 'All'"
      >All</button>
      <button
        :class="{ active: selectedFilter === 'Music' }"
        @click="selectedFilter = 'Music'"
      >Music</button>
      <button
        :class="{ active: selectedFilter === 'Podcasts' }"
        @click="selectedFilter = 'Podcasts'"
      >Podcasts</button>
    </div>

    <!-- Row 2: Your Playlist -->
    <section class="playlist-section">
      <ul class="playlist-list">
        <li v-for="(playlist, idx) in yourPlaylists" :key="idx" class="playlist-item">
          <img :src="playlist.cover" alt="Cover" />
          <div class="playlist-info">
            <strong>{{ playlist.name }}</strong>
            <p class="artist">{{ playlist.artist }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Row 3: Recently Played -->
     <section class="recommend-section">
      <h2>Recommend For You</h2>
      <ul class="recommend-list">
        <li v-for="(item, idx) in recommended" :key="idx" class="recommend-item">
          <img :src="item.cover" alt="Cover" />
          <div class="song-info">
            <strong>{{ item.title }}</strong>
            <p class="artist">{{ item.artist }}</p>
          </div>
        </li>
      </ul>
    </section>
    <!-- Row 4: Recommend For You -->
    <section class="recently-played">
      <h2>Recently Played</h2>
      <ul class="recent-list">
        <li v-for="(song, idx) in recentlyPlayed" :key="idx" class="recent-item">
          <img :src="song.cover" alt="Cover" />
          <div class="song-info">
            <strong>{{ song.title }}</strong>
            <p class="artist">{{ song.artist }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import rockCover from '@/assets/My_Rock_hits.jpg'
import chillCover from '@/assets/Chill_Vibes.jpg'
import popCover from '@/assets/Pop_Favorites.jpg'

import nightSkyCover from '@/assets/Night_Sky.jpg'
import oceanBreezeCover from '@/assets/Ocean_Breeze.jpg'
import cityLightsCover from '@/assets/City_Lights.jpg'

import summerDreamsCover from '@/assets/Summer_Dreams.jpg'
import jazzClassicsCover from '@/assets/Jazz_Classics.jpg'
import lateNightCover from '@/assets/Late_Night.jpg'

export default {
  name: "SpotifyMid",
  data() {
    return {
      selectedFilter: 'All',
      yourPlaylists: [
        { name: "My Rock Hits", artist: "AC/DC", cover: rockCover },
        { name: "Chill Vibes", artist: "Lofi Beats", cover: chillCover },
        { name: "Pop Favorites", artist: "Taylor Swift", cover: popCover },
        { name: "Jazz Classics", artist: "Miles Davis", cover: jazzClassicsCover },
        { name: "Summer Dreams", artist: "Pop Hits", cover: summerDreamsCover },
        { name: "Late Night", artist: "Chillhop", cover: lateNightCover },
      ],
      recommended: [
        { title: "Summer Dreams", artist: "Pop Hits", cover: summerDreamsCover },
        { title: "Jazz Classics", artist: "Miles Davis", cover: jazzClassicsCover },
        { title: "Late Night", artist: "Chillhop", cover: lateNightCover },
        { title: "My Rock Hits", artist: "AC/DC", cover: rockCover },
        { title: "Chill Vibes", artist: "Lofi Beats", cover: chillCover },
        { title: "Pop Favorites", artist: "Taylor Swift", cover: popCover },
      ],
      recentlyPlayed: [
        { title: "Night Sky", artist: "Lofi Beats", cover: nightSkyCover },
        { title: "Ocean Breeze", artist: "Smooth Jazz", cover: oceanBreezeCover },
        { title: "City Lights", artist: "Synthwave", cover: cityLightsCover },
        { title: "My Rock Hits", artist: "AC/DC", cover: rockCover },
        { title: "Chill Vibes", artist: "Lofi Beats", cover: chillCover },
        { title: "Pop Favorites", artist: "Taylor Swift", cover: popCover },
        { title: "Jazz Classics", artist: "Miles Davis", cover: jazzClassicsCover },
        { title: "Summer Dreams", artist: "Pop Hits", cover: summerDreamsCover },
        { title: "Late Night", artist: "Chillhop", cover: lateNightCover },
      ],
    };
  },
};
</script>

<style scoped>
/* Container หลัก แสดงผลเป็น column มีช่องว่างระหว่าง section */
.mid-content {
  background-color: #202020;
  flex: 2; /* ขยาย 2 เท่าของ sidebar ที่ flex:1 */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #e6e6e6;
  padding: 1rem;
  border-radius: 8px;
  min-width: 0; /* ป้องกัน overflow */
}

/* Row 1: ปุ่ม filter */
.filter-row {
  display: flex;
  gap: 0.1rem;
  justify-content: left;
}

.filter-row button {
  background-color: #404040;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  color: #d1d1d1;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.filter-row button.active,
.filter-row button:hover {
  background-color: #1db954; /* Spotify green */
  color: white;
}

/* Section title */
section h2 {
  margin-bottom: 0.5rem;
  font-weight: 700;
}

/* Your Playlist */
/* แสดงรายการแบบ flex-wrap แสดงเป็น 2 แถว */
.playlist-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  overflow-x: hidden;
}

/* รายการแต่ละอันใน Playlist */
.playlist-item {
  background-color: #303030;
  border-radius: 8px;
  padding: 0.5rem;
  width: 200px; /* กว้างประมาณครึ่งบรรทัด */
  height: 60px;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.playlist-item:hover {
  background-color: #3a3a3a;
}

/* รูปปก Playlist */
.playlist-item img {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
}

/* ข้อมูล Playlist: ชื่อเพลงและศิลปิน */
.playlist-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.playlist-info strong {
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.playlist-info .artist {
  font-size: 0.85rem;
  color: #aaa;
}

/* Recently Played & Recommend For You */
/* แสดงรายการแนวนอน เลื่อนซ้ายขวาได้ */
.recent-list,
.recommend-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

/* รายการปกติ (item ลำดับ 2 เป็นต้นไป) */
/* แสดงเป็น column, รูปใหญ่ 120x120, ข้อความใต้รูป */
.recent-item,
.recommend-item {
  background-color: #303030;
  border-radius: 8px;
  padding: 0.5rem;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
}

.recent-item:hover,
.recommend-item:hover {
  background-color: #3a3a3a;
}

/* รูปปกในรายการปกติ */
.recent-item img,
.recommend-item img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

/* ข้อความในรายการปกติ */
.song-info strong {
  font-size: 1rem;
  line-height: 1.2;
}

.song-info .artist {
  font-size: 0.85rem;
  color: #aaa;
  margin-top: 0.25rem;
}

/* รายการแรกใน Recommend List ให้ layout เป็นแถวแนวนอน */
/* กว้างและสูงกว่า item ปกติ */
.recommend-list li:first-child {
  background-color: #303030;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  min-width: 250px;
  display: flex;
  flex-direction: row;       /* วางแนวนอน */
  align-items: center;       /* จัดชิดกลางแนวตั้ง */
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: left;          /* ข้อความชิดซ้าย */
}

.recommend-list li:first-child:hover {
  background-color: #3a3a3a;
}

/* รูปปกในรายการแรก กว้าง 200 สูง 60 พร้อม margin ขวา */
.recommend-list li:first-child img {
  width: 200px;
  height: 60px;
  border-radius: 6px;
  margin-right: 1rem;
  object-fit: cover;
  margin-bottom: 0;
}

/* ข้อมูลเพลงในรายการแรก แยก 2 แถว (ชื่อเพลง / ศิลปิน-อัลบั้ม) */
.recommend-list li:first-child .song-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  min-width: 200px;
  gap: 0.2rem;
}

/* ชื่อเพลงในแถวบน */
.recommend-list li:first-child .song-info strong {
  font-size: 1.2rem;
  line-height: 30px;
  width: 100px;
  white-space: nowrap;      /* ห้ามขึ้นบรรทัดใหม่ */
  overflow: hidden;         /* ซ่อนข้อความที่ล้น */
  text-overflow: ellipsis;  /* แสดง ... เมื่อข้อความล้น */
}

/* ชื่อศิลปิน/อัลบั้มในแถวล่าง */
.recommend-list li:first-child .song-info .artist {
  font-size: 0.9rem;
  color: #aaa;
  line-height: 30px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
