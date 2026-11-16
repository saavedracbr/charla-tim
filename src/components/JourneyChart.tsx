import { useRef } from 'react';
import { curveCatmullRom, line, range, scalePoint, select } from 'd3';
import { JOURNEY, JOURNEY_PROGRESS } from '../content/talk';
import { gsap, reduced, useGSAP } from '../deck/anim';

const W = 1680;
const H = 460;

/**
 * Recorrido del ciclo. D3 calcula la geometría y construye el SVG; GSAP lo anima.
 * (No se usa d3-transition: el empaquetador lo descarta en el build de producción.)
 */
export function JourneyChart({ highlight }: { highlight: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = select(ref.current!);
      svg.selectAll('*').remove();
      const last = JOURNEY.length - 1;

      const x = scalePoint<number>()
        .domain(range(JOURNEY.length))
        .range([130, W - 170]);
      const pts = JOURNEY.map((_, i): [number, number] => [x(i)!, i === last ? 150 : i % 2 ? 190 : 270]);

      const path = svg
        .append('path')
        .attr('class', 'j-line')
        .attr('d', line().curve(curveCatmullRom.alpha(0.5))(pts)!);

      const g = svg
        .selectAll('g.node')
        .data(JOURNEY)
        .join('g')
        .attr('class', (d) => `node${d.now ? ' now' : ''}`)
        .attr('transform', (_, i) => `translate(${pts[i][0]},${pts[i][1]})`);

      g.filter((d) => !!d.now).append('circle').attr('class', 'halo').attr('r', 34);
      g.append('circle')
        .attr('class', 'dot')
        .attr('r', (d) => (d.now ? 34 : 17));
      g.append('text')
        .attr('class', 'idx')
        .attr('y', (d) => (d.now ? -62 : -42))
        .text((_, i) => `0${i + 1}`);
      g.append('text')
        .attr('class', 'label')
        .attr('y', (d) => (d.now ? 96 : 72))
        .text((d) => d.label);

      if (JOURNEY_PROGRESS) {
        const { total, done } = JOURNEY_PROGRESS;
        g.append('text')
          .attr('class', 'jcount')
          .attr('y', (d) => (d.now ? 146 : 118))
          .text((_, i) => `${done[i]} de ${total} equipos`);
      }

      if (reduced) return;

      const pathEl = path.node()!;
      const len = pathEl.getTotalLength();
      gsap.fromTo(
        pathEl,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.9, ease: 'power2.inOut' },
      );
      g.each(function (d, i) {
        const at = 0.25 + i * 0.38;
        const node = select(this);
        gsap.from(node.select('.dot').node(), {
          attr: { r: 0 },
          duration: 0.55,
          ease: 'back.out(2.4)',
          delay: at,
        });
        gsap.from(node.selectAll('text').nodes(), {
          opacity: 0,
          y: d.now ? 18 : 12,
          duration: 0.45,
          ease: 'power2.out',
          delay: at + 0.15,
        });
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      className={`journey${highlight ? ' focus' : ''}`}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Recorrido del ciclo: ${JOURNEY.map((j) => j.label).join(', ')}`}
    />
  );
}
