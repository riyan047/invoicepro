export default function LogoSvg() {
    return (
        <svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2A73FF" />
                    <stop offset="1" stopColor="#883AFF" />
                </linearGradient>
            </defs>
            <path d="M112 64C99.0 64 88 75.0 88 88V424C88 437.0 99.0 448 112 448H400C413.0 448 424 437.0 424 424V160L328 64H112Z" fill="url(#gradient)" />
            <path d="M328 64V160H424L328 64Z" fill="#1E4BFF" />
            <rect x="160" y="192" width="192" height="24" rx="12" fill="white" />
            <rect x="160" y="240" width="160" height="24" rx="12" fill="white" />
            <rect x="160" y="288" width="96" height="24" rx="12" fill="white" />
            <path d="M176 336C168.27 343.73 168.27 356.27 176 364L216 404C223.73 411.73 236.27 411.73 244 404L336 312C343.73 304.27 343.73 291.73 336 284C328.27 276.27 315.73 276.27 308 284L230 362L204 336C196.27 328.27 183.73 328.27 176 336Z" fill="white" />
        </svg>
    );
}
