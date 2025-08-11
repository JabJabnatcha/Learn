<template>
    <div class="bottom-bar">
        <!-- Left column: Song info -->
        <div class="left-col">
        <img src="@/assets/Chill_Vibes.jpg" alt="cover" class="cover-img" />
        <div class="text-info">
            <div class="title">Song Title</div>
            <div class="artist">Artist Name</div>
        </div>
        </div>

        <!-- Middle column: Controls + progress -->
        <div class="mid-col">
        <div class="controls-row">
            <button class="control-btn">🔀</button>
            <button class="control-btn">⏮️</button>
            <button class="control-btn">▶️</button>
            <button class="control-btn">⏭️</button>
        </div>
        <div class="progress-row">
            <span class="time current-time">0:00</span>
            <input type="range" min="0" max="100" step="1" value="0" class="progress-bar" />
            <span class="time duration">3:45</span>
        </div>
        </div>

        <!-- Right column: Volume -->
        <!-- Right column: Volume and controls -->
        <div class="right-col">
        <button class="icon-btn" title="Now Playing View">🎵</button>
        <button class="icon-btn" title="Lyrics">📝</button>
        <button class="icon-btn" title="Queue">📋</button>
        <button class="icon-btn" title="Connect to Device">📡</button>
        <button class="icon-btn" title="Mute">🔇</button>

        <input
            type="range"
            min="0"
            max="100"
            step="1"
            value="50"
            class="volume-bar"
        />
        <button class="icon-btn" title="Open Mini Player">🖥️</button>
        <button class="icon-btn" title="Enter Fullscreen">⛶</button>
        </div>

    </div>
</template>

<script>
export default {
    name: "BottomBar",
};
</script>

<style scoped>
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #181818;
    color: white;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-top: 1px solid #303030;
    box-sizing: border-box;
    z-index: 100;
    gap: 1rem;
}

/* Left column */
.left-col {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1 1 25%;
}

.cover-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
}

.text-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.title {
    font-weight: bold;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.artist {
    font-size: 0.8rem;
    color: #b3b3b3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Middle column */
.mid-col {
    flex: 2 1 50%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.controls-row {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.control-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    transition: background-color 0.2s;
    border-radius: 4px;
}

.control-btn:hover {
    background-color: #303030;
}

.progress-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.time {
    font-size: 0.75rem;
    color: #b3b3b3;
    width: 40px;
    text-align: center;
    user-select: none;
}

.progress-bar {
    flex: 1;
    cursor: pointer;
}

/* Right column */
.right-col {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    flex: 1 1 25%;
    justify-content: flex-end;
}

.volume-bar {
    width: 80px;
    cursor: pointer;
}

.icon-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    border-radius: 4px;
}

.icon-btn:hover {
  background-color: #303030;
}

</style>
