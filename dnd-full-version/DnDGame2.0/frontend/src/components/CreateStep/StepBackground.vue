<script setup>
defineProps(["model", "options"]);
</script>

<template>
  <v-select
    v-model="model.background"
    :items="options.backgrounds"
    label="Background"
  />
</template>