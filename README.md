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
