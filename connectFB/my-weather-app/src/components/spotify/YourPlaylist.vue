<template>
  <section class="playlist-section">
    <ul class="playlist-list">
      <li v-for="(playlist, idx) in playlists" :key="idx" class="playlist-item">
        <img :src="playlist.cover" alt="Cover" />
        <div class="playlist-info">
          <strong>{{ playlist.name }}</strong>
          <p class="artist">{{ playlist.artist }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "YourPlaylist",
  props: {
    playlists: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.playlist-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  overflow-x: hidden;
}

.playlist-item {
  background-color: #303030;
  border-radius: 8px;
  padding: 0.5rem;
  width: 200px;
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

.playlist-item img {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  object-fit: cover;
}

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
</style>
