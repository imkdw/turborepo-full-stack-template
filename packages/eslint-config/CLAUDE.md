# CLAUDE.md - @repo/eslint-config

> **IMPORTANT**: 이 파일은 @repo/eslint-config 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item | Value |
|------|-------|
| Package Name | @repo/eslint-config |
| Version | 0.0.0 |
| Type | Module (ESM) |
| Privacy | Private (workspace package) |
| ESLint Version | 9.18.0+ |
| Config Format | Flat Config (ESLint v9+) |

## Available Presets

| Preset | Export Path | 사용처 |
|--------|-------------|--------|
| base | @repo/eslint-config/base | 모든 프로젝트 공통 |
| nestjs | @repo/eslint-config/nestjs | NestJS 백엔드 (apps/api) |
| next-js | @repo/eslint-config/next-js | Next.js 프론트엔드 (apps/web) |
| react-internal | @repo/eslint-config/react-internal | React 라이브러리 (packages/ui) |

## Project Structure

```
packages/eslint-config/
├── package.json              # 패키지 설정 및 exports
├── README.md                 # 프리셋 설명
├── base.js                   # 기본 설정 (모든 프리셋의 기반)
├── nestjs.js                 # NestJS 프리셋
├── next.js                   # Next.js 프리셋
└── react-internal.js         # React 내부 라이브러리 프리셋
```

## Preset Details

### 1. BASE Preset (`base.js`)

**목적**: 모든 프로젝트의 기반이 되는 TypeScript/JavaScript 린트 규칙

**확장 설정**:
- `@eslint/js` recommended
- `eslint-config-prettier`
- `typescript-eslint` recommended + strict

**주요 플러그인**:
- `turbo` - Turborepo 규칙
- `import` - import 구문 린트

**핵심 규칙**:
```javascript
{
  'no-console': 'error',                              // console 금지
  '@typescript-eslint/no-explicit-any': 'error',      // any 타입 금지
  '@typescript-eslint/no-unused-vars': 'error',       // 미사용 변수 금지
  '@typescript-eslint/prefer-optional-chain': 'error', // 옵셔널 체이닝 권장
  '@typescript-eslint/prefer-nullish-coalescing': 'error', // nullish 연산자 권장
  '@typescript-eslint/no-unnecessary-condition': 'error',  // 불필요한 조건 금지
  'import/newline-after-import': 'error',             // import 후 줄바꿈
}
```

**무시 패턴**: `dist/**`, `build/**`, `.next/**`, `node_modules/**`

---

### 2. NESTJS Preset (`nestjs.js`)

**목적**: NestJS 백엔드 애플리케이션용 설정

**확장**: base 프리셋

**추가 환경 변수**:
- `globals.node` - Node.js 전역 변수
- `globals.jest` - Jest 테스트 전역 변수

**규칙 오버라이드**:
```javascript
{
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // _로 시작하는 변수 허용
  'no-console': 'warn',                              // console warning으로 완화
  '@typescript-eslint/no-extraneous-class': 'off',   // 빈 클래스 허용 (서비스/컨트롤러)
  '@typescript-eslint/no-useless-constructor': 'off', // 빈 생성자 허용 (DI)
  '@typescript-eslint/parameter-properties': 'off',  // 생성자 파라미터 프로퍼티 허용
}
```

---

### 3. NEXT-JS Preset (`next.js`)

**목적**: Next.js 프론트엔드 애플리케이션용 설정

**확장**: base 프리셋

**추가 플러그인**:
- `@next/next` - Next.js 규칙
- `react-hooks` - React Hooks 규칙
- `react` - React 규칙

**추가 환경 변수**:
- `globals.browser` - 브라우저 전역 변수
- `globals.serviceworker` - Service Worker 전역 변수

**핵심 규칙**:
```javascript
{
  '@next/next/no-img-element': 'error',        // next/image 사용 강제
  '@next/next/no-html-link-for-pages': 'error', // next/link 사용 강제
  'react/react-in-jsx-scope': 'off',           // React import 불필요 (React 17+)
  'react-hooks/exhaustive-deps': 'error',      // Hook 의존성 배열 검사
  'react/jsx-key': 'error',                    // 리스트 key 필수
  'no-console': 'warn',                        // console warning으로 완화
}
```

---

### 4. REACT-INTERNAL Preset (`react-internal.js`)

**목적**: 내부 React 컴포넌트 라이브러리용 (Next.js 없이)

**확장**: base 프리셋

**추가 플러그인**:
- `react-hooks` - React Hooks 규칙
- `react` - React 규칙

**추가 환경 변수**:
- `globals.browser` - 브라우저 전역 변수
- `globals.serviceworker` - Service Worker 전역 변수

**최소 설정**: 플러그인 기본값 대부분 사용

## Usage

### 패키지에서 사용

```javascript
// eslint.config.mjs
import baseConfig from '@repo/eslint-config/base';

export default [...baseConfig];
```

```javascript
// NestJS 프로젝트
import nestjsConfig from '@repo/eslint-config/nestjs';

export default [...nestjsConfig];
```

```javascript
// Next.js 프로젝트
import nextJsConfig from '@repo/eslint-config/next-js';

export default [...nextJsConfig];
```

```javascript
// React 라이브러리
import reactInternalConfig from '@repo/eslint-config/react-internal';

export default [...reactInternalConfig];
```

## Dependencies

```json
{
  "@eslint/js": "^9.33.0",
  "@next/eslint-plugin-next": "^15.5.0",
  "eslint": "^9.18.0",
  "eslint-config-prettier": "^10.1.1",
  "eslint-plugin-import": "^2.31.0",
  "eslint-plugin-react": "^7.37.5",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-turbo": "^2.5.0",
  "globals": "^16.3.0",
  "typescript": "^5.9.2",
  "typescript-eslint": "^8.40.0"
}
```

## Preset Comparison

| 규칙 | base | nestjs | next-js | react-internal |
|-----|------|--------|---------|----------------|
| no-console | error | warn | warn | error |
| Node globals | - | O | - | - |
| Browser globals | - | - | O | O |
| Jest globals | - | O | - | - |
| React 플러그인 | - | - | O | O |
| Next.js 플러그인 | - | - | O | - |
| 빈 클래스 허용 | X | O | X | X |

## Code Patterns

### Flat Config 패턴
```javascript
// ESLint v9+ Flat Config 형식 사용
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // 커스텀 규칙
    }
  }
];
```

### 설정 확장 패턴
```javascript
// 기존 프리셋을 스프레드하여 확장
import baseConfig from './base.js';

export default [
  ...baseConfig,
  {
    // 추가 설정
  }
];
```
