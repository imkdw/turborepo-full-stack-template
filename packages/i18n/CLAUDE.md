# CLAUDE.md - i18n Package (@repo/i18n)

> **IMPORTANT**: 이 파일은 i18n 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item              | Value                       |
| ----------------- | --------------------------- |
| Package Name      | @repo/i18n                  |
| Version           | 0.0.1                       |
| Default Locale    | ko (한국어)                 |
| Supported Locales | ko, en, ja                  |
| Module System     | ESNext                      |

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
  index.ts              # Main entry point (re-exports config)
  config.ts             # Core i18n configuration
```

## Export Points

| Import Path          | Description                  |
| -------------------- | ---------------------------- |
| `@repo/i18n`         | All exports from config      |
| `@repo/i18n/config`  | Direct config access         |

## Exports

### Constants

| Name            | Type                              | Description               |
| --------------- | --------------------------------- | ------------------------- |
| `locales`       | `readonly ['ko', 'en', 'ja']`     | 지원 언어 목록 (불변)     |
| `defaultLocale` | `'ko'`                            | 기본 언어 설정            |
| `localeNames`   | `Record<Locale, string>`          | 언어별 표시 이름          |
| `localeFlags`   | `Record<Locale, string>`          | 언어별 국기 이모지        |

### Types

| Name     | Definition              | Description                |
| -------- | ----------------------- | -------------------------- |
| `Locale` | `'ko' \| 'en' \| 'ja'`  | 유효한 언어 코드 유니온    |

### Functions

| Name            | Signature                             | Description                    |
| --------------- | ------------------------------------- | ------------------------------ |
| `isValidLocale` | `(value: unknown): value is Locale`   | 유효한 Locale인지 검증 (타입 가드) |

## Usage

### Basic Import

```typescript
import {
  locales,
  defaultLocale,
  Locale,
  localeNames,
  localeFlags,
  isValidLocale
} from '@repo/i18n';
```

### Type-Safe Locale Handling

```typescript
// 타입으로 사용
function setLanguage(locale: Locale) {
  // locale은 'ko' | 'en' | 'ja' 중 하나만 가능
}

// 런타임 검증
const userInput = 'ko';
if (isValidLocale(userInput)) {
  // userInput은 Locale 타입으로 좁혀짐
  setLanguage(userInput);
}
```

### Locale Metadata

```typescript
// 언어 선택 UI 구성
locales.map(locale => ({
  code: locale,
  name: localeNames[locale],   // '한국어', 'English', '日本語'
  flag: localeFlags[locale],   // '🇰🇷', '🇺🇸', '🇯🇵'
}));
```

### Next.js Integration Example

```typescript
// next.config.ts
import { locales, defaultLocale } from '@repo/i18n';

export default {
  i18n: {
    locales: [...locales],
    defaultLocale,
  },
};
```

## Supported Languages

| Code | Name     | Flag | Description |
| ---- | -------- | ---- | ----------- |
| `ko` | 한국어   | 🇰🇷   | 기본 언어   |
| `en` | English  | 🇺🇸   | 영어        |
| `ja` | 日本語   | 🇯🇵   | 일본어      |

## Adding New Locale

1. `config.ts`의 `locales` 배열에 새 언어 코드 추가
2. `localeNames`에 표시 이름 추가
3. `localeFlags`에 국기 이모지 추가
4. 타입 체크 실행 (`pnpm check-types`)

```typescript
// 예: 중국어 추가
export const locales = ['ko', 'en', 'ja', 'zh'] as const;

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

export const localeFlags: Record<Locale, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵',
  zh: '🇨🇳',
};
```

## Code Style Rules

- `locales` 배열은 `as const`로 불변 유지
- 새 언어 추가 시 모든 `Record<Locale, *>` 객체 업데이트 필수
- `isValidLocale()`로 외부 입력 검증 권장
