<template>
  <div
    class="w-full h-[62px]"
    :class="backgroundClass"
    :style="backgroundStyle"
  >
    <div class="container flex h-full items-center justify-between gap-4 md:gap-6">
      <!-- Título + logo da etapa -->
      <div class="flex items-center gap-3 shrink-0">
        <span class="text-sm font-bold text-white whitespace-nowrap">
          {{ config.titulo ?? 'Ranking' }}
        </span>
        <img
          v-if="config.logo"
          :src="config.logo"
          :alt="config.titulo ?? 'Ranking'"
          class="h-9 w-9 shrink-0 object-contain"
        >
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
        :variant="ctaAppearance.variant"
        size="sm"
        class="rounded-full"
        :class="ctaAppearance.class"
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
import { resolveCtaButtonAppearance } from '~/utils/sectionCtaButton'
import RankingPlayerItem from '~/components/ranking/parts/RankingPlayerItem.vue'

type RankingPlayer = ComponentData<ModuloContentDataMap['ranking']>

const props = defineProps<{
  config: RankingConfigData
  players: RankingPlayer[]
}>()

const backgroundClass = computed(() => resolveRankingBackground(props.config))
const backgroundStyle = computed(() => resolveRankingBackgroundStyle(props.config))
const ctaAppearance = computed(() => resolveCtaButtonAppearance('branco', 'outline'))

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
