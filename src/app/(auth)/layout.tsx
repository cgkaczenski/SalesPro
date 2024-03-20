export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen overflow-hidden">
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
}
