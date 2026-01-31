# CLAUDE.md - @repo/server-shared

> **IMPORTANT**: 이 파일은 @repo/server-shared 패키지의 구조나 패턴이 변경될 때 반드시 함께 업데이트해야 합니다.

## Quick Reference

| Item | Value |
|------|-------|
| Package Name | @repo/server-shared |
| Version | 0.0.1 |
| Type | Private (workspace package) |
| Entry Point | ./dist/index.js |
| Types Entry | ./dist/index.d.ts |
| Node.js | 22+ |
| TypeScript | 5.9.2 |

## Commands

```bash
# 빌드
pnpm build              # Prisma generate + TypeScript 컴파일 → dist/

# 개발 모드
pnpm dev                # Prisma generate + Watch 모드 컴파일

# 타입 체크
pnpm check-types        # Prisma generate + tsc --noEmit

# Prisma
pnpm prisma studio      # Prisma Studio 실행
pnpm prisma generate    # Prisma 클라이언트 생성
pnpm prisma db push     # 스키마를 DB에 반영

# 린트
pnpm lint               # ESLint 자동 수정

# 클린
pnpm clean              # dist/ 폴더 삭제
```

## Project Structure

```
prisma/
└── schema/
    ├── schema.prisma           # Prisma 설정 + generator
    └── user.prisma             # User 모델
src/
├── index.ts                    # 메인 배럴 export
├── config/                     # 설정 관리 모듈
│   ├── index.ts
│   ├── my-config.module.ts     # @Global() 설정 모듈
│   ├── my-config.service.ts    # 타입 안전한 설정 접근
│   └── my-config.schema.ts     # Zod 검증 스키마
├── database/                   # 데이터베이스 모듈
│   ├── index.ts
│   ├── database.module.ts      # @Global() Prisma 모듈
│   └── prisma.service.ts       # Prisma 클라이언트 서비스
├── exception/                  # 커스텀 예외
│   ├── index.ts
│   └── user-not-found.exception.ts
├── filter/                     # 예외 필터
│   ├── index.ts
│   ├── all-exception.filter.ts     # 전역 예외 핸들러
│   ├── custom-exception.filter.ts  # CustomException 핸들러
│   └── custom.exception.ts         # 커스텀 예외 베이스 클래스
├── interceptor/                # HTTP 인터셉터
│   ├── index.ts
│   ├── logging.interceptor.ts      # 요청/응답 로깅
│   └── transform.interceptor.ts    # 응답 래핑 { data: ... }
└── logger/                     # 로깅 시스템
    ├── index.ts
    ├── logger.config.ts            # Winston 설정 팩토리
    ├── logger.const.ts             # 로그 레벨 상수
    └── transport/
        └── loki.transport.ts       # Grafana Loki 트랜스포트
```

## Core Modules

### 1. Configuration Module

```typescript
// MyConfigModule - 전역 설정 모듈
// .env 파일 로드 및 Zod 스키마로 검증
import { MyConfigModule, MyConfigService } from '@repo/server-shared';

// 사용 예시
@Injectable()
export class SomeService {
  constructor(private config: MyConfigService) {
    const port = this.config.get('API_PORT');  // number 타입
    const env = this.config.get('APP_ENV');    // AppEnv 타입
  }
}
```

**설정 스키마 (MyConfig):**
- `DATABASE_URL`: string (필수)
- `API_PORT`: number (필수, 자동 변환)
- `APP_ENV`: TEST | LOCAL | DEVELOPMENT | PRODUCTION (필수)
- `SWAGGER_USERNAME`: string (선택)
- `SWAGGER_PASSWORD`: string (선택)

### 2. Database Module (Prisma 소유)

이 패키지가 Prisma 스키마의 소유자입니다. `prisma/schema/` 디렉토리에 스키마 파일이 있으며, 빌드 시 `prisma generate`가 먼저 실행됩니다. 모든 Prisma 타입(`User` 등)은 이 패키지에서 re-export됩니다.

