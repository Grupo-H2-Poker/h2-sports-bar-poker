<template>
  <div
    class="grid grid-cols-1"
    :class="[
      columnsClass,
      gapClass,
      alignClass,
      shouldClipOverflow && 'overflow-hidden',
      rounded && !borderRadius && 'rounded-2xl',
    ]"
    :style="borderRadiusStyle"
  >
    <div
      :class="[
        columnClass,
        reverseOnMobile && 'order-2 md:order-none',
        startOrderClass,
      ]"
    >
      <slot name="start" />
    </div>

    <div
      :class="[
        columnClass,
        reverseOnMobile && 'order-1 md:order-none',
        endOrderClass,
      ]"
    >
      <slot name="end" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  gap?: 'none' | 'sm' | 'md'
  align?: 'stretch' | 'center'
  rounded?: boolean
  borderRadius?: string
  /**
   * Proporção das colunas no desktop.
   * `2/3` — start 2fr / end 3fr (imagem estreita à esquerda).
   * Com `reverse`, inverte automaticamente (3fr / 2fr).
   */
  columns?: '1/1' | '2/3'
  /** Inverte ordem das colunas no mobile (slot end fica em cima) */
  reverseOnMobile?: boolean
  /** Inverte ordem das colunas no desktop (troca start ↔ end) */
  reverse?: boolean
  /** Alias de `reverse` */
  inverted?: boolean
  /** Recorta conteúdo nas bordas arredondadas — desative quando o filho precisa sangrar (ex.: carousel) */
  clipOverflow?: boolean
}>(), {
  gap: 'none',
  align: 'stretch',
  rounded: false,
  columns: '1/1',
  reverseOnMobile: false,
  reverse: false,
  inverted: false,
  clipOverflow: true,
})

const isReversed = computed(() => props.reverse || props.inverted)

const borderRadiusStyle = computed(() =>
  props.borderRadius ? { borderRadius: props.borderRadius } : undefined,
)

const hasRoundedCorners = computed(() => props.rounded || !!props.borderRadius)

const shouldClipOverflow = computed(
  () => props.clipOverflow && hasRoundedCorners.value,
)

const gapClass = computed(() => ({
  'gap-0': props.gap === 'none',
  'gap-4': props.gap === 'sm',
  'gap-6': props.gap === 'md',
}))

const columnsClass = computed(() => {
  if (props.columns === '2/3') {
    return isReversed.value ? 'md:grid-cols-[3fr_2fr]' : 'md:grid-cols-[2fr_3fr]'
  }
  return 'md:grid-cols-2'
})

const alignClass = computed(() =>
  props.align === 'center' ? 'items-center' : 'items-stretch',
)

const columnClass = 'min-w-0 flex flex-col'

const startOrderClass = computed(() =>
  isReversed.value ? 'md:order-2' : 'md:order-1',
)

const endOrderClass = computed(() =>
  isReversed.value ? 'md:order-1' : 'md:order-2',
)
</script>
