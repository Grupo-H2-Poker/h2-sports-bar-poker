<template>
  <div class="flex gap-4">
    <div
      v-for="slot in slots"
      :key="slot.label"
      class="flex-1 rounded-xl outline-smooth-white-25 px-4 py-4 text-center text-lg font-semibold"
    >
      {{ slot.label }} {{ slot.valor }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardGenericData, CardHorario } from '~/types/cards'

const props = defineProps<{
  dados: Pick<CardGenericData, 'inicio' | 'late' | 'horarios'>
}>()

const slots = computed<CardHorario[]>(() => {
  if (props.dados.horarios?.length) return props.dados.horarios
  const list: CardHorario[] = []
  if (props.dados.inicio) list.push({ label: 'Início', valor: props.dados.inicio })
  if (props.dados.late) list.push({ label: 'Late', valor: props.dados.late })
  return list
})
</script>
