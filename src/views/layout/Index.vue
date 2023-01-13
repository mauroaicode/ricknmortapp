<template>
  <!--=====================================
		LAYOUT PRINCIPAL
  ======================================-->
  <div class="min-h-screen bg-gray-50" >
    <Header/>
    <div class="container mx-auto">
      <!--   Contenido de las rutas   -->
      <router-view/>
      <!--   Botón permite hacer scroll hacia arriba   -->
      <button @click="scrollTop" class="fixed md:bottom-5 md:right-5 bottom-2 right-2 text-xl p-3 bg-teal-500 font-bold md:text-3xl rounded-md text-white md:p-4">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
export default {
  name: "Index",
  components:{
    Header: defineAsyncComponent(() => import('@/views/partials/Header')),
  },
  setup(){
    /* Función para realizar el scroll hacia arriba*/
    const scrollTop = () =>{
      setTimeout(() => {
        document.getElementById('app').scrollIntoView({behavior: 'smooth'})
      }, 100)
    }

    return {scrollTop}
  }
}
</script>

<style scoped>

</style>
