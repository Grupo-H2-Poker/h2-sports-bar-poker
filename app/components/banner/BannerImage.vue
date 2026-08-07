<template>
  <component
    :is="link ? 'button' : 'div'"
    type="button"
    class="block overflow-hidden"
    :class="[
      muted ? 'bg-muted' : 'bg-transparent',
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
      class="pointer-events-none"
      :class="[
        fill ? 'h-full w-full object-cover' : 'h-auto w-full',
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
  /** Fundo muted atrás da imagem. Desligar para overflow transparente. */
  muted?: boolean
}>(), {
  fill: true,
  muted: true,
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
