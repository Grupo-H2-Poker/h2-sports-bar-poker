<template>
  <div
    v-if="hasContent"
    :class="outerClass"
    :style="outerStyle"
  >
    <div :class="innerClass">
      <div
        class="flex w-full"
        :class="outerLayoutClasses"
        :style="outerLayoutStyle"
      >
        <div
          class="flex min-w-0"
          :class="contentGroupClasses"
          :style="contentGroupStyle"
        >
          <div
            class="flex min-w-0 flex-col"
            :class="contentAlignClass"
            :style="textStyle"
          >
            <h2
              v-if="data.titulo"
              class="font-bold leading-tight"
              :style="tituloStyle"
            >
              {{ data.titulo }}
            </h2>

            <p
              v-if="data.descricao"
              class="opacity-80"
              :style="descricaoStyle"
            >
              {{ data.descricao }}
            </p>
          </div>

          <Button
            v-if="data.cta"
            :variant="buttonVariant"
            size="sm"
            class="shrink-0 rounded-full"
            :class="ctaButtonClass"
            :style="ctaStyle"
            @click="handleClick"
          >
            {{ data.cta }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { ButtonVariants } from '~/components/ui/button'
import type { FaixaCtaData } from '~/types/faixa-cta'
import {
  resolveFaixaCtaBackgroundStyle,
  resolveFaixaCtaBorderStyle,
  resolveFaixaCtaCtaStyle,
  resolveFaixaCtaGapStyle,
  resolveFaixaCtaPaddingStyle,
  resolveFaixaCtaTextStyle,
} from '~/types/faixa-cta'

const HORIZONTAL_ALIGN_CLASS: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
}

const VERTICAL_ALIGN_CLASS: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
}

const props = withDefaults(defineProps<{
  data: FaixaCtaData
}>(), {
  data: () => ({}),
})

const hasContent = computed(
  () => !!(props.data.titulo || props.data.descricao || props.data.cta),
)

const stackMobile = computed(() => props.data.stack_mobile ?? true)

const isFullWidth = computed(() => props.data.fullWidth ?? false)

const outerClass = computed(() => ({
  'w-full': isFullWidth.value,
  'container mx-auto px-4': !isFullWidth.value,
}))

const innerClass = computed(() =>
  isFullWidth.value ? 'container mx-auto px-4' : 'w-full',
)

const outerStyle = computed(() => {
  if (isFullWidth.value) {
    return {
      ...resolveFaixaCtaBackgroundStyle(props.data),
      ...resolveFaixaCtaBorderStyle(props.data),
    }
  }

  return {
    ...resolveFaixaCtaBackgroundStyle(props.data),
    ...resolveFaixaCtaBorderStyle(props.data),
    ...resolveFaixaCtaPaddingStyle(props.data),
  }
})

const isSpreadLayout = computed(() => props.data.align_horizontal === 'between')

const outerLayoutClasses = computed(() => {
  const vertical = VERTICAL_ALIGN_CLASS[props.data.align_vertical ?? 'center'] ?? 'items-center'

  if (isSpreadLayout.value) {
    return [vertical]
  }

  const horizontal = props.data.align_horizontal ?? 'start'
  return [
    HORIZONTAL_ALIGN_CLASS[horizontal] ?? 'justify-start',
    vertical,
  ]
})

const contentGroupClasses = computed(() => {
  if (isSpreadLayout.value) {
    return [
      'flex w-full justify-between',
      stackMobile.value ? 'flex-col sm:flex-row' : 'flex-row',
      VERTICAL_ALIGN_CLASS[props.data.align_vertical ?? 'center'] ?? 'items-center',
    ]
  }

  return [
    'flex',
    stackMobile.value ? 'flex-col sm:flex-row' : 'flex-row',
    VERTICAL_ALIGN_CLASS[props.data.align_vertical ?? 'center'] ?? 'items-center',
  ]
})

const outerLayoutStyle = computed(() => ({
  ...(isFullWidth.value ? resolveFaixaCtaPaddingStyle(props.data) : {}),
}))

const contentGroupStyle = computed(() => resolveFaixaCtaGapStyle(props.data))

const textStyle = computed(() => resolveFaixaCtaTextStyle(props.data))

const tituloStyle = computed(() => {
  if (!props.data.titulo_size) return undefined
  return { fontSize: props.data.titulo_size }
})

const descricaoStyle = computed(() => {
  if (!props.data.descricao_size) return undefined
  return { fontSize: props.data.descricao_size }
})

const contentAlignClass = computed(() => ({
  'text-left': props.data.align_horizontal !== 'center',
  'text-center': props.data.align_horizontal === 'center',
  'sm:text-left': stackMobile.value && props.data.align_horizontal !== 'center',
}))

const ctaButtonClass = computed(() =>
  resolveSectionCtaButtonClass(props.data.cta_cor, props.data.cta_variant),
)

const ctaStyle = computed(() => {
  if (ctaButtonClass.value) return undefined
  return resolveFaixaCtaCtaStyle(props.data)
})

const buttonVariant = computed((): ButtonVariants['variant'] => {
  if (ctaButtonClass.value || ctaStyle.value) return 'ghost'
  return 'brand'
})

const route = useRoute()

function handleClick() {
  const link = props.data.cta_link
  if (!link) return

  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) {
    navigateTo(resolveUnidadeHref(unidadeSlug, link))
    return
  }

  navigateTo(link)
}
</script>
