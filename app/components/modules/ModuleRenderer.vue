<template>
  <div>
    <div
      v-for="modulo in sortedModulos"
      :key="modulo.id"
      :style="getModuloMarginStyle(modulo)"
    >
      <component
        :is="getModuleComponent(modulo.tipo)"
        :modulo="modulo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Modulo, ModuloTipo } from '~/types/modules'
import AgendaModule from '~/components/modules/AgendaPreviewModule.vue'
import GridModule from '~/components/modules/GridModule.vue'
import BannerModule from '~/components/modules/BannerModule.vue'
import GaleriaModule from '~/components/modules/GaleriaModule.vue'
import TextoModule from '~/components/modules/TextoModule.vue'
import RankingModule from '~/components/modules/RankingModule.vue'
import RankingTabelaModule from '~/components/modules/RankingTabelaModule.vue'
import FaqModule from '~/components/modules/FaqModule.vue'
import FaqPageModule from '~/components/modules/FaqPageModule.vue'
import EmbaixadoresModule from '~/components/modules/EmbaixadoresModule.vue'
import DownloadAppModule from '~/components/modules/DownloadAppModule.vue'
import EventosCarouselModule from '~/components/modules/EventosCarouselModule.vue'
import FaixaCtaModule from '~/components/modules/FaixaCtaModule.vue'

interface Props {
  modulos: Modulo[]
}

const props = defineProps<Props>()

const moduloMapa: Partial<Record<ModuloTipo, Component>> = {
  agenda_preview: AgendaModule,
  grid: GridModule,
  banner: BannerModule,
  galeria: GaleriaModule,
  texto: TextoModule,
  ranking: RankingModule,
  ranking_tabela: RankingTabelaModule,
  faq: FaqModule,
  faq_page: FaqPageModule,
  embaixadores: EmbaixadoresModule,
  download_app: DownloadAppModule,
  eventos: EventosCarouselModule,
  faixa_cta: FaixaCtaModule,
}

const sortedModulos = computed(() => {
  return [...props.modulos]
    .filter(m => m.status === 'publicado')
    .sort((a, b) => a.ordem - b.ordem)
})

const getModuloMarginStyle = (modulo: Modulo) => {
  const { marginTop, marginBottom } = resolveModuloMargins(modulo)
  return { marginTop, marginBottom }
}

const getModuleComponent = (tipo: ModuloTipo | string) => {
  return moduloMapa[tipo as ModuloTipo] ?? {
    props: ['modulo'],
    template: `<div class="p-4 border border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">⚠️ Módulo tipo "{{ modulo.tipo }}" não implementado</div>`
  }
}
</script>
