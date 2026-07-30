<script setup>
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import CustomScrollbar from '~/components/layout/CustomScrollbar.vue'
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <div class="min-h-screen bg-background">
      <Header />
      <NuxtPage />
      <Footer />
    </div>
    <CustomScrollbar />
  </UApp>
</template>
