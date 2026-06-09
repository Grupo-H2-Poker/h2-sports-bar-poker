# H2 Club - Site Poker Live

## 🚀 Funcionalidades

- ✅ Modal de login com validação
- ✅ Integração com API externa
- ✅ Gerenciamento de estado de autenticação
- ✅ Avatar do usuário após login
- ✅ Persistência no localStorage
- ✅ Tratamento de erros
- ✅ Responsivo (mobile/desktop)

## 📦 Setup

Instale as dependências:

```bash
npm install
```

## 🔧 Desenvolvimento

### 1. Inicie o servidor de API de teste:

```bash
npm run test-api
```

Isso iniciará uma API local em `http://localhost:3001` com usuários de teste:
- **joao@teste.com** / 123456
- **maria@teste.com** / 123456

### 2. Inicie o servidor Nuxt:

```bash
npm run dev
```

O app estará disponível em `http://localhost:3000`

## 🔐 Como usar o Login

1. Clique no botão "Login" no header
2. Use um dos usuários de teste:
   - Email: `joao@teste.com` ou `maria@teste.com`
   - Senha: `123456`
3. Após o login, o botão será substituído pelo avatar do usuário
4. Clique no avatar para ver o menu com opção de logout

## 🌐 API de Produção

Para usar a API real, altere o arquivo `.env`:

```env
NUXT_EXTERNAL_API_BASE=https://rewards.h2club.com.br
```

## 📁 Estrutura do Código

- `app/composables/useAuth.ts` - Gerenciamento de autenticação
- `app/components/Login.vue` - Modal de login
- `app/components/UserAvatar.vue` - Avatar do usuário logado
- `app/components/Header.vue` - Header com botão de login/avatar
- `test-api.js` - Servidor de API para testes

## 🔄 Fluxo de Autenticação

1. Usuário preenche credenciais no modal
2. `useAuth.login()` faz requisição para `/api/login`
3. Se sucesso: salva dados no localStorage e atualiza estado
4. Header reativo mostra avatar em vez do botão de login
5. Logout limpa localStorage e reseta estado





Components: 

Banner > 

modulos: 
             {
              id: 1,
              tipo: 'banner',
              ordem: 1,
              status: 'publicado',
              metadados: {
                drag_carousel: false,
                carousel_bleed_right: false,
              },
              components: [
                {
                  id: 10,
                  type: 'banner',
                  ordem: 1,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'lg',
                    cta_position: 'center',
                    imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&h=800&fit=crop',
                    section_cta: {
                      titulo: 'Sports Bar',
                      descricao: 'O melhor lugar para assistir aos jogos enquanto curte um drink e joga poker com os amigos.',
                      cta: 'Conheça nosso sports bar',
                      cta_link: 'agenda',
                      align: 'center',
                      size: 'md',
                    },
                  },
                },
                {
                  id: 11,
                  type: 'banner',
                  ordem: 2,
                  status: 'publicado',
                  data: {
                    layout: 'two_column',
                    size: 'lg',
                    cta_column: 'left',
                    reverse_columns: true,
                    imagem: 'https://images.unsplash.com/photo-1606166188517-cc5e34f2e8e0?w=800&h=800&fit=crop',
                    section_cta: {
                      titulo: 'Poker é esporte da mente.',
                      descricao: 'No H2, estratégia é poder, leitura é vantagem e dominar a mesa é o único caminho.',
                      cta: 'Saiba mais',
                      cta_link: 'agenda',
                      align: 'left',
                      size: 'md',
                    },
                  },
                },
                {
                  id: 12,
                  type: 'banner',
                  ordem: 3,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'sm',
                    height: 'lg',
                    cta_position: 'bottom-center',
                    overlay: 'gradient-bottom',
                    imagem: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=750&fit=crop',
                    section_cta: {
                      titulo: 'H2bet',
                      descricao: 'Aposte nos seus times favoritos com as melhores odds do mercado.',
                      cta: 'Toca e Joga!',
                      cta_link: 'https://www.h2.bet.br/',
                      align: 'center',
                      size: 'md',
                    },
                  },
                },
                {
                  id: 13,
                  type: 'banner',
                  ordem: 4,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'sm',
                    height: 'lg',
                    cta_position: 'bottom-center',
                    overlay: 'gradient-bottom',
                    imagem: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=750&fit=crop',
                    section_cta: {
                      titulo: 'H2rewards',
                      descricao: 'Acumule pontos em cada buy-in e troque por prêmios exclusivos.',
                      cta: 'Saiba mais',
                      cta_link: 'agenda',
                      align: 'center',
                      size: 'md',
                    },
                  },
                },
                {
                  id: 14,
                  type: 'banner',
                  ordem: 5,
                  status: 'publicado',
                  data: {
                    layout: 'overlay',
                    size: 'lg',
                    imagem: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=750&fit=crop',
                    link: 'agenda',
                  },
                },
              ],
            },