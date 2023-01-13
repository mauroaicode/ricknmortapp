<template>
  <div>
    <!--=====================================
        COMPONENTE FILTROS
    ======================================-->
    <Filters @filter="filter"/>

    <!--=====================================
        SECCIÓN DE LISTA DE TARJETAS
    ======================================-->
    <section class="py-5" id="section-card" v-if="!notData">
      <div class="md:flex justify-between items-center">
      <!--   Información de paginación   -->
        <h4 class="text-gray-700  text-2xl font-extrabold">Page {{ currentPage }} of {{ totalPage }}</h4>
      <!--   Select para ordernar la lista   -->
        <div class="w-full md:w-auto gap-2">
          <label class="text-sm w-24 uppercase text-gray-500 font-bold">Sort by Name</label>
          <select @change="sortByName($event)" id="sort"
                  class="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500">
            <option value=""> Default</option>
            <option v-for="sort in typeSorts" :key="sort.key" :value="sort.key">
              {{ sort.name }}
            </option>
          </select>
        </div>
      </div>
      <!--=====================================
         LOADING TIPO SKELETON
      ======================================-->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        <CardLoadingCharacter v-for="(item, index) in 12" :key="index"/>
      </div>
      <!--   Lista de Characters   -->
      <div class="grid grid-cols-1 md:grid-cols-3  gap-5 mt-10">
        <div v-for="character in characters" :key="character.id">
          <!--=====================================
             COMPONENTE TARJETA
          ======================================-->
          <CardCharacter :character="character"/>
        </div>
      </div>
      <div class="w-full mt-12 px-4 py-3 flex items-center justify-center sm:px-6">
        <!--=====================================
             COMPONENTE PARA PAGINAR LA LISTA
          ======================================-->
        <PaginationCharacters :totalCharacters="totalCharacters" :totalPage="totalPage" @getCharacters="onPagination"/>
      </div>
    </section>
    <!--  Validamos, si no existen o no hay datos mostrar este mensaje  -->
    <section v-else class="w-full h-96 flex justify-center items-center">
      <div class="text-center">
        <iframe src="https://giphy.com/embed/YPPI2Q6DAz4CohnPDD" width="200" height="200" frameBorder="0"
                class="giphy-embed" allowFullScreen></iframe>
        <h3 class=" text-gray-500 font-bold text-2xl">No hay Datos </h3>
      </div>
    </section>
  </div>
</template>

<script>

import {defineAsyncComponent, inject, onMounted, ref} from "vue";
import PaginationCharacters from "@/components/PaginationCharacters";

export default {
  name: "CharactersView",
  components: {
    PaginationCharacters,
    Filters: defineAsyncComponent(() => import('@/components/Filters')),
    CardCharacter: defineAsyncComponent(() => import('@/components/CardCharacter')),
    CardLoadingCharacter: defineAsyncComponent(() => import('@/components/CardLoadingCharacter'))
  },
  setup() {
    const loading = ref(true)
    const characters = ref([])
    const currentPage = ref(1)
    const notData = ref(false)
    const totalPage = ref(null)
    const filters = ref(String())
    const axios = inject('axios')
    const emitter = inject('emitter') //Permite emitir eventos globalmente
    const totalCharacters = ref(null) //Cantidad de Characters
    const typeSorts = ref([{key: 'asc', name: 'Asc'}, {key: 'desc', name: 'Desc'}])

    /* Función para obtener todos los Characters */
    const getCharacters = () => {
      axios.get(`https://rickandmortyapi.com/api/character/?page=${parseInt(currentPage.value)}&gender=${filters.value.gender ?? ''}&status=${filters.value.state ?? ''}&species=${filters.value.specie ?? ''}`).then(resp => {
        notData.value = false
        totalCharacters.value = resp.data.info.count - 1
        totalPage.value = resp.data.info.pages
        characters.value = resp.data.results
        loading.value = false
        localStorage.setItem('totalPages', totalPage.value) // Para luego obtener la cantidad de páginas y realizar una validación en la url (no ingresen # páginas mayor al total)
      }).catch(e => {
        loading.value = false
        notData.value = true
        console.log('Error', e)
      })
    }
    /* Función para recibir la página actual */
    const onPagination = (page) => {
      page ? currentPage.value = page : 1
      loadingActive() //Activamos el loading skeleton
      getCharacters() //Actualizamos los datos
    }
    /* Función para filtrar */
    const filter =  (filter) => {
      filter ? filters.value = filter : ''
      loadingActive() //Activamos el loading skeleton
      getCharacters() //Actualizamos los datos
    }
    /* Función para activar el loading skeleton */
    const loadingActive = () => {
      loading.value = true
    }
    /* Función para order por nombre la lista de Characters */
    const sortByName = (event) => {
      let typeSort = event.target.value
      characters.value.sort((a, b) => {
        if (typeSort) {
          if (typeSort === 'asc') {
            if (a.name < b.name)
              return -1;
          } else if (typeSort === 'desc') {
            if (a.name > b.name)
              return -1;
          } else {
            return 0;
          }
        } else {
          getCharacters() //Actualizamos los datos
        }
      });
    }
    /* Resivimos un evento global para actualizar la lista de Characters*/
    emitter.on('updateData', async () => {
      loadingActive() //Activamos el loading skeleton
      getCharacters() //Actualizamos los datos
    });

    onMounted(() => {
      /* Ejecutamos la función para obtener la lista de Characters*/
      getCharacters()
    })

    return {
      filters,
      notData,
      loading,
      typeSorts,
      totalPage,
      characters,
      currentPage,
      totalCharacters,

      filter,
      sortByName,
      onPagination,
      loadingActive,
      getCharacters,
    }
  }
}
</script>

<style scoped>

</style>
