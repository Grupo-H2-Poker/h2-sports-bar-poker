<script setup lang="ts">
import logoBranco from '~/assets/img/logo-branco.png'

interface Props {
  asLink?: boolean
}

withDefaults(defineProps<Props>(), {
  asLink: true
})

const { getSlugFromName, selectedUnityName, defaultUnityName } = useUnidades()

const logoLink = computed(() => {
  const unityName = selectedUnityName.value || defaultUnityName.value
  if (!unityName) return '/'

  const slug = getSlugFromName(unityName)

  return slug ? `/${slug}` : '/'
})
</script>

<template>
  <div class="flex items-center">
    <NuxtLink
      v-if="asLink"
      :to="logoLink"
      class="flex items-center"
    >
      <img
        :src="logoBranco"
        alt="H2 Club Logo"
        class="h-8 w-auto"
      />
    </NuxtLink>

    <img
      v-else
      :src="logoBranco"
      alt="H2 Club Logo"
      class="h-8 w-auto"
    />
  </div>
</template>