import { QueryClient, type DefaultOptions } from '@tanstack/react-query';

export const defaultQueryOptions: DefaultOptions = {
  queries: {
    staleTime: 60 * 1000, // 1분간 fresh 유지
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: 1, // 1회 재시도
    refetchOnWindowFocus: false, // 윈도우 포커스 시 refetch 안함
  },
  mutations: {
    retry: 0, // mutation은 재시도 안함
  },
};

export function createQueryClient(overrides?: DefaultOptions): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { ...defaultQueryOptions.queries, ...overrides?.queries },
      mutations: { ...defaultQueryOptions.mutations, ...overrides?.mutations },
    },
  });
}

export const queryClient = createQueryClient();
