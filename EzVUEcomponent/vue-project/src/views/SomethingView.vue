<template>
  <div>
    <v-container>
      <v-btn color="red">TEST</v-btn>
    <h1>Component Gallery</h1>
    
    <Buttons />
    <Divition />
    <Card />
  </v-container>
  </div>
</template>

<script setup>
import Buttons from '@/components/Buttons.vue'
import Divition from '@/components/Divition.vue'
import Card from '@/components/Card.vue'
</script>