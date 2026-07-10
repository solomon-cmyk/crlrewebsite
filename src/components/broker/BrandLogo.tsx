import Image from "next/image";
import Link from "next/link";
import { LOGOS } from "@/lib/assets";

export function BrandLogo({
  href = "/#top",
  onClick,
  compact = false,
}: {
  href?: string;
  onClick?: () => void;
  compact?: boolean;
}) {
  const img = (
    <Image
      src={LOGOS.crlreWordmark}
      alt="Costa Rica Luxury Real Estate"
      width={900}
      height={220}
      className={`logo-img${compact ? " logo-img--compact" : ""}`}
      priority
      sizes="(max-width: 660px) 160px, 220px"
    />
  );

  if (href.includes("#")) {
    return (
      <a className="brand" href={href} onClick={onClick} aria-label="Costa Rica Luxury Real Estate">
        {img}
      </a>
    );
  }

  return (
    <Link className="brand" href={href} onClick={onClick} aria-label="Costa Rica Luxury Real Estate">
      {img}
    </Link>
  );
}
