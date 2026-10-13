// index.ts
//
// Barrel for the video treatment components. One import site for any page
// or section that wants to reach for one of these, so a caller writes
// `import { ShapedVideo, VideoBand } from "../video"` instead of chasing
// four separate file paths. Re-exports the prop types alongside each
// component for the same reason Figure and the other section components
// export their own Props interface: a caller building a page-level props
// object needs the type without reaching into the component file directly.

export { default as ShapedVideo } from "./ShapedVideo";
export type { ShapedVideoProps, ShapedVideoShape, ShapedVideoBlobVariant } from "./ShapedVideo";

export { default as VideoBand } from "./VideoBand";
export type { VideoBandProps } from "./VideoBand";

export { default as VideoBehindType } from "./VideoBehindType";
export type { VideoBehindTypeProps } from "./VideoBehindType";

export { default as SeamLoop } from "./SeamLoop";
export type { SeamLoopProps } from "./SeamLoop";

export { gradientScrim } from "./scrim";
export type { ScrimKind, ScrimAnchor, ScrimTint, GradientScrimOptions } from "./scrim";
