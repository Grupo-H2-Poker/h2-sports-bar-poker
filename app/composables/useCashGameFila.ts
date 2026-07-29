export function useCashGameFila() {
  const isOpen = useState('cash-game-fila-open', () => false)
  const nome = useState('cash-game-fila-nome', () => '')
  const posicao = useState('cash-game-fila-posicao', () => 5)
  const mesa = useState<string | null>('cash-game-fila-mesa', () => null)

  function entrarNaFila(mesaTitulo?: string) {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated.value) {
      useLoginModal().open()
      return
    }

    nome.value = user.value?.apelido || user.value?.nome || 'Usuário'
    mesa.value = mesaTitulo ?? null
    // Mock: posição aleatória entre 2 e 12 — substituir quando a API existir
    posicao.value = Math.floor(Math.random() * 11) + 2
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  const posicaoLabel = computed(() => `${posicao.value}º lugar`)

  return {
    isOpen,
    nome,
    posicao,
    posicaoLabel,
    mesa,
    entrarNaFila,
    close,
  }
}
