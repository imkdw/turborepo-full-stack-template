// Mock API functions for demo purposes
// Replace these with actual API calls in your project

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const mockTodos: Todo[] = [
  { id: 1, title: 'Learn React Query', completed: true },
  { id: 2, title: 'Build awesome app', completed: false },
  { id: 3, title: 'Deploy to production', completed: false },
];

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchTodos(): Promise<Todo[]> {
  await delay(800); // Simulate network latency
  return [...mockTodos];
}

export async function createTodo(title: string): Promise<Todo> {
  await delay(500); // Simulate network latency
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };
  mockTodos.push(newTodo);
  return newTodo;
}
