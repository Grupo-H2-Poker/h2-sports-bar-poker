<template>
  <footer class="bg-muted/40 border-t border-border mt-16">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <!-- Coluna: Logo + info -->
        <div class="md:col-span-1 flex flex-col gap-3">
          <Logo :as-link="false" />
          <p class="text-sm font-semibold">#TocaEJoga</p>
          <div class="text-xs text-muted-foreground leading-relaxed">
            <p>Copyright 2023 ®Grupo H2 Brasil.</p>
            <p>Rua Henrique Schaumann, 313 -</p>
            <p>Pinheiros, São Paulo - SP, 05413-001</p>
          </div>
          <div class="flex gap-3 mt-1">
            <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="text-foreground hover:text-muted-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube" class="text-foreground hover:text-muted-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9"/></svg>
            </a>
          </div>
        </div>

        <!-- Coluna: Torneios -->
        <div class="flex flex-col gap-3">
          <h4 class="text-sm font-bold">Torneios</h4>
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/series" class="text-sm text-muted-foreground hover:text-foreground transition-colors">CPH</NuxtLink>
            <NuxtLink to="/series" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Fun Festival</NuxtLink>
            <NuxtLink to="/series" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Tardezinha</NuxtLink>
            <NuxtLink to="/series" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Ladies Weekend</NuxtLink>
            <NuxtLink to="/series" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Xadrez</NuxtLink>
          </nav>
        </div>

        <!-- Coluna: O clube -->
        <div class="flex flex-col gap-3">
          <h4 class="text-sm font-bold">O clube</h4>
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/sobre" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Quem somos</NuxtLink>
            <NuxtLink to="/social" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Social</NuxtLink>
            <NuxtLink to="/galeria" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Galeria de fotos</NuxtLink>
          </nav>
          <h4 class="text-sm font-bold mt-2">Jackpot</h4>
          <h4 class="text-sm font-bold">H2bet</h4>
        </div>

        <!-- Coluna: Termos -->
        <div class="flex flex-col gap-3">
          <h4 class="text-sm font-bold">Termos e condições</h4>
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/regulamentos" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Regulamentos</NuxtLink>
            <NuxtLink to="/privacidade" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Segurança e privacidade</NuxtLink>
          </nav>
          <h4 class="text-sm font-bold mt-2">Atendimento</h4>
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/trabalhe" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Trabalhe conosco</NuxtLink>
            <NuxtLink to="/ouvidoria" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Ouvidoria</NuxtLink>
          </nav>
        </div>
      </div>
    </div>

    <!-- Rodapé inferior -->
    <div class="border-t border-border">
      <div class="container mx-auto px-4 py-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <div class="flex items-center justify-center w-6 h-6 rounded-full border border-muted-foreground text-[10px] font-bold">18</div>
        <span>Aplica-se T&C. Jogue com responsabilidade</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from '~/components/layout/Logo.vue'
</script>
