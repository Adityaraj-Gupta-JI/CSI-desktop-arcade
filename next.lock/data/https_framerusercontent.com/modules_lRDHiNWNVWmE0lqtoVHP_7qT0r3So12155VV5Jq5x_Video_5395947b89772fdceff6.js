import{jsx as _jsx}from"react/jsx-runtime";import{addPropertyControls,ControlType,useIsInCurrentNavigationTarget,RenderTarget}from"framer";import{isMotionValue,useInView}from"framer-motion";import{borderRadiusControl,defaultEvents,useIsBrowserSafari,useIsOnCanvas,useOnEnter,useOnExit,useRadius,useRenderTarget}from"https://framerusercontent.com/modules/G4IfyjvwmaeSBpdb4TWu/OIjZRBmWDcIE2B6qgG1j/index.js";// https://framer.com/m/framer/default-utils.js@^0.45.0
import{memo,useCallback,useEffect,useMemo,useRef,useState}from"react";var ObjectFitType;(function(ObjectFitType){ObjectFitType["Fill"]="fill";ObjectFitType["Contain"]="contain";ObjectFitType["Cover"]="cover";ObjectFitType["None"]="none";ObjectFitType["ScaleDown"]="scale-down";})(ObjectFitType||(ObjectFitType={}));var SrcType;(function(SrcType){SrcType["Video"]="Upload";SrcType["Url"]="URL";})(SrcType||(SrcType={}));const defaultVideo="https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4";// Reduce renders
function getProps(props){const{width,height,topLeft,topRight,bottomRight,bottomLeft,id,children,...rest}=props;return rest;}/**
 * VIDEO
 *
 * @framerIntrinsicWidth 200
 * @framerIntrinsicHeight 112
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */export function Video(props){const newProps=getProps(props);return /*#__PURE__*/_jsx(VideoMemo,{...newProps});}function usePlaybackControls(videoRef){const isInCurrentNavigationTarget=useIsInCurrentNavigationTarget();const requestingPlay=useRef(false);const isPlayingRef=useRef(false);const setProgress=useCallback(rawProgress=>{if(!videoRef.current)return;const newProgress=(rawProgress===1?.999:rawProgress)*videoRef.current.duration;const isAlreadySet=Math.abs(videoRef.current.currentTime-newProgress)<.1;if(videoRef.current.duration>0&&!isAlreadySet){videoRef.current.currentTime=newProgress;}},[]);const play=useCallback(()=>{const video=videoRef.current;if(!video)return;video.preload="auto"// makes sure browsers don't throttle: https://html.spec.whatwg.org/multipage/media.html#:~:text=When%20the%20media%20resource%20is%20playing%2C%20hints%20to%20the%20user%20agent%20that%20bandwidth%20is%20to%20be%20considered%20scarce%2C%20e.g.%20suggesting%20throttling%20the%20download%20so%20that%20the%20media%20data%20is%20obtained%20at%20the%20slowest%20possible%20rate%20that%20still%20maintains%20consistent%20playback.
;const isPlaying=video.currentTime>0&&video.onplaying&&!video.paused&&!video.ended&&video.readyState>=video.HAVE_CURRENT_DATA;if(!isPlaying&&video&&!requestingPlay.current&&isInCurrentNavigationTarget){requestingPlay.current=true;isPlayingRef.current=true;video.play().catch(e=>{})// It's likely fine, swallow error
.finally(()=>requestingPlay.current=false);}},[]);const pause=useCallback(()=>{if(!videoRef.current||requestingPlay.current)return;videoRef.current.pause();isPlayingRef.current=false;},[]);return{play,pause,setProgress,isPlaying:isPlayingRef};}function useAutoplayBehavior({playingProp,muted,loop,playsinline,controls}){const[initialPlayingProp]=useState(()=>playingProp);const[hasPlayingPropChanged,setHasPlayingPropChanged]=useState(false);if(playingProp!==initialPlayingProp&&!hasPlayingPropChanged){setHasPlayingPropChanged(true);}const behavesAsGif=// passing `playing === true` on mount indicates that the video should
// autoplay, like a GIF
initialPlayingProp&&muted&&loop&&playsinline&&!controls&&// Some users of the <Video> component use it by wrapping it with
// another smart component and adding their own controls on top. (The
// controls use transitions to control the video: e.g., when clicking
// the play button, the smart component will transition to a state with
// <Video playing={true} />.) In this case, we don't want the video to
// behave as a gif, as it will be weird if the video suddenly started
// acting as such (and auto-pausing when leaving the viewport) as soon
// as the site visitor mutes it and clicks “Play”.
!hasPlayingPropChanged;let autoplay;if(behavesAsGif)autoplay="on-viewport";else if(initialPlayingProp)autoplay="on-mount";else autoplay="no-autoplay";return autoplay;}const VideoMemo=/*#__PURE__*/memo(function VideoInner(props){const{// default props
srcType="URL",srcUrl,srcFile="",posterEnabled=false,controls=false,playing=true,loop=true,muted=true,playsinline=true,restartOnEnter=false,objectFit="cover",backgroundColor="rgba(0,0,0,0)",radius=0,volume=25,startTime:startTimeProp=0,poster,playing:playingProp,progress,onSeeked,onPause,onPlay,onEnd,onClick,onMouseEnter,onMouseLeave,onMouseDown,onMouseUp}=props;const videoRef=useRef();const isSafari=useIsBrowserSafari();const wasPausedOnLeave=useRef(null);const wasEndedOnLeave=useRef(null);const isOnCanvas=useIsOnCanvas();const renderTarget=useRenderTarget();const isStaticRenderer=isOnCanvas||renderTarget===RenderTarget.export;const borderRadius=useRadius(props);// Hard-coding `autoplayBehavior` and `isInViewport` when on canvas as a
// tiny perf optimization. isStaticRenderer won’t change through the lifecycle of
// the component, so using these hooks conditionally should be safe
const autoplayBehavior=isStaticRenderer?"no-autoplay":useAutoplayBehavior({playingProp,muted,loop,playsinline,controls});const isInViewport=isStaticRenderer?true:useInView(videoRef);const isCloseToViewport=isStaticRenderer?false:useInView(videoRef,{margin:"10%",once:true});// Video elements behave oddly at 100% duration
const startTime=startTimeProp===100?99.9:startTimeProp;const{play,pause,setProgress,isPlaying}=usePlaybackControls(videoRef);// Pause/play via props
useEffect(()=>{if(isStaticRenderer)return;if(autoplayBehavior==="on-viewport")return;if(playingProp)play();else pause();},[autoplayBehavior,playingProp]);// Pause/play via viewport
useEffect(()=>{if(isStaticRenderer)return;// this also explicitly retries playing for videos that play on-mount, which could fail if they're not muted for example
if(isInViewport&&playingProp&&autoplayBehavior!=="no-autoplay")play();if(autoplayBehavior!=="on-viewport")return;pause();},[autoplayBehavior,isInViewport,playingProp]);useEffect(()=>{if(!isOnCanvas||poster||posterEnabled||startTime||!videoRef.current)return;// forces a poster to show up when the video is in an iframe; this is needed when `poster` changes
videoRef.current.currentTime=.01;},[posterEnabled,poster,startTime]);/**
     * The Video component has some effects that sync the video element with props
     * like `startTime`, `progress`, etc. React calls these effects whenever these
     * props change. However, it also calls them on the first mount, and this is
     * troublesome – if we’re doing SSR, and the user changed the video state before
     * the video was hydrated, the initial `useEffect` call will reset the video
     * state. To avoid this, we use this flag.
     */const isMountedAndReadyForProgressChanges=useRef(false);// Allow scrubbling via progress prop
// 1) Handle cases when the progress prop itself changes
useEffect(()=>{if(!isMountedAndReadyForProgressChanges.current){isMountedAndReadyForProgressChanges.current=true;return;}const rawProgressValue=isMotionValue(progress)?progress.get():(progress??0)*.01;setProgress(// When the progress value exists (e.g. <Video startTime={10}
// progress={50} />), we respect the `progress` value over
// `startTime`, even if `startTime` changes. That’s because
// `startTime` == start == changing it shouldn’t affect the current
// progress
(rawProgressValue??0)||// Then why fall back to `startTime` when `progress` doesn’t exist,
// you might ask? Now, that’s for
// - canvas UX: we want the video progress to change when the user
//   is scrobbling the “Start Time” in component settings.
// - backwards compatibility: maybe some users *are* scrobbling
//   using `startTime` instead of `progress`? We don’t know, and it
//   always supported it, so let’s not break it
(startTime??0)/100);},[startTime,srcFile,srcUrl,progress]);// 2) Handle cases when the motion value inside the progress prop changes
useEffect(()=>{if(!isMotionValue(progress))return;return progress.on("change",value=>setProgress(value));},[progress]);// (Prototyping) Checking if we need to play on navigation enter
useOnEnter(()=>{if(wasPausedOnLeave.current===null)return;if(videoRef.current){// if (restartOnEnter) setProgress(0)
if(!wasEndedOnLeave&&loop||!wasPausedOnLeave.current)play();}});// (Prototyping) Pausing & saving playing state on navigation exit
useOnExit(()=>{if(videoRef.current){wasEndedOnLeave.current=videoRef.current.ended;wasPausedOnLeave.current=videoRef.current.paused;pause();}});const src=useMemo(()=>{let fragment="";// if (
//     startTime > 0 &&
//     videoRef.current &&
//     !isNaN(videoRef.current.duration) &&
//     !isStaticRenderer
// ) {
//     console.log(startTime, videoRef.current.duration)
//     fragment = `#t=${startTime * videoRef.current.duration}`
// }
if(srcType==="URL")return srcUrl+fragment;if(srcType==="Upload")return srcFile+fragment;},[srcType,srcFile,srcUrl,startTime]);// Autoplay via JS to work in Safari
useEffect(()=>{if(isSafari&&videoRef.current&&autoplayBehavior==="on-mount"){setTimeout(()=>play(),50);}},[]);// Volume Control
useEffect(()=>{if(videoRef.current&&!muted)videoRef.current.volume=(volume??0)/100;},[volume]);// When video is ready, set start-time, then autoplay if needed
const handleReady=()=>{const video=videoRef.current;if(!video)return;if(video.currentTime<.3&&startTime>0)setProgress((startTime??0)*.01);if(// when the component updates (e.g. only srcFile/url changes), and the video was already playing, keep playing
isPlaying.current||autoplayBehavior==="on-mount"||playingProp&&autoplayBehavior==="on-viewport"&&isInViewport)play();};return /*#__PURE__*/_jsx("video",{onClick,onMouseEnter,onMouseLeave,onMouseDown,onMouseUp,src:src,loop:loop,ref:videoRef,onSeeked:e=>onSeeked?.(e),onPause:e=>onPause?.(e),onPlay:e=>onPlay?.(e),onEnded:e=>onEnd?.(e),autoPlay:isPlaying.current||autoplayBehavior==="on-mount"||playingProp&&autoplayBehavior==="on-viewport"&&isInViewport,preload:isPlaying.current?"auto":isStaticRenderer&&!poster?"metadata":autoplayBehavior!=="on-mount"&&!isCloseToViewport?"none":// `autoplay` overrides this too
"metadata",poster:posterEnabled&&!srcFile&&srcUrl===defaultVideo?"https://framerusercontent.com/images/5ILRvlYXf72kHSVHqpa3snGzjU.jpg":posterEnabled&&poster?poster:undefined,onLoadedData:handleReady,controls:controls,muted:isStaticRenderer?true:muted,playsInline:playsinline,style:{cursor:!!onClick?"pointer":"auto",width:"100%",height:"100%",borderRadius,display:"block",objectFit:objectFit,backgroundColor:backgroundColor,objectPosition:"50% 50%"}});});Video.displayName="Video";function capitalizeFirstLetter(value){return value.charAt(0).toUpperCase()+value.slice(1);}export function titleCase(value){const groups=value.match(/[A-Z]{2,}|[A-Z][a-z]+|[a-z]+|[A-Z]|\d+/gu)||[];return groups.map(capitalizeFirstLetter).join(" ");}const objectFitOptions=["cover","fill","contain","scale-down","none"];addPropertyControls(Video,{srcType:{type:ControlType.Enum,displaySegmentedControl:true,title:"Source",options:["URL","Upload"]},srcUrl:{type:ControlType.String,title:"URL",defaultValue:"https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4",hidden(props){return props.srcType==="Upload";}},srcFile:{type:ControlType.File,title:"File",allowedFileTypes:["mp4","webm"],hidden(props){return props.srcType==="URL";}},playing:{type:ControlType.Boolean,title:"Playing",enabledTitle:"Yes",disabledTitle:"No"},...borderRadiusControl,posterEnabled:{type:ControlType.Boolean,title:"Poster",enabledTitle:"Yes",disabledTitle:"No"},poster:{type:ControlType.Image,title:"Image",hidden:({posterEnabled})=>!posterEnabled,description:"We recommend adding a poster. [Learn more](https://www.framer.com/help/articles/how-are-videos-optimized-in-framer/)."},backgroundColor:{type:ControlType.Color,title:"Background",defaultValue:"rgba(0,0,0,0)"},startTime:{title:"Start Time",type:ControlType.Number,min:0,max:100,step:.1,unit:"%"},loop:{type:ControlType.Boolean,title:"Loop",enabledTitle:"Yes",disabledTitle:"No"},objectFit:{type:ControlType.Enum,title:"Fit",options:objectFitOptions,optionTitles:objectFitOptions.map(titleCase)},// restartOnEnter: {
//     type: ControlType.Boolean,
//     title: "On ReEnter",
//     enabledTitle: "Restart",
//     disabledTitle: "Resume",
// },
controls:{type:ControlType.Boolean,title:"Controls",enabledTitle:"Show",disabledTitle:"Hide",defaultValue:false},muted:{type:ControlType.Boolean,title:"Muted",enabledTitle:"Yes",disabledTitle:"No"},volume:{type:ControlType.Number,max:100,min:0,unit:"%",hidden:({muted})=>muted,defaultValue:25},onEnd:{type:ControlType.EventHandler},onSeeked:{type:ControlType.EventHandler},onPause:{type:ControlType.EventHandler},onPlay:{type:ControlType.EventHandler},...defaultEvents});
export const __FramerMetadata__ = {"exports":{"VideoProps":{"type":"tsType","annotations":{"framerContractVersion":"1"}},"titleCase":{"type":"function","annotations":{"framerContractVersion":"1"}},"Video":{"type":"reactComponent","name":"Video","slots":[],"annotations":{"framerIntrinsicHeight":"112","framerContractVersion":"1","framerSupportedLayoutWidth":"fixed","framerIntrinsicWidth":"200","framerSupportedLayoutHeight":"any-prefer-fixed"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Video.map