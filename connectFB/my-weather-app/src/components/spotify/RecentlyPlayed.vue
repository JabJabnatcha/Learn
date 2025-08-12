<template>
  <section class="recently-played">
    <h2>Recently Played</h2>
    <ul class="recent-list">
      <li v-for="(song, idx) in songs" :key="idx" class="recent-item">
        <img :src="song.cover" alt="Cover" />
        <div class="song-info">
          <strong>{{ song.title }}</strong>
          <p class="artist">{{ song.artist }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "RecentlyPlayed",
  props: {
    songs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.recent-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.recent-item {
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

.recent-item:hover {
  background-color: #3a3a3a;
}

.recent-item img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.song-info strong {
  font-size: 1rem;
  line-height: 1.2;
}

.song-info .artist {
  font-size: 0.85rem;
  color: #aaa;
  margin-top: 0.25rem;
}
</style>
