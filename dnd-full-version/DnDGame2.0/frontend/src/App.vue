<template>
  <v-app>
    <v-main>
      <v-container class="py-8" fluid>
        <v-row>
          <v-col cols="12">
            <v-sheet class="pa-6" elevation="2">
              <h1 class="text-h4 mb-4">DnD Character Manager</h1>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row class="mt-6" align="stretch">
          <v-col cols="12" xl="5">
            <character-form @created="loadCharacters" />
          </v-col>

          <!-- <v-col cols="12" xl="7">
            <character-list :characters="characters" :loading="loading" />
          </v-col> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CharacterForm from './components/CharacterForm.vue';
import CharacterList from './components/CharacterList.vue';
import { getCharacters } from './services/api.js';

const characters = ref([]);
const loading = ref(false);

async function loadCharacters() {
  loading.value = true;
  try {
    characters.value = await getCharacters();
  } finally {
    loading.value = false;
  }
}

onMounted(loadCharacters);
</script>
