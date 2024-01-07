# Interview-ICYBOX

This is a frontend of Interview-ICYBOX

## Frontend Configuration

Below is the directory structure for the frontend part of the project:

```plaintext

├── cypress/                        # E2E test
├── public/                      # Static files like robots.txt, favicon, etc.
├── src/
│   ├── assets/                  # Static assets
│   │   ├── icons/               # SVG icons
│   ├── components/              # Reusable components
│   ├── composables/             # Used to store reusable composition functions
│   ├── hooks/                   # Custom React hooks
│   ├── layouts/                 # Layout components
│   │   └── MainLayout/          # Main layout wrapper for the app
│   ├── pages/                   # Page components and API routes
│   ├── router/                  # For navigation guard or some middleware use case
│   ├── stores/                  # Global state
│   ├── styles/                  # Global style (You might wanna use scss not unoCss)
│   │   └── libs/                # For UI or other library component override
│   ├── types/                   # Store the types
│   ├── auto-imports.d.ts        # The modules you wanna auto import it
│   ├── shims.d.ts               # Helps understand how to handle non-TS modules
│   ├── components.d.ts          # Auto-imports component
│   ├── main.ts
│   ├── App.vue
├── test/                        # Unit test
├── .npmrc                       # For pnpm install dependency logics
├── .eslintrc
├── .gitignore
├── .npmrc                       # For pnpm install dependency logics
├── cypress.config.ts            # E2E test configuration
├── index.html
├── package.json
├── tsconfig.json
├── uno.config.ts                # Define the Uno Css attribute
└── vite.config.ts               # Vite configuration with environment variable


```

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

Open [http://[localhost or Network Private IP]:3335] (http://[localhost or Network Private IP]:3335) with your browser to see the result.

### Build for production

```bash
pnpm build
```

### Start preview server after build

```bash
pnpm preview
```

Open [http://localhost:3335](http://localhost:3335) with your browser to see the result.

### Run Unit Test

```bash
pnpm test:unit
```

### Run e2e Test

```bash
pnpm test:e2e
```

### Reference
Repo: https://github.com/antfu/vitesse/

