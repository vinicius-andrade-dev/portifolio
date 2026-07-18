# Vinícius Andrade - Portfólio Premium Full Stack

Este repositório contém o código-fonte de um portfólio de altíssimo nível desenvolvido com o objetivo de demonstrar habilidades avançadas de engenharia de software, design premium, SEO de alto impacto, acessibilidade e performance refinada. 

A interface e as micro-interações foram inspiradas no padrão estético de produtos de grandes referências de design do mercado, como **Vercel, Linear, Stripe e Supabase**.

---

## 🎯 Objetivos do Projeto

- **Impacto Profissional:** Apresentar a trajetória, competências técnicas e casos reais de desenvolvimento de forma clara e visualmente impressionante para recrutadores nacionais e internacionais.
- **Internacionalização (i18n):** Suporte nativo completo a três idiomas (Português, Inglês e Espanhol) com detecção e persistência de preferências de idioma.
- **Segurança e Melhores Práticas:** Configuração modularizada, variáveis de ambiente seguras (`.gitignore` ativo para `.env`), e tipagem estrita no TypeScript.
- **Acessibilidade & SEO:** Conformidade com marcações semânticas de HTML5, atributos ARIA, SEO dinâmico multilíngue e schema estructurado de dados (Schema.org JSON-LD).

---

## 🛠️ Tecnologias Utilizadas

### Core & Framework
- **Next.js 16 (App Router):** Roteamento avançado de arquivos e renderização híbrida rápida.
- **React 19:** Utilização de hooks modernos e conciliação de DOM otimizada.
- **TypeScript:** Tipagem estrita em todo o fluxo da aplicação.

### Estilização & Animação
- **Tailwind CSS v4:** Motor de estilos de alta velocidade com suporte a variáveis CSS nativas.
- **Framer Motion:** Animações fluidas de viewport, stagger children, efeitos spring e fade-in reativos.
- **Lenis:** Suavização global do fluxo de rolagem da página (Smooth Scroll).

### Gerenciamento de Dados & Formulários
- **TanStack Query (React Query v5):** Fetching de dados assíncronos e cache otimizado das requisições de APIs de terceiros.
- **React Hook Form + Zod:** Validação robusta de esquemas em tempo real no lado do cliente.

### Integrações & Backend
- **Prisma 7 (ORM):** Modelagem de dados estruturada para persistência de mensagens de contato.
- **Resend API:** Disparo profissional de emails a partir do formulário de contato.
- **GitHub API Proxy:** Rota backend para extrair estrelas, forks, repositórios recentes e calcular dados de linguagens.
- **Credly API Proxy:** Rota backend para carregar os badges de certificações dinamicamente.

---

## 📂 Estrutura do Projeto

```text
├── prisma/
│   └── schema.prisma         # Modelagem do Banco de Dados
├── public/
│   └── cv-vinicius.pdf       # Currículo em PDF oficial para download
├── src/
│   ├── app/
│   │   ├── [locale]/         # Roteamento multilíngue (i18n)
│   │   │   ├── layout.tsx    # Layout principal com metadados e SEO
│   │   │   └── page.tsx      # Landing page de seção única
│   │   ├── api/              # Endpoints de proxy e processamento de contatos
│   │   ├── globals.css       # Configurações do Tailwind v4 e variáveis de tema
│   │   ├── manifest.ts       # Configurações de PWA
│   │   ├── robots.ts         # Arquivo robots.txt dinâmico
│   │   └── sitemap.ts        # Sitemap XML multilíngue
│   ├── components/
│   │   ├── layout/           # Componentes estruturais (Navbar, Footer, Switches)
│   │   ├── sections/         # Seções individuais (Hero, About, Projects, etc.)
│   │   └── ui/               # Primitivas de UI reutilizáveis (Button, Card, Tabs, etc.)
│   ├── hooks/
│   │   └── useLocale.tsx     # Hook e Provedor de contexto do i18n
│   ├── i18n/
│   │   ├── pt.json           # Dicionário de tradução em Português
│   │   ├── en.json           # Dicionário de tradução em Inglês
│   │   └── es.json           # Dicionário de tradução em Espanhol
│   ├── lib/
│   │   ├── db.ts             # Instância do cliente do Prisma
│   │   └── dictionary.ts     # Utilitário de leitura estática de traduções
│   └── middleware.ts         # Middleware para gerenciamento de idiomas
├── prisma.config.ts          # Arquivo de configuração de datasource para Prisma 7
└── .env                      # Variáveis de ambiente locais (Ignorado pelo Git)
```

---

## ⚙️ Passo a Passo para Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente em sua máquina de desenvolvimento.

### 1. Pré-requisitos
Certifique-se de possuir o **Node.js (versão 18+)** e o **npm** (ou yarn) instalados.

### 2. Clonar o Repositório
```bash
git clone https://github.com/lisboainformatica/portifolio.git
cd portifolio
```

### 3. Instalar Dependências
Instale todos os pacotes requeridos especificados no `package.json`:
```bash
npm install
```

### 4. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto contendo as seguintes configurações:
```env
# Conexão com o Banco de Dados (Exemplo PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/portfolio?schema=public"

# Chave da API do Resend para envio real de e-mails
RESEND_API_KEY="seu_token_aqui"
```

### 5. Compilar o Prisma Client
Para gerar os tipos TypeScript do Prisma Client com base nas configurações da sua máquina, execute:
```bash
npx prisma generate
```

### 6. Executar o Servidor de Desenvolvimento
Inicie o servidor de desenvolvimento local:
```bash
npm run dev
```
O portfólio estará disponível no endereço: [http://localhost:3000](http://localhost:3000).

### 7. Compilar para Produção (Build)
Para gerar uma build otimizada e testar a integridade total do código com TypeScript e ESLint:
```bash
npm run build
npm run start
```

---

## 📄 Licença

Este projeto é de uso pessoal para demonstração de portfólio profissional. Fique à vontade para usá-lo como inspiração de design e arquitetura de software!
