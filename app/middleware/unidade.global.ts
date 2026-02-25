export default defineNuxtRouteMiddleware(async (to) => {
  // Ignora a página inicial e outras rotas que não são de unidade
  if (to.path === '/' || !to.params.unidade) {
    return
  }

  const { fetchUnidades, getUnidadeBySlug, defaultUnity, hasUnidades } = useUnidades()
  
  try {
    // Garante que as unidades estejam carregadas
    await fetchUnidades()
    
    // Se não há unidades disponíveis, redireciona para home
    if (!hasUnidades.value) {
      console.warn('Nenhuma unidade disponível')
      return navigateTo('/', { replace: true })
    }
    
    const slug = to.params.unidade as string
    const unidade = getUnidadeBySlug(slug)
    
    // Se a unidade não existe, redireciona para a unidade padrão
    if (!unidade) {
      console.warn(`Unidade "${slug}" não encontrada, redirecionando para unidade padrão`)
      if (defaultUnity.value) {
        return navigateTo(`/${defaultUnity.value}`, { replace: true })
      }
    }
  } catch (error) {
    console.error('Erro no middleware de unidade:', error)
    // Em caso de erro, permite continuar mas loga o erro
  }
})
