import { storeToRefs } from 'pinia'

export const useAuth = () => {
  const authStore = useAuthStore()
  const { user, token, isLoading, isAuthenticated } = storeToRefs(authStore)
  
  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login: authStore.login,
    logout: authStore.logout,
    fetchUserData: authStore.fetchUserData,
    updateUser: authStore.updateUser,
    initAuth: authStore.initAuth
  }
}