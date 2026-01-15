# CLAUDE.md - @repo/typescript-config

> **IMPORTANT**: 이 파일은 @repo/typescript-config 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item | Value |
|------|-------|
| Package Name | @repo/typescript-config |
| Version | 0.0.0 |
| Privacy | Private (workspace package) |
| License | MIT |
| Target | ES2022 |

## Available Presets

| Preset | 파일명 | 사용처 |
|--------|--------|--------|
| base | base.json | 모든 프리셋의 기반 |
| nestjs | nestjs.json | NestJS 백엔드 (apps/api, packages/server-shared) |
| nextjs | nextjs.json | Next.js 프론트엔드 (apps/web) |
| react-library | react-library.json | React 라이브러리 (packages/ui) |

## Project Structure

```
packages/typescript-config/
├── package.json           # 패키지 메타데이터
├── base.json              # 기본 TypeScript 설정
├── nestjs.json            # NestJS용 설정 (extends base)
├── nextjs.json            # Next.js용 설정 (extends base)
└── react-library.json     # React 라이브러리용 설정 (extends base)
```

## Preset Details

### 1. BASE Preset (`base.json`)

**목적**: 모든 프리셋의 기반이 되는 엄격한 TypeScript 설정

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "incremental": true,
    "isolatedModules": true,
    "lib": ["es2022"],
    "moduleDetection": "force",
    "noUncheckedIndexedAccess": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "target": "ES2022",
    "noImplicitAny": true
  }
}
```

**핵심 옵션**:
| 옵션 | 값 | 설명 |
|------|-----|------|
| strict | true | 모든 strict 타입 체크 활성화 |
| strictNullChecks | true | null/undefined 엄격 검사 |
| noImplicitAny | true | 암시적 any 금지 |
| noUncheckedIndexedAccess | true | 인덱스 접근 시 undefined 체크 필수 |
| declaration | true | .d.ts 파일 생성 |
| target | ES2022 | ES2022로 컴파일 |

---

### 2. NESTJS Preset (`nestjs.json`)

**목적**: NestJS 백엔드 애플리케이션용 설정

**확장**: base.json

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "module": "CommonJS",
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "strictPropertyInitialization": false
  }
}
```

**핵심 옵션**:
| 옵션 | 값 | 설명 |
|------|-----|------|
| module | CommonJS | 백엔드용 모듈 시스템 |
| emitDecoratorMetadata | true | 데코레이터 메타데이터 (DI 필수) |
| experimentalDecorators | true | 데코레이터 지원 활성화 |
| strictPropertyInitialization | false | 미초기화 프로퍼티 허용 (NestJS 패턴) |
| sourceMap | true | 디버깅용 소스맵 |

---

### 3. NEXTJS Preset (`nextjs.json`)

**목적**: Next.js 프론트엔드 애플리케이션용 설정

**확장**: base.json

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "lib": ["es2022", "dom", "dom.iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": true,
    "jsx": "preserve",
    "noEmit": true,
    "incremental": true
  }
}
```

**핵심 옵션**:
| 옵션 | 값 | 설명 |
|------|-----|------|
| plugins | [{ name: "next" }] | Next.js 컴파일러 플러그인 |
| lib | [..., "dom", "dom.iterable"] | DOM 타입 포함 |
| module | ESNext | 최신 ES 모듈 |
| moduleResolution | Bundler | 번들러 스타일 모듈 해석 |
| jsx | preserve | JSX를 Next.js가 처리 |
| noEmit | true | 컴파일 출력 안함 (Next.js가 처리) |

---

### 4. REACT-LIBRARY Preset (`react-library.json`)

**목적**: 공유 React 컴포넌트 라이브러리용 설정

**확장**: base.json

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}
```

**핵심 옵션**:
| 옵션 | 값 | 설명 |
|------|-----|------|
| jsx | react-jsx | React 17+ JSX 변환 |

## Usage

### 프로젝트에서 사용

```json
// tsconfig.json
{
  "extends": "@repo/typescript-config/nestjs.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 각 앱별 설정 예시

**apps/api (NestJS)**:
```json
{
  "extends": "@repo/typescript-config/nestjs.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

**apps/web (Next.js)**:
```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**packages/ui (React Library)**:
```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

## Preset Comparison

| 옵션 | base | nestjs | nextjs | react-library |
|------|------|--------|--------|---------------|
| module | - | CommonJS | ESNext | (base 상속) |
| target | ES2022 | ES2022 | ES2022 | ES2022 |
| strict | O | O | O | O |
| jsx | - | - | preserve | react-jsx |
| decorators | - | O | - | - |
| noEmit | - | - | O | - |
| DOM types | - | - | O | - |

## Code Patterns

### 프리셋 확장 패턴
```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    // 추가/오버라이드 옵션
  }
}
```

### 모노레포 경로 참조
```json
{
  "compilerOptions": {
    "paths": {
      "@repo/*": ["../../packages/*"]
    }
  }
}
```

## 사용 현황

| 패키지 | 사용 프리셋 |
|--------|-------------|
| apps/api | nestjs.json |
| apps/web | nextjs.json |
| apps/mobile | - (Expo 별도) |
| apps/desktop | - (Electron 별도) |
| packages/ui | react-library.json |
| packages/server-shared | nestjs.json |
| packages/i18n | base.json |
| packages/shared/* | base.json |
