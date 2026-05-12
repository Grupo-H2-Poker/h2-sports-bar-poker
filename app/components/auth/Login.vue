<template>
    <Button @click="open" variant="brand" size="sm" class="rounded-full">
        Login
    </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { open } = useLoginModal()
</script>
