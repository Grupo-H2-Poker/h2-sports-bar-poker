<template>
  <div class="min-h-[60vh]">
    <main class="container mx-auto px-4 py-8 md:py-12">
      <div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight md:text-3xl">{{ t('perfil.title') }}</h1>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ t('perfil.subtitle') }}
          </p>
        </div>
        <Button
          v-if="user && !pending && activeTab === 'dados'"
          size="sm"
          variant="outline"
          :disabled="refreshState === 'loading'"
          :aria-busy="refreshState === 'loading'"
          :class="[
            'disabled:opacity-100 transition-[box-shadow] duration-300 ease-out',
            refreshState === 'success'
              ? 'bg-transparent smooth-border [--smooth-border-color:var(--brand-green)] hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent'
              : '',
          ]"
          @click="refresh"
        >
          <span class="relative size-4 shrink-0">
            <RefreshCw
              class="absolute inset-0 size-4 transition-opacity duration-300 ease-out"
              :class="[
                refreshState === 'loading' ? 'animate-spin' : '',
                refreshState === 'success' ? 'opacity-0' : 'opacity-100',
              ]"
            />
            <Check
              class="absolute inset-0 size-4 transition-opacity duration-300 ease-out"
              :class="refreshState === 'success' ? 'opacity-100 text-brand-green' : 'opacity-0'"
            />
          </span>
          <span>{{ t('perfil.refresh') }}</span>
        </Button>
      </div>

      <div v-if="pending" class="flex min-h-[40vh] items-center justify-center">
        <div class="text-center">
          <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-white" />
          <p class="text-muted-foreground">{{ t('perfil.loading') }}</p>
        </div>
      </div>

      <div v-else-if="errorMessage" class="mx-auto max-w-lg">
        <div class="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
          <h2 class="mb-2 text-2xl font-bold text-red-800 dark:text-red-200">
            {{ t('perfil.loadErrorTitle') }}
          </h2>
          <p class="mb-4 text-red-600 dark:text-red-300">{{ errorMessage }}</p>
          <Button variant="destructive" @click="refresh">
            {{ t('perfil.retry') }}
          </Button>
        </div>
      </div>

      <div v-else-if="user" class="w-full space-y-6">
        <Card class="border-border/60 bg-card/80 overflow-hidden shadow-sm">
          <CardHeader class="border-b border-border/50 pb-6">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar class="h-16 w-16 shrink-0">
                <AvatarImage :src="user.avatar || ''" :alt="user.nome" />
                <AvatarFallback class="bg-brand-purple text-lg text-white">
                  {{ initials }}
                </AvatarFallback>
              </Avatar>
              <div class="min-w-0 space-y-2">
                <CardTitle class="truncate text-xl">{{ user.nome }}</CardTitle>
                <CardDescription class="truncate">{{ user.email }}</CardDescription>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground"
                  >
                    <span
                      class="size-1.5 rounded-full"
                      :class="user.status === 1 ? 'bg-emerald-500' : 'bg-red-500'"
                    />
                    {{ user.status === 1 ? t('auth.activeClient') : t('auth.inactiveClient') }}
                  </span>
                  <span
                    v-if="user.pontua_h2rewards === 1"
                    class="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground"
                  >
                    <span class="size-1.5 rounded-full bg-sky-500" />
                    H2 Rewards
                  </span>
                  <span
                    v-if="favoritos.length"
                    class="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground"
                  >
                    <Star class="size-3 text-brand-green" fill="currentColor" :stroke-width="0" />
                    {{ favoritesCountLabel }}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div
          class="flex w-full max-w-full flex-wrap items-center gap-2 font-[family-name:var(--font-red-hat-display)]"
          role="tablist"
          :aria-label="t('perfil.sectionsAria')"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            role="tab"
            class="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm leading-none transition-all duration-200 ease-out"
            :class="activeTab === tab.id
              ? 'bg-brand-green font-bold text-black shadow-[0_3px_10px_rgba(36,207,164,0.28)]'
              : 'bg-[#373737] font-medium text-[#e7e7e7] hover:bg-[#454545] hover:text-white'"
            :aria-selected="activeTab === tab.id"
            @click="activeTab = tab.id"
          >
            <component :is="tab.icon" class="size-4 shrink-0" :stroke-width="2" />
            {{ tab.label }}
            <span
              v-if="tab.id === 'favoritos' && favoritos.length"
              class="inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold"
              :class="activeTab === 'favoritos' ? 'bg-black/15 text-black' : 'bg-white/10 text-[#e7e7e7]'"
            >
              {{ favoritos.length }}
            </span>
          </button>
        </div>

        <div v-show="activeTab === 'dados'">
          <Card class="border-border/60 bg-card/80 overflow-hidden shadow-sm">
            <CardContent class="pt-6">
              <section class="space-y-5">
                <h2 class="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  {{ t('perfil.sections.personal') }}
                </h2>
                <dl class="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-x-6 gap-y-4">
                  <div v-for="field in personalFields" :key="field.label" class="min-w-0 space-y-1">
                    <dt class="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                      {{ field.label }}
                    </dt>
                    <dd class="text-sm break-words text-[#e7e7e7]">{{ field.value }}</dd>
                  </div>
                </dl>
              </section>

              <Separator class="my-6" />

              <section class="space-y-5">
                <h2 class="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  {{ t('perfil.sections.contact') }}
                </h2>
                <dl class="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-x-6 gap-y-4">
                  <div v-for="field in contactFields" :key="field.label" class="min-w-0 space-y-1">
                    <dt class="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                      {{ field.label }}
                    </dt>
                    <dd class="text-sm break-words text-[#e7e7e7]">{{ field.value }}</dd>
                  </div>
                </dl>
              </section>

              <Separator class="my-6" />

              <section class="space-y-5">
                <h2 class="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  {{ t('perfil.sections.payments') }}
                </h2>
                <dl class="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-x-6 gap-y-4">
                  <div v-for="field in paymentFields" :key="field.label" class="min-w-0 space-y-1">
                    <dt class="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                      {{ field.label }}
                    </dt>
                    <dd class="text-sm break-words text-[#e7e7e7]">{{ field.value }}</dd>
                  </div>
                </dl>
              </section>

              <Separator class="my-6" />

              <section class="space-y-5">
                <h2 class="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                  {{ t('perfil.sections.notifications') }}
                </h2>
                <div class="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-3">
                  <label
                    v-for="field in notificationFields"
                    :key="field.key"
                    class="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-3 py-2.5"
                  >
                    <span class="text-sm">{{ field.label }}</span>
                    <Switch
                      :model-value="field.enabled"
                      disabled
                      :aria-label="field.label"
                      class="disabled:opacity-90 data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-400 dark:data-[state=checked]:bg-zinc-200 dark:data-[state=unchecked]:bg-zinc-400"
                    />
                  </label>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>

        <div v-show="activeTab === 'favoritos'">
          <PerfilFavoritosTab />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Check, RefreshCw, Star, UserRound } from 'lucide-vue-next'
