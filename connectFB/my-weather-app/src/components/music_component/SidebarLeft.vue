<template>
  <div :class="['sidebar-left', { collapsed: isCollapsed }]">
    <!-- ปุ่มพับ/ขยาย Sidebar -->
    <button class="collapse-btn" @click="toggleCollapse" :title="isCollapsed ? 'ขยาย' : 'พับ'">
      <span v-if="isCollapsed">▶</span>
      <span v-else>◀</span>
    </button>

    <!-- Filter Buttons (ซ่อนเมื่อพับ) -->
    <div v-if="!isCollapsed" class="filter-buttons">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="['filter-btn', { active: filter === activeFilter }]"
        @click="setFilter(filter)"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Search + Sort (ซ่อนเมื่อพับ) -->
    <div v-if="!isCollapsed" class="search-sort-row">
      <div class="search-wrapper">
        <!-- ปุ่มค้นหา 🔍 แสดงตลอด -->
        <button
          class="search-icon-btn"
          @click="toggleSearch"
          title="ค้นหา 🔍"
        >
          🔍
        </button>

        <!-- ช่อง input ค้นหา แสดงเฉพาะเมื่อเปิด -->
        <input
          v-show="isSearchOpen"
          type="text"
          class="search-bar"
          placeholder="search..."
          v-model="searchQuery"
          ref="searchInput"
        />
      </div>

      <!-- ส่วน sort by -->
      <div class="sortby-wrapper">
        <button class="sortby-btn" @click="toggleSortDropdown">
          {{ selectedSort }}
          <span>▼</span>
        </button>
        <ul v-if="showSortDropdown" class="sortby-dropdown">
          <li v-for="option in sortOptions" :key="option" @click="selectSort(option)">
            {{ option }}
          </li>
        </ul>
      </div>
    </div>

    <!-- รายการเพลง -->
    <div class="song-list">
      <div
        v-for="song in filteredSongs"
        :key="song.id"
        class="song-row"
      >
        <img class="cover" :src="song.cover" alt="cover" />
        
        <template v-if="!isCollapsed">
          <div class="song-info">
            <div class="song-title">{{ song.title }}</div>
            <div class="song-artist">{{ song.artist }}</div>
          </div>
          <button class="pin-btn" @click="togglePin(song.id)" :title="song.pinned ? 'ยกเลิกปักหมุด' : 'ปักหมุด'">
            {{ song.pinned ? '📌' : '📍' }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import ChillVibes from '@/assets/Chill_Vibes.jpg';
    import ChillVibes2 from '@/assets/Chill_Vibes2.jpg';
    import CityLights from '@/assets/City_Lights.jpg';
    import JazzClassics from '@/assets/Jazz_Classics.jpg';
    import LateNight from '@/assets/Late_Night.jpg';
    import MyRockHits from '@/assets/My_Rock_hits.jpg';

export default {
  name: 'SidebarLeft',
  data() {
    return {
      isCollapsed: false,
      filters: ['Playlist', 'Podcasts', 'Albums', 'Artists'],
      activeFilter: 'Playlist',
      isSearchOpen: false,
      searchQuery: '',
      sortOptions: ['Recents', 'Recents Add', 'Alphabetical', 'Creator', 'Custom order'],
      selectedSort: 'Recents',
      showSortDropdown: false,
      songs: [
        { id: 1, cover: ChillVibes, title: 'Song A', artist: 'Artist 1', pinned: false },
        { id: 2, cover: ChillVibes2, title: 'Song B', artist: 'Artist 2', pinned: false },
        { id: 3, cover: CityLights, title: 'Song C', artist: 'Artist 3', pinned: false },
        { id: 4, cover: JazzClassics, title: 'Song D', artist: 'Artist 4', pinned: false },
        { id: 5, cover: LateNight, title: 'Song E', artist: 'Artist 5', pinned: false },
        { id: 6, cover: MyRockHits, title: 'Song F', artist: 'Artist 6', pinned: false },
    ]
    };
  },
  computed: {
    filteredSongs() {
      let filtered = this.songs;
      if (this.searchQuery.trim()) {
        filtered = filtered.filter(song =>
          song.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return filtered;
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) this.isSearchOpen = false;
    },
    setFilter(filter) {
      this.activeFilter = filter;
    },
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },
    selectSort(option) {
      this.selectedSort = option;
      this.showSortDropdown = false;
    },
    togglePin(songId) {
      const song = this.songs.find(s => s.id === songId);
      if (song) song.pinned = !song.pinned;
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    }
  },
  watch: {
    isSearchOpen(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus();
        });
      }
    }
  }
};
</script>

<style scoped>
.sidebar-left {
  width: 325px;
  background-color: #222;
  color: #eee;
  height: 100vh;
  padding: 12px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  position: relative;
  transition: width 0.3s ease;
  overflow: hidden;
  user-select: none;
}

.sidebar-left.collapsed {
  width: 70px;
}

.collapse-btn {
  position: absolute;
  top: 12px;
  left: 10px;
  background-color: #444;
  border: none;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 6px rgba(0,0,0,0.4);
  transition: background-color 0.3s ease;
}
.collapse-btn:hover {
  background-color: #666;
}

.filter-buttons {
  display: flex;
  gap: 0.1px;
  margin-top: 50px;
  justify-content: center;
}

.filter-btn {
  background-color: #444;
  border: none;
  border-radius: 20px;
  padding: 5px 5px;
  color: #ddd;
  font-weight: 50;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.filter-btn:hover,
.filter-btn.active {
  background-color: #78ff66;
  color: #000000;
}

.search-sort-row {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-icon-btn {
  background-color: #444;
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  flex-grow: 1;
  background-color: #333;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  transition: width 0.3s ease;
  box-sizing: border-box;
}

.sortby-wrapper {
  position: relative;
}

.sortby-btn {
  background-color: #444;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  color: white;
  font-weight: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 1px;
  user-select: none;
}

.sortby-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background-color: #333;
  list-style: none;
  padding: 6px 0;
  margin: 0;
  border-radius: 8px;
  width: max-content;
  min-width: 150px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.7);
  z-index: 10;
}

.sortby-dropdown li {
  padding: 8px 16px;
  cursor: pointer;
  white-space: nowrap;
}

.sortby-dropdown li:hover {
  background-color: #555;
}

.song-list {
  margin-top: 20px;
  flex-grow: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.song-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  height: 60px;
}
.song-row:hover {
  background-color: #333;
}

.cover {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
  margin-top: 0;
}

.song-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  color: #ccc;
  font-size: 14px;
}

.pin-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;
  transition: color 0.2s ease;
}
.pin-btn:hover {
  color: #ffcc00;
}

/* ซ่อนรายละเอียดตอน sidebar พับ */
.sidebar-left.collapsed {
  width: 70px;
  overflow-x: hidden;
}

/* ซ่อนรายละเอียด และปุ่มต่าง ๆ เมื่อพับ */
.sidebar-left.collapsed .filter-buttons,
.sidebar-left.collapsed .search-sort-row,
.sidebar-left.collapsed .song-info,
.sidebar-left.collapsed .pin-btn {
  display: none;
}

/* แสดงแค่รูปปกเพลง และจัดแนวกลาง */
.sidebar-left.collapsed .song-row {
  justify-content: center; /* จัดกึ่งกลางแนวนอน */
  padding: 8px 0;
}

/* รูปปกเพลงเมื่อพับ อาจปรับขนาดเล็กลง */
.sidebar-left.collapsed .cover {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

</style>
