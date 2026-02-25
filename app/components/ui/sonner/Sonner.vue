<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { Toaster as Sonner } from "vue-sonner"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--success-bg': 'var(--popover)',
      '--success-text': 'var(--popover-foreground)',
      '--success-border': 'var(--border)',
      '--error-bg': 'var(--popover)',
      '--error-text': 'var(--popover-foreground)',
      '--error-border': 'var(--border)',
      '--warning-bg': 'var(--popover)',
      '--warning-text': 'var(--popover-foreground)',
      '--warning-border': 'var(--border)',
      '--info-bg': 'var(--popover)',
      '--info-text': 'var(--popover-foreground)',
      '--info-border': 'var(--border)',
    }"
  />
</template>

<style>
/* Força a cor correta para o texto do toast no modo escuro */
.dark [data-sonner-toast] [data-description] {
  color: var(--muted-foreground) !important;
  opacity: 1 !important;
}

.dark [data-sonner-toast] [data-title] {
  color: var(--popover-foreground) !important;
  font-weight: 500 !important;
}

/* Garante que o fundo também esteja correto */
.dark [data-sonner-toast] {
  background-color: var(--popover) !important;
  border-color: var(--border) !important;
}

/* Para modo claro também */
[data-sonner-toast] [data-description] {
  color: var(--muted-foreground);
  opacity: 1;
}

[data-sonner-toast] [data-title] {
  color: var(--popover-foreground);
  font-weight: 500;
}

[data-sonner-toast] {
  background-color: var(--popover);
  border-color: var(--border);
}
</style>
