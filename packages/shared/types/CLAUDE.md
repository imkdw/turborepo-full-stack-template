# CLAUDE.md - @repo/types

> **IMPORTANT**: 이 파일은 types 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item       | Value                    |
| ---------- | ------------------------ |
| Name       | @repo/types              |
| Role       | 공유 TypeScript 타입 정의 |
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
  index.ts                      # Export aggregator
  exception-response.type.ts    # API 예외 응답 인터페이스
```

## Dependencies

- `@repo/consts`: 공유 상수 (AppEnv 등)
- `@repo/exception`: 예외 코드 정의

## Exports

### ExceptionResponse

API 예외 응답 형식을 정의하는 인터페이스:

```typescript
interface ExceptionResponse {
  statusCode: number;    // HTTP 상태 코드
  errorCode: string;     // 예외 코드 (e.g., 'USER-0001')
  path: string;          // 요청 경로
  stack?: unknown;       // 스택 트레이스 (개발 환경)
}
```

## Usage

```typescript
import { ExceptionResponse } from '@repo/types';

const response: ExceptionResponse = {
  statusCode: 404,
  errorCode: 'USER-0001',
  path: '/api/v1/users/123',
};
```

## Adding New Types

1. `src/` 디렉토리에 새 타입 파일 생성 (`*.type.ts`)
2. `src/index.ts`에서 export 추가
3. `pnpm build` 실행
