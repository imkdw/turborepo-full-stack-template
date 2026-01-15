# CLAUDE.md - @repo/exception

> **IMPORTANT**: 이 파일은 exception 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item       | Value                       |
| ---------- | --------------------------- |
| Name       | @repo/exception             |
| Role       | 예외 코드 및 메시지 정의     |
| Entry      | ./dist/index.js             |
| Types      | ./dist/index.d.ts           |

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
  index.ts                  # Export aggregator
  exception-codes.ts        # 전체 예외 코드 통합
  user-exception-codes.ts   # 사용자 도메인 예외 코드
```

## Exports

### EXCEPTION_CODES

모든 도메인의 예외 코드를 통합한 객체:

```typescript
const EXCEPTION_CODES = {
  USER_NOT_FOUND: 'USER-0001',
  // ... 다른 도메인 코드들이 추가됨
} as const;

type ExceptionCode = 'USER-0001' | ...;
```

### USER_EXCEPTION_CODES

사용자 도메인 전용 예외 코드:

```typescript
const USER_EXCEPTION_CODES = {
  USER_NOT_FOUND: 'USER-0001',
} as const;
```

### USER_EXCEPTION_MESSAGES

예외 코드별 한글 메시지:

```typescript
const USER_EXCEPTION_MESSAGES = {
  'USER-0001': '사용자를 찾을 수 없습니다',
};
```

## Usage

```typescript
import {
  EXCEPTION_CODES,
  ExceptionCode,
  USER_EXCEPTION_MESSAGES
} from '@repo/exception';
import { CustomException } from '@repo/server-shared';

// API에서 예외 발생
throw new CustomException({
  message: USER_EXCEPTION_MESSAGES[EXCEPTION_CODES.USER_NOT_FOUND],
  errorCode: EXCEPTION_CODES.USER_NOT_FOUND,
  statusCode: 404,
});

// 클라이언트에서 에러 처리
if (error.errorCode === EXCEPTION_CODES.USER_NOT_FOUND) {
  // 사용자 찾을 수 없음 처리
}
```

## Adding New Exception Codes

### 1. 새 도메인 예외 파일 생성

```typescript
// src/order-exception-codes.ts
export const ORDER_EXCEPTION_CODES = {
  ORDER_NOT_FOUND: 'ORDER-0001',
  INVALID_ORDER_STATUS: 'ORDER-0002',
} as const;

type OrderExceptionCode = (typeof ORDER_EXCEPTION_CODES)[keyof typeof ORDER_EXCEPTION_CODES];

export const ORDER_EXCEPTION_MESSAGES: Record<OrderExceptionCode, string> = {
  [ORDER_EXCEPTION_CODES.ORDER_NOT_FOUND]: '주문을 찾을 수 없습니다',
  [ORDER_EXCEPTION_CODES.INVALID_ORDER_STATUS]: '잘못된 주문 상태입니다',
};
```

### 2. exception-codes.ts에 통합

```typescript
// src/exception-codes.ts
import { USER_EXCEPTION_CODES } from './user-exception-codes';
import { ORDER_EXCEPTION_CODES } from './order-exception-codes';

export const EXCEPTION_CODES = {
  ...USER_EXCEPTION_CODES,
  ...ORDER_EXCEPTION_CODES,
} as const;
```

### 3. index.ts에서 export

```typescript
export * from './exception-codes';
export * from './user-exception-codes';
export * from './order-exception-codes';
```

## Code Naming Convention

예외 코드는 `{도메인}-{4자리 숫자}` 형식:

| 도메인   | 접두사  | 예시        |
| -------- | ------- | ----------- |
| User     | USER    | USER-0001   |
| Order    | ORDER   | ORDER-0001  |
| Payment  | PAYMENT | PAYMENT-0001|
| Auth     | AUTH    | AUTH-0001   |
