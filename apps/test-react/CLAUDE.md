# CLAUDE.md - test-react (Vite + React)

> **IMPORTANT**: 이 파일은 test-react 앱의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item      | Value                     |
| --------- | ------------------------- |
| Framework | React 19                  |
| Bundler   | Vite 6                    |
| Styling   | Tailwind CSS 4            |
| Type      | SPA (Single Page App)     |
| Port      | 3001                      |

## Commands

```bash
# Development
pnpm dev                    # Start Vite dev server (--host)
pnpm build                  # Production build (tsc + vite build)
pnpm preview                # Preview production build

# Code Quality
pnpm lint                   # ESLint with auto-fix
pnpm check-types            # TypeScript type check
```

## Project Structure

```
src/
  components/               # React components
  lib/                      # Utilities
  App.tsx                   # Root component
  main.tsx                  # Entry point
  index.css                 # Global styles (Tailwind CSS 4)

public/                     # Static assets
index.html                  # HTML template
vite.config.ts              # Vite configuration
postcss.config.mjs          # PostCSS + Tailwind config
```

## Tailwind CSS 4 Configuration

This template uses Tailwind CSS 4 with CSS-based configuration (no `tailwind.config.ts`):

```css
/* src/index.css */
@import '@repo/ui/globals.css';  /* Shared styles + CSS variables */
@source '../';                    /* Scan project for class names */
```

PostCSS configuration includes monorepo workspace resolution:
```javascript
// postcss.config.mjs
plugins: {
  '@tailwindcss/postcss': {
    base: resolve(__dirname, '../..'),  // Resolve workspace packages
  },
},
```

## Code Patterns

### Component Pattern

```typescript
import { cn } from '@repo/ui';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground'
      )}
    >
      {children}
    </button>
  );
}
```

### Styling with Tailwind

```typescript
import { cn } from '@repo/ui';

<div className={cn('bg-background', isActive && 'bg-primary')} />
```

## Code Style Rules

- Path alias: `@/` → `src/` (e.g., `@/components/Button`)
- NEVER use `as any`, `@ts-ignore`, `@ts-expect-error`
- Use `lucide-react` for icons
- Import shared components from `@repo/ui`
- Use `cn()` from `@repo/ui` for class merging

## Shared Packages Usage

```typescript
import { cn } from '@repo/ui';           // Tailwind class merger
import { APP_ENV } from '@repo/consts';  // Constants
import type { User } from '@repo/types'; // Shared types
```

## Adding Features

### Add Routing (Optional)

```bash
pnpm add react-router-dom
```

```typescript
// src/main.tsx
import { BrowserRouter } from 'react-router-dom';

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### Add State Management (Optional)

```bash
pnpm add zustand  # or jotai, @tanstack/react-query
```

### Add i18n (Optional)

```bash
pnpm add react-i18next i18next
```

## Environment Variables

Vite uses `VITE_` prefix for client-side env vars:

```bash
# .env
VITE_API_URL=http://localhost:8000
```

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Mobile WebView Integration

이 웹 앱은 Mobile 앱의 WebView에서도 실행됩니다:

- `--host`: 모바일 디바이스에서 접근 가능
- Android 에뮬레이터: `10.0.2.2:3001`
- iOS 시뮬레이터: `localhost:3001`

## Common Issues

- **HMR 오류**: Vite 서버 재시작
- **타입 오류**: `pnpm check-types` 실행
- **빌드 오류**: `dist/` 폴더 삭제 후 재빌드
- **Tailwind 클래스 미적용**: `@source` directive 확인, PostCSS `base` 설정 확인
