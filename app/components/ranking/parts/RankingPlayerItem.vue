<template>
  <div class="flex items-center gap-2 shrink-0">
    <span class="text-sm font-bold text-white tabular-nums w-4 text-center">
      {{ posicao }}
    </span>

    <div class="w-8 h-8 rounded-md overflow-hidden bg-white/10 shrink-0">
      <img
        v-if="avatar"
        :src="avatar"
        :alt="nome"
        class="w-full h-full object-cover"
      >
    </div>

    <div class="min-w-0">
      <p class="text-xs font-medium text-white truncate leading-tight">
        {{ nome }}
      </p>
      <p
        v-if="pontos != null && pontos !== ''"
        class="text-[10px] text-white/80 tabular-nums leading-tight"
      >
        {{ formattedPontos }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  posicao: number
  nome: string
  avatar?: string
  pontos?: string | number
}>()

const formattedPontos = computed(() => {
  const { pontos } = props
  if (pontos == null || pontos === '') return ''
  if (typeof pontos === 'number') return pontos.toLocaleString('pt-BR')
  return pontos
})
</script>
