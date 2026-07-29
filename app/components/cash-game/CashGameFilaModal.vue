<template>
  <Dialog :open="isOpen" @update:open="onOpenChange">
    <DialogContent
      class="border-none bg-transparent p-0 shadow-none sm:max-w-[519px] [&>button]:hidden"
    >
      <div
        class="flex min-h-[472px] w-full flex-col items-center justify-center rounded-2xl bg-brand-purple px-8 py-16 text-center text-[#e7e7e7]"
      >
        <DialogTitle class="sr-only">
          Posição na fila de cash game
        </DialogTitle>
        <DialogDescription class="sr-only">
          Você entrou na fila de espera do cash game.
        </DialogDescription>

        <p class="text-xl font-bold leading-7">
          Oi, {{ nome }}!
        </p>
        <p class="mt-8 text-xl font-bold leading-7">
          Você está em
        </p>
        <p class="mt-4 text-[40px] font-black leading-7">
          {{ posicaoLabel }}
        </p>
        <p class="mt-8 text-xl font-bold leading-7">
          na fila de espera
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '~/components/ui/dialog'

const { isOpen, nome, posicaoLabel, close } = useCashGameFila()

function onOpenChange(open: boolean) {
  if (!open) close()
}
</script>
