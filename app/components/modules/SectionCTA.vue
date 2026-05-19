<template>
    <div
      class="flex flex-col gap-6"
      :class="wrapperClass"
    >
      <div class="flex flex-col gap-3">
        <h2
          v-if="title"
          class="font-bold leading-tight"
          :class="titleClass"
        >
          {{ title }}
        </h2>
  
        <p
          v-if="description"
          class="opacity-80"
          :class="descriptionClass"
        >
          {{ description }}
        </p>
      </div>
  
      <div
        v-if="cta"
        class="flex"
        :class="buttonWrapperClass"
      >
        <Button
          variant="brand"
          :size="buttonSize"
          class="rounded-full"
          @click="handleClick"
        >
          {{ cta }}
        </Button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { Button } from '@/components/ui/button'
  
  interface Props {
    title?: string
    description?: string
    cta?: string
    ctaLink?: string
  
    align?: 'left' | 'center' | 'right'
    size?: 'sm' | 'md' | 'lg'
  }
  
  const props = withDefaults(defineProps<Props>(), {
    title: '',
    description: '',
    cta: '',
    ctaLink: '',
    align: undefined,
    size: undefined
  })
  
  const wrapperClass = computed(() => {
    return {
      'items-start text-left': props.align === 'left',
      'items-center text-center': props.align === 'center',
      'items-end text-right': props.align === 'right'
    }
  })
  
  const buttonWrapperClass = computed(() => {
    return {
      'justify-start': props.align === 'left',
      'justify-center': props.align === 'center',
      'justify-end': props.align === 'right'
    }
  })
  
  const titleClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'text-xl'
      case 'lg':
        return 'text-5xl'
      default:
        return 'text-3xl'
    }
  })
  
  const descriptionClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'text-sm max-w-[240px]'
      case 'lg':
        return 'text-xl max-w-[720px]'
      default:
        return 'text-base max-w-[420px]'
    }
  })
  
  const buttonSize = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'sm'
      case 'lg':
        return 'lg'
      default:
        return 'default'
    }
  })
  
  const handleClick = () => {
    if (props.ctaLink) {
      navigateTo(props.ctaLink)
    }
  }
  </script>