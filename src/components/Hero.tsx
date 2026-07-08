import { IMAGES, LOGOS } from "@/lib/assets";
import { heroStripItems } from "@/lib/content";
import Image from "next/image";

export function Ribbon() {
  return (
    <div className="ribbon">
      Illustrative estimates only · All figures are subject to change and depend on market
      conditions and other factors outside our control · Not a projection or guarantee
    </div>
  );
}

export function Hero() {
  return (
    <div className="hero">
      <div className="hero-bg" aria-hidden="true">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
        />
      </div>
      <div className="wrap">
        <div className="hero-top">
          <div className="brandmark">
            <Image
              src={LOGOS.horizontalWhite}
              alt="Maravé LXR Residences"
              width={220}
              height={48}
              className="hero-logo"
              priority
            />
          </div>
          <div className="hero-tag">Manuel Antonio · Quepos · Costa Rica</div>
        </div>
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Voluntary Rental Program · Owner&apos;s Guide</div>
            <h1>
              Where every rental dollar <em>actually goes.</em>
            </h1>
            <p className="hero-sub">
              This guide walks through the Maravé Rental Program step by step: the revenue split,
              the reserve, your personal use rights, and the numbers behind your quarterly
              statement. We built it from the program documents, not marketing copy. Every figure is
              an estimate.
            </p>
          </div>
          <div className="forty">
            <div className="big">
              49<sup>¢</sup>
            </div>
            <div className="cap">
              Under the current 60/40 owner split, an estimated 49¢ of every $1.00 of room revenue
              reaches the owner before personal carrying costs. Here&apos;s the math, line by line.
            </div>
          </div>
        </div>
      </div>
      <div className="hero-strip">
        <div className="wrap">
          {heroStripItems.map((item) => (
            <div key={item.value} className="strip-item">
              <b>{item.value}</b>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
