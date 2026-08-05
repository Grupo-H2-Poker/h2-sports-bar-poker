<template>
  <div class="flex flex-col gap-1">
    <div v-if="slots.length" class="flex flex-wrap gap-x-8 gap-y-1 text-base font-semibold">
      <span v-for="slot in slots" :key="slot.label">
        {{ slot.label }} {{ slot.valor }}
      </span>
    </div>
    <span v-if="dados.inscricoes" class="text-sm opacity-70">
      {{ t('card.registrationUntil', { time: dados.inscricoes }) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData, CardHorario } from '~/types/cards'

const { t } = useI18n()

const props = defineProps<{
  dados: Pick<CardGenericData, 'inicio' | 'late' | 'inscricoes' | 'horarios'>
}>()

const slots = computed<CardHorario[]>(() => {
  if (props.dados.horarios?.length) return props.dados.horarios
  const list: CardHorario[] = []
  if (props.dados.inicio) list.push({ label: t('card.start'), valor: props.dados.inicio })
  if (props.dados.late) list.push({ label: t('card.late'), valor: props.dados.late })
  return list
})
</script>
