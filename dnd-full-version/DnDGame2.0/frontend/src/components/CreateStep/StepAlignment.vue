<script setup>
defineProps(["model", "options"]);
</script>

<template>
  <v-select
    v-model="model.alignment"
    :items="options.alignments"
    label="Alignment"
  />
</template>