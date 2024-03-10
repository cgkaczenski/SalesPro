import { cn } from "@/lib/utils";

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: H1Props) {
  return (
    <h1
      className={cn(
        "text-base font-semibold leading-7 text-gray-900",
        className
      )}
    >
      {children}
    </h1>
  );
}
