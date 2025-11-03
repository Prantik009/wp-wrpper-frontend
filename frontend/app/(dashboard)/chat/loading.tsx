// app/(dashboard)/chat/loading.tsx
export default function ChatLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      <div className="animate-pulse space-y-3 text-center">
        <div className="h-6 w-48 bg-muted rounded-md mx-auto" />
        <div className="h-4 w-64 bg-muted rounded-md mx-auto" />
      </div>
    </div>
  );
}
