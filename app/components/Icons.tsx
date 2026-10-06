export function Icon({
  name = "flower",
  size = 24,
}: {
  name?: string;
  size?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    flower: (
      <>
        <path d="M12 12C1 10 5 1 10 5c2 2 2 4 2 7Zm0 0c-2-11 7-11 7-6 0 3-3 5-7 6Zm0 0c11-2 11 7 6 7-3 0-5-3-6-7Zm0 0c2 11-7 11-7 6 0-3 3-5 7-6Z" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    book: (
      <>
        <path d="M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2V4Z" />
        <path d="M12 6v15M6 8l3 1M15 9l3-1" />
      </>
    ),
    heart: <path d="m12 21-9-9C-2 6 5 0 12 7c7-7 14-1 9 5l-9 9Z" />,
    shield: (
      <>
        <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C8 2 0 10 7 17s15-3 13-14Z" />
        <path d="M4 21 16 9" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="12" rx="3" />
        <path d="M8 10V6a4 4 0 0 1 8 0v4M12 15v3" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="4" />
        <path d="M2 22v-5a7 7 0 0 1 14 0v5M17 3a4 4 0 0 1 0 8m1 3a6 6 0 0 1 4 6" />
      </>
    ),
    school: (
      <>
        <path d="m2 9 10-7 10 7M4 9v13h16V9M9 22v-7h6v7M8 10h1m6 0h1" />
      </>
    ),
    check: <path d="m4 12 5 5L20 6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.flower}
    </svg>
  );
}
export function LearningIllustration() {
  return (
    <svg
      className="hero-illustration"
      viewBox="0 0 520 530"
      role="img"
      aria-label="Illustration of two Nigerian teenage girls learning together with books and a growing plant"
    >
      <path
        d="M87 64c98-65 234-26 311 36 77 61 130 198 60 290-70 93-259 96-335 26C49 348-14 132 87 64Z"
        fill="#F0E8F5"
      />
      <circle cx="407" cy="94" r="31" fill="#FCE5DC" />
      <path d="M54 205c25-58 24-92 4-105-28 9-33 55-4 105Z" fill="#A7B9A8" />
      <path d="M59 201c-7-41-33-48-51-42 1 26 23 42 51 42Z" fill="#C2CEC0" />
      <path d="M110 446h324" stroke="#642C58" strokeWidth="2" />
      <path
        d="M137 257c4-48 37-65 73-50 20 8 30 30 27 51l-4 64-98-5Z"
        fill="#25222A"
      />
      <path d="M164 259h54v64h-54Z" fill="#905A40" />
      <path d="M164 281h54v30c-27 16-54-10-54-30Z" fill="#78452F" />
      <path
        d="M155 231c0-55 75-45 71 1l-3 34c-2 34-54 34-59 2Z"
        fill="#AA7351"
      />
      <path
        d="M151 244c-2-44 17-64 45-62 35 2 46 27 42 65-19-9-25-26-26-40-9 21-31 33-61 37Z"
        fill="#25222A"
      />
      <path
        d="M180 255h3m25 0h3m-24 20c7 5 13 5 19-1"
        stroke="#38241D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M195 258v8" stroke="#905A40" strokeWidth="2" />
      <path
        d="M127 329c11-36 31-32 38-30 15 18 37 18 54 0 18 0 28 11 37 37l27 89H109Z"
        fill="#E4A18D"
      />
      <path d="m173 299 16 25 29-25" fill="#FFF9F4" />
      <path
        d="m152 340-13 53 44 9m49-61 19 53-43 13"
        stroke="#AA7351"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path d="M309 239c-28-34-12-92 31-96 67-6 81 69 51 99Z" fill="#25222A" />
      <circle cx="337" cy="147" r="27" fill="#25222A" />
      <circle cx="365" cy="141" r="25" fill="#25222A" />
      <path d="M326 251h47v47h-47Z" fill="#70422E" />
      <path
        d="M310 205c5-36 70-31 72 3l-1 36c-1 32-53 45-67 7Z"
        fill="#80503B"
      />
      <path
        d="M309 219c-12-50 23-79 57-66 26 10 31 41 23 65-16-4-28-23-31-34-13 20-29 25-49 35Z"
        fill="#25222A"
      />
      <path
        d="M328 232h3m27-2h3m-26 23c7 4 13 4 19-2"
        stroke="#2C1D18"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M295 310c7-19 20-23 32-24 14 10 32 9 47-3 26 4 40 28 44 55l14 87H273Z"
        fill="#642C58"
      />
      <path
        d="m304 331-17 53 42 12m63-62 4 51-34 16"
        stroke="#80503B"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path d="M126 415h313v23H126Z" fill="#D4B29A" />
      <path d="M142 438v34m279-34v34" stroke="#B18F76" strokeWidth="9" />
      <path
        d="m246 373 8 38 63-12-8-38Z"
        fill="#FFF9F4"
        stroke="#D8CBD8"
        strokeWidth="2"
      />
      <path d="m254 377 7 24 46-9-7-24Z" fill="#E5D5EA" />
      <path
        d="m152 381 11 33 39-12 26 8 9-32-39-3Z"
        fill="#FFF9F4"
        stroke="#D8CBD8"
        strokeWidth="2"
      />
      <path d="m198 375 4 27" stroke="#D8CBD8" strokeWidth="2" />
      <path
        d="M456 347v66m0-28c-27-1-39-19-36-38 22-1 34 15 36 38Zm0-19c0-23 14-38 35-37 1 19-13 35-35 37Z"
        fill="#A7B9A8"
        stroke="#6D8B73"
        strokeWidth="2"
      />
      <path d="m435 411 7 28h31l7-28Z" fill="#E4A18D" />
      <path
        d="M57 322h5m-3-3v6M442 192h11m-5-6v12M275 69h8m-4-4v8"
        stroke="#642C58"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M254 127c-13-15-32 2-18 16l18 16 17-18c12-15-7-29-17-14Z"
        fill="#FCE5DC"
      />
      <g transform="translate(43 432)">
        <rect width="209" height="55" rx="16" fill="#FFF9F4" stroke="#E4D8E2" />
        <circle cx="28" cy="27" r="16" fill="#F0E8F5" />
        <path
          d="m20 28 5 5 10-11"
          stroke="#642C58"
          fill="none"
          strokeWidth="2"
        />
        <text
          x="53"
          y="32"
          fill="#642C58"
          fontSize="13"
          fontFamily="system-ui"
          fontWeight="600"
        >
          Room to learn. Room to grow.
        </text>
      </g>
    </svg>
  );
}
