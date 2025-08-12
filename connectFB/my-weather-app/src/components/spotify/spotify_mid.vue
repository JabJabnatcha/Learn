<template>
  <div class="mid-content">
    <!-- Row 1: ปุ่ม filter -->
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
    <YourPlaylist :playlists="yourPlaylists" />

    <!-- Row 3: Recently Played -->
    <RecommendForYou :items="recommended" />

    <!-- Row 4: Recommend For You -->
    <RecentlyPlayed :songs="recentlyPlayed" />
    
  </div>
</template>

<script>
import YourPlaylist from './YourPlaylist.vue'
import RecentlyPlayed from './RecentlyPlayed.vue'
import RecommendForYou from './RecommendForYou.vue'

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
  components: { YourPlaylist, RecentlyPlayed, RecommendForYou },
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
  }
}
</script>

<style scoped>
/* โค้ด CSS ของ SpotifyMid.vue รวมถึง filter-row และ mid-content */
.mid-content {
  background-color: #202020;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #e6e6e6;
  padding: 1rem;
  border-radius: 8px;
  min-width: 0;
}

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
  background-color: #1db954;
  color: white;
}
</style>
