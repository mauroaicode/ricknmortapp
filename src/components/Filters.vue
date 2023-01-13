<template>
  <div class="flex flex-col md:flex-row items-center py-10 gap-4">
    <h2 class="text-sm uppercase text-gray-800 font-bold">Filter Characters:</h2>
    <!--=====================================
       FILTRAR POR GÉNERO
     ======================================-->
    <div class="w-full md:w-auto flex items-center gap-1">
      <label class="text-sm w-24 uppercase text-gray-500 font-bold">Genders</label>
      <select v-model="genderSelected" name="" id="genders"
              class="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500">
        <option value=""> Show All</option>
        <option v-for="gender in genders.sort()" :key="gender.id" :value="gender">
          {{ gender }}
        </option>
      </select>
    </div>
    <!--=====================================
       FILTRAR POR ESTADO
     ======================================-->
    <div class="w-full md:w-auto flex items-center gap-1">
      <label class="text-sm w-24 uppercase text-gray-500 font-bold">Status</label>
      <select v-model="stateSelected" name="" id="status"
              class="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500">
        <option value=""> Show All</option>
        <option v-for="state in states.sort()" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
    </div>
    <!--=====================================
       FILTRAR POR ESPECIE
     ======================================-->
    <div class="w-full md:w-auto flex items-center gap-1">
      <label class="text-sm w-24 uppercase text-gray-500 font-bold">Specie</label>
      <select v-model="specieSelected" name="" id="species"
              class="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500">
        <option value=""> Show All</option>
        <option v-for="specie in species.sort()" :key="specie" :value="specie">
          {{ specie }}
        </option>
      </select>
    </div>
    <!--=====================================
       LIMPIAR FILTROS
     ======================================-->
    <div class="w-full md:w-10 lg:w-auto gap-1">
      <button @click="clearFilters"
              class="w-full focus:ring-4 focus:outline-none focus:ring-teal-300 bg-teal-500 transition-colors text-white p-3 rounded-md hover:bg-teal-400 text-sm font-medium text-center uppercase">
        Clear all filters
      </button>
    </div>
  </div>
</template>

<script>
import {inject, ref, watch} from "vue";

export default {
  name: "Filters",
  setup(props, context) {
    const emitter = inject('emitter')
    const stateSelected = ref(String())
    const genderSelected = ref(String())
    const specieSelected = ref(String())
    const states = ref(['Alive', 'Dead', 'Unknown'])
    const filters = ref({gender: '', state: '', specie: ''})
    const genders = ref(['Male', 'Female', 'Genderless', 'Unknown'])
    const species = ref(['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Disease', 'Robot', 'Cronenberg', 'Mythological Creature', 'Animal', 'Mythological Creature'])

    /* Función que permite limpiar los filtros*/
    const clearFilters = () => {
      stateSelected.value = String()
      genderSelected.value = String()
      specieSelected.value = String()
      emitter.emit('updateData'); // Emite un evento global para actualizar la lista de Characters
    }
    /* Filtro seleccionado género*/
    watch(
        () => genderSelected.value, (value) => {
          filters.value.gender = value ? value : ''
          context.emit('filter', filters.value)
        },
    )
    /* Filtro seleccionado estado*/
    watch(
        () => stateSelected.value, (value) => {
          filters.value.state = value ? value : ''
          context.emit('filter', filters.value)
        },
    )
    /* Filtro seleccionado especie*/
    watch(
        () => specieSelected.value, (value) => {
          filters.value.specie = value ? value : ''
          context.emit('filter', filters.value)
        },
    )

    return {filters, states, genders, species, genderSelected, stateSelected, specieSelected, clearFilters}
  }
}
</script>

<style scoped>

</style>
