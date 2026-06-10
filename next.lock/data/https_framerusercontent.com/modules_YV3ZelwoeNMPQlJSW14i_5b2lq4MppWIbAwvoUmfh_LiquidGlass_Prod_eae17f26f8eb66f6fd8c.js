import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{useMemo,useEffect,useRef,useState,useId}from"react";import{ControlType,addPropertyControls,RenderTarget}from"framer";// ------------------------------------------------------------ //
// PROPERTY CONTROLS
// ------------------------------------------------------------ //
addPropertyControls(LiquidGlass,{settings:{type:ControlType.Object,controls:{mode:{type:ControlType.Enum,options:["preset","custom"],optionTitles:["Preset","Custom"],displaySegmentedControl:true,defaultValue:"preset"},scale:{type:ControlType.Number,min:-360,max:360,step:1,defaultValue:160,hidden:props=>props.mode==="preset"},radius:{type:ControlType.Number,min:0,max:500,step:1,defaultValue:50},border:{type:ControlType.Number,min:0,max:.5,step:.01,defaultValue:.05,hidden:props=>props.mode==="preset"},lightness:{type:ControlType.Number,min:0,max:100,step:1,defaultValue:53,hidden:props=>props.mode==="preset"},displace:{title:"Blur",type:ControlType.Number,min:0,max:10,step:.01,defaultValue:.38,hidden:props=>props.mode==="preset"},alpha:{type:ControlType.Number,min:0,max:1,step:.01,defaultValue:.9,hidden:props=>props.mode==="preset"},blur:{title:"Displace",type:ControlType.Number,min:0,max:100,step:1,defaultValue:5,hidden:props=>props.mode==="preset"},dispersion:{type:ControlType.Number,min:0,max:100,step:1,defaultValue:50,hidden:props=>props.mode==="preset"},frost:{type:ControlType.Number,min:0,max:1,step:.01,defaultValue:.1,hidden:props=>props.mode==="preset"},borderColor:{title:"Border",type:ControlType.Color,defaultValue:"rgba(120, 120, 120, 0.7)"}},description:"More components at [Framer University](https://frameruni.link/cc)."}});// Default dimensions for initial render
const DEFAULT_WIDTH=400;const DEFAULT_HEIGHT=200;const preset={scale:160,radius:50,border:.05,lightness:53,displace:.38,alpha:.9,blur:5,dispersion:50,frost:.1,borderColor:"rgba(120, 120, 120, 0.7)"};// ------------------------------------------------------------ //
// MAIN COMPONENT
// ------------------------------------------------------------ //
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 348
 * @framerIntrinsicHeight 100
 * @framerDisableUnlink
 */export default function LiquidGlass(props){let config=props.settings;// if preset, use preset values
if(props.settings.mode==="preset"){config={...preset,mode:"preset",blend:"difference",x:"R",y:"B",radius:props.settings.radius};}else{config={...config,blend:"difference",x:"R",y:"B"};}const containerRef=useRef(null);const gradientBorderRef=useRef(null);const[dimensions,setDimensions]=useState({width:DEFAULT_WIDTH,height:DEFAULT_HEIGHT});// Update dimensions when the container size changes
useEffect(()=>{if(!containerRef.current)return;const updateDimensions=()=>{if(!containerRef.current)return;// Check if we're on Framer canvas
const isCanvas=RenderTarget.current()===RenderTarget.canvas;if(isCanvas){// On canvas, use offsetWidth/offsetHeight which are scale-independent
const width=containerRef.current.offsetWidth;const height=containerRef.current.offsetHeight;if(width===0||height===0)return;setDimensions({width,height});return;}// In preview/production, use getBoundingClientRect
const{width,height}=containerRef.current.getBoundingClientRect();if(width===0||height===0)return;setDimensions({width,height});};// Initial measurement
updateDimensions();// Create ResizeObserver to watch for size changes
const resizeObserver=new ResizeObserver(updateDimensions);resizeObserver.observe(containerRef.current);return()=>resizeObserver.disconnect();},[]);// Generate displacement map SVG as data URI
const displacementDataUri=useMemo(()=>{const{width,height}=dimensions;// for the best looking effect, we need to half of the width and height
const newwidth=width/2;const newheight=height/2;const border=Math.min(newwidth,newheight)*(config.border*.5);// Ensure radius doesn't exceed container constraints for consistent CSS/SVG behavior
const effectiveRadius=Math.min(config.radius,width/2,height/2);const svgContent=`
      <svg viewBox="0 0 ${newwidth} ${newheight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${newwidth}" height="${newheight}" fill="black"/>
        <rect x="0" y="0" width="${newwidth}" height="${newheight}" rx="${effectiveRadius}" fill="url(#red)" />
        <rect x="0" y="0" width="${newwidth}" height="${newheight}" rx="${effectiveRadius}" fill="url(#blue)" style="mix-blend-mode: ${config.blend}" />
        <rect x="${border}" y="${border}" width="${newwidth-border*2}" height="${newheight-border*2}" rx="${effectiveRadius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha})" style="filter:blur(${config.blur}px)" />
      </svg>
    `;const encoded=encodeURIComponent(svgContent);return`data:image/svg+xml,${encoded}`;},[dimensions,config]);// Generate a unique ID for the SVG filter so that multiple component
// instances can coexist without ID collisions.
const uniqueFilterId=useId();const filterId=`liquid-glass-filter-${uniqueFilterId}`;const glassMorphismStyle={width:"100%",height:"100%",borderRadius:config.radius,position:"absolute",zIndex:1,background:`hsl(0 0% 100% / ${config.frost})`,backdropFilter:`url(#${filterId})`};// Gradient border styles based on the codepen technique
const gradientBorderStyle={position:"absolute",inset:0,borderRadius:config.radius,zIndex:2,pointerEvents:"none",background:`linear-gradient(315deg, ${config.borderColor} 0%, rgba(120, 120, 120, 0) 30%, rgba(120, 120, 120, 0) 70%, ${config.borderColor} 100%) border-box`,mask:"linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",maskComposite:"exclude",border:`1px solid transparent`};return /*#__PURE__*/_jsxs("div",{ref:containerRef,style:{width:"100%",height:"100%",position:"relative"},children:[/*#__PURE__*/_jsx("div",{style:glassMorphismStyle,children:/*#__PURE__*/_jsx("svg",{className:"filter",style:{width:"100%",height:"100%",pointerEvents:"none",position:"absolute",inset:0},xmlns:"http://www.w3.org/2000/svg",children:/*#__PURE__*/_jsx("defs",{children:/*#__PURE__*/_jsxs("filter",{id:filterId,colorInterpolationFilters:"sRGB",children:[/*#__PURE__*/_jsx("feImage",{href:displacementDataUri,x:"0",y:"0",width:"100%",height:"100%",result:"map"}),/*#__PURE__*/_jsx("feDisplacementMap",{in:"SourceGraphic",in2:"map",id:"redchannel",scale:config.scale+config.dispersion,xChannelSelector:config.x,yChannelSelector:config.y,result:"dispRed"}),/*#__PURE__*/_jsx("feColorMatrix",{in:"dispRed",type:"matrix",values:"1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0",result:"red"}),/*#__PURE__*/_jsx("feDisplacementMap",{in:"SourceGraphic",in2:"map",id:"greenchannel",scale:config.scale+config.dispersion,xChannelSelector:config.x,yChannelSelector:config.y,result:"dispGreen"}),/*#__PURE__*/_jsx("feColorMatrix",{in:"dispGreen",type:"matrix",values:"0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0",result:"green"}),/*#__PURE__*/_jsx("feDisplacementMap",{in:"SourceGraphic",in2:"map",id:"bluechannel",scale:config.scale+config.dispersion,xChannelSelector:config.x,yChannelSelector:config.y,result:"dispBlue"}),/*#__PURE__*/_jsx("feColorMatrix",{in:"dispBlue",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0",result:"blue"}),/*#__PURE__*/_jsx("feBlend",{in:"red",in2:"green",mode:"screen",result:"rg"}),/*#__PURE__*/_jsx("feBlend",{in:"rg",in2:"blue",mode:"screen",result:"output"}),/*#__PURE__*/_jsx("feGaussianBlur",{in:"output",stdDeviation:config.displace})]})})})}),/*#__PURE__*/_jsx("div",{ref:gradientBorderRef,id:"gradient-border",style:gradientBorderStyle})]});}LiquidGlass.displayName="Liquid Glass";
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"LiquidGlass","slots":[],"annotations":{"framerDisableUnlink":"","framerIntrinsicWidth":"348","framerContractVersion":"1","framerSupportedLayoutWidth":"any-prefer-fixed","framerIntrinsicHeight":"100","framerSupportedLayoutHeight":"any-prefer-fixed"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./LiquidGlass_Prod.map