# CLAUDE.md - @repo/utils

> **IMPORTANT**: 이 파일은 utils 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item       | Value                      |
| ---------- | -------------------------- |
| Name       | @repo/utils                |
| Role       | 공유 유틸리티 함수          |
| Entry      | ./dist/index.js            |
| Types      | ./dist/index.d.ts          |
| Status     | 확장 가능한 기본 구조       |

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
  index.ts          # Main export aggregator
  client/           # 클라이언트 전용 유틸리티 (향후)
    index.ts
  server/           # 서버 전용 유틸리티 (향후)
    index.ts
```

## Exports

현재 확장을 위한 빈 구조입니다. 세 가지 진입점 제공:

| Export Path         | 용도                        |
| ------------------- | --------------------------- |
| `@repo/utils`       | 공통 유틸리티               |
| `@repo/utils/client`| 클라이언트(브라우저) 전용   |
| `@repo/utils/server`| 서버(Node.js) 전용          |

## Usage

```typescript
// 공통 유틸리티
import { someUtil } from '@repo/utils';

// 클라이언트 전용
import { clientUtil } from '@repo/utils/client';

// 서버 전용
import { serverUtil } from '@repo/utils/server';
```

## Adding New Utilities

1. 유틸리티 성격에 따라 적절한 디렉토리 선택:
   - 공통: `src/` 루트
   - 클라이언트 전용: `src/client/`
   - 서버 전용: `src/server/`
2. 새 파일 생성 및 함수 구현
3. 해당 `index.ts`에서 export 추가
4. `pnpm build` 실행

## Guidelines

- 순수 함수 작성 권장 (부작용 최소화)
- 클라이언트/서버 환경 구분하여 배치
- 브라우저 API 사용 시 → `client/`
- Node.js API 사용 시 → `server/`
- 환경 무관 시 → 루트
