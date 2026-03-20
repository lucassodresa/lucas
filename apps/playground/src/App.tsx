import { Button } from '@lucas/ui';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>@lucas/ui Playground</h1>
      <p>Import and render components from @lucas/ui here.</p>
      <Button>Lucas</Button>
      <Button variant="link" href="aaa">
        Lucas
      </Button>
      <Button variant="secondary">Lucas</Button>
      <Button variant="ghost">Lucas</Button>
      <Button variant="danger">Lucas</Button>
      <Button isLoading>Lucas</Button>
      <Button disabled>Lucas</Button>
    </div>
  );
}
