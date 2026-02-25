<template>
  <div class="card-banner relative w-full h-[400px] md:h-[500px] overflow-hidden">
    <img 
      :src="dados.imagem" 
      :alt="dados.titulo || 'Banner'"
      class="w-full h-full object-cover"
    />
    
    <div v-if="dados.titulo || dados.subtitulo || dados.cta" 
         class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
      <div class="container mx-auto px-4 md:px-8">
        <div class="max-w-2xl text-white">
          <h1 v-if="dados.titulo" class="text-4xl md:text-6xl font-bold mb-4">
            {{ dados.titulo }}
          </h1>
          <p v-if="dados.subtitulo" class="text-lg md:text-xl mb-6 opacity-90">
            {{ dados.subtitulo }}
          </p>
          <button 
            v-if="dados.cta"
            @click="handleClick"
            class="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {{ dados.cta }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BannerData } from '~/types/modules'

interface Props {
  dados: BannerData
}

const props = defineProps<Props>()

const handleClick = () => {
  if (props.dados.link) {
    navigateTo(props.dados.link)
  }
}
</script>
