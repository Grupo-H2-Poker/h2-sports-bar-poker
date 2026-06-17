<template>
  <section
    :class="sectionClass"
  >
    <div
      class="container mx-auto px-4"
      :class="containerClass"
    >
      <div
        v-for="component in sortedComponents"
        :key="component.id"
        class="flex flex-col gap-4"
        :class="contentAlignClass"
      >
        <h2
          v-if="component.data.titulo"
          class="text-[40px] font-bold leading-tight text-[#e7e7e7]"
        >
          {{ component.data.titulo }}
        </h2>
        <div
          v-if="component.data.conteudo"
          class="text-lg font-medium leading-7 text-[#e7e7e7]"
          v-html="component.data.conteudo"
        />
        <Button
          v-if="component.data.cta"
          variant="outline"
          class="mt-2 w-fit rounded-full"
          @click="handleCtaClick(component.data.cta_link)"
        >
          {{ component.data.cta }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'texto'>
}>()

const sortedComponents = useSortedComponents(() => props.modulo)

const align = computed(() => props.modulo.metadados?.align ?? 'center')
const maxWidth = computed(() => props.modulo.metadados?.max_width ?? 'md')
const background = computed(() => props.modulo.metadados?.background ?? 'default')

const sectionClass = computed(() => ({
  'bg-muted/40': background.value === 'default',
}))

const containerClass = computed(() => ({
  'max-w-2xl': maxWidth.value === 'sm',
  'max-w-3xl': maxWidth.value === 'md',
  'max-w-5xl': maxWidth.value === 'lg',
  'max-w-none': maxWidth.value === 'full',
}))

const contentAlignClass = computed(() => ({
  'items-start text-left': align.value === 'left',
  'items-center text-center': align.value === 'center',
}))

const route = useRoute()

function handleCtaClick(link?: string) {
  if (!link) return

  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) {
    navigateTo(resolveUnidadeHref(unidadeSlug, link))
    return
  }

  navigateTo(link)
}
</script>
