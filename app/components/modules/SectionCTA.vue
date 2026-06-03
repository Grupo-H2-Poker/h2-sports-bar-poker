<template>
  <div
    v-if="hasContent"
    class="flex flex-col gap-6"
    :class="wrapperClass"
  >
    <div class="flex flex-col gap-3">
      <h2
        v-if="config.titulo"
        class="font-bold leading-tight"
        :class="titleClass"
      >
        {{ config.titulo }}
      </h2>

      <p
        v-if="config.descricao"
        class="opacity-80"
        :class="descriptionClass"
      >
        {{ config.descricao }}
      </p>
    </div>

    <div
      v-if="config.cta"
      class="flex"
      :class="buttonWrapperClass"
    >
      <Button
        variant="brand"
        :size="buttonSize"
        class="rounded-full"
        @click="handleClick"
      >
        {{ config.cta }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { SectionCTAData } from '~/types/cards'

const props = withDefaults(defineProps<{
  config?: SectionCTAData
}>(), {
  config: () => ({}),
})

const hasContent = computed(
  () => !!(props.config.titulo || props.config.descricao || props.config.cta),
)

const wrapperClass = computed(() => ({
  'items-start text-left': props.config.align === 'left',
  'items-center text-center': props.config.align === 'center',
  'items-end text-right': props.config.align === 'right',
}))

const buttonWrapperClass = computed(() => ({
  'justify-start': props.config.align === 'left',
  'justify-center': props.config.align === 'center',
  'justify-end': props.config.align === 'right',
}))

const titleClass = computed(() => {
  switch (props.config.size) {
    case 'sm':
      return 'text-xl'
    case 'lg':
      return 'text-5xl'
    default:
      return 'text-3xl'
  }
})

const descriptionClass = computed(() => {
  switch (props.config.size) {
    case 'sm':
      return 'text-sm max-w-[240px]'
    case 'lg':
      return 'text-xl max-w-[720px]'
    default:
      return 'text-base max-w-[420px]'
  }
})

const buttonSize = computed(() => {
  switch (props.config.size) {
    case 'sm':
      return 'sm'
    case 'lg':
      return 'lg'
    default:
      return 'default'
  }
})

const route = useRoute()

function handleClick() {
  const link = props.config.cta_link
  if (!link) return

  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) {
    navigateTo(resolveUnidadeHref(unidadeSlug, link))
    return
  }

  navigateTo(link)
}
</script>
