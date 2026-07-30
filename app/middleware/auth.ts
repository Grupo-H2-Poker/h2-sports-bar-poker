export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const { isAuthenticated, token } = useAuth()
  const hasStoredToken = !!localStorage.getItem('auth_token')

  if (!isAuthenticated.value && !token.value && !hasStoredToken) {
    return navigateTo('/')
  }
})
