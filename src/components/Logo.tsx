import logo from "@/assets/al-zad-logo.png";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="AL ZAD"
      className={`${className} object-contain animate-flicker`}
      width={80}
      height={80}
    />
  );
}
