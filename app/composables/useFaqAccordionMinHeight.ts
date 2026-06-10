import { useResizeObserver } from '@vueuse/core'

/**
 * Calcula min-height do accordion para o estado expandido (todos os triggers + maior resposta),
 * evitando que o container mude de altura ao abrir/fechar itens.
 */
export function useFaqAccordionMinHeight(
  accordionRef: Ref<HTMLElement | null | undefined>,
  itemCount: Ref<number>,
) {
  const minHeightPx = ref<number | null>(null)

  function measure() {
    const root = accordionRef.value
    if (!root || itemCount.value === 0) {
      minHeightPx.value = null
      return
    }

    const accordionItems = root.querySelectorAll('[data-slot="accordion-item"]')
    let triggersHeight = 0
    let maxContentHeight = 0

    accordionItems.forEach((item) => {
      const trigger = item.querySelector('[data-slot="accordion-trigger"]')
      const contentInner = item.querySelector('[data-slot="accordion-content"] > div')

      if (trigger instanceof HTMLElement) {
        triggersHeight += trigger.offsetHeight
      }
      if (contentInner instanceof HTMLElement) {
        maxContentHeight = Math.max(maxContentHeight, contentInner.scrollHeight)
      }
    })

    minHeightPx.value = triggersHeight + maxContentHeight
  }

  watch(itemCount, () => nextTick(measure))

  onMounted(() => nextTick(measure))

  useResizeObserver(accordionRef, () => measure())

  const style = computed(() =>
    minHeightPx.value != null ? { minHeight: `${minHeightPx.value}px` } : undefined,
  )

  return { style }
}
