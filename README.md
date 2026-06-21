# Portal AAPM - Frontend (React, TypeScript & Tailwind CSS)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23ffca28.svg?style=for-the-badge&logo=firebase&logoColor=black)

Este é o repositório do **Frontend** do Portal da AAPM (Associação de Alunos, Pais e Mestres). A interface foi projetada com foco em usabilidade, performance, acessibilidade e responsividade (Mobile-First), oferecendo uma experiência fluida para alunos, docentes e administradores da associação. 

O sistema foi desenvolvido utilizando **React** com **TypeScript** para garantir maior tipagem e segurança no código, além de integrar ferramentas modernas de acessibilidade e edição de texto.

---

## 🔒 Direitos Autorais e Autoria

### 👥 Integrantes do Grupo (Desenvolvedores)
* **Flávia Nascimento Ribeiro** - *Desenvolvimento Frontend / UI-UX / Prototipação*
* **Leticia Aymee Silva Gomes** - *Desenvolvimento Frontend / UI-UX / Prototipação*
* **Maria Eduarda de Sales Miranda** - *Desenvolvimento Backend / Banco de Dados / Segurança & API*
* **Maysa Soares dos Santos** - *Desenvolvimento Frontend / UI-UX / Prototipação*
* **Nicolly de Almeida Gonçalves** -  *Tech Lead / Desenvolvimento Backend / Banco de Dados / Segurança & API*

> **Nota:** Toda a equipe atuou de forma integrada no ciclo completo de desenvolvimento do Portal AAPM, participando desde o levantamento de requisitos e modelagem de dados até a implementação do Back-end (Python/Flask) e Front-end (React/Tailwind).

### 📄 Propriedade Intelectual & Copyright
* **© 2026 Portal AAPM. Todos os direitos reservados.**
  
  Este software, incluindo toda a sua interface gráfica, componentes, folhas de estilo, textos e ativos digitais, é de propriedade exclusiva e coautoria dos desenvolvedores listados acima. 
  
  Fica estritamente **proibida** a cópia, reprodução, distribuição, modificação, comercialização ou uso não autorizado deste repositório, no todo ou em parte, sem a prévia e expressa autorização por escrito dos autores. O uso indevido deste material estará sujeito às penalidades legais cabíveis sob as leis de proteção à propriedade intelectual.

---

## 🛠️ Arquitetura e Pilha Tecnológica

* **⚛️ Biblioteca Principal:** React.js (Componentização SPA)
* **🟦 Superset:** TypeScript (Tipagem estática para robustez do código)
* **⚡ Ferramenta de Build:** Vite
* **🎨 Estilização:** Tailwind CSS (Utilitários CSS de alta fidelidade e responsividade)
* **🌐 Consumo de API:** Fetch API nativo (Implementação leve e performática para requisições HTTP)
* **📝 Editor de Texto:** TipTap API (Editor rico em recursos para a criação de comunicados/sugestões)
* **♿ Acessibilidade:** Integração com as APIs **UserWay** e **VLibras** para inclusão digital
* **🔥 Hospedagem/Configuração:** Firebase Hosting 

---

## 📂 Estrutura Arquitetural do Projeto

O projeto adota uma organização focada em componentização, separando utilitários de alerta, contextos globais, páginas completas e serviços de integração:

```text
📁 aapm-frontend/
│
├── 📁 .github/               # Workflows e automações do GitHub Actions
├── 📁 public/                # Ativos estáticos públicos (Favicon, ícones nativos)
├── 📄 .firebaserc            # Configuração de ambiente do Firebase
├── 📄 firebase.json          # Regras de Hosting e deploys do Firebase
├── 📄 index.html             # Ponto de entrada do DOM da aplicação
├── 📄 tailwind.config.js     # Customização do tema e paleta de cores
├── 📄 tsconfig.json          # Configurações globais do compilador TypeScript
├── 📄 vite.config.ts         # Configuração do Vite com suporte a TypeScript
│
└── 📁 src/                   # Diretório central do código-fonte
    ├── 📄 main.tsx           # Inicialização e renderização do React
    ├── 📄 App.tsx            # Provedor global de rotas e estados
    ├── 📄 index.css          # Estilos globais e diretivas do Tailwind
    │
    ├── 📁 alerts/            # Modais customizados, feedbacks visuais e toasts
    ├── 📁 assets/            # Imagens e logotipos institucionais
    ├── 📁 components/        # Componentes visuais reutilizáveis (Botões, Cards, Navbars)
    ├── 📁 contexts/          # Contextos globais do React (Autenticação e temas)
    ├── 📁 pages/             # Visões/Telas completas do sistema (Login, Dashboards, Admin)
    ├── 📁 Services/          # Funções de requisição baseadas em Fetch API para comunicação com o backend
    └── 📁 types/             # Definições de interfaces e tipos estáticos do TypeScript
```

## 💻 Recursos e Integrações Especiais

* **Acessibilidade Completa (UserWay & VLibras):** O portal conta com ferramentas de acessibilidade integradas diretamente na interface para tradução em Libras e ajustes dinâmicos de contraste, tamanho de fonte e leitura de tela.
* **Editor Avançado (TipTap):** Caixas de texto enriquecidas para a escrita e formatação de conteúdos dentro da plataforma.
* **Comunicação Otimizada (Fetch API):** Centralização das chamadas HTTP na pasta `Services` utilizando o ecossistema nativo do navegador de forma assíncrona.
* **Controle de Tipagem:** Proteção de dados complexos trafegados via API mapeados na pasta `types`.

---

## ⚡ Como Rodar Localmente em Desenvolvimento

### 1. Instalar as dependências do projeto
Certifique-se de ter o Node.js instalado em sua máquina e execute na raiz do projeto:
```bash
  npm install
```
```bash
  npm run dev
```

---
### 1. Protótipo de Baixa e Alta Fidelidade (Figma)
O design das telas, fluxos de navegação e paleta de cores foram validados previamente através do protótipo construído no Figma.

👉 [Acesse o Protótipo no Figma](https://www.figma.com/design/RPseeDfxPYveVFYjvwHbvw/Projeto-AAPM?node-id=0-1&t=aTV8KyYYkOuUF3Af-1)

---
## ✉️ Contato e Redes

Ficou com alguma dúvida ou quer saber mais sobre o Portal AAPM? Conecte-se conosco:

* **Nicolly de Almeida Gonçalves (Tech Lead)** - [GitHub](https://github.com/NicAlmeida) | [LinkedIn](https://www.linkedin.com/in/nicolly-almeida-aa666b235/)
* **Flávia Nascimento Ribeiro** — [GitHub](https://github.com/flaahnascimento) | [LinkedIn](https://www.linkedin.com/in/fl%C3%A1via-nascimento-ribeiro-42b97b219/)
* **Leticia Aymee Silva Gomes** — [GitHub](https://github.com/Leticia-Aymee)
* **Maria Eduarda de Sales Miranda** — [GitHub](https://github.com/MaduSales) | [LinkedIn](https://www.linkedin.com/in/mariaeduardasales/)
* **Maysa Soares dos Santos** — [GitHub](https://github.com/Maysa-Soares)
* **E-mail:** aapmadmin@gmail.com

---

*Portal AAPM: Conectando alunos, escola e comunidade.* 🌐

