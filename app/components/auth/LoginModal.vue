<template>
    <Dialog v-model:open="isOpen">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{{ t('auth.loginTitle') }}</DialogTitle>
                <DialogDescription>
                    {{ t('auth.loginDescription') }}
                </DialogDescription>
            </DialogHeader>

            <Card class="border-0 shadow-none">
                <CardContent class="p-0">
                    <Alert v-if="generalError" variant="destructive" class="mb-4">
                        <AlertCircle class="h-4 w-4" />
                        <AlertTitle>{{ generalError }}</AlertTitle>
                    </Alert>

                    <form @submit.prevent="onSubmit" class="space-y-4">
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem>
                                <FormLabel>{{ t('auth.emailOrCpf') }}</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="text" 
                                        :placeholder="t('auth.emailOrCpfPlaceholder')"
                                        :model-value="componentField.modelValue"
                                        @input="handleEmailOrCpfInput($event, componentField)"
                                        :disabled="isLoading" 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="password">
                            <FormItem>
                                <div class="flex items-center justify-between">
                                    <FormLabel>{{ t('auth.password') }}</FormLabel>
                                    <Button 
                                        type="button" 
                                        variant="link" 
                                        size="sm"
                                        class="px-0 font-normal text-xs"
                                        @click="showForgotPasswordDialog = true"
                                    >
                                        {{ t('auth.forgotPassword') }}
                                    </Button>
                                </div>
                                <FormControl>
                                    <div class="relative">
                                        <Input 
                                            :type="showPassword ? 'text' : 'password'" 
                                            placeholder="••••••••"
                                            v-bind="componentField" 
                                            :disabled="isLoading" 
                                            class="pr-10" 
                                        />
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="sm"
                                            class="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            @click="showPassword = !showPassword" 
                                            :disabled="isLoading"
                                        >
                                            <Eye v-if="!showPassword" class="h-4 w-4 text-muted-foreground" />
                                            <EyeOff v-else class="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <CardFooter class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 px-0 pt-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                @click="closeDialog"
                                class="w-full sm:w-auto" 
                                :disabled="isLoading"
                            >
                                {{ t('auth.cancel') }}
                            </Button>
                            <Button 
                                type="submit" 
                                class="w-full sm:w-auto" 
                                :disabled="isLoading"
                            >
                                <Spinner v-if="isLoading" class="mr-2 h-4 w-4" />
                                {{ isLoading ? t('auth.entering') : t('auth.enter') }}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </DialogContent>
    </Dialog>

    <!-- Alert Dialog para Esqueci Senha -->
    <AlertDialog v-model:open="showForgotPasswordDialog">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ t('auth.passwordRecoveryTitle') }}</AlertDialogTitle>
                <AlertDialogDescription>
                    {{ t('auth.passwordRecoveryDescription') }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>{{ t('auth.close') }}</AlertDialogCancel>
                <AlertDialogAction @click="contactSupport">
                    {{ t('auth.contactSupport') }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { AlertCircle, Eye, EyeOff } from 'lucide-vue-next'
import { useForm } from 'vee-validate'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Spinner } from '@/components/ui/spinner'

const { t } = useI18n()
const { isOpen, close } = useLoginModal()
const { success: toastSuccess } = useAppToast()

const isLoading = ref(false)
const generalError = ref('')
const showForgotPasswordDialog = ref(false)
const showPassword = ref(false)

const closeDialog = () => {
    close()
    generalError.value = ''
    showPassword.value = false
    resetForm()
}

// Resetar o formulário quando o modal abrir
watch(isOpen, (newValue) => {
    if (newValue) {
        generalError.value = ''
        showPassword.value = false
        resetForm()
    }
})

const contactSupport = () => {
    window.open('mailto:suporte@h2club.com?subject=Recuperação de Senha', '_blank')
}

// Função para formatar CPF
function formatCpf(value: string): string {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
        return numbers
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }
    return value
}

// Função para detectar se é CPF
function isCpf(value: string): boolean {
    const numbers = value.replace(/\D/g, '')
    return numbers.length > 0 && numbers.length <= 11 && !value.includes('@')
}

// Handler para input de email ou CPF
function handleEmailOrCpfInput(event: Event, field: any) {
    const input = event.target as HTMLInputElement
    let value = input.value

    if (isCpf(value)) {
        value = formatCpf(value)
        input.value = value
    }

    field['onUpdate:modelValue'](value)
}

// Login schema
const baseLoginSchema = z.object({
    email: z.string()
        .min(1, 'Email ou CPF é obrigatório')
        .refine((val) => {
            if (val.includes('@')) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
            }
            const numbers = val.replace(/\D/g, '')
            return numbers.length === 11
        }, 'Email inválido ou CPF deve ter 11 dígitos'),
    password: z.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
})
const loginSchema = toTypedSchema(baseLoginSchema)
type LoginValues = z.infer<typeof baseLoginSchema>

const { handleSubmit, resetForm, setFieldValue } = useForm<LoginValues>({
    validationSchema: loginSchema,
    validateOnMount: false,
    initialValues: {
        email: '',
        password: ''
    }
})

async function handleLogin(values: LoginValues) {
    generalError.value = ''
    isLoading.value = true

    try {
        const { email, password } = values

        const resp = await $fetch('/api/login', {
            method: 'POST',
            body: { email, password }
        }) as any

        if (resp.success && resp.data?.token) {
            const auth = useAuth()
            await auth.login(resp.data.token)

            const apelido = auth.user.value?.apelido || auth.user.value?.nome || 'Usuário'

            toastSuccess(
                'Login realizado com sucesso!',
                `Olá, ${apelido}!`,
            )

            close()
            resetForm()
            generalError.value = ''
        } else {
            const errorMessage = resp?.data?.message ||
                resp?.data?.erro ||
                resp?.data?.error ||
                resp?.message ||
                'Credenciais inválidas. Tente novamente.'
            
            generalError.value = errorMessage
        }
    } catch (e: any) {
        console.error('Erro no login:', e)

        const errorMessage = e?.data?.message ||
            e?.data?.erro ||
            e?.data?.error ||
            e?.statusMessage ||
            e?.message ||
            'Credenciais inválidas. Tente novamente.'

        generalError.value = errorMessage
    } finally {
        isLoading.value = false
    }
}

const onSubmit = handleSubmit(handleLogin)
</script>

<style>
/* Login acima do Drawer; recuperar senha acima do login */
[data-slot="dialog-overlay"] {
    z-index: 100 !important;
}

[data-slot="dialog-content"] {
    z-index: 101 !important;
}

[data-slot="alert-dialog-overlay"] {
    z-index: 110 !important;
}

[data-slot="alert-dialog-content"] {
    z-index: 111 !important;
}
</style>
