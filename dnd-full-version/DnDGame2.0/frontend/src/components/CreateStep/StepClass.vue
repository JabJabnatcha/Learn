<script setup>
defineProps([
  "model",
  "options",
  "currentSubClasses",
  "onClassChange"
]);
</script>

<template>
  <div>
    <v-select
      v-model="model.class"
      :items="options.classes"
      label="Class"
      @update:model-value="onClassChange"
    />

    <v-select
      v-if="model.class && currentSubClasses.length > 0"
      v-model="model.subClass"
      :items="currentSubClasses"
      label="SubClass"
    />

    <v-alert
      v-else-if="model.class && currentSubClasses.length === 0"
      type="info"
      class="mt-2"
    >
      This class has no subclasses available.
    </v-alert>
  </div>
</template>