<template>
  <section class="bg-muted py-20">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-2xl font-bold">
        {{ modulo.metadados?.titulo || 'Baixe o app H2' }}
      </h2>
      <p v-if="modulo.metadados?.descricao" class="text-sm text-muted-foreground mt-2">
        {{ modulo.metadados.descricao }}
      </p>
      <div class="flex gap-3 justify-center mt-6">
        <Button v-if="modulo.metadados?.link_android" @click="navigateTo(modulo.metadados.link_android)" variant="default">
          Google Play
        </Button>
        <Button v-if="modulo.metadados?.link_ios" @click="navigateTo(modulo.metadados.link_ios)" variant="default">
          App Store
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import type { ModuloOf } from '~/types/modules'

defineProps<{
  modulo: ModuloOf<'download_app'>
}>()
</script>
