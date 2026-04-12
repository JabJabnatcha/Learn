<script setup>
import { onMounted } from "vue";
import { useCharacterBuilder } from "../composibles/useCharacterBuilder";

import StepAlignment from "./CreateStep/StepAlignment.vue";
import StepBackground from "./CreateStep/StepBackground.vue";
import StepRace from "./CreateStep/StepRace.vue";
import StepClass from "./CreateStep/StepClass.vue";
import StepStats from "./CreateStep/StepStatus.vue";
import StepDetails from "./CreateStep/StepDetails.vue";
import StepStarterItems from "./CreateStep/StepStarterItem.vue";


const {
  step,
  model,
  options,
  currentSubRaces,
  currentSubClasses,
  onRaceChange,
  onClassChange,
  nextStep,
  prevStep,
  loadOptions,
  submit,
  abilityFields,
  totalStats,
} = useCharacterBuilder();

onMounted(loadOptions);

function increaseStat(statKey) {
  if (totalStats.value >= 72) return;
  if (model.value[statKey] >= 15) return;
  model.value[statKey]++;
}

function decreaseStat(statKey) {
  if (model.value[statKey] <= 8) return;
  model.value[statKey]--;
}
</script>

<template>
  <v-card>
    <v-card-title>Create Character</v-card-title>

    <v-card-text>
      <StepAlignment
        v-if="step === 0"
        :model="model"
        :options="options"
      />

      <StepBackground
        v-else-if="step === 1"
        :model="model"
        :options="options"
      />

      <StepRace
        v-else-if="step === 2"
        :model="model"
        :options="options"
        :currentSubRaces="currentSubRaces"
        :onRaceChange="onRaceChange"
      />

      <StepClass
        v-else-if="step === 3"
        :model="model"
        :options="options"
        :currentSubClasses="currentSubClasses"
        :onClassChange="onClassChange"
      />

      <StepStarterItems
        v-else-if="step === 4"
        :model="model"
        :equipment="currentEquipment"
        :onClassChange="onClassChange"
      />
      
      <StepStats
        v-else-if="step === 5"
        :model="model"
        :abilityFields="abilityFields"
        :totalStats="totalStats"
        @increase="increaseStat"
        @decrease="decreaseStat"
      />

      <StepDetails
        v-else-if="step === 6"
        :model="model"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn @click="prevStep" :disabled="step === 0">Back</v-btn>
      <v-btn @click="nextStep">Next</v-btn>
      <v-btn v-if="step === 4" color="primary" @click="submit">
        Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</template>