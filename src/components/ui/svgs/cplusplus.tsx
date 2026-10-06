import type { SVGProps } from "react";

const Cplusplus = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32">
    <path
      fill="#00599C"
      d="M16 1.5 28.6 8.75v14.5L16 30.5 3.4 23.25V8.75L16 1.5z"
    />
    <path
      fill="#004482"
      d="M16 1.5 28.6 8.75v14.5L16 30.5V1.5z"
      opacity="0.35"
    />
    <text
      x="16"
      y="20.6"
      textAnchor="middle"
      fontSize="10"
      fontWeight="700"
      fill="#fff"
      fontFamily="Arial, Helvetica, sans-serif"
    >
      C++
    </text>
  </svg>
);

export { Cplusplus };
