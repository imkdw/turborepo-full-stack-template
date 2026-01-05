export const USER_EXCEPTION_CODES = {
  USER_NOT_FOUND: 'USER-0001',
} as const;

type UserExceptionCode = (typeof USER_EXCEPTION_CODES)[keyof typeof USER_EXCEPTION_CODES];

export const USER_EXCEPTION_MESSAGES: Record<UserExceptionCode, string> = {
  [USER_EXCEPTION_CODES.USER_NOT_FOUND]: '사용자를 찾을 수 없습니다',
};
