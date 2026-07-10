import Image from "next/image";
import { PLACE_POINTS } from "@/lib/broker-content";

export function PlaceSection() {
  return (
    <section className="block place" id="place">
      <div className="wrap place-grid">
        <div className="place-figure reveal">
          <Image
            src="/media/marave/images/manuel-antonio-park.webp"
            alt="Manuel Antonio National Park"
            width={800}
            height={540}
            className="place-image"
            sizes="(max-width: 660px) 100vw, 48vw"
          />
        </div>
        <div className="place-copy reveal">
          <span className="eyebrow">The Setting</span>
          <span className="rule" />
          <h2>
            Manuel <em>Antonio</em>
          </h2>
          <p>
            One of Costa Rica&apos;s most celebrated destinations, a rare place where the rainforest
            tumbles straight into the Pacific. The national park here is among the country&apos;s
            smallest in size, yet one of its most visited and most biodiverse.
          </p>
          <p>
            Sloths drape the canopy while capuchin and squirrel monkeys, toucans, and scarlet macaws
            move through the trees above white-sand coves. For Maravé, it means waking to birdsong
            and ocean in the same breath.
          </p>
          <div className="place-points">
            {PLACE_POINTS.map((point) => (
              <div className="pt" key={point.title}>
                <b>{point.title}</b>
                <span>{point.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
