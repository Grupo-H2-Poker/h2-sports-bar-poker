<template>
  <component
    :is="link ? 'button' : 'div'"
    type="button"
    class="block w-full h-full bg-muted overflow-hidden"
    :class="link && 'cursor-pointer'"
    @click="handleClick"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      draggable="false"
      class="w-full h-full object-cover pointer-events-none"
      :class="imageClass"
    />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  link?: string
  imageClass?: string | string[]
}>()

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
