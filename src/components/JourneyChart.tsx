import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { JOURNEY, JOURNEY_PROGRESS } from '../content/talk';
import { reduced } from '../deck/anim';

const W = 1680;
const H = 460;

/** Recorrido del ciclo dibujado con D3: la línea se traza y los hitos aparecen en secuencia. */
export function JourneyChart({ highlight }: { highlight: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll('*').remove();
    const k = reduced ? 0 : 1;
    const last = JOURNEY.length - 1;

    const x = d3
      .scalePoint<number>()
      .domain(d3.range(JOURNEY.length))
      .range([130, W - 170]);
    const pts = JOURNEY.map((_, i): [number, number] => [x(i)!, i === last ? 150 : i % 2 ? 190 : 270]);

    const path = svg
      .append('path')
      .attr('class', 'j-line')
      .attr('d', d3.line().curve(d3.curveCatmullRom.alpha(0.5))(pts)!);
    const len = path.node()!.getTotalLength();
    path
      .attr('stroke-dasharray', len)
      .attr('stroke-dashoffset', len)
      .transition()
      .duration(1900 * k)
      .ease(d3.easeCubicInOut)
      .attr('stroke-dashoffset', 0);

    const delay = (_: unknown, i: number) => (250 + i * 380) * k;

    const g = svg
      .selectAll('g.node')
      .data(JOURNEY)
      .join('g')
      .attr('class', (d) => `node${d.now ? ' now' : ''}`)
      .attr('transform', (_, i) => `translate(${pts[i][0]},${pts[i][1]})`);

    g.filter((d) => !!d.now).append('circle').attr('class', 'halo').attr('r', 34);

    g.append('circle')
      .attr('class', 'dot')
      .attr('r', 0)
      .transition()
      .delay(delay)
      .duration(520 * k)
      .ease(d3.easeBackOut.overshoot(2.2))
      .attr('r', (d) => (d.now ? 34 : 17));

    const fadeIn = (sel: d3.Selection<SVGTextElement, (typeof JOURNEY)[number], SVGSVGElement, unknown>) =>
      sel
        .style('opacity', 0)
        .transition()
        .delay((d, i) => delay(d, i) + 150 * k)
        .duration(450 * k)
        .style('opacity', 1);

    g.append('text')
      .attr('class', 'idx')
      .attr('y', (d) => (d.now ? -62 : -42))
      .text((_, i) => `0${i + 1}`)
      .call(fadeIn);

    g.append('text')
      .attr('class', 'label')
      .attr('y', (d) => (d.now ? 96 : 72))
      .text((d) => d.label)
      .call(fadeIn);

    if (JOURNEY_PROGRESS) {
      const { total, done } = JOURNEY_PROGRESS;
      g.append('text')
        .attr('class', 'jcount')
        .attr('y', (d) => (d.now ? 146 : 118))
        .text((_, i) => `${done[i]} de ${total} equipos`)
        .call(fadeIn);
    }

    return () => {
      svg.selectAll('*').interrupt();
    };
  }, []);

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
