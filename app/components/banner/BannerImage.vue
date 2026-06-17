<template>
  <component
    :is="link ? 'button' : 'div'"
    type="button"
    class="block bg-muted overflow-hidden"
    :class="[
      fill ? 'h-full w-full' : 'h-auto w-full max-w-full',
      link && 'cursor-pointer',
    ]"
    @click="handleClick"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      draggable="false"
      class="pointer-events-none object-cover"
      :class="[
        fill ? 'h-full w-full' : 'h-auto w-full',
        imageClass,
      ]"
    />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt?: string
  link?: string
  imageClass?: string | string[]
  /** Preenche o container pai (padrão). `false` respeita dimensões do `imageClass` */
  fill?: boolean
}>(), {
  fill: true,
})

const route = useRoute()

function handleClick() {
  if (!props.link) return
  const unidadeSlug = route.params.unidade as string | undefined
  if (unidadeSlug) {
    navigateTo(resolveUnidadeHref(unidadeSlug, props.link))
    return
  }
  navigateTo(props.link)
}
</script>
