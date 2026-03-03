export const todoQueryKeys = {
  all: ['todos'] as const,
  list: () => ['todos', 'list'] as const,
  detail: (id: number) => ['todos', 'detail', id] as const,
};
