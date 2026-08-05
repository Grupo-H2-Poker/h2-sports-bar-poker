<template>
    <Button @click="open" variant="brand" size="sm" class="rounded-full">
        {{ t('auth.login') }}
    </Button>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { t } = useI18n()
const { open } = useLoginModal()
</script>
