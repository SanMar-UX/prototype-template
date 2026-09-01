// Inline SVG icons for the docs site (Bootstrap Icons paths, 16×16 viewBox).
// Sized in `em` where they sit inline with text so they scale with font size.

const S = ({ children, size = '1em', stroke, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={stroke ? 'none' : 'currentColor'}
    stroke={stroke ? 'currentColor' : undefined}
    strokeWidth={stroke ? 1.4 : undefined}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

export const IconArrowRight = (p) => (
  <S {...p}><path d="M15.78 8.53a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 1 0-1.06 1.06l2.22 2.22H.75a.75.75 0 0 0 0 1.5h12.69l-2.22 2.22a.75.75 0 1 0 1.06 1.06l3.5-3.5Z" /></S>
)
export const IconExternal = (p) => (
  <S {...p}>
    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
  </S>
)
export const IconCheck = (p) => (
  <S {...p}><path d="M13.485 1.929a.75.75 0 0 1 .086 1.056l-7 8.5a.75.75 0 0 1-1.09.05L1.72 8.28a.75.75 0 1 1 1.06-1.06l2.62 2.62 6.43-7.8a.75.75 0 0 1 1.056-.11z" /></S>
)
export const IconX = (p) => (
  <S {...p}><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06z" /></S>
)
export const IconInfo = (p) => (
  <S {...p}><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.082.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" /></S>
)
export const IconWarn = (p) => (
  <S {...p}><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></S>
)
export const IconMenu = (p) => (
  <S {...p}><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" /></S>
)
export const IconGitHub = (p) => (
  <S {...p}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></S>
)

// --- Section glyphs (for home tiles & component groups) ---------------------
export const GlyphRocket = (p) => (
  <S size="24" stroke {...p}><path d="M4.5 11.5 3 13c-.5.5-.5 1.5 0 2s1.5.5 2 0l1.5-1.5M9 4.5a5 5 0 0 1 4-1.5 5 5 0 0 1-1.5 4l-4.5 4.5-3-3L9 4.5z" /><circle cx="10" cy="6" r="1" /></S>
)
export const GlyphPalette = (p) => (
  <S size="24" stroke {...p}><path d="M8 1.5a6.5 6.5 0 1 0 0 13c.83 0 1.5-.67 1.5-1.5 0-.4-.15-.75-.4-1-.24-.25-.4-.6-.4-1 0-.83.67-1.5 1.5-1.5H12A2.5 2.5 0 0 0 14.5 7 6.5 6.5 0 0 0 8 1.5z" /><circle cx="5" cy="6.5" r=".6" fill="currentColor" /><circle cx="8" cy="4.5" r=".6" fill="currentColor" /><circle cx="11" cy="6.5" r=".6" fill="currentColor" /></S>
)
export const GlyphType = (p) => (
  <S size="24" stroke {...p}><path d="M3 4h10M8 4v9M6 13h4" /></S>
)
export const GlyphRuler = (p) => (
  <S size="24" stroke {...p}><rect x="2" y="5.5" width="12" height="5" rx="1" /><path d="M4.5 5.5v2M7 5.5v3M9.5 5.5v2M12 5.5v3" /></S>
)
export const GlyphLogo = (p) => (
  <S size="24" stroke {...p}><rect x="2.5" y="3.5" width="11" height="9" rx="1.5" /><path d="M5 10l2-3 1.5 2L11 6" /></S>
)
export const GlyphStar = (p) => (
  <S size="24" stroke {...p}><path d="M8 2.5l1.7 3.4 3.8.55-2.75 2.68.65 3.77L8 11.1 4.6 12.9l.65-3.77L2.5 6.45l3.8-.55L8 2.5z" /></S>
)
export const GlyphGrid = (p) => (
  <S size="24" stroke {...p}><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" /><rect x="9" y="9" width="4.5" height="4.5" rx="1" /></S>
)
export const GlyphAccess = (p) => (
  <S size="24" stroke {...p}><circle cx="8" cy="3.2" r="1.2" /><path d="M3 5.5h10M8 5.5v4M8 9.5 5.5 13.5M8 9.5l2.5 4" /></S>
)
export const GlyphBook = (p) => (
  <S size="24" stroke {...p}><path d="M8 4.5S6.5 3 3 3v9c3.5 0 5 1.5 5 1.5S9.5 12 13 12V3c-3.5 0-5 1.5-5 1.5zM8 4.5v9" /></S>
)
export const GlyphCompass = (p) => (
  <S size="24" stroke {...p}><circle cx="8" cy="8" r="5.5" /><path d="M10.5 5.5 9 9l-3.5 1.5L7 7l3.5-1.5z" fill="currentColor" stroke="none" /></S>
)
export const GlyphCursor = (p) => (
  <S size="24" stroke {...p}><path d="M4 3l8 3.2-3.3 1.2L7.4 12 4 3z" /></S>
)
export const GlyphForm = (p) => (
  <S size="24" stroke {...p}><rect x="2.5" y="4" width="11" height="3" rx="1" /><rect x="2.5" y="9" width="7" height="3" rx="1" /></S>
)
export const GlyphBell = (p) => (
  <S size="24" stroke {...p}><path d="M4 7a4 4 0 0 1 8 0c0 3 1 4 1 4H3s1-1 1-4zM6.5 13a1.5 1.5 0 0 0 3 0" /></S>
)
export const GlyphLayers = (p) => (
  <S size="24" stroke {...p}><path d="M8 2.5 14 6l-6 3.5L2 6l6-3.5zM3 8.5 8 11.5l5-3M3 11l5 3 5-3" /></S>
)
export const GlyphTable = (p) => (
  <S size="24" stroke {...p}><rect x="2.5" y="3.5" width="11" height="9" rx="1" /><path d="M2.5 6.5h11M6 6.5v6M2.5 9.5h11" /></S>
)
