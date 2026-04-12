<script setup>
defineProps([
  "model",
  "options",
  "currentSubRaces",
  "onRaceChange"
]);
</script>

<template>
  <div>
    <v-select
      v-model="model.race"
      :items="options.races"
      label="Race"
      @update:model-value="onRaceChange"
    />

    <v-select
      v-if="model.race && currentSubRaces.length > 0"
      v-model="model.subRace"
      :items="currentSubRaces"
      label="SubRace"
    />

    <v-alert
      v-else-if="model.race && currentSubRaces.length === 0"
      type="info"
      class="mt-2"
    >
      This race has no subraces available.
    </v-alert>
  </div>
</template>