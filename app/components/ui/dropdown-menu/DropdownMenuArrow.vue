<script setup lang="ts">
import type { DropdownMenuArrowProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DropdownMenuArrow } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<DropdownMenuArrowProps & { class?: HTMLAttributes["class"] }>(),
  {
    width: 12,
    height: 10,
  },
)

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DropdownMenuArrow
    data-slot="dropdown-menu-arrow"
    v-bind="delegatedProps"
    :class="cn(props.class)"
  >
    <!-- Triângulo externo = borda; interno = fill do popover -->
    <path d="M0 0L6 6L12 0" fill="var(--border)" />
    <path d="M1.15 0L6 4.85L10.85 0" fill="var(--popover)" />
  </DropdownMenuArrow>
</template>
