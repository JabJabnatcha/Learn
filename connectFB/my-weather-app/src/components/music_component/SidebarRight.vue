<template>
  <div class="right-sidebar">
    <div class="current-song" v-if="currentSong">
      <div class="current-song-title">{{ currentSong.title }}</div>
      <img class="cover" :src="currentSong.cover" alt="Current Cover" />
      <div class="current-song-meta">{{ currentSong.artist }} / {{ currentSong.album }}</div>
      <div class="current-song-desc">{{ currentSong.description }}</div>
    </div>

    <div class="divider"></div>

    <div class="next-up">
      <div style="font-weight:bold; margin-bottom: 8px;">Next Up:</div>
      <ul>
        <li v-for="(song) in nextSongs" :key="song.id" @click="playNextSong(song.id)">
          <img class="cover" :src="song.cover" alt="Next Cover" />
          <div class="song-info">
             {{ song.title }} - {{ song.artist }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import ChillVibes from '@/assets/Chill_Vibes.jpg';
import ChillVibes2 from '@/assets/Chill_Vibes2.jpg';
import CityLights from '@/assets/City_Lights.jpg';
import JazzClassics from '@/assets/Jazz_Classics.jpg';
import LateNight from '@/assets/Late_Night.jpg';
import MyRockHits from '@/assets/My_Rock_hits.jpg';

const currentSongId = ref(1);

const songs = [
  { 
    id: 1, cover: ChillVibes, title: "Song A", artist: "Artist 1", album: "Album 1",
    description: "This is a chill song with relaxing vibes to help you unwind."
  },
  { id: 2, cover: ChillVibes2, title: "Song B", artist: "Artist 2", album: "Album 2", description: "" },
  { id: 3, cover: CityLights, title: "Song C", artist: "Artist 3", album: "Album 3", description: "" },
  { id: 4, cover: JazzClassics, title: "Song D", artist: "Artist 4", album: "Album 4", description: "" },
  { id: 5, cover: LateNight, title: "Song E", artist: "Artist 5", album: "Album 5", description: "" },
  { id: 6, cover: MyRockHits, title: "Song F", artist: "Artist 6", album: "Album 6", description: "" },
];

const currentSong = computed(() => songs.find(s => s.id === currentSongId.value));
const nextSongs = computed(() => songs.filter(s => s.id !== currentSongId.value));

function playNextSong(id) {
  currentSongId.value = id;
}
</script>

<style scoped>
.right-sidebar {
  display: grid;
  grid-template-rows: auto 1px 1fr;
  gap: 12px;
  padding: 12px;
  background-color: #222;
  color: #eee;
  height: 100vh;
  width: 250px;
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;
}

/* เพลงปัจจุบัน */
.current-song {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  padding: 8px;
  border-radius: 10px;
  background-color: #2c2c2c;
}

.current-song-title {
  font-weight: bold;
  font-size: 18px;
  color: #78ff66;
  user-select: text;
}

.current-song img.cover {
  width: 170px;  /* กำหนดขนาดเอง */
  height: 170px;
  border-radius: 12px;
  object-fit: cover;
  user-select: none;
}

.current-song-meta {
  font-size: 14px;
  color: #ccc;
  user-select: text;
}

.current-song-desc {
  font-size: 12px;
  color: #aaa;
  margin-top: 6px;
  user-select: text;
  max-width: 260px;
  line-height: 1.3;
}

/* เส้นแบ่ง */
.divider {
  background-color: #444;
  height: 1px;
  width: 100%;
}

/* เพลงถัดไป */
.next-up {
  overflow-y: auto;
}

.next-up ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.next-up li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 4px;
  border-bottom: 1px solid #444;
  cursor: pointer;
  user-select: none;
}

.next-up li:hover {
  background-color: #333;
}

.next-up img.cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}

.next-up .song-info {
  font-size: 13px;
  color: #ccc;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-grow: 1;
}
</style>
