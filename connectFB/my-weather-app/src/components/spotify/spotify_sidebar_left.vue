<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <div class="header">
      <button class="toggle-btn" @click="isCollapsed = !isCollapsed">
        {{ isCollapsed ? '➡' : '⬅' }}
      </button>
    </div>

    <div v-if="!isCollapsed" class="filter-row">
      <button v-if="selectedFilter" class="clear-filter" @click="clearFilter" title="Clear filter">✕</button>
      <button
        v-for="filter in filters"
        :key="filter"
        :class="{ active: selectedFilter === filter }"
        @click="toggleFilter(filter)"
      >
        {{ filter }}
      </button>
    </div>

    <div v-if="!isCollapsed" class="search-sort-row">
      <div class="search-container">
        <button class="search-icon" @click="toggleSearch">🔍</button>
        <input v-if="showSearch" type="text" v-model="searchQuery" placeholder="search" class="search-input" />
      </div>

      <div class="sort-by-container">
        <button class="sort-by-btn" @click="toggleSortDropdown">
          {{ sortByLabel }} <span>▼</span>
        </button>
        <ul v-if="showSortDropdown" class="sort-dropdown">
          <li v-for="option in sortOptions" :key="option.value" @click="setSort(option.value)">
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>

    <ul class="playlist">
      <li
        v-for="item in filteredList"
        :key="item.id"
        :class="['playlist-item', { pinned: item.pinned }]"
      >
        <img
          v-if="!isCollapsed || item.pinned"
          :src="item.cover"
          alt="Cover"
          class="playlist-cover"
        />
        <div v-if="!isCollapsed" class="playlist-info">
          <strong>{{ item.name }}</strong>
          <span class="artist"> - {{ item.artist }}</span>
        </div>
        <button
          v-if="!isCollapsed"
          class="pin-btn"
          @click="togglePin(item)"
          :title="item.pinned ? 'Unpin playlist' : 'Pin playlist'"
        >
          {{ item.pinned ? '📌' : '📍' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import rockCover from '@/assets/My_Rock_hits.jpg'
import chillCover from '@/assets/Chill_Vibes.jpg'
import popCover from '@/assets/Pop_Favorites.jpg'
import jazzCover from '@/assets/Jazz_Classics.jpg'
import podcastCover from '@/assets/Pop_Favorites.jpg' // ตัวอย่าง podcast cover

export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapsed: false,
      searchQuery: '',
      showSearch: false,
      showSortDropdown: false,
      sortType: 'recents',
      selectedFilter: '',
      filters: ['Playlists', 'Podcasts', 'Albums', 'Artists'],
      sortOptions: [
        { value: 'recents', label: 'Recents' },
        { value: 'recentAdd', label: 'Recents Add' },
        { value: 'alphabetical', label: 'Alphabetical' },
        { value: 'creator', label: 'Creator' },
        { value: 'custom', label: 'Custom order' }
      ],
      playlists: [
        { id: 1, name: 'My Rock Hits', artist: 'AC/DC', cover: rockCover, pinned: false, type: 'Playlists', dateAdded: '2024-05-01', creator: 'User A' },
        { id: 2, name: 'Chill Vibes', artist: 'Lofi Beats', cover: chillCover, pinned: false, type: 'Playlists', dateAdded: '2024-08-10', creator: 'User B' },
        { id: 3, name: 'Pop Favorites', artist: 'Taylor Swift', cover: popCover, pinned: false, type: 'Playlists', dateAdded: '2023-12-15', creator: 'User C' },
        { id: 4, name: 'Jazz Classics', artist: 'Miles Davis', cover: jazzCover, pinned: false, type: 'Playlists', dateAdded: '2022-07-20', creator: 'User D' },
        { id: 5, name: 'Cool Podcast', artist: 'Host X', cover: podcastCover, pinned: false, type: 'Podcasts', dateAdded: '2023-06-11', creator: 'User E' }
      ]
    }
  },
  computed: {
    filteredList() {
      let list = this.playlists.filter(item =>
        !this.selectedFilter || item.type === this.selectedFilter
      )

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase()
        list = list.filter(item =>
          item.name.toLowerCase().includes(q) || item.artist.toLowerCase().includes(q)
        )
      }

      const pinned = list.filter(i => i.pinned).sort((a, b) => a.id - b.id)
      const unpinned = list.filter(i => !i.pinned)

      switch (this.sortType) {
        case 'recents':
        case 'recentAdd':
          unpinned.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          break
        case 'alphabetical':
          unpinned.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'creator':
          unpinned.sort((a, b) => a.creator.localeCompare(b.creator))
          break
      }

      return [...pinned, ...unpinned]
    },
    sortByLabel() {
      const opt = this.sortOptions.find(o => o.value === this.sortType)
      return opt ? opt.label : ''
    }
  },
  methods: {
    togglePin(item) {
      item.pinned = !item.pinned
    },
    toggleFilter(filter) {
      this.selectedFilter = this.selectedFilter === filter ? '' : filter
    },
    clearFilter() {
      this.selectedFilter = ''
    },
    toggleSearch() {
      this.showSearch = !this.showSearch
      if (!this.showSearch) this.searchQuery = ''
    },
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown
    },
    setSort(type) {
      this.sortType = type
      this.showSortDropdown = false
    }
  }
}
</script>

<style scoped>
.sidebar {
  background: #202020;
  color: #fff;
  padding: 1rem 0.8rem;
  border-radius: 8px;
  width: 330px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
}
.sidebar.collapsed {
  width: 60px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.sidebar:not(.collapsed) .toggle-btn::after {
  content: 'Your Library';
  font-weight: 700;
  font-size: 1rem;
  color: #d1d1d1;
}

.filter-row {
  display: flex;
  gap: 0.1px;
  align-items: center;
  margin-bottom: 10px;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding-right: 1px;
}
.filter-row button {
  background: #404040;
  border: none;
  color: #ccc;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  white-space: nowrap;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 1px;
  user-select: none;
}
.filter-row button.active {
  background: #1db954;
  color: #fff;
}

.sort-by-btn {
  background:#303030;
  color: #fff;
  border-radius: 20px;
  padding: 0.25rem 0.6rem;
  font-size: 0.85rem;
}
.search-sort-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.search-icon {
  background: #404040;
  border: none;
  color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px;
  transition: background-color 0.3s;
}

.search-icon:hover {
  background: #1db954;
  color: white;
}

.search-input {
  background: #303030;
  border: none;
  border-radius: 20px;
  padding: 0.25rem 0.6rem;
  font-size: 0.85rem;
  color: #fff;
  outline: none;
}

.sort-dropdown {
  position: absolute;
  background: #303030;
  border-radius: 6px;
  margin-top: 4px;
  min-width: 150px;
  z-index: 10;
}

.sort-dropdown li {
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
}
.sort-dropdown li:hover {
  background-color: #1db954;
  color: white;
}

.playlist {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 320px);
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.25s;
  user-select: none;
  position: relative;
}

.playlist-item img {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  transition: width 0.3s, height 0.3s;
}

.playlist-item strong {
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-item .artist {
  font-size: 0.75rem;
  color: #aaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
