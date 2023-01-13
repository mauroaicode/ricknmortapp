<template>
  <!--=====================================
        SECCIÓN PRINCIPAL
    ======================================-->
  <section class="py-5">
    <div class="mt-5 bg-white p-5 md:px-10 shadow rounded-lg">
      <div class="md:flex md:gap-4 items-center">
      <!--   Imagen     -->
        <div class="md:w-2/3">
          <img class="w-full" :src="character.image" :alt="`character-${character.name}`">
        </div>
        <div class="md:w-2/3">
          <div class="md:p-5 py-5 space-y-3">
            <!--   Nombre & Estado     -->
            <div class="md:flex md:justify-between flex-col md:flex-row items-center">
              <h2 class="text-4xl font-bold text-gray-700 mb-2">{{ character.name }}</h2>
              <span class="bg-teal-100 text-teal-700 text-md font-medium px-2.5 py-0.5 rounded">{{
                  character.status
                }}</span>
            </div>
            <div class="mt-3">
              <!--   Género     -->
              <p class="text-md text-gray-600">{{ character.gender }}</p>
              <!--   Especie     -->
              <p class="text-teal-600 text-lg text-4xl font-bold">{{ character.species }}</p>
              <div class="flex justify-between items-center mt-2">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="w-5 h-5 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                  </svg>
                  <!--   Ubicación     -->
                  <p class="text-md text-gray-400 ml-1">{{ character.location.name }}</p>
                </div>

                <!--=====================================
                    CONTADOR DE COMENTARIOS
                ======================================-->
                <CommentsCount :character="character.id"/>
              </div>
            </div>
          </div>
          <hr class="h-px my-1 bg-gray-200 border-0 rounded">
          <!--=====================================
               COMPONENTE LISTA DE EPISODIOS
           ======================================-->
          <ListEpisodes :episodes="character.episode"/>
        </div>
      </div>
      <!--=====================================
           COMPONENTE LISTAR Y AGREGAR COMENTARIOS
       ======================================-->
      <Comments :character="character"/>
    </div>
  </section>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import ListEpisodes from "@/components/ListEpisodes";
import Comments from "@/components/comments/Comments";
import CommentsCount from "@/components/comments/CommentsCount";

export default {
  name: "CharacterView",
  components: {CommentsCount, ListEpisodes, Comments},
  setup() {
    const route = useRoute();
    const characterId = ref()
    const axios = inject('axios')
    const emitter = inject('emitter')
    const character = ref({location: {name: ''}, episode: []})

    /* Obtener el Character actual*/
    const getCharacter = () => {
      axios.get(`https://rickandmortyapi.com/api/character/${characterId.value}`).then(resp => {
        character.value = resp.data
      }).catch(e => {
        console.log(e)
      })
    }
    /* Evento globlar que nos permite saber cuando se agrega un nuevo comentario y actualizar la informaciónl*/
    emitter.on('updateCharacter', () => {
      getCharacter()
    });
    /* Inicializar, obtener el Character actual*/
    onMounted(() => {
      characterId.value = parseInt(route.params.id)
      if (characterId.value) {
        getCharacter()
      }
    })

    return {characterId, character, getCharacter}
  }
}
</script>

<style scoped>

</style>
