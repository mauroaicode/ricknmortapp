<template>

  <!--=====================================
      LISTA DE COMENTARIOS
  ======================================-->
  <div class=" md:flex md:gap-6 my-4">
    <div class="md:w-2/3">
      <p class="text-gray-700 font-bold mb-4">Commets:</p>
      <div v-if="comments.length > 0">
        <div class="flex gap-1 mb-5" v-for="comment in comments" :key="comment.id">
          <div>
            <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
      <!--  Nombre & Comentario    -->
          <div class="ml-2">
            <h2 class="text-gray-600">{{ comment.authorName }}</h2>
            <p class="text-sm text-gray-500 text-justify">{{ comment.comment }}</p>
          </div>
        </div>
      </div>
    <!--   Mostramos mensaje si no tiene comentarios   -->
      <div v-else>
        <h2 class="font-bold text-gray-400 text-center">No comments</h2>
      </div>
    </div>

    <div class="md:w-2/3">
      <!--=====================================
          COMPONENTE PARA AGREGAR COMENTARIO
      ======================================-->
      <FormComments :character="character"/>
    </div>
  </div>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import FormComments from "@/components/comments/FormComments";

export default {
  name: "Comments",
  components:{FormComments},
  props:['character'],
  setup() {
    const route = useRoute();
    const comments = ref([])
    const axios = inject('axios')
    const emitter = inject('emitter')

    /* Obtener los comentarios por Character desde un back en Node*/
    const getCommentsByCharacter = () =>{
      axios.get(`/api/characters/${parseInt(route.params.id)}/comments`).then(resp => {
        comments.value = resp.data.comments
      }).catch(e => {
        console.log(e)
      })
    }
    /* Evento global para actualizar cuando se agregar un nuevo comentario*/
    emitter.on('updateCharacter', () => {
      getCommentsByCharacter()
    });
    onMounted(() =>{
      getCommentsByCharacter()
    })

    return {comments, getCommentsByCharacter}
  }
}
</script>

<style scoped>

</style>
