// composables/useCharacterBuilder.js
import { ref, computed } from "vue";
import { getDomainOptions, createCharacter } from "../services/api";

export function useCharacterBuilder() {
  const step = ref(0);

  const model = ref({
    name: "",
    playerName: "",
    ideals: "",
    bonds: "",
    flaws: "",
    age: "",
    height: "",
    weight: "",
    eyes: "",
    skin: "",
    hair: "",
    race: "",
    subRace: "",
    class: "",
    subClass: "",
    startingItems: {}, // 🔥 สำคัญ
    background: "",
    alignment: "",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    gold: 0,
  });

  const abilityFields = [
    { key: "strength", label: "STR" },
    { key: "dexterity", label: "DEX" },
    { key: "constitution", label: "CON" },
    { key: "intelligence", label: "INT" },
    { key: "wisdom", label: "WIS" },
    { key: "charisma", label: "CHA" },
  ];

  const totalStats = computed(() => {
    return abilityFields.reduce((total, field) => {
      return total + model.value[field.key];
    }, 0);
  });

  const options = ref({
    races: [],
    subRaces: {},
    classes: [],
    subClasses: {},
    classesData: {}, // 🔥 สำคัญ
    backgrounds: [],
    alignments: [],
  });

  // -------------------------
  // 🔥 COMPUTED
  // -------------------------

  const currentSubRaces = computed(
    () => options.value.subRaces[model.value.race] ?? []
  );

  const currentSubClasses = computed(
    () => options.value.subClasses[model.value.class] ?? []
  );

  const currentEquipment = computed(() => {
    const cls = model.value.class;

    if (!cls) return null;

    const data = options.value.classesData?.[cls];

    if (!data || !data.base || !data.base.startingEquipment) {
      return null;
    }

    return data.base.startingEquipment;
  });

  // -------------------------
  // 🔥 HANDLERS
  // -------------------------

  function onRaceChange() {
    model.value.subRace = "";
  }

  function onClassChange() {
    model.value.subClass = "";

    const equipment =
      options.value.classesData?.[model.value.class]?.base?.startingEquipment ??
      {};

    // 🔥 reset + auto select default
    const init = {};

    Object.keys(equipment).forEach((key) => {
      if (equipment[key].length === 1) {
        init[key] = equipment[key][0];
      }
    });

    model.value.startingItems = init;

    console.log("CLASS CHANGED:", model.value.class);
    console.log("EQUIPMENT INIT:", equipment);
  }

  // -------------------------
  // 🔥 STEP CONTROL
  // -------------------------

  function nextStep() {
    // STEP 0: Alignment
    if (step.value === 0 && !model.value.alignment) return;

    // STEP 1: Background
    if (step.value === 1 && !model.value.background) return;

    // STEP 2: Race
    if (step.value === 2 && !model.value.race) return;

    // STEP 3: Class
    if (step.value === 3 && !model.value.class) return;

    // STEP 4: Starter Items
    if (step.value === 4) {
      const equipment = currentEquipment.value;

      console.log("CHECK EQUIPMENT:", equipment);
      console.log("SELECTED ITEMS:", model.value.startingItems);

      if (!equipment) return;

      const allSelected = Object.keys(equipment).every((key) => {
        return model.value.startingItems?.[key];
      });

      if (!allSelected) return;
    }

    // STEP 5: Stats
    if (step.value === 5 && totalStats.value !== 72) return;

    // STEP 6: Details
    if (step.value === 6 && !model.value.name) return;

    step.value++;
  }

  function prevStep() {
    step.value--;
  }

  function resetForm() {
    model.value = {
      name: "",
      playerName: "",
      ideals: "",
      bonds: "",
      flaws: "",
      age: "",
      height: "",
      weight: "",
      eyes: "",
      skin: "",
      hair: "",
      race: "",
      subRace: "",
      class: "",
      subClass: "",
      startingItems: {},
      background: "",
      alignment: "",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      gold: 0,
    };

    step.value = 0;
  }

  // -------------------------
  // 🔥 API
  // -------------------------

  async function loadOptions() {
    const data = await getDomainOptions();

    console.log("API DATA:", data); // 🔥 debug

    options.value = {
      races: data.races ?? [],
      subRaces: data.subRaces ?? {},
      classes: data.classes ?? [],
      subClasses: data.subClasses ?? {},
      classesData: data.classesData ?? {}, // 🔥 สำคัญสุด
      backgrounds: data.backgrounds ?? [],
      alignments: data.alignments ?? [],
    };
  }

  async function submit() {
    console.log("SUBMIT:", model.value);

    await createCharacter(model.value);
    resetForm();
  }

  return {
    step,
    model,
    options,
    currentSubRaces,
    currentSubClasses,
    currentEquipment, // 🔥 ต้องมี
    onRaceChange,
    onClassChange,
    nextStep,
    prevStep,
    resetForm,
    loadOptions,
    submit,
    abilityFields,
    totalStats,
  };
}