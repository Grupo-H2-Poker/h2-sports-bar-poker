<template>
    <Button @click="open" variant="brand" size="sm">
        Login
    </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { open } = useLoginModal()
</script>
