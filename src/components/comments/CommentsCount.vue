<template>
<!--  Icono y número de comentarios-->
  <div class="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
         stroke="currentColor" class="w-5 h-5 text-gray-400">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
    </svg>
    <p class="text-sm text-gray-400 ml-1">{{ getCharacterCommentsCount(character) }}</p> <!-- Función para buscar comentarios por cada uno de los Characters-->
  </div>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";

export default {
  name: "CommentsCount",
  props: ['character'],
  setup(){
    const count = ref(0)
    const route = useRoute()
    const axios = inject('axios')
    const emitter = inject('emitter')
    /* Función para buscar comentarios por cada uno de los Characters*/
    const getCharacterCommentsCount = (idCharacter) => {
      axios.get(`/api/characters/${idCharacter}/comments/count`).then(resp => {
        count.value = resp.data.commentsCount
      }).catch(e => {
        console.log(e)
      })
      return count.value ?? 0
    }
    /* Recibe el evento cuando se agrega un nuevo comentario a un Character */
    emitter.on('updateCharacter', () => {
      getCharacterCommentsCount(route.params.id)
    })
    onMounted(() =>{
      getCharacterCommentsCount()
    })

    return {count, getCharacterCommentsCount}
  }
}
</script>

<style scoped>

</style>
