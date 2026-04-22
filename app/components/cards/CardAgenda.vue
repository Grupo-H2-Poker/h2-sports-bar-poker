<template>
  <div
    class="rounded-xl bg-muted p-4 min-w-[180px] cursor-pointer hover:bg-muted/80 transition-colors"
    @click="handleClick"
  >
    <div v-if="dados.garantido" class="text-xs font-bold mb-1">{{ dados.garantido }}</div>
    <h3 class="text-base font-bold leading-snug mb-2">{{ dados.titulo }}</h3>
    <div class="flex gap-3 text-xs text-muted-foreground">
      <div v-if="dados.inicio">
        <span class="font-medium text-foreground">Início {{ dados.inicio }}</span>
      </div>
      <div v-if="dados.late">
        <span class="font-medium text-foreground">Late {{ dados.late }}</span>
      </div>
      <div v-if="dados.inscricoes">
        <span>Inscrições até {{ dados.inscricoes }}</span>
      </div>
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
}

const props = defineProps<Props>()

const handleClick = () => {
  if (props.dados.link) {
    navigateTo(props.dados.link)
  }
}
</script>
