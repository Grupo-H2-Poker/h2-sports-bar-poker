<template>
  <DropdownMenu v-if="withDropdown">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="relative rounded-full cursor-pointer"
        :aria-label="`Menu da conta de ${user?.nome || 'usuário'}`"
      >
        <Avatar :class="size">
          <AvatarImage :src="user?.avatar || ''" :alt="user?.nome || 'Usuário'" />
          <AvatarFallback :class="textSize" class="text-white" :style="{ backgroundColor: bgColor }">
            {{ getInitials(user?.nome || 'U') }}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      class="w-72 overflow-visible rounded-xl p-0 shadow-lg"
      side="bottom"
      align="end"
      :side-offset="8"
      :collision-padding="8"
      :arrow-padding="8"
    >
      <DropdownMenuArrow class="-mt-px" />
      <DropdownMenuLabel class="font-normal p-0">
        <div class="flex items-start gap-3 px-3 py-3">
          <Avatar class="h-10 w-10 shrink-0">
            <AvatarImage :src="user?.avatar || ''" :alt="user?.nome || 'Usuário'" />
            <AvatarFallback class="text-sm text-white bg-brand-purple">
              {{ getInitials(user?.nome || 'U') }}
            </AvatarFallback>
          </Avatar>
          <div class="min-w-0 flex-1 space-y-1">
            <p class="truncate text-sm font-semibold leading-tight tracking-tight">
              {{ user?.nome }}
            </p>
            <p class="truncate text-xs text-muted-foreground">
              {{ user?.email }}
            </p>
            <div v-if="user" class="flex flex-wrap gap-1.5 pt-1">
              <span
                class="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
              >
                <span
                  class="size-1.5 rounded-full"
                  :class="user.status === 1 ? 'bg-emerald-500' : 'bg-red-500'"
                />
                {{ user.status === 1 ? 'Cliente ativo' : 'Cliente inativo' }}
              </span>
              <span
                v-if="user.pontua_h2rewards === 1"
                class="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
              >
                <span class="size-1.5 rounded-full bg-sky-500" />
                H2 Rewards
              </span>
            </div>
          </div>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator class="my-0" />

      <DropdownMenuGroup class="p-1">
        <DropdownMenuItem as-child class="cursor-pointer rounded-md px-2 py-2">
          <NuxtLink to="/perfil">
            <User class="size-4" />
            <span>Perfil</span>
          </NuxtLink>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator class="my-0" />

      <DropdownMenuGroup class="p-1">
        <DropdownMenuItem
          variant="destructive"
          class="cursor-pointer rounded-md px-2 py-2"
          @click="showLogoutDialog = true"
        >
          <LogOut class="size-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>

  <Avatar v-else :class="size" @click="handleClick">
    <AvatarImage :src="user?.avatar || ''" :alt="user?.nome || 'Usuário'" />
    <AvatarFallback :class="textSize" class="text-white" :style="{ backgroundColor: bgColor }">
      {{ getInitials(user?.nome || 'U') }}
    </AvatarFallback>
  </Avatar>

  <Dialog v-model:open="showLogoutDialog">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Confirmar saída</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar o sistema.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="flex gap-2">
        <Button variant="outline" :disabled="isLoggingOut" @click="showLogoutDialog = false">
          Cancelar
        </Button>
        <Button variant="destructive" :disabled="isLoggingOut" @click="handleLogout">
          <div v-if="isLoggingOut" class="flex items-center gap-2">
            <div class="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Saindo...
          </div>
          <span v-else>Sair</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { User, LogOut } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props {
  size?: string
  bgColor?: string
  textSize?: string
  withDropdown?: boolean
  onClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  size: 'h-9 w-9',
  bgColor: 'var(--brand-purple)',
  textSize: 'text-sm',
  withDropdown: true,
  onClick: undefined,
})

const { user, logout } = useAuth()
const { error: toastError } = useAppToast()

const showLogoutDialog = ref(false)
const isLoggingOut = ref(false)

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const handleLogout = async () => {
  isLoggingOut.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    logout()
    showLogoutDialog.value = false
    await navigateTo('/')
    toastError(
      'Logout realizado com sucesso!',
      'Faça o login para acessar novamente!',
    )
  } finally {
    isLoggingOut.value = false
  }
}

const handleClick = () => {
  props.onClick?.()
}
</script>
