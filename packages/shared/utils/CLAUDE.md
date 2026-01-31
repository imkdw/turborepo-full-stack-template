# CLAUDE.md - @repo/utils

> **IMPORTANT**: 이 파일은 utils 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item  | Value              |
| ----- | ------------------ |
| Name  | @repo/utils        |
| Role  | 공유 유틸리티 함수 |
| Entry | ./dist/index.js    |
| Types | ./dist/index.d.ts  |

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
```

## Usage

```typescript
import { someUtil } from '@repo/utils';

// 향후 유틸리티 함수 추가 예시:
// formatDate, debounce, throttle 등
```

## Adding New Utilities

1. `src/` 디렉토리에 새 파일 생성 (예: `format.util.ts`)
2. 유틸리티 함수 구현
3. `src/index.ts`에서 export 추가
4. `pnpm build` 실행

### Pattern

```typescript
// src/example.util.ts
export function exampleUtil(input: string): string {
  return input.toUpperCase();
}

// src/index.ts
export { exampleUtil } from './example.util';
```

## Guidelines

- 순수 함수 작성 권장 (부작용 최소화)
- 명확한 함수명 사용 (동사 + 명사)
- 적절한 타입 정의
- 단위 테스트 추가 권장
