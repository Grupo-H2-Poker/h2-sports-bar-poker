<template>
  <DropdownMenu v-if="withDropdown">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" :class="`relative ${size} rounded-full cursor-pointer`">
        <Avatar :class="size">
          <AvatarImage :src="user?.avatar || ''" :alt="user?.nome || 'Usuário'" />
          <AvatarFallback :class="textSize" class="text-white" :style="`background-color: ${bgColor};`">
            {{ getInitials(user?.nome || 'U') }}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-80" align="end">
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col space-y-2">
          <div class="flex items-center space-x-3">
            <Avatar class="h-12 w-12">
              <AvatarImage :src="user?.avatar || ''" :alt="user?.nome || 'Usuário'" />
              <AvatarFallback class="text-lg text-white bg-brand-purple">
                {{ getInitials(user?.nome || 'U') }}
              </AvatarFallback>
            </Avatar>
            <div class="flex-1">
              <p class="text-sm font-medium leading-none">{{ user?.nome }}</p>
              <p class="text-xs leading-none text-muted-foreground mt-1">
                {{ user?.email }}
              </p>
            </div>
          </div>

          <br>

          <div v-if="user?.status" class="flex items-center space-x-2">
            <div class="flex items-center space-x-1">
              <div :class="[
                'w-2 h-2 rounded-full',
                user.status === 1 ? 'bg-green-500' : 'bg-red-500'
              ]"></div>
              <span class="text-xs">
                {{ user.status === 1 ? 'Cliente Ativo' : 'Cliente Inativo' }}
              </span>
            </div>

            <div v-if="user.pontua_h2rewards === 1" class="flex items-center space-x-1">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <span class="text-xs">Tem H2 Rewards</span>
            </div>
          </div>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem @click="navigateTo('/perfil')" class="cursor-pointer">
        <User class="mr-2 h-4 w-4" />
        <span>Perfil</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem @click="showLogoutDialog = true" class="cursor-pointer text-red-600 focus:text-red-600">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Sair</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <!-- Versão simples sem dropdown -->
  <Avatar v-else :class="size" @click="handleClick">
    <AvatarImage :src="user?.avatar || ''" :alt="user?.nome || 'Usuário'" />
    <AvatarFallback :class="textSize" class="text-white" :style="`background-color: ${bgColor};`">
      {{ getInitials(user?.nome || 'U') }}
    </AvatarFallback>
  </Avatar>

  <!-- Dialog de confirmação de logout -->
  <Dialog v-model:open="showLogoutDialog">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Confirmar Saída</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar o sistema.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="flex gap-2">
        <Button variant="outline" @click="showLogoutDialog = false" :disabled="isLoggingOut">
          Cancelar
        </Button>
        <Button variant="destructive" @click="handleLogout" :disabled="isLoggingOut">
          <div v-if="isLoggingOut" class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
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

// Props
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
  onClick: undefined
})

const { user, logout } = useAuth()

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
    navigateTo('/')

  } finally {
    isLoggingOut.value = false

    toast('Logout realizado com sucesso!', {
      description: `Faça o login para acessar novamente!`,
      action: {
        label: 'Fechar',
        onClick: () => console.log('Undo'),
      },
    })
  }
}

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>