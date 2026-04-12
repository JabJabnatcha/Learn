<template>
  <div>
    <h3 class="mb-2">Choose Starting Equipment</h3>

    <!-- ❌ ถ้ายังไม่มี class -->
    <div v-if="!equipment || Object.keys(equipment).length === 0">
      No equipment found (check class selection)
    </div>

    <!-- ✅ มีข้อมูล -->
    <div
      v-for="(items, key) in equipment"
      :key="key"
      class="mb-4"
    >
      <div class="mb-1">Option {{ key }}</div>

      <v-select
        v-if="items.length > 1"
        v-model="model.startingItems[key]"
        :items="items"
        :label="`Choose (${key})`"
      />

      <v-chip v-else color="primary">
        {{ items[0] }}
      </v-chip>
    </div>
  </div>
</template>