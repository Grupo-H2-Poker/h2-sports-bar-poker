export default defineNuxtPlugin(async () => {
  const { fetchUnidades } = useUnidades()
  
  // Carrega as unidades assim que o app inicializa
  await fetchUnidades()
})
