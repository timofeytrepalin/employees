# 👥 Employees Management System

A modern, type-safe employee management demo built with Vue 3, TypeScript and Vite. This repository is a hiring-portfolio demo that showcases production-minded engineering: CI, unit tests, realtime UX (mocked with RxJS), and a clean component architecture.

## Key Features

- Multilingual support (EN/FR/RU) via `vue-i18n`
- Dark / Light theme with persistence
- Responsive, accessible UI components
- Pinia state management with typed stores
- Real-time mock streams using **RxJS** (online users widget)
- Unit tests with **Vitest** and `@vue/test-utils`
- CI with GitHub Actions (`.github/workflows/ci.yml`) that runs lint, type-check, tests and build
- Dev tooling: ESLint, Prettier, TypeScript strict mode

## Live Demo

If a deployment is available it will be linked from the repository. This demo can be run locally (see below).

## Quick Start

Requirements: Node.js 18+ and npm

```bash
# Clone
git clone https://github.com/timofeytrepalin/employees.git
cd employees

# Install
npm install

# Development server
npm run dev
```

Open `http://localhost:5173`.

## Scripts

```bash
npm run dev         # development server
npm run build       # production build
npm run preview     # preview build
npm run lint        # eslint with autofix
npm run type-check  # vue-tsc
npm run test        # vitest unit tests
```

## Realtime (Mock)

- The project includes a lightweight RxJS mock stream in `src/services/realtimeMock.ts` that simulates online user counts and other realtime events.
- Abstraction is exposed from `src/services/realtime.ts` so the mock can be swapped for a real transport (socket.io-client) later without touching components.
- `src/composables/useOnlineUsers.ts` consumes the stream and `src/core/components/app/OnlineUsers.vue` displays the live count.

## Testing & CI

- Unit tests are located under `tests/unit` and run with Vitest (`happy-dom` environment).
- CI workflow at `.github/workflows/ci.yml` runs lint, type-check, unit tests and build on push and PRs.

Run tests locally:

```bash
npm run test -- --run
```

## Security & Dependencies

- `npm audit` has been run and critical vulnerabilities addressed (notably, `vite` upgraded to a patched release).
- To re-check locally:

```bash
npm audit
```

## Notable Components & Files

- `src/core/components/app/OnlineUsers.vue` — realtime online user widget (mocked)
- `src/services/realtimeMock.ts` — RxJS BehaviorSubject stream for realtime demo
- `src/composables/useOnlineUsers.ts` — composable that exposes reactive online count
- `src/services/realtime.ts` — realtime abstraction (swap implementation to socket.io)
- `src/services/mockServer.ts` — mock API used in development
- `tests/shared/test-utils.ts` — helpers for mounting components with i18n

## Roadmap & Senior-level Enhancements

These features are planned or recommended to elevate the demo to middle+/senior level:

- Bulk CSV/Excel import with preview and validation (zod)
- Audit log / change history with undo
- Role-Based Access Control (RBAC) and Admin UI
- E2E test suite with Playwright and visual regression
- Storybook for component documentation
- Observability (Sentry) + performance monitoring

If you want, I can scaffold any of the above (CI already in place — next recommended: Bulk Import MVP).

## Contributing & Notes

- Keep PRs focused and small. Include tests for new logic.
- Use `npm run lint` and `npm run type-check` before opening PRs.

---

**Last updated:** December 2025
# 👥 Employees Management System

A modern, type-safe employee management application built with **Vue 3**, **TypeScript**, and **Vite**. Features a responsive UI, internationalization support (EN/FR/RU), and real-time data management with mock API integration.

