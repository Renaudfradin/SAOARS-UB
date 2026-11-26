export function DiamondTrace() {
  return (
    <svg className="elemStroke" viewBox="0 0 54 54" aria-hidden="true">
      <path d="M26.3 51.5 1.3 26.5 26.3 1.5 51.3 26.5 26.3 51.5" pathLength="1" />
    </svg>
  );
}

export function StarMark() {
  return (
    <svg className="mark mark--star" viewBox="0 0 36 36" aria-hidden="true">
      <g className="mark__pop">
        <path
          className="mark__lite"
          d="M17.86 5.904 13.108 15.408 3.604 17.784 10.732 23.724 8.356 33.228 17.86 29.664 27.364 33.228 24.988 23.724 32.116 17.784 22.612 15.408"
        />
        <path
          className="mark__shade"
          d="M18.1 21.6 27.364 33.228 17.86 29.664 18.1 21.6 32.116 17.784 24.988 23.724 18.1 21.6 17.86 5.904 22.612 15.408 18.1 21.6 3.604 17.784 13.108 15.408 18.1 21.6 10.732 23.724 8.356 33.228 18.1 21.6"
        />
      </g>
      <path className="mark__spark s1" d="M28.9 4.8A1.2 1.2 90 0031.3 8.4A1.2 1.2 90 0028.9 4.8" />
      <path className="mark__spark s2" d="M4.9 24A1.2 1.2 90 001.3 28.8A1.2 1.2 90 004.9 24" />
      <path className="mark__spark s3" d="M28.9 22.8A1.2 1.2 90 0030.1 25.2A1.2 1.2 90 0028.9 22.8" />
      <path className="mark__spark s4" d="M8.5 10.8A1.2 1.2 90 009.7 13.2A1.2 1.2 90 008.5 10.8" />
    </svg>
  );
}

export function SwordsMark() {
  return (
    <svg className="mark mark--swords" viewBox="0 0 34 32" aria-hidden="true">
      <g className="blade blade--a">
        <path className="mark__lite" d="M4 2 10 2 28 20 26 22 32 28 30 30 24 24 22 26 4 8 4 2M28 18 30 20 22 28 20 26 28 18" />
        <path className="mark__shade" d="M4 2 10 2 27 19 24 22 4 2" />
      </g>
      <g className="blade blade--b">
        <path className="mark__lite" d="M29 2 23 2 5 20 7 22 1 28 3 30 9 24 11 26 29 8 29 2M5 18 3 20 11 28 13 26 5 18" />
        <path className="mark__shade" d="M29 2 23 2 6 19 9 22 29 2" />
      </g>
    </svg>
  );
}

export function NameMark() {
  return (
    <svg className="mark mark--name" viewBox="0 0 33 31" aria-hidden="true">
      <g className="mark__pop">
        <path
          className="mark__lite"
          d="M5 4 28 4 28 11 26 11C26 9 26 7 23 7L19 7 19 24C20 25 22 25 23 25L23 27 10 27 10 25C11 25 13 25 14 24L14 7 10 7C7 7 7 9 7 11L5 11 5 4"
        />
      </g>
    </svg>
  );
}

export function SearchWire() {
  return (
    <div className="adv__wire" aria-hidden="true">
      <svg className="adv__wireLine" viewBox="0 0 260 2" preserveAspectRatio="none">
        <path d="M0 0 H260 V1 H0 Z" />
      </svg>
      <svg className="adv__wireElbow" viewBox="0 0 16 56">
        <path pathLength="1" d="M8 0 V42 A5 5 0 1 0 8.01 42" />
      </svg>
    </div>
  );
}

export function SearchClose({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="adv__close" aria-label={label} onClick={onClick}>
      <svg viewBox="0 0 33 56" width="33" height="56" aria-hidden="true">
        <path d="M16 0 V25" />
        <path d="M16 25 A12 12 0 1 0 16.01 25" />
        <path d="M9 33 L23 46 M23 33 L9 46" />
      </svg>
    </button>
  );
}
