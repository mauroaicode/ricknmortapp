<template>

  <div @click="goToCharacter(character.id)"
       class="bg-white shadow rounded-lg cursor-pointer hover:bg-teal-50 hover:shadow-md hover:shadow-teal-100 hover:transition-shadow">
    <!--  Imagen  -->
    <img class="object-cover h-72 w-full" :src="character.image" :alt="`character-${character.name}`">
    <div class="p-5 space-y-3">
      <!--  Nombre & Estado -->
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-bold truncate text-gray-700">{{ character.name }}</h3>
        <span class="bg-teal-100 text-teal-700 text-xs font-medium px-2.5 py-0.5 rounded">{{ character.status }}</span>
      </div>
      <!--  Género  -->
      <p class="text-sm text-gray-600">{{ character.gender }}</p>
      <!--  Especie  -->
      <span class="text-teal-600 font-bold"> {{ character.species }}</span>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
          </svg>
          <!--  Ubicación  -->
          <p class="text-sm text-gray-400 ml-1">{{ character.location.name }}</p>
        </div>

        <!--=====================================
          COMPONENTE PARA CONTAR LA CANTIDAD DE COMENTARIOS
        ======================================-->
        <CommentsCount :character="character.id"/>
      </div>
    </div>
  </div>

</template>

<script>

import {inject, ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";
import CommentsCount from "@/components/comments/CommentsCount";
export default {
  name: "CardCharacter",
  components: {CommentsCount},

  props: ['character'],
  setup() {
    const count = ref(0)
    const router = useRouter();
    const axios = inject('axios')

    /* Función que permite contar la cantidad de comentarios haciendo una petición REST a un backend Node*/
    const getCharacterCommentsCount = (idCharacter) => {
      axios.get(`/api/characters/${idCharacter}/comments/count`).then(resp => {
        count.value = resp.data.commentsCount
      }).catch(e => {
        console.log(e)
      })
      return count.value ?? 0
    }
    /* Ir al detalle del Character*/
    const goToCharacter = async (character) => {
      await router.push({name: 'character', params: {id: character}})
    }

    return {count, router, getCharacterCommentsCount, goToCharacter}
  }
}
</script>

<style scoped>

</style>
