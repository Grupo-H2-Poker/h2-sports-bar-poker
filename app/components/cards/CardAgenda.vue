<template>
  <div
    :class="[
      'p-6 cursor-pointer transition-colors flex-shrink-0 flex flex-col justify-between text-white rounded-lg',
      width,
      height,
      active ? activeColor : inactiveColor,
    ]"
    @click="handleClick"
  >
    <div class="text-sm font-medium opacity-80">
      {{ dados.garantido ?? '' }}
    </div>

    <h3 class="text-2xl font-bold leading-tight">{{ dados.titulo }}</h3>

    <div class="flex flex-col gap-1 text-sm">
      <div class="flex gap-5">
        <span v-if="dados.inicio">Início {{ dados.inicio }}</span>
        <span v-if="dados.late">Late {{ dados.late }}</span>
      </div>
      <span v-if="dados.inscricoes" class="opacity-70">Inscrições até {{ dados.inscricoes }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface AgendaCardData {
  titulo: string
  garantido?: string
  inicio?: string
  late?: string
  inscricoes?: string
  link?: string
}

interface Props {
  dados: AgendaCardData
  active?: boolean
  width?: string
  height?: string
  activeColor?: string
  inactiveColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  width: 'w-[265px]',
  height: 'h-[250px]',
  activeColor: 'bg-brand-purple',
  inactiveColor: 'bg-brand-purple/30',
})

const handleClick = () => {
  if (props.dados.link) {
    navigateTo(props.dados.link)
  }
}
</script>
