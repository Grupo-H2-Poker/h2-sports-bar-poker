<script setup>
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <div class="min-h-screen bg-background">
      <Header />
      <NuxtPage />
      <Footer />
    </div>
  </UApp>
</template>
