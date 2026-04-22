<template>
  <section class="py-16 bg-muted/40">
    <div class="container mx-auto px-4 max-w-2xl text-center">
      <div
        v-for="component in sortedComponents"
        :key="component.id"
        class="flex flex-col items-center gap-4"
      >
        <h2 v-if="component.data.titulo" class="text-3xl font-bold">
          {{ component.data.titulo }}
        </h2>
        <p v-if="component.data.conteudo" class="text-muted-foreground leading-relaxed" v-html="component.data.conteudo" />
        <Button v-if="component.data.cta" variant="outline" @click="component.data.cta_link && navigateTo(component.data.cta_link)" class="mt-2">
          {{ component.data.cta }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
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
