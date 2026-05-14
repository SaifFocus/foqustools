import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/foqustools-logo.png";

export function Logo() {
  return (
    <Link to="/" aria-label="FoqusTools — home" className="flex items-center group">
      <img
        src={logoSrc}
        alt="FoqusTools"
        className="h-9 md:h-10 w-auto transition-transform group-hover:scale-[1.03]"
      />
    </Link>
  );
}