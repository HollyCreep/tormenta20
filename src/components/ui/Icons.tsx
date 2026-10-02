import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/** d20 em traço (icosaedro visto de frente) — ícone do rolador de dados. */
export const D20Icon: React.FC<IconProps> = ({ size = 24, strokeWidth = 1.7, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <path d="M12 2 20.5 7v10L12 22 3.5 17V7Z" />
    <path d="M12 8 17 16H7Z" />
    <path d="M12 2v6M3.5 7 12 8l8.5-1M3.5 7 7 16l-3.5 1M20.5 7 17 16l3.5 1M12 22 7 16M12 22l5-6" />
  </svg>
);

/** Emblema do app: escudo com o raio rubro da Tormenta. */
export const BrandMark: React.FC<IconProps> = ({ size = 30, ...rest }) => {
  const gid = `t20-shield-${React.useId().replace(/:/g, '')}`;
  return (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" {...rest}>
    <defs>
      <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="currentColor" stopOpacity="0.95" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <path
      d="M16 2.5 27 6.6v8.2c0 6.9-4.6 11.9-11 14.7C9.6 26.7 5 21.7 5 14.8V6.6Z"
      fill={`url(#${gid})`}
    />
    <path
      d="M16 2.5 27 6.6v8.2c0 6.9-4.6 11.9-11 14.7C9.6 26.7 5 21.7 5 14.8V6.6Z"
      fill="none"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth="1"
    />
    <path d="M18.2 7.5 11.4 17h4.3l-2.2 7.6 7.3-10.4h-4.4l1.8-6.7Z" fill="#fff" fillOpacity="0.95" />
  </svg>
  );
};
