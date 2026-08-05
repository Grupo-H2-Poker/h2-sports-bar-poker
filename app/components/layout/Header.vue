<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '~/components/ui/navigation-menu'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '~/components/ui/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { ChevronDown, Menu } from 'lucide-vue-next'
import { useLanguage } from '~/composables/useLanguage'
import Logo from '~/components/layout/Logo.vue'
import Login from '~/components/auth/Login.vue'
import LoginModal from '~/components/auth/LoginModal.vue'
import UserAvatar from '~/components/auth/UserAvatar.vue'
import type { HeaderMenuItem } from '~/types/modules'

const route = useRoute()
const router = useRouter()
const { language, setLanguage } = useLanguage()

const { isAuthenticated } = useAuth()
const { unidades, defaultUnityName, selectedUnityName, getSlugFromName, getNameFromSlug, fetchUnidades } = useUnidades()
const api = useH2Api()

onMounted(async () => {
    await fetchUnidades()
})

const routeUnidadeSlug = computed(() => {
    const p = route.params.unidade
    return typeof p === 'string' ? p : ''
})

const effectiveUnidadeSlug = computed(() => {
    if (routeUnidadeSlug.value) return routeUnidadeSlug.value
    const fromSelection = getSlugFromName(selectedUnityName.value)
    return fromSelection ?? ''
})

const { data: unidadeModulosData } = await useAsyncData(
    () => `header-unidade-modulos-${effectiveUnidadeSlug.value}`,
    async () => {
        if (!effectiveUnidadeSlug.value) return null
        return await api.getUnidadeModulos(effectiveUnidadeSlug.value)
    },
    { server: true, watch: [effectiveUnidadeSlug] },
)

function menuHref(item: { pagina?: string; to?: string; external?: boolean }) {
    if (!effectiveUnidadeSlug.value) return item.to ?? '/'
    return resolveMenuItemHref(effectiveUnidadeSlug.value, item)
}

function menuIsActive(item: { pagina?: string; to?: string }) {
    if (!effectiveUnidadeSlug.value) return route.path === item.to
    return isMenuItemActive(route.path, effectiveUnidadeSlug.value, item)
}

const menuItems = computed<HeaderMenuItem[]>(() => {
    return unidadeModulosData.value?.menu ?? []
})

const itemsUnity = unidades
const isMobileDrawerOpen = ref(false)

watch(defaultUnityName, (newDefault) => {
    if (newDefault && !selectedUnityName.value) {
        selectedUnityName.value = newDefault
    }
}, { immediate: true })

watch(() => route.params.unidade, (newUnidade) => {
    if (newUnidade && typeof newUnidade === 'string') {
        const unityName = getNameFromSlug(newUnidade)
        if (unityName) {
            selectedUnityName.value = unityName
        }
    }
}, { immediate: true })

const selectUnity = (unity: string) => {
    selectedUnityName.value = unity
    const slug = getSlugFromName(unity)
    if (slug) {
        router.push(`/${slug}`)
    }
}

const closeMobileDrawer = () => {
    isMobileDrawerOpen.value = false
}

const openLoginAndCloseDrawer = () => {
    const { open } = useLoginModal()
    closeMobileDrawer()
    setTimeout(() => {
        open()
    }, 200)
}
</script>

