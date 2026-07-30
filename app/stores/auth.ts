import { defineStore } from 'pinia'
import { watch } from 'vue'

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
    const fetchError = ref<string | null>(null)

    watch([token, user], ([newToken, newUser]) => {
        const hasToken = !!newToken
        const hasUser = !!newUser
        const result = hasToken && hasUser
        isAuthenticated.value = result
    }, { immediate: true })

    // Inicializar do localStorage
    const initAuth = async () => {
        if (!import.meta.client) return

        const savedToken = localStorage.getItem('auth_token')
        if (!savedToken) return

        token.value = savedToken
        await fetchUserData()
    }

    // Buscar dados do usuário
    const fetchUserData = async (): Promise<boolean> => {
        if (!token.value) {
            return false
        }

        try {
            isLoading.value = true
            fetchError.value = null

            const response = await $fetch<{ success: boolean, data: User }>('/api/users', {
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            if (response.success && response.data) {
                const userData = (response.data as any).data || response.data
                user.value = userData
                return true
            }

            fetchError.value = 'Não foi possível carregar os dados do usuário.'
            return false
        } catch (error: any) {
            console.error('Erro ao buscar dados do usuário:', error)
            const status = error?.statusCode || error?.status
            fetchError.value = error?.statusMessage
                || error?.data?.message
                || 'Erro ao buscar dados do usuário.'

            if (status === 401) {
                logout()
            }
            return false
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
        fetchError.value = null

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
        fetchError,
        initAuth,
        fetchUserData,
        login,
        logout,
        updateUser
    }
})