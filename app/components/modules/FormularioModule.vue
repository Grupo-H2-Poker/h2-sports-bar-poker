<template>
  <section
    class="bg-[#2f185a]"
    :class="flushFooter && '-mb-16'"
    :style="panelStyle"
  >
    <div class="container mx-auto px-4 py-16 md:py-20 lg:py-24">
      <div class="grid gap-12 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
        <div class="text-[#e7e7e7]">
          <h2
            v-if="config?.titulo"
            class="whitespace-pre-line text-[32px] font-bold leading-[40px]"
          >
            {{ config.titulo }}
          </h2>
          <p
            v-if="config?.descricao"
            class="mt-4 text-lg font-medium leading-7"
          >
            {{ config.descricao }}
          </p>
        </div>

        <form
          class="flex flex-col gap-3"
          @submit.prevent="onSubmit"
        >
          <div
            v-for="campo in campos"
            :key="campo.id"
            class="relative"
          >
            <label class="sr-only">{{ campo.data.label }}</label>
            <div
              v-if="campo.data.type === 'select'"
              class="relative"
            >
              <select
                v-model="form[campo.data.name]"
                :class="[
                  fieldClass,
                  'appearance-none pr-10',
                  !form[campo.data.name] && 'italic text-[#e7e7e7]/80',
                ]"
                :required="campo.data.required !== false"
              >
                <option
                  value=""
                  disabled
                >
                  {{ campo.data.placeholder || campo.data.label }}
                </option>
                <option
                  v-for="opt in campo.data.options || []"
                  :key="opt"
                  :value="opt"
                  class="bg-[#2f185a] text-[#e7e7e7] not-italic"
                >
                  {{ opt }}
                </option>
              </select>
              <svg
                class="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-[#e7e7e7]"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              v-else
              v-model="form[campo.data.name]"
              :type="campo.data.type || 'text'"
              :placeholder="campo.data.placeholder || campo.data.label"
              :required="campo.data.required !== false"
              :class="[fieldClass, 'placeholder:italic placeholder:text-[#e7e7e7]/80']"
            >
          </div>

          <div class="mt-2 flex flex-wrap items-center justify-between gap-4">
            <p
              v-if="config?.nota"
              class="text-sm italic leading-7 text-[#e7e7e7]"
            >
              {{ config.nota }}
            </p>
            <Button
              type="submit"
              variant="brand"
              size="default"
              class="ml-auto rounded-full"
            >
              {{ config?.submit_label || 'Enviar' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button'
import {
  FORMULARIO_CAMPO_COMPONENT_TYPE,
  FORMULARIO_CONFIG_COMPONENT_TYPE,
  type FormularioConfigData,
} from '~/types/eventos-page'
import type { ModuloOf } from '~/types/modules'

const props = defineProps<{
  modulo: ModuloOf<'formulario'>
}>()

const sorted = useSortedComponents(() => props.modulo)

const config = computed<FormularioConfigData | undefined>(() => {
  const item = sorted.value.find(c => c.type === FORMULARIO_CONFIG_COMPONENT_TYPE)
  return item?.data as FormularioConfigData | undefined
})

const campos = computed(() =>
  sorted.value.filter(c => c.type === FORMULARIO_CAMPO_COMPONENT_TYPE),
)

const flushFooter = computed(() => props.modulo.metadados?.flush_footer === true)

const fieldClass = 'h-[47px] w-full rounded-lg border border-solid border-[#e7e7e7] bg-transparent px-4 text-sm leading-7 text-[#e7e7e7] outline-none focus-visible:border-white'

const form = reactive<Record<string, string>>({})

watch(
  campos,
  (list) => {
    for (const campo of list) {
      if (!(campo.data.name in form)) {
        form[campo.data.name] = ''
      }
    }
  },
  { immediate: true },
)

const panelStyle = computed(() => {
  const bg = props.modulo.metadados?.background
    ?? config.value?.background
    ?? '#2f185a'

  const style: Record<string, string> = { background: bg }

  if (!flushFooter.value && props.modulo.metadados?.border_radius) {
    style.borderRadius = props.modulo.metadados.border_radius
  }

  return style
})

function onSubmit() {
  // Mock — CMS ainda sem endpoint de envio
}
</script>
