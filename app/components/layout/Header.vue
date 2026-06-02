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

const route = useRoute()
const router = useRouter()
const { language, setLanguage } = useLanguage()

const { isAuthenticated } = useAuth()
const { unidades, defaultUnityName, selectedUnityName, getSlugFromName, getNameFromSlug, fetchUnidades } = useUnidades()

onMounted(async () => {
    await fetchUnidades()
    document.addEventListener('click', handleClickOutside)
})

const menuItems = [
    { label: 'H2Bet', to: 'https://www.h2.bet.br/' },
    { label: 'Agenda', to: '/agenda' },
    { label: 'Series', to: '/series' },
    { label: 'H2unique', to: '/unique' },
    { label: 'Eventos', to: '/eventos' },
    { label: 'Unidades', to: '/unidades' },
    { label: 'H2news', to: '/blognews' },
]

const itemsUnity = unidades
const isUnityDropdownOpen = ref(false)
const isMobileDrawerOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

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

const toggleDropdown = (event: Event) => {
    event.stopPropagation()
    isUnityDropdownOpen.value = !isUnityDropdownOpen.value
}

const selectUnity = (unity: string) => {
    selectedUnityName.value = unity
    isUnityDropdownOpen.value = false
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

const handleClickOutside = (event: Event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isUnityDropdownOpen.value = false
    }
}

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <header class="sticky top-0 z-9997 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex items-center h-[94px] border-b-0">
        <div class="container flex h-full items-center">
            <div class="mr-4 flex">
                <Logo class="h-6 w-auto" />
            </div>

            <NavigationMenu class="hidden md:flex">
                <NavigationMenuList>
                    <NavigationMenuItem v-for="item in menuItems" :key="item.to">
                        <NavigationMenuLink as-child>
                            <NuxtLink :to="item.to" :class="[
                                'group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                                route.path === item.to ? 'bg-accent text-accent-foreground' : ''
                            ]">
                                {{ item.label }}
                            </NuxtLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <!-- Desktop Actions -->
            <div class="hidden md:flex flex-1 items-center justify-end space-x-2">
                <div class="relative" ref="dropdownRef">
                    <Button variant="ghost" class="h-9 px-3 text-sm font-medium" @click="toggleDropdown">
                        {{ selectedUnityName }}
                        <ChevronDown class="ml-2 h-4 w-4 transition-transform duration-200"
                            :class="{ 'rotate-180': isUnityDropdownOpen }" />
                    </Button>

                    <Transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <div v-if="isUnityDropdownOpen"
                            class="absolute right-0 top-full mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-lg z-50">
                            <div v-for="unity in itemsUnity" :key="unity"
                                class="mb-1 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                :class="{ 'bg-accent text-accent-foreground': unity === selectedUnityName }"
                                @click="selectUnity(unity)">
                                {{ unity }}
                            </div>
                        </div>
                    </Transition>
                </div>

                <Login v-if="!isAuthenticated" />
                <UserAvatar v-else />
                <LoginModal />

                <!-- Language Switcher -->
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost" class="h-9 px-3 text-sm font-medium ml-4">
                            {{ language.toUpperCase() }}
                            <ChevronDown class="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-28">
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
                        <Button variant="ghost" class="h-9 px-3 text-sm font-medium">
                            {{ language.toUpperCase() }}
                            <ChevronDown class="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-28">
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
                                <NuxtLink v-for="item in menuItems" :key="item.to" :to="item.to"
                                    class="block rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    :class="route.path === item.to ? 'bg-accent text-accent-foreground' : ''"
                                    @click="closeMobileDrawer">
                                    {{ item.label }}
                                </NuxtLink>
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
