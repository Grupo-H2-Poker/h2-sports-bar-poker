<script setup>
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import CustomScrollbar from '~/components/layout/CustomScrollbar.vue'

const { switching } = useLocaleSwitch()
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <div class="min-h-screen bg-background">
      <Header />
      <div
        class="transition-opacity duration-300 ease-in-out"
        :class="switching ? 'pointer-events-none opacity-0' : 'opacity-100'"
      >
        <NuxtPage />
        <Footer />
      </div>
    </div>
    <CustomScrollbar />
  </UApp>
</template>
