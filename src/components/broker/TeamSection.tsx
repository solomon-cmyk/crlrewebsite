import Image from "next/image";
import { TEAM } from "@/lib/broker-content";

export function TeamSection() {
  return (
    <section className="block agents" id="team">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">The Team</span>
          <span className="rule" />
          <h2>
            People who live <em>here</em>
          </h2>
        </div>
        <div className="agent-grid">
          {TEAM.map((agent) => (
            <a className="agent reveal" href={agent.href} key={agent.name}>
              <Image src={agent.image} alt={agent.name} width={104} height={104} unoptimized />
              <div>
                <h3>{agent.name}</h3>
                <div className="role">{agent.role}</div>
                <p>{agent.bio}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
