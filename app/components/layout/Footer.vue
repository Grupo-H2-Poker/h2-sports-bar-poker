<script setup lang="ts">
import jogoResponsavel from '~/assets/img/jogo_responsavel.png'
import h2Mark from '~/assets/img/footer/h2-mark.png'
import iconInstagram from '~/assets/img/footer/instagram.svg'
import iconYoutube from '~/assets/img/footer/youtube.svg'
import type { FooterData, FooterLinkItem, FooterSocialTipo } from '~/types/footer'

const SOCIAL_ICONS: Record<FooterSocialTipo, string> = {
  instagram: iconInstagram,
  youtube: iconYoutube,
}

/** Tamanhos ópticos: YouTube é mais largo, então usa altura menor para equilibrar o peso visual. */
const SOCIAL_ICON_SIZE: Record<FooterSocialTipo, { class: string; width: number; height: number }> = {
  instagram: { class: 'size-[22px]', width: 22, height: 22 },
  youtube: { class: 'h-[18px] w-auto', width: 25, height: 18 },
}

const route = useRoute()
const { t, locale } = useI18n()
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
    return await api.getUnidadeModulos(effectiveUnidadeSlug.value, String(locale.value))
  },
  { server: true, watch: [effectiveUnidadeSlug, locale] },
)

const footer = computed<FooterData | null>(() => unidadeModulosData.value?.footer ?? null)

function linkHref(item: FooterLinkItem) {
  if (!effectiveUnidadeSlug.value) return item.to ?? '/'
  return resolveMenuItemHref(effectiveUnidadeSlug.value, item)
}

function linkClass(item: FooterLinkItem) {
  if (item.estilo === 'destaque') {
    return 'text-lg font-bold leading-snug text-card-preview-text hover:text-white transition-colors'
  }
  return 'text-sm font-medium leading-snug text-[#c4c4c4] hover:text-white transition-colors'
}
</script>

<template>
  <footer
    v-if="footer"
    class="mt-16 bg-[#2f185a] text-card-preview-text font-[family-name:var(--font-red-hat-display)]"
  >
    <div
      class="h-2 w-full bg-linear-to-r from-brand-purple to-[#2f185a]"
      aria-hidden="true"
    />

    <div class="container pt-12 pb-10 lg:pt-14 lg:pb-12">
      <div
        class="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] xl:gap-x-12 xl:gap-y-10"
      >
        <!-- Coluna: marca -->
        <div class="flex flex-col gap-4 sm:col-span-2 xl:col-span-1 xl:max-w-[17rem]">
          <img
            :src="h2Mark"
            alt="H2"
            class="h-9 w-auto object-contain object-left"
            width="55"
            height="36"
          >
          <p class="text-lg font-bold leading-snug">
            {{ footer.hashtag }}
          </p>
          <div class="text-base font-normal leading-[1.875]">
            <p>{{ footer.copyright }}</p>
            <p>{{ footer.endereco }}</p>
          </div>
          <div v-if="footer.redes_sociais.length" class="flex items-center gap-3.5 pt-2">
            <a
              v-for="rede in footer.redes_sociais"
              :key="rede.id"
              :href="rede.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="rede.label"
              class="inline-flex h-6 items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
            >
              <img
                :src="SOCIAL_ICONS[rede.tipo]"
                :alt="''"
                :class="['object-contain', SOCIAL_ICON_SIZE[rede.tipo].class]"
                :width="SOCIAL_ICON_SIZE[rede.tipo].width"
                :height="SOCIAL_ICON_SIZE[rede.tipo].height"
                aria-hidden="true"
              >
            </a>
          </div>
        </div>

        <!-- Colunas de links -->
        <div
          v-for="coluna in footer.colunas"
          :key="coluna.id"
          class="flex flex-col gap-8"
        >
          <div
            v-for="secao in coluna.secoes"
            :key="secao.id"
            class="flex flex-col gap-3"
          >
            <h4
              v-if="secao.titulo"
              class="text-lg font-bold leading-snug"
            >
              {{ secao.titulo }}
            </h4>

            <nav class="flex flex-col gap-3">
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
      <div class="border-t border-[#e7e7e7]/30 pt-3">
        <div class="flex items-center justify-center">
          <img
            :src="jogoResponsavel"
            :alt="t('footer.responsibleGamingAlt')"
            class="h-10 w-auto max-w-full object-contain object-center mix-blend-screen sm:h-12"
            width="331"
            height="57"
          >
        </div>
      </div>
    </div>
  </footer>
</template>
