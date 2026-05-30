import React from "react";
export * from "framer-motion";

export const addPropertyControls = () => {};
export const useIsStaticRenderer = () => false;
export const useActiveVariantCallback = (baseVariant: any) => ({
  activeVariantCallback: (cb: any) => cb,
  delay: () => {}
});
export const SmartComponentScopedContainer = ({ children }: any) => children;
export const useVariantState = ({ defaultVariant }: any) => ({
  baseVariant: defaultVariant,
  classNames: "",
  clearLoadingGesture: () => {},
  gestureHandlers: {},
  gestureVariant: null,
  isLoading: false,
  setGestureState: () => {},
  setVariant: () => {},
  variants: []
});
export const SVG = ({ 
  __fromCanvasComponent, layoutDependency, layoutId, transformTemplate, verticalAlignment, 
  withExternalLayout, requiresOverflowVisible, ...props 
}: any) => React.createElement("svg", props);
export const Color = {
  toRgbString: () => "rgb(0,0,0)",
  toHex: () => "#000000",
  toHslString: () => "hsl(0,0%,0%)",
  isColor: () => false
};
export const useIsInCurrentNavigationTarget = () => true;
export const getFonts = () => [];
export const getPropertyControls = () => ({});
export const fontStore = { load: () => {} };
export const useSVGTemplate = () => null;
export const ControlType = {
  Boolean: "boolean",
  Number: "number",
  String: "string",
  Color: "color",
  Image: "image",
  File: "file",
  Enum: "enum",
  ComponentInstance: "componentinstance",
  Array: "array",
  Object: "object",
  Transition: "transition",
};

export const RenderTarget = {
  current: () => 1, // 1 = Web (forces video and interactive elements to work)
  hasRestrictions: () => false,
};

// Stubs for Framer runtime components
export const cx = (...args: any[]) => args.filter(Boolean).join(" ");
export const useComponentViewport = () => ({ width: 1000, height: 1000 });
export const useLocaleInfo = () => ({ locale: "en-US", direction: "ltr" });
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
export const addFonts = () => {};
export const withCSS = (Component: any) => Component;
export const RichText = ({ 
  __fromCanvasComponent, layoutDependency, layoutId, transformTemplate, verticalAlignment, 
  withExternalLayout, requiresOverflowVisible, ...props 
}: any) => React.createElement("div", props);
export const Image = ({ 
  __fromCanvasComponent, layoutDependency, layoutId, transformTemplate, verticalAlignment, 
  withExternalLayout, requiresOverflowVisible, ...props 
}: any) => React.createElement("img", props);
export const Link = ({ href, ...props }: any) => React.createElement("a", { href: href === "" ? null : (href || undefined), ...props });
export const getLoadingLazyAtYPosition = () => 0;
export const ComponentViewportProvider = ({ children }: any) => React.createElement(React.Fragment, null, children);
