# Formwell

A dependency-free browser prototype for managing personal-training clients and their training plans.

## Included

- Trainer overview with client, session, plan, and message metrics
- Today's schedule and attention queue
- Searchable recent-client table
- Add-client dialog that updates the table immediately
- Responsive layout for desktop and mobile
- Navigation states for Overview, Clients, Training plans, and Messages
- Login screen with demo accounts and role-based navigation
- Admin plan filters by student and text search
- Admin exercise library with editable properties and local image/video upload
- Training builder that selects exercises from the library and applies per-training repetitions, time, and optional weight
- Student exercise video player when a training exercise has a video demonstration
- Supabase schema with authentication profiles, row-level security, and private media storage

## Run

Open `index.html` in a browser. No build step or package installation is required.

## Contas de teste

- Administrador: `admin@formwell.com` / `admin123`
- Aluno: `marina@formwell.com` / `marina123`

O administrador acessa clientes, planos, exercícios e mensagens. O aluno acessa apenas sua visão geral, seus planos e mensagens. A sessão de login continua demonstrativa.

Na página de planos, o administrador pode selecionar um aluno e pesquisar por nome, categoria ou treino. A aba **Exercícios** permite cadastrar e editar nome, descrição, propriedades padrão e um arquivo local de imagem ou vídeo curto para demonstração. Exercícios e treinos ficam persistidos no `IndexedDB` do navegador para continuar disponíveis entre sessões no mesmo dispositivo.

> O armazenamento local do navegador não sincroniza entre dispositivos. Para uso real compartilhado, será necessário conectar a API, D1 e R2 descritos no plano de armazenamento.

## Setup Supabase

O caminho recomendado para este protótipo é Supabase: Postgres para os dados, Auth para contas e Storage para imagens e vídeos. O schema pronto está em `supabase/schema.sql`.

1. Crie um projeto em [supabase.com](https://supabase.com) e abra **SQL Editor**.
2. Execute todo o conteúdo de `supabase/schema.sql`.
	- Se o schema já tiver sido executado antes desta versão, execute também `supabase/migrations/20260914_exercise_cascade.sql`.
3. Em **Authentication > Users**, crie as contas. O trigger cria automaticamente o perfil com papel `client`.
4. Promova a conta administrativa no SQL Editor, substituindo o e-mail:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'admin@formwell.com');
```

5. Em **Project Settings > API**, copie a **Project URL** e a **Publishable key** para `supabase-config.js`:

```javascript
window.FORMWELL_SUPABASE = {
	url: 'https://SEU_PROJETO.supabase.co',
	publishableKey: 'SUA_CHAVE_PUBLICA',
	enabled: true
};
```

Use somente a chave pública no frontend. Nunca copie a `service_role` para `supabase-config.js`, `app.js` ou GitHub.

O bucket `exercise-media` é privado e as políticas permitem upload apenas para admins. A aplicação já usa `supabase.auth.signInWithPassword`, carrega exercícios com `supabase.from(...)` e cria URLs temporárias com `supabase.storage.from('exercise-media').createSignedUrl(...)`.

Quando `enabled` estiver `true`, o login usa Supabase Auth, a biblioteca de exercícios vem do Postgres e os arquivos usam Storage privado com URLs assinadas. O IndexedDB fica como fallback se o Supabase estiver indisponível.

As contas exibidas como atalhos na tela precisam existir em **Authentication > Users** com os mesmos e-mails e senhas. Depois de criar o admin, execute o SQL de promoção de perfil acima. A chave pública preenchida em `supabase-config.js` não substitui a criação dos usuários nem as políticas RLS.

Ao excluir um exercício pela aba **Exercícios**, o sistema pede confirmação e remove também os vínculos desse exercício em `training_plan_exercises`, o registro no catálogo e o arquivo correspondente no bucket privado.

## Acesso pelo link do GitHub Pages

Para que o uso aconteça pelo site publicado:

1. Faça commit e push dos arquivos para a branch `main`.
2. No GitHub, abra **Settings > Pages**.
3. Selecione **GitHub Actions** como fonte de publicação.
4. Aguarde a execução de `.github/workflows/deploy-pages.yml` em **Actions**.
5. Copie o endereço exibido em **Settings > Pages > Visit site**. Ele terá o formato `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`.
6. Use esse endereço para abrir o sistema e configure o mesmo endereço em `ALLOWED_ORIGIN` apenas se algum backend externo ainda estiver sendo usado.

O GitHub Pages não bloqueia tecnicamente a abertura de `index.html` local ou de outros arquivos públicos do repositório. O procedimento acima define o endereço oficial de acesso; para restringir o conteúdo, não publique segredos e mantenha a segurança dos dados nas políticas RLS do Supabase.

## Publish a public link

This workspace includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

1. Create a new GitHub repository.
2. Upload all files in this folder, including the `.github` folder, to the repository's `main` branch.
3. In GitHub, open **Settings > Pages** and set the source to **GitHub Actions**.
4. Wait for the workflow to finish under the **Actions** tab.

The public link will be `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Backend de dados

O arquivo `worker.js` implementa a base da API para exercícios, treinos e upload de mídia. O GitHub Pages continua servindo o frontend; o Worker consulta o D1 e grava imagens/vídeos no R2.

### Configuração inicial

Instale e autentique o Wrangler:

```powershell
npm install -g wrangler
wrangler login
```

Crie os recursos:

```powershell
wrangler d1 create formwell-db
wrangler r2 bucket create formwell-media
```

Copie o `database_id` retornado pelo primeiro comando para `wrangler.worker.toml`, substituindo `SUBSTITUA_PELO_ID_DO_WRANGLER`. Depois execute o schema:

```powershell
wrangler d1 execute formwell-db --remote --file=schema.sql --config wrangler.worker.toml
```

Defina as chaves fora do repositório:

```powershell
wrangler secret put ADMIN_API_KEY --config wrangler.worker.toml
wrangler secret put CLIENT_API_KEY --config wrangler.worker.toml
```

Publique a API:

```powershell
wrangler deploy --config wrangler.worker.toml
```

Endpoints disponíveis na primeira versão:

- `GET /health`
- `GET /exercises`
- `POST /exercises` e `PUT /exercises/:id` para admin
- `POST /media` para upload de imagem ou vídeo pelo admin
- `GET /trainings` para admin ou aluno autenticado

Envie o token somente pelo header `Authorization: Bearer ...`. Nunca coloque as chaves no `app.js` ou em variáveis públicas do GitHub Pages. O frontend atual usa IndexedDB como fallback local; a conexão com a API deve ser habilitada depois que o Worker estiver publicado e o domínio for definido em `ALLOWED_ORIGIN`.

O endpoint de upload limita arquivos a 25 MB e aceita JPEG, PNG, WebP, MP4 e WebM. Antes de usar com dados reais, substitua as chaves demo por autenticação com sessões `HttpOnly` e implemente URLs assinadas para leitura privada no R2.

## Next implementation steps

Connect the interface to authentication, a persistent database, file uploads, and role-based permissions. The trainer should be able to manage client plans, while each client account should only be able to view its own training content.
