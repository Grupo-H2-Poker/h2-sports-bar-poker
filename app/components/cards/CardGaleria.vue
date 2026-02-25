<template>
  <div 
    class="card-galeria relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group aspect-square"
    @click="handleClick"
  >
    <img 
      :src="dados.imagem" 
      :alt="dados.titulo || 'Imagem da galeria'"
      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
    />
    
    <div v-if="dados.titulo || dados.descricao" 
         class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
      <div class="p-4 text-white w-full">
        <h4 v-if="dados.titulo" class="font-semibold mb-1">{{ dados.titulo }}</h4>
        <p v-if="dados.descricao" class="text-sm opacity-90 line-clamp-2">{{ dados.descricao }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GaleriaImagemData } from '~/types/modules'

interface Props {
  dados: GaleriaImagemData
}

const props = defineProps<Props>()

const handleClick = () => {
  if (props.dados.link) {
    navigateTo(props.dados.link)
  }
}
</script>
