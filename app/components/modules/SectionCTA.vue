<template>
  <div
    v-if="hasContent"
    class="flex flex-col"
    :class="[
      compact ? 'gap-0' : 'gap-6',
      wrapperClass,
      inverted && 'text-white',
    ]"
  >
    <div class="flex flex-col gap-3" :class="contentWidthClass">
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
      v-if="config.cta && !compact"
      class="flex"
      :class="buttonWrapperClass"
    >
      <Button
        :variant="buttonVariant"
        :size="buttonSize"
        class="rounded-full"
        :class="ctaButtonClass"
        @click="handleClick"
      >
        {{ config.cta }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { ButtonVariants } from '~/components/ui/button'
import type { SectionCTAData } from '~/types/cards'

const props = withDefaults(defineProps<{
  config?: SectionCTAData
  /** Sem botão CTA e layout compacto para cabeçalho de grid */
  compact?: boolean
  /** Texto claro sobre fundo escuro (banners, overlays) */
  inverted?: boolean
}>(), {
  config: () => ({}),
  compact: false,
  inverted: false,
})

const hasContent = computed(
  () => !!(props.config.titulo || props.config.descricao || (!props.compact && props.config.cta)),
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

const contentWidthClass = computed(() => {
  const width = props.config.width ?? 'md'

  switch (width) {
    case 'sm':
      return 'max-w-[200px]'
    case 'lg':
      return 'max-w-[560px]'
    default:
      return 'max-w-[360px]'
  }
})

const descriptionClass = computed(() => {
  switch (props.config.size) {
    case 'sm':
      return 'text-sm'
    case 'lg':
      return 'text-xl'
    default:
      return 'text-base'
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

const ctaButtonClass = computed(() =>
  resolveSectionCtaButtonClass(props.config.cta_cor, props.config.cta_variant),
)

const buttonVariant = computed((): ButtonVariants['variant'] => {
  if (ctaButtonClass.value) return 'ghost'
  return 'brand'
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
