<script setup>
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
    <ClientOnly>
      <Toaster />
    </ClientOnly>
  </div>
</template>