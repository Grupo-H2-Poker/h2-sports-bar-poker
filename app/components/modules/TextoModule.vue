<template>
  <section :class="sectionClass">
    <div
      class="container mx-auto px-4 flex flex-col"
      :class="contentAlignClass"
    >
      <div
        class="w-full"
        :class="maxWidthClass"
      >
        <SectionCTA
          v-if="ctaConfig"
          :config="ctaConfig"
          inverted
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionCTA from '~/components/modules/SectionCTA.vue'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'texto'>
}>()

const ctaConfig = useModuleSectionCTA(() => props.modulo)

const align = computed(() => props.modulo.metadados?.align ?? ctaConfig.value?.align ?? 'center')
const maxWidth = computed(() => props.modulo.metadados?.max_width ?? 'md')
const background = computed(() => props.modulo.metadados?.background ?? 'default')

const sectionClass = computed(() => ({
  'bg-muted/40': background.value === 'default',
}))

const maxWidthClass = computed(() => ({
  'max-w-2xl': maxWidth.value === 'sm',
  'max-w-3xl': maxWidth.value === 'md',
  'max-w-5xl': maxWidth.value === 'lg',
  'max-w-none': maxWidth.value === 'full',
}))

const contentAlignClass = computed(() => ({
  'items-start': align.value === 'left',
  'items-center': align.value === 'center',
  'items-end': align.value === 'right',
}))
</script>