import PerfilFavoritosTab from '~/components/perfil/PerfilFavoritosTab.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

definePageMeta({
  middleware: 'auth',
})

const { t, locale } = useI18n()

useHead({
  title: () => t('perfil.title'),
})

type PerfilTabId = 'dados' | 'favoritos'

const { user, token, isAuthenticated, fetchError, fetchUserData, initAuth } = useAuth()
const { favoritos } = useFavoritosTorneios()

const route = useRoute()
const activeTab = ref<PerfilTabId>(
  route.query.tab === 'favoritos' ? 'favoritos' : 'dados',
)

const tabs = computed(() => [
  { id: 'dados' as const, label: t('perfil.tabs.dados'), icon: UserRound },
  { id: 'favoritos' as const, label: t('perfil.tabs.favoritos'), icon: Star },
])

const favoritesCountLabel = computed(() =>
  t('perfil.favoritesCount', { n: favoritos.value.length }, favoritos.value.length),
)

watch(activeTab, (tab) => {
  const query = tab === 'favoritos' ? { tab: 'favoritos' } : {}
  navigateTo({ path: '/perfil', query }, { replace: true })
})

const pending = ref(true)
const localError = ref<string | null>(null)
const refreshState = ref<'idle' | 'loading' | 'success'>('idle')
let successResetTimer: ReturnType<typeof setTimeout> | null = null

