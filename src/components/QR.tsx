import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

/** QR generado en el navegador (funciona sin internet). */
export function QR({ url, size = 320 }: { url: string; size?: number }) {
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let alive = true;
    QRCode.toString(url, {
      type: 'svg',
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#0c0a09', light: '#ffffff' },
    }).then((s) => {
      if (alive) setSvg(s);
    });
    return () => {
      alive = false;
    };
  }, [url]);

  return (
    <div
      className="qr"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Código QR hacia ${url}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
