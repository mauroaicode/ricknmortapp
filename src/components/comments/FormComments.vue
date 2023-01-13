<template>
  <div>
    <p class="text-gray-700 font-bold mb-4">Add comment:</p>
    <div class="space-y-5">
      <!--  Autor    -->
      <div class="space-y-8">
        <div>
          <label for="author"
                 :class="{ 'text-red-400': v$.authorName.$error }"
                 class="block text-sm  text-gray-500 mb-3 font-bold">Your name
            <span class="text-red-300">*</span>
          </label>
          <input v-model="form.authorName"
                 class="focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                 name="authorName"
                 placeholder="Your name"
                 :class="{ 'border-red-400': v$.authorName.$error }"
                 type="text">
        </div>
      </div>
      <!--  Comment    -->
      <div class="space-y-8">
        <div>
          <label for="comment"
                 :class="{ 'text-red-400': v$.comment.$error }"
                 class="block text-sm  text-gray-500 mb-3 font-bold">Your comment
            <span class="text-red-300">*</span>
          </label>
          <textarea v-model="form.comment"
                    rows="5"
                    :class="{ 'border-red-400': v$.comment.$error }"
                    class="focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                    name="authorName" placeholder="Your comment" type="text">

          </textarea>
        </div>
      </div>
      <div class="space-y-1">
        <button @click="addComment"
                class="w-full focus:ring-4 focus:outline-none focus:ring-teal-300 bg-teal-500 transition-colors text-white p-3 rounded-md hover:bg-teal-400 text-sm font-medium text-center uppercase">
          Add Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {inject, reactive} from 'vue'
import {useToast} from "vue-toastification"
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import {useRoute} from "vue-router/dist/vue-router";

export default {
  name: "FormComments",
  props: ['character'],
  setup(props) {

    const form = reactive({
      comment: '',
      authorName: '',
      nameCharacter: '',
      idCharacter: null,
    })
    /* Reglas de validación*/
    const rules = {
      comment: {required},
      authorName: {required}
    }
    const toast = useToast()
    const route = useRoute()
    const axios = inject('axios')
    const emitter = inject('emitter')
    const v$ = useVuelidate(rules, form)

    /* Función que permite agregar un nuevo comentario*/
    const addComment = async () => {
      form.idCharacter = parseInt(route.params.id) //Obtenemos el id del Character
      form.nameCharacter = props.character.name //Obtenemos el nombre del Character
      // Validamos los campos requeridos
      if (!await v$.value.$validate()) {
        toast.error('Complete the fields', {
          timeout: 3000
        });
        return
      }

      axios.post(`/api/characters/${parseInt(route.params.id)}/comments`, form).then(resp => {
        console.log(resp)
        emitter.emit('updateCharacter') //Actualizamos los datos del Character con este evento global
        toast.success('Comment added successfully', {
          timeout: 3000
        });
        form.authorName = ''
        form.comment = ''
        v$.value.$reset() // Reset a validación y los datos del formulario
      }).catch(e => {
        console.log(e)
        toast.error('Error', {
          timeout: 3000
        });
      })
    }

    return {form, v$, addComment}
  }
}
</script>

<style scoped>

</style>
