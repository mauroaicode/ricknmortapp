<template>
  <div class="py-10">
    <section class="w-full h-96 flex justify-center items-center">
      <div class="text-center mt-12">
        <iframe src="https://giphy.com/embed/YPPI2Q6DAz4CohnPDD" width="350" height="350" frameBorder="0"
                class="giphy-embed" allowFullScreen>
        </iframe>
        <h3 class=" text-gray-500 font-bold text-4xl">Page not found 404</h3>
        <div class="mt-5">
          <router-link to="/characters" class="focus:ring-4 inline-flex items-center mr-2 focus:outline-none focus:ring-teal-300 bg-teal-500 transition-colors text-white p-3 mt-5 rounded-md hover:bg-teal-400 text-sm font-medium uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>

            Got to Characters
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>

</style>
