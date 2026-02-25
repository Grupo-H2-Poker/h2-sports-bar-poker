export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email e senha são obrigatórios'
        })
    }

    try {
        const loginResponse = await $fetch(`${config.externalApiBaseRw}/inc/processa-login.php`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                usuario: body.email,
                senha: body.password
            }
        }) as any

        return {
            success: true,
            data: loginResponse
        }
    } catch (err: any) {
        throw createError({
            statusCode: err?.statusCode || 401,
            statusMessage: err?.statusMessage || 'Credenciais inválidas',
            data: err?.data || { message: err?.message || 'Erro ao fazer login' }
        })
    }
})