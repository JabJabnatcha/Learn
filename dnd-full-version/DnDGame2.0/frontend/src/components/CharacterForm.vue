<template>
  <v-card>
    <v-card-title>Create New Character</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="onSubmit">
        <v-text-field v-model="model.name" label="Name" required />

        <v-select
          v-model="model.race"
          :items="options.races"
          label="Race"
          required
          @update:model-value="onRaceChange"
        />

        <v-select
          v-model="model.subRace"
          :items="currentSubRaces"
          label="Subrace"
          :disabled="currentSubRaces.length === 0"
        />

        <v-select
          v-model="model.class"
          :items="options.classes"
          label="Class"
          required
          @update:model-value="onClassChange"
        />

        <v-select
          v-model="model.subClass"
          :items="currentSubClasses"
          label="Subclass"
          :disabled="currentSubClasses.length === 0"
        />

        <v-select
          v-model="model.background"
          :items="options.backgrounds"
          label="Background"
        />

        <v-select
          v-model="model.alignment"
          :items="options.alignments"
          label="Alignment"
        />

        <v-row>
          <v-col cols="6" sm="4" v-for="field in abilityFields" :key="field.key">
            <v-text-field
              :label="field.label"
              type="number"
              v-model.number="model[field.key]"
              :min="1"
              :max="30"
              required
            />
          </v-col>
        </v-row>

        <v-text-field
          v-model.number="model.gold"
          label="Starting Gold (GP)"
          type="number"
          min="0"
        />

        <v-card-actions class="mt-4">
          <v-btn type="submit" color="primary">Create Character</v-btn>
          <v-btn type="button" variant="text" @click="resetForm">Reset</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { createCharacter, getDomainOptions } from '../services/api.js';

const form = ref(null);
const model = ref({
  name: '',
  race: '',
  subRace: '',
  class: '',
  subClass: '',
  background: '',
  alignment: '',
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
  gold: 0,
});

const options = ref({
  races: [],
  subRaces: {},
  classes: [],
  subClasses: {},
  backgrounds: [],
  alignments: [],
});

const abilityFields = [
  { key: 'strength', label: 'Strength' },
  { key: 'dexterity', label: 'Dexterity' },
  { key: 'constitution', label: 'Constitution' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'wisdom', label: 'Wisdom' },
  { key: 'charisma', label: 'Charisma' },
];

const emit = defineEmits(['created']);

const currentSubRaces = computed(() => {
  return options.value.subRaces[model.value.race] ?? [];
});

const currentSubClasses = computed(() => {
  return options.value.subClasses[model.value.class] ?? [];
});

function resetForm() {
  model.value = {
    name: '',
    race: '',
    subRace: '',
    class: '',
    subClass: '',
    background: '',
    alignment: '',
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    gold: 0,
  };
}

function onRaceChange(value) {
  model.value.subRace = '';
}

function onClassChange(value) {
  model.value.subClass = '';
}

async function loadOptions() {
  try {
    const result = await getDomainOptions();
    options.value = result;
  } catch (error) {
    console.error('Could not load domain options', error);
    alert('Could not load dropdown options from the backend.');
  }
}

async function onSubmit() {
  try {
    await createCharacter({
      name: model.value.name,
      race: model.value.race,
      subRace: model.value.subRace,
      class: model.value.class,
      subClass: model.value.subClass,
      background: model.value.background,
      alignment: model.value.alignment,
      strength: model.value.strength,
      dexterity: model.value.dexterity,
      constitution: model.value.constitution,
      intelligence: model.value.intelligence,
      wisdom: model.value.wisdom,
      charisma: model.value.charisma,
      gold: model.value.gold,
    });
    resetForm();
    emit('created');
  } catch (error) {
    console.error(error);
    alert('Could not create character. Check the console for details.');
  }
}

onMounted(loadOptions);
</script>
