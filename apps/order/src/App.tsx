import { useState } from 'react';
import { cn } from '@repo/ui';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo } from '@/lib/api';
import { todoQueryKeys } from '@/lib/demo.query-keys';
import { Providers } from '@/app/providers';

function TodoDemo() {
  const [newTitle, setNewTitle] = useState('');
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError, refetch } = useQuery({
    queryKey: todoQueryKeys.list(),
    queryFn: fetchTodos,
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      toast.success('할 일이 추가되었습니다');
      void queryClient.invalidateQueries({ queryKey: todoQueryKeys.all });
      setNewTitle('');
    },
  });

  const handleAdd = () => {
    if (newTitle.trim()) {
      mutation.mutate(newTitle.trim());
    }
  };

  return (
    <div className="space-y-8">
      <section className={cn('border rounded-lg p-6 bg-muted/30')}>
        <h2 className="text-xl font-semibold mb-4">Toast 데모</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => toast.success('성공적으로 저장했습니다')}
            className={cn('px-4 py-2 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700')}
          >
            Success
          </button>
          <button
            onClick={() => toast.error('오류가 발생했습니다')}
            className={cn('px-4 py-2 rounded text-sm font-medium bg-red-600 text-white hover:bg-red-700')}
          >
            Error
          </button>
          <button
            onClick={() => toast.info('정보 알림입니다')}
            className={cn('px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700')}
          >
            Info
          </button>
          <button
            onClick={() => toast.warning('주의가 필요합니다')}
            className={cn('px-4 py-2 rounded text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600')}
          >
            Warning
          </button>
        </div>
      </section>

      <section className={cn('border rounded-lg p-6 bg-muted/30')}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">React Query 데모</h2>
          <button
            onClick={() => void refetch()}
            className={cn('px-3 py-1.5 rounded text-sm font-medium bg-primary text-primary-foreground hover:opacity-90')}
          >
            새로고침
          </button>
        </div>
        {isLoading && <p className="text-muted-foreground">로딩 중...</p>}
        {isError && <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>}
        {todos && (
          <ul className="space-y-2">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded bg-background border text-sm',
                  todo.completed && 'text-muted-foreground line-through',
                )}
              >
                <span
                  className={cn(
                    'w-2 h-2 rounded-full shrink-0',
                    todo.completed ? 'bg-muted-foreground' : 'bg-primary',
                  )}
                />
                {todo.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={cn('border rounded-lg p-6 bg-muted/30')}>
        <h2 className="text-xl font-semibold mb-4">Mutation + Toast 통합 데모</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="새 할 일 입력..."
            className={cn(
              'flex-1 px-3 py-2 rounded border bg-background text-foreground text-sm',
              'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary',
            )}
          />
          <button
            onClick={handleAdd}
            disabled={mutation.isPending || !newTitle.trim()}
            className={cn(
              'px-4 py-2 rounded text-sm font-medium bg-primary text-primary-foreground',
              'hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            {mutation.isPending ? '추가 중...' : '추가'}
          </button>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Providers>
      <div className={cn('min-h-screen bg-background text-foreground')}>
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Vite + React 템플릿 데모</h1>
          <p className="text-muted-foreground mb-8 text-sm">Toast(sonner) + React Query 통합 예시입니다.</p>
          <TodoDemo />
        </main>
      </div>
    </Providers>
  );
}

export default App;
