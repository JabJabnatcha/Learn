<script setup>
defineProps([
  "abilityFields",
  "totalStats"
]);

const emit = defineEmits(["increase", "decrease"]);
</script>

<template>
  <div>
    <h3 class="mb-2">Ability Scores</h3>

    <v-row class="mt-4">
      <v-col
        v-for="field in abilityFields"
        :key="field.key"
        cols="6"
        sm="4"
      >
        <div class="d-flex align-center justify-space-between">
          
          <!-- 🔥 label -->
          <span style="width: 40px">{{ field.label }}</span>

          <div class="d-flex align-center">
            <v-btn
              icon
              @click="$emit('decrease', field.key)"
              :disabled="model[field.key] <= 8"
            >
              -
            </v-btn>

            <!-- 🔥 ช่องกรอก (นี่แหละที่คุณบอกว่าไม่มี) -->
            <v-text-field
              v-model.number="model[field.key]"
              type="number"
              density="compact"
              style="width: 70px"
              :min="8"
              :max="15"
              hide-details
            />

            <v-btn
              icon
              @click="$emit('increase', field.key)"
              :disabled="model[field.key] >= 15 || totalStats >= 72"
            >
              +
            </v-btn>
          </div>

        </div>
      </v-col>
    </v-row>

    <div class="mt-2">Total: {{ totalStats }} / 72</div>
  </div>
</template>