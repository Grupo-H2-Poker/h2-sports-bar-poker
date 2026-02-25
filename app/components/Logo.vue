<script setup lang="ts">
import logoBranco from '~/assets/img/logo-branco.png'
import logoPreto from '~/assets/img/logo-preto.png'

interface Props {
  asLink?: boolean
}

withDefaults(defineProps<Props>(), {
  asLink: true
})

const colorMode = useColorMode()
const { getSlugFromName, selectedUnityName, defaultUnityName } = useUnidades()

const logoSrc = computed(() => colorMode.value === 'dark' ? logoBranco : logoPreto)

const logoLink = computed(() => {
  const unityName = selectedUnityName.value || defaultUnityName.value
  const slug = getSlugFromName(unityName)
  return slug ? `/${slug}` : '/'
})
</script>

<template>
  <ClientOnly>
    <NuxtLink v-if="asLink" :to="logoLink" class="flex items-center">
      <img :src="logoSrc" alt="H2 Club Logo" class="h-8 w-auto" />
    </NuxtLink>
    <img v-else :src="logoSrc" alt="H2 Club Logo" class="h-8 w-auto" />
    <template #fallback>
      <NuxtLink v-if="asLink" :to="logoLink" class="flex items-center">
        <img :src="logoPreto" alt="H2 Club Logo" class="h-8 w-auto" />
      </NuxtLink>
      <img v-else :src="logoPreto" alt="H2 Club Logo" class="h-8 w-auto" />
    </template>
  </ClientOnly>
</template>