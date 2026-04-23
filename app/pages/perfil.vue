<template>
  <div class="container mx-auto py-8">
    <div v-if="!isAuthenticated" class="text-center">
      <h1 class="text-2xl font-bold mb-4">Acesso Restrito</h1>
      <p class="text-muted-foreground mb-4">Você precisa estar logado para acessar esta página.</p>
      <Login />
    </div>

    <div v-else-if="isLoading" class="text-center">
      <Spinner class="h-8 w-8 mx-auto" />
      <p class="mt-4 text-muted-foreground">Carregando dados do usuário...</p>
    </div>

    <div v-else-if="user" class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Meu Perfil</h1>

      <Card>
        <CardHeader>
          <div class="flex items-center space-x-4">
            <UserAvatar
              size="h-20 w-20"
              text-size="text-lg"
              :with-dropdown="false"
            />
            <div>
              <CardTitle>{{ user.nome }}</CardTitle>
              <CardDescription>{{ user.email }}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent class="space-y-6">
          <!-- Informações Pessoais -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Informações Pessoais</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="user.apelido">
                <Label class="text-sm font-medium text-muted-foreground">Apelido</Label>
                <p class="text-sm">{{ user.apelido }}</p>
              </div>

              <div v-if="user.cpf">
                <Label class="text-sm font-medium text-muted-foreground">CPF</Label>
                <p class="text-sm">{{ formatCPF(user.cpf) }}</p>
              </div>

              <div v-if="user.telefone">
                <Label class="text-sm font-medium text-muted-foreground">Telefone</Label>
                <p class="text-sm">{{ formatPhone(user.telefone) }}</p>
              </div>

              <div v-if="user.data_nascimento">
                <Label class="text-sm font-medium text-muted-foreground">Data de Nascimento</Label>
                <p class="text-sm">{{ formatDate(user.data_nascimento) }}</p>
              </div>

              <div v-if="user.genero">
                <Label class="text-sm font-medium text-muted-foreground">Gênero</Label>
                <p class="text-sm">{{ user.genero }}</p>
              </div>

              <div>
                <Label class="text-sm font-medium text-muted-foreground">Status</Label>
                <p class="text-sm">{{ getStatusText(user.status) }}</p>
              </div>
            </div>
          </div>

          <!-- Endereço -->
          <div v-if="user.cep || user.numero || user.complemento">
            <h3 class="text-lg font-semibold mb-3">Endereço</h3>
            <div class="p-4 rounded-lg border border-brand-purple">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="user.cep">
                  <Label class="text-sm font-medium text-muted-foreground">CEP</Label>
                  <p class="text-sm">{{ formatCEP(user.cep) }}</p>
                </div>

                <div v-if="user.numero">
                  <Label class="text-sm font-medium text-muted-foreground">Número</Label>
                  <p class="text-sm">{{ user.numero }}</p>
                </div>

                <div v-if="user.complemento" class="md:col-span-2">
                  <Label class="text-sm font-medium text-muted-foreground">Complemento</Label>
                  <p class="text-sm">{{ user.complemento }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Informações Financeiras e Notificações -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Informações Financeiras -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Informações Financeiras</h3>
              <div class="space-y-4">
                <div v-if="user.chave_pix">
                  <Label class="text-sm font-medium text-muted-foreground">Chave PIX</Label>
                  <p class="text-sm">{{ user.chave_pix }}</p>
                </div>

                <div v-if="user.banco">
                  <Label class="text-sm font-medium text-muted-foreground">Banco</Label>
                  <p class="text-sm">{{ user.banco }}</p>
                </div>

                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <Label class="text-sm font-medium">PIX Validado</Label>
                    <Switch :model-value="getBooleanValue(user.chave_pix_validada)" />
                  </div>

                  <div class="flex items-center justify-between">
                    <Label class="text-sm font-medium">H2Rewards</Label>
                    <Switch :model-value="getBooleanValue(user.pontua_h2rewards)" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Preferências de Notificação -->
            <div>
              <h3 class="text-lg font-semibold mb-3">Notificações</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <Label class="text-sm font-medium">Pontuação</Label>
                  <Switch :model-value="getBooleanValue(user.notifica_pontuacao)" />
                </div>

                <div class="flex items-center justify-between">
                  <Label class="text-sm font-medium">Resgate</Label>
                  <Switch :model-value="getBooleanValue(user.notifica_resgate)" />
                </div>

                <div class="flex items-center justify-between">
                  <Label class="text-sm font-medium">Promoção</Label>
                  <Switch :model-value="getBooleanValue(user.notifica_promocao)" />
                </div>

                <div class="flex items-center justify-between">
                  <Label class="text-sm font-medium">Categoria</Label>
                  <Switch :model-value="getBooleanValue(user.notifica_categoria)" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import Switch from '@/components/ui/switch/Switch.vue'
import UserAvatar from '~/components/auth/UserAvatar.vue'
import Login from '~/components/auth/Login.vue'

const { user, isAuthenticated, isLoading } = useAuth()

const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('pt-BR')
  } catch {
    return dateString
  }
}

const getStatusText = (status: number): string => {
  switch (status) {
    case 1:
      return 'Ativo'
    case 0:
      return 'Inativo'
    default:
      return 'Desconhecido'
  }
}

const formatCPF = (cpf: string): string => {
  // Remove tudo que não é dígito
  const cleaned = cpf.replace(/\D/g, '')

  // Aplica a máscara XXX.XXX.XXX-XX
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return cpf
}

const formatPhone = (phone: string): string => {
  // Remove tudo que não é dígito
  const cleaned = phone.replace(/\D/g, '')

  // Aplica a máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return phone
}

const formatCEP = (cep: string): string => {
  // Remove tudo que não é dígito
  const cleaned = cep.replace(/\D/g, '')

  // Aplica a máscara XXXXX-XXX
  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  return cep
}

const getBooleanValue = (value: number): boolean => {
  switch (value) {
    case 1:
      return true
    case 0:
      return false
    default:
      return false
  }
}

// Definir meta da página
definePageMeta({
  title: 'Meu Perfil'
})
</script>