🔗 **[Live Demo](https://employees-8nq5gkm82-timofeytrepalins-projects.vercel.app/)** - Deployed on Vercel

## ✨ Features

- 🌍 **Multilingual Support** - English, French, and Russian translations
- 🎨 **Dark/Light Theme** - Beautiful theme switcher with smooth transitions
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔄 **Real-time Data Management** - Add, edit, delete employees with instant feedback
- 🎯 **Form Validation** - Comprehensive input validation with i18n error messages
- 📅 **Date Picker** - Beautiful date selection component
- 📞 **Phone Formatting** - Automatic phone number formatting
- 🔔 **Notification System** - User-friendly toast notifications
- 🚀 **Performance Optimized** - Code splitting, lazy loading, production builds
- 📏 **Code Quality** - ESLint, Prettier, TypeScript strict mode, zero warnings

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vue 3** | Progressive JavaScript framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Next-gen build tool |
| **Pinia** | State management |
| **vue-i18n** | Internationalization |
| **Axios** | HTTP client |
| **SCSS** | Styling with CSS variables |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |

## 📦 Project Structure

```
src/
├── core/
│   ├── components/       # Reusable UI components
│   │   ├── app/         # Application-specific components
│   │   └── ui/          # Generic UI components
│   ├── composables/     # Vue composition functions
│   ├── consts/          # Application constants
│   ├── directives/      # Custom Vue directives
│   └── utils/           # Helper utilities
├── i18n/
│   ├── lang/            # Translation files (en.json, fr.json, ru.json)
│   └── index.ts         # i18n configuration
├── plugins/             # Vue plugins (dayjs, notifications)
├── services/            # API and data services
├── stores/              # Pinia store modules
├── styles/              # Global SCSS styles
├── types/               # TypeScript type definitions
├── views/               # Page components
├── App.vue              # Root component
└── main.ts              # Application entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/timofeytrepalin/employees.git
cd employees

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run ESLint with auto-fix
npm run lint

# Type check
npm run type-check

# Format code with Prettier
npm format
```

## 🎨 Styling & Design

- **BEM Naming Convention** - Maintainable class naming using underscores
- **CSS Variables** - Themeable design system
- **SCSS/Sass** - Advanced styling with nesting and mixins
- **Dark/Light Themes** - Smooth theme switching with localStorage persistence

## 🌐 Internationalization

The application supports three languages:
- 🇬🇧 **English** - Default language
- 🇫🇷 **French** - Full translation support
- 🇷🇺 **Russian** - Full translation support

Language selection is stored in localStorage and persists across sessions.

## 📊 State Management

Using **Pinia** for centralized state management:
- `stores/employees.ts` - Employee data and operations
- `stores/settings.ts` - Application settings (theme, language)

## 🔐 Type Safety

- **TypeScript Strict Mode** - Full type checking
- **Vue 3 Composition API** - Better type inference
- **Typed Props & Emits** - Component-level type safety
- **Global Type Definitions** - Shared types in `src/types/`

## 🧪 Code Quality

This project maintains high code quality standards:

```bash
# Automated checks
npm run lint          # ESLint + auto-fix
npm run type-check    # TypeScript validation
npm run format        # Prettier formatting
```

**Current Status:**
- ✅ 0 ESLint errors
- ✅ 0 ESLint warnings
- ✅ Full TypeScript coverage
- ✅ Zero unused code

## 🚀 Build & Deployment

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

The build output is in the `dist/` directory and is ready for deployment.

### Production Optimizations
- Code splitting for better caching
- Vue & vue-i18n chunking for dependencies
- Source maps disabled for smaller build size
- ESLint integrated into build process

## 📱 API Integration

The application uses a **mock server** for development (`src/services/mockServer.ts`) that simulates:
- Fetching employee list
- Creating new employees
- Deleting employees

For production, replace the mock interceptor with real API endpoints in `src/services/http.ts`.

## 🎯 Component Architecture

### Application Components
- `EmployeeTable` - Main employee list display
- `AddPersonDialog` - Create new employee form
- `ConfirmDialog` - Confirmation modal
- `Notification` - Toast notification system

### UI Components
- `CustomButton` - Reusable button with variants
- `CustomInput` - Form input with validation
- `NativeModal` - Dialog/modal component
- `Pagination` - Table pagination
- `LanguageSwitcher` - Language selector
- `ThemeSwitcher` - Dark/light theme toggle

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - ESLint rules
- `.prettierrc` - Code formatting rules

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Created by [Timofey Trepalin](https://github.com/timofeytrepalin)

---

**Last Updated:** November 2025  
**Status:** Production Ready ✅
