<script setup>
import Header from '~/components/Header.vue'
import { Skeleton } from '@/components/ui/skeleton'

import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

const { isLoading } = useAuth()
</script>

<template>
  <div>
    <template v-if="isLoading">
      <div class="min-h-screen bg-background">
        <!-- Header Skeleton -->
        <div class="border-b" style="height: 94px;">
          <div class="container flex h-full items-center">
            <Skeleton class="h-6 w-32 mr-4" />
            <div class="flex-1 flex items-center justify-end space-x-2">
              <Skeleton class="h-9 w-32" />
              <Skeleton class="h-9 w-20" />
              <Skeleton class="h-9 w-9 rounded-md" />
            </div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <div class="container mx-auto px-4 py-8">
          <div class="space-y-6">
            <Skeleton class="h-8 w-64" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="i in 6" :key="i" class="space-y-3">
                <Skeleton class="h-48 w-full rounded-lg" />
                <Skeleton class="h-4 w-3/4" />
                <Skeleton class="h-4 w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <Header />
      <NuxtPage />
      
      <Toaster />
    </template>
  </div>
</template>