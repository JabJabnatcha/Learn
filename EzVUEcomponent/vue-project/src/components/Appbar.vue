<template>
  <v-app-bar color="primary" dark>
    <v-app-bar-title>My App</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn variant="text" @click="goHome">
      Home
    </v-btn>

    <v-btn variant="text" @click="goComponents">
      Components
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goComponents = () => {
  router.push('/something')
}
</script>