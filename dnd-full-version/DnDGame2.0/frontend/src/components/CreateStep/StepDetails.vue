<script setup>
defineProps(["model"]);
</script>

<template>
  <div>
    <h3 class="mb-2">Character Details</h3>

    <v-text-field v-model="model.playerName" label="Player Name" />

    <v-text-field v-model="model.name" label="Name" />
    <v-textarea v-model="model.ideals" label="Ideals" />
    <v-textarea v-model="model.bonds" label="Bonds" />
    <v-textarea v-model="model.flaws" label="Flaws" />

    <v-row>
      <v-col cols="4">
        <v-text-field v-model="model.age" label="Age" type="number" />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="model.height" label="Height" />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="model.weight" label="Weight" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-text-field v-model="model.eyes" label="Eyes" />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="model.skin" label="Skin" />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="model.hair" label="Hair" />
      </v-col>
    </v-row>
  </div>
</template>