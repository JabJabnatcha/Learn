<script setup>
const props = defineProps({
  characters: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Race', value: 'race' },
  { title: 'Class', value: 'class' },
  { title: 'Background', value: 'background' },
  { title: 'Alignment', value: 'alignment' },
  { title: 'Ability Scores', value: 'abilityScores' },
  { title: 'Gold', value: 'money' },
];
</script>


<template>
  <v-card>
    <v-card-title>Characters</v-card-title>
    <v-card-text>
      <v-data-table :items="characters" :headers="headers" :loading="loading" item-key="id" class="elevation-1">
        <template #item.abilityScores="{ item }">
          <div class="d-flex flex-column">
            <span>STR {{ item.abilityScores?.strength ?? item.abilityScores?.Strength }}</span>
            <span>DEX {{ item.abilityScores?.dexterity ?? item.abilityScores?.Dexterity }}</span>
            <span>CON {{ item.abilityScores?.constitution ?? item.abilityScores?.Constitution }}</span>
            <span>INT {{ item.abilityScores?.intelligence ?? item.abilityScores?.Intelligence }}</span>
            <span>WIS {{ item.abilityScores?.wisdom ?? item.abilityScores?.Wisdom }}</span>
            <span>CHA {{ item.abilityScores?.charisma ?? item.abilityScores?.Charisma }}</span>
          </div>
        </template>

        <template #item.money="{ item }">
          {{ item.money?.gp ?? item.money?.GP ?? 0 }} GP
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

