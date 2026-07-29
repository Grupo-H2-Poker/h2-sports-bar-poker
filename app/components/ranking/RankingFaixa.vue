<template>
  <div
    class="w-full h-[62px]"
    :class="backgroundClass"
    :style="backgroundStyle"
  >
    <div class="container flex h-full items-center justify-between gap-4 md:gap-6">
      <!-- Título + logo da etapa -->
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-sm font-bold text-white whitespace-nowrap">
          {{ config.titulo ?? 'Ranking' }}
        </span>
        <div
          v-if="config.logo"
          class="w-9 h-9 rounded-full border-2 border-white/30 overflow-hidden bg-white/10 flex items-center justify-center shrink-0"
        >
          <img
            :src="config.logo"
            :alt="config.titulo ?? 'Ranking'"
            class="w-full h-full object-contain"
          >
        </div>
      </div>

      <!-- Jogadores -->
      <div class="flex items-center justify-center gap-4 md:gap-6 lg:gap-8 flex-1 min-w-0 overflow-x-auto">
        <RankingPlayerItem
          v-for="(player, index) in players"
          :key="player.id"
          :posicao="index + 1"
          :nome="player.data.nome"
          :avatar="player.data.avatar"
          :pontos="player.data.pontos"
        />
      </div>

      <!-- CTA -->
      <Button
        v-if="config.cta"
        variant="ghost"
        size="sm"
        class="rounded-full outline-smooth-white bg-transparent text-white hover:bg-white/10 hover:text-white"
        @click="handleCtaClick"
      >
        {{ config.cta }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { ComponentData, ModuloContentDataMap } from '~/types/modules'
import type { RankingConfigData } from '~/types/ranking'
import {
  resolveRankingBackground,
  resolveRankingBackgroundStyle,
} from '~/types/ranking'
import RankingPlayerItem from '~/components/ranking/parts/RankingPlayerItem.vue'

type RankingPlayer = ComponentData<ModuloContentDataMap['ranking']>

const props = defineProps<{
  config: RankingConfigData
  players: RankingPlayer[]
}>()

const backgroundClass = computed(() => resolveRankingBackground(props.config))
const backgroundStyle = computed(() => resolveRankingBackgroundStyle(props.config))

const route = useRoute()

function handleCtaClick() {
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
