import { defineStore } from 'pinia'
import { watch } from 'vue'
import { toast } from 'vue-sonner'

export interface User {
    nome: string
    email: string
    status: number
    cpf: string
    chave_pix: string | null
    chave_pix_validada: number
    apelido: string
    genero: string
    cep: string
    data_nascimento: string
    notifica_pontuacao: number
    notifica_resgate: number
    notifica_promocao: number
    notifica_categoria: number
    numero: string
    complemento: string
    banco: string | null
    pontua_h2rewards: number
    telefone: string
    avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const isLoading = ref(false)
    const isAuthenticated = ref(false)

    watch([token, user], ([newToken, newUser]) => {
        const hasToken = !!newToken
        const hasUser = !!newUser
        const result = hasToken && hasUser
        isAuthenticated.value = result
    }, { immediate: true })

    // Inicializar do localStorage
    const initAuth = async () => {
        if (import.meta.client) {
            isLoading.value = true
            const savedToken = localStorage.getItem('auth_token')
            if (savedToken) {
                token.value = savedToken
                await fetchUserData()
            } else {
                // Se não tem token, para o loading
                isLoading.value = false
            }
        }
    }

    // Buscar dados do usuário
    const fetchUserData = async () => {
        if (!token.value) {
            return
        }

        try {
            isLoading.value = true

            const response = await $fetch<{ success: boolean, data: User }>('/api/users', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            if (response.success && response.data) {
                const userData = (response.data as any).data || response.data
                user.value = userData
            }

        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error)
            logout()
        } finally {
            isLoading.value = false
        }
    }

    // Login
    const login = async (loginToken: string) => {
        token.value = loginToken

        if (import.meta.client) {
            localStorage.setItem('auth_token', loginToken)
        }

        await fetchUserData()
    }

    // Logout
    const logout = () => {
        user.value = null
        token.value = null

        if (import.meta.client) {
            localStorage.removeItem('auth_token')
        }
    }

    // Atualizar dados do usuário
    const updateUser = (userData: Partial<User>) => {
        if (user.value) {
            user.value = { ...user.value, ...userData }
        }
    }

    return {
        user,
        token,
        isLoading,
        isAuthenticated,
        initAuth,
        fetchUserData,
        login,
        logout,
        updateUser
    }
})