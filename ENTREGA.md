# Entrega — José Henrique Oliveira de Carvalho

> Desafio Técnico Full Stack — Totem de Check-in Hospitalar de Pacientes.

---

## Como rodar

Você pode rodar o projeto de duas formas: através do **Docker Compose** (recomendado, sobe toda a stack com um único comando) ou **localmente** via terminal com `pnpm`.

### Opção 1: Via Docker Compose (Recomendado)

Certifique-se de ter o Docker e Docker Compose instalados na máquina. Na raiz do repositório, execute:

```bash
docker compose up -d
```

Todos os serviços subirão orquestrados com redes e variáveis de ambiente configuradas:
* **Totem Frontend (React / Next.js)**: [http://localhost:5173](http://localhost:5173)
* **API Back-end (NestJS)**: [http://localhost:3000](http://localhost:3000)
* **Serviço de Cadastro (Mock Service)**: [http://localhost:4000](http://localhost:4000)
* **Banco de Dados (PostgreSQL)**: `localhost:5432`

Para encerrar os containers:
```bash
docker compose down
```

---

### Opção 2: Rodando Localmente na Máquina

1. **Subir o banco de dados e o mock-service via Docker**:
   ```bash
   docker compose up -d db mock-service
   ```

2. **Iniciar o Back-end (API NestJS)**:
   ```bash
   cd api
   pnpm install
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm start:dev
   ```
   *A API estará acessível em `http://localhost:3000`.*

3. **Iniciar o Front-end (Next.js)**:
   ```bash
   cd web
   pnpm install
   pnpm dev
   ```
   *Acesse o totem em `http://localhost:5173`.*

---

### Como testar

* **CPFs disponíveis no mock para teste**:
  * `11111111111` — Ana Souza (nasc. 1988-03-12)
  * `22222222222` — Bruno Carvalho (nasc. 1975-11-02)
  * `33333333333` — Carla Menezes (nasc. 1993-07-25)
  * `44444444444` — Diego Fernandes (nasc. 2001-01-30)
  * `55555555555` — Elaine Rodrigues (nasc. 1960-09-18)
  * Qualquer outro CPF retornará o erro amigável de paciente não encontrado.

* **Executar os testes unitários da API**:
  ```bash
  cd api
  pnpm test
  ```

---

## O que foi feito

### Back-end (NestJS + TypeScript)
* **Arquitetura em Camadas**: Separação clara de responsabilidades entre `Controllers`, `Services`, `Repositories` e `DTOs`.
* **Endpoints Implementados**:
  * `POST /checkin/start`: Recebe o CPF, consulta o `mock-service`, persiste o check-in no banco e retorna os dados do paciente com horário de registro.
  * `GET /checkin/listCheckins`: Lista a fila de check-ins ordenada cronologicamente.
* **Integração Externa Resiliente**: Tratamento de respostas de sucesso (200), erro de não encontrado (404) e indisponibilidade do serviço externo com respostas HTTP padronizadas.
* **Persistência com Prisma ORM**: Modelagem da tabela `check_ins` no PostgreSQL com UUIDs e migrações versionadas.
* **Testes Automatizados**: Suíte de testes unitários com **Vitest** cobrindo Services e Controllers (100% de aprovação).
* **Tipagem Estrita**: Código TypeScript estritamente tipado, sem nenhuma utilização do tipo `any` (com `unknown` para captura segura de erros).

### Front-end (React / Next.js 16 + Tailwind CSS)
* **Experiência de Totem de Autoatendimento Kiosk**: Interface inspirada na identidade visual institucional do **Hospital Alemão Oswaldo Cruz**
* **Layout de Tela Fixa (`h-screen overflow-hidden`)**: Pensado para displays touch de autoatendimento, eliminando a barra de rolagem global da janela e concentrando o scroll apenas na lista da fila.
* **Teclado Numérico Virtual Touch**: Componente de teclado virtual integrado com feedback tátil/visual, suporte simultâneo a digitação física e touch screen, e máscara automática de CPF (`000.000.000-00`).
* **Padrão de Composição (Compound Components)**: O formulário de check-in foi componentizado utilizando o *Composition Pattern* com React Context (`CheckinForm.Root`, `Header`, `Content`, `Input`, `Keypad`, `Submit`, `Feedback`), permitindo fácil manutenção, reutilização e extensibilidade.
* **Fila Dinâmica em Tempo Real**: Atualização periódica da lista da recepção e refresh instantâneo logo após cada confirmação de check-in.

---

## Onde guardei os dados

Optei por utilizar um **Banco de Dados Relacional (PostgreSQL)** gerenciado pelo **Prisma ORM**.

**Por que essa escolha?**
1. **Realismo e Persistência**: Em um sistema hospitalar real, um check-in de paciente não pode ser volátil. Se o servidor for reiniciado ou sofrer queda temporária, a fila de atendimento e a ordem de chegada dos pacientes devem permanecer íntegras.
2. **Versionamento e Migrações**: O Prisma permite definir esquemas declarativos (`schema.prisma`) e versionar as alterações de banco através de migrações (`prisma migrate`), facilitando deploys seguros tanto localmente quanto via Docker.

---

## Decisões e dificuldades

1. **Concepção de UX para Totem Hospitalar**:
   - Em vez de uma página web comum, a interface foi desenhada como um totem real de autoatendimento hospitalar: tipografia legível, botões de toque com tamanho adequado para acessibilidade (Touch Target Size), cabeçalho com relógio digital em tempo real e visual limpo para não gerar sobrecarga cognitiva aos pacientes.

2. **Adoção do Padrão de Composição (Compound Components)**:
   - Para evitar componentes monolíticos cheios de propriedades e regras acopladas, o `CheckinForm` foi dividido em subcomponentes autônomos que compartilham o estado via contexto. Isso facilita alterar o posicionamento do teclado ou adicionar novos campos sem alterar o fluxo principal.

3. **Configuração de Dependências no pnpm 12 e Docker**:
   - A versão moderna do pnpm introduziu políticas rígidas de segurança contra scripts de build (`ERR_PNPM_IGNORED_BUILDS`). Isso foi resolvido padronizando o arquivo `pnpm-workspace.yaml` e configurando `strict-dep-builds=false` no container Alpine para compilação nativa dos engines do Prisma e Turbopack.

4. **Healthcheck do Banco no Docker Compose**:
   - Para evitar que a API subisse e tentasse aplicar migrações antes que o PostgreSQL estivesse pronto para aceitar conexões TCP, foi configurado um `healthcheck` (`pg_isready`) com `depends_on: { condition: service_healthy }`.

---

## O que faria com mais tempo

* **WebSockets ou Server-Sent Events (SSE)**: Substituir o polling periódico da fila por eventos push em tempo real, atualizando o painel de senhas instantaneamente.
* **Painel de Chamada para a Recepção**: Criar uma visualização separada para que os recepcionistas ou médicos possam alterar o status do atendimento (ex: `Aguardando`, `Em Atendimento`, `Concluído`) e disparar alertas sonoros de chamada de senha.
* **Impressão de Comprovante**: Adicionar geração de ticket/comprovante com código de barras ou QR Code para impressoras térmicas integradas aos totens físicos.
* **Testes End-to-End (E2E)**: Implementar testes ponta a ponta com Playwright para simular o paciente digitando no teclado virtual e acompanhando seu nome surgir na fila.
