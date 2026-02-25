<template>
  <div 
    class="card-agenda relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
    @click="handleClick"
  >
    <!-- Background Image -->
    <div class="relative h-64 overflow-hidden">
      <img 
        :src="dados.imagem" 
        :alt="dados.titulo"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </div>
    
    <!-- Content -->
    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
      <div v-if="dados.data" class="text-sm font-semibold mb-2 opacity-90">
        {{ formatarData(dados.data) }}
      </div>
      <h3 class="text-xl font-bold mb-2">{{ dados.titulo }}</h3>
      <p class="text-sm opacity-90 line-clamp-2">{{ dados.descricao }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardAgendaData } from '~/types/modules'

interface Props {
  dados: CardAgendaData
}

const props = defineProps<Props>()

const formatarData = (data: string) => {
  const date = new Date(data)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleClick = () => {
  if (props.dados.link) {
    navigateTo(props.dados.link)
  }
}
</script>
