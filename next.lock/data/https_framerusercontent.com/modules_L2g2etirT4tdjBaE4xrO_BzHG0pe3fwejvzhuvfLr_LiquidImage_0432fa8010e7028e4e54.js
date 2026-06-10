// Liquid Image/Video Hover Effect with Color Reveal and Hotspots (Optimized)
// Real-time water-like displacement, grayscale-to-color reveal, persistent hotspots.
// Supports either an image or a video as the source.
import{jsx as _jsx}from"react/jsx-runtime";import{useRef,useEffect,useState,useCallback}from"react";import{addPropertyControls,ControlType,useIsStaticRenderer}from"framer";const defaultImage={src:"https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",alt:"Gradient 1 - Blue"};/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 *
 * @framerDisableUnlink
 */export default function LiquidImage(props){const{sourceType="image",image=defaultImage,video="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4",strength=.15,speed=.18,fit="cover",style,hotspots=[],borderRadius=8}=props;const isVideo=sourceType==="video"&&!!video;const wrapperRef=useRef(null);const canvasRef=useRef(null);const videoElRef=useRef(null);const offCanvasRef=useRef(null)// reused offscreen canvas (perf)
;const[size,setSize]=useState({width:400,height:300});// Mirror of `size` the render loop can read every frame without
// re-running the WebGL effect (avoids context-rebuild flash on resize).
const sizeRef=useRef({width:400,height:300});const dprRef=useRef(1);// Live ref so fit changes apply on the next frame without tearing
// down and rebuilding the WebGL context (same pattern as size).
const fitRef=useRef(fit);fitRef.current=fit;const isStatic=useIsStaticRenderer();// Animation and interaction refs
const mouseRef=useRef({x:-10,y:-10,active:false});const maskRadiusRef=useRef(0);const wakeRef=useRef([]);const hotspotsRef=useRef(hotspots);const hoveredRef=useRef(false);// Only update hotspotsRef when hotspots prop changes
useEffect(()=>{hotspotsRef.current=hotspots;},[hotspots]);// Size tracking: observe the WRAPPER (not the canvas), and use a
// ResizeObserver so container/layout changes (e.g. Framer "Fill")
// are caught — a window resize listener misses those.
useEffect(()=>{const el=wrapperRef.current;if(!el)return;const measure=()=>{let dpr=1;if(typeof window!=="undefined"){dpr=window.devicePixelRatio||1;}dprRef.current=dpr;const rect=el.getBoundingClientRect();const w=Math.max(1,Math.round(rect.width*dpr));const h=Math.max(1,Math.round(rect.height*dpr));// Update the ref synchronously so the render loop sees the new
// size on its very next frame, independent of React's re-render.
sizeRef.current={width:w,height:h};setSize(prev=>prev.width===w&&prev.height===h?prev:{width:w,height:h});};measure();if(typeof window!=="undefined"&&typeof window.ResizeObserver!=="undefined"){const ro=new window.ResizeObserver(measure);ro.observe(el);// devicePixelRatio can change (zoom / monitor move) without a
// resize of the element — keep the window listener as a backstop.
window.addEventListener("resize",measure);return()=>{ro.disconnect();window.removeEventListener("resize",measure);};}// Fallback for environments without ResizeObserver
if(typeof window!=="undefined"){window.addEventListener("resize",measure);return()=>window.removeEventListener("resize",measure);}return()=>{};},[]);// Mouse events (no state updates on move)
const handleMove=useCallback(e=>{if(!canvasRef.current)return;const rect=canvasRef.current.getBoundingClientRect();let x,y;if(e.touches&&e.touches.length>0){x=(e.touches[0].clientX-rect.left)/rect.width;y=(e.touches[0].clientY-rect.top)/rect.height;}else{x=(e.clientX-rect.left)/rect.width;y=(e.clientY-rect.top)/rect.height;}x=Math.max(0,Math.min(1,x));y=Math.max(0,Math.min(1,y));mouseRef.current={x,y,active:true};hoveredRef.current=true;// Add a wake point (limit to 8 recent)
const now=Date.now();wakeRef.current=[...wakeRef.current.filter(w=>now-w.t<1200),{x,y,t:now}].slice(-8);},[]);const handleLeave=useCallback(()=>{mouseRef.current={...mouseRef.current,active:false};hoveredRef.current=false;},[]);// Animate mask radius on hover in/out (single animation loop, easeInOut cubic)
useEffect(()=>{let animId;let lastHovered=false;let start=null;let from=0;let to=0;let duration=650// ms, slower for smoother effect
;function easeInOutCubic(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}function animate(ts){const hovered=hoveredRef.current;if(hovered!==lastHovered){lastHovered=hovered;start=ts;from=maskRadiusRef.current;to=hovered?1.5:0;}if(start===null)start=ts;const elapsed=Math.min((ts-start)/duration,1);const eased=easeInOutCubic(elapsed);maskRadiusRef.current=from+(to-from)*eased;if(elapsed<1){animId=requestAnimationFrame(animate);}else{maskRadiusRef.current=to;animId=requestAnimationFrame(animate);}}animId=requestAnimationFrame(animate);return()=>animId&&cancelAnimationFrame(animId);},[]);// WebGL shader effect (single stable render loop)
useEffect(()=>{if(!canvasRef.current||isStatic)return;// Initial canvas size from the ref (high-DPI). Subsequent resizes
// are applied inside the render loop without rebuilding the context.
const initialDpr=dprRef.current||1;const initialSize=sizeRef.current;canvasRef.current.width=initialSize.width;canvasRef.current.height=initialSize.height;canvasRef.current.style.width=initialSize.width/initialDpr+"px";canvasRef.current.style.height=initialSize.height/initialDpr+"px";// Track the size the canvas/viewport are currently configured for,
// so the loop only reconfigures when it actually changes.
let appliedW=initialSize.width;let appliedH=initialSize.height;let gl=canvasRef.current.getContext("webgl");if(!gl)return;let animationId;// --- Source setup: image OR video ---
let img=null;let videoEl=null;let mediaReady=false;if(isVideo){videoEl=document.createElement("video");videoEl.crossOrigin="anonymous";videoEl.src=video;videoEl.muted=true;videoEl.loop=true;videoEl.playsInline=true;videoEl.autoplay=true;videoEl.setAttribute("playsinline","");videoElRef.current=videoEl;}else{img=new window.Image;img.crossOrigin="anonymous";img.src=image.src;}let tex,program,uTime,uMouse,uStrength,uSpeed,uResolution,uWake,uWakeCount,uMaskRadius;let startTime=Date.now();let loaded=false;// Vertex shader
const vs=`
            attribute vec2 a_position;
            varying vec2 v_uv;
            void main() {
                v_uv = a_position * 0.5 + 0.5;
                gl_Position = vec4(a_position, 0, 1);
            }
        `;// Fragment shader with wake effect and grayscale/color reveal
const fs=`
            precision highp float;
            varying vec2 v_uv;
            uniform sampler2D u_image;
            uniform vec2 u_mouse;
            uniform float u_time;
            uniform float u_strength;
            uniform float u_speed;
            uniform vec2 u_resolution;
            #define MAX_WAKE 16
            uniform int u_wakeCount;
            uniform vec3 u_wake[MAX_WAKE]; // x, y, t (t = seconds since start)
            uniform float u_maskRadius; // in [0,1], relative to min(width, height)
            void main() {
                vec2 uv = v_uv;
                float total = 0.0;
                // Wake ripples
                for (int i = 0; i < MAX_WAKE; ++i) {
                    if (i >= u_wakeCount) break;
                    vec2 w = u_wake[i].xy;
                    float t = u_time - u_wake[i].z;
                    float dist = distance(uv, w);
                    float amp = exp(-dist * 16.0) * exp(-t * 1.2);
                    float ripple = sin(32.0 * dist - t * 8.0 * u_speed) * 0.04;
                    uv += normalize(uv - w) * ripple * u_strength * amp * 2.0;
                }
                // Live mouse ripple
                if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 && u_mouse.y >= 0.0 && u_mouse.y <= 1.0) {
                    float dist = distance(uv, u_mouse);
                    float ripple = sin(32.0 * dist - u_time * 8.0 * u_speed) * 0.04;
                    float effect = exp(-dist * 12.0);
                    uv += normalize(uv - u_mouse) * ripple * u_strength * effect * 2.0;
                }
                uv = clamp(uv, 0.0, 1.0);
                vec4 color = texture2D(u_image, uv);
                // Grayscale
                float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
                vec3 grayColor = vec3(gray);
                // Color reveal mask: union of all active hotspots and mouse
                float mask = 0.0;
                float maskRadius = u_maskRadius; // in [0,1], relative to min(width, height)
                // Mouse mask
                if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 && u_mouse.y >= 0.0 && u_mouse.y <= 1.0 && maskRadius > 0.0) {
                    float d = distance(uv, u_mouse);
                    mask = max(mask, smoothstep(maskRadius, maskRadius * 0.8, d));
                }
                // Hotspot masks
                for (int i = 0; i < MAX_WAKE; ++i) {
                    if (i >= u_wakeCount) break;
                    vec2 w = u_wake[i].xy;
                    float d = distance(uv, w);
                    mask = max(mask, smoothstep(maskRadius, maskRadius * 0.8, d));
                }
                // Blend
                vec3 finalColor = mix(grayColor, color.rgb, mask);
                gl_FragColor = vec4(finalColor, color.a);
            }
        `;function createShader(type,src){let s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s;}function createProgram(vs,fs){let p=gl.createProgram();gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);return p;}function setup(){// Create shaders
let vshader=createShader(gl.VERTEX_SHADER,vs);let fshader=createShader(gl.FRAGMENT_SHADER,fs);program=createProgram(vshader,fshader);gl.useProgram(program);// Quad
let pos=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pos);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);let loc=gl.getAttribLocation(program,"a_position");gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);// Uniforms
uTime=gl.getUniformLocation(program,"u_time");uMouse=gl.getUniformLocation(program,"u_mouse");uStrength=gl.getUniformLocation(program,"u_strength");uSpeed=gl.getUniformLocation(program,"u_speed");uResolution=gl.getUniformLocation(program,"u_resolution");uWake=gl.getUniformLocation(program,"u_wake");uWakeCount=gl.getUniformLocation(program,"u_wakeCount");uMaskRadius=gl.getUniformLocation(program,"u_maskRadius");// Texture
tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.activeTexture(gl.TEXTURE0);gl.uniform1i(gl.getUniformLocation(program,"u_image"),0);loaded=true;mediaReady=true;}// Get (or lazily create) the single reused offscreen canvas
function getOffscreen(w,h){let off=offCanvasRef.current;if(!off){off=document.createElement("canvas");offCanvasRef.current=off;}if(off.width!==w||off.height!==h){off.width=w;off.height=h;}return off;}if(isVideo){const startPlayback=()=>{setup();// Best-effort autoplay; browsers require muted (set above)
const p=videoEl.play();if(p&&typeof p.catch==="function"){p.catch(()=>{});}render();};// loadeddata fires once enough frame data exists to draw
videoEl.addEventListener("loadeddata",startPlayback,{once:true});// In case it's already buffered (cached)
if(videoEl.readyState>=2)startPlayback();}else{img.onload=()=>{setup();render();};}function updateTexture(){if(!tex)return;gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);let offW=sizeRef.current.width;let offH=sizeRef.current.height;let off=getOffscreen(offW,offH);let ctx=off.getContext("2d");// Source dimensions differ between image and video
let sourceEl,iw,ih;if(isVideo){sourceEl=videoEl;iw=videoEl.videoWidth;ih=videoEl.videoHeight;// Video not ready yet this frame — skip upload
if(!iw||!ih)return;}else{sourceEl=img;iw=img.width;ih=img.height;}// Fit math: cover (crop), contain (letterbox), or fill (stretch)
const fitMode=fitRef.current;let sx,sy,sw,sh;if(fitMode==="fill"){// Stretch source across the whole frame, ignoring aspect ratio
sx=0;sy=0;sw=offW;sh=offH;}else if(fitMode==="contain"){// Fit entire source inside the frame, letterbox the rest
let scale=Math.min(offW/iw,offH/ih);sw=iw*scale;sh=ih*scale;sx=(offW-sw)/2;sy=(offH-sh)/2;}else{// "cover" (default): fill frame, crop overflow
let scale=Math.max(offW/iw,offH/ih);sw=iw*scale;sh=ih*scale;sx=(offW-sw)/2;sy=(offH-sh)/2;}// Transparent clear — in Contain mode the letterbox stays
// transparent so whatever is placed behind the component
// (e.g. a colored Frame) shows through.
ctx.clearRect(0,0,offW,offH);ctx.drawImage(sourceEl,sx,sy,sw,sh);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,off);}function render(){if(!loaded)return;// Pick up the current size once per frame. If it changed,
// reconfigure the canvas backing store + viewport in this same
// frame, before updateTexture() (which reads the same ref),
// so there's no one-frame stretch during a drag.
const curW=sizeRef.current.width;const curH=sizeRef.current.height;if(curW!==appliedW||curH!==appliedH){const d=dprRef.current||1;if(canvasRef.current){canvasRef.current.width=curW;canvasRef.current.height=curH;canvasRef.current.style.width=curW/d+"px";canvasRef.current.style.height=curH/d+"px";}appliedW=curW;appliedH=curH;}updateTexture();gl.viewport(0,0,curW,curH);gl.clear(gl.COLOR_BUFFER_BIT);const now=(Date.now()-startTime)/1e3;gl.uniform1f(uTime,now);// Clamp mouse to [0,1] and invert y for WebGL
let mx=mouseRef.current.active?Math.max(0,Math.min(1,mouseRef.current.x)):-10;let my=mouseRef.current.active?Math.max(0,Math.min(1,mouseRef.current.y)):-10;my=1-my;gl.uniform2f(uMouse,mx,my);gl.uniform1f(uStrength,strength*2.5);gl.uniform1f(uSpeed,speed);gl.uniform2f(uResolution,curW,curH);// Wake effect (user + hotspots)
let nowMs=Date.now();let wakeArr=wakeRef.current.slice(-8);// Add persistent hotspots
let hotspotArr=(hotspotsRef.current||[]).slice(0,8).map(h=>({x:h.x,y:h.y,t:nowMs-1e5}));let allWake=[...wakeArr,...hotspotArr].slice(-16);let wakeData=new Float32Array(16*3);let count=0;for(let i=0;i<allWake.length;++i){let w=allWake[i];// Invert y for WebGL
wakeData[i*3+0]=w.x;wakeData[i*3+1]=1-w.y;wakeData[i*3+2]=(w.t-startTime)/1e3;count++;}gl.uniform1i(uWakeCount,count);gl.uniform3fv(uWake,wakeData);// Mask radius
gl.uniform1f(uMaskRadius,maskRadiusRef.current);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);animationId=requestAnimationFrame(render);}return()=>{if(animationId)cancelAnimationFrame(animationId);if(videoEl){try{videoEl.pause();}catch(e){}videoEl.removeAttribute("src");videoEl.load();}videoElRef.current=null;gl=null;};},[isVideo,image.src,video,// size.width / size.height intentionally excluded: resizing is
// handled live inside the render loop via sizeRef, so the WebGL
// context is no longer torn down and rebuilt on every resize.
strength,speed,isStatic]);// Static fallback
if(isStatic){return /*#__PURE__*/_jsx("div",{style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",borderRadius,...style},children:isVideo?/*#__PURE__*/_jsx("video",{src:video,muted:true,loop:true,playsInline:true,autoPlay:true,style:{width:"100%",height:"100%",objectFit:fit,display:"block",borderRadius}}):/*#__PURE__*/_jsx("img",{src:image.src,alt:image.alt,style:{width:"100%",height:"100%",objectFit:fit,display:"block",borderRadius}})});}return /*#__PURE__*/_jsx("div",{ref:wrapperRef,style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",borderRadius,...style},onMouseMove:handleMove,onMouseLeave:handleLeave,onTouchMove:handleMove,onTouchEnd:handleLeave,children:/*#__PURE__*/_jsx("canvas",{ref:canvasRef,width:size.width,height:size.height,style:{width:"100%",height:"100%",display:"block",borderRadius},"aria-label":isVideo?"Video":image.alt})});}addPropertyControls(LiquidImage,{sourceType:{type:ControlType.Enum,title:"Source",options:["image","video"],optionTitles:["Image","Video"],defaultValue:"image",displaySegmentedControl:true},image:{type:ControlType.ResponsiveImage,title:"Image",description:"Add your image here.",hidden:props=>props.sourceType==="video"},video:{type:ControlType.File,title:"Video",allowedFileTypes:["mp4","webm","mov"],description:"Add your video here.",hidden:props=>props.sourceType!=="video"},fit:{type:ControlType.Enum,title:"Fit",options:["cover","contain","fill"],optionTitles:["Cover","Contain","Fill"],defaultValue:"cover",description:"Cover crops to fill, Contain fits the whole source, Fill stretches."},strength:{type:ControlType.Number,title:"Strength",description:"Amount of displacement.",defaultValue:.03,min:.01,max:.5,step:.01},speed:{type:ControlType.Number,title:"Speed",description:"Speed of animation.",defaultValue:.14,min:.01,max:1,step:.01},borderRadius:{type:ControlType.Number,title:"Radius",description:"Radius of displacement.\n\nMore components at [gustavwf.supply](https://gustavwf.supply/)",defaultValue:8,min:0,max:64}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"LiquidImage","slots":[],"annotations":{"framerContractVersion":"1","framerDisableUnlink":"","framerSupportedLayoutWidth":"any-prefer-fixed","framerSupportedLayoutHeight":"any-prefer-fixed"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./LiquidImage.map