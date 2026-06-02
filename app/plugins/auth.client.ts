export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth()

  // Run after hydration so Pinia state does not diverge from SSR markup
  onNuxtReady(() => {
    initAuth()
  })
})