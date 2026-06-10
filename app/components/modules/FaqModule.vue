<template>
  <section class="py-12">
    <div
      class="container mx-auto"
      :style="pagePaddingStyle"
    >
      <TwoColumnLayout
        rounded
        align="stretch"
        class="bg-[#373737] text-white overflow-hidden rounded-lg"
      >
        <template #start>
          <div class="flex flex-col justify-center h-full p-8 md:p-12 lg:p-16 min-h-0">
            <SectionCTA
              v-if="ctaConfig"
              :config="ctaConfig"
              inverted
            />
          </div>
        </template>

        <template #end>
          <div class="flex flex-col justify-start h-full p-8 md:p-12 lg:pl-8 lg:pr-16 min-h-0">
            <Accordion
              type="single"
              collapsible
              class="faq-accordion w-full"
            >
              <AccordionItem
                v-for="item in itens"
                :key="item.id"
                :value="`item-${item.id}`"
                class="border-white/20"
              >
                <AccordionTrigger class="text-left text-base font-normal text-white hover:no-underline py-5">
                  {{ item.data.pergunta }}
                </AccordionTrigger>
                <AccordionContent class="text-sm text-white/70 pb-5">
                  {{ item.data.resposta }}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </template>
      </TwoColumnLayout>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import TwoColumnLayout from '~/components/layout/TwoColumnLayout.vue'
import SectionCTA from '~/components/modules/SectionCTA.vue'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'faq'>
}>()

const { ctaConfig, items: itens } = useModuloComponents(() => props.modulo)

const pagePaddingStyle = useModuloMarginLateral(() => props.modulo.metadados)
</script>

<style scoped>
.faq-accordion :deep([data-slot="accordion-item"]),
.faq-accordion :deep([data-slot="accordion-trigger"]) {
  max-width: none;
  margin: 0;
}

.faq-accordion :deep([data-slot="accordion-trigger"] svg) {
  color: white;
}
</style>
