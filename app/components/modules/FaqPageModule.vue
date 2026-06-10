<template>
  <section class="py-10">
    <div
      class="container mx-auto"
      :style="pagePaddingStyle"
    >
      <div
        v-if="ctaConfig?.titulo"
        class="bg-[#373737] rounded-lg py-12 px-8 text-center mb-10"
      >
        <h1 class="text-[#e7e7e7] text-3xl font-bold leading-tight">
          {{ ctaConfig.titulo }}
        </h1>
        <p
          v-if="ctaConfig.descricao"
          class="text-[#e7e7e7]/70 text-base mt-3 max-w-2xl mx-auto"
        >
          {{ ctaConfig.descricao }}
        </p>
      </div>

      <div
        v-if="categorias.length"
        class="flex flex-col lg:flex-row items-start gap-10 lg:gap-16"
      >
        <nav
          class="lg:w-48 shrink-0 self-start"
          aria-label="Categorias do FAQ"
        >
          <div class="relative">
            <div
              class="pointer-events-none absolute left-0 top-0 bottom-0 w-1.5 bg-[rgba(231,231,231,0.5)] rounded-[8px]"
              aria-hidden="true"
            />
            <ul class="relative flex flex-col gap-1">
              <li
                v-for="(categoria, index) in categorias"
                :key="categoria.slug"
              >
                <button
                  type="button"
                  class="relative w-full text-left py-3 pl-4 pr-2 text-base leading-7 transition-colors"
                  :class="categoria.slug === activeCategoria
                    ? 'text-[#e7e7e7] font-bold'
                    : 'text-[#e7e7e7] font-medium opacity-70 hover:opacity-100'"
                  @click="activeCategoria = categoria.slug"
                >
                  <span
                    v-if="categoria.slug === activeCategoria"
                    class="pointer-events-none absolute left-0 z-[1] w-1.5 h-10 bg-[#24cfa4] rounded-[8px]"
                    :class="activeBarPositionClass(index, categorias.length)"
                    aria-hidden="true"
                  />
                  {{ categoria.titulo }}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <div class="flex-1 min-w-0">
          <Accordion
            v-if="activeItems.length"
            type="single"
            collapsible
            class="faq-page-accordion w-full"
          >
            <AccordionItem
              v-for="(item, index) in activeItems"
              :key="`${activeCategoria}-${index}`"
              :value="`item-${activeCategoria}-${index}`"
              class="border-[rgba(231,231,231,0.30)]"
            >
              <AccordionTrigger
                class="text-left text-xl font-bold text-[#e7e7e7] hover:no-underline py-5 gap-4"
              >
                {{ item.pergunta }}
              </AccordionTrigger>
              <AccordionContent class="text-base font-normal text-[#E7E7E7] pb-5 leading-[26px]">
                {{ item.resposta }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p
            v-else
            class="text-[#e7e7e7]/60 text-base py-8"
          >
            Nenhuma pergunta nesta categoria.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'faq_page'>
}>()

const { ctaConfig, categorias } = useFaqPageModule(() => props.modulo)

const pagePaddingStyle = useModuloMarginLateral(() => props.modulo.metadados)

function activeBarPositionClass(index: number, total: number) {
  if (index === 0) return 'top-0'
  if (index === total - 1) return 'bottom-0'
  return 'top-1/2 -translate-y-1/2'
}

const activeCategoria = ref('')

watch(
  categorias,
  (list) => {
    if (!list.length) {
      activeCategoria.value = ''
      return
    }
    const first = list[0]
    if (first && !list.some(c => c.slug === activeCategoria.value)) {
      activeCategoria.value = first.slug
    }
  },
  { immediate: true },
)

const activeItems = computed(() =>
  getFaqItemsByCategoria(categorias.value, activeCategoria.value),
)
</script>

<style scoped>
.faq-page-accordion :deep([data-slot="accordion-item"]),
.faq-page-accordion :deep([data-slot="accordion-trigger"]) {
  max-width: none;
  margin: 0;
}

.faq-page-accordion :deep([data-slot="accordion-trigger"] svg) {
  color: #e7e7e7;
}
</style>