```typescript
// DatabaseModule - 전역 Prisma 모듈
import { DatabaseModule, PrismaService, User } from '@repo/server-shared';

// PrismaService는 OnModuleInit, OnModuleDestroy 구현
// 자동으로 연결/해제 관리
```

### 3. Exception Handling

```typescript
// CustomException - 베이스 예외 클래스
import { CustomException, CustomExceptionFilter, AllExceptionFilter } from '@repo/server-shared';

// 커스텀 예외 생성
class MyException extends CustomException {
  constructor() {
    super('ERROR_CODE', HttpStatus.BAD_REQUEST, '에러 메시지');
  }
}

// 응답 형식 (ExceptionResponse)
{
  statusCode: number;
  errorCode: string;
  path: string;
  stack?: string;  // LOCAL 환경에서만
}
```

### 4. Interceptors

```typescript
// TransformInterceptor - 모든 응답을 { data: ... }로 래핑
// LoggingInterceptor - 요청/응답 로깅 (환경별 로그 레벨)

// main.ts에서 적용
app.useGlobalInterceptors(
  new LoggingInterceptor(logger, configService),
  new TransformInterceptor()
);
```

### 5. Logger System

```typescript
import { createLoggerConfig, LOG_LEVEL } from '@repo/server-shared';

// 환경별 로거 설정
const loggerConfig = createLoggerConfig(env, {
  appName: 'api',
  lokiHost: 'http://loki:3100',
  lokiUsername: 'user',
  lokiToken: 'token'
});

// 로그 레벨: ERROR, WARN, INFO, HTTP, VERBOSE, DEBUG, SILLY
```

**환경별 로깅 동작:**
- **TEST**: Silent 모드 (출력 없음)
- **LOCAL**: 컬러 포맷, 타임스탬프, 컨텍스트 포함
- **PRODUCTION**: JSON 포맷 또는 Loki 트랜스포트

## Dependencies

### Internal Packages
- `@repo/consts` - APP_ENV, AppEnv 타입
- `@repo/exception` - EXCEPTION_CODES 상수
- `@repo/types` - ExceptionResponse 인터페이스

### External Dependencies
- `@nestjs/common`, `@nestjs/config`, `@nestjs/core`
- `@prisma/client` - ORM
- `nest-winston`, `winston` - 로깅
- `zod` - 스키마 검증
- `rxjs` - 리액티브 프로그래밍

## Code Patterns

### 전역 모듈 패턴
```typescript
@Global()
@Module({
  providers: [SomeService],
  exports: [SomeService],
})
export class SomeModule {}
```

### Zod 설정 검증 패턴
```typescript
const myConfigSchema = z.object({
  REQUIRED_FIELD: z.string(),
  OPTIONAL_FIELD: z.string().optional(),
  NUMERIC_FIELD: z.coerce.number(),  // 자동 숫자 변환
});

export type MyConfig = z.infer<typeof myConfigSchema>;
```

### 예외 필터 패턴
```typescript
@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    // 예외 처리 로직
  }
}
```

## Usage in apps/api

```typescript
// app.module.ts
@Module({
  imports: [MyConfigModule, DatabaseModule],
})
export class AppModule {}

// main.ts
const app = await NestFactory.create(AppModule);
app.useGlobalFilters(new AllExceptionFilter(...));
app.useGlobalInterceptors(
  new LoggingInterceptor(...),
  new TransformInterceptor()
);
```

## Exported API

```typescript
// 메인 export (src/index.ts)
export * from './config';       // MyConfigModule, MyConfigService, MyConfigSchema, MyConfig
export * from './database';     // DatabaseModule, PrismaService
export * from './exception';    // UserNotFoundException
export * from './filter';       // AllExceptionFilter, CustomExceptionFilter, CustomException
export * from './interceptor';  // TransformInterceptor, LoggingInterceptor
export * from './logger';       // createLoggerConfig, LOG_LEVEL, LokiTransport
```


<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

### Jan 31, 2026

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #60 | 1:07 AM | 🟣 | Added Prisma convenience scripts to server-shared package | ~376 |
</claude-mem-context>