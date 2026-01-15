# CLAUDE.md - @repo/consts

> **IMPORTANT**: 이 파일은 consts 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item       | Value                    |
| ---------- | ------------------------ |
| Name       | @repo/consts             |
| Role       | 공유 상수 정의            |
| Entry      | ./dist/index.js          |
| Types      | ./dist/index.d.ts        |

## Commands

```bash
pnpm build          # TypeScript 컴파일
pnpm dev            # Watch 모드
pnpm clean          # dist 폴더 삭제
pnpm check-types    # 타입 검사
pnpm lint           # ESLint 실행
```

## Project Structure

```
src/
  index.ts          # Export aggregator
  app-env.const.ts  # 애플리케이션 환경 상수
  user.const.ts     # 사용자 관련 상수
```

## Exports

### APP_ENV

애플리케이션 실행 환경 정의:

```typescript
const APP_ENV = {
  TEST: 'test',           // 테스트 환경
  LOCAL: 'local',         // 로컬 개발 환경
  DEVELOPMENT: 'development', // 개발 서버
  PRODUCTION: 'production',   // 프로덕션
} as const;

type AppEnv = 'test' | 'local' | 'development' | 'production';
```

### User Constants

사용자 관련 상수:

```typescript
const USER_NAME_MAX_LENGTH = 50;  // 사용자 이름 최대 길이
```

## Usage

```typescript
import { APP_ENV, AppEnv, USER_NAME_MAX_LENGTH } from '@repo/consts';

// 환경 체크
if (process.env.APP_ENV === APP_ENV.PRODUCTION) {
  // 프로덕션 전용 로직
}

// 타입으로 사용
function setEnv(env: AppEnv) { ... }

// 유효성 검사에 활용
if (name.length > USER_NAME_MAX_LENGTH) {
  throw new Error('Name too long');
}
```

## Adding New Constants

1. 관련 도메인별로 파일 생성 (`*.const.ts`)
2. `as const` 단언으로 리터럴 타입 보존
3. 필요시 유니온 타입도 함께 export
4. `src/index.ts`에서 export 추가

### Pattern

```typescript
// src/example.const.ts
export const EXAMPLE_VALUES = {
  OPTION_A: 'option_a',
  OPTION_B: 'option_b',
} as const;

export type ExampleValue = (typeof EXAMPLE_VALUES)[keyof typeof EXAMPLE_VALUES];
```
