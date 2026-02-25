export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token de autorização necessário'
    })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const userData = await $fetch(`${config.externalApiBasePlu}/app/auth/cliente`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    return {
      success: true,
      data: userData
    }
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 401,
      statusMessage: err?.statusMessage || 'Token inválido ou expirado',
      data: err?.data || { message: err?.message || 'Erro ao buscar dados do usuário' }
    })
  }
})