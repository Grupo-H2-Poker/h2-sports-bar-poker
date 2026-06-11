<script setup lang="ts">
import Logo from '~/components/layout/Logo.vue'
import jogoResponsavel from '~/assets/img/jogo_responsavel.png'
import type { FooterData, FooterLinkItem } from '~/types/footer'

const route = useRoute()
const { getSlugFromName, selectedUnityName, defaultUnityName } = useUnidades()
const api = useH2Api()

const routeUnidadeSlug = computed(() => {
  const p = route.params.unidade
  return typeof p === 'string' ? p : ''
})

const effectiveUnidadeSlug = computed(() => {
  if (routeUnidadeSlug.value) return routeUnidadeSlug.value
  const unityName = selectedUnityName.value || defaultUnityName.value
  const fromSelection = unityName ? getSlugFromName(unityName) : null
  return fromSelection ?? ''
})

const { data: unidadeModulosData } = await useAsyncData(
  () => `footer-unidade-modulos-${effectiveUnidadeSlug.value}`,
  async () => {
    if (!effectiveUnidadeSlug.value) return null
    return await api.getUnidadeModulos(effectiveUnidadeSlug.value)
  },
  { server: true, watch: [effectiveUnidadeSlug] },
)

const footer = computed<FooterData | null>(() => unidadeModulosData.value?.footer ?? null)

function linkHref(item: FooterLinkItem) {
  if (!effectiveUnidadeSlug.value) return item.to ?? '/'
  return resolveMenuItemHref(effectiveUnidadeSlug.value, item)
}

function linkClass(item: FooterLinkItem) {
  if (item.estilo === 'destaque') {
    return 'text-lg font-bold text-card-preview-text hover:text-white transition-colors'
  }
  return 'text-sm font-medium text-card-preview-text/80 hover:text-white transition-colors'
}
</script>

<template>
  <footer
    v-if="footer"
    class="mt-16 bg-[#2f185a] text-card-preview-text font-[family-name:var(--font-red-hat-display)]"
  >
    <div
      class="h-1.5 w-full bg-linear-to-r from-brand-purple to-[#6433c0]"
      aria-hidden="true"
    />

    <div class="container py-12 lg:py-14">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] xl:gap-12">
        <!-- Coluna: marca -->
        <div class="flex flex-col gap-4 sm:col-span-2 xl:col-span-1">
          <Logo :as-link="false" />
          <p class="text-lg font-bold leading-[1.65]">
            {{ footer.hashtag }}
          </p>
          <div class="text-base leading-[1.875]">
            <p>{{ footer.copyright }}</p>
            <p>{{ footer.endereco }}</p>
          </div>
          <div v-if="footer.redes_sociais.length" class="flex gap-4 pt-1">
            <a
              v-for="rede in footer.redes_sociais"
              :key="rede.id"
              :href="rede.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="rede.label"
              class="text-card-preview-text hover:text-white transition-colors"
            >
              <svg
                v-if="rede.tipo === 'instagram'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <svg
                v-else-if="rede.tipo === 'youtube'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Colunas de links -->
        <div
          v-for="coluna in footer.colunas"
          :key="coluna.id"
          class="flex flex-col gap-6"
        >
          <div
            v-for="secao in coluna.secoes"
            :key="secao.id"
            class="flex flex-col gap-3"
          >
            <h4
              v-if="secao.titulo"
              class="mb-3 text-lg font-bold leading-none"
            >
              {{ secao.titulo }}
            </h4>
            
            <nav class="flex flex-col gap-5">
              <template v-for="item in secao.links" :key="item.id">
                <NuxtLink
                  v-if="item.to || item.pagina"
                  :to="linkHref(item)"
                  :external="item.external"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener noreferrer' : undefined"
                  :class="linkClass(item)"
                >
                  {{ item.label }}
                </NuxtLink>
                <span
                  v-else
                  :class="linkClass(item)"
                >
                  {{ item.label }}
                </span>
              </template>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Rodapé inferior -->
    <div class="container pb-5">
      <div class="border-t border-white/20 pt-5">
        <div class="flex items-center justify-center gap-2 text-sm font-medium text-card-preview-text">
          <img
            :src="jogoResponsavel"
            alt="Maiores de 18 anos"
            class="h-14 w-auto shrink-0"
          />
        </div>
      </div>
    </div>
  </footer>
</template>