const errorMessage = computed(() => localError.value || fetchError.value)

const initials = computed(() => {
  const name = user.value?.nome || 'U'
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const dateLocale = computed(() => {
  const map: Record<string, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
    zh: 'zh-CN',
    ja: 'ja-JP',
  }
  return map[String(locale.value)] ?? 'pt-BR'
})

function displayValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

function yesNo(value: number | null | undefined): string {
  return value === 1 ? t('common.yes') : t('common.no')
}

function formatDate(value?: string | null): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(dateLocale.value).format(date)
}

const personalFields = computed(() => {
  const u = user.value
  if (!u) return []
  return [
    { label: t('perfil.fields.fullName'), value: displayValue(u.nome) },
    { label: t('perfil.fields.nickname'), value: displayValue(u.apelido) },
    { label: t('perfil.fields.email'), value: displayValue(u.email) },
    { label: t('perfil.fields.cpf'), value: displayValue(u.cpf) },
    { label: t('perfil.fields.gender'), value: displayValue(u.genero) },
    { label: t('perfil.fields.birthDate'), value: formatDate(u.data_nascimento) },
    { label: t('perfil.fields.status'), value: u.status === 1 ? t('perfil.status.active') : t('perfil.status.inactive') },
    { label: t('perfil.fields.h2Rewards'), value: yesNo(u.pontua_h2rewards) },
  ]
})

const contactFields = computed(() => {
  const u = user.value
  if (!u) return []
  return [
    { label: t('perfil.fields.phone'), value: displayValue(u.telefone) },
    { label: t('perfil.fields.cep'), value: displayValue(u.cep) },
    { label: t('perfil.fields.number'), value: displayValue(u.numero) },
    { label: t('perfil.fields.complement'), value: displayValue(u.complemento) },
  ]
})

const paymentFields = computed(() => {
  const u = user.value
  if (!u) return []
  return [
    { label: t('perfil.fields.pixKey'), value: displayValue(u.chave_pix) },
    { label: t('perfil.fields.pixValidated'), value: yesNo(u.chave_pix_validada) },
    { label: t('perfil.fields.bank'), value: displayValue(u.banco) },
  ]
})

const notificationFields = computed(() => {
  const u = user.value
  if (!u) return []
  return [
    { key: 'notifica_pontuacao', label: t('perfil.notifications.score'), enabled: u.notifica_pontuacao === 1 },
    { key: 'notifica_resgate', label: t('perfil.notifications.redeem'), enabled: u.notifica_resgate === 1 },
    { key: 'notifica_promocao', label: t('perfil.notifications.promo'), enabled: u.notifica_promocao === 1 },
    { key: 'notifica_categoria', label: t('perfil.notifications.category'), enabled: u.notifica_categoria === 1 },
  ]
})

async function loadProfile(options: { silent?: boolean } = {}) {
  const silent = options.silent === true
  if (!silent) pending.value = true
  localError.value = null

  try {
    if (!token.value && import.meta.client) {
      await initAuth()
    } else {
      await fetchUserData()
    }

    if (!user.value) {
      localError.value = fetchError.value || t('perfil.loadError')
      return false
    }
    return true
  } catch (error: any) {
    localError.value = error?.message || t('perfil.unexpectedError')
    return false
  } finally {
    if (!silent) pending.value = false
  }
}

async function refresh() {
  if (refreshState.value === 'loading') return

  if (successResetTimer) {
    clearTimeout(successResetTimer)
    successResetTimer = null
  }

  refreshState.value = 'loading'
  const ok = await loadProfile({ silent: true })

  if (ok) {
    refreshState.value = 'success'
    successResetTimer = setTimeout(() => {
      refreshState.value = 'idle'
      successResetTimer = null
    }, 1400)
  } else {
    refreshState.value = 'idle'
  }
}

onMounted(() => {
  loadProfile()
})

onBeforeUnmount(() => {
  if (successResetTimer) clearTimeout(successResetTimer)
})

watch([isAuthenticated, pending], ([authenticated, isPending]) => {
  if (!isPending && !authenticated && !token.value) {
    navigateTo('/')
  }
})
</script>
