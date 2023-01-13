<template>
  <div class="text-center">
    <nav class="inline-flex">
      <!--  Botón que permite volver a un número anterior en la paginación    -->
      <button class="relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer"
              @click="backPage" :disabled="currentPage === 1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6 text-gray-700">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
      </button>
      <!--  Input para mostrar el número de la pagina actual e ir a número de paginación  -->
      <input type="number"
             class="focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 border mr-2 ml-1 w-12 text-center"
             pattern="[1-9]*" @keyup.enter="goToPage"
             v-model="currentPage">
      <!--  Botón que permite ir a la siguiente página  -->
      <button class="relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer"
              @click="nextPage" :disabled="currentPage === totalPage">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6 text-gray-700">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
        </svg>
      </button>
    </nav>
    <!--  Mensaje  -->
    <p class="text-sm text-gray-400 mt-2">Navigate or enter the page number.</p>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

export default {
  name: "PaginationCharacters",
  props: ['totalCharacters', 'totalPage'],
  setup(props, context) {
    const perPage = ref(20)
    const route = useRoute();
    const currentPage = ref(1)
    const router = useRouter();

    /* Función que permite ir a la siguiente página*/
    const nextPage = async () => {
      let routePage = parseInt(route.query.page) //Obtenemos el valor de la página actual
      if (route.query.page !== Math.ceil(props.totalCharacters / perPage.value)) {
        currentPage.value = routePage ? routePage + 1 : 2
        await gotToPageShow() //Ir a la página y mostrar la lista de Characters
        // toBottom()
      }
    };
    /* Función que permite volver a una página anterior*/
    const backPage = async () => {
      if (currentPage.value !== 1) {
        currentPage.value -= 1;
        await gotToPageShow() //Ir a la página y mostrar la lista de Characters
        // toBottom()
      }
    };
    /* Función que permite ir a la página y mostrar la lista de Characters*/
    const gotToPageShow = async () => {
      await router.push({path: '/characters', query: {page: currentPage.value}})
      context.emit('getCharacters', currentPage.value)
    }
    /* Función que permite recibir un número e ir a página*/
    const goToPage = async () => {
      if (currentPage.value > props.totalPage || !currentPage.value) {
        let routePage = parseInt(route.query.page)
        currentPage.value = routePage ? routePage : 1
        return
      }
      await router.push({path: '/characters', query: {page: currentPage.value}})
      context.emit('getCharacters', currentPage.value)
      toBottom()
    };
    /* Función que permite ir a la página actual*/
    const urlCurrentPage = () => {
      if (route.query.page) {
        expressionValidation(route.query.page)
        currentPage.value = parseInt(route.query.page)
        context.emit('getCharacters', route.query.page)
      }
    }
    /* Hacer scroll hacia arriba*/
    const toBottom = () => {
      setTimeout(() => {
        document.getElementById('section-card').scrollIntoView({behavior: 'smooth'})
      }, 100)
    }
    /* Expresión regular para validar que no ingreses textos o números menores a 1 en la url*/
    const expressionValidation = (value) => {
      const expression = '^[0-9]+$'
      let totalPages = parseInt(localStorage.getItem('totalPages'))
      if (!value.match(expression) || parseInt(value) > totalPages) {
        return router.go(-1)
      }
    }

    onMounted(() => {
      urlCurrentPage()
    })
    /* Ir a la página de inicio y hacer reset en la paginación*/
    onBeforeRouteUpdate((to, from, next) => {
      if (to.fullPath === '/characters') {
        currentPage.value = 1
        context.emit('getCharacters', currentPage.value)
        next()
      } else {
        next()
      }
    })
    watch(
        () => route.path, (value) => {
          console.log(value)
        }
    )

    return {perPage, currentPage, goToPage, nextPage, backPage, urlCurrentPage, expressionValidation, gotToPageShow}
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
