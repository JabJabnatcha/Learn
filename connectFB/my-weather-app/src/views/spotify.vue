<template>
  <div class="music-app">
    <Topbar />
    <Music_topbar />
    <div class="layout">
        <Sidebar />
        <SpotifyMid />
        <RightSidebar />
    </div>
  </div>
</template>

<script>
import RightSidebar from '../components/spotify/spotify_sidebar_right.vue'
import Sidebar from '../components/spotify/spotify_sidebar_left.vue';
import SpotifyMid from '../components/spotify/spotify_mid.vue'
import Topbar from '../components/Topbar.vue'
import Music_topbar from '../components/spotify/Music_topbar.vue';

export default {
  components: { Topbar,Sidebar,RightSidebar,SpotifyMid,Music_topbar }
}
</script>

<style>
/* พื้นหลังเต็มจอ */
html, body {
  background-color: #000;
  margin: 0;
  padding: 0;
  height: 100%;
}

/* ให้ div หลักกินพื้นที่เต็มจอ */
.music-app {
  min-height: 100vh;
  color: #e6e6e6;
}

.title{
    text-align: center;
}

/* layout */
.layout {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.column-mid {
  background-color: #303030;
  padding: 1rem;
  font-weight: bold;
  color: #d1d1d1;
  border-radius: 8px;
}

.column-left {
  flex: 1;
}

.column-mid {
  flex: 2;
}

.column-right {
  flex: 1;
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
}
</style>
