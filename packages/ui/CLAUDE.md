# CLAUDE.md - UI Package (@repo/ui)

> **IMPORTANT**: 이 파일은 UI 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item              | Value                                        |
| ----------------- | -------------------------------------------- |
| Package Name      | @repo/ui                                     |
| Version           | 0.0.1                                        |
| Tailwind Version  | 3                                            |
| Peer Dependencies | react ^18 \|\| ^19, react-dom ^18 \|\| ^19   |
| Dark Mode         | class 기반                                   |

## Commands

```bash
# Development
pnpm dev              # Development ready message

# Code Quality
pnpm lint             # ESLint with auto-fix
pnpm check-types      # TypeScript type check
```

## Project Structure

```
src/
  index.ts                   # Main entry point (re-exports)
  lib/
    utils.ts                 # cn() utility function
  styles/
    globals.css              # Global CSS variables (light/dark)
  tokens/
    tailwind-preset.ts       # Tailwind configuration preset
```

## Export Points

| Import Path               | Description                    |
| ------------------------- | ------------------------------ |
| `@repo/ui`                | cn(), cva, VariantProps        |
| `@repo/ui/globals.css`    | Global CSS with CSS variables  |
| `@repo/ui/tailwind-preset`| Tailwind preset configuration  |

## Usage

### 1. cn() Utility Function

Tailwind 클래스명을 병합하고 충돌을 해결합니다:

```typescript
import { cn } from '@repo/ui';

// 조건부 클래스 병합
<div className={cn('p-4', isActive && 'bg-primary', className)} />

// 충돌 해결 (p-2가 우선됨)
cn('p-4', 'p-2') // → 'p-2'
```

### 2. CVA (Class Variance Authority)

컴포넌트 변형을 관리합니다:

```typescript
import { cva, type VariantProps } from '@repo/ui';

const buttonVariants = cva('rounded-md font-medium', {
  variants: {
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
    },
    variant: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

type ButtonProps = VariantProps<typeof buttonVariants>;
```

### 3. Tailwind Preset

다른 앱에서 Tailwind 설정을 확장합니다:

```typescript
// tailwind.config.ts
import { tailwindPreset } from '@repo/ui/tailwind-preset';

export default {
  presets: [tailwindPreset],
  // ... other config
};
```

### 4. Global CSS

전역 스타일과 CSS 변수를 가져옵니다:

```typescript
// app/layout.tsx or _app.tsx
import '@repo/ui/globals.css';
```

## CSS Variables (Color System)

HSL 기반 CSS 변수로 테마를 정의합니다:

| Variable               | Description              |
| ---------------------- | ------------------------ |
| `--background`         | 페이지 배경색            |
| `--foreground`         | 기본 텍스트 색상         |
| `--primary`            | 주요 액션/브랜드 색상    |
| `--secondary`          | 보조 요소 색상           |
| `--muted`              | 비활성/흐린 요소         |
| `--accent`             | 강조 색상                |
| `--destructive`        | 삭제/위험 액션           |
| `--border`             | 테두리 색상              |
| `--ring`               | 포커스 링 색상           |
| `--radius`             | 기본 border-radius       |

각 색상에는 `-foreground` 변형이 함께 제공됩니다 (예: `--primary-foreground`).

## Animations

프리셋에 포함된 애니메이션:

| Class          | Description                     |
| -------------- | ------------------------------- |
| `animate-fade-in`   | 0.2s ease-out 페이드 인    |
| `animate-fade-out`  | 0.2s ease-out 페이드 아웃  |
| `animate-slide-up`  | 0.3s ease-out 슬라이드 업  |
| `animate-slide-down`| 0.3s ease-out 슬라이드 다운|

## Adding New Components

1. `src/components/` 디렉토리 생성 (필요시)
2. CVA로 변형 정의
3. `src/index.ts`에서 export
4. 다크모드 스타일 확인

## Code Style Rules

- CSS 변수는 반드시 `hsl()` 함수와 함께 사용
- 색상 값은 HSL 형식 (예: `222.2 84% 4.9%`)
- 다크모드는 `.dark` 클래스로 토글
- 클래스 병합시 항상 `cn()` 사용
