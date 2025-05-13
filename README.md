# Futmania

Aplicação Web para organização de babas, desenvolvida com tecnologias modernas e boas práticas de desenvolvimento.

## 🚀 Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material-UI](https://mui.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Firebase](https://firebase.google.com/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📋 Pré-requisitos

- Node.js (versão especificada no arquivo `.nvmrc`)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/diasjoaovitor/futmania.git
```

2. Acesse a pasta do projeto e instale as dependências:

```bash
cd futmania

npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run lint:check` - Verifica problemas de linting
- `npm run lint:fix` - Corrige problemas de linting
- `npm run prettier:check` - Verifica formatação do código
- `npm run prettier:fix` - Formata o código automaticamente

## 📦 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── config/        # Configurações da aplicação
├── constants/     # Constantes e enums
├── contexts/      # Contextos do React
├── errors/        # Tratamento de erros
├── hooks/         # Custom hooks
├── icons/         # Ícones personalizados
├── interfaces/    # Interfaces TypeScript
├── models/        # Modelos de dados
├── pages/         # Páginas da aplicação
├── services/      # Serviços e integrações
├── styles/        # Estilos globais
├── tests/         # Testes
├── themes/        # Temas da aplicação
├── types/         # Tipos TypeScript
└── utils/         # Funções utilitárias
```

## 🔐 Acesso

A aplicação está disponível em [futmania.netlify.app](https://futmania.netlify.app/)

Para testar as funções de administrador (gerenciamento de finanças, cadastro de membros, sorteio de times, atribuição de resultados, etc.), utilize as credenciais:

```
Email: teste@teste.com
Senha: 123456
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
