<template>
  <section class="font-[family-name:var(--font-red-hat-display)]">
    <div
      class="container mx-auto"
      :style="pagePaddingStyle"
    >
      <header
        v-if="ctaConfig?.titulo"
        class="mb-12 rounded-lg bg-[#373737] px-8 py-8 text-center sm:px-12 sm:py-10"
      >
        <h1 class="text-xl font-bold leading-tight tracking-tight text-card-preview-text sm:text-2xl">
          {{ ctaConfig.titulo }}
        </h1>
        <div
          v-if="descricoes.length"
          class="mx-auto mt-3 flex max-w-[710px] flex-col gap-3"
        >
          <p
            v-for="(texto, index) in descricoes"
            :key="index"
            class="text-base font-medium leading-7 text-card-preview-text"
          >
            {{ texto }}
          </p>
        </div>
      </header>

      <div
        v-if="secoes.length"
        class="flex w-full flex-col items-start gap-10 lg:flex-row lg:gap-16"
      >
        <nav
          class="w-full shrink-0 self-start lg:sticky lg:top-28 lg:w-52"
          aria-label="Seções do documento"
        >
          <div
            ref="trackRef"
            class="relative"
          >
            <div
              class="pointer-events-none absolute bottom-0 left-0 top-0 w-1 rounded-full bg-white/10"
              aria-hidden="true"
            />
            <span
              class="pointer-events-none absolute left-0 z-[1] w-1 rounded-full bg-brand-green shadow-[0_0_12px_rgba(36,207,164,0.45)] transition-[top,height] duration-300 ease-out"
              :style="activeBarStyle"
              aria-hidden="true"
            />
            <ul class="relative flex flex-col gap-0.5">
              <li
                v-for="(secao, index) in secoes"
                :key="secao.slug"
              >
                <Button
                  :ref="(el) => setButtonRef(el, index)"
                  type="button"
                  variant="ghost"
                  class="relative h-auto w-full items-start justify-start rounded-r-lg rounded-l-none py-3 pl-5 pr-3 text-base leading-7 whitespace-normal transition-colors hover:bg-white/4"
                  :class="secao.slug === activeSecao
                    ? 'text-card-preview-text font-bold'
                    : 'text-card-preview-text/55 font-medium hover:text-card-preview-text/85'"
                  @click="selectSecao(secao.slug)"
                >
                  <span class="block w-full text-left whitespace-pre-line">
                    {{ secao.titulo }}
                  </span>
                </Button>
              </li>
            </ul>
          </div>
        </nav>

        <div class="min-w-0 w-full flex-1">
          <Transition
            name="documento-fade"
            mode="out-in"
          >
            <div
              v-if="activeConteudo"
              :key="activeSecao"
              class="documento-conteudo w-full text-base font-medium leading-[26px] text-card-preview-text"
              v-html="activeConteudo"
            />
            <p
              v-else
              :key="`empty-${activeSecao}`"
              class="py-10 text-base text-card-preview-text/50"
            >
              {{ t('documento.emptySection') }}
            </p>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { Button } from '~/components/ui/button'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'documento_page'>
}>()

const { t } = useI18n()
const { ctaConfig, secoes } = useDocumentoPageModule(() => props.modulo)

const pagePaddingStyle = useModuloMarginLateral(() => props.modulo.metadados)

const descricoes = computed(() =>
  [
    ctaConfig.value?.descricao,
    ctaConfig.value?.descricao_2,
    ctaConfig.value?.descricao_3,
    ctaConfig.value?.descricao_4,
  ].filter((texto): texto is string => !!texto),
)

const activeSecao = ref('')

async function selectSecao(slug: string) {
  activeSecao.value = slug
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  secoes,
  (list) => {
    if (!list.length) {
      activeSecao.value = ''
      return
    }
    const first = list[0]
    if (first && !list.some(s => s.slug === activeSecao.value)) {
      activeSecao.value = first.slug
    }
  },
  { immediate: true },
)

const activeIndex = computed(() =>
  Math.max(0, secoes.value.findIndex(s => s.slug === activeSecao.value)),
)

const activeConteudo = computed(() =>
  getDocumentoConteudoBySecao(secoes.value, activeSecao.value),
)

const trackRef = ref<HTMLElement | null>(null)
const buttonEls = ref<(HTMLElement | null)[]>([])

function setButtonRef(
  el: Element | ComponentPublicInstance | null,
  index: number,
) {
  const node = el && '$el' in el
    ? (el.$el as HTMLElement | null)
    : (el as HTMLElement | null)
  buttonEls.value[index] = node
}

const activeBarStyle = ref({ top: '6px', height: '40px' })

function updateActiveBar() {
  const btn = buttonEls.value[activeIndex.value]
  if (!btn) {
    activeBarStyle.value = { top: '6px', height: '40px' }
    return
  }
  activeBarStyle.value = {
    top: `${btn.offsetTop}px`,
    height: `${btn.offsetHeight}px`,
  }
}

watch(
  [activeIndex, secoes],
  async () => {
    await nextTick()
    updateActiveBar()
  },
  { immediate: true },
)

onMounted(() => {
  updateActiveBar()
})

let resizeObserver: ResizeObserver | undefined

watch(trackRef, (el) => {
  resizeObserver?.disconnect()
  resizeObserver = undefined
  if (!el || typeof ResizeObserver === 'undefined') return
  resizeObserver = new ResizeObserver(() => updateActiveBar())
  resizeObserver.observe(el)
}, { immediate: true })

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.documento-conteudo :deep(p) {
  margin: 0;
}

.documento-conteudo :deep(p + p) {
  margin-top: 1.25rem;
}

.documento-conteudo :deep(ol),
.documento-conteudo :deep(ul) {
  margin: 0;
  padding-left: 1.5rem;
}

.documento-conteudo :deep(li + li) {
  margin-top: 1.25rem;
}

.documento-conteudo :deep(strong) {
  font-weight: 700;
}

.documento-fade-enter-active,
.documento-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.documento-fade-enter-from,
.documento-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
