import { cn } from '@repo/ui';

function App() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Vite + React</h1>
        <p className="text-muted-foreground">
          Edit <code className="bg-muted px-1 rounded">src/App.tsx</code> and save to reload.
        </p>
      </main>
    </div>
  );
}

export default App;
