<template>
  <div class="right-sidebar">
    <!-- Playlist ล่าสุด -->
    <div class="current-playlist">
        <h3>📀 {{ currentPlaylist.name }}</h3>
        <p class="artist">by {{ currentPlaylist.artist }}</p>
        <img :src="currentPlaylist.cover" alt="Playlist cover" class="cover" />
    </div>

    <!-- เพลงปัจจุบัน -->
    <div class="current-song">
      <img :src="currentSong.cover" alt="Album cover" class="cover" />
      <div class="song-info">
        <strong>{{ currentSong.title }}</strong>
        <p class="artist">{{ currentSong.artist }}</p>
      </div>
    </div>

    <!-- เพลงถัดไป -->
    <div class="next-songs">
      <h4>🎵 เพลงต่อไป</h4>
      <ul>
        <li v-for="(song, index) in nextSongs" :key="index">
          <img :src="song.cover" alt="Cover" class="cover-small" />
          <div>
            <strong>{{ song.title }}</strong>
            <p class="artist">{{ song.artist }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import coverChill from '@/assets/Chill_Vibes.jpg'
import coverNightSky from '@/assets/Night_Sky.jpg'
import coverOcean from '@/assets/Ocean_Breeze.jpg'
import coverCity from '@/assets/City_Lights.jpg'
import coverSummer from '@/assets/Summer_Dreams.jpg'

export default {
  name: "RightSidebar",
  data() {
    return {
      currentPlaylist: {
        name: "Chill Vibes",
        artist: "Various Artists",
        cover: coverChill
      },
      currentSong: {
        title: "Night Sky",
        artist: "Lofi Beats",
        cover: coverNightSky
      },
      nextSongs: [
        {
          title: "Ocean Breeze",
          artist: "Smooth Jazz",
          cover: coverOcean
        },
        {
          title: "City Lights",
          artist: "Synthwave",
          cover: coverCity
        },
        {
          title: "Summer Dreams",
          artist: "Pop Hits",
          cover: coverSummer
        }
      ]
    };
  }
};
</script>


<style scoped>
.right-sidebar {
  background-color:#202020;
  padding: 1rem;
  border-radius: 8px;
  width:200px;
  display: flex;
  flex-direction: column;
}

.current-playlist h3 {
  margin: 0;
  color: #fff;
}

.artist {
  font-size: 0.85rem;
  color: #bbb;
}

.current-song {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cover {
  width: 80px;
  height: 80px;
  border-radius: 6px;
}

.next-songs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.next-songs li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
}

.cover-small {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
</style>
