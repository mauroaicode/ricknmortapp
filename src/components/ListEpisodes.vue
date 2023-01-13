<template>
  <div class="md:p-5 py-2 space-y-2">
    <h2 class="text-2xl font-bold text-gray-600 mb-4">Episodes</h2>
    <div class="overflow-auto h-60 bg-gray-50">
      <div class="p-4" v-for="episode in episodes" :key="episode">
        <a :href="episode" target="_blank">
        <div class="flex justify-between items-center">
          <h5 class="text-1xl font-bold text-gray-400 mb-2">Episode {{ episodeNumber(episode) }}</h5>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
        </div>
        </a>
        <hr class="h-px mt-4 bg-gray-200 border-0 rounded">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ListEpisodes",
  props: ['episodes'],
  setup() {
    /* Función que permite obtener el número del episodio a partir de la url dada*/
    const episodeNumber = (linkEpisode) => {
      let url = linkEpisode.split('/')
      return url[url.length - 1]
    }

    return {episodeNumber}
  }
}
</script>

<style scoped>

</style>
