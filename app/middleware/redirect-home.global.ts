export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path !== '/') return

  const { defaultUnity, fetchUnidades, hasUnidades } = useUnidades()

  await fetchUnidades()

  if (hasUnidades.value && defaultUnity.value) {
    return navigateTo(`/${defaultUnity.value}`, { replace: true })
  }
})