<template>
    <header class="sticky top-0 z-9997 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex items-center h-[94px] border-b-0">
        <div class="container flex h-full items-center">
            <div class="mr-4 flex">
                <Logo class="h-6 w-auto" />
            </div>

            <NavigationMenu class="hidden md:flex">
                <NavigationMenuList>
                    <NavigationMenuItem v-for="item in menuItems" :key="item.id">
                        <template v-if="item.kind === 'link'">
                            <NavigationMenuLink as-child>
                                <NuxtLink
                                    :to="menuHref(item)"
                                    :external="item.external"
                                    :target="item.external ? '_blank' : undefined"
                                    :rel="item.external ? 'noopener noreferrer' : undefined"
                                    :class="[
                                        'nav-menu-link group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus:outline-none data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent disabled:pointer-events-none disabled:opacity-50',
                                        menuIsActive(item) ? 'is-active text-foreground' : ''
                                    ]"
                                >
                                    <span class="nav-menu-link-label">{{ item.label }}</span>
                                </NuxtLink>
                            </NavigationMenuLink>
                        </template>

                        <template v-else>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button
                                        variant="plain"
                                        class="nav-menu-link group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent data-[state=open]:bg-transparent"
                                    >
                                        <span class="nav-menu-link-label">
                                            {{ item.label }}
                                            <ChevronDown class="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="start" class="w-56">
                                    <DropdownMenuItem
                                        v-for="sub in item.items"
                                        :key="sub.id"
                                        class="cursor-pointer"
                                        @click="router.push(menuHref(sub))"
                                    >
                                        {{ sub.label }}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </template>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <!-- Desktop Actions -->
            <div class="hidden md:flex flex-1 items-center justify-end space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="plain" class="nav-menu-link group inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent data-[state=open]:bg-transparent">
                            <span class="nav-menu-link-label">
                                {{ selectedUnityName }}
                                <ChevronDown class="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" class="w-56">
                        <DropdownMenuItem
                            v-for="unity in itemsUnity"
                            :key="unity"
                            class="cursor-pointer"
                            :class="{ 'bg-accent text-accent-foreground': unity === selectedUnityName }"
                            @click="selectUnity(unity)"
                        >
                            {{ unity }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Login v-if="!isAuthenticated" />
                <UserAvatar v-else />
                <LoginModal />

                <!-- Language Switcher -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="plain" class="nav-menu-link group inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium ml-4 transition-colors hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent data-[state=open]:bg-transparent">
                            <span class="nav-menu-link-label">
                                {{ language.toUpperCase() }}
                                <ChevronDown class="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" class="w-28">
                        <DropdownMenuItem
                            class="cursor-pointer"
                            :class="{ 'bg-accent text-accent-foreground': language === 'pt' }"
                            @click="setLanguage('pt')"
                        >
                            PT
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            class="cursor-pointer"
                            :class="{ 'bg-accent text-accent-foreground': language === 'en' }"
                            @click="setLanguage('en')"
                        >
                            EN
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <!-- Mobile Actions -->
            <div class="flex md:hidden flex-1 items-center justify-end space-x-2">
                <!-- Language Switcher Mobile -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="plain" class="nav-menu-link group inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent data-[state=open]:bg-transparent">
                            <span class="nav-menu-link-label">
                                {{ language.toUpperCase() }}
                                <ChevronDown class="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" class="w-28">
                        <DropdownMenuItem
                            class="cursor-pointer"
                            :class="{ 'bg-accent text-accent-foreground': language === 'pt' }"
                            @click="setLanguage('pt')"
                        >
                            PT
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            class="cursor-pointer"
                            :class="{ 'bg-accent text-accent-foreground': language === 'en' }"
                            @click="setLanguage('en')"
                        >
                            EN
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Drawer v-model:open="isMobileDrawerOpen">
                    <DrawerTrigger as-child>
                        <Button variant="ghost" size="sm" class="h-9 w-9 px-0" aria-label="Abrir menu">
                            <Menu class="h-5 w-5" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader class="text-left">
                            <DrawerTitle>Menu</DrawerTitle>
                            <DrawerDescription>
                                Navegue pelas páginas e opções
                            </DrawerDescription>
                        </DrawerHeader>

                        <div class="p-4 space-y-6 overflow-y-auto">
                            <nav class="space-y-1">
                                <h3 class="text-sm font-medium text-muted-foreground mb-3">Páginas</h3>
                                <div v-for="item in menuItems" :key="item.id">
                                    <NuxtLink
                                        v-if="item.kind === 'link'"
                                        :to="menuHref(item)"
                                        :external="item.external"
                                        :target="item.external ? '_blank' : undefined"
                                        :rel="item.external ? 'noopener noreferrer' : undefined"
                                        class="nav-menu-link nav-menu-link-mobile block rounded-md px-3 py-3 text-sm font-medium transition-colors"
                                        :class="menuIsActive(item) ? 'is-active' : ''"
                                        @click="closeMobileDrawer"
                                    >
                                        <span class="nav-menu-link-label">{{ item.label }}</span>
                                    </NuxtLink>

                                    <div v-else class="space-y-1">
                                        <div class="px-3 pt-3 pb-2 text-sm font-medium text-muted-foreground">
                                            {{ item.label }}
                                        </div>
                                        <NuxtLink
                                            v-for="sub in item.items"
                                            :key="sub.id"
                                            :to="menuHref(sub)"
                                            class="nav-menu-link nav-menu-link-mobile block rounded-md px-6 py-3 text-sm font-medium transition-colors"
                                            :class="menuIsActive(sub) ? 'is-active' : ''"
                                            @click="closeMobileDrawer"
                                        >
                                            <span class="nav-menu-link-label">{{ sub.label }}</span>
                                        </NuxtLink>
                                    </div>
                                </div>
                            </nav>

                            <div class="border-t border-border pt-4">
                                <div class="space-y-3">
                                    <h3 class="text-sm font-medium text-muted-foreground">Unidades</h3>
                                    <div class="space-y-1">
                                        <div v-for="unity in itemsUnity" :key="unity"
                                            class="cursor-pointer rounded-md px-3 py-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                            :class="{ 'bg-accent text-accent-foreground': unity === selectedUnityName }"
                                            @click="selectUnity(unity); closeMobileDrawer()">
                                            {{ unity }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="border-t border-border pt-4">
                                <div v-if="!isAuthenticated">
                                    <Button @click="openLoginAndCloseDrawer" variant="default" size="sm" class="w-full">
                                        Login
                                    </Button>
                                </div>
                                <div v-else class="px-3 py-3">
                                    <UserAvatar />
                                </div>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    </header>
</template>
