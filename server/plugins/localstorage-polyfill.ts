export default defineNitroPlugin(() => {
  // Node.js 22+ passes --localstorage-file without a valid path in some Nuxt/devtools versions,
  // creating a broken localStorage object where getItem is not a function.
  // This replaces it with a working in-memory mock for SSR.
  if (typeof localStorage !== 'undefined' && typeof localStorage.getItem !== 'function') {
    const store: Record<string, string> = {}
    ;(globalThis as any).localStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => { store[key] = String(value) },
      removeItem: (key: string) => { delete store[key] },
      clear: () => { Object.keys(store).forEach(k => delete store[k]) },
      get length() { return Object.keys(store).length },
      key: (index: number) => Object.keys(store)[index] ?? null,
    }
  }
})
