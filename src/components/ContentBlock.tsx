export default function ContentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow-sm rounded-md overflow-hidden h-full w-full">
      {children}
    </div>
  );
}
