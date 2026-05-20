<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <!-- Card esquerdo -->
        <div class="md:w-64 flex-shrink-0">
          <div class="rounded-2xl bg-muted p-6 flex flex-col gap-3">
            <h2 class="text-xl font-bold leading-snug">
              {{ modulo.metadados?.titulo || 'Perguntas frequentes' }}
            </h2>
            <p v-if="modulo.metadados?.descricao" class="text-sm text-muted-foreground">
              {{ modulo.metadados.descricao }}
            </p>
            <Button
              v-if="modulo.metadados?.cta"
              @click="modulo.metadados?.cta_link && navigateTo(modulo.metadados.cta_link)"
              class="w-fit mt-1"
            >
              {{ modulo.metadados.cta }}
            </Button>
          </div>
        </div>

        <!-- Acordeão -->
        <div class="flex-1">
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem
              v-for="item in sortedComponents"
              :key="item.id"
              :value="`item-${item.id}`"
            >
              <AccordionTrigger class="text-left text-sm">
                {{ item.data.pergunta }}
              </AccordionTrigger>
              <AccordionContent class="text-sm text-muted-foreground">
                {{ item.data.resposta }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'faq'>
}>()

const sortedComponents = useSortedComponents(() => props.modulo)
</script>
