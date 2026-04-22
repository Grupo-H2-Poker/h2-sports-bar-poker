<template>
  <div class="rounded-2xl overflow-hidden bg-muted flex flex-col md:flex-row min-h-[260px]">
    <div class="flex-1 bg-muted min-h-[180px] md:min-h-0">
      <img
        v-if="dados.imagem"
        :src="dados.imagem"
        :alt="dados.titulo || 'Banner'"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="flex flex-col justify-center gap-3 p-8 md:w-80 lg:w-96">
      <h2 v-if="dados.titulo" class="text-2xl font-bold leading-tight">
        {{ dados.titulo }}
      </h2>
      <p v-if="dados.subtitulo" class="text-sm text-muted-foreground leading-relaxed">
        {{ dados.subtitulo }}
      </p>
      <Button v-if="dados.cta" @click="handleClick" class="w-fit">
        {{ dados.cta }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { BannerData } from '~/types/modules'

interface Props {
  dados: BannerData
}

const props = defineProps<Props>()

const handleClick = () => {
  if (props.dados.link) {
    navigateTo(props.dados.link)
  }
}
</script>
