<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2"
    :class="[
      gapClass,
      alignClass,
      hasRoundedCorners && 'overflow-hidden',
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
  /** Inverte ordem das colunas no mobile (slot end fica em cima) */
  reverseOnMobile?: boolean
  /** Inverte ordem das colunas no desktop (troca start ↔ end) */
  reverse?: boolean
  /** Alias de `reverse` */
  inverted?: boolean
}>(), {
  gap: 'none',
  align: 'stretch',
  rounded: false,
  reverseOnMobile: false,
  reverse: false,
  inverted: false,
})

const isReversed = computed(() => props.reverse || props.inverted)

const borderRadiusStyle = computed(() =>
  props.borderRadius ? { borderRadius: props.borderRadius } : undefined,
)

const hasRoundedCorners = computed(() => props.rounded || !!props.borderRadius)

const gapClass = computed(() => ({
  'gap-0': props.gap === 'none',
  'gap-4': props.gap === 'sm',
  'gap-6': props.gap === 'md',
}))

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
