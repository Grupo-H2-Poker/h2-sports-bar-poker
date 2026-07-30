<template>
  <section class="font-[family-name:var(--font-red-hat-display)]">
    <div
      class="container mx-auto"
      :style="pagePaddingStyle"
    >
      <header
        v-if="ctaConfig?.titulo"
        class="mb-12 rounded-2xl border border-white/5 bg-[#373737] px-8 py-10 text-center sm:px-12 sm:py-12"
      >
        <h1 class="text-xl font-bold leading-tight tracking-tight text-card-preview-text sm:text-2xl">
          {{ ctaConfig.titulo }}
        </h1>
        <p
          v-if="ctaConfig.descricao"
          class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-card-preview-text/65"
        >
          {{ ctaConfig.descricao }}
        </p>
      </header>

      <div
        v-if="categorias.length"
        class="flex flex-col items-start gap-10 lg:flex-row lg:gap-16"
      >
        <nav
          class="w-full shrink-0 self-start lg:sticky lg:top-28 lg:w-52"
          aria-label="Categorias do FAQ"
        >
          <div class="relative">
            <div
              class="pointer-events-none absolute bottom-0 left-0 top-0 w-1 rounded-full bg-white/10"
              aria-hidden="true"
            />
            <span
              class="pointer-events-none absolute left-0 z-[1] h-10 w-1 rounded-full bg-brand-green shadow-[0_0_12px_rgba(36,207,164,0.45)] transition-[top] duration-300 ease-out"
              :style="activeBarStyle"
              aria-hidden="true"
            />
            <ul class="relative flex flex-col gap-0.5">
              <li
                v-for="categoria in categorias"
                :key="categoria.slug"
              >
                <Button
                  type="button"
                  variant="ghost"
                  class="relative h-auto w-full justify-start rounded-r-lg rounded-l-none py-3 pl-5 pr-3 text-left text-base leading-7 transition-colors hover:bg-white/4"
                  :class="categoria.slug === activeCategoria
                    ? 'text-card-preview-text font-bold'
                    : 'text-card-preview-text/55 font-medium hover:text-card-preview-text/85'"
                  @click="activeCategoria = categoria.slug"
                >
                  {{ categoria.titulo }}
                </Button>
              </li>
            </ul>
          </div>
        </nav>

        <div class="min-w-0 flex-1">
          <Transition
            name="faq-fade"
            mode="out-in"
          >
            <Accordion
              v-if="activeItems.length"
              :key="activeCategoria"
              type="single"
              collapsible
              class="faq-page-accordion w-full"
            >
              <AccordionItem
                v-for="(item, index) in activeItems"
                :key="`${activeCategoria}-${index}`"
                :value="`item-${activeCategoria}-${index}`"
                class="border-white/10"
              >
                <AccordionTrigger
                  class="gap-4 py-5 text-left text-base font-semibold text-card-preview-text hover:no-underline [&[data-state=open]]:text-white"
                >
                  {{ item.pergunta }}
                </AccordionTrigger>
                <AccordionContent class="pb-6 text-sm font-normal leading-relaxed text-card-preview-text/70">
                  {{ item.resposta }}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p
              v-else
              :key="`empty-${activeCategoria}`"
              class="py-10 text-base text-card-preview-text/50"
            >
              Nenhuma pergunta nesta categoria.
            </p>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { Button } from '~/components/ui/button'
import type { ModuloOf } from '~/types/modules'

const CATEGORY_ITEM_HEIGHT_PX = 52

const props = defineProps<{
  modulo: ModuloOf<'faq_page'>
}>()

const { ctaConfig, categorias } = useFaqPageModule(() => props.modulo)

const pagePaddingStyle = useModuloMarginLateral(() => props.modulo.metadados)

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

const activeIndex = computed(() =>
  Math.max(0, categorias.value.findIndex(c => c.slug === activeCategoria.value)),
)

const activeBarStyle = computed(() => ({
  top: `${activeIndex.value * CATEGORY_ITEM_HEIGHT_PX + 6}px`,
}))

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
  opacity: 0.7;
  transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
}

.faq-page-accordion :deep([data-slot="accordion-trigger"][data-state="open"] svg) {
  color: var(--brand-green);
  opacity: 1;
}

.faq-fade-enter-active,
.faq-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.faq-fade-enter-from,
.faq-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
