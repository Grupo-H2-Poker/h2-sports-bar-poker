<template>
  <section class="py-4">
    <div class="container mx-auto px-4">
      <div class="flex items-center gap-6 overflow-x-auto">
        <div v-if="modulo.metadados?.logo" class="flex-shrink-0">
          <div class="w-14 h-14 rounded-full border-2 border-border overflow-hidden bg-muted flex items-center justify-center">
            <img :src="modulo.metadados.logo" :alt="modulo.metadados.titulo || 'Torneio'" class="w-full h-full object-contain" />
          </div>
        </div>

        <div class="flex gap-6">
          <div
            v-for="(player, index) in sortedComponents"
            :key="player.id"
            class="flex items-center gap-2 flex-shrink-0"
          >
            <div class="w-8 h-8 rounded-lg bg-muted overflow-hidden flex-shrink-0">
              <img v-if="player.data.avatar" :src="player.data.avatar" :alt="player.data.nome" class="w-full h-full object-cover" />
            </div>
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {{ index + 1 }}º LUGAR
              </p>
              <p class="text-xs font-medium">{{ player.data.nome }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Modulo, ComponentData } from '~/types/modules'

interface Props {
  modulo: Modulo
  data: ComponentData[]
}

const props = defineProps<Props>()

const sortedComponents = computed(() => {
  return [...props.data]
    .filter(c => c.status === 'publicado')
    .sort((a, b) => a.ordem - b.ordem)
})
</script>
