<template>
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="md:w-64 flex-shrink-0">
          <div class="rounded-2xl bg-muted p-6">
            <SectionCTA v-if="ctaConfig" :config="ctaConfig" />
            <h2 v-else class="text-xl font-bold leading-snug">
              Perguntas frequentes
            </h2>
          </div>
        </div>

        <div class="flex-1">
          <Accordion type="single" collapsible class="w-full">
            <AccordionItem
              v-for="item in itens"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'faq'>
}>()

const { ctaConfig, items: itens } = useModuloComponents(() => props.modulo)
</script>
