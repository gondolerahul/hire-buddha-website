"use strict";var FluidBuddha=(()=>{var or=Object.defineProperty;var fc=Object.getOwnPropertyDescriptor;var pc=Object.getOwnPropertyNames;var mc=Object.prototype.hasOwnProperty;var gc=(i,t)=>{for(var e in t)or(i,e,{get:t[e],enumerable:!0})},vc=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of pc(t))!mc.call(i,s)&&s!==e&&or(i,s,{get:()=>t[s],enumerable:!(n=fc(t,s))||n.enumerable});return i};var xc=i=>vc(or({},"__esModule",{value:!0}),i);var Qm={};gc(Qm,{Canvas:()=>Ye,FluidBuddhaElement:()=>dn,HostBridge:()=>fn,Session:()=>pn,VERSION:()=>ac,default:()=>jm,init:()=>Ua});var yc=["basic","high","advance","extreme"],_c=["level1","level2","level3"];var lr={backend:"",api:"",site:"hirebuddha",position:"bottom-right",accent:"#c9a24a",greeting:"Hi, I'm Pragya. Tap the mic and ask me anything \u2014 I can show you around, run the numbers, and answer with grounded facts.",autoInject:!1,autoStart:!1,intelligence:"advance",design:"level1",tour:!0,hooks:{}};function bc(i){return i?i.replace(/^wss:/,"https:").replace(/^ws:/,"http:"):""}function cr(i={}){var e;let t=(e=i.backend)!=null?e:lr.backend;return{...lr,...i,backend:t,api:i.api||bc(t),hooks:{...lr.hooks,...i.hooks||{}}}}function Ei(i){if(!i)return{};let t=g=>{var v,p;return(p=(v=i.getAttribute(`data-${g}`))!=null?v:i.getAttribute(g))!=null?p:void 0},e={},n=t("backend");n&&(e.backend=n);let s=t("api");s&&(e.api=s);let r=t("site");r&&(e.site=r);let o=t("accent");o&&(e.accent=o);let a=t("greeting");a&&(e.greeting=a);let l=t("position");(l==="bottom-left"||l==="bottom-right")&&(e.position=l);let c=t("auto");c!=null&&(e.autoInject=c!=="false");let h=t("auto-start");h!=null&&(e.autoStart=h!=="false");let u=t("intelligence");u&&yc.includes(u)&&(e.intelligence=u);let f=t("design");f&&_c.includes(f)&&(e.design=f);let m=t("tour");return m!=null&&(e.tour=m!=="false"),e}var fn=class{constructor(t){this.hooks=t}emit(t,e){try{window.dispatchEvent(new CustomEvent(`fluidbuddha:${t}`,{detail:e}))}catch{}}navigate(t){if(t){if(this.emit("navigate",{path:t}),this.hooks.onNavigate){this.hooks.onNavigate(t);return}try{window.location.assign(t)}catch{}}}scrollTo(t){var s,r;let e=(s=t.sectionId)==null?void 0:s.trim(),n=(r=t.direction)==null?void 0:r.trim();if(!(!e&&!n)){if(this.emit("scroll_to",{sectionId:e,direction:n}),this.hooks.onScrollTo){this.hooks.onScrollTo(t);return}if(n){this.scrollDirection(n);return}e&&this.scrollToSection(e)}}scrollDirection(t){try{let e=window.innerHeight||600,n=document.documentElement.scrollHeight;t==="top"?window.scrollTo({top:0,behavior:"smooth"}):t==="bottom"?window.scrollTo({top:n,behavior:"smooth"}):t==="up"?window.scrollBy({top:-e*.85,behavior:"smooth"}):window.scrollBy({top:e*.85,behavior:"smooth"})}catch{}}scrollToSection(t){let e=t.replace(/^#/,""),n=null;try{n=document.getElementById(e)}catch{}n||(n=this.findByText(e)),n==null||n.scrollIntoView({behavior:"smooth",block:"start"})}findByText(t){let e=t.replace(/[-_]/g," ").toLowerCase().trim();if(!e)return null;try{let n=Array.from(document.querySelectorAll("[id]")).find(r=>r.id.replace(/[-_]/g," ").toLowerCase().includes(e));return n||Array.from(document.querySelectorAll("h1,h2,h3,h4")).find(r=>(r.textContent||"").toLowerCase().includes(e))||null}catch{return null}}setPersona(t){if(!t)return;this.emit("set_persona",{persona:t});let e=()=>{if(this.hooks.onSetPersona){this.hooks.onSetPersona(t);return}try{document.documentElement.setAttribute("data-fb-persona",t)}catch{}};this.crossfade(e)}crossfade(t){if(typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||typeof document=="undefined"||!document.body){t();return}try{let n=document.createElement("div");n.setAttribute("data-fb-persona-veil",""),n.style.cssText=["position:fixed","inset:0","z-index:2147483646","pointer-events:none","opacity:0","background:radial-gradient(120% 120% at 50% 0%, rgba(22,19,14,0.42), rgba(8,8,10,0.28))","backdrop-filter:blur(2px)","-webkit-backdrop-filter:blur(2px)","transition:opacity 150ms ease","will-change:opacity"].join(";"),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1"}),window.setTimeout(()=>{t(),n.style.opacity="0",window.setTimeout(()=>n.remove(),200)},150)}catch{t()}}};var Xi=class{constructor(t){this.ctx=null;this.stream=null;this.processor=null;this.source=null;this.speaking=!1;this.silenceMs=0;this.voicedMs=0;this.lastLevel=0;this.startThreshold=.03;this.continueThreshold=.018;this.attackMs=180;this.hangoverMs=850;this.handlers=t}level(){return this.lastLevel}async start(){this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),this.ctx=new AudioContext,this.source=this.ctx.createMediaStreamSource(this.stream),this.processor=this.ctx.createScriptProcessor(4096,1,1);let t=this.ctx.sampleRate/16e3;this.processor.onaudioprocess=e=>{let n=e.inputBuffer.getChannelData(0);this.runVad(n,e.inputBuffer.duration*1e3),this.handlers.onChunk(this.downsampleToPcm16(n,t))},this.source.connect(this.processor),this.processor.connect(this.ctx.destination)}runVad(t,e){let n=0;for(let r=0;r<t.length;r++)n+=t[r]*t[r];let s=Math.sqrt(n/t.length);if(this.lastLevel+=(Math.min(1,s*8)-this.lastLevel)*.4,!this.speaking){s>this.startThreshold?(this.voicedMs+=e,this.voicedMs>=this.attackMs&&(this.voicedMs=0,this.silenceMs=0,this.speaking=!0,this.handlers.onSpeechStart())):this.voicedMs=Math.max(0,this.voicedMs-e);return}s>this.continueThreshold?this.silenceMs=0:(this.silenceMs+=e,this.silenceMs>=this.hangoverMs&&(this.speaking=!1,this.silenceMs=0,this.voicedMs=0,this.handlers.onSpeechEnd()))}downsampleToPcm16(t,e){let n=Math.floor(t.length/e),s=new Int16Array(n);for(let r=0;r<n;r++){let o=Math.max(-1,Math.min(1,t[Math.floor(r*e)]));s[r]=o<0?o*32768:o*32767}return new Uint8Array(s.buffer)}stop(){var t,e,n,s;(t=this.processor)==null||t.disconnect(),(e=this.source)==null||e.disconnect(),(n=this.stream)==null||n.getTracks().forEach(r=>r.stop()),(s=this.ctx)==null||s.close(),this.ctx=null,this.stream=null,this.processor=null,this.source=null,this.speaking=!1,this.silenceMs=0,this.voicedMs=0}};var Ti=class{constructor(t=24e3){this.ctx=null;this.current=null;this.out=null;this.analyser=null;this.levelData=null;this.smoothLevel=0;this.sampleRate=t}ensureCtx(){if(!this.ctx){let t=globalThis.AudioContext||globalThis.webkitAudioContext;if(!t)throw new Error("AudioContext unavailable");this.ctx=new t({sampleRate:this.sampleRate}),this.out=this.ctx.createGain(),this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=256,this.out.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.levelData=new Uint8Array(new ArrayBuffer(this.analyser.fftSize))}return this.ctx}level(){if(!this.analyser||!this.levelData)return 0;this.analyser.getByteTimeDomainData(this.levelData);let t=0;for(let s=0;s<this.levelData.length;s++){let r=(this.levelData[s]-128)/128;t+=r*r}let e=Math.sqrt(t/this.levelData.length),n=Math.min(1,e*3.4);return this.smoothLevel+=(n-this.smoothLevel)*.35,this.smoothLevel}play(t){let e=this.ensureCtx(),n=t.reduce((h,u)=>h+u.byteLength,0);if(n===0)return Promise.resolve();let s=new Uint8Array(n),r=0;for(let h of t)s.set(h,r),r+=h.byteLength;let o=new DataView(s.buffer),a=s.byteLength/2,l=e.createBuffer(1,a,this.sampleRate),c=l.getChannelData(0);for(let h=0;h<a;h++)c[h]=o.getInt16(h*2,!0)/32768;return new Promise(h=>{var f;let u=e.createBufferSource();u.buffer=l,u.connect((f=this.out)!=null?f:e.destination),u.onended=()=>{this.current===u&&(this.current=null),h()},this.current=u,u.start()})}playFiller(t=450){let e=this.ensureCtx(),n=Math.floor(this.sampleRate*t/1e3),s=e.createBuffer(1,n,this.sampleRate),r=s.getChannelData(0);for(let o=0;o<n;o++){let a=Math.min(1,o/400,(n-o)/400);r[o]=Math.sin(2*Math.PI*220*o/this.sampleRate)*.04*a}return new Promise(o=>{var l;let a=e.createBufferSource();a.buffer=s,a.connect((l=this.out)!=null?l:e.destination),a.onended=()=>o(),a.start()})}stop(){var t;try{(t=this.current)==null||t.stop()}catch{}this.current=null}isPlaying(){return this.current!==null}resume(){try{this.ensureCtx().resume()}catch{}}};var Ai=class{constructor(t,e=1500){this.segments=new Map;this.ready=[];this.renderResolvers=new Map;this.running=!1;this.generation=0;this.player=t,this.fillerDelayMs=e}startAudio(t,e){this.segments.set(t,{chunks:[],gated:e,rendered:!1})}pushAudio(t,e){var s;let n=(s=this.segments.get(t))!=null?s:{chunks:[],gated:!1,rendered:!1};n.chunks.push(e),this.segments.set(t,n)}endAudio(t){this.segments.has(t)&&(this.ready.push(t),this.pump())}markRendered(t){var n;let e=this.segments.get(t);e&&(e.rendered=!0),(n=this.renderResolvers.get(t))==null||n(),this.renderResolvers.delete(t)}reset(){this.generation+=1,this.ready=[],this.segments.clear(),this.renderResolvers.forEach(t=>t()),this.renderResolvers.clear(),this.player.stop(),this.running=!1}isPlaying(){return this.running||this.ready.length>0||this.segments.size>0||this.player.isPlaying()}waitForRender(t){return new Promise(e=>this.renderResolvers.set(t,e))}delay(t){return new Promise(e=>setTimeout(e,t))}async pump(){if(this.running)return;this.running=!0;let t=this.generation;for(;this.ready.length&&t===this.generation;){let e=this.ready.shift(),n=this.segments.get(e);if(n){if(n.gated&&!n.rendered){if(await Promise.race([this.waitForRender(e),this.delay(this.fillerDelayMs)]),t!==this.generation)break;n.rendered||await this.player.playFiller()}if(t!==this.generation)break;await this.player.play(n.chunks),this.segments.delete(e)}}t===this.generation&&(this.running=!1)}};var Va=i=>{let t=atob(i),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e},Ga=i=>{let t="";for(let n=0;n<i.length;n+=32768)t+=String.fromCharCode(...i.subarray(n,n+32768));return btoa(t)};var qi=class{constructor(t,e){this.ws=null;this.retries=0;this.maxRetries=4;this.manualClose=!1;this.url=t,this.handlers=e}connect(){this.manualClose=!1,this.handlers.onStatus("connecting");try{this.ws=new WebSocket(this.url)}catch{this.handlers.onStatus("failed");return}this.ws.onopen=()=>{this.retries=0,this.handlers.onStatus("open")},this.ws.onmessage=t=>{try{this.handlers.onEnvelope(JSON.parse(t.data))}catch{}},this.ws.onclose=()=>{this.handlers.onStatus("closed"),this.manualClose||this.retry()},this.ws.onerror=()=>{var t;return(t=this.ws)==null?void 0:t.close()}}retry(){if(this.retries>=this.maxRetries){this.handlers.onStatus("failed");return}let t=Math.min(8e3,500*2**this.retries);this.retries+=1,setTimeout(()=>this.connect(),t)}send(t){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(t))}sendText(t){this.send({channel:"EVENTS",type:"text",payload:{text:t}})}startAudio(){this.send({channel:"AUDIO",type:"start",payload:{}})}sendAudioChunk(t){this.send({channel:"AUDIO",type:"chunk",payload:{data:Ga(t)}})}endAudio(t){this.send({channel:"AUDIO",type:"end",payload:t?{transcript:t}:{}})}sendState(t){this.send({channel:"STATE",type:"sync",payload:t})}sendHello(t={}){this.send({channel:"EVENTS",type:"hello",payload:t})}sendBargeIn(t={}){this.send({channel:"STATE",type:"barge_in",payload:t})}sendRaw(t,e,n){this.send({channel:t,type:e,payload:n})}close(){var t;this.manualClose=!0,(t=this.ws)==null||t.close(),this.ws=null}get isOpen(){var t;return((t=this.ws)==null?void 0:t.readyState)===WebSocket.OPEN}};var Ci=i=>new Promise(t=>setTimeout(t,i)),Yi=class{constructor(t){this.host=t;this.aborted=!1;this.running=!1}get active(){return this.running}abort(){this.running&&(this.aborted=!0)}async run(t){var e,n,s,r;if(!(this.running||!t||t.length===0)){this.running=!0,this.aborted=!1,(n=(e=this.host).status)==null||n.call(e,"touring");try{for(let o=0;o<t.length&&!this.aborted;o++){let a=t[o];if(a.narration&&await this.speakStop(a.narration,o),this.aborted||(await this.performMove(a.move),this.aborted))break;await Ci(450)}}finally{this.running=!1,(r=(s=this.host).status)==null||r.call(s,"")}}}async speakStop(t,e){this.host.say(t,e),await Promise.race([this.host.awaitSaid(e),Ci(2e4)]),!this.aborted&&await this.waitUntil(()=>!this.host.isSpeaking(),9e4)}async performMove(t){!t||this.aborted||(t.type==="navigate"&&t.route?t.route!==this.host.currentPath()&&(this.host.navigate(t.route),await Ci(950)):t.type==="scroll"&&t.target&&(this.host.scroll(t.target),await Ci(750)))}async waitUntil(t,e){let n=Date.now();for(;!this.aborted&&!t()&&Date.now()-n<e;)await Ci(120)}};var pn=class{constructor(t,e,n){this.config=t;this.bridge=e;this.cb=n;this.client=null;this.capture=null;this.player=null;this.jitter=null;this.recognition=null;this.lastTranscript="";this.pendingAudio=0;this.userSpeaking=!1;this._active=!1;this.greeted=!1;this.welcomeEnabled=!1;this._audioUnlockArmed=!1;this.tourDoneWaiters=new Map;this.tour=new Yi({say:(s,r)=>{var o;return(o=this.client)==null?void 0:o.sendRaw("EVENTS","tour_say",{text:s,index:r})},awaitSaid:s=>this.awaitTourDone(s),isSpeaking:()=>{var s,r;return(r=(s=this.jitter)==null?void 0:s.isPlaying())!=null?r:!1},navigate:s=>this.bridge.navigate(s),scroll:s=>this.tourScroll(s),currentPath:()=>typeof location!="undefined"?location.pathname:"",status:s=>{var r,o;return(o=(r=this.cb).onTourStatus)==null?void 0:o.call(r,s)}})}get active(){return this._active}inputLevel(){var t,e;return(e=(t=this.capture)==null?void 0:t.level())!=null?e:0}outputLevel(){var t,e;return(e=(t=this.player)==null?void 0:t.level())!=null?e:0}wsUrl(){let t=(this.config.backend||"ws://localhost:8080").replace(/\/$/,""),e=new URLSearchParams({site:this.config.site,intelligence:this.config.intelligence,design:this.config.design});return`${t}/ws/voice?${e.toString()}`}withLevels(t){return{...t,intelligence:this.config.intelligence,design:this.config.design,tour:this.config.tour}}connect(){var t;(t=this.client)!=null&&t.isOpen||(this.client||(this.client=new qi(this.wsUrl(),{onEnvelope:e=>this.feed(e),onStatus:e=>{this.cb.onStatus(e),e==="failed"&&this.cb.onSystem("Voice link unavailable \u2014 using text mode.")}})),this.client.connect())}feed(t){var n,s,r,o,a,l,c,h,u,f,m;let e=t.sync_id||"";switch(t.channel){case"EVENTS":if(t.type==="ready"){let g=t.payload.config||{};this.player||(this.player=new Ti((n=g.sample_rate)!=null?n:24e3)),this.jitter||(this.jitter=new Ai(this.player,(s=g.filler_delay_ms)!=null?s:1500)),this.player.resume(),this.onReady()}else if(t.type==="navigate")this.bridge.navigate(String(t.payload.path||""));else if(t.type==="scroll_to")this.bridge.scrollTo({sectionId:t.payload.sectionId?String(t.payload.sectionId):void 0,direction:t.payload.direction?String(t.payload.direction):void 0});else if(t.type==="set_persona")this.bridge.setPersona(String(t.payload.persona||""));else if(t.type==="tour_plan"){let g=t.payload.stops||[];this.config.tour&&g.length&&this.tour.run(g)}else t.type==="tour_done"?this.resolveTourDone(Number((r=t.payload.index)!=null?r:-1)):t.type==="recalibrating"?this.cb.onSystem("Re-calibrating\u2026"):t.type==="interrupted"?((o=this.jitter)==null||o.reset(),this.tour.abort()):t.type==="error"&&this.cb.onSystem(String(t.payload.message||"Error"));break;case"STATE":t.type==="transcript"&&this.cb.onUserTranscript(String(t.payload.text||""),!1);break;case"DATA":t.type==="render"?this.cb.onComponent(t.payload):t.type==="render_page"?(l=(a=this.cb).onPage)==null||l.call(a,t.payload):t.type==="patch"&&this.cb.onPatch(String(t.payload.target_sync_id||""),t.payload.patch||{});break;case"AUDIO":if(t.type==="start"){this.pendingAudio+=1,(c=this.jitter)==null||c.startAudio(e,e.startsWith("ui_"));let g=String(t.payload.text||"");g&&!e.startsWith("ack_")&&this.cb.onAgentMessage(g,t.payload.grounding)}else if(t.type==="chunk"){let g=t.payload.data;g&&((h=this.jitter)==null||h.pushAudio(e,Va(g)),e.startsWith("ack_")||(f=(u=this.cb).onAgentAudio)==null||f.call(u))}else t.type==="end"&&(this.pendingAudio=Math.max(0,this.pendingAudio-1),(m=this.jitter)==null||m.endAudio(e));break}}startRecognition(){let t=window,e=t.SpeechRecognition||t.webkitSpeechRecognition;if(!e)return;let n=new e;n.continuous=!0,n.interimResults=!0,n.lang="en-US",n.onresult=s=>{let r="";for(let o=s.resultIndex;o<s.results.length;o++){let a=s.results[o],l=a[0].transcript;a.isFinal?this.lastTranscript=l:r+=l}r&&this.cb.onUserTranscript(r,!0)},n.onerror=()=>{},this.recognition=n;try{n.start()}catch{}}async startVoice(){var e;this.connect(),(e=this.player)==null||e.resume(),this.reportCurrentPage(),this.startRecognition();let t=new Xi({onChunk:n=>{var s;this.userSpeaking&&((s=this.client)==null||s.sendAudioChunk(n))},onSpeechStart:()=>{var n,s,r,o;((n=this.jitter)!=null&&n.isPlaying()||this.pendingAudio>0)&&((s=this.client)==null||s.sendBargeIn(),(r=this.jitter)==null||r.reset(),this.pendingAudio=0,this.abortTour()),this.lastTranscript="",this.userSpeaking=!0,(o=this.client)==null||o.startAudio()},onSpeechEnd:()=>{var s;this.userSpeaking=!1;let n=this.lastTranscript.trim();(s=this.client)==null||s.endAudio(n||void 0),this.lastTranscript=""}});try{await t.start(),this.capture=t,this._active=!0}catch{this.cb.onSystem("Microphone unavailable \u2014 type to chat instead."),this._active=!1}}stopVoice(){var t,e,n;this.abortTour(),(t=this.capture)==null||t.stop(),this.capture=null;try{(e=this.recognition)==null||e.stop()}catch{}this.recognition=null,(n=this.jitter)==null||n.reset(),this._active=!1}sendText(t){var e;t.trim()&&(this.abortTour(),this.connect(),(e=this.client)!=null&&e.isOpen?(this.reportCurrentPage(),this.client.sendText(t)):this.httpFallback(t))}async httpFallback(t){var e,n,s,r;this.cb.onUserTranscript(t,!1);try{let o=(n=(e=this.pageProvider)==null?void 0:e.call(this))!=null?n:{},a=await fetch(`${(this.config.api||"").replace(/\/$/,"")}/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,session_id:this.textSessionId,site:this.config.site,intelligence:this.config.intelligence,design:this.config.design,page:(s=o.page)!=null?s:typeof location!="undefined"?location.pathname:void 0,sections:o.sections})}),l=await a.json();if(!a.ok||l.error){this.cb.onSystem("Agent is offline right now. Please try again shortly.");return}this.textSessionId=(r=l.session_id)!=null?r:this.textSessionId,this.cb.onAgentMessage(l.text||"\u2026",l.grounding),(l.actions||[]).forEach(c=>{c.type==="navigate"&&c.path?this.bridge.navigate(c.path):c.type==="set_icp"&&c.icp?this.bridge.setPersona(c.icp):c.type==="scroll_to"&&(c.sectionId||c.direction)&&this.bridge.scrollTo({sectionId:c.sectionId,direction:c.direction})}),(l.components||[]).forEach(c=>this.cb.onComponent(c)),(l.pages||[]).forEach(c=>{var h,u;return(u=(h=this.cb).onPage)==null?void 0:u.call(h,c)})}catch{this.cb.onSystem("Connection error. The agent is offline.")}}notifyRendered(t){var e;(e=this.jitter)==null||e.markRendered(t)}awaitTourDone(t){return new Promise(e=>this.tourDoneWaiters.set(t,e))}resolveTourDone(t){let e=this.tourDoneWaiters.get(t);e&&(this.tourDoneWaiters.delete(t),e())}tourScroll(t){["down","up","top","bottom"].includes(t)?this.bridge.scrollTo({direction:t}):this.bridge.scrollTo({sectionId:t})}abortTour(){this.tour.abort(),this.tourDoneWaiters.forEach(t=>t()),this.tourDoneWaiters.clear()}reportState(t){var e;(e=this.client)==null||e.sendState(t)}reportComponentState(t,e){this.reportState({component_state:{sync_id:t,...e}})}enableWelcome(t){this.pageProvider=t,this.welcomeEnabled=!0}primeAudio(){this.player||(this.player=new Ti(24e3)),this.jitter||(this.jitter=new Ai(this.player,1500)),this.player.resume(),this.armAudioUnlock()}armAudioUnlock(){if(this._audioUnlockArmed||typeof window=="undefined")return;this._audioUnlockArmed=!0;let t=()=>{var e;(e=this.player)==null||e.resume(),window.removeEventListener("pointerdown",t),window.removeEventListener("keydown",t),window.removeEventListener("touchstart",t),this._audioUnlockArmed=!1};window.addEventListener("pointerdown",t),window.addEventListener("keydown",t),window.addEventListener("touchstart",t)}reportCurrentPage(){var e,n;let t=(e=this.pageProvider)==null?void 0:e.call(this);t&&((n=this.client)!=null&&n.isOpen)&&this.client.sendState(this.withLevels(t))}onReady(){var t,e,n;this.reportCurrentPage(),this.welcomeEnabled&&!this.greeted&&(this.greeted=!0,(n=this.client)==null||n.sendHello(this.withLevels((e=(t=this.pageProvider)==null?void 0:t.call(this))!=null?e:{})))}destroy(){var t;this.stopVoice(),(t=this.client)==null||t.close(),this.client=null}};async function Wa(i,t){if(!i)return null;try{let e=await fetch(`${i.replace(/\/$/,"")}/design-system?site=${encodeURIComponent(t)}`);return e.ok?await e.json():null}catch{return null}}function Xa(i,t){if(t)for(let[e,n]of Object.entries(t))e.startsWith("--ds-")&&i.style.setProperty(e,n)}var Mc=typeof setTimeout=="function"?(i,t)=>void setTimeout(i,t):i=>i();function pe(i,t={}){var o,a,l;let e=(o=t.stepMs)!=null?o:350,n=(a=t.startMs)!=null?a:0,s=i.length;if(s===0){(l=t.onMidpoint)==null||l.call(t);return}let r=Math.floor((s-1)/2);i.forEach((c,h)=>{c.classList.add("fb-reveal-item"),c.style.animationDelay=`${(n+h*e)/1e3}s`,Mc(()=>{var u,f;(u=t.onProgress)==null||u.call(t,h+1,s),h===r&&((f=t.onMidpoint)==null||f.call(t))},n+h*e)})}function $i(i){var r,o;let t=(r=i.nodes)!=null?r:[],e=(o=i.edges)!=null?o:[],n=document.createElement("div");if(n.className="flow",t.length===0)return n.innerHTML='<div class="empty">No diagram data.</div>',n;let s=[];if(t.forEach((a,l)=>{var h;let c=document.createElement("div");if(c.className="flow-node",c.textContent=(h=a.label)!=null?h:`Node ${l+1}`,n.appendChild(c),s.push(c),l<t.length-1){let u=document.createElement("div");u.className="flow-edge",u.textContent="\u2193",n.appendChild(u),s.push(u)}}),pe(s,{stepMs:250}),e.length>0){let a=document.createElement("div");a.className="caption",a.style.marginTop="8px",a.textContent=`${e.length} connections`,n.appendChild(a)}return n}function qa(i){let t=(f,m)=>typeof f=="number"?f:m,e=t(i.seats,10),n=t(i.monthly_cost,1e4),s=t(i.hours_saved,320),r=document.createElement("div");r.className="roi";let o=document.createElement("span"),a=document.createElement("span"),l=()=>{let m=Math.round(s*45)-n,g=n>0?Math.round(m/n*100):0;o.textContent=`$${m.toLocaleString()}`,o.className=m>=0?"roi-pos":"roi-neg",a.textContent=`${g}%`,a.className=g>=0?"roi-pos":"roi-neg"},c=(f,m,g,v,p,d,M)=>{let x=document.createElement("div");x.className="roi-row";let T=document.createElement("label");T.textContent=f;let R=document.createElement("input");R.type="range",R.min=String(m),R.max=String(g),R.step=String(v),R.value=String(p);let E=document.createElement("span");return E.className="val",E.textContent=d(p),R.addEventListener("input",()=>{let A=Number(R.value);M(A),E.textContent=d(A),l()}),x.append(T,R,E),x};r.appendChild(c("Seats",1,200,1,e,f=>String(f),f=>e=f)),r.appendChild(c("Monthly cost",0,1e5,500,n,f=>`$${f.toLocaleString()}`,f=>n=f)),r.appendChild(c("Hours saved/mo",0,2e3,10,s,f=>String(f),f=>s=f));let h=document.createElement("div");h.className="roi-result";let u=(f,m)=>{let g=document.createElement("div"),v=document.createElement("span");return v.className="roi-label",v.textContent=f,g.append(v,m),g};return h.append(u("Net value/mo",o),u("ROI",a)),r.appendChild(h),l(),r}function Ya(i){var r,o;let t=(r=i.headers)!=null?r:[],e=(o=i.rows)!=null?o:[];if(e.length===0){let a=document.createElement("div");return a.className="empty",a.textContent="No table data.",a}let n=document.createElement("table");if(n.className="cmp",t.length>0){let a=document.createElement("thead"),l=document.createElement("tr");t.forEach(c=>{let h=document.createElement("th");h.textContent=c,l.appendChild(h)}),a.appendChild(l),n.appendChild(a)}let s=document.createElement("tbody");return e.forEach(a=>{let l=document.createElement("tr");a.forEach(c=>{let h=document.createElement("td");h.textContent=String(c),l.appendChild(h)}),s.appendChild(l)}),n.appendChild(s),n}function $a(i){var o,a;let t=(o=i.steps)!=null?o:[],e=(a=i.transitions)!=null?a:[],n=document.createElement("div");if(n.className="wf",t.length===0)return n.innerHTML='<div class="empty">No workflow data.</div>',n;let s=(l,c)=>{var h,u;return(u=(h=e.find(f=>f.from===l&&f.to===c))==null?void 0:h.label)!=null?u:""},r=[];return t.forEach((l,c)=>{var u,f;let h=document.createElement("div");if(h.className=`wf-node wf-${(u=l.type)!=null?u:"process"}`,h.textContent=(f=l.label)!=null?f:`Step ${c+1}`,n.appendChild(h),r.push(h),c<t.length-1){let m=document.createElement("div");m.className="wf-arrow";let g=s(l.id,t[c+1].id);m.textContent=g?`${g} \u2192`:"\u2192",n.appendChild(m),r.push(m)}}),pe(r,{stepMs:250}),n}var Sc="http://www.w3.org/2000/svg";function ut(i,t,e){let n=document.createElementNS(Sc,i);if(t)for(let[s,r]of Object.entries(t))n.setAttribute(s,String(r));return e!=null&&(n.textContent=e),n}function we(i,t){let e=ut("svg",{viewBox:`0 0 ${i} ${t}`,width:"100%",preserveAspectRatio:"xMidYMid meet"});return e.setAttribute("role","img"),e}function Ee(i){if(i.querySelector("defs.fb-glass-defs"))return;let t=ut("defs");t.setAttribute("class","fb-glass-defs");let e=(r,o,a=!0)=>{let l=ut("linearGradient",{id:r,x1:"0",y1:"0",x2:a?"0":"1",y2:a?"1":"0"});for(let c of o){let h=ut("stop",{offset:c.offset});h.setAttribute("style",c.style),l.appendChild(h)}return l};t.appendChild(e("fbGlassFill",[{offset:"0%",style:"stop-color:#ffffff;stop-opacity:0.20"},{offset:"48%",style:"stop-color:#ffffff;stop-opacity:0.06"},{offset:"100%",style:"stop-color:#ffffff;stop-opacity:0.02"}])),t.appendChild(e("fbAccentFill",[{offset:"0%",style:"stop-color:var(--fb-accent);stop-opacity:0.55"},{offset:"100%",style:"stop-color:var(--fb-accent);stop-opacity:0.14"}])),t.appendChild(e("fbEdge",[{offset:"0%",style:"stop-color:#ffffff;stop-opacity:0.65"},{offset:"55%",style:"stop-color:#ffffff;stop-opacity:0.16"},{offset:"100%",style:"stop-color:#ffffff;stop-opacity:0.05"}]));let n=ut("filter",{id:"fbGlow",x:"-40%",y:"-40%",width:"180%",height:"180%"}),s=ut("feDropShadow",{dx:"0",dy:"1.5",stdDeviation:"3.2","flood-color":"#000000","flood-opacity":"0.45"});n.appendChild(s),t.appendChild(n),i.insertBefore(t,i.firstChild)}function Za(i){var T,R;let t=(T=i.components)!=null?T:[],e=(R=i.connections)!=null?R:[],n=document.createElement("div");if(n.className="cdiag",t.length===0)return n.innerHTML='<div class="empty">No diagram data.</div>',n;let s=Math.min(t.length,Math.ceil(Math.sqrt(t.length))+1),r=Math.ceil(t.length/s),o=92,a=46,l=36,c=44,h=16,u=16,f=h*2+s*o+(s-1)*l,m=u*2+r*a+(r-1)*c,g=we(f,m);Ee(g);let v=ut("defs"),p=ut("marker",{id:"fb-arrow-c",viewBox:"0 0 10 10",refX:9,refY:5,markerWidth:6,markerHeight:6,orient:"auto-start-reverse"});p.appendChild(ut("path",{d:"M0,0 L10,5 L0,10 z",class:"fb-arrow-head"})),v.appendChild(p),g.appendChild(v);let d=new Map;t.forEach((E,A)=>{var q;let X=A%s,_=Math.floor(A/s),w=h+X*(o+l),N=u+_*(a+c);d.set((q=E.id)!=null?q:String(A),{x:w+o/2,y:N+a/2})});let M=[];e.forEach(E=>{var w,N;let A=d.get((w=E.from)!=null?w:""),X=d.get((N=E.to)!=null?N:"");if(!A||!X)return;let _=ut("line",{x1:A.x,y1:A.y,x2:X.x,y2:X.y,class:"cdiag-edge","marker-end":"url(#fb-arrow-c)"});g.appendChild(_),M.push(_)});let x=[];return t.forEach((E,A)=>{var tt,L;let X=A%s,_=Math.floor(A/s),w=h+X*(o+l),N=u+_*(a+c),q=ut("g",{class:"cdiag-box"});q.appendChild(ut("rect",{x:w,y:N,width:o,height:a,rx:12,fill:"url(#fbGlassFill)",filter:"url(#fbGlow)",class:"fb-glass-rect"})),q.appendChild(ut("rect",{x:w+1,y:N+1,width:o-2,height:a*.46,rx:11,class:"fb-glass-sheen"})),q.appendChild(ut("text",{x:w+o/2,y:N+a/2+4,"text-anchor":"middle"},(L=(tt=E.label)!=null?tt:E.id)!=null?L:`C${A+1}`)),g.appendChild(q),x.push(q)}),n.appendChild(g),pe([...x,...M],{stepMs:220}),n}function Ja(i){var g,v;let t=(g=i.nodes)!=null?g:[],e=(v=i.edges)!=null?v:[],n=i.directed!==!1,s=document.createElement("div");if(s.className="graph",t.length===0)return s.innerHTML='<div class="empty">No graph data.</div>',s;let r=320,o=240,a=r/2,l=o/2,c=Math.min(r,o)/2-40,h=we(r,o);if(Ee(h),n){let p=ut("defs"),d=ut("marker",{id:"fb-arrow",viewBox:"0 0 10 10",refX:9,refY:5,markerWidth:6,markerHeight:6,orient:"auto-start-reverse"});d.appendChild(ut("path",{d:"M0,0 L10,5 L0,10 z",class:"fb-arrow-head"})),p.appendChild(d),h.appendChild(p)}let u=new Map;t.forEach((p,d)=>{var T;let M=d/t.length*Math.PI*2-Math.PI/2,x=(T=p.id)!=null?T:String(d);u.set(x,{x:a+c*Math.cos(M),y:l+c*Math.sin(M)})});let f=[];e.forEach(p=>{var T,R;let d=u.get((T=p.from)!=null?T:""),M=u.get((R=p.to)!=null?R:"");if(!d||!M)return;let x=ut("line",{x1:d.x,y1:d.y,x2:M.x,y2:M.y,class:"graph-edge"});n&&x.setAttribute("marker-end","url(#fb-arrow)"),h.appendChild(x),f.push(x)});let m=[];return t.forEach((p,d)=>{var R,E;let M=(R=p.id)!=null?R:String(d),x=u.get(M),T=ut("g",{class:"graph-node"});T.appendChild(ut("circle",{cx:x.x,cy:x.y,r:16,fill:"url(#fbAccentFill)",filter:"url(#fbGlow)",class:"fb-glass-bead"})),T.appendChild(ut("circle",{cx:x.x-5,cy:x.y-6,r:4.5,class:"fb-glass-spec"})),T.appendChild(ut("text",{x:x.x,y:x.y+28,"text-anchor":"middle"},(E=p.label)!=null?E:M)),h.appendChild(T),m.push(T)}),s.appendChild(h),pe([...m,...f],{stepMs:200}),s}var Oe=i=>typeof i=="number"&&isFinite(i)?i:0;function Zi(i){var r;let t=i.chart_type||"bar",e=((r=i.data)!=null?r:[]).map(o=>{var a;return{label:(a=o.label)!=null?a:"",value:Oe(o.value)}}),n=i.unit||"",s=document.createElement("div");if(s.className="chart",e.length===0)return s.innerHTML='<div class="empty">No chart data.</div>',s;if(i.title){let o=document.createElement("div");o.className="chart-title",o.textContent=String(i.title),s.appendChild(o)}return t==="pie"?s.appendChild(Tc(e,n)):t==="line"?s.appendChild(Ec(e,n)):s.appendChild(wc(e,n)),s}function Ka(i,t){return t?`${i.toLocaleString()}${t}`:i.toLocaleString()}function wc(i,t){let a=Math.max(1,...i.map(u=>Oe(u.value))),l=(320-8*2)/i.length,c=we(320,200);Ee(c);let h=[];return i.forEach((u,f)=>{var M;let m=Oe(u.value)/a*164,g=8+f*l+l*.15,v=l*.7,p=172-m,d=ut("g",{class:"chart-bar"});d.appendChild(ut("rect",{x:g,y:p,width:v,height:m,rx:5,fill:"url(#fbAccentFill)",filter:"url(#fbGlow)"})),d.appendChild(ut("rect",{x:g,y:p,width:v,height:Math.min(m,6),rx:5,class:"fb-glass-sheen"})),d.appendChild(ut("text",{x:g+v/2,y:p-4,"text-anchor":"middle",class:"chart-val"},Ka(Oe(u.value),t))),d.appendChild(ut("text",{x:g+v/2,y:186,"text-anchor":"middle",class:"chart-axis"},(M=u.label)!=null?M:"")),c.appendChild(d),h.push(d)}),pe(h,{stepMs:200}),c}function Ec(i,t){let l=Math.max(1,...i.map(M=>Oe(M.value))),c=i.length>1?i.length-1:1,h=M=>8+M/c*304,u=M=>172-M/l*162,f=we(320,200);Ee(f);let m=172,g=`${h(0)},${m} `+i.map((M,x)=>`${h(x)},${u(Oe(M.value))}`).join(" ")+` ${h(i.length-1)},${m}`;f.appendChild(ut("polygon",{points:g,fill:"url(#fbAccentFill)",class:"chart-area"}));let v=i.map((M,x)=>`${h(x)},${u(Oe(M.value))}`).join(" "),p=ut("polyline",{points:v,class:"chart-line",filter:"url(#fbGlow)"});f.appendChild(p);let d=[];return i.forEach((M,x)=>{var R;let T=ut("g",{class:"chart-dot"});T.appendChild(ut("circle",{cx:h(x),cy:u(Oe(M.value)),r:3.5})),T.appendChild(ut("text",{x:h(x),y:186,"text-anchor":"middle",class:"chart-axis"},(R=M.label)!=null?R:"")),f.appendChild(T),d.push(T)}),pe([p,...d],{stepMs:160}),f}function Tc(i,t){let a=i.reduce((u,f)=>u+Math.max(0,Oe(f.value)),0)||1,l=we(320,210);Ee(l);let c=-Math.PI/2,h=[];return i.forEach((u,f)=>{var X;let m=Math.max(0,Oe(u.value))/a,g=c+m*Math.PI*2,v=g-c>Math.PI?1:0,p=96+80*Math.cos(c),d=100+80*Math.sin(c),M=96+80*Math.cos(g),x=100+80*Math.sin(g),T=ut("path",{d:`M96,100 L${p},${d} A80,80 0 ${v} 1 ${M},${x} Z`,class:"chart-slice",style:`--i:${f}`,filter:"url(#fbGlow)"});l.appendChild(T),h.push(T);let R=24+f*20,E=ut("rect",{x:200,y:R-9,width:11,height:11,rx:2,class:"chart-slice",style:`--i:${f}`}),A=ut("text",{x:217,y:R,class:"chart-axis"},`${(X=u.label)!=null?X:""} ${Ka(Oe(u.value),t)}`);l.appendChild(E),l.appendChild(A),h.push(E,A),c=g}),pe(h,{stepMs:160}),l}function Qa(i,t,e){let n={x:0,y:0,w:t,h:e},s=t*.4,r=t*1.8,o=()=>i.setAttribute("viewBox",`${n.x} ${n.y} ${n.w} ${n.h}`);i.style.cursor="grab",i.style.touchAction="none",i.addEventListener("wheel",c=>{c.preventDefault();let h=c.deltaY>0?1.1:.9,u=Math.min(r,Math.max(s,n.w*h)),f=u*(e/t),m=i.getBoundingClientRect(),g=m.width?(c.clientX-m.left)/m.width:.5,v=m.height?(c.clientY-m.top)/m.height:.5;n.x+=(n.w-u)*g,n.y+=(n.h-f)*v,n.w=u,n.h=f,o()},{passive:!1});let a=null;i.addEventListener("pointerdown",c=>{a={x:c.clientX,y:c.clientY},i.style.cursor="grabbing";try{i.setPointerCapture(c.pointerId)}catch{}}),i.addEventListener("pointermove",c=>{if(!a)return;let h=i.getBoundingClientRect();h.width&&(n.x-=(c.clientX-a.x)/h.width*n.w),h.height&&(n.y-=(c.clientY-a.y)/h.height*n.h),a={x:c.clientX,y:c.clientY},o()});let l=()=>{a=null,i.style.cursor="grab"};i.addEventListener("pointerup",l),i.addEventListener("pointerleave",l)}var $n=class{constructor(t){this.root=t;t.style.position||(t.style.position="relative"),this.el=document.createElement("div"),this.el.className="fb-tip",this.el.style.display="none",t.appendChild(this.el)}bind(t,e){if(!e)return;let n=s=>{let r=s;this.el.textContent=e,this.el.style.display="block";let o=this.root.getBoundingClientRect(),a=Math.min(r.clientX-o.left+12,o.width-8);this.el.style.left=`${Math.max(4,a)}px`,this.el.style.top=`${Math.max(4,r.clientY-o.top+12)}px`};t.addEventListener("pointerenter",n),t.addEventListener("pointermove",n),t.addEventListener("pointerleave",()=>{this.el.style.display="none"})}};function Ac(i){let t=[],e=/\s*([0-9]*\.?[0-9]+|[A-Za-z_][A-Za-z0-9_]*|[()+\-*/])/g,n,s;for(;n=e.exec(i);){let r=n[1],o;/^[0-9.]/.test(r)?o={t:"num",v:r}:r==="("?o={t:"lp",v:r}:r===")"?o={t:"rp",v:r}:r==="+"||r==="-"||r==="*"||r==="/"?((r==="-"||r==="+")&&(!s||s.t==="op"||s.t==="lp")&&t.push({t:"num",v:"0"}),o={t:"op",v:r}):o={t:"var",v:r},t.push(o),s=o}return t}var ja={"+":1,"-":1,"*":2,"/":2};function Cc(i){let t=[],e=[];for(let n of i)if(n.t==="num"||n.t==="var")t.push(n);else if(n.t==="op"){for(;e.length&&e[e.length-1].t==="op"&&ja[e[e.length-1].v]>=ja[n.v];)t.push(e.pop());e.push(n)}else if(n.t==="lp")e.push(n);else if(n.t==="rp"){for(;e.length&&e[e.length-1].t!=="lp";)t.push(e.pop());e.pop()}for(;e.length;)t.push(e.pop());return t}function Ji(i,t){var e,n,s,r;try{let o=Cc(Ac(String(i||""))),a=[];for(let c of o)if(c.t==="num")a.push(parseFloat(c.v));else if(c.t==="var")a.push(Number((e=t[c.v])!=null?e:0));else{let h=(n=a.pop())!=null?n:0,u=(s=a.pop())!=null?s:0;a.push(c.v==="+"?u+h:c.v==="-"?u-h:c.v==="*"?u*h:h?u/h:0)}let l=(r=a.pop())!=null?r:0;return Number.isFinite(l)?l:0}catch{return 0}}function Ki(i,t,e){let n;return t==="currency"?n=`$${Math.round(i).toLocaleString()}`:t==="percent"?n=`${Math.round(i)}%`:n=Math.round(i).toLocaleString(),e&&t!=="currency"&&t!=="percent"?`${n} ${e}`:n}function hr(i,t,e,n){let s=e||"",r=Math.min(132,Math.max(44,s.length*6.4+18)),o=26,a=ut("g",{class:n});return a.appendChild(ut("rect",{x:i-r/2,y:t-o/2,width:r,height:o,rx:13,fill:"url(#fbAccentFill)",filter:"url(#fbGlow)",class:"fb-glass-rect"})),a.appendChild(ut("text",{x:i,y:t+4,"text-anchor":"middle"},s.length>18?s.slice(0,17)+"\u2026":s)),a}function to(i,t){var m,g,v;let e=String((g=(m=i.topic)!=null?m:i.label)!=null?g:"Topic"),n=(v=i.branches)!=null?v:[],s=document.createElement("div");if(s.className="mindmap",!n.length)return s.innerHTML='<div class="empty">No mind-map data.</div>',s;let r=360,o=300,a=r/2,l=o/2,c=we(r,o);Ee(c);let h=ut("g");c.appendChild(h);let u=new Set,f=()=>{h.replaceChildren();let p=98;n.forEach((d,M)=>{var A,X,_;let x=M/n.length*Math.PI*2-Math.PI/2,T=a+p*Math.cos(x),R=l+p*Math.sin(x);h.appendChild(ut("line",{x1:a,y1:l,x2:T,y2:R,class:"mm-edge"})),u.has(M)&&((A=d.children)!=null&&A.length)&&d.children.forEach((N,q)=>{var D;let tt=x+(q-(d.children.length-1)/2)*.42,L=T+66*Math.cos(tt),C=R+66*Math.sin(tt);h.appendChild(ut("line",{x1:T,y1:R,x2:L,y2:C,class:"mm-edge mm-edge-sub"})),h.appendChild(hr(L,C,(D=N.label)!=null?D:"","mm-node mm-node-sub"))});let E=hr(T,R,(X=d.label)!=null?X:"","mm-node");(_=d.children)!=null&&_.length&&(E.style.cursor="pointer",E.appendChild(ut("circle",{cx:T+36,cy:R-13,r:8,class:"mm-badge"})),E.appendChild(ut("text",{x:T+36,y:R-9.5,"text-anchor":"middle",class:"mm-badge-t"},u.has(M)?"\u2013":"+")),E.addEventListener("click",()=>{var w;u.has(M)?u.delete(M):u.add(M),(w=t==null?void 0:t.reportState)==null||w.call(t,{expanded:[...u]}),f()})),h.appendChild(E)}),h.appendChild(hr(a,l,e,"mm-node mm-root"))};return f(),s.appendChild(c),Qa(c,r,o),s}function eo(i){var f;let t=(f=i.events)!=null?f:[],e=document.createElement("div");if(e.className="timeline",!t.length)return e.innerHTML='<div class="empty">No timeline data.</div>',e;let n=340,s=60+t.length*4,r=s/2,o=26,a=n-o*2,l=t.length>1?a/(t.length-1):0,c=we(n,s);Ee(c);let h=new $n(e);c.appendChild(ut("line",{x1:o,y1:r,x2:n-o,y2:r,class:"tl-axis"}));let u=[];return t.forEach((m,g)=>{var x;let v=o+g*l,p=g%2===0,d=ut("g",{class:"tl-stop"});d.appendChild(ut("circle",{cx:v,cy:r,r:7,fill:"url(#fbAccentFill)",filter:"url(#fbGlow)",class:"fb-glass-bead"})),d.appendChild(ut("circle",{cx:v-2,cy:r-2.5,r:2,class:"fb-glass-spec"}));let M=p?r-16:r+24;m.date&&d.appendChild(ut("text",{x:v,y:p?r-28:r+36,"text-anchor":"middle",class:"tl-date"},m.date)),d.appendChild(ut("text",{x:v,y:M,"text-anchor":"middle",class:"tl-label"},((x=m.label)!=null?x:"").slice(0,22))),h.bind(d,m.detail||m.label||""),c.appendChild(d),u.push(d)}),e.appendChild(c),pe(u,{stepMs:260}),e}function no(i){var tt,L;let t=(tt=i.nodes)!=null?tt:[],e=((L=i.links)!=null?L:[]).filter(C=>{var D;return C.source&&C.target&&((D=C.value)!=null?D:0)>0}),n=document.createElement("div");if(n.className="sankey",!e.length)return n.innerHTML='<div class="empty">No flow data.</div>',n;let s=new Map,r=new Map,o=(C,D,V)=>{C&&(s.has(C)?D&&s.set(C,D):s.set(C,D!=null?D:C),typeof V=="number"&&r.set(C,V))};t.forEach(C=>o(C.id,C.label,C.column)),e.forEach(C=>{o(C.source),o(C.target)});let a=new Map;e.forEach(C=>{var V;let D=(V=a.get(C.target))!=null?V:[];D.push(C.source),a.set(C.target,D)});let l=new Map,c=(C,D=new Set)=>{var W;if(r.has(C))return r.get(C);if(l.has(C))return l.get(C);if(D.has(C))return 0;D.add(C);let V=(W=a.get(C))!=null?W:[],G=V.length?1+Math.max(...V.map(Y=>c(Y,D))):0;return l.set(C,G),G},h=[...s.keys()],u=new Map(h.map(C=>[C,c(C)])),f=Math.max(0,...u.values()),m=new Map,g=new Map;e.forEach(C=>{var D,V,G,W;g.set(C.source,((D=g.get(C.source))!=null?D:0)+((V=C.value)!=null?V:0)),m.set(C.target,((G=m.get(C.target))!=null?G:0)+((W=C.value)!=null?W:0))});let v=C=>{var D,V;return Math.max((D=m.get(C))!=null?D:0,(V=g.get(C))!=null?V:0,1)},p=340,d=240,M=10,x=Array.from({length:f+1},()=>[]);h.forEach(C=>x[u.get(C)].push(C));let T=x.map(C=>C.reduce((D,V)=>D+v(V),0)+M*Math.max(0,C.length-1)),R=(d-20)/Math.max(1,...T),E=new Map,A=12,X=C=>f===0?p/2:12+C/f*(p-24-A);x.forEach((C,D)=>{let V=(d-T[D]*R)/2+4;C.forEach(G=>{let W=Math.max(6,v(G)*R);E.set(G,{x:X(D),y:V,w:A,h:W}),V+=W+M})});let _=we(p,d);Ee(_);let w=new $n(n),N=new Map,q=new Map;return e.forEach(C=>{var rt,ft,dt,Et,Tt;let D=E.get(C.source),V=E.get(C.target);if(!D||!V)return;let G=((rt=C.value)!=null?rt:0)*R,W=D.y+((ft=N.get(C.source))!=null?ft:0),Y=V.y+((dt=q.get(C.target))!=null?dt:0);N.set(C.source,((Et=N.get(C.source))!=null?Et:0)+G),q.set(C.target,((Tt=q.get(C.target))!=null?Tt:0)+G);let K=D.x+D.w,ot=V.x,H=(K+ot)/2,$=ut("path",{d:`M${K},${W} C${H},${W} ${H},${Y} ${ot},${Y} L${ot},${Y+G} C${H},${Y+G} ${H},${W+G} ${K},${W+G} Z`,class:"sk-link"});w.bind($,`${s.get(C.source)} \u2192 ${s.get(C.target)}: ${C.value}`),_.appendChild($)}),h.forEach(C=>{var G;let D=E.get(C);_.appendChild(ut("rect",{x:D.x,y:D.y,width:D.w,height:D.h,rx:3,fill:"url(#fbAccentFill)",filter:"url(#fbGlow)",class:"fb-glass-rect"}));let V=u.get(C)===f;_.appendChild(ut("text",{x:V?D.x-5:D.x+D.w+5,y:D.y+D.h/2+3,"text-anchor":V?"end":"start",class:"sk-label"},((G=s.get(C))!=null?G:"").slice(0,16)))}),n.appendChild(_),n}var je=(i,t)=>typeof i=="number"&&isFinite(i)?i:t;function io(i,t){var c,h;let e=(c=i.controls)!=null?c:[],n=(h=i.outputs)!=null?h:[],s=document.createElement("div");if(s.className="cfg",!e.length)return s.innerHTML='<div class="empty">No configurator controls.</div>',s;let r={};e.forEach((u,f)=>{var m;r[(m=u.key)!=null?m:`c${f}`]=je(u.value,u.type==="toggle"?0:je(u.min,0))});let o=document.createElement("div");o.className="cfg-out";let a=n.map(u=>{var v;let f=document.createElement("div"),m=document.createElement("span");m.className="cfg-out-val";let g=document.createElement("span");return g.className="cfg-out-label",g.textContent=(v=u.label)!=null?v:"",f.append(m,g),o.appendChild(f),{o:u,v:m}}),l=()=>{var u;for(let{o:f,v:m}of a)m.textContent=Ki(Ji((u=f.expr)!=null?u:"0",r),f.format,f.unit)};return e.forEach((u,f)=>{var d,M,x,T,R;let m=(d=u.key)!=null?d:`c${f}`,g=document.createElement("div");g.className="cfg-row";let v=document.createElement("label");v.textContent=(M=u.label)!=null?M:m,g.appendChild(v);let p=()=>{var E;return(E=t==null?void 0:t.reportState)==null?void 0:E.call(t,{values:{...r}})};if(u.type==="toggle"){let E=document.createElement("input");E.type="checkbox",E.className="cfg-toggle",E.checked=je(u.value,0)>=1,E.addEventListener("change",()=>{r[m]=E.checked?1:0,l(),p()}),g.appendChild(E)}else if(u.type==="select"){let E=document.createElement("select");E.className="cfg-select",((x=u.options)!=null?x:[]).forEach((A,X)=>{var w,N;let _=document.createElement("option");_.value=String(je(A.value,X)),_.textContent=(N=A.label)!=null?N:String((w=A.value)!=null?w:X),E.appendChild(_)}),E.value=String(je(u.value,je((R=(T=u.options)==null?void 0:T[0])==null?void 0:R.value,0))),r[m]=Number(E.value),E.addEventListener("change",()=>{r[m]=Number(E.value),l(),p()}),g.appendChild(E)}else{let E=document.createElement("input");E.type="range",E.min=String(je(u.min,0)),E.max=String(je(u.max,100)),E.step=String(je(u.step,1)),E.value=String(r[m]);let A=document.createElement("span");A.className="cfg-val";let X=()=>`${Number(E.value).toLocaleString()}${u.unit?" "+u.unit:""}`;A.textContent=X(),E.addEventListener("input",()=>{r[m]=Number(E.value),A.textContent=X(),l()}),E.addEventListener("change",p),g.append(E,A)}s.appendChild(g)}),n.length&&s.appendChild(o),l(),s}var Ri=(i,t)=>typeof i=="number"&&isFinite(i)?i:t;function so(i,t){var c,h;let e=(c=i.sliders)!=null?c:[],n=(h=i.series)!=null?h:[],s=document.createElement("div");if(s.className="sim",!e.length||!n.length)return s.innerHTML='<div class="empty">No simulator data.</div>',s;let r={};e.forEach((u,f)=>{var m;return r[(m=u.key)!=null?m:`s${f}`]=Ri(u.value,Ri(u.min,0))});let o=document.createElement("div");o.className="sim-chart";let a=n.map(u=>{var d;let f=document.createElement("div");f.className="sim-bar-row";let m=document.createElement("span");m.className="sim-bar-name",m.textContent=(d=u.label)!=null?d:"";let g=document.createElement("div");g.className="sim-bar-track";let v=document.createElement("div");v.className="sim-bar-fill",g.appendChild(v);let p=document.createElement("span");return p.className="sim-bar-val",f.append(m,g,p),o.appendChild(f),{s:u,fill:v,val:p}}),l=()=>{let u=a.map(m=>{var g;return Ji((g=m.s.expr)!=null?g:"0",r)}),f=Math.max(1,...u.map(m=>Math.abs(m)));a.forEach((m,g)=>{m.fill.style.width=`${Math.max(0,Math.min(100,u[g]/f*100))}%`,m.val.textContent=Ki(u[g],m.s.format,m.s.unit)})};return s.appendChild(o),e.forEach((u,f)=>{var x,T;let m=(x=u.key)!=null?x:`s${f}`,g=document.createElement("div");g.className="sim-row";let v=document.createElement("label");v.textContent=(T=u.label)!=null?T:m;let p=document.createElement("input");p.type="range",p.min=String(Ri(u.min,0)),p.max=String(Ri(u.max,100)),p.step=String(Ri(u.step,1)),p.value=String(r[m]);let d=document.createElement("span");d.className="sim-slider-val";let M=()=>`${Number(p.value).toLocaleString()}${u.unit?" "+u.unit:""}`;d.textContent=M(),p.addEventListener("input",()=>{r[m]=Number(p.value),d.textContent=M(),l()}),p.addEventListener("change",()=>{var R;return(R=t==null?void 0:t.reportState)==null?void 0:R.call(t,{values:{...r}})}),g.append(v,p,d),s.appendChild(g)}),l(),s}function ro(i,t){var l;let e=(l=i.tabs)!=null?l:[],n=document.createElement("div");if(n.className="tabs",!e.length)return n.innerHTML='<div class="empty">No tabs.</div>',n;let s=document.createElement("div");s.className="tabs-bar",s.setAttribute("role","tablist");let r=document.createElement("div");r.className="tabs-panel";let o=[],a=c=>{var h,u,f,m,g;o.forEach((v,p)=>{v.classList.toggle("active",p===c),v.setAttribute("aria-selected",String(p===c))}),r.textContent=(u=(h=e[c])==null?void 0:h.body)!=null?u:"",(g=t==null?void 0:t.reportState)==null||g.call(t,{tab:c,label:(m=(f=e[c])==null?void 0:f.label)!=null?m:""})};return e.forEach((c,h)=>{var f;let u=document.createElement("button");u.className="tabs-tab",u.type="button",u.setAttribute("role","tab"),u.textContent=(f=c.label)!=null?f:`Tab ${h+1}`,u.addEventListener("click",()=>a(h)),s.appendChild(u),o.push(u)}),n.append(s,r),a(0),n}var Rc=typeof requestAnimationFrame=="function"?i=>requestAnimationFrame(i):i=>setTimeout(i,0);function Pc(i,t,e){let n=t?{...i.initial_state,...t}:i.initial_state;switch(i.component_type){case"flowchart":return $i(n);case"workflow":return $a(n);case"component_diagram":return Za(n);case"graph":return Ja(n);case"chart":return Zi(n);case"roi_calculator":return qa(n);case"table":return Ya(n);case"mind_map":return to(n,e);case"timeline":return eo(n);case"sankey":return no(n);case"configurator":return io(n,e);case"scenario_simulator":return so(n,e);case"tabs":return ro(n,e);default:{let s=document.createElement("div");return s.className="empty",s.textContent=`Unknown component: ${i.component_type}`,s}}}var Ye=class{constructor(t,e,n){this.container=t;this.onRendered=e;this.onState=n;this.cards=new Map}buildCard(t,e){let n=document.createElement("div");if(n.className="card",t.explanation_text){let r=document.createElement("div");r.className="caption",r.textContent=t.explanation_text,n.appendChild(r)}let s={syncId:t.sync_id,reportState:this.onState?r=>this.onState(t.sync_id,r):void 0};return n.appendChild(Pc(t,e,s)),n}add(t){if(this.cards.has(t.sync_id))return;let e=this.buildCard(t);this.container.appendChild(e),this.cards.set(t.sync_id,{card:e,payload:t}),Rc(()=>this.onRendered(t.sync_id))}applyPatch(t,e){let n=this.cards.get(t);if(!n)return;let s=this.buildCard(n.payload,e);n.card.replaceWith(s),this.cards.set(t,{card:s,payload:n.payload})}clear(){this.container.replaceChildren(),this.cards.clear()}};var Ta="160";var Lc=0,ao=1,Ic=2;var Il=1,Dc=2,rn=3,Tn=0,Ce=1,on=2;var Mn=0,Sn=1,oo=2,lo=3,co=4,Nc=5,kn=100,Uc=101,Fc=102,ho=103,uo=104,Oc=200,kc=201,Bc=202,zc=203,Vr=204,Gr=205,Hc=206,Vc=207,Gc=208,Wc=209,Xc=210,qc=211,Yc=212,$c=213,Zc=214,Jc=0,Kc=1,jc=2,Ss=3,Qc=4,th=5,eh=6,nh=7,Dl=0,ih=1,sh=2,wn=0,rh=1,ah=2,oh=3,lh=4,ch=5,hh=6;var Nl=300,vi=301,xi=302,Wr=303,Xr=304,$s=306,qr=1e3,He=1001,Yr=1002,Me=1003,fo=1004;var ur=1005;var Ne=1006,uh=1007;var Oi=1008;var En=1009,dh=1010,fh=1011,Aa=1012,Ul=1013,_n=1014,bn=1015,ki=1016,Fl=1017,Ol=1018,zn=1020,ph=1021,Ve=1023,mh=1024,gh=1025,Hn=1026,yi=1027,vh=1028,kl=1029,xh=1030,Bl=1031,zl=1033,dr=33776,fr=33777,pr=33778,mr=33779,po=35840,mo=35841,go=35842,vo=35843,Hl=36196,xo=37492,yo=37496,_o=37808,bo=37809,Mo=37810,So=37811,wo=37812,Eo=37813,To=37814,Ao=37815,Co=37816,Ro=37817,Po=37818,Lo=37819,Io=37820,Do=37821,gr=36492,No=36494,Uo=36495,yh=36283,Fo=36284,Oo=36285,ko=36286;var ws=2300,Es=2301,vr=2302,Bo=2400,zo=2401,Ho=2402;var Vl=3e3,Vn=3001,_h=3200,bh=3201,Mh=0,Sh=1,Ue="",he="srgb",hn="srgb-linear",Ca="display-p3",Zs="display-p3-linear",Ts="linear",Jt="srgb",As="rec709",Cs="p3";var Zn=7680;var Vo=519,wh=512,Eh=513,Th=514,Gl=515,Ah=516,Ch=517,Rh=518,Ph=519,Go=35044;var Wo="300 es",$r=1035,ln=2e3,Rs=2001,An=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var xr=Math.PI/180,Zr=180/Math.PI;function Vi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(me[i&255]+me[i>>8&255]+me[i>>16&255]+me[i>>24&255]+"-"+me[t&255]+me[t>>8&255]+"-"+me[t>>16&15|64]+me[t>>24&255]+"-"+me[e&63|128]+me[e>>8&255]+"-"+me[e>>16&255]+me[e>>24&255]+me[n&255]+me[n>>8&255]+me[n>>16&255]+me[n>>24&255]).toLowerCase()}function Ae(i,t,e){return Math.max(t,Math.min(e,i))}function Lh(i,t){return(i%t+t)%t}function yr(i,t,e){return(1-e)*i+e*t}function Xo(i){return(i&i-1)===0&&i!==0}function Jr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Pi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var qt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},kt=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],m=n[5],g=n[8],v=s[0],p=s[3],d=s[6],M=s[1],x=s[4],T=s[7],R=s[2],E=s[5],A=s[8];return r[0]=o*v+a*M+l*R,r[3]=o*p+a*x+l*E,r[6]=o*d+a*T+l*A,r[1]=c*v+h*M+u*R,r[4]=c*p+h*x+u*E,r[7]=c*d+h*T+u*A,r[2]=f*v+m*M+g*R,r[5]=f*p+m*x+g*E,r[8]=f*d+m*T+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,m=c*r-o*l,g=e*u+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=f*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=m*v,t[7]=(n*l-c*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(_r.makeScale(t,e)),this}rotate(t){return this.premultiply(_r.makeRotation(-t)),this}translate(t,e){return this.premultiply(_r.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},_r=new kt;function Wl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ih(){let i=Ps("canvas");return i.style.display="block",i}var qo={};function Ui(i){i in qo||(qo[i]=!0,console.warn(i))}var Yo=new kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$o=new kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ji={[hn]:{transfer:Ts,primaries:As,toReference:i=>i,fromReference:i=>i},[he]:{transfer:Jt,primaries:As,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Zs]:{transfer:Ts,primaries:Cs,toReference:i=>i.applyMatrix3($o),fromReference:i=>i.applyMatrix3(Yo)},[Ca]:{transfer:Jt,primaries:Cs,toReference:i=>i.convertSRGBToLinear().applyMatrix3($o),fromReference:i=>i.applyMatrix3(Yo).convertLinearToSRGB()}},Dh=new Set([hn,Zs]),Xt={enabled:!0,_workingColorSpace:hn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Dh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=ji[t].toReference,s=ji[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return ji[i].primaries},getTransfer:function(i){return i===Ue?Ts:ji[i].transfer}};function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function br(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Jn,Ls=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Jn===void 0&&(Jn=Ps("canvas")),Jn.width=t.width,Jn.height=t.height;let n=Jn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Jn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Ps("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=mi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(mi(e[n]/255)*255):e[n]=mi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Nh=0,Is=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=Vi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Mr(s[o].image)):r.push(Mr(s[o]))}else r=Mr(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Mr(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Ls.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Uh=0,Ge=class i extends An{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=He,s=He,r=Ne,o=Oi,a=Ve,l=En,c=i.DEFAULT_ANISOTROPY,h=Ue){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Vi(),this.name="",this.source=new Is(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ui("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Vn?he:Ue),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Nl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qr:t.x=t.x-Math.floor(t.x);break;case He:t.x=t.x<0?0:1;break;case Yr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qr:t.y=t.y-Math.floor(t.y);break;case He:t.y=t.y<0?0:1;break;case Yr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ui("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===he?Vn:Vl}set encoding(t){Ui("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Vn?he:Ue}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Nl;Ge.DEFAULT_ANISOTROPY=1;var ue=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],g=l[9],v=l[2],p=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,T=(m+1)/2,R=(d+1)/2,E=(h+f)/4,A=(u+v)/4,X=(g+p)/4;return x>T&&x>R?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=E/n,r=A/n):T>R?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=E/s,r=X/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=X/r),this.set(n,s,r,e),this}let M=Math.sqrt((p-g)*(p-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(p-g)/M,this.y=(u-v)/M,this.z=(f-h)/M,this.w=Math.acos((c+m+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Kr=class extends An{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ue(0,0,t,e),this.scissorTest=!1,this.viewport=new ue(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(Ui("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Vn?he:Ue),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ne,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ge(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Is(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends Kr{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ds=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Me,this.minFilter=Me,this.wrapR=He,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var jr=class extends Ge{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Me,this.minFilter=Me,this.wrapR=He,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],m=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==f||c!==m||h!==g){let p=1-a,d=l*f+c*m+h*g+u*v,M=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){let R=Math.sqrt(x),E=Math.atan2(R,d*M);p=Math.sin(p*E)/R,a=Math.sin(a*E)/R}let T=a*M;if(l=l*p+f*T,c=c*p+m*T,h=h*p+g*T,u=u*p+v*T,p===1-a){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],m=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*m-c*f,t[e+1]=l*g+h*f+c*u-a*m,t[e+2]=c*g+h*m+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"YZX":this._x=f*h*u+c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u-f*m*g;break;case"XZY":this._x=f*h*u-c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-s)*m}else if(n>a&&n>u){let m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+c)/m}else if(a>u){let m=2*Math.sqrt(1+a-n-u);this._w=(r-c)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+u-n-a);this._w=(o-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zo.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Sr.copy(this).projectOnVector(t),this.sub(Sr)}reflect(t){return this.sub(Sr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sr=new O,Zo=new Cn,Gn=class{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ke):ke.fromBufferAttribute(r,o),ke.applyMatrix4(t.matrixWorld),this.expandByPoint(ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qi.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qi.copy(n.boundingBox)),Qi.applyMatrix4(t.matrixWorld),this.union(Qi)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,ke),ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Li),ts.subVectors(this.max,Li),Kn.subVectors(t.a,Li),jn.subVectors(t.b,Li),Qn.subVectors(t.c,Li),mn.subVectors(jn,Kn),gn.subVectors(Qn,jn),Dn.subVectors(Kn,Qn);let e=[0,-mn.z,mn.y,0,-gn.z,gn.y,0,-Dn.z,Dn.y,mn.z,0,-mn.x,gn.z,0,-gn.x,Dn.z,0,-Dn.x,-mn.y,mn.x,0,-gn.y,gn.x,0,-Dn.y,Dn.x,0];return!wr(e,Kn,jn,Qn,ts)||(e=[1,0,0,0,1,0,0,0,1],!wr(e,Kn,jn,Qn,ts))?!1:(es.crossVectors(mn,gn),e=[es.x,es.y,es.z],wr(e,Kn,jn,Qn,ts))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Qe[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Qe[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Qe[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Qe[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Qe[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Qe[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Qe[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Qe[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Qe),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Qe=[new O,new O,new O,new O,new O,new O,new O,new O],ke=new O,Qi=new Gn,Kn=new O,jn=new O,Qn=new O,mn=new O,gn=new O,Dn=new O,Li=new O,ts=new O,es=new O,Nn=new O;function wr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Nn.fromArray(i,r);let a=s.x*Math.abs(Nn.x)+s.y*Math.abs(Nn.y)+s.z*Math.abs(Nn.z),l=t.dot(Nn),c=e.dot(Nn),h=n.dot(Nn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Fh=new Gn,Ii=new O,Er=new O,_i=class{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Fh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ii.subVectors(t,this.center);let e=Ii.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ii,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Er.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ii.copy(t.center).add(Er)),this.expandByPoint(Ii.copy(t.center).sub(Er))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},tn=new O,Tr=new O,ns=new O,vn=new O,Ar=new O,is=new O,Cr=new O,Ns=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(tn.copy(this.origin).addScaledVector(this.direction,e),tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Tr.copy(t).add(e).multiplyScalar(.5),ns.copy(e).sub(t).normalize(),vn.copy(this.origin).sub(Tr);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ns),a=vn.dot(this.direction),l=-vn.dot(ns),c=vn.lengthSq(),h=Math.abs(1-o*o),u,f,m,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){let v=1/h;u*=v,f*=v,m=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Tr).addScaledVector(ns,f),m}intersectSphere(t,e){tn.subVectors(t.center,this.origin);let n=tn.dot(this.direction),s=tn.dot(tn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,tn)!==null}intersectTriangle(t,e,n,s,r){Ar.subVectors(e,t),is.subVectors(n,t),Cr.crossVectors(Ar,is);let o=this.direction.dot(Cr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vn.subVectors(this.origin,t);let l=a*this.direction.dot(is.crossVectors(vn,is));if(l<0)return null;let c=a*this.direction.dot(Ar.cross(vn));if(c<0||l+c>o)return null;let h=-a*vn.dot(Cr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},de=class i{constructor(t,e,n,s,r,o,a,l,c,h,u,f,m,g,v,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,m,g,v,p)}set(t,e,n,s,r,o,a,l,c,h,u,f,m,g,v,p){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=v,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ti.setFromMatrixColumn(t,0).length(),r=1/ti.setFromMatrixColumn(t,1).length(),o=1/ti.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,m=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=g+m*c,e[10]=o*l}else if(t.order==="YXZ"){let f=l*h,m=l*u,g=c*h,v=c*u;e[0]=f+v*a,e[4]=g*a-m,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=m*a-g,e[6]=v+f*a,e[10]=o*l}else if(t.order==="ZXY"){let f=l*h,m=l*u,g=c*h,v=c*u;e[0]=f-v*a,e[4]=-o*u,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let f=o*h,m=o*u,g=a*h,v=a*u;e[0]=l*h,e[4]=g*c-m,e[8]=f*c+v,e[1]=l*u,e[5]=v*c+f,e[9]=m*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let f=o*l,m=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=v-f*u,e[8]=g*u+m,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*u+g,e[10]=f-v*u}else if(t.order==="XZY"){let f=o*l,m=o*c,g=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+v,e[5]=o*h,e[9]=m*u-g,e[2]=g*u-m,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Oh,t,kh)}lookAt(t,e,n){let s=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),xn.crossVectors(n,Pe),xn.lengthSq()===0&&(Math.abs(n.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),xn.crossVectors(n,Pe)),xn.normalize(),ss.crossVectors(Pe,xn),s[0]=xn.x,s[4]=ss.x,s[8]=Pe.x,s[1]=xn.y,s[5]=ss.y,s[9]=Pe.y,s[2]=xn.z,s[6]=ss.z,s[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],m=n[13],g=n[2],v=n[6],p=n[10],d=n[14],M=n[3],x=n[7],T=n[11],R=n[15],E=s[0],A=s[4],X=s[8],_=s[12],w=s[1],N=s[5],q=s[9],tt=s[13],L=s[2],C=s[6],D=s[10],V=s[14],G=s[3],W=s[7],Y=s[11],K=s[15];return r[0]=o*E+a*w+l*L+c*G,r[4]=o*A+a*N+l*C+c*W,r[8]=o*X+a*q+l*D+c*Y,r[12]=o*_+a*tt+l*V+c*K,r[1]=h*E+u*w+f*L+m*G,r[5]=h*A+u*N+f*C+m*W,r[9]=h*X+u*q+f*D+m*Y,r[13]=h*_+u*tt+f*V+m*K,r[2]=g*E+v*w+p*L+d*G,r[6]=g*A+v*N+p*C+d*W,r[10]=g*X+v*q+p*D+d*Y,r[14]=g*_+v*tt+p*V+d*K,r[3]=M*E+x*w+T*L+R*G,r[7]=M*A+x*N+T*C+R*W,r[11]=M*X+x*q+T*D+R*Y,r[15]=M*_+x*tt+T*V+R*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],m=t[14],g=t[3],v=t[7],p=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*m-n*l*m)+v*(+e*l*m-e*c*f+r*o*f-s*o*m+s*c*h-r*l*h)+p*(+e*c*u-e*a*m-r*o*u+n*o*m+r*a*h-n*c*h)+d*(-s*a*h-e*l*u+e*a*f+s*o*u-n*o*f+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],m=t[11],g=t[12],v=t[13],p=t[14],d=t[15],M=u*p*c-v*f*c+v*l*m-a*p*m-u*l*d+a*f*d,x=g*f*c-h*p*c-g*l*m+o*p*m+h*l*d-o*f*d,T=h*v*c-g*u*c+g*a*m-o*v*m-h*a*d+o*u*d,R=g*u*l-h*v*l-g*a*f+o*v*f+h*a*p-o*u*p,E=e*M+n*x+s*T+r*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return t[0]=M*A,t[1]=(v*f*r-u*p*r-v*s*m+n*p*m+u*s*d-n*f*d)*A,t[2]=(a*p*r-v*l*r+v*s*c-n*p*c-a*s*d+n*l*d)*A,t[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*m-n*l*m)*A,t[4]=x*A,t[5]=(h*p*r-g*f*r+g*s*m-e*p*m-h*s*d+e*f*d)*A,t[6]=(g*l*r-o*p*r-g*s*c+e*p*c+o*s*d-e*l*d)*A,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*m+e*l*m)*A,t[8]=T*A,t[9]=(g*u*r-h*v*r-g*n*m+e*v*m+h*n*d-e*u*d)*A,t[10]=(o*v*r-g*a*r+g*n*c-e*v*c-o*n*d+e*a*d)*A,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*m-e*a*m)*A,t[12]=R*A,t[13]=(h*v*s-g*u*s+g*n*f-e*v*f-h*n*p+e*u*p)*A,t[14]=(g*a*s-o*v*s-g*n*l+e*v*l+o*n*p-e*a*p)*A,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*f+e*a*f)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,m=r*h,g=r*u,v=o*h,p=o*u,d=a*u,M=l*c,x=l*h,T=l*u,R=n.x,E=n.y,A=n.z;return s[0]=(1-(v+d))*R,s[1]=(m+T)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(m-T)*E,s[5]=(1-(f+d))*E,s[6]=(p+M)*E,s[7]=0,s[8]=(g+x)*A,s[9]=(p-M)*A,s[10]=(1-(f+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ti.set(s[0],s[1],s[2]).length(),o=ti.set(s[4],s[5],s[6]).length(),a=ti.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Be.copy(this);let c=1/r,h=1/o,u=1/a;return Be.elements[0]*=c,Be.elements[1]*=c,Be.elements[2]*=c,Be.elements[4]*=h,Be.elements[5]*=h,Be.elements[6]*=h,Be.elements[8]*=u,Be.elements[9]*=u,Be.elements[10]*=u,e.setFromRotationMatrix(Be),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ln){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),m,g;if(a===ln)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Rs)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ln){let l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*c,m=(n+s)*h,g,v;if(a===ln)g=(o+r)*u,v=-2*u;else if(a===Rs)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ti=new O,Be=new de,Oh=new O(0,0,0),kh=new O(1,1,1),xn=new O,ss=new O,Pe=new O,Jo=new de,Ko=new Cn,Us=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ae(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Jo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jo,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ko.setFromEuler(this),this.setFromQuaternion(Ko,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Us.DEFAULT_ORDER="XYZ";var Fs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Bh=0,jo=new O,ei=new Cn,en=new de,rs=new O,Di=new O,zh=new O,Hh=new Cn,Qo=new O(1,0,0),tl=new O(0,1,0),el=new O(0,0,1),Vh={type:"added"},Gh={type:"removed"},Fe=class i extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new O,e=new Us,n=new Cn,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new kt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.multiply(ei),this}rotateOnWorldAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.premultiply(ei),this}rotateX(t){return this.rotateOnAxis(Qo,t)}rotateY(t){return this.rotateOnAxis(tl,t)}rotateZ(t){return this.rotateOnAxis(el,t)}translateOnAxis(t,e){return jo.copy(t).applyQuaternion(this.quaternion),this.position.add(jo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Qo,t)}translateY(t){return this.translateOnAxis(tl,t)}translateZ(t){return this.translateOnAxis(el,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(en.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?rs.copy(t):rs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Di.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?en.lookAt(Di,rs,this.up):en.lookAt(rs,Di,this.up),this.quaternion.setFromRotationMatrix(en),s&&(en.extractRotation(s.matrixWorld),ei.setFromRotationMatrix(en),this.quaternion.premultiply(ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Vh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Gh)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),en.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),en.multiply(t.parent.matrixWorld)),t.applyMatrix4(en),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Di,t,zh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Di,Hh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Fe.DEFAULT_UP=new O(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ze=new O,nn=new O,Rr=new O,sn=new O,ni=new O,ii=new O,nl=new O,Pr=new O,Lr=new O,Ir=new O,as=!1,ui=class i{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ze.subVectors(t,e),s.cross(ze);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ze.subVectors(s,e),nn.subVectors(n,e),Rr.subVectors(t,e);let o=ze.dot(ze),a=ze.dot(nn),l=ze.dot(Rr),c=nn.dot(nn),h=nn.dot(Rr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,m=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getUV(t,e,n,s,r,o,a,l){return as===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),as=!0),this.getInterpolation(t,e,n,s,r,o,a,l)}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,sn.x),l.addScaledVector(o,sn.y),l.addScaledVector(a,sn.z),l)}static isFrontFacing(t,e,n,s){return ze.subVectors(n,e),nn.subVectors(t,e),ze.cross(nn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ze.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),ze.cross(nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return as===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),as=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;ni.subVectors(s,n),ii.subVectors(r,n),Pr.subVectors(t,n);let l=ni.dot(Pr),c=ii.dot(Pr);if(l<=0&&c<=0)return e.copy(n);Lr.subVectors(t,s);let h=ni.dot(Lr),u=ii.dot(Lr);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(ni,o);Ir.subVectors(t,r);let m=ni.dot(Ir),g=ii.dot(Ir);if(g>=0&&m<=g)return e.copy(r);let v=m*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ii,a);let p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return nl.subVectors(r,s),a=(u-h)/(u-h+(m-g)),e.copy(s).addScaledVector(nl,a);let d=1/(p+v+f);return o=v*d,a=f*d,e.copy(n).addScaledVector(ni,o).addScaledVector(ii,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Xl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},os={h:0,s:0,l:0};function Dr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ht=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=he){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=Lh(t,1),e=Ae(e,0,1),n=Ae(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Dr(o,r,t+1/3),this.g=Dr(o,r,t),this.b=Dr(o,r,t-1/3)}return Xt.toWorkingColorSpace(this,s),this}setStyle(t,e=he){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=he){let n=Xl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=mi(t.r),this.g=mi(t.g),this.b=mi(t.b),this}copyLinearToSRGB(t){return this.r=br(t.r),this.g=br(t.g),this.b=br(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=he){return Xt.fromWorkingColorSpace(ge.copy(this),t),Math.round(Ae(ge.r*255,0,255))*65536+Math.round(Ae(ge.g*255,0,255))*256+Math.round(Ae(ge.b*255,0,255))}getHexString(t=he){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(ge.copy(this),e);let n=ge.r,s=ge.g,r=ge.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(ge.copy(this),e),t.r=ge.r,t.g=ge.g,t.b=ge.b,t}getStyle(t=he){Xt.fromWorkingColorSpace(ge.copy(this),t);let e=ge.r,n=ge.g,s=ge.b;return t!==he?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(yn),this.setHSL(yn.h+t,yn.s+e,yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(yn),t.getHSL(os);let n=yr(yn.h,os.h,e),s=yr(yn.s,os.s,e),r=yr(yn.l,os.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ge=new Ht;Ht.NAMES=Xl;var Wh=0,Wn=class extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Vi(),this.name="",this.type="Material",this.blending=Sn,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vr,this.blendDst=Gr,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Sn&&(n.blending=this.blending),this.side!==Tn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vr&&(n.blendSrc=this.blendSrc),this.blendDst!==Gr&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ss&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Os=class extends Wn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ie=new O,ls=new qt,se=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Go,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ls.fromBufferAttribute(this,e),ls.applyMatrix3(t),this.setXY(e,ls.x,ls.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.applyMatrix3(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.applyMatrix4(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.applyNormalMatrix(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ie.fromBufferAttribute(this,e),ie.transformDirection(t),this.setXYZ(e,ie.x,ie.y,ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),s=Te(s,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Go&&(t.usage=this.usage),t}};var ks=class extends se{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Bs=class extends se{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var cn=class extends se{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Xh=0,De=new de,Nr=new Fe,si=new O,Le=new Gn,Ni=new Gn,ce=new O,Je=class i extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=Vi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Wl(t)?Bs:ks)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return De.makeRotationFromQuaternion(t),this.applyMatrix4(De),this}rotateX(t){return De.makeRotationX(t),this.applyMatrix4(De),this}rotateY(t){return De.makeRotationY(t),this.applyMatrix4(De),this}rotateZ(t){return De.makeRotationZ(t),this.applyMatrix4(De),this}translate(t,e,n){return De.makeTranslation(t,e,n),this.applyMatrix4(De),this}scale(t,e,n){return De.makeScale(t,e,n),this.applyMatrix4(De),this}lookAt(t){return Nr.lookAt(t),Nr.updateMatrix(),this.applyMatrix4(Nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(si).negate(),this.translate(si.x,si.y,si.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new cn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Le.setFromBufferAttribute(r),this.morphTargetsRelative?(ce.addVectors(this.boundingBox.min,Le.min),this.boundingBox.expandByPoint(ce),ce.addVectors(this.boundingBox.max,Le.max),this.boundingBox.expandByPoint(ce)):(this.boundingBox.expandByPoint(Le.min),this.boundingBox.expandByPoint(Le.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _i);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(t){let n=this.boundingSphere.center;if(Le.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ni.setFromBufferAttribute(a),this.morphTargetsRelative?(ce.addVectors(Le.min,Ni.min),Le.expandByPoint(ce),ce.addVectors(Le.max,Ni.max),Le.expandByPoint(ce)):(Le.expandByPoint(Ni.min),Le.expandByPoint(Ni.max))}Le.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ce.fromBufferAttribute(a,c),l&&(si.fromBufferAttribute(t,c),ce.add(si)),s=Math.max(s,n.distanceToSquared(ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new se(new Float32Array(4*a),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<a;w++)c[w]=new O,h[w]=new O;let u=new O,f=new O,m=new O,g=new qt,v=new qt,p=new qt,d=new O,M=new O;function x(w,N,q){u.fromArray(s,w*3),f.fromArray(s,N*3),m.fromArray(s,q*3),g.fromArray(o,w*2),v.fromArray(o,N*2),p.fromArray(o,q*2),f.sub(u),m.sub(u),v.sub(g),p.sub(g);let tt=1/(v.x*p.y-p.x*v.y);isFinite(tt)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(m,-v.y).multiplyScalar(tt),M.copy(m).multiplyScalar(v.x).addScaledVector(f,-p.x).multiplyScalar(tt),c[w].add(d),c[N].add(d),c[q].add(d),h[w].add(M),h[N].add(M),h[q].add(M))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let w=0,N=T.length;w<N;++w){let q=T[w],tt=q.start,L=q.count;for(let C=tt,D=tt+L;C<D;C+=3)x(n[C+0],n[C+1],n[C+2])}let R=new O,E=new O,A=new O,X=new O;function _(w){A.fromArray(r,w*3),X.copy(A);let N=c[w];R.copy(N),R.sub(A.multiplyScalar(A.dot(N))).normalize(),E.crossVectors(X,N);let tt=E.dot(h[w])<0?-1:1;l[w*4]=R.x,l[w*4+1]=R.y,l[w*4+2]=R.z,l[w*4+3]=tt}for(let w=0,N=T.length;w<N;++w){let q=T[w],tt=q.start,L=q.count;for(let C=tt,D=tt+L;C<D;C+=3)_(n[C+0]),_(n[C+1]),_(n[C+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new se(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);let s=new O,r=new O,o=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(t)for(let f=0,m=t.count;f<m;f+=3){let g=t.getX(f+0),v=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ce.fromBufferAttribute(t,e),ce.normalize(),t.setXYZ(e,ce.x,ce.y,ce.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),m=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*h;for(let d=0;d<h;d++)f[g++]=c[m++]}return new se(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],m=t(f,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},il=new de,Un=new Ns,cs=new _i,sl=new O,ri=new O,ai=new O,oi=new O,Ur=new O,hs=new O,us=new qt,ds=new qt,fs=new qt,rl=new O,al=new O,ol=new O,ps=new O,ms=new O,Ze=class extends Fe{constructor(t=new Je,e=new Os){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){hs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Ur.fromBufferAttribute(u,t),o?hs.addScaledVector(Ur,h):hs.addScaledVector(Ur.sub(e),h))}e.add(hs)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),cs.copy(n.boundingSphere),cs.applyMatrix4(r),Un.copy(t.ray).recast(t.near),!(cs.containsPoint(Un.origin)===!1&&(Un.intersectSphere(cs,sl)===null||Un.origin.distanceToSquared(sl)>(t.far-t.near)**2))&&(il.copy(r).invert(),Un.copy(t.ray).applyMatrix4(il),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Un)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){let p=f[g],d=o[p.materialIndex],M=Math.max(p.start,m.start),x=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let T=M,R=x;T<R;T+=3){let E=a.getX(T),A=a.getX(T+1),X=a.getX(T+2);s=gs(this,d,t,n,c,h,u,E,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=g,d=v;p<d;p+=3){let M=a.getX(p),x=a.getX(p+1),T=a.getX(p+2);s=gs(this,o,t,n,c,h,u,M,x,T),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){let p=f[g],d=o[p.materialIndex],M=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let T=M,R=x;T<R;T+=3){let E=T,A=T+1,X=T+2;s=gs(this,d,t,n,c,h,u,E,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let p=g,d=v;p<d;p+=3){let M=p,x=p+1,T=p+2;s=gs(this,o,t,n,c,h,u,M,x,T),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function qh(i,t,e,n,s,r,o,a){let l;if(t.side===Ce?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Tn,a),l===null)return null;ms.copy(a),ms.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ms);return c<e.near||c>e.far?null:{distance:c,point:ms.clone(),object:i}}function gs(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,ri),i.getVertexPosition(l,ai),i.getVertexPosition(c,oi);let h=qh(i,t,e,n,ri,ai,oi,ps);if(h){s&&(us.fromBufferAttribute(s,a),ds.fromBufferAttribute(s,l),fs.fromBufferAttribute(s,c),h.uv=ui.getInterpolation(ps,ri,ai,oi,us,ds,fs,new qt)),r&&(us.fromBufferAttribute(r,a),ds.fromBufferAttribute(r,l),fs.fromBufferAttribute(r,c),h.uv1=ui.getInterpolation(ps,ri,ai,oi,us,ds,fs,new qt),h.uv2=h.uv1),o&&(rl.fromBufferAttribute(o,a),al.fromBufferAttribute(o,l),ol.fromBufferAttribute(o,c),h.normal=ui.getInterpolation(ps,ri,ai,oi,rl,al,ol,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new O,materialIndex:0};ui.getNormal(ri,ai,oi,u.normal),h.face=u}return h}var Bi=class i extends Je{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,m=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new cn(c,3)),this.setAttribute("normal",new cn(h,3)),this.setAttribute("uv",new cn(u,2));function g(v,p,d,M,x,T,R,E,A,X,_){let w=T/A,N=R/X,q=T/2,tt=R/2,L=E/2,C=A+1,D=X+1,V=0,G=0,W=new O;for(let Y=0;Y<D;Y++){let K=Y*N-tt;for(let ot=0;ot<C;ot++){let H=ot*w-q;W[v]=H*M,W[p]=K*x,W[d]=L,c.push(W.x,W.y,W.z),W[v]=0,W[p]=0,W[d]=E>0?1:-1,h.push(W.x,W.y,W.z),u.push(ot/A),u.push(1-Y/X),V+=1}}for(let Y=0;Y<X;Y++)for(let K=0;K<A;K++){let ot=f+K+C*Y,H=f+K+C*(Y+1),$=f+(K+1)+C*(Y+1),rt=f+(K+1)+C*Y;l.push(ot,H,rt),l.push(H,$,rt),G+=6}a.addGroup(m,G,_),m+=G,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function bi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function be(i){let t={};for(let e=0;e<i.length;e++){let n=bi(i[e]);for(let s in n)t[s]=n[s]}return t}function Yh(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ql(i){return i.getRenderTarget()===null?i.outputColorSpace:Xt.workingColorSpace}var $h={clone:bi,merge:be},Zh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,We=class extends Wn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zh,this.fragmentShader=Jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bi(t.uniforms),this.uniformsGroups=Yh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},zs=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Se=class extends zs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Zr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zr*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(xr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},li=-90,ci=1,Qr=class extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Se(li,ci,t,e);s.layers=this.layers,this.add(s);let r=new Se(li,ci,t,e);r.layers=this.layers,this.add(r);let o=new Se(li,ci,t,e);o.layers=this.layers,this.add(o);let a=new Se(li,ci,t,e);a.layers=this.layers,this.add(a);let l=new Se(li,ci,t,e);l.layers=this.layers,this.add(l);let c=new Se(li,ci,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Rs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Hs=class extends Ge{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:vi,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ta=class extends un{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(Ui("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Vn?he:Ue),this.texture=new Hs(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ne}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bi(5,5,5),r=new We({name:"CubemapFromEquirect",uniforms:bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:Mn});r.uniforms.tEquirect.value=e;let o=new Ze(s,r),a=e.minFilter;return e.minFilter===Oi&&(e.minFilter=Ne),new Qr(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},Fr=new O,Kh=new O,jh=new kt,an=class{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Fr.subVectors(n,e).cross(Kh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Fr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||jh.getNormalMatrix(t),s=this.coplanarPoint(Fr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fn=new _i,vs=new O,Vs=class{constructor(t=new an,e=new an,n=new an,s=new an,r=new an,o=new an){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ln){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],m=s[8],g=s[9],v=s[10],p=s[11],d=s[12],M=s[13],x=s[14],T=s[15];if(n[0].setComponents(l-r,f-c,p-m,T-d).normalize(),n[1].setComponents(l+r,f+c,p+m,T+d).normalize(),n[2].setComponents(l+o,f+h,p+g,T+M).normalize(),n[3].setComponents(l-o,f-h,p-g,T-M).normalize(),n[4].setComponents(l-a,f-u,p-v,T-x).normalize(),e===ln)n[5].setComponents(l+a,f+u,p+v,T+x).normalize();else if(e===Rs)n[5].setComponents(a,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fn)}intersectsSprite(t){return Fn.center.set(0,0,0),Fn.radius=.7071067811865476,Fn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fn)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(vs.x=s.normal.x>0?t.max.x:t.min.x,vs.y=s.normal.y>0?t.max.y:t.min.y,vs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(vs)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Yl(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Qh(i,t){let e=t.isWebGL2,n=new WeakMap;function s(c,h){let u=c.array,f=c.usage,m=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,f),c.onUploadCallback();let v;if(u instanceof Float32Array)v=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)v=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=i.SHORT;else if(u instanceof Uint32Array)v=i.UNSIGNED_INT;else if(u instanceof Int32Array)v=i.INT;else if(u instanceof Int8Array)v=i.BYTE;else if(u instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,h,u){let f=h.array,m=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,c),m.count===-1&&g.length===0&&i.bufferSubData(u,0,f),g.length!==0){for(let v=0,p=g.length;v<p;v++){let d=g[v];e?i.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):i.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}m.count!==-1&&(e?i.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let u=n.get(c);if(u===void 0)n.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}var ea=class i extends Je{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,m=[],g=[],v=[],p=[];for(let d=0;d<h;d++){let M=d*f-o;for(let x=0;x<c;x++){let T=x*u-r;g.push(T,-M,0),v.push(0,0,1),p.push(x/a),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let M=0;M<a;M++){let x=M+c*d,T=M+c*(d+1),R=M+1+c*(d+1),E=M+1+c*d;m.push(x,T,E),m.push(T,R,E)}this.setIndex(m),this.setAttribute("position",new cn(g,3)),this.setAttribute("normal",new cn(v,3)),this.setAttribute("uv",new cn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},tu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,iu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,su=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,au=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ou=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,hu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,du=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,fu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,gu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_u=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Mu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Su=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Eu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Tu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Au=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ru=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Iu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Uu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ou=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ku=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Vu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Gu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Yu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$u=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ju=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ku=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ju=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,td=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ed=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,id=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ad=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,od=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ud=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,md=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,gd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_d=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Md=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ed=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Td=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ad=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Rd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ld=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Id=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ud=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Fd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Od=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$d=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Kd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Qd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,af=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,of=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,lf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,df=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ff=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_f=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Mf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ef=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Af=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Rf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,If=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Df=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,It={alphahash_fragment:tu,alphahash_pars_fragment:eu,alphamap_fragment:nu,alphamap_pars_fragment:iu,alphatest_fragment:su,alphatest_pars_fragment:ru,aomap_fragment:au,aomap_pars_fragment:ou,batching_pars_vertex:lu,batching_vertex:cu,begin_vertex:hu,beginnormal_vertex:uu,bsdfs:du,iridescence_fragment:fu,bumpmap_pars_fragment:pu,clipping_planes_fragment:mu,clipping_planes_pars_fragment:gu,clipping_planes_pars_vertex:vu,clipping_planes_vertex:xu,color_fragment:yu,color_pars_fragment:_u,color_pars_vertex:bu,color_vertex:Mu,common:Su,cube_uv_reflection_fragment:wu,defaultnormal_vertex:Eu,displacementmap_pars_vertex:Tu,displacementmap_vertex:Au,emissivemap_fragment:Cu,emissivemap_pars_fragment:Ru,colorspace_fragment:Pu,colorspace_pars_fragment:Lu,envmap_fragment:Iu,envmap_common_pars_fragment:Du,envmap_pars_fragment:Nu,envmap_pars_vertex:Uu,envmap_physical_pars_fragment:Yu,envmap_vertex:Fu,fog_vertex:Ou,fog_pars_vertex:ku,fog_fragment:Bu,fog_pars_fragment:zu,gradientmap_pars_fragment:Hu,lightmap_fragment:Vu,lightmap_pars_fragment:Gu,lights_lambert_fragment:Wu,lights_lambert_pars_fragment:Xu,lights_pars_begin:qu,lights_toon_fragment:$u,lights_toon_pars_fragment:Zu,lights_phong_fragment:Ju,lights_phong_pars_fragment:Ku,lights_physical_fragment:ju,lights_physical_pars_fragment:Qu,lights_fragment_begin:td,lights_fragment_maps:ed,lights_fragment_end:nd,logdepthbuf_fragment:id,logdepthbuf_pars_fragment:sd,logdepthbuf_pars_vertex:rd,logdepthbuf_vertex:ad,map_fragment:od,map_pars_fragment:ld,map_particle_fragment:cd,map_particle_pars_fragment:hd,metalnessmap_fragment:ud,metalnessmap_pars_fragment:dd,morphcolor_vertex:fd,morphnormal_vertex:pd,morphtarget_pars_vertex:md,morphtarget_vertex:gd,normal_fragment_begin:vd,normal_fragment_maps:xd,normal_pars_fragment:yd,normal_pars_vertex:_d,normal_vertex:bd,normalmap_pars_fragment:Md,clearcoat_normal_fragment_begin:Sd,clearcoat_normal_fragment_maps:wd,clearcoat_pars_fragment:Ed,iridescence_pars_fragment:Td,opaque_fragment:Ad,packing:Cd,premultiplied_alpha_fragment:Rd,project_vertex:Pd,dithering_fragment:Ld,dithering_pars_fragment:Id,roughnessmap_fragment:Dd,roughnessmap_pars_fragment:Nd,shadowmap_pars_fragment:Ud,shadowmap_pars_vertex:Fd,shadowmap_vertex:Od,shadowmask_pars_fragment:kd,skinbase_vertex:Bd,skinning_pars_vertex:zd,skinning_vertex:Hd,skinnormal_vertex:Vd,specularmap_fragment:Gd,specularmap_pars_fragment:Wd,tonemapping_fragment:Xd,tonemapping_pars_fragment:qd,transmission_fragment:Yd,transmission_pars_fragment:$d,uv_pars_fragment:Zd,uv_pars_vertex:Jd,uv_vertex:Kd,worldpos_vertex:jd,background_vert:Qd,background_frag:tf,backgroundCube_vert:ef,backgroundCube_frag:nf,cube_vert:sf,cube_frag:rf,depth_vert:af,depth_frag:of,distanceRGBA_vert:lf,distanceRGBA_frag:cf,equirect_vert:hf,equirect_frag:uf,linedashed_vert:df,linedashed_frag:ff,meshbasic_vert:pf,meshbasic_frag:mf,meshlambert_vert:gf,meshlambert_frag:vf,meshmatcap_vert:xf,meshmatcap_frag:yf,meshnormal_vert:_f,meshnormal_frag:bf,meshphong_vert:Mf,meshphong_frag:Sf,meshphysical_vert:wf,meshphysical_frag:Ef,meshtoon_vert:Tf,meshtoon_frag:Af,points_vert:Cf,points_frag:Rf,shadow_vert:Pf,shadow_frag:Lf,sprite_vert:If,sprite_frag:Df},nt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},$e={basic:{uniforms:be([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:be([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:be([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:be([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:be([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:be([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:be([nt.points,nt.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:be([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:be([nt.common,nt.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:be([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:be([nt.sprite,nt.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distanceRGBA:{uniforms:be([nt.common,nt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distanceRGBA_vert,fragmentShader:It.distanceRGBA_frag},shadow:{uniforms:be([nt.lights,nt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};$e.physical={uniforms:be([$e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};var xs={r:0,b:0,g:0};function Nf(i,t,e,n,s,r,o){let a=new Ht(0),l=r===!0?0:1,c,h,u=null,f=0,m=null;function g(p,d){let M=!1,x=d.isScene===!0?d.background:null;x&&x.isTexture&&(x=(d.backgroundBlurriness>0?e:t).get(x)),x===null?v(a,l):x&&x.isColor&&(v(x,1),M=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===$s)?(h===void 0&&(h=new Ze(new Bi(1,1,1),new We({name:"BackgroundCubeMaterial",uniforms:bi($e.backgroundCube.uniforms),vertexShader:$e.backgroundCube.vertexShader,fragmentShader:$e.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=Xt.getTransfer(x.colorSpace)!==Jt,(u!==x||f!==x.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ze(new ea(2,2),new We({name:"BackgroundMaterial",uniforms:bi($e.background.uniforms),vertexShader:$e.background.vertexShader,fragmentShader:$e.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(x.colorSpace)!==Jt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function v(p,d){p.getRGB(xs,ql(i)),n.buffers.color.setClear(xs.r,xs.g,xs.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(p,d=1){a.set(p),l=d,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,v(a,l)},render:g}}function Uf(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=p(null),c=l,h=!1;function u(L,C,D,V,G){let W=!1;if(o){let Y=v(V,D,C);c!==Y&&(c=Y,m(c.object)),W=d(L,V,D,G),W&&M(L,V,D,G)}else{let Y=C.wireframe===!0;(c.geometry!==V.id||c.program!==D.id||c.wireframe!==Y)&&(c.geometry=V.id,c.program=D.id,c.wireframe=Y,W=!0)}G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,X(L,C,D,V),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function v(L,C,D){let V=D.wireframe===!0,G=a[L.id];G===void 0&&(G={},a[L.id]=G);let W=G[C.id];W===void 0&&(W={},G[C.id]=W);let Y=W[V];return Y===void 0&&(Y=p(f()),W[V]=Y),Y}function p(L){let C=[],D=[],V=[];for(let G=0;G<s;G++)C[G]=0,D[G]=0,V[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:D,attributeDivisors:V,object:L,attributes:{},index:null}}function d(L,C,D,V){let G=c.attributes,W=C.attributes,Y=0,K=D.getAttributes();for(let ot in K)if(K[ot].location>=0){let $=G[ot],rt=W[ot];if(rt===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&(rt=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&(rt=L.instanceColor)),$===void 0||$.attribute!==rt||rt&&$.data!==rt.data)return!0;Y++}return c.attributesNum!==Y||c.index!==V}function M(L,C,D,V){let G={},W=C.attributes,Y=0,K=D.getAttributes();for(let ot in K)if(K[ot].location>=0){let $=W[ot];$===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&($=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&($=L.instanceColor));let rt={};rt.attribute=$,$&&$.data&&(rt.data=$.data),G[ot]=rt,Y++}c.attributes=G,c.attributesNum=Y,c.index=V}function x(){let L=c.newAttributes;for(let C=0,D=L.length;C<D;C++)L[C]=0}function T(L){R(L,0)}function R(L,C){let D=c.newAttributes,V=c.enabledAttributes,G=c.attributeDivisors;D[L]=1,V[L]===0&&(i.enableVertexAttribArray(L),V[L]=1),G[L]!==C&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,C),G[L]=C)}function E(){let L=c.newAttributes,C=c.enabledAttributes;for(let D=0,V=C.length;D<V;D++)C[D]!==L[D]&&(i.disableVertexAttribArray(D),C[D]=0)}function A(L,C,D,V,G,W,Y){Y===!0?i.vertexAttribIPointer(L,C,D,G,W):i.vertexAttribPointer(L,C,D,V,G,W)}function X(L,C,D,V){if(n.isWebGL2===!1&&(L.isInstancedMesh||V.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let G=V.attributes,W=D.getAttributes(),Y=C.defaultAttributeValues;for(let K in W){let ot=W[K];if(ot.location>=0){let H=G[K];if(H===void 0&&(K==="instanceMatrix"&&L.instanceMatrix&&(H=L.instanceMatrix),K==="instanceColor"&&L.instanceColor&&(H=L.instanceColor)),H!==void 0){let $=H.normalized,rt=H.itemSize,ft=e.get(H);if(ft===void 0)continue;let dt=ft.buffer,Et=ft.type,Tt=ft.bytesPerElement,Mt=n.isWebGL2===!0&&(Et===i.INT||Et===i.UNSIGNED_INT||H.gpuType===Ul);if(H.isInterleavedBufferAttribute){let zt=H.data,U=zt.stride,xe=H.offset;if(zt.isInstancedInterleavedBuffer){for(let xt=0;xt<ot.locationSize;xt++)R(ot.location+xt,zt.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=zt.meshPerAttribute*zt.count)}else for(let xt=0;xt<ot.locationSize;xt++)T(ot.location+xt);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let xt=0;xt<ot.locationSize;xt++)A(ot.location+xt,rt/ot.locationSize,Et,$,U*Tt,(xe+rt/ot.locationSize*xt)*Tt,Mt)}else{if(H.isInstancedBufferAttribute){for(let zt=0;zt<ot.locationSize;zt++)R(ot.location+zt,H.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let zt=0;zt<ot.locationSize;zt++)T(ot.location+zt);i.bindBuffer(i.ARRAY_BUFFER,dt);for(let zt=0;zt<ot.locationSize;zt++)A(ot.location+zt,rt/ot.locationSize,Et,$,rt*Tt,rt/ot.locationSize*zt*Tt,Mt)}}else if(Y!==void 0){let $=Y[K];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(ot.location,$);break;case 3:i.vertexAttrib3fv(ot.location,$);break;case 4:i.vertexAttrib4fv(ot.location,$);break;default:i.vertexAttrib1fv(ot.location,$)}}}}E()}function _(){q();for(let L in a){let C=a[L];for(let D in C){let V=C[D];for(let G in V)g(V[G].object),delete V[G];delete C[D]}delete a[L]}}function w(L){if(a[L.id]===void 0)return;let C=a[L.id];for(let D in C){let V=C[D];for(let G in V)g(V[G].object),delete V[G];delete C[D]}delete a[L.id]}function N(L){for(let C in a){let D=a[C];if(D[L.id]===void 0)continue;let V=D[L.id];for(let G in V)g(V[G].object),delete V[G];delete D[L.id]}}function q(){tt(),h=!0,c!==l&&(c=l,m(c.object))}function tt(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:q,resetDefaultState:tt,dispose:_,releaseStatesOfGeometry:w,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:T,disableUnusedAttributes:E}}function Ff(i,t,e,n){let s=n.isWebGL2,r;function o(h){r=h}function a(h,u){i.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,f){if(f===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,u,f),e.update(u,r,f)}function c(h,u,f){if(f===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{m.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let v=0;v<f;v++)g+=u[v];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Of(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&i.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),v=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,T=o||t.has("OES_texture_float"),R=x&&T,E=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:R,maxSamples:E}}function kf(i){let t=this,e=null,n=0,s=!1,r=!1,o=new an,a=new kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let m=u.length!==0||f||n!==0||s;return s=f,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,m){let g=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{let M=r?0:n,x=M*4,T=d.clippingState||null;l.value=T,T=h(g,f,x,m);for(let R=0;R!==x;++R)T[R]=e[R];d.clippingState=T,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,m,g){let v=u!==null?u.length:0,p=null;if(v!==0){if(p=l.value,g!==!0||p===null){let d=m+v*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<d)&&(p=new Float32Array(d));for(let x=0,T=m;x!==v;++x,T+=4)o.copy(u[x]).applyMatrix4(M,a),o.normal.toArray(p,T),p[T+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Bf(i){let t=new WeakMap;function e(o,a){return a===Wr?o.mapping=vi:a===Xr&&(o.mapping=xi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Wr||a===Xr)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new ta(l.height/2);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var na=class extends zs{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},di=4,ll=[.125,.215,.35,.446,.526,.582],Bn=20,Or=new na,cl=new Ht,kr=null,Br=0,zr=0,On=(1+Math.sqrt(5))/2,hi=1/On,hl=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,On,hi),new O(0,On,-hi),new O(hi,0,On),new O(-hi,0,On),new O(On,hi,0),new O(-On,hi,0)],Gs=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){kr=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),zr=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(kr,Br,zr),t.scissorTest=!1,ys(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vi||t.mapping===xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),kr=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),zr=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ne,minFilter:Ne,generateMipmaps:!1,type:ki,format:Ve,colorSpace:hn,depthBuffer:!1},s=ul(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ul(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zf(r)),this._blurMaterial=Hf(r,t,e)}return s}_compileMaterial(t){let e=new Ze(this._lodPlanes[0],t);this._renderer.compile(e,Or)}_sceneToCubeUV(t,e,n,s){let a=new Se(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(cl),h.toneMapping=wn,h.autoClear=!1;let m=new Os({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),g=new Ze(new Bi,m),v=!1,p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,v=!0):(m.color.copy(cl),v=!0);for(let d=0;d<6;d++){let M=d%3;M===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):M===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));let x=this._cubeSize;ys(s,M*x,d>2?x:0,x,x),h.setRenderTarget(s),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===vi||t.mapping===xi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dl());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Ze(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;ys(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Or)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=hl[(s-1)%hl.length];this._blur(t,s-1,s,r,o)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ze(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Bn-1),v=r/g,p=isFinite(r)?1+Math.floor(h*v):Bn;p>Bn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Bn}`);let d=[],M=0;for(let A=0;A<Bn;++A){let X=A/v,_=Math.exp(-X*X/2);d.push(_),A===0?M+=_:A<p&&(M+=2*_)}for(let A=0;A<d.length;A++)d[A]=d[A]/M;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;let T=this._sizeLods[s],R=3*T*(s>x-di?s-x+di:0),E=4*(this._cubeSize-T);ys(e,R,E,3*T,2*T),l.setRenderTarget(e),l.render(u,Or)}};function zf(i){let t=[],e=[],n=[],s=i,r=i-di+1+ll.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-di?l=ll[o-i+di-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,v=3,p=2,d=1,M=new Float32Array(v*g*m),x=new Float32Array(p*g*m),T=new Float32Array(d*g*m);for(let E=0;E<m;E++){let A=E%3*2/3-1,X=E>2?0:-1,_=[A,X,0,A+2/3,X,0,A+2/3,X+1,0,A,X,0,A+2/3,X+1,0,A,X+1,0];M.set(_,v*g*E),x.set(f,p*g*E);let w=[E,E,E,E,E,E];T.set(w,d*g*E)}let R=new Je;R.setAttribute("position",new se(M,v)),R.setAttribute("uv",new se(x,p)),R.setAttribute("faceIndex",new se(T,d)),t.push(R),s>di&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ul(i,t,e){let n=new un(i,t,e);return n.texture.mapping=$s,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ys(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Hf(i,t,e){let n=new Float32Array(Bn),s=new O(0,1,0);return new We({name:"SphericalGaussianBlur",defines:{n:Bn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function dl(){return new We({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function fl(){return new We({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mn,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vf(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Wr||l===Xr,h=l===vi||l===xi;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new Gs(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{let u=a.image;if(c&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Gs(i));let f=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Gf(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Wf(i,t,e,n){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let v=f.morphAttributes[g];for(let p=0,d=v.length;p<d;p++)t.remove(v[p])}f.removeEventListener("dispose",o),delete s[f.id];let m=r.get(f);m&&(t.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let g in f)t.update(f[g],i.ARRAY_BUFFER);let m=u.morphAttributes;for(let g in m){let v=m[g];for(let p=0,d=v.length;p<d;p++)t.update(v[p],i.ARRAY_BUFFER)}}function c(u){let f=[],m=u.index,g=u.attributes.position,v=0;if(m!==null){let M=m.array;v=m.version;for(let x=0,T=M.length;x<T;x+=3){let R=M[x+0],E=M[x+1],A=M[x+2];f.push(R,E,E,A,A,R)}}else if(g!==void 0){let M=g.array;v=g.version;for(let x=0,T=M.length/3-1;x<T;x+=3){let R=x+0,E=x+1,A=x+2;f.push(R,E,E,A,A,R)}}else return;let p=new(Wl(f)?Bs:ks)(f,1);p.version=v;let d=r.get(u);d&&t.remove(d),r.set(u,p)}function h(u){let f=r.get(u);if(f){let m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Xf(i,t,e,n){let s=n.isWebGL2,r;function o(m){r=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function h(m,g){i.drawElements(r,g,a,m*l),e.update(g,r,1)}function u(m,g,v){if(v===0)return;let p,d;if(s)p=i,d="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,g,a,m*l,v),e.update(g,r,v)}function f(m,g,v){if(v===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<v;d++)this.render(m[d]/l,g[d]);else{p.multiDrawElementsWEBGL(r,g,0,a,m,0,v);let d=0;for(let M=0;M<v;M++)d+=g[M];e.update(d,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function qf(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Yf(i,t){return i[0]-t[0]}function $f(i,t){return Math.abs(t[1])-Math.abs(i[1])}function Zf(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,o=new ue,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){let f=c.morphTargetInfluences;if(t.isWebGL2===!0){let m=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=m!==void 0?m.length:0,v=r.get(h);if(v===void 0||v.count!==g){let L=function(){q.dispose(),r.delete(h),h.removeEventListener("dispose",L)};v!==void 0&&v.texture.dispose();let M=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,R=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],A=h.morphAttributes.color||[],X=0;M===!0&&(X=1),x===!0&&(X=2),T===!0&&(X=3);let _=h.attributes.position.count*X,w=1;_>t.maxTextureSize&&(w=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let N=new Float32Array(_*w*4*g),q=new Ds(N,_,w,g);q.type=bn,q.needsUpdate=!0;let tt=X*4;for(let C=0;C<g;C++){let D=R[C],V=E[C],G=A[C],W=_*w*4*C;for(let Y=0;Y<D.count;Y++){let K=Y*tt;M===!0&&(o.fromBufferAttribute(D,Y),N[W+K+0]=o.x,N[W+K+1]=o.y,N[W+K+2]=o.z,N[W+K+3]=0),x===!0&&(o.fromBufferAttribute(V,Y),N[W+K+4]=o.x,N[W+K+5]=o.y,N[W+K+6]=o.z,N[W+K+7]=0),T===!0&&(o.fromBufferAttribute(G,Y),N[W+K+8]=o.x,N[W+K+9]=o.y,N[W+K+10]=o.z,N[W+K+11]=G.itemSize===4?o.w:1)}}v={count:g,texture:q,size:new qt(_,w)},r.set(h,v),h.addEventListener("dispose",L)}let p=0;for(let M=0;M<f.length;M++)p+=f[M];let d=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",d),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",v.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}else{let m=f===void 0?0:f.length,g=n[h.id];if(g===void 0||g.length!==m){g=[];for(let x=0;x<m;x++)g[x]=[x,0];n[h.id]=g}for(let x=0;x<m;x++){let T=g[x];T[0]=x,T[1]=f[x]}g.sort($f);for(let x=0;x<8;x++)x<m&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(Yf);let v=h.morphAttributes.position,p=h.morphAttributes.normal,d=0;for(let x=0;x<8;x++){let T=a[x],R=T[0],E=T[1];R!==Number.MAX_SAFE_INTEGER&&E?(v&&h.getAttribute("morphTarget"+x)!==v[R]&&h.setAttribute("morphTarget"+x,v[R]),p&&h.getAttribute("morphNormal"+x)!==p[R]&&h.setAttribute("morphNormal"+x,p[R]),s[x]=E,d+=E):(v&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),p&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}let M=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(i,"morphTargetBaseInfluence",M),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function Jf(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Ws=class extends Ge{constructor(t,e,n,s,r,o,a,l,c,h){if(h=h!==void 0?h:Hn,h!==Hn&&h!==yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Hn&&(n=_n),n===void 0&&h===yi&&(n=zn),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Me,this.minFilter=l!==void 0?l:Me,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},$l=new Ge,Zl=new Ws(1,1);Zl.compareFunction=Gl;var Jl=new Ds,Kl=new jr,jl=new Hs,pl=[],ml=[],gl=new Float32Array(16),vl=new Float32Array(9),xl=new Float32Array(4);function Si(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=pl[s];if(r===void 0&&(r=new Float32Array(s),pl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Js(i,t){let e=ml[t];e===void 0&&(e=new Int32Array(t),ml[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Kf(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function jf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(re(e,t))return;i.uniform2fv(this.addr,t),ae(e,t)}}function Qf(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(re(e,t))return;i.uniform3fv(this.addr,t),ae(e,t)}}function tp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(re(e,t))return;i.uniform4fv(this.addr,t),ae(e,t)}}function ep(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ae(e,t)}else{if(re(e,n))return;xl.set(n),i.uniformMatrix2fv(this.addr,!1,xl),ae(e,n)}}function np(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ae(e,t)}else{if(re(e,n))return;vl.set(n),i.uniformMatrix3fv(this.addr,!1,vl),ae(e,n)}}function ip(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ae(e,t)}else{if(re(e,n))return;gl.set(n),i.uniformMatrix4fv(this.addr,!1,gl),ae(e,n)}}function sp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function rp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(re(e,t))return;i.uniform2iv(this.addr,t),ae(e,t)}}function ap(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(re(e,t))return;i.uniform3iv(this.addr,t),ae(e,t)}}function op(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(re(e,t))return;i.uniform4iv(this.addr,t),ae(e,t)}}function lp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function cp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(re(e,t))return;i.uniform2uiv(this.addr,t),ae(e,t)}}function hp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(re(e,t))return;i.uniform3uiv(this.addr,t),ae(e,t)}}function up(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(re(e,t))return;i.uniform4uiv(this.addr,t),ae(e,t)}}function dp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Zl:$l;e.setTexture2D(t||r,s)}function fp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Kl,s)}function pp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||jl,s)}function mp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Jl,s)}function gp(i){switch(i){case 5126:return Kf;case 35664:return jf;case 35665:return Qf;case 35666:return tp;case 35674:return ep;case 35675:return np;case 35676:return ip;case 5124:case 35670:return sp;case 35667:case 35671:return rp;case 35668:case 35672:return ap;case 35669:case 35673:return op;case 5125:return lp;case 36294:return cp;case 36295:return hp;case 36296:return up;case 35678:case 36198:case 36298:case 36306:case 35682:return dp;case 35679:case 36299:case 36307:return fp;case 35680:case 36300:case 36308:case 36293:return pp;case 36289:case 36303:case 36311:case 36292:return mp}}function vp(i,t){i.uniform1fv(this.addr,t)}function xp(i,t){let e=Si(t,this.size,2);i.uniform2fv(this.addr,e)}function yp(i,t){let e=Si(t,this.size,3);i.uniform3fv(this.addr,e)}function _p(i,t){let e=Si(t,this.size,4);i.uniform4fv(this.addr,e)}function bp(i,t){let e=Si(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Mp(i,t){let e=Si(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Sp(i,t){let e=Si(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function wp(i,t){i.uniform1iv(this.addr,t)}function Ep(i,t){i.uniform2iv(this.addr,t)}function Tp(i,t){i.uniform3iv(this.addr,t)}function Ap(i,t){i.uniform4iv(this.addr,t)}function Cp(i,t){i.uniform1uiv(this.addr,t)}function Rp(i,t){i.uniform2uiv(this.addr,t)}function Pp(i,t){i.uniform3uiv(this.addr,t)}function Lp(i,t){i.uniform4uiv(this.addr,t)}function Ip(i,t,e){let n=this.cache,s=t.length,r=Js(e,s);re(n,r)||(i.uniform1iv(this.addr,r),ae(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||$l,r[o])}function Dp(i,t,e){let n=this.cache,s=t.length,r=Js(e,s);re(n,r)||(i.uniform1iv(this.addr,r),ae(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Kl,r[o])}function Np(i,t,e){let n=this.cache,s=t.length,r=Js(e,s);re(n,r)||(i.uniform1iv(this.addr,r),ae(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||jl,r[o])}function Up(i,t,e){let n=this.cache,s=t.length,r=Js(e,s);re(n,r)||(i.uniform1iv(this.addr,r),ae(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Jl,r[o])}function Fp(i){switch(i){case 5126:return vp;case 35664:return xp;case 35665:return yp;case 35666:return _p;case 35674:return bp;case 35675:return Mp;case 35676:return Sp;case 5124:case 35670:return wp;case 35667:case 35671:return Ep;case 35668:case 35672:return Tp;case 35669:case 35673:return Ap;case 5125:return Cp;case 36294:return Rp;case 36295:return Pp;case 36296:return Lp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ip;case 35679:case 36299:case 36307:return Dp;case 35680:case 36300:case 36308:case 36293:return Np;case 36289:case 36303:case 36311:case 36292:return Up}}var ia=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gp(e.type)}},sa=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fp(e.type)}},ra=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Hr=/(\w+)(\])?(\[|\.)?/g;function yl(i,t){i.seq.push(t),i.map[t.id]=t}function Op(i,t,e){let n=i.name,s=n.length;for(Hr.lastIndex=0;;){let r=Hr.exec(n),o=Hr.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){yl(e,c===void 0?new ia(a,i,t):new sa(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new ra(a),yl(e,u)),e=u}}}var gi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Op(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function _l(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var kp=37297,Bp=0;function zp(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Hp(i){let t=Xt.getPrimaries(Xt.workingColorSpace),e=Xt.getPrimaries(i),n;switch(t===e?n="":t===Cs&&e===As?n="LinearDisplayP3ToLinearSRGB":t===As&&e===Cs&&(n="LinearSRGBToLinearDisplayP3"),i){case hn:case Zs:return[n,"LinearTransferOETF"];case he:case Ca:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function bl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+zp(i.getShaderSource(t),o)}else return s}function Vp(i,t){let e=Hp(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Gp(i,t){let e;switch(t){case rh:e="Linear";break;case ah:e="Reinhard";break;case oh:e="OptimizedCineon";break;case lh:e="ACESFilmic";break;case hh:e="AgX";break;case ch:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Wp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(fi).join(`
`)}function Xp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(fi).join(`
`)}function qp(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Yp(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function fi(i){return i!==""}function Ml(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var $p=/^[ \t]*#include +<([\w\d./]+)>/gm;function aa(i){return i.replace($p,Jp)}var Zp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Jp(i,t){let e=It[t];if(e===void 0){let n=Zp.get(t);if(n!==void 0)e=It[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return aa(e)}var Kp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wl(i){return i.replace(Kp,jp)}function jp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function El(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Qp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Il?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Dc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===rn&&(t="SHADOWMAP_TYPE_VSM"),t}function tm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vi:case xi:t="ENVMAP_TYPE_CUBE";break;case $s:t="ENVMAP_TYPE_CUBE_UV";break}return t}function em(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xi:t="ENVMAP_MODE_REFRACTION";break}return t}function nm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Dl:t="ENVMAP_BLENDING_MULTIPLY";break;case ih:t="ENVMAP_BLENDING_MIX";break;case sh:t="ENVMAP_BLENDING_ADD";break}return t}function im(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function sm(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Qp(e),c=tm(e),h=em(e),u=nm(e),f=im(e),m=e.isWebGL2?"":Wp(e),g=Xp(e),v=qp(r),p=s.createProgram(),d,M,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(fi).join(`
`),d.length>0&&(d+=`
`),M=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(fi).join(`
`),M.length>0&&(M+=`
`)):(d=[El(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fi).join(`
`),M=[m,El(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==wn?"#define TONE_MAPPING":"",e.toneMapping!==wn?It.tonemapping_pars_fragment:"",e.toneMapping!==wn?Gp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,Vp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fi).join(`
`)),o=aa(o),o=Ml(o,e),o=Sl(o,e),a=aa(a),a=Ml(a,e),a=Sl(a,e),o=wl(o),a=wl(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Wo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Wo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);let T=x+d+o,R=x+M+a,E=_l(s,s.VERTEX_SHADER,T),A=_l(s,s.FRAGMENT_SHADER,R);s.attachShader(p,E),s.attachShader(p,A),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function X(q){if(i.debug.checkShaderErrors){let tt=s.getProgramInfoLog(p).trim(),L=s.getShaderInfoLog(E).trim(),C=s.getShaderInfoLog(A).trim(),D=!0,V=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(D=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,E,A);else{let G=bl(s,E,"vertex"),W=bl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+tt+`
`+G+`
`+W)}else tt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",tt):(L===""||C==="")&&(V=!1);V&&(q.diagnostics={runnable:D,programLog:tt,vertexShader:{log:L,prefix:d},fragmentShader:{log:C,prefix:M}})}s.deleteShader(E),s.deleteShader(A),_=new gi(s,p),w=Yp(s,p)}let _;this.getUniforms=function(){return _===void 0&&X(this),_};let w;this.getAttributes=function(){return w===void 0&&X(this),w};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(p,kp)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Bp++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=E,this.fragmentShader=A,this}var rm=0,oa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new la(t),e.set(t,n)),n}},la=class{constructor(t){this.id=rm++,this.code=t,this.usedTimes=0}};function am(i,t,e,n,s,r,o){let a=new Fs,l=new oa,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures,m=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(_){return _===0?"uv":`uv${_}`}function p(_,w,N,q,tt){let L=q.fog,C=tt.geometry,D=_.isMeshStandardMaterial?q.environment:null,V=(_.isMeshStandardMaterial?e:t).get(_.envMap||D),G=V&&V.mapping===$s?V.image.height:null,W=g[_.type];_.precision!==null&&(m=s.getMaxPrecision(_.precision),m!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",m,"instead."));let Y=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,K=Y!==void 0?Y.length:0,ot=0;C.morphAttributes.position!==void 0&&(ot=1),C.morphAttributes.normal!==void 0&&(ot=2),C.morphAttributes.color!==void 0&&(ot=3);let H,$,rt,ft;if(W){let ye=$e[W];H=ye.vertexShader,$=ye.fragmentShader}else H=_.vertexShader,$=_.fragmentShader,l.update(_),rt=l.getVertexShaderID(_),ft=l.getFragmentShaderID(_);let dt=i.getRenderTarget(),Et=tt.isInstancedMesh===!0,Tt=tt.isBatchedMesh===!0,Mt=!!_.map,zt=!!_.matcap,U=!!V,xe=!!_.aoMap,xt=!!_.lightMap,Ct=!!_.bumpMap,pt=!!_.normalMap,jt=!!_.displacementMap,Dt=!!_.emissiveMap,S=!!_.metalnessMap,y=!!_.roughnessMap,k=_.anisotropy>0,j=_.clearcoat>0,J=_.iridescence>0,Q=_.sheen>0,mt=_.transmission>0,at=k&&!!_.anisotropyMap,ct=j&&!!_.clearcoatMap,bt=j&&!!_.clearcoatNormalMap,Nt=j&&!!_.clearcoatRoughnessMap,Z=J&&!!_.iridescenceMap,Wt=J&&!!_.iridescenceThicknessMap,Bt=Q&&!!_.sheenColorMap,At=Q&&!!_.sheenRoughnessMap,vt=!!_.specularMap,ht=!!_.specularColorMap,Lt=!!_.specularIntensityMap,Vt=mt&&!!_.transmissionMap,te=mt&&!!_.thicknessMap,Ft=!!_.gradientMap,et=!!_.alphaMap,P=_.alphaTest>0,it=!!_.alphaHash,st=!!_.extensions,St=!!C.attributes.uv1,yt=!!C.attributes.uv2,Yt=!!C.attributes.uv3,$t=wn;return _.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&($t=i.toneMapping),{isWebGL2:h,shaderID:W,shaderType:_.type,shaderName:_.name,vertexShader:H,fragmentShader:$,defines:_.defines,customVertexShaderID:rt,customFragmentShaderID:ft,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:m,batching:Tt,instancing:Et,instancingColor:Et&&tt.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:dt===null?i.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:hn,map:Mt,matcap:zt,envMap:U,envMapMode:U&&V.mapping,envMapCubeUVHeight:G,aoMap:xe,lightMap:xt,bumpMap:Ct,normalMap:pt,displacementMap:f&&jt,emissiveMap:Dt,normalMapObjectSpace:pt&&_.normalMapType===Sh,normalMapTangentSpace:pt&&_.normalMapType===Mh,metalnessMap:S,roughnessMap:y,anisotropy:k,anisotropyMap:at,clearcoat:j,clearcoatMap:ct,clearcoatNormalMap:bt,clearcoatRoughnessMap:Nt,iridescence:J,iridescenceMap:Z,iridescenceThicknessMap:Wt,sheen:Q,sheenColorMap:Bt,sheenRoughnessMap:At,specularMap:vt,specularColorMap:ht,specularIntensityMap:Lt,transmission:mt,transmissionMap:Vt,thicknessMap:te,gradientMap:Ft,opaque:_.transparent===!1&&_.blending===Sn,alphaMap:et,alphaTest:P,alphaHash:it,combine:_.combine,mapUv:Mt&&v(_.map.channel),aoMapUv:xe&&v(_.aoMap.channel),lightMapUv:xt&&v(_.lightMap.channel),bumpMapUv:Ct&&v(_.bumpMap.channel),normalMapUv:pt&&v(_.normalMap.channel),displacementMapUv:jt&&v(_.displacementMap.channel),emissiveMapUv:Dt&&v(_.emissiveMap.channel),metalnessMapUv:S&&v(_.metalnessMap.channel),roughnessMapUv:y&&v(_.roughnessMap.channel),anisotropyMapUv:at&&v(_.anisotropyMap.channel),clearcoatMapUv:ct&&v(_.clearcoatMap.channel),clearcoatNormalMapUv:bt&&v(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Nt&&v(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&v(_.iridescenceMap.channel),iridescenceThicknessMapUv:Wt&&v(_.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&v(_.sheenColorMap.channel),sheenRoughnessMapUv:At&&v(_.sheenRoughnessMap.channel),specularMapUv:vt&&v(_.specularMap.channel),specularColorMapUv:ht&&v(_.specularColorMap.channel),specularIntensityMapUv:Lt&&v(_.specularIntensityMap.channel),transmissionMapUv:Vt&&v(_.transmissionMap.channel),thicknessMapUv:te&&v(_.thicknessMap.channel),alphaMapUv:et&&v(_.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(pt||k),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,vertexUv1s:St,vertexUv2s:yt,vertexUv3s:Yt,pointsUvs:tt.isPoints===!0&&!!C.attributes.uv&&(Mt||et),fog:!!L,useFog:_.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:tt.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:ot,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:$t,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Mt&&_.map.isVideoTexture===!0&&Xt.getTransfer(_.map.colorSpace)===Jt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===on,flipSided:_.side===Ce,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:st&&_.extensions.derivatives===!0,extensionFragDepth:st&&_.extensions.fragDepth===!0,extensionDrawBuffers:st&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:st&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:st&&_.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function d(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let N in _.defines)w.push(N),w.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(M(w,_),x(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function M(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function x(_,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function T(_){let w=g[_.type],N;if(w){let q=$e[w];N=$h.clone(q.uniforms)}else N=_.uniforms;return N}function R(_,w){let N;for(let q=0,tt=c.length;q<tt;q++){let L=c[q];if(L.cacheKey===w){N=L,++N.usedTimes;break}}return N===void 0&&(N=new sm(i,w,_,r),c.push(N)),N}function E(_){if(--_.usedTimes===0){let w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),_.destroy()}}function A(_){l.remove(_)}function X(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:T,acquireProgram:R,releaseProgram:E,releaseShaderCache:A,programs:c,dispose:X}}function om(){let i=new WeakMap;function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function e(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function lm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Tl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Al(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,m,g,v,p){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:v,group:p},i[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=v,d.group=p),t++,d}function a(u,f,m,g,v,p){let d=o(u,f,m,g,v,p);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):e.push(d)}function l(u,f,m,g,v,p){let d=o(u,f,m,g,v,p);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||lm),n.length>1&&n.sort(f||Tl),s.length>1&&s.sort(f||Tl)}function h(){for(let u=t,f=i.length;u<f;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function cm(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Al,i.set(n,[o])):s>=r.length?(o=new Al,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function hm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Ht};break;case"SpotLight":e={position:new O,direction:new O,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function um(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var dm=0;function fm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function pm(i,t){let e=new hm,n=um(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new O);let r=new O,o=new de,a=new de;function l(h,u){let f=0,m=0,g=0;for(let q=0;q<9;q++)s.probe[q].set(0,0,0);let v=0,p=0,d=0,M=0,x=0,T=0,R=0,E=0,A=0,X=0,_=0;h.sort(fm);let w=u===!0?Math.PI:1;for(let q=0,tt=h.length;q<tt;q++){let L=h[q],C=L.color,D=L.intensity,V=L.distance,G=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=C.r*D*w,m+=C.g*D*w,g+=C.b*D*w;else if(L.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(L.sh.coefficients[W],D);_++}else if(L.isDirectionalLight){let W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*w),L.castShadow){let Y=L.shadow,K=n.get(L);K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,s.directionalShadow[v]=K,s.directionalShadowMap[v]=G,s.directionalShadowMatrix[v]=L.shadow.matrix,T++}s.directional[v]=W,v++}else if(L.isSpotLight){let W=e.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(C).multiplyScalar(D*w),W.distance=V,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,s.spot[d]=W;let Y=L.shadow;if(L.map&&(s.spotLightMap[A]=L.map,A++,Y.updateMatrices(L),L.castShadow&&X++),s.spotLightMatrix[d]=Y.matrix,L.castShadow){let K=n.get(L);K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,s.spotShadow[d]=K,s.spotShadowMap[d]=G,E++}d++}else if(L.isRectAreaLight){let W=e.get(L);W.color.copy(C).multiplyScalar(D),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),s.rectArea[M]=W,M++}else if(L.isPointLight){let W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*w),W.distance=L.distance,W.decay=L.decay,L.castShadow){let Y=L.shadow,K=n.get(L);K.shadowBias=Y.bias,K.shadowNormalBias=Y.normalBias,K.shadowRadius=Y.radius,K.shadowMapSize=Y.mapSize,K.shadowCameraNear=Y.camera.near,K.shadowCameraFar=Y.camera.far,s.pointShadow[p]=K,s.pointShadowMap[p]=G,s.pointShadowMatrix[p]=L.shadow.matrix,R++}s.point[p]=W,p++}else if(L.isHemisphereLight){let W=e.get(L);W.skyColor.copy(L.color).multiplyScalar(D*w),W.groundColor.copy(L.groundColor).multiplyScalar(D*w),s.hemi[x]=W,x++}}M>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=nt.LTC_FLOAT_1,s.rectAreaLTC2=nt.LTC_FLOAT_2):(s.rectAreaLTC1=nt.LTC_HALF_1,s.rectAreaLTC2=nt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=nt.LTC_FLOAT_1,s.rectAreaLTC2=nt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=nt.LTC_HALF_1,s.rectAreaLTC2=nt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;let N=s.hash;(N.directionalLength!==v||N.pointLength!==p||N.spotLength!==d||N.rectAreaLength!==M||N.hemiLength!==x||N.numDirectionalShadows!==T||N.numPointShadows!==R||N.numSpotShadows!==E||N.numSpotMaps!==A||N.numLightProbes!==_)&&(s.directional.length=v,s.spot.length=d,s.rectArea.length=M,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=E,s.spotShadowMap.length=E,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=E+A-X,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=X,s.numLightProbes=_,N.directionalLength=v,N.pointLength=p,N.spotLength=d,N.rectAreaLength=M,N.hemiLength=x,N.numDirectionalShadows=T,N.numPointShadows=R,N.numSpotShadows=E,N.numSpotMaps=A,N.numLightProbes=_,s.version=dm++)}function c(h,u){let f=0,m=0,g=0,v=0,p=0,d=u.matrixWorldInverse;for(let M=0,x=h.length;M<x;M++){let T=h[M];if(T.isDirectionalLight){let R=s.directional[f];R.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),f++}else if(T.isSpotLight){let R=s.spot[g];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),R.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),g++}else if(T.isRectAreaLight){let R=s.rectArea[v];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),a.identity(),o.copy(T.matrixWorld),o.premultiply(d),a.extractRotation(o),R.halfWidth.set(T.width*.5,0,0),R.halfHeight.set(0,T.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),v++}else if(T.isPointLight){let R=s.point[m];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),m++}else if(T.isHemisphereLight){let R=s.hemi[p];R.direction.setFromMatrixPosition(T.matrixWorld),R.direction.transformDirection(d),p++}}}return{setup:l,setupView:c,state:s}}function Cl(i,t){let e=new pm(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function mm(i,t){let e=new WeakMap;function n(r,o=0){let a=e.get(r),l;return a===void 0?(l=new Cl(i,t),e.set(r,[l])):o>=a.length?(l=new Cl(i,t),a.push(l)):l=a[o],l}function s(){e=new WeakMap}return{get:n,dispose:s}}var ca=class extends Wn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ha=class extends Wn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},gm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xm(i,t,e){let n=new Vs,s=new qt,r=new qt,o=new ue,a=new ca({depthPacking:bh}),l=new ha,c={},h=e.maxTextureSize,u={[Tn]:Ce,[Ce]:Tn,[on]:on},f=new We({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:gm,fragmentShader:vm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let g=new Je;g.setAttribute("position",new se(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Ze(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Il;let d=this.type;this.render=function(E,A,X){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;let _=i.getRenderTarget(),w=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),q=i.state;q.setBlending(Mn),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let tt=d!==rn&&this.type===rn,L=d===rn&&this.type!==rn;for(let C=0,D=E.length;C<D;C++){let V=E[C],G=V.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let W=G.getFrameExtents();if(s.multiply(W),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,G.mapSize.y=r.y)),G.map===null||tt===!0||L===!0){let K=this.type!==rn?{minFilter:Me,magFilter:Me}:{};G.map!==null&&G.map.dispose(),G.map=new un(s.x,s.y,K),G.map.texture.name=V.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let Y=G.getViewportCount();for(let K=0;K<Y;K++){let ot=G.getViewport(K);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),q.viewport(o),G.updateMatrices(V,K),n=G.getFrustum(),T(A,X,G.camera,V,this.type)}G.isPointLightShadow!==!0&&this.type===rn&&M(G,X),G.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(_,w,N)};function M(E,A){let X=t.update(v);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new un(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,X,f,v,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,X,m,v,null)}function x(E,A,X,_){let w=null,N=X.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)w=N;else if(w=X.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let q=w.uuid,tt=A.uuid,L=c[q];L===void 0&&(L={},c[q]=L);let C=L[tt];C===void 0&&(C=w.clone(),L[tt]=C,A.addEventListener("dispose",R)),w=C}if(w.visible=A.visible,w.wireframe=A.wireframe,_===rn?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:u[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,X.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let q=i.properties.get(w);q.light=X}return w}function T(E,A,X,_,w){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&w===rn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld);let tt=t.update(E),L=E.material;if(Array.isArray(L)){let C=tt.groups;for(let D=0,V=C.length;D<V;D++){let G=C[D],W=L[G.materialIndex];if(W&&W.visible){let Y=x(E,W,_,w);E.onBeforeShadow(i,E,A,X,tt,Y,G),i.renderBufferDirect(X,null,tt,Y,E,G),E.onAfterShadow(i,E,A,X,tt,Y,G)}}}else if(L.visible){let C=x(E,L,_,w);E.onBeforeShadow(i,E,A,X,tt,C,null),i.renderBufferDirect(X,null,tt,C,E,null),E.onAfterShadow(i,E,A,X,tt,C,null)}}let q=E.children;for(let tt=0,L=q.length;tt<L;tt++)T(q[tt],A,X,_,w)}function R(E){E.target.removeEventListener("dispose",R);for(let X in c){let _=c[X],w=E.target.uuid;w in _&&(_[w].dispose(),delete _[w])}}}function ym(i,t,e){let n=e.isWebGL2;function s(){let P=!1,it=new ue,st=null,St=new ue(0,0,0,0);return{setMask:function(yt){st!==yt&&!P&&(i.colorMask(yt,yt,yt,yt),st=yt)},setLocked:function(yt){P=yt},setClear:function(yt,Yt,$t,oe,ye){ye===!0&&(yt*=oe,Yt*=oe,$t*=oe),it.set(yt,Yt,$t,oe),St.equals(it)===!1&&(i.clearColor(yt,Yt,$t,oe),St.copy(it))},reset:function(){P=!1,st=null,St.set(-1,0,0,0)}}}function r(){let P=!1,it=null,st=null,St=null;return{setTest:function(yt){yt?Tt(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(yt){it!==yt&&!P&&(i.depthMask(yt),it=yt)},setFunc:function(yt){if(st!==yt){switch(yt){case Jc:i.depthFunc(i.NEVER);break;case Kc:i.depthFunc(i.ALWAYS);break;case jc:i.depthFunc(i.LESS);break;case Ss:i.depthFunc(i.LEQUAL);break;case Qc:i.depthFunc(i.EQUAL);break;case th:i.depthFunc(i.GEQUAL);break;case eh:i.depthFunc(i.GREATER);break;case nh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}st=yt}},setLocked:function(yt){P=yt},setClear:function(yt){St!==yt&&(i.clearDepth(yt),St=yt)},reset:function(){P=!1,it=null,st=null,St=null}}}function o(){let P=!1,it=null,st=null,St=null,yt=null,Yt=null,$t=null,oe=null,ye=null;return{setTest:function(Zt){P||(Zt?Tt(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(Zt){it!==Zt&&!P&&(i.stencilMask(Zt),it=Zt)},setFunc:function(Zt,_e,qe){(st!==Zt||St!==_e||yt!==qe)&&(i.stencilFunc(Zt,_e,qe),st=Zt,St=_e,yt=qe)},setOp:function(Zt,_e,qe){(Yt!==Zt||$t!==_e||oe!==qe)&&(i.stencilOp(Zt,_e,qe),Yt=Zt,$t=_e,oe=qe)},setLocked:function(Zt){P=Zt},setClear:function(Zt){ye!==Zt&&(i.clearStencil(Zt),ye=Zt)},reset:function(){P=!1,it=null,st=null,St=null,yt=null,Yt=null,$t=null,oe=null,ye=null}}}let a=new s,l=new r,c=new o,h=new WeakMap,u=new WeakMap,f={},m={},g=new WeakMap,v=[],p=null,d=!1,M=null,x=null,T=null,R=null,E=null,A=null,X=null,_=new Ht(0,0,0),w=0,N=!1,q=null,tt=null,L=null,C=null,D=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,W=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Y)[1]),G=W>=1):Y.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),G=W>=2);let K=null,ot={},H=i.getParameter(i.SCISSOR_BOX),$=i.getParameter(i.VIEWPORT),rt=new ue().fromArray(H),ft=new ue().fromArray($);function dt(P,it,st,St){let yt=new Uint8Array(4),Yt=i.createTexture();i.bindTexture(P,Yt),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $t=0;$t<st;$t++)n&&(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)?i.texImage3D(it,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(it+$t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return Yt}let Et={};Et[i.TEXTURE_2D]=dt(i.TEXTURE_2D,i.TEXTURE_2D,1),Et[i.TEXTURE_CUBE_MAP]=dt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Et[i.TEXTURE_2D_ARRAY]=dt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Et[i.TEXTURE_3D]=dt(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Tt(i.DEPTH_TEST),l.setFunc(Ss),Dt(!1),S(ao),Tt(i.CULL_FACE),pt(Mn);function Tt(P){f[P]!==!0&&(i.enable(P),f[P]=!0)}function Mt(P){f[P]!==!1&&(i.disable(P),f[P]=!1)}function zt(P,it){return m[P]!==it?(i.bindFramebuffer(P,it),m[P]=it,n&&(P===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=it),P===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=it)),!0):!1}function U(P,it){let st=v,St=!1;if(P)if(st=g.get(it),st===void 0&&(st=[],g.set(it,st)),P.isWebGLMultipleRenderTargets){let yt=P.texture;if(st.length!==yt.length||st[0]!==i.COLOR_ATTACHMENT0){for(let Yt=0,$t=yt.length;Yt<$t;Yt++)st[Yt]=i.COLOR_ATTACHMENT0+Yt;st.length=yt.length,St=!0}}else st[0]!==i.COLOR_ATTACHMENT0&&(st[0]=i.COLOR_ATTACHMENT0,St=!0);else st[0]!==i.BACK&&(st[0]=i.BACK,St=!0);St&&(e.isWebGL2?i.drawBuffers(st):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(st))}function xe(P){return p!==P?(i.useProgram(P),p=P,!0):!1}let xt={[kn]:i.FUNC_ADD,[Uc]:i.FUNC_SUBTRACT,[Fc]:i.FUNC_REVERSE_SUBTRACT};if(n)xt[ho]=i.MIN,xt[uo]=i.MAX;else{let P=t.get("EXT_blend_minmax");P!==null&&(xt[ho]=P.MIN_EXT,xt[uo]=P.MAX_EXT)}let Ct={[Oc]:i.ZERO,[kc]:i.ONE,[Bc]:i.SRC_COLOR,[Vr]:i.SRC_ALPHA,[Xc]:i.SRC_ALPHA_SATURATE,[Gc]:i.DST_COLOR,[Hc]:i.DST_ALPHA,[zc]:i.ONE_MINUS_SRC_COLOR,[Gr]:i.ONE_MINUS_SRC_ALPHA,[Wc]:i.ONE_MINUS_DST_COLOR,[Vc]:i.ONE_MINUS_DST_ALPHA,[qc]:i.CONSTANT_COLOR,[Yc]:i.ONE_MINUS_CONSTANT_COLOR,[$c]:i.CONSTANT_ALPHA,[Zc]:i.ONE_MINUS_CONSTANT_ALPHA};function pt(P,it,st,St,yt,Yt,$t,oe,ye,Zt){if(P===Mn){d===!0&&(Mt(i.BLEND),d=!1);return}if(d===!1&&(Tt(i.BLEND),d=!0),P!==Nc){if(P!==M||Zt!==N){if((x!==kn||E!==kn)&&(i.blendEquation(i.FUNC_ADD),x=kn,E=kn),Zt)switch(P){case Sn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oo:i.blendFunc(i.ONE,i.ONE);break;case lo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case co:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Sn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case lo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case co:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}T=null,R=null,A=null,X=null,_.set(0,0,0),w=0,M=P,N=Zt}return}yt=yt||it,Yt=Yt||st,$t=$t||St,(it!==x||yt!==E)&&(i.blendEquationSeparate(xt[it],xt[yt]),x=it,E=yt),(st!==T||St!==R||Yt!==A||$t!==X)&&(i.blendFuncSeparate(Ct[st],Ct[St],Ct[Yt],Ct[$t]),T=st,R=St,A=Yt,X=$t),(oe.equals(_)===!1||ye!==w)&&(i.blendColor(oe.r,oe.g,oe.b,ye),_.copy(oe),w=ye),M=P,N=!1}function jt(P,it){P.side===on?Mt(i.CULL_FACE):Tt(i.CULL_FACE);let st=P.side===Ce;it&&(st=!st),Dt(st),P.blending===Sn&&P.transparent===!1?pt(Mn):pt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);let St=P.stencilWrite;c.setTest(St),St&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),k(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Tt(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(P){q!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),q=P)}function S(P){P!==Lc?(Tt(i.CULL_FACE),P!==tt&&(P===ao?i.cullFace(i.BACK):P===Ic?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),tt=P}function y(P){P!==L&&(G&&i.lineWidth(P),L=P)}function k(P,it,st){P?(Tt(i.POLYGON_OFFSET_FILL),(C!==it||D!==st)&&(i.polygonOffset(it,st),C=it,D=st)):Mt(i.POLYGON_OFFSET_FILL)}function j(P){P?Tt(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function J(P){P===void 0&&(P=i.TEXTURE0+V-1),K!==P&&(i.activeTexture(P),K=P)}function Q(P,it,st){st===void 0&&(K===null?st=i.TEXTURE0+V-1:st=K);let St=ot[st];St===void 0&&(St={type:void 0,texture:void 0},ot[st]=St),(St.type!==P||St.texture!==it)&&(K!==st&&(i.activeTexture(st),K=st),i.bindTexture(P,it||Et[P]),St.type=P,St.texture=it)}function mt(){let P=ot[K];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function at(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ct(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function bt(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Nt(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Wt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Bt(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function At(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function vt(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ht(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Lt(P){rt.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),rt.copy(P))}function Vt(P){ft.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),ft.copy(P))}function te(P,it){let st=u.get(it);st===void 0&&(st=new WeakMap,u.set(it,st));let St=st.get(P);St===void 0&&(St=i.getUniformBlockIndex(it,P.name),st.set(P,St))}function Ft(P,it){let St=u.get(it).get(P);h.get(it)!==St&&(i.uniformBlockBinding(it,St,P.__bindingPointIndex),h.set(it,St))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},K=null,ot={},m={},g=new WeakMap,v=[],p=null,d=!1,M=null,x=null,T=null,R=null,E=null,A=null,X=null,_=new Ht(0,0,0),w=0,N=!1,q=null,tt=null,L=null,C=null,D=null,rt.set(0,0,i.canvas.width,i.canvas.height),ft.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Tt,disable:Mt,bindFramebuffer:zt,drawBuffers:U,useProgram:xe,setBlending:pt,setMaterial:jt,setFlipSided:Dt,setCullFace:S,setLineWidth:y,setPolygonOffset:k,setScissorTest:j,activeTexture:J,bindTexture:Q,unbindTexture:mt,compressedTexImage2D:at,compressedTexImage3D:ct,texImage2D:vt,texImage3D:ht,updateUBOMapping:te,uniformBlockBinding:Ft,texStorage2D:Bt,texStorage3D:At,texSubImage2D:bt,texSubImage3D:Nt,compressedTexSubImage2D:Z,compressedTexSubImage3D:Wt,scissor:Lt,viewport:Vt,reset:et}}function _m(i,t,e,n,s,r,o){let a=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,y){return m?new OffscreenCanvas(S,y):Ps("canvas")}function v(S,y,k,j){let J=1;if((S.width>j||S.height>j)&&(J=j/Math.max(S.width,S.height)),J<1||y===!0)if(typeof HTMLImageElement!="undefined"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&S instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&S instanceof ImageBitmap){let Q=y?Jr:Math.floor,mt=Q(J*S.width),at=Q(J*S.height);u===void 0&&(u=g(mt,at));let ct=k?g(mt,at):u;return ct.width=mt,ct.height=at,ct.getContext("2d").drawImage(S,0,0,mt,at),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+mt+"x"+at+")."),ct}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function p(S){return Xo(S.width)&&Xo(S.height)}function d(S){return a?!1:S.wrapS!==He||S.wrapT!==He||S.minFilter!==Me&&S.minFilter!==Ne}function M(S,y){return S.generateMipmaps&&y&&S.minFilter!==Me&&S.minFilter!==Ne}function x(S){i.generateMipmap(S)}function T(S,y,k,j,J=!1){if(a===!1)return y;if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let Q=y;if(y===i.RED&&(k===i.FLOAT&&(Q=i.R32F),k===i.HALF_FLOAT&&(Q=i.R16F),k===i.UNSIGNED_BYTE&&(Q=i.R8)),y===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.R8UI),k===i.UNSIGNED_SHORT&&(Q=i.R16UI),k===i.UNSIGNED_INT&&(Q=i.R32UI),k===i.BYTE&&(Q=i.R8I),k===i.SHORT&&(Q=i.R16I),k===i.INT&&(Q=i.R32I)),y===i.RG&&(k===i.FLOAT&&(Q=i.RG32F),k===i.HALF_FLOAT&&(Q=i.RG16F),k===i.UNSIGNED_BYTE&&(Q=i.RG8)),y===i.RGBA){let mt=J?Ts:Xt.getTransfer(j);k===i.FLOAT&&(Q=i.RGBA32F),k===i.HALF_FLOAT&&(Q=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Q=mt===Jt?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function R(S,y,k){return M(S,k)===!0||S.isFramebufferTexture&&S.minFilter!==Me&&S.minFilter!==Ne?Math.log2(Math.max(y.width,y.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?y.mipmaps.length:1}function E(S){return S===Me||S===fo||S===ur?i.NEAREST:i.LINEAR}function A(S){let y=S.target;y.removeEventListener("dispose",A),_(y),y.isVideoTexture&&h.delete(y)}function X(S){let y=S.target;y.removeEventListener("dispose",X),N(y)}function _(S){let y=n.get(S);if(y.__webglInit===void 0)return;let k=S.source,j=f.get(k);if(j){let J=j[y.__cacheKey];J.usedTimes--,J.usedTimes===0&&w(S),Object.keys(j).length===0&&f.delete(k)}n.remove(S)}function w(S){let y=n.get(S);i.deleteTexture(y.__webglTexture);let k=S.source,j=f.get(k);delete j[y.__cacheKey],o.memory.textures--}function N(S){let y=S.texture,k=n.get(S),j=n.get(y);if(j.__webglTexture!==void 0&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(k.__webglFramebuffer[J]))for(let Q=0;Q<k.__webglFramebuffer[J].length;Q++)i.deleteFramebuffer(k.__webglFramebuffer[J][Q]);else i.deleteFramebuffer(k.__webglFramebuffer[J]);k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer[J])}else{if(Array.isArray(k.__webglFramebuffer))for(let J=0;J<k.__webglFramebuffer.length;J++)i.deleteFramebuffer(k.__webglFramebuffer[J]);else i.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&i.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let J=0;J<k.__webglColorRenderbuffer.length;J++)k.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(k.__webglColorRenderbuffer[J]);k.__webglDepthRenderbuffer&&i.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let J=0,Q=y.length;J<Q;J++){let mt=n.get(y[J]);mt.__webglTexture&&(i.deleteTexture(mt.__webglTexture),o.memory.textures--),n.remove(y[J])}n.remove(y),n.remove(S)}let q=0;function tt(){q=0}function L(){let S=q;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),q+=1,S}function C(S){let y=[];return y.push(S.wrapS),y.push(S.wrapT),y.push(S.wrapR||0),y.push(S.magFilter),y.push(S.minFilter),y.push(S.anisotropy),y.push(S.internalFormat),y.push(S.format),y.push(S.type),y.push(S.generateMipmaps),y.push(S.premultiplyAlpha),y.push(S.flipY),y.push(S.unpackAlignment),y.push(S.colorSpace),y.join()}function D(S,y){let k=n.get(S);if(S.isVideoTexture&&jt(S),S.isRenderTargetTexture===!1&&S.version>0&&k.__version!==S.version){let j=S.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(k,S,y);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+y)}function V(S,y){let k=n.get(S);if(S.version>0&&k.__version!==S.version){rt(k,S,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+y)}function G(S,y){let k=n.get(S);if(S.version>0&&k.__version!==S.version){rt(k,S,y);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+y)}function W(S,y){let k=n.get(S);if(S.version>0&&k.__version!==S.version){ft(k,S,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+y)}let Y={[qr]:i.REPEAT,[He]:i.CLAMP_TO_EDGE,[Yr]:i.MIRRORED_REPEAT},K={[Me]:i.NEAREST,[fo]:i.NEAREST_MIPMAP_NEAREST,[ur]:i.NEAREST_MIPMAP_LINEAR,[Ne]:i.LINEAR,[uh]:i.LINEAR_MIPMAP_NEAREST,[Oi]:i.LINEAR_MIPMAP_LINEAR},ot={[wh]:i.NEVER,[Ph]:i.ALWAYS,[Eh]:i.LESS,[Gl]:i.LEQUAL,[Th]:i.EQUAL,[Rh]:i.GEQUAL,[Ah]:i.GREATER,[Ch]:i.NOTEQUAL};function H(S,y,k){if(k?(i.texParameteri(S,i.TEXTURE_WRAP_S,Y[y.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Y[y.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Y[y.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,K[y.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,K[y.minFilter])):(i.texParameteri(S,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(S,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==He||y.wrapT!==He)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(S,i.TEXTURE_MAG_FILTER,E(y.magFilter)),i.texParameteri(S,i.TEXTURE_MIN_FILTER,E(y.minFilter)),y.minFilter!==Me&&y.minFilter!==Ne&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,ot[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let j=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===Me||y.minFilter!==ur&&y.minFilter!==Oi||y.type===bn&&t.has("OES_texture_float_linear")===!1||a===!1&&y.type===ki&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(S,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function $(S,y){let k=!1;S.__webglInit===void 0&&(S.__webglInit=!0,y.addEventListener("dispose",A));let j=y.source,J=f.get(j);J===void 0&&(J={},f.set(j,J));let Q=C(y);if(Q!==S.__cacheKey){J[Q]===void 0&&(J[Q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[Q].usedTimes++;let mt=J[S.__cacheKey];mt!==void 0&&(J[S.__cacheKey].usedTimes--,mt.usedTimes===0&&w(y)),S.__cacheKey=Q,S.__webglTexture=J[Q].texture}return k}function rt(S,y,k){let j=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=i.TEXTURE_3D);let J=$(S,y),Q=y.source;e.bindTexture(j,S.__webglTexture,i.TEXTURE0+k);let mt=n.get(Q);if(Q.version!==mt.__version||J===!0){e.activeTexture(i.TEXTURE0+k);let at=Xt.getPrimaries(Xt.workingColorSpace),ct=y.colorSpace===Ue?null:Xt.getPrimaries(y.colorSpace),bt=y.colorSpace===Ue||at===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let Nt=d(y)&&p(y.image)===!1,Z=v(y.image,Nt,!1,s.maxTextureSize);Z=Dt(y,Z);let Wt=p(Z)||a,Bt=r.convert(y.format,y.colorSpace),At=r.convert(y.type),vt=T(y.internalFormat,Bt,At,y.colorSpace,y.isVideoTexture);H(j,y,Wt);let ht,Lt=y.mipmaps,Vt=a&&y.isVideoTexture!==!0&&vt!==Hl,te=mt.__version===void 0||J===!0,Ft=R(y,Z,Wt);if(y.isDepthTexture)vt=i.DEPTH_COMPONENT,a?y.type===bn?vt=i.DEPTH_COMPONENT32F:y.type===_n?vt=i.DEPTH_COMPONENT24:y.type===zn?vt=i.DEPTH24_STENCIL8:vt=i.DEPTH_COMPONENT16:y.type===bn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Hn&&vt===i.DEPTH_COMPONENT&&y.type!==Aa&&y.type!==_n&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=_n,At=r.convert(y.type)),y.format===yi&&vt===i.DEPTH_COMPONENT&&(vt=i.DEPTH_STENCIL,y.type!==zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=zn,At=r.convert(y.type))),te&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,vt,Z.width,Z.height):e.texImage2D(i.TEXTURE_2D,0,vt,Z.width,Z.height,0,Bt,At,null));else if(y.isDataTexture)if(Lt.length>0&&Wt){Vt&&te&&e.texStorage2D(i.TEXTURE_2D,Ft,vt,Lt[0].width,Lt[0].height);for(let et=0,P=Lt.length;et<P;et++)ht=Lt[et],Vt?e.texSubImage2D(i.TEXTURE_2D,et,0,0,ht.width,ht.height,Bt,At,ht.data):e.texImage2D(i.TEXTURE_2D,et,vt,ht.width,ht.height,0,Bt,At,ht.data);y.generateMipmaps=!1}else Vt?(te&&e.texStorage2D(i.TEXTURE_2D,Ft,vt,Z.width,Z.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Z.width,Z.height,Bt,At,Z.data)):e.texImage2D(i.TEXTURE_2D,0,vt,Z.width,Z.height,0,Bt,At,Z.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Vt&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,vt,Lt[0].width,Lt[0].height,Z.depth);for(let et=0,P=Lt.length;et<P;et++)ht=Lt[et],y.format!==Ve?Bt!==null?Vt?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,Z.depth,Bt,ht.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,vt,ht.width,ht.height,Z.depth,0,ht.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ht.width,ht.height,Z.depth,Bt,At,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,vt,ht.width,ht.height,Z.depth,0,Bt,At,ht.data)}else{Vt&&te&&e.texStorage2D(i.TEXTURE_2D,Ft,vt,Lt[0].width,Lt[0].height);for(let et=0,P=Lt.length;et<P;et++)ht=Lt[et],y.format!==Ve?Bt!==null?Vt?e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,ht.width,ht.height,Bt,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,et,vt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?e.texSubImage2D(i.TEXTURE_2D,et,0,0,ht.width,ht.height,Bt,At,ht.data):e.texImage2D(i.TEXTURE_2D,et,vt,ht.width,ht.height,0,Bt,At,ht.data)}else if(y.isDataArrayTexture)Vt?(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,vt,Z.width,Z.height,Z.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,Bt,At,Z.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,Z.width,Z.height,Z.depth,0,Bt,At,Z.data);else if(y.isData3DTexture)Vt?(te&&e.texStorage3D(i.TEXTURE_3D,Ft,vt,Z.width,Z.height,Z.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,Bt,At,Z.data)):e.texImage3D(i.TEXTURE_3D,0,vt,Z.width,Z.height,Z.depth,0,Bt,At,Z.data);else if(y.isFramebufferTexture){if(te)if(Vt)e.texStorage2D(i.TEXTURE_2D,Ft,vt,Z.width,Z.height);else{let et=Z.width,P=Z.height;for(let it=0;it<Ft;it++)e.texImage2D(i.TEXTURE_2D,it,vt,et,P,0,Bt,At,null),et>>=1,P>>=1}}else if(Lt.length>0&&Wt){Vt&&te&&e.texStorage2D(i.TEXTURE_2D,Ft,vt,Lt[0].width,Lt[0].height);for(let et=0,P=Lt.length;et<P;et++)ht=Lt[et],Vt?e.texSubImage2D(i.TEXTURE_2D,et,0,0,Bt,At,ht):e.texImage2D(i.TEXTURE_2D,et,vt,Bt,At,ht);y.generateMipmaps=!1}else Vt?(te&&e.texStorage2D(i.TEXTURE_2D,Ft,vt,Z.width,Z.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Bt,At,Z)):e.texImage2D(i.TEXTURE_2D,0,vt,Bt,At,Z);M(y,Wt)&&x(j),mt.__version=Q.version,y.onUpdate&&y.onUpdate(y)}S.__version=y.version}function ft(S,y,k){if(y.image.length!==6)return;let j=$(S,y),J=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+k);let Q=n.get(J);if(J.version!==Q.__version||j===!0){e.activeTexture(i.TEXTURE0+k);let mt=Xt.getPrimaries(Xt.workingColorSpace),at=y.colorSpace===Ue?null:Xt.getPrimaries(y.colorSpace),ct=y.colorSpace===Ue||mt===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);let bt=y.isCompressedTexture||y.image[0].isCompressedTexture,Nt=y.image[0]&&y.image[0].isDataTexture,Z=[];for(let et=0;et<6;et++)!bt&&!Nt?Z[et]=v(y.image[et],!1,!0,s.maxCubemapSize):Z[et]=Nt?y.image[et].image:y.image[et],Z[et]=Dt(y,Z[et]);let Wt=Z[0],Bt=p(Wt)||a,At=r.convert(y.format,y.colorSpace),vt=r.convert(y.type),ht=T(y.internalFormat,At,vt,y.colorSpace),Lt=a&&y.isVideoTexture!==!0,Vt=Q.__version===void 0||j===!0,te=R(y,Wt,Bt);H(i.TEXTURE_CUBE_MAP,y,Bt);let Ft;if(bt){Lt&&Vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,te,ht,Wt.width,Wt.height);for(let et=0;et<6;et++){Ft=Z[et].mipmaps;for(let P=0;P<Ft.length;P++){let it=Ft[P];y.format!==Ve?At!==null?Lt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,0,0,it.width,it.height,At,it.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,ht,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,0,0,it.width,it.height,At,vt,it.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,ht,it.width,it.height,0,At,vt,it.data)}}}else{Ft=y.mipmaps,Lt&&Vt&&(Ft.length>0&&te++,e.texStorage2D(i.TEXTURE_CUBE_MAP,te,ht,Z[0].width,Z[0].height));for(let et=0;et<6;et++)if(Nt){Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Z[et].width,Z[et].height,At,vt,Z[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,ht,Z[et].width,Z[et].height,0,At,vt,Z[et].data);for(let P=0;P<Ft.length;P++){let st=Ft[P].image[et].image;Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,0,0,st.width,st.height,At,vt,st.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,ht,st.width,st.height,0,At,vt,st.data)}}else{Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,At,vt,Z[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,ht,At,vt,Z[et]);for(let P=0;P<Ft.length;P++){let it=Ft[P];Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,0,0,At,vt,it.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,ht,At,vt,it.image[et])}}}M(y,Bt)&&x(i.TEXTURE_CUBE_MAP),Q.__version=J.version,y.onUpdate&&y.onUpdate(y)}S.__version=y.version}function dt(S,y,k,j,J,Q){let mt=r.convert(k.format,k.colorSpace),at=r.convert(k.type),ct=T(k.internalFormat,mt,at,k.colorSpace);if(!n.get(y).__hasExternalTextures){let Nt=Math.max(1,y.width>>Q),Z=Math.max(1,y.height>>Q);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,Q,ct,Nt,Z,y.depth,0,mt,at,null):e.texImage2D(J,Q,ct,Nt,Z,0,mt,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),pt(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,J,n.get(k).__webglTexture,0,Ct(y)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,J,n.get(k).__webglTexture,Q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Et(S,y,k){if(i.bindRenderbuffer(i.RENDERBUFFER,S),y.depthBuffer&&!y.stencilBuffer){let j=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(k||pt(y)){let J=y.depthTexture;J&&J.isDepthTexture&&(J.type===bn?j=i.DEPTH_COMPONENT32F:J.type===_n&&(j=i.DEPTH_COMPONENT24));let Q=Ct(y);pt(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,j,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,j,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,j,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,S)}else if(y.depthBuffer&&y.stencilBuffer){let j=Ct(y);k&&pt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,j,i.DEPTH24_STENCIL8,y.width,y.height):pt(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,S)}else{let j=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let J=0;J<j.length;J++){let Q=j[J],mt=r.convert(Q.format,Q.colorSpace),at=r.convert(Q.type),ct=T(Q.internalFormat,mt,at,Q.colorSpace),bt=Ct(y);k&&pt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,ct,y.width,y.height):pt(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,ct,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ct,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Tt(S,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),D(y.depthTexture,0);let j=n.get(y.depthTexture).__webglTexture,J=Ct(y);if(y.depthTexture.format===Hn)pt(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(y.depthTexture.format===yi)pt(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Mt(S){let y=n.get(S),k=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!y.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Tt(y.__webglFramebuffer,S)}else if(k){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]=i.createRenderbuffer(),Et(y.__webglDepthbuffer[j],S,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Et(y.__webglDepthbuffer,S,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(S,y,k){let j=n.get(S);y!==void 0&&dt(j.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Mt(S)}function U(S){let y=S.texture,k=n.get(S),j=n.get(y);S.addEventListener("dispose",X),S.isWebGLMultipleRenderTargets!==!0&&(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=y.version,o.memory.textures++);let J=S.isWebGLCubeRenderTarget===!0,Q=S.isWebGLMultipleRenderTargets===!0,mt=p(S)||a;if(J){k.__webglFramebuffer=[];for(let at=0;at<6;at++)if(a&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[at]=[];for(let ct=0;ct<y.mipmaps.length;ct++)k.__webglFramebuffer[at][ct]=i.createFramebuffer()}else k.__webglFramebuffer[at]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let at=0;at<y.mipmaps.length;at++)k.__webglFramebuffer[at]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Q)if(s.drawBuffers){let at=S.texture;for(let ct=0,bt=at.length;ct<bt;ct++){let Nt=n.get(at[ct]);Nt.__webglTexture===void 0&&(Nt.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&S.samples>0&&pt(S)===!1){let at=Q?y:[y];k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ct=0;ct<at.length;ct++){let bt=at[ct];k.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[ct]);let Nt=r.convert(bt.format,bt.colorSpace),Z=r.convert(bt.type),Wt=T(bt.internalFormat,Nt,Z,bt.colorSpace,S.isXRRenderTarget===!0),Bt=Ct(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,Wt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,k.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Et(k.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),H(i.TEXTURE_CUBE_MAP,y,mt);for(let at=0;at<6;at++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let ct=0;ct<y.mipmaps.length;ct++)dt(k.__webglFramebuffer[at][ct],S,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,ct);else dt(k.__webglFramebuffer[at],S,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);M(y,mt)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Q){let at=S.texture;for(let ct=0,bt=at.length;ct<bt;ct++){let Nt=at[ct],Z=n.get(Nt);e.bindTexture(i.TEXTURE_2D,Z.__webglTexture),H(i.TEXTURE_2D,Nt,mt),dt(k.__webglFramebuffer,S,Nt,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),M(Nt,mt)&&x(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(a?at=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(at,j.__webglTexture),H(at,y,mt),a&&y.mipmaps&&y.mipmaps.length>0)for(let ct=0;ct<y.mipmaps.length;ct++)dt(k.__webglFramebuffer[ct],S,y,i.COLOR_ATTACHMENT0,at,ct);else dt(k.__webglFramebuffer,S,y,i.COLOR_ATTACHMENT0,at,0);M(y,mt)&&x(at),e.unbindTexture()}S.depthBuffer&&Mt(S)}function xe(S){let y=p(S)||a,k=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let j=0,J=k.length;j<J;j++){let Q=k[j];if(M(Q,y)){let mt=S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,at=n.get(Q).__webglTexture;e.bindTexture(mt,at),x(mt),e.unbindTexture()}}}function xt(S){if(a&&S.samples>0&&pt(S)===!1){let y=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],k=S.width,j=S.height,J=i.COLOR_BUFFER_BIT,Q=[],mt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=n.get(S),ct=S.isWebGLMultipleRenderTargets===!0;if(ct)for(let bt=0;bt<y.length;bt++)e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,at.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglFramebuffer);for(let bt=0;bt<y.length;bt++){Q.push(i.COLOR_ATTACHMENT0+bt),S.depthBuffer&&Q.push(mt);let Nt=at.__ignoreDepthValues!==void 0?at.__ignoreDepthValues:!1;if(Nt===!1&&(S.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ct&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,at.__webglColorRenderbuffer[bt]),Nt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[mt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[mt])),ct){let Z=n.get(y[bt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Z,0)}i.blitFramebuffer(0,0,k,j,0,0,k,j,J,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let bt=0;bt<y.length;bt++){e.bindFramebuffer(i.FRAMEBUFFER,at.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.RENDERBUFFER,at.__webglColorRenderbuffer[bt]);let Nt=n.get(y[bt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,at.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+bt,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,at.__webglMultisampledFramebuffer)}}function Ct(S){return Math.min(s.maxSamples,S.samples)}function pt(S){let y=n.get(S);return a&&S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function jt(S){let y=o.render.frame;h.get(S)!==y&&(h.set(S,y),S.update())}function Dt(S,y){let k=S.colorSpace,j=S.format,J=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===$r||k!==hn&&k!==Ue&&(Xt.getTransfer(k)===Jt?a===!1?t.has("EXT_sRGB")===!0&&j===Ve?(S.format=$r,S.minFilter=Ne,S.generateMipmaps=!1):y=Ls.sRGBToLinear(y):(j!==Ve||J!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),y}this.allocateTextureUnit=L,this.resetTextureUnits=tt,this.setTexture2D=D,this.setTexture2DArray=V,this.setTexture3D=G,this.setTextureCube=W,this.rebindTextures=zt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=pt}function bm(i,t,e){let n=e.isWebGL2;function s(r,o=Ue){let a,l=Xt.getTransfer(o);if(r===En)return i.UNSIGNED_BYTE;if(r===Fl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Ol)return i.UNSIGNED_SHORT_5_5_5_1;if(r===dh)return i.BYTE;if(r===fh)return i.SHORT;if(r===Aa)return i.UNSIGNED_SHORT;if(r===Ul)return i.INT;if(r===_n)return i.UNSIGNED_INT;if(r===bn)return i.FLOAT;if(r===ki)return n?i.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===ph)return i.ALPHA;if(r===Ve)return i.RGBA;if(r===mh)return i.LUMINANCE;if(r===gh)return i.LUMINANCE_ALPHA;if(r===Hn)return i.DEPTH_COMPONENT;if(r===yi)return i.DEPTH_STENCIL;if(r===$r)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===vh)return i.RED;if(r===kl)return i.RED_INTEGER;if(r===xh)return i.RG;if(r===Bl)return i.RG_INTEGER;if(r===zl)return i.RGBA_INTEGER;if(r===dr||r===fr||r===pr||r===mr)if(l===Jt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===dr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===fr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===pr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===mr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===dr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===fr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===pr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===mr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===po||r===mo||r===go||r===vo)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===po)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===mo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===go)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===vo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Hl)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===xo||r===yo)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===xo)return l===Jt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===yo)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===_o||r===bo||r===Mo||r===So||r===wo||r===Eo||r===To||r===Ao||r===Co||r===Ro||r===Po||r===Lo||r===Io||r===Do)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===_o)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===bo)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Mo)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===So)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===wo)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Eo)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===To)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ao)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Co)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ro)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Po)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Lo)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Io)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Do)return l===Jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===gr||r===No||r===Uo)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===gr)return l===Jt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===No)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Uo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===yh||r===Fo||r===Oo||r===ko)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===gr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Fo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Oo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ko)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===zn?n?i.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var ua=class extends Se{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},pi=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},Mm={type:"move"},Fi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let v of t.hand.values()){let p=e.getJointPose(v,n),d=this._getHandJoint(c,v);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new pi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},da=class extends An{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,m=null,g=null,v=e.getContextAttributes(),p=null,d=null,M=[],x=[],T=new qt,R=null,E=new Se;E.layers.enable(1),E.viewport=new ue;let A=new Se;A.layers.enable(2),A.viewport=new ue;let X=[E,A],_=new ua;_.layers.enable(1),_.layers.enable(2);let w=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let $=M[H];return $===void 0&&($=new Fi,M[H]=$),$.getTargetRaySpace()},this.getControllerGrip=function(H){let $=M[H];return $===void 0&&($=new Fi,M[H]=$),$.getGripSpace()},this.getHand=function(H){let $=M[H];return $===void 0&&($=new Fi,M[H]=$),$.getHandSpace()};function q(H){let $=x.indexOf(H.inputSource);if($===-1)return;let rt=M[$];rt!==void 0&&(rt.update(H.inputSource,H.frame,c||o),rt.dispatchEvent({type:H.type,data:H.inputSource}))}function tt(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",tt),s.removeEventListener("inputsourceschange",L);for(let H=0;H<M.length;H++){let $=x[H];$!==null&&(x[H]=null,M[H].disconnect($))}w=null,N=null,t.setRenderTarget(p),m=null,f=null,u=null,s=null,d=null,ot.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",tt),s.addEventListener("inputsourceschange",L),v.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let $={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,$),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),d=new un(m.framebufferWidth,m.framebufferHeight,{format:Ve,type:En,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let $=null,rt=null,ft=null;v.depth&&(ft=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=v.stencil?yi:Hn,rt=v.stencil?zn:_n);let dt={colorFormat:e.RGBA8,depthFormat:ft,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(dt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),d=new un(f.textureWidth,f.textureHeight,{format:Ve,type:En,depthTexture:new Ws(f.textureWidth,f.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});let Et=t.properties.get(d);Et.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ot.setContext(s),ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(H){for(let $=0;$<H.removed.length;$++){let rt=H.removed[$],ft=x.indexOf(rt);ft>=0&&(x[ft]=null,M[ft].disconnect(rt))}for(let $=0;$<H.added.length;$++){let rt=H.added[$],ft=x.indexOf(rt);if(ft===-1){for(let Et=0;Et<M.length;Et++)if(Et>=x.length){x.push(rt),ft=Et;break}else if(x[Et]===null){x[Et]=rt,ft=Et;break}if(ft===-1)break}let dt=M[ft];dt&&dt.connect(rt)}}let C=new O,D=new O;function V(H,$,rt){C.setFromMatrixPosition($.matrixWorld),D.setFromMatrixPosition(rt.matrixWorld);let ft=C.distanceTo(D),dt=$.projectionMatrix.elements,Et=rt.projectionMatrix.elements,Tt=dt[14]/(dt[10]-1),Mt=dt[14]/(dt[10]+1),zt=(dt[9]+1)/dt[5],U=(dt[9]-1)/dt[5],xe=(dt[8]-1)/dt[0],xt=(Et[8]+1)/Et[0],Ct=Tt*xe,pt=Tt*xt,jt=ft/(-xe+xt),Dt=jt*-xe;$.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Dt),H.translateZ(jt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let S=Tt+jt,y=Mt+jt,k=Ct-Dt,j=pt+(ft-Dt),J=zt*Mt/y*S,Q=U*Mt/y*S;H.projectionMatrix.makePerspective(k,j,J,Q,S,y),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function G(H,$){$===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices($.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;_.near=A.near=E.near=H.near,_.far=A.far=E.far=H.far,(w!==_.near||N!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,N=_.far);let $=H.parent,rt=_.cameras;G(_,$);for(let ft=0;ft<rt.length;ft++)G(rt[ft],$);rt.length===2?V(_,E,A):_.projectionMatrix.copy(E.projectionMatrix),W(H,_,$)};function W(H,$,rt){rt===null?H.matrix.copy($.matrixWorld):(H.matrix.copy(rt.matrixWorld),H.matrix.invert(),H.matrix.multiply($.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Zr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(H){l=H,f!==null&&(f.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)};let Y=null;function K(H,$){if(h=$.getViewerPose(c||o),g=$,h!==null){let rt=h.views;m!==null&&(t.setRenderTargetFramebuffer(d,m.framebuffer),t.setRenderTarget(d));let ft=!1;rt.length!==_.cameras.length&&(_.cameras.length=0,ft=!0);for(let dt=0;dt<rt.length;dt++){let Et=rt[dt],Tt=null;if(m!==null)Tt=m.getViewport(Et);else{let zt=u.getViewSubImage(f,Et);Tt=zt.viewport,dt===0&&(t.setRenderTargetTextures(d,zt.colorTexture,f.ignoreDepthValues?void 0:zt.depthStencilTexture),t.setRenderTarget(d))}let Mt=X[dt];Mt===void 0&&(Mt=new Se,Mt.layers.enable(dt),Mt.viewport=new ue,X[dt]=Mt),Mt.matrix.fromArray(Et.transform.matrix),Mt.matrix.decompose(Mt.position,Mt.quaternion,Mt.scale),Mt.projectionMatrix.fromArray(Et.projectionMatrix),Mt.projectionMatrixInverse.copy(Mt.projectionMatrix).invert(),Mt.viewport.set(Tt.x,Tt.y,Tt.width,Tt.height),dt===0&&(_.matrix.copy(Mt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ft===!0&&_.cameras.push(Mt)}}for(let rt=0;rt<M.length;rt++){let ft=x[rt],dt=M[rt];ft!==null&&dt!==void 0&&dt.update(ft,$,c||o)}Y&&Y(H,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let ot=new Yl;ot.setAnimationLoop(K),this.setAnimationLoop=function(H){Y=H},this.dispose=function(){}}};function Sm(i,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,ql(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,M,x,T){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,T)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),v(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?l(p,d,M,x):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Ce&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Ce&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let M=t.get(d).envMap;if(M&&(p.envMap.value=M,p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;let x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*x,e(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,M,x){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*M,p.scale.value=x*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),t.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,M){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ce&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function v(p,d){let M=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function wm(i,t,e,n){let s={},r={},o=[],a=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){let T=x.program;n.uniformBlockBinding(M,T)}function c(M,x){let T=s[M.id];T===void 0&&(g(M),T=h(M),s[M.id]=T,M.addEventListener("dispose",p));let R=x.program;n.updateUBOMapping(M,R);let E=t.render.frame;r[M.id]!==E&&(f(M),r[M.id]=E)}function h(M){let x=u();M.__bindingPointIndex=x;let T=i.createBuffer(),R=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,R,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,T),T}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){let x=s[M.id],T=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let E=0,A=T.length;E<A;E++){let X=Array.isArray(T[E])?T[E]:[T[E]];for(let _=0,w=X.length;_<w;_++){let N=X[_];if(m(N,E,_,R)===!0){let q=N.__offset,tt=Array.isArray(N.value)?N.value:[N.value],L=0;for(let C=0;C<tt.length;C++){let D=tt[C],V=v(D);typeof D=="number"||typeof D=="boolean"?(N.__data[0]=D,i.bufferSubData(i.UNIFORM_BUFFER,q+L,N.__data)):D.isMatrix3?(N.__data[0]=D.elements[0],N.__data[1]=D.elements[1],N.__data[2]=D.elements[2],N.__data[3]=0,N.__data[4]=D.elements[3],N.__data[5]=D.elements[4],N.__data[6]=D.elements[5],N.__data[7]=0,N.__data[8]=D.elements[6],N.__data[9]=D.elements[7],N.__data[10]=D.elements[8],N.__data[11]=0):(D.toArray(N.__data,L),L+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,q,N.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(M,x,T,R){let E=M.value,A=x+"_"+T;if(R[A]===void 0)return typeof E=="number"||typeof E=="boolean"?R[A]=E:R[A]=E.clone(),!0;{let X=R[A];if(typeof E=="number"||typeof E=="boolean"){if(X!==E)return R[A]=E,!0}else if(X.equals(E)===!1)return X.copy(E),!0}return!1}function g(M){let x=M.uniforms,T=0,R=16;for(let A=0,X=x.length;A<X;A++){let _=Array.isArray(x[A])?x[A]:[x[A]];for(let w=0,N=_.length;w<N;w++){let q=_[w],tt=Array.isArray(q.value)?q.value:[q.value];for(let L=0,C=tt.length;L<C;L++){let D=tt[L],V=v(D),G=T%R;G!==0&&R-G<V.boundary&&(T+=R-G),q.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=T,T+=V.storage}}}let E=T%R;return E>0&&(T+=R-E),M.__size=T,M.__cache={},this}function v(M){let x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function p(M){let x=M.target;x.removeEventListener("dispose",p);let T=o.indexOf(x.__bindingPointIndex);o.splice(T,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function d(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}var zi=class{constructor(t={}){let{canvas:e=Ih(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;let m=new Uint32Array(4),g=new Int32Array(4),v=null,p=null,d=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=he,this._useLegacyLights=!1,this.toneMapping=wn,this.toneMappingExposure=1;let x=this,T=!1,R=0,E=0,A=null,X=-1,_=null,w=new ue,N=new ue,q=null,tt=new Ht(0),L=0,C=e.width,D=e.height,V=1,G=null,W=null,Y=new ue(0,0,C,D),K=new ue(0,0,C,D),ot=!1,H=new Vs,$=!1,rt=!1,ft=null,dt=new de,Et=new qt,Tt=new O,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function zt(){return A===null?V:1}let U=n;function xe(b,I){for(let B=0;B<b.length;B++){let z=b[B],F=e.getContext(z,I);if(F!==null)return F}return null}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ta}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",P,!1),e.addEventListener("webglcontextcreationerror",it,!1),U===null){let I=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&I.shift(),U=xe(I,b),U===null)throw xe(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let xt,Ct,pt,jt,Dt,S,y,k,j,J,Q,mt,at,ct,bt,Nt,Z,Wt,Bt,At,vt,ht,Lt,Vt;function te(){xt=new Gf(U),Ct=new Of(U,xt,t),xt.init(Ct),ht=new bm(U,xt,Ct),pt=new ym(U,xt,Ct),jt=new qf(U),Dt=new om,S=new _m(U,xt,pt,Dt,Ct,ht,jt),y=new Bf(x),k=new Vf(x),j=new Qh(U,Ct),Lt=new Uf(U,xt,j,Ct),J=new Wf(U,j,jt,Lt),Q=new Jf(U,J,j,jt),Bt=new Zf(U,Ct,S),Nt=new kf(Dt),mt=new am(x,y,k,xt,Ct,Lt,Nt),at=new Sm(x,Dt),ct=new cm,bt=new mm(xt,Ct),Wt=new Nf(x,y,k,pt,Q,f,l),Z=new xm(x,Q,Ct),Vt=new wm(U,jt,Ct,pt),At=new Ff(U,xt,jt,Ct),vt=new Xf(U,xt,jt,Ct),jt.programs=mt.programs,x.capabilities=Ct,x.extensions=xt,x.properties=Dt,x.renderLists=ct,x.shadowMap=Z,x.state=pt,x.info=jt}te();let Ft=new da(x,U);this.xr=Ft,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let b=xt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=xt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(b){b!==void 0&&(V=b,this.setSize(C,D,!1))},this.getSize=function(b){return b.set(C,D)},this.setSize=function(b,I,B=!0){if(Ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}C=b,D=I,e.width=Math.floor(b*V),e.height=Math.floor(I*V),B===!0&&(e.style.width=b+"px",e.style.height=I+"px"),this.setViewport(0,0,b,I)},this.getDrawingBufferSize=function(b){return b.set(C*V,D*V).floor()},this.setDrawingBufferSize=function(b,I,B){C=b,D=I,V=B,e.width=Math.floor(b*B),e.height=Math.floor(I*B),this.setViewport(0,0,b,I)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(Y)},this.setViewport=function(b,I,B,z){b.isVector4?Y.set(b.x,b.y,b.z,b.w):Y.set(b,I,B,z),pt.viewport(w.copy(Y).multiplyScalar(V).floor())},this.getScissor=function(b){return b.copy(K)},this.setScissor=function(b,I,B,z){b.isVector4?K.set(b.x,b.y,b.z,b.w):K.set(b,I,B,z),pt.scissor(N.copy(K).multiplyScalar(V).floor())},this.getScissorTest=function(){return ot},this.setScissorTest=function(b){pt.setScissorTest(ot=b)},this.setOpaqueSort=function(b){G=b},this.setTransparentSort=function(b){W=b},this.getClearColor=function(b){return b.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor.apply(Wt,arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha.apply(Wt,arguments)},this.clear=function(b=!0,I=!0,B=!0){let z=0;if(b){let F=!1;if(A!==null){let lt=A.texture.format;F=lt===zl||lt===Bl||lt===kl}if(F){let lt=A.texture.type,gt=lt===En||lt===_n||lt===Aa||lt===zn||lt===Fl||lt===Ol,_t=Wt.getClearColor(),wt=Wt.getClearAlpha(),Ut=_t.r,Rt=_t.g,Pt=_t.b;gt?(m[0]=Ut,m[1]=Rt,m[2]=Pt,m[3]=wt,U.clearBufferuiv(U.COLOR,0,m)):(g[0]=Ut,g[1]=Rt,g[2]=Pt,g[3]=wt,U.clearBufferiv(U.COLOR,0,g))}else z|=U.COLOR_BUFFER_BIT}I&&(z|=U.DEPTH_BUFFER_BIT),B&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",P,!1),e.removeEventListener("webglcontextcreationerror",it,!1),ct.dispose(),bt.dispose(),Dt.dispose(),y.dispose(),k.dispose(),Q.dispose(),Lt.dispose(),Vt.dispose(),mt.dispose(),Ft.dispose(),Ft.removeEventListener("sessionstart",ye),Ft.removeEventListener("sessionend",Zt),ft&&(ft.dispose(),ft=null),_e.stop()};function et(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let b=jt.autoReset,I=Z.enabled,B=Z.autoUpdate,z=Z.needsUpdate,F=Z.type;te(),jt.autoReset=b,Z.enabled=I,Z.autoUpdate=B,Z.needsUpdate=z,Z.type=F}function it(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function st(b){let I=b.target;I.removeEventListener("dispose",st),St(I)}function St(b){yt(b),Dt.remove(b)}function yt(b){let I=Dt.get(b).programs;I!==void 0&&(I.forEach(function(B){mt.releaseProgram(B)}),b.isShaderMaterial&&mt.releaseShaderCache(b))}this.renderBufferDirect=function(b,I,B,z,F,lt){I===null&&(I=Mt);let gt=F.isMesh&&F.matrixWorld.determinant()<0,_t=cc(b,I,B,z,F);pt.setMaterial(z,gt);let wt=B.index,Ut=1;if(z.wireframe===!0){if(wt=J.getWireframeAttribute(B),wt===void 0)return;Ut=2}let Rt=B.drawRange,Pt=B.attributes.position,ne=Rt.start*Ut,Re=(Rt.start+Rt.count)*Ut;lt!==null&&(ne=Math.max(ne,lt.start*Ut),Re=Math.min(Re,(lt.start+lt.count)*Ut)),wt!==null?(ne=Math.max(ne,0),Re=Math.min(Re,wt.count)):Pt!=null&&(ne=Math.max(ne,0),Re=Math.min(Re,Pt.count));let le=Re-ne;if(le<0||le===1/0)return;Lt.setup(F,z,_t,B,wt);let Ke,Qt=At;if(wt!==null&&(Ke=j.get(wt),Qt=vt,Qt.setIndex(Ke)),F.isMesh)z.wireframe===!0?(pt.setLineWidth(z.wireframeLinewidth*zt()),Qt.setMode(U.LINES)):Qt.setMode(U.TRIANGLES);else if(F.isLine){let Ot=z.linewidth;Ot===void 0&&(Ot=1),pt.setLineWidth(Ot*zt()),F.isLineSegments?Qt.setMode(U.LINES):F.isLineLoop?Qt.setMode(U.LINE_LOOP):Qt.setMode(U.LINE_STRIP)}else F.isPoints?Qt.setMode(U.POINTS):F.isSprite&&Qt.setMode(U.TRIANGLES);if(F.isBatchedMesh)Qt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)Qt.renderInstances(ne,le,F.count);else if(B.isInstancedBufferGeometry){let Ot=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ir=Math.min(B.instanceCount,Ot);Qt.renderInstances(ne,le,ir)}else Qt.render(ne,le)};function Yt(b,I,B){b.transparent===!0&&b.side===on&&b.forceSinglePass===!1?(b.side=Ce,b.needsUpdate=!0,Wi(b,I,B),b.side=Tn,b.needsUpdate=!0,Wi(b,I,B),b.side=on):Wi(b,I,B)}this.compile=function(b,I,B=null){B===null&&(B=b),p=bt.get(B),p.init(),M.push(p),B.traverseVisible(function(F){F.isLight&&F.layers.test(I.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),b!==B&&b.traverseVisible(function(F){F.isLight&&F.layers.test(I.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights(x._useLegacyLights);let z=new Set;return b.traverse(function(F){let lt=F.material;if(lt)if(Array.isArray(lt))for(let gt=0;gt<lt.length;gt++){let _t=lt[gt];Yt(_t,B,F),z.add(_t)}else Yt(lt,B,F),z.add(lt)}),M.pop(),p=null,z},this.compileAsync=function(b,I,B=null){let z=this.compile(b,I,B);return new Promise(F=>{function lt(){if(z.forEach(function(gt){Dt.get(gt).currentProgram.isReady()&&z.delete(gt)}),z.size===0){F(b);return}setTimeout(lt,10)}xt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let $t=null;function oe(b){$t&&$t(b)}function ye(){_e.stop()}function Zt(){_e.start()}let _e=new Yl;_e.setAnimationLoop(oe),typeof self!="undefined"&&_e.setContext(self),this.setAnimationLoop=function(b){$t=b,Ft.setAnimationLoop(b),b===null?_e.stop():_e.start()},Ft.addEventListener("sessionstart",ye),Ft.addEventListener("sessionend",Zt),this.render=function(b,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ft.enabled===!0&&Ft.isPresenting===!0&&(Ft.cameraAutoUpdate===!0&&Ft.updateCamera(I),I=Ft.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,I,A),p=bt.get(b,M.length),p.init(),M.push(p),dt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),H.setFromProjectionMatrix(dt),rt=this.localClippingEnabled,$=Nt.init(this.clippingPlanes,rt),v=ct.get(b,d.length),v.init(),d.push(v),qe(b,I,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(G,W),this.info.render.frame++,$===!0&&Nt.beginShadows();let B=p.state.shadowsArray;if(Z.render(B,b,I),$===!0&&Nt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Wt.render(v,b),p.setupLights(x._useLegacyLights),I.isArrayCamera){let z=I.cameras;for(let F=0,lt=z.length;F<lt;F++){let gt=z[F];Fa(v,b,gt,gt.viewport)}}else Fa(v,b,I);A!==null&&(S.updateMultisampleRenderTarget(A),S.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,I),Lt.resetDefaultState(),X=-1,_=null,M.pop(),M.length>0?p=M[M.length-1]:p=null,d.pop(),d.length>0?v=d[d.length-1]:v=null};function qe(b,I,B,z){if(b.visible===!1)return;if(b.layers.test(I.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(I);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||H.intersectsSprite(b)){z&&Tt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(dt);let gt=Q.update(b),_t=b.material;_t.visible&&v.push(b,gt,_t,B,Tt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||H.intersectsObject(b))){let gt=Q.update(b),_t=b.material;if(z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Tt.copy(b.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Tt.copy(gt.boundingSphere.center)),Tt.applyMatrix4(b.matrixWorld).applyMatrix4(dt)),Array.isArray(_t)){let wt=gt.groups;for(let Ut=0,Rt=wt.length;Ut<Rt;Ut++){let Pt=wt[Ut],ne=_t[Pt.materialIndex];ne&&ne.visible&&v.push(b,gt,ne,B,Tt.z,Pt)}}else _t.visible&&v.push(b,gt,_t,B,Tt.z,null)}}let lt=b.children;for(let gt=0,_t=lt.length;gt<_t;gt++)qe(lt[gt],I,B,z)}function Fa(b,I,B,z){let F=b.opaque,lt=b.transmissive,gt=b.transparent;p.setupLightsView(B),$===!0&&Nt.setGlobalState(x.clippingPlanes,B),lt.length>0&&lc(F,lt,I,B),z&&pt.viewport(w.copy(z)),F.length>0&&Gi(F,I,B),lt.length>0&&Gi(lt,I,B),gt.length>0&&Gi(gt,I,B),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function lc(b,I,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;let lt=Ct.isWebGL2;ft===null&&(ft=new un(1,1,{generateMipmaps:!0,type:xt.has("EXT_color_buffer_half_float")?ki:En,minFilter:Oi,samples:lt?4:0})),x.getDrawingBufferSize(Et),lt?ft.setSize(Et.x,Et.y):ft.setSize(Jr(Et.x),Jr(Et.y));let gt=x.getRenderTarget();x.setRenderTarget(ft),x.getClearColor(tt),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();let _t=x.toneMapping;x.toneMapping=wn,Gi(b,B,z),S.updateMultisampleRenderTarget(ft),S.updateRenderTargetMipmap(ft);let wt=!1;for(let Ut=0,Rt=I.length;Ut<Rt;Ut++){let Pt=I[Ut],ne=Pt.object,Re=Pt.geometry,le=Pt.material,Ke=Pt.group;if(le.side===on&&ne.layers.test(z.layers)){let Qt=le.side;le.side=Ce,le.needsUpdate=!0,Oa(ne,B,z,Re,le,Ke),le.side=Qt,le.needsUpdate=!0,wt=!0}}wt===!0&&(S.updateMultisampleRenderTarget(ft),S.updateRenderTargetMipmap(ft)),x.setRenderTarget(gt),x.setClearColor(tt,L),x.toneMapping=_t}function Gi(b,I,B){let z=I.isScene===!0?I.overrideMaterial:null;for(let F=0,lt=b.length;F<lt;F++){let gt=b[F],_t=gt.object,wt=gt.geometry,Ut=z===null?gt.material:z,Rt=gt.group;_t.layers.test(B.layers)&&Oa(_t,I,B,wt,Ut,Rt)}}function Oa(b,I,B,z,F,lt){b.onBeforeRender(x,I,B,z,F,lt),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(x,I,B,z,b,lt),F.transparent===!0&&F.side===on&&F.forceSinglePass===!1?(F.side=Ce,F.needsUpdate=!0,x.renderBufferDirect(B,I,z,F,b,lt),F.side=Tn,F.needsUpdate=!0,x.renderBufferDirect(B,I,z,F,b,lt),F.side=on):x.renderBufferDirect(B,I,z,F,b,lt),b.onAfterRender(x,I,B,z,F,lt)}function Wi(b,I,B){I.isScene!==!0&&(I=Mt);let z=Dt.get(b),F=p.state.lights,lt=p.state.shadowsArray,gt=F.state.version,_t=mt.getParameters(b,F.state,lt,I,B),wt=mt.getProgramCacheKey(_t),Ut=z.programs;z.environment=b.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(b.isMeshStandardMaterial?k:y).get(b.envMap||z.environment),Ut===void 0&&(b.addEventListener("dispose",st),Ut=new Map,z.programs=Ut);let Rt=Ut.get(wt);if(Rt!==void 0){if(z.currentProgram===Rt&&z.lightsStateVersion===gt)return Ba(b,_t),Rt}else _t.uniforms=mt.getUniforms(b),b.onBuild(B,_t,x),b.onBeforeCompile(_t,x),Rt=mt.acquireProgram(_t,wt),Ut.set(wt,Rt),z.uniforms=_t.uniforms;let Pt=z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pt.clippingPlanes=Nt.uniform),Ba(b,_t),z.needsLights=uc(b),z.lightsStateVersion=gt,z.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),z.currentProgram=Rt,z.uniformsList=null,Rt}function ka(b){if(b.uniformsList===null){let I=b.currentProgram.getUniforms();b.uniformsList=gi.seqWithValue(I.seq,b.uniforms)}return b.uniformsList}function Ba(b,I){let B=Dt.get(b);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function cc(b,I,B,z,F){I.isScene!==!0&&(I=Mt),S.resetTextureUnits();let lt=I.fog,gt=z.isMeshStandardMaterial?I.environment:null,_t=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:hn,wt=(z.isMeshStandardMaterial?k:y).get(z.envMap||gt),Ut=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Rt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Pt=!!B.morphAttributes.position,ne=!!B.morphAttributes.normal,Re=!!B.morphAttributes.color,le=wn;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(le=x.toneMapping);let Ke=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Qt=Ke!==void 0?Ke.length:0,Ot=Dt.get(z),ir=p.state.lights;if($===!0&&(rt===!0||b!==_)){let Ie=b===_&&z.id===X;Nt.setState(z,b,Ie)}let ee=!1;z.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==ir.state.version||Ot.outputColorSpace!==_t||F.isBatchedMesh&&Ot.batching===!1||!F.isBatchedMesh&&Ot.batching===!0||F.isInstancedMesh&&Ot.instancing===!1||!F.isInstancedMesh&&Ot.instancing===!0||F.isSkinnedMesh&&Ot.skinning===!1||!F.isSkinnedMesh&&Ot.skinning===!0||F.isInstancedMesh&&Ot.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ot.instancingColor===!1&&F.instanceColor!==null||Ot.envMap!==wt||z.fog===!0&&Ot.fog!==lt||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==Nt.numPlanes||Ot.numIntersection!==Nt.numIntersection)||Ot.vertexAlphas!==Ut||Ot.vertexTangents!==Rt||Ot.morphTargets!==Pt||Ot.morphNormals!==ne||Ot.morphColors!==Re||Ot.toneMapping!==le||Ct.isWebGL2===!0&&Ot.morphTargetsCount!==Qt)&&(ee=!0):(ee=!0,Ot.__version=z.version);let Ln=Ot.currentProgram;ee===!0&&(Ln=Wi(z,I,F));let za=!1,wi=!1,sr=!1,fe=Ln.getUniforms(),In=Ot.uniforms;if(pt.useProgram(Ln.program)&&(za=!0,wi=!0,sr=!0),z.id!==X&&(X=z.id,wi=!0),za||_!==b){fe.setValue(U,"projectionMatrix",b.projectionMatrix),fe.setValue(U,"viewMatrix",b.matrixWorldInverse);let Ie=fe.map.cameraPosition;Ie!==void 0&&Ie.setValue(U,Tt.setFromMatrixPosition(b.matrixWorld)),Ct.logarithmicDepthBuffer&&fe.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&fe.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),_!==b&&(_=b,wi=!0,sr=!0)}if(F.isSkinnedMesh){fe.setOptional(U,F,"bindMatrix"),fe.setOptional(U,F,"bindMatrixInverse");let Ie=F.skeleton;Ie&&(Ct.floatVertexTextures?(Ie.boneTexture===null&&Ie.computeBoneTexture(),fe.setValue(U,"boneTexture",Ie.boneTexture,S)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(fe.setOptional(U,F,"batchingTexture"),fe.setValue(U,"batchingTexture",F._matricesTexture,S));let rr=B.morphAttributes;if((rr.position!==void 0||rr.normal!==void 0||rr.color!==void 0&&Ct.isWebGL2===!0)&&Bt.update(F,B,Ln),(wi||Ot.receiveShadow!==F.receiveShadow)&&(Ot.receiveShadow=F.receiveShadow,fe.setValue(U,"receiveShadow",F.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(In.envMap.value=wt,In.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),wi&&(fe.setValue(U,"toneMappingExposure",x.toneMappingExposure),Ot.needsLights&&hc(In,sr),lt&&z.fog===!0&&at.refreshFogUniforms(In,lt),at.refreshMaterialUniforms(In,z,V,D,ft),gi.upload(U,ka(Ot),In,S)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(gi.upload(U,ka(Ot),In,S),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&fe.setValue(U,"center",F.center),fe.setValue(U,"modelViewMatrix",F.modelViewMatrix),fe.setValue(U,"normalMatrix",F.normalMatrix),fe.setValue(U,"modelMatrix",F.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let Ie=z.uniformsGroups;for(let ar=0,dc=Ie.length;ar<dc;ar++)if(Ct.isWebGL2){let Ha=Ie[ar];Vt.update(Ha,Ln),Vt.bind(Ha,Ln)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ln}function hc(b,I){b.ambientLightColor.needsUpdate=I,b.lightProbe.needsUpdate=I,b.directionalLights.needsUpdate=I,b.directionalLightShadows.needsUpdate=I,b.pointLights.needsUpdate=I,b.pointLightShadows.needsUpdate=I,b.spotLights.needsUpdate=I,b.spotLightShadows.needsUpdate=I,b.rectAreaLights.needsUpdate=I,b.hemisphereLights.needsUpdate=I}function uc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,I,B){Dt.get(b.texture).__webglTexture=I,Dt.get(b.depthTexture).__webglTexture=B;let z=Dt.get(b);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=B===void 0,z.__autoAllocateDepthBuffer||xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,I){let B=Dt.get(b);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(b,I=0,B=0){A=b,R=I,E=B;let z=!0,F=null,lt=!1,gt=!1;if(b){let wt=Dt.get(b);wt.__useDefaultFramebuffer!==void 0?(pt.bindFramebuffer(U.FRAMEBUFFER,null),z=!1):wt.__webglFramebuffer===void 0?S.setupRenderTarget(b):wt.__hasExternalTextures&&S.rebindTextures(b,Dt.get(b.texture).__webglTexture,Dt.get(b.depthTexture).__webglTexture);let Ut=b.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(gt=!0);let Rt=Dt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Rt[I])?F=Rt[I][B]:F=Rt[I],lt=!0):Ct.isWebGL2&&b.samples>0&&S.useMultisampledRTT(b)===!1?F=Dt.get(b).__webglMultisampledFramebuffer:Array.isArray(Rt)?F=Rt[B]:F=Rt,w.copy(b.viewport),N.copy(b.scissor),q=b.scissorTest}else w.copy(Y).multiplyScalar(V).floor(),N.copy(K).multiplyScalar(V).floor(),q=ot;if(pt.bindFramebuffer(U.FRAMEBUFFER,F)&&Ct.drawBuffers&&z&&pt.drawBuffers(b,F),pt.viewport(w),pt.scissor(N),pt.setScissorTest(q),lt){let wt=Dt.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,wt.__webglTexture,B)}else if(gt){let wt=Dt.get(b.texture),Ut=I||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.__webglTexture,B||0,Ut)}X=-1},this.readRenderTargetPixels=function(b,I,B,z,F,lt,gt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Dt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(_t=_t[gt]),_t){pt.bindFramebuffer(U.FRAMEBUFFER,_t);try{let wt=b.texture,Ut=wt.format,Rt=wt.type;if(Ut!==Ve&&ht.convert(Ut)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Pt=Rt===ki&&(xt.has("EXT_color_buffer_half_float")||Ct.isWebGL2&&xt.has("EXT_color_buffer_float"));if(Rt!==En&&ht.convert(Rt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Rt===bn&&(Ct.isWebGL2||xt.has("OES_texture_float")||xt.has("WEBGL_color_buffer_float")))&&!Pt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=b.width-z&&B>=0&&B<=b.height-F&&U.readPixels(I,B,z,F,ht.convert(Ut),ht.convert(Rt),lt)}finally{let wt=A!==null?Dt.get(A).__webglFramebuffer:null;pt.bindFramebuffer(U.FRAMEBUFFER,wt)}}},this.copyFramebufferToTexture=function(b,I,B=0){let z=Math.pow(2,-B),F=Math.floor(I.image.width*z),lt=Math.floor(I.image.height*z);S.setTexture2D(I,0),U.copyTexSubImage2D(U.TEXTURE_2D,B,0,0,b.x,b.y,F,lt),pt.unbindTexture()},this.copyTextureToTexture=function(b,I,B,z=0){let F=I.image.width,lt=I.image.height,gt=ht.convert(B.format),_t=ht.convert(B.type);S.setTexture2D(B,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment),I.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,z,b.x,b.y,F,lt,gt,_t,I.image.data):I.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,z,b.x,b.y,I.mipmaps[0].width,I.mipmaps[0].height,gt,I.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,z,b.x,b.y,gt,_t,I.image),z===0&&B.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),pt.unbindTexture()},this.copyTextureToTexture3D=function(b,I,B,z,F=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let lt=b.max.x-b.min.x+1,gt=b.max.y-b.min.y+1,_t=b.max.z-b.min.z+1,wt=ht.convert(z.format),Ut=ht.convert(z.type),Rt;if(z.isData3DTexture)S.setTexture3D(z,0),Rt=U.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)S.setTexture2DArray(z,0),Rt=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);let Pt=U.getParameter(U.UNPACK_ROW_LENGTH),ne=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Re=U.getParameter(U.UNPACK_SKIP_PIXELS),le=U.getParameter(U.UNPACK_SKIP_ROWS),Ke=U.getParameter(U.UNPACK_SKIP_IMAGES),Qt=B.isCompressedTexture?B.mipmaps[F]:B.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,Qt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Qt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,b.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,b.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,b.min.z),B.isDataTexture||B.isData3DTexture?U.texSubImage3D(Rt,F,I.x,I.y,I.z,lt,gt,_t,wt,Ut,Qt.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Rt,F,I.x,I.y,I.z,lt,gt,_t,wt,Qt.data)):U.texSubImage3D(Rt,F,I.x,I.y,I.z,lt,gt,_t,wt,Ut,Qt),U.pixelStorei(U.UNPACK_ROW_LENGTH,Pt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ne),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Re),U.pixelStorei(U.UNPACK_SKIP_ROWS,le),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ke),F===0&&z.generateMipmaps&&U.generateMipmap(Rt),pt.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?S.setTextureCube(b,0):b.isData3DTexture?S.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?S.setTexture2DArray(b,0):S.setTexture2D(b,0),pt.unbindTexture()},this.resetState=function(){R=0,E=0,A=null,pt.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Ca?"display-p3":"srgb",e.unpackColorSpace=Xt.workingColorSpace===Zs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===he?Vn:Vl}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Vn?he:hn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},fa=class extends zi{};fa.prototype.isWebGL1Renderer=!0;var Xs=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var pa=class extends Wn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Rl=new de,ma=new Ns,_s=new _i,bs=new O,qs=class extends Fe{constructor(t=new Je,e=new pa){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_s.copy(n.boundingSphere),_s.applyMatrix4(s),_s.radius+=r,t.ray.intersectsSphere(_s)===!1)return;Rl.copy(s).invert(),ma.copy(t.ray).applyMatrix4(Rl);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let f=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=f,v=m;g<v;g++){let p=c.getX(g);bs.fromBufferAttribute(u,p),Pl(bs,p,l,s,t,e,this)}}else{let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=f,v=m;g<v;g++)bs.fromBufferAttribute(u,g),Pl(bs,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Pl(i,t,e,n,s,r,o){let a=ma.distanceSqToPoint(i);if(a<e){let l=new O;ma.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}function Ms(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Em(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Mi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ga=class extends Mi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bo,endingEnd:Bo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case zo:r=t,a=2*e-n;break;case Ho:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case zo:o=t,l=2*n-e;break;case Ho:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,m=this._weightNext,g=(n-e)/(s-e),v=g*g,p=v*g,d=-f*p+2*f*v-f*g,M=(1+f)*p+(-1.5-2*f)*v+(-.5+f)*g+1,x=(-1-m)*p+(1.5+m)*v+.5*g,T=m*p-m*v;for(let R=0;R!==a;++R)r[R]=d*o[h+R]+M*o[c+R]+x*o[l+R]+T*o[u+R];return r}},va=class extends Mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},xa=class extends Mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Xe=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ms(e,this.TimeBufferType),this.values=Ms(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ms(t.times,Array),values:Ms(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new xa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new va(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ga(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ws:e=this.InterpolantFactoryMethodDiscrete;break;case Es:e=this.InterpolantFactoryMethodLinear;break;case vr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ws;case this.InterpolantFactoryMethodLinear:return Es;case this.InterpolantFactoryMethodSmooth:return vr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Em(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===vr,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,f=u-n,m=u+n;for(let g=0;g!==n;++g){let v=e[u+g];if(v!==e[f+g]||v!==e[m+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,f=o*n;for(let m=0;m!==n;++m)e[f+m]=e[u+m]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Xe.prototype.TimeBufferType=Float32Array;Xe.prototype.ValueBufferType=Float32Array;Xe.prototype.DefaultInterpolation=Es;var Xn=class extends Xe{};Xn.prototype.ValueTypeName="bool";Xn.prototype.ValueBufferType=Array;Xn.prototype.DefaultInterpolation=ws;Xn.prototype.InterpolantFactoryMethodLinear=void 0;Xn.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends Xe{};ya.prototype.ValueTypeName="color";var _a=class extends Xe{};_a.prototype.ValueTypeName="number";var ba=class extends Mi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)Cn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Hi=class extends Xe{InterpolantFactoryMethodLinear(t){return new ba(this.times,this.values,this.getValueSize(),t)}};Hi.prototype.ValueTypeName="quaternion";Hi.prototype.DefaultInterpolation=Es;Hi.prototype.InterpolantFactoryMethodSmooth=void 0;var qn=class extends Xe{};qn.prototype.ValueTypeName="string";qn.prototype.ValueBufferType=Array;qn.prototype.DefaultInterpolation=ws;qn.prototype.InterpolantFactoryMethodLinear=void 0;qn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ma=class extends Xe{};Ma.prototype.ValueTypeName="vector";var Sa=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let m=c[u],g=c[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}},Tm=new Sa,wa=class{constructor(t){this.manager=t!==void 0?t:Tm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};wa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ys=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ll(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Ll();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Ll(){return(typeof performance=="undefined"?Date:performance).now()}var Pa="\\[\\]\\.:\\/",Am=new RegExp("["+Pa+"]","g"),La="[^"+Pa+"]",Cm="[^"+Pa.replace("\\.","")+"]",Rm=/((?:WC+[\/:])*)/.source.replace("WC",La),Pm=/(WCOD+)?/.source.replace("WCOD",Cm),Lm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",La),Im=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",La),Dm=new RegExp("^"+Rm+Pm+Lm+Im+"$"),Nm=["material","materials","bones","map"],Ea=class{constructor(t,e,n){let s=n||Kt.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Kt=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Am,"")}static parseTrackName(t){let e=Dm.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Nm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Kt.Composite=Ea;Kt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Kt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Kt.prototype.GetterByBindingType=[Kt.prototype._getValue_direct,Kt.prototype._getValue_array,Kt.prototype._getValue_arrayElement,Kt.prototype._getValue_toArray];Kt.prototype.SetterByBindingTypeAndVersioning=[[Kt.prototype._setValue_direct,Kt.prototype._setValue_direct_setNeedsUpdate,Kt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Kt.prototype._setValue_array,Kt.prototype._setValue_array_setNeedsUpdate,Kt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Kt.prototype._setValue_arrayElement,Kt.prototype._setValue_arrayElement_setNeedsUpdate,Kt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Kt.prototype._setValue_fromArray,Kt.prototype._setValue_fromArray_setNeedsUpdate,Kt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var M0=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ta}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ta);var Ql=50,tc=5.5,Fm=.35,Om=3.4;function ec(i){let t=/^#?([0-9a-f]{6})$/i.exec(i.trim());if(!t)return[.85,.66,.23];let e=parseInt(t[1],16);return[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}var km=(i,t,e)=>i+(t-i)*e;function Bm(){let i=Math.cbrt(Math.random()),t=Math.random()*Math.PI*2,e=Math.acos(2*Math.random()-1);return[i*Math.sin(e)*Math.cos(t),i*Math.sin(e)*Math.sin(t),i*Math.cos(e)]}function nc(i,t,e,n){let s=n;return(Math.sin(i*1.7+t*.9+s)*Math.cos(e*1.3+i*.5-s*.7)+.5*Math.sin(t*2.3-e*1.1+s*1.7)*Math.cos(i*1.9+s*.3)+.28*Math.sin(e*3.1+i*2-s*1.3))/1.78}function ic(i,t,e){for(let n=0;n<t;n++){let[s,r,o]=Bm(),a=1.32;s*=a,r*=a,o*=a;let l=nc(s*1.15,r*1.15,o*1.15,i),c=nc(s*2.6+4,r*2.6+2,o*2.6+6,i*1.7+9),h=l*.42+c*.16,u=Math.hypot(s,r,o)||1e-4;s+=s/u*h,r+=r/u*h,o+=o/u*h,r*=1.12;let f=1-.12*Math.max(0,r*.5);s*=f,o*=f,e[n*3]=s,e[n*3+1]=r,e[n*3+2]=o*.72}}var zm=`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy; i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
vec3 snoiseVec3(vec3 x){
  return vec3(snoise(x),
              snoise(vec3(x.y-19.1,x.z+33.4,x.x+47.2)),
              snoise(vec3(x.z+74.2,x.x-124.5,x.y+99.4)));
}
vec3 curlNoise(vec3 p){
  const float e=0.12; vec3 dx=vec3(e,0.0,0.0),dy=vec3(0.0,e,0.0),dz=vec3(0.0,0.0,e);
  vec3 px0=snoiseVec3(p-dx),px1=snoiseVec3(p+dx);
  vec3 py0=snoiseVec3(p-dy),py1=snoiseVec3(p+dy);
  vec3 pz0=snoiseVec3(p-dz),pz1=snoiseVec3(p+dz);
  float x=py1.z-py0.z-pz1.y+pz0.y;
  float y=pz1.x-pz0.x-px1.z+px0.z;
  float z=px1.y-px0.y-py1.x+py0.x;
  return normalize(vec3(x,y,z)*(1.0/(2.0*e)));
}
`,Hm=zm+`
attribute vec3 aHomeA;
attribute vec3 aHomeB;
attribute vec3 aColor;
attribute float aSize;
attribute float aPhase;
attribute float aSmoke;

uniform float uTime;
uniform float uMorph;
uniform float uEnergy;
uniform float uAmp;
uniform float uBurst;    // transient turbulence during a formation change (req 5)
uniform vec3  uTint;
uniform float uTintMix;

varying vec3 vColor;
varying float vAlpha;

void main(){
  // Staggered home morph (blob\u2194blob and formation\u2194formation): each particle
  // crosses the gap at a slightly different time so the change reads as a
  // travelling wave of smoke, not a rigid snap.
  float off = aPhase / 6.2832;
  float t = clamp(uMorph * 1.5 - off * 0.5, 0.0, 1.0);
  t = t*t*(3.0-2.0*t);
  vec3 home = mix(aHomeA, aHomeB, t);

  // Divergence-free smoke flow around the home position. Turbulence scales with
  // height (laminar low, folding high); the sample point drifts downward so the
  // flow SCROLLS UP past the particles (rising smoke). A burst term momentarily
  // amplifies the flow during transitions so movement looks like billowing smoke.
  float h01 = clamp(home.y * 0.42 + 0.5, 0.0, 1.0);
  float turb = 0.34 + h01 * 1.1;
  float burst = 1.0 + uBurst * 1.9;
  float amp = uAmp * aSmoke * turb * burst * (0.5 + uEnergy * 0.95);
  vec3 sp = home * 0.9 + vec3(uTime*0.015, -uTime*0.085, uTime*0.012);
  vec3 flow = curlNoise(sp);
  vec3 flow2 = curlNoise(sp * 2.4 + 11.0) * 0.42;   // finer second octave (ribbon detail)
  vec3 pos = home + (flow + flow2) * amp;
  // Sinuous lateral sway \u2014 the S-curve of a rising column, stronger up high.
  pos.x += sin(uTime * 0.5 + home.y * 1.6 + aPhase) * amp * h01 * 0.9;
  pos.z += cos(uTime * 0.42 + home.y * 1.3 + aPhase) * amp * h01 * 0.55;
  // Buoyancy: a soft, slowly varying upward lift (hot smoke rises).
  pos.y += (snoise(home*0.6 + uTime*0.05) * 0.5 + 0.5) * amp * 0.7;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float camDist = -mv.z;
  gl_PointSize = max(0.6, aSize * (330.0 / max(camDist, 0.1)) * (1.0 + uEnergy*0.35));
  // Depth-cued translucency: nearer puffs read brighter, far ones dissolve \u2014
  // reinforces the volumetric, 3D smoke read.
  vAlpha = smoothstep(11.5, 1.5, camDist);
  vColor = mix(aColor, uTint, uTintMix);
  gl_Position = projectionMatrix * mv;
}
`,Vm=`
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.04, d);  // soft, smoky falloff
  gl_FragColor = vec4(vColor, a * vAlpha * 0.7);  // translucent \u2014 folds build density
}
`,Ks=class{constructor(t,e={}){this.scene=new Xs;this.geometry=new Je;this.clock=new Ys;this.raf=0;this.running=!1;this.mode="spread";this.blobSeed=Math.random()*10;this.morph=1;this.burst=0;this.holdTimer=0;this.energy=0;this.energyTarget=0;this.tintMix=0;this.tintMixTarget=0;var m,g;let n=typeof window!="undefined"&&Math.min(window.innerWidth,window.innerHeight)<700;this.count=(m=e.count)!=null?m:n?8e3:16e3;let s=ec((g=e.accent)!=null?g:"#d8a93a");this.renderer=new zi({canvas:t,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.camera=new Se(Ql,1,.1,80),this.camera.position.set(0,0,tc);let r=this.count;this.bottomX=new Float32Array(r),this.bottomY=new Float32Array(r),this.zJit=new Float32Array(r),this.shapeBuf=new Float32Array(r*3);let o=new Float32Array(r*3),a=new Float32Array(r),l=new Float32Array(r),c=new Float32Array(r),h=[.8,.78,.75],u=[.97,.95,.9];for(let v=0;v<r;v++){this.bottomX[v]=Math.random()*2-1,this.bottomY[v]=Math.random(),this.zJit[v]=(Math.random()-.5)*.4;let p=Math.random(),d;p<.55?d=h:p<.85?d=u:d=s;let M=.82+Math.random()*.34;o[v*3]=Math.min(1,d[0]*M),o[v*3+1]=Math.min(1,d[1]*M),o[v*3+2]=Math.min(1,d[2]*M),a[v]=.018+Math.random()*.045,l[v]=Math.random()*Math.PI*2,c[v]=.3+Math.random()*.5}this.homeA=new se(new Float32Array(r*3),3),this.homeB=new se(new Float32Array(r*3),3),this.geometry.setAttribute("position",new se(new Float32Array(r*3),3)),this.geometry.setAttribute("aHomeA",this.homeA),this.geometry.setAttribute("aHomeB",this.homeB),this.geometry.setAttribute("aColor",new se(o,3)),this.geometry.setAttribute("aSize",new se(a,1)),this.geometry.setAttribute("aPhase",new se(l,1)),this.geometry.setAttribute("aSmoke",new se(c,1)),this.material=new We({vertexShader:Hm,fragmentShader:Vm,uniforms:{uTime:{value:0},uMorph:{value:1},uEnergy:{value:0},uAmp:{value:.28},uBurst:{value:0},uTint:{value:new O(1,1,1)},uTintMix:{value:0}},transparent:!0,depthWrite:!1,blending:Sn});let f=new qs(this.geometry,this.material);f.frustumCulled=!1,this.scene.add(f),this.resize(),ic(this.blobSeed,this.count,this.shapeBuf),this.fill(this.homeA.array,"spread"),this.fill(this.homeB.array,"spread"),this.homeA.needsUpdate=this.homeB.needsUpdate=!0}extent(){let t=Math.tan(Ql*Math.PI/360)*tc;return{hw:t*this.camera.aspect,hh:t}}fill(t,e){let{hw:n,hh:s}=this.extent();if(e==="bottom"){let r=s*.01,o=-s*.97;for(let a=0;a<this.count;a++)t[a*3]=this.bottomX[a]*n*.98,t[a*3+1]=o+this.bottomY[a]*r,t[a*3+2]=this.zJit[a];return}for(let r=0;r<this.count;r++)t[r*3]=this.shapeBuf[r*3],t[r*3+1]=this.shapeBuf[r*3+1],t[r*3+2]=this.shapeBuf[r*3+2]}snapshotInto(t){let e=this.homeA.array,n=this.homeB.array,s=this.morph*this.morph*(3-2*this.morph);for(let r=0;r<t.length;r++)t[r]=km(e[r],n[r],s)}startMorphTo(t,e=1){this.snapshotInto(this.homeA.array),this.fill(this.homeB.array,t),this.homeA.needsUpdate=this.homeB.needsUpdate=!0,this.morph=0,this.burst=Math.max(this.burst,e),this.holdTimer=0}setFormation(t){t!==this.mode&&(this.mode=t,this.startMorphTo(t))}toSpread(){this.setFormation("spread")}toBottom(){this.setFormation("bottom")}mutateBlob(){this.blobSeed+=.6+Math.random()*.9,ic(this.blobSeed,this.count,this.shapeBuf),this.startMorphTo("spread",.45)}setEnergyProvider(t){this.energyProvider=t}bumpEnergy(){this.energyTarget=1}setEnergy(t){this.energyTarget=Math.max(0,Math.min(1,t))}setTint(t,e=.85){let[n,s,r]=ec(t);this.material.uniforms.uTint.value.set(n,s,r),this.tintMixTarget=Math.max(0,Math.min(1,e))}clearTint(){this.tintMixTarget=0}resize(){if(typeof window=="undefined")return;let t=window.innerWidth||800,e=window.innerHeight||600;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.fill(this.homeB.array,this.mode),this.snapshotInto(this.homeA.array),this.homeA.needsUpdate=this.homeB.needsUpdate=!0}start(){if(this.running)return;this.running=!0,this.clock.start();let t=()=>{this.running&&(this.raf=requestAnimationFrame(t),this.frame())};this.raf=requestAnimationFrame(t)}stop(){this.running=!1,this.raf&&cancelAnimationFrame(this.raf),this.raf=0}frame(){let t=Math.min(this.clock.getDelta(),.05),e=this.clock.elapsedTime;this.morph<1?this.morph=Math.min(1,this.morph+t/Om):this.mode==="spread"&&(this.holdTimer+=t,this.holdTimer>=Fm&&this.mutateBlob()),this.burst=Math.max(0,this.burst-t*.7),this.energyProvider?this.energyTarget=Math.max(0,Math.min(1,this.energyProvider())):this.energyTarget*=.95,this.energy+=(this.energyTarget-this.energy)*.1,this.tintMix+=(this.tintMixTarget-this.tintMix)*.05;let n=this.material.uniforms;n.uTime.value=e,n.uMorph.value=this.morph,n.uEnergy.value=this.energy,n.uBurst.value=this.burst*this.burst*(3-2*this.burst),n.uTintMix.value=this.tintMix,this.renderer.render(this.scene,this.camera)}dispose(){this.stop(),this.geometry.dispose(),this.material.dispose(),this.renderer.dispose()}};var js=class{constructor(t){this.container=t}push(t,e){var s;if(!t.trim())return;let n=document.createElement("div");for(n.className=`l2-msg ${e}`,n.textContent=t,this.container.appendChild(n);this.container.childElementCount>6;)(s=this.container.firstElementChild)==null||s.remove();this.restyle()}clear(){this.container.replaceChildren()}restyle(){let t=Array.from(this.container.children),e=t.length;t.forEach((n,s)=>{let r=e-1-s,o=Math.max(0,1-r/5);n.style.opacity=o.toFixed(3),n.style.transform=`translateY(${-r*1}px)`})}};var Ia={play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'},Gm="#c2c8d2",Qs=class{constructor(t,e,n){this.controller=n;this.regatherTimer=null;this.started=!1;this.userPulse=0;this.agentPulse=0;this.speaker="none";this.state="dormant";this.thinking=!1;this.thinkingUntil=0;this._unbindActivity=null;this.accent=e.accent;let s=document.createElement("div");s.className="l2",s.setAttribute("data-state","dormant"),s.appendChild(this.div("l2-scrim"));let r=document.createElement("canvas");r.className="l2-canvas",s.appendChild(r),s.appendChild(this.div("l2-halo")),this.statusEl=this.div("l2-status"),this.statusEl.textContent="",s.appendChild(this.statusEl);let o=document.createElement("button");o.className="l2-close",o.setAttribute("aria-label","Close"),o.innerHTML=Ia.close,o.addEventListener("click",()=>this.hide()),s.appendChild(o),this.drawEl=this.div("l2-draw"),s.appendChild(this.drawEl),this.canvas=new Ye(this.drawEl,u=>this.controller.notifyRendered(u),(u,f)=>{var m,g;return(g=(m=this.controller).reportComponentState)==null?void 0:g.call(m,u,f)});let a=this.div("l2-stack");s.appendChild(a),this.stack=new js(a),this.playBtn=document.createElement("button"),this.playBtn.className="l2-play",this.playBtn.setAttribute("aria-label","Awaken Pragya and start talking"),this.playBtn.innerHTML=Ia.play,this.playBtn.addEventListener("click",()=>this.onPlay()),s.appendChild(this.playBtn),this.hintEl=this.div("l2-hint"),this.hintEl.textContent="tap to awaken",s.appendChild(this.hintEl);let l=this.div("l2-input");this.textarea=document.createElement("textarea"),this.textarea.placeholder="Speak, or type your question\u2026",this.textarea.setAttribute("aria-label","Message Pragya"),this.textarea.rows=1,this.textarea.addEventListener("input",()=>this.onTyping()),this.textarea.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&(u.preventDefault(),this.submit())});let c=document.createElement("button");if(c.className="l2-send",c.setAttribute("aria-label","Send"),c.innerHTML=Ia.send,c.addEventListener("click",()=>this.submit()),l.append(this.textarea,c),s.appendChild(l),t.appendChild(s),this.root=s,typeof WebGLRenderingContext!="undefined")try{this.particles=new Ks(r,{accent:this.accent}),this.particles.setEnergyProvider(()=>this.computeEnergy()),this.particles.setTint(this.accent,.42),this.particles.start()}catch{r.classList.add("l2-hidden")}else r.classList.add("l2-hidden");this.onResize=this.onResize.bind(this),typeof window!="undefined"&&window.addEventListener("resize",this.onResize),this.bindAgentActivity()}onPlay(){this.begin(),this.controller.primeAudio(),this.controller.connect(),this.controller.startVoice()}onTyping(){this.userPulse=1}computeEnergy(){let t=this.controller.outputLevel(),e=this.controller.inputLevel();this.userPulse*=.93,this.agentPulse*=.93;let n=Math.max(t,this.agentPulse),s=Math.max(e,this.userPulse),r=Math.min(1,Math.max(n,s));return this.root.style.setProperty("--fb-energy",r.toFixed(3)),this.updateTint(n,s),this.updateState(n,s),r}updateTint(t,e){var s,r,o;let n;t>.06&&t>=e?n="agent":e>.06&&e>t?n="user":n="none",n!==this.speaker&&(this.speaker=n,n==="agent"?(s=this.particles)==null||s.setTint(this.accent,.9):n==="user"?(r=this.particles)==null||r.setTint(Gm,.7):(o=this.particles)==null||o.setTint(this.accent,.42))}updateState(t,e){let n=typeof performance!="undefined"?performance.now():Date.now(),s;t>.06?s="speaking":e>.06?s="listening":this.thinking&&n<this.thinkingUntil?s="thinking":s=this.started?"listening":"dormant",s!==this.state&&(this.state=s,this.root.setAttribute("data-state",s),this.started&&(this.statusEl.textContent=s==="speaking"?"speaking":s==="thinking"?"thinking":"listening"))}submit(){let t=this.textarea.value.trim();t&&(this.begin(),this.controller.submitText(t),this.textarea.value="")}begin(){var t;this.started||(this.started=!0,this.playBtn.classList.add("l2-hidden"),this.hintEl.classList.add("l2-hidden"),this.root.classList.add("awake"),(t=this.particles)==null||t.toBottom())}setStatus(t){t==="failed"?this.statusEl.textContent="text mode":t==="open"&&this.started&&!this.statusEl.textContent&&(this.statusEl.textContent="listening")}setTourStatus(t){t&&(this.begin(),this.statusEl.textContent="guided tour")}userMessage(t){var e;this.canvas.clear(),this.drawEl.classList.remove("show"),this.stack.push(t,"user"),(e=this.particles)==null||e.toBottom(),this.userPulse=1,this.thinking=!0,this.thinkingUntil=(typeof performance!="undefined"?performance.now():Date.now())+6e3}agentMessage(t,e){this.stack.push(t,"agent"),this.agentPulse=Math.max(this.agentPulse,.7),this.thinking=!1}agentAudioTick(){this.agentPulse=Math.max(this.agentPulse,.5),this.thinking=!1}addComponent(t){this.drawEl.classList.add("show"),this.canvas.add(t),this.thinking=!1,this.agentActivity(2600)}patch(t,e){this.canvas.applyPatch(t,e)}systemMessage(t){this.statusEl.textContent=t}bindAgentActivity(){if(typeof window=="undefined")return;let t=()=>this.agentActivity(1600);window.addEventListener("fluidbuddha:navigate",t),window.addEventListener("fluidbuddha:scroll_to",t),this._unbindActivity=()=>{window.removeEventListener("fluidbuddha:navigate",t),window.removeEventListener("fluidbuddha:scroll_to",t)}}agentActivity(t){this.particles&&(this.particles.toSpread(),this.regatherTimer&&clearTimeout(this.regatherTimer),this.regatherTimer=setTimeout(()=>{var e;return(e=this.particles)==null?void 0:e.toBottom()},t/2))}onResize(){var t;(t=this.particles)==null||t.resize()}hide(){this.controller.stopVoice(),this.root.classList.add("l2-hidden")}div(t){let e=document.createElement("div");return e.className=t,e}dispose(){var t,e;this.regatherTimer&&clearTimeout(this.regatherTimer),(t=this._unbindActivity)==null||t.call(this),typeof window!="undefined"&&window.removeEventListener("resize",this.onResize),(e=this.particles)==null||e.dispose()}};function sc(i){let t=/^#?([0-9a-f]{6})$/i.exec((i||"").trim());if(!t)return[201,162,74];let e=parseInt(t[1],16);return[e>>16&255,e>>8&255,e&255]}var Da=(i,t,e)=>i+(t-i)*e,Rn=(i,t,e)=>[Da(i[0],t[0],e),Da(i[1],t[1],e),Da(i[2],t[2],e)],Wm=[196,204,218],Yn=class{constructor(t,e={}){this.canvas=t;this.dpr=1;this.w=0;this.h=0;this.raf=0;this.running=!1;this.lobes=[];this.state="dormant";this.energy=0;this.energyTarget=0;this.t=0;this.last=0;var n;this.ctx=(()=>{try{return t.getContext("2d")}catch{return null}})(),this.reduced=!!e.reducedMotion,this.accent=sc((n=e.accent)!=null?n:"#c9a24a"),this.bright=Rn(this.accent,[255,248,226],.62),this.deep=Rn(this.accent,[0,0,0],.55),this.color=this.accent.slice(),this.target=this.accent.slice();for(let s=0;s<7;s++)this.lobes.push({ang:s/7*Math.PI*2,spd:.18+s%3*.07,rad:.16+s%4*.05,size:.5+s%3*.16,phase:s*1.7});this.resize()}setAccent(t){this.accent=sc(t),this.bright=Rn(this.accent,[255,248,226],.62),this.deep=Rn(this.accent,[0,0,0],.55),this.state!=="listening"&&(this.target=this.tintFor(this.state))}setState(t){this.state=t,this.target=this.tintFor(t),this.reduced&&this.renderStatic()}setEnergy(t){this.energyTarget=Math.max(0,Math.min(1,t))}setEnergyProvider(t){this.energyProvider=t}tintFor(t){return t==="listening"?Wm:t==="thinking"?Rn(this.accent,[255,244,221],.3):t==="speaking"?this.bright:this.accent}resize(){let t=this.canvas.clientWidth||this.canvas.width||64,e=this.canvas.clientHeight||this.canvas.height||64;this.dpr=Math.min(typeof window!="undefined"&&window.devicePixelRatio||1,2),this.w=t,this.h=e,this.canvas.width=Math.max(1,Math.round(t*this.dpr)),this.canvas.height=Math.max(1,Math.round(e*this.dpr)),this.reduced&&this.renderStatic()}start(){if(!this.ctx)return;if(this.reduced){this.renderStatic();return}if(this.running)return;this.running=!0,this.last=typeof performance!="undefined"?performance.now():Date.now();let t=()=>{this.running&&(this.raf=requestAnimationFrame(t),this.frame())};typeof requestAnimationFrame=="function"&&(this.raf=requestAnimationFrame(t))}stop(){this.running=!1,this.raf&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(this.raf),this.raf=0}frame(){let t=typeof performance!="undefined"?performance.now():Date.now(),e=Math.min((t-this.last)/1e3,.05);this.last=t,this.t+=e,this.energyProvider?this.energyTarget=Math.max(0,Math.min(1,this.energyProvider())):this.energyTarget*=.94,this.energy+=(this.energyTarget-this.energy)*.12;for(let n=0;n<3;n++)this.color[n]+=(this.target[n]-this.color[n])*.06;this.render()}render(){let t=this.ctx;if(!t)return;t.setTransform(this.dpr,0,0,this.dpr,0,0),t.clearRect(0,0,this.w,this.h);let e=this.w/2,n=this.h/2,s=Math.min(this.w,this.h)/2,r=Math.max(this.energy,.09),o=.5+.5*Math.sin(this.t*(Math.PI*2)/5.5),a=this.state==="thinking"?this.t*.9:this.t*.25,l=s*(.34+o*.08+r*.42);t.globalCompositeOperation="lighter",this.blob(e,n,s*(.92+r*.18),this.deep,.22+r*.18);let c=Rn(this.color,this.deep,.35);for(let u of this.lobes){let f=u.ang+a*u.spd+Math.sin(this.t*u.spd*1.7+u.phase)*.5,m=l*(u.rad/.2),g=1+.22*Math.sin(this.t*1.3+u.phase),v=e+Math.cos(f)*m*g,p=n+Math.sin(f)*m*g-(this.state==="thinking"?s*.05:0),d=s*u.size*(.34+r*.22)*(.85+.3*Math.sin(this.t+u.phase)),M=Rn(c,this.color,.5+.5*Math.sin(f+this.t));this.blob(v,p,Math.max(2,d),M,.5+r*.3)}let h=s*(.22+o*.03+r*.16);this.blob(e,n,h,Rn(this.bright,[255,252,240],.4+r*.3),.95),t.globalCompositeOperation="source-over"}blob(t,e,n,s,r){let o=this.ctx,a=o.createRadialGradient(t,e,0,t,e,n),[l,c,h]=s;a.addColorStop(0,`rgba(${l|0},${c|0},${h|0},${r})`),a.addColorStop(.45,`rgba(${l|0},${c|0},${h|0},${r*.42})`),a.addColorStop(1,`rgba(${l|0},${c|0},${h|0},0)`),o.fillStyle=a,o.beginPath(),o.arc(t,e,n,0,Math.PI*2),o.fill()}renderStatic(){if(this.ctx){this.energy=0,this.t=2.1;for(let t=0;t<3;t++)this.color[t]=this.target[t];this.render()}}dispose(){this.stop(),this.energyProvider=void 0}};var Xm={send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'},qm=4,Ym=14e3,$m=4200;function Zm(){return typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}var tr=class{constructor(t,e,n){this.controller=n;this.awake=!1;this.summoning=!1;this.state="dormant";this.thinking=!1;this.thinkingUntil=0;this.speakingUntil=0;this.agentPulse=0;this.reactRaf=0;this.spotlightTimer=null;this.unbind=[];this.accent=e.accent,this.reduce=Zm();let s=document.createElement("div");s.className="l3",s.setAttribute("data-state","dormant"),this.auraEl=this.div("l3-aura"),this.veilEl=this.div("l3-veil"),this.ringEl=this.div("l3-ring"),this.capsEl=this.div("l3-caps"),this.drawEl=this.div("l2-draw"),s.append(this.auraEl,this.veilEl,this.ringEl,this.capsEl,this.drawEl),this.canvas=new Ye(this.drawEl,u=>this.controller.notifyRendered(u),(u,f)=>{var m,g;return(g=(m=this.controller).reportComponentState)==null?void 0:g.call(m,u,f)});let r=this.div("l3-summon-backdrop");r.addEventListener("click",()=>this.dismissSummon()),s.appendChild(r),this.summonEl=this.div("l3-summon");let o=document.createElement("canvas");o.className="l3-orb",this.summonEl.appendChild(o);let a=this.div("l3-summon-input");this.summonInput=document.createElement("textarea"),this.summonInput.rows=1,this.summonInput.placeholder="Ask Pragya anything \u2014 or just speak\u2026",this.summonInput.setAttribute("aria-label","Ask Pragya"),this.summonInput.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey?(u.preventDefault(),this.submit()):u.key==="Escape"&&this.dismissSummon()});let l=document.createElement("button");l.className="l3-summon-send",l.setAttribute("aria-label","Send"),l.innerHTML=Xm.send,l.addEventListener("click",()=>this.submit()),a.append(this.summonInput,l);let c=this.div("l3-summon-hint");c.innerHTML="press <kbd>"+(this.isMac()?"\u2318":"Ctrl")+" K</kbd> anytime \xB7 or speak",this.summonEl.append(a,c),s.appendChild(this.summonEl);let h=document.createElement("button");h.className="l3-seed",h.setAttribute("aria-label","Summon Pragya"),h.addEventListener("click",()=>this.summon()),s.appendChild(h),t.appendChild(s),this.root=s,o&&(this.orb=new Yn(o,{accent:this.accent,reducedMotion:this.reduce}),this.orb.setEnergyProvider(()=>Math.max(this.controller.inputLevel(),this.controller.outputLevel()))),this.bindGlobal(),e.autoStart&&setTimeout(()=>this.summon(),400)}isMac(){return typeof navigator!="undefined"&&/mac|iphone|ipad/i.test(navigator.platform||navigator.userAgent||"")}bindGlobal(){if(typeof window=="undefined")return;let t=s=>{(s.metaKey||s.ctrlKey)&&(s.key==="k"||s.key==="K")?(s.preventDefault(),this.summoning?this.dismissSummon():this.summon()):s.key==="Escape"&&this.summoning&&this.dismissSummon()},e=s=>this.onScrollTo(s.detail||{}),n=()=>this.flashAura();window.addEventListener("keydown",t),window.addEventListener("fluidbuddha:scroll_to",e),window.addEventListener("fluidbuddha:navigate",n),this.unbind.push(()=>window.removeEventListener("keydown",t),()=>window.removeEventListener("fluidbuddha:scroll_to",e),()=>window.removeEventListener("fluidbuddha:navigate",n))}summon(){var t;this.awaken(),this.summoning=!0,this.root.classList.add("summoning"),(t=this.orb)==null||t.start(),this.controller.primeAudio(),this.controller.connect(),this.controller.startVoice(),setTimeout(()=>{try{this.summonInput.focus()}catch{}},60)}dismissSummon(){this.summoning=!1,this.root.classList.remove("summoning")}awaken(){this.awake||(this.awake=!0,this.root.classList.add("awake"),this.startReactiveLoop())}submit(){let t=this.summonInput.value.trim();t&&(this.awaken(),this.controller.submitText(t),this.summonInput.value="",this.dismissSummon())}startReactiveLoop(){if(this.reduce||typeof requestAnimationFrame!="function"||this.reactRaf)return;let t=()=>{if(!this.awake){this.reactRaf=0;return}this.reactRaf=requestAnimationFrame(t);let e=this.controller.inputLevel(),n=this.controller.outputLevel();this.agentPulse*=.93;let s=Math.max(n,this.agentPulse);this.root.style.setProperty("--fb-energy",Math.max(e,s).toFixed(3));let r=typeof performance!="undefined"?performance.now():Date.now();s>.05&&(this.speakingUntil=r+600);let o;r<this.speakingUntil?o="speaking":this.thinking&&r<this.thinkingUntil?o="thinking":e>.05?o="listening":o="dormant",this.setState(o)};this.reactRaf=requestAnimationFrame(t)}setState(t){var e;t!==this.state&&(this.state=t,this.root.setAttribute("data-state",t),(e=this.orb)==null||e.setState(t))}onScrollTo(t){this.flashAura();let e=t.sectionId?this.resolveSection(t.sectionId):null;e&&setTimeout(()=>this.spotlight(e),560)}spotlight(t){if(this.reduce)return;let e=t.getBoundingClientRect();if(!e.width&&!e.height)return;let n=e.left+e.width/2,s=e.top+e.height/2,r=Math.max(e.width,e.height)/2+150,o=this.root.style;o.setProperty("--l3-x",`${n}px`),o.setProperty("--l3-y",`${s}px`),o.setProperty("--l3-r",`${r}px`),o.setProperty("--l3-rx",`${e.left-10}px`),o.setProperty("--l3-ry",`${e.top-10}px`),o.setProperty("--l3-rw",`${e.width+20}px`),o.setProperty("--l3-rh",`${e.height+20}px`),this.root.classList.add("spotlight"),this.spotlightTimer&&clearTimeout(this.spotlightTimer),this.spotlightTimer=setTimeout(()=>this.root.classList.remove("spotlight"),$m)}resolveSection(t){if(typeof document=="undefined")return null;let e=t.replace(/^#/,"");try{let n=document.getElementById(e);if(n)return n;let s=e.replace(/[-_]/g," ").toLowerCase().trim();if(!s)return null;let r=Array.from(document.querySelectorAll("[id]")).find(l=>l.id.replace(/[-_]/g," ").toLowerCase().includes(s));if(r)return r;let a=Array.from(document.querySelectorAll("h1,h2,h3,h4")).find(l=>(l.textContent||"").toLowerCase().includes(s));return(a==null?void 0:a.closest("section"))||a||null}catch{return null}}flashAura(){this.agentPulse=Math.max(this.agentPulse,.6)}pushCaption(t,e,n){var r;if(!t.trim())return;let s=document.createElement("div");if(s.className=`l3-cap fb-glass ${e}`,s.append(this.div2(void 0,t)),n!=null&&n.found){let o=document.createElement("span");o.className="grounding",o.textContent=`grounded \xB7 ${(n.confidence*100).toFixed(0)}%`,s.appendChild(o)}for(this.capsEl.appendChild(s);this.capsEl.childElementCount>qm;)(r=this.capsEl.firstElementChild)==null||r.remove();setTimeout(()=>{s.style.opacity="0",s.style.transform="translateY(-8px)",setTimeout(()=>s.remove(),700)},Ym)}setStatus(t){}setTourStatus(t){t&&(this.awaken(),this.flashAura())}userMessage(t){this.awaken(),this.canvas.clear(),this.drawEl.classList.remove("show"),this.dismissSummon(),this.pushCaption(t,"user"),this.thinking=!0,this.thinkingUntil=(typeof performance!="undefined"?performance.now():Date.now())+6e3}agentMessage(t,e){this.pushCaption(t,"agent",e),this.flashAura(),this.thinking=!1}agentAudioTick(){this.agentPulse=Math.max(this.agentPulse,.5),this.thinking=!1}addComponent(t){this.awaken(),this.drawEl.classList.add("show"),this.canvas.add(t),this.flashAura(),this.thinking=!1}patch(t,e){this.canvas.applyPatch(t,e)}systemMessage(t){this.pushCaption(t,"agent")}div(t){let e=document.createElement("div");return e.className=t,e}div2(t,e){let n=document.createElement("div");return t&&(n.className=t),n.textContent=e,n}dispose(){var t;this.reactRaf&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(this.reactRaf),this.spotlightTimer&&clearTimeout(this.spotlightTimer),this.unbind.forEach(e=>e()),this.unbind=[],(t=this.orb)==null||t.dispose()}};var nr=class{constructor(t,e){this.container=t;this.onEnquiry=e}render(t){this.container.replaceChildren();let e=[];for(let n of t.sections||[]){let s=this.buildSection(n);s&&(this.container.appendChild(s),e.push(s))}pe(e,{stepMs:320})}buildSection(t){let e=t.props||{},n=document.createElement("section");switch(n.className=`fbpage-section fbpage-${t.type}`,t.type){case"hero":return this.hero(n,e);case"feature_grid":return this.featureGrid(n,e);case"text":return this.text(n,e);case"pricing_table":return this.pricing(n,e);case"chart":return n.appendChild(Zi(e)),n;case"flowchart":return n.appendChild($i(e)),n;case"enquiry_form":return this.enquiry(n,e);case"cta":return this.cta(n,e);case"media":return this.media(n,e);default:return null}}heading(t,e,n){let s=ve(e);if(!s)return null;let r=document.createElement(t);return r.className=n,r.textContent=s,r}hero(t,e){Pn(t,this.heading("h1",e.title,"fbpage-hero-title"));let n=ve(e.subtitle);if(n){let r=document.createElement("p");r.className="fbpage-hero-sub",r.textContent=n,t.appendChild(r)}let s=ve(e.cta_label);return s&&t.appendChild(this.ctaButton(s)),t}featureGrid(t,e){Pn(t,this.heading("h2",e.title,"fbpage-h2"));let n=document.createElement("div");n.className="fbpage-grid";for(let s of er(e.items)){let r=document.createElement("div");r.className="fbpage-card",Pn(r,this.heading("h3",s.title,"fbpage-card-title"));let o=ve(s.body);if(o){let a=document.createElement("p");a.textContent=o,r.appendChild(a)}n.appendChild(r)}return t.appendChild(n),t}text(t,e){Pn(t,this.heading("h2",e.title,"fbpage-h2"));let n=ve(e.body);if(n){let s=document.createElement("p");s.className="fbpage-body",s.textContent=n,t.appendChild(s)}return t}pricing(t,e){Pn(t,this.heading("h2",e.title,"fbpage-h2"));let n=document.createElement("div");n.className="fbpage-grid";for(let s of er(e.tiers)){let r=document.createElement("div");r.className="fbpage-card fbpage-tier",Pn(r,this.heading("h3",s.name,"fbpage-card-title"));let o=ve(s.price);if(o){let l=document.createElement("div");l.className="fbpage-price",l.textContent=o,r.appendChild(l)}let a=document.createElement("ul");a.className="fbpage-features";for(let l of er(s.features)){let c=document.createElement("li");c.textContent=String(l),a.appendChild(c)}r.appendChild(a),n.appendChild(r)}return t.appendChild(n),t}enquiry(t,e){Pn(t,this.heading("h2",e.title,"fbpage-h2"));let n=document.createElement("form");n.className="fbpage-form";let s=[];for(let o of er(e.fields)){let a=ve(o.name)||"field",l=document.createElement("label");l.className="fbpage-field",l.textContent=ve(o.label)||a;let c=ve(o.type)||"text",h=c==="textarea"?document.createElement("textarea"):Object.assign(document.createElement("input"),{type:c});h.name=a,l.appendChild(h),n.appendChild(l),s.push({name:a,el:h})}let r=document.createElement("button");return r.type="submit",r.className="fbpage-btn",r.textContent=ve(e.submit_label)||"Submit",n.appendChild(r),n.addEventListener("submit",o=>{o.preventDefault();let a={};s.forEach(({name:l,el:c})=>a[l]=c.value),this.onEnquiry({operationId:ve(e.operation_id)||void 0,values:a}),r.textContent="Sent \u2713",r.disabled=!0}),t.appendChild(n),t}cta(t,e){Pn(t,this.heading("h2",e.title,"fbpage-h2"));let n=ve(e.body);if(n){let r=document.createElement("p");r.className="fbpage-body",r.textContent=n,t.appendChild(r)}let s=ve(e.cta_label);return s&&t.appendChild(this.ctaButton(s)),t}media(t,e){let n=ve(e.src);if(n){let r=document.createElement("img");r.className="fbpage-media",r.src=n,r.alt=ve(e.alt)||"",t.appendChild(r)}let s=ve(e.caption);if(s){let r=document.createElement("div");r.className="fbpage-caption",r.textContent=s,t.appendChild(r)}return t}ctaButton(t){let e=document.createElement("button");return e.className="fbpage-btn",e.textContent=t,e.addEventListener("click",()=>{var n;(n=this.container.querySelector(".fbpage-form"))==null||n.scrollIntoView({behavior:"smooth"})}),e}};function ve(i){return typeof i=="string"?i:i==null?"":String(i)}function er(i){return Array.isArray(i)?i:[]}function Pn(i,t){t&&i.appendChild(t)}var rc=`
:host {
  /* \u2014 configurable anchor \u2014 */
  --fb-accent: #c9a24a;

  /* \u2014 molten-obsidian surface ramp \u2014 */
  --fb-void: #0a0b0e;
  --fb-bg: #0e0f13;
  --fb-surface: #15171e;
  --fb-surface-2: #1c1f28;
  --fb-fg: #f4f1e9;          /* warm ivory ink, never pure white */
  --fb-muted: #a7a294;       /* warm muted */
  --fb-faint: #6e6a60;
  --fb-border: rgba(255,255,255,0.10);
  --fb-pos: #5fd0a6;
  --fb-neg: #e8806f;

  /* \u2014 the liquid-light spectrum (the Aura), derived from the accent \u2014 */
  --fb-gold: var(--fb-accent);
  --fb-gold-bright: color-mix(in srgb, var(--fb-accent) 58%, #fff6df);
  --fb-platinum: color-mix(in srgb, var(--fb-accent) 22%, #fff8e9);
  --fb-amber: color-mix(in srgb, var(--fb-accent) 72%, #140d02);
  --fb-silver: #c2c8d2;      /* cool counter-light \u2014 "listening"/user */
  --fb-silver-bright: #e9edf3;

  /* \u2014 motion + rhythm \u2014 */
  --fb-ease: cubic-bezier(.16,1,.3,1);
  --fb-ease-spring: cubic-bezier(.34,1.4,.5,1);
  --fb-breath: 5.5s;
  --fb-dur: .5s;
  /* live 0..1 amplitude (mic / TTS), written per-frame by JS for reactive light */
  --fb-energy: 0;

  /* \u2014 semantic elevation \u2014 */
  --fb-z-base: 2147483000;
  --fb-z-page: 2147483400;

  all: initial;
  font-family: "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
*, *::before, *::after { box-sizing: border-box; }
.hidden { display: none !important; }

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 film grain \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A single fixed, pointer-transparent grain film over the overlay \u2014 the
   "shot on film" texture that reads as luxury. Painted once; never on a
   scrolling container (perf). */
.fb-grain {
  position: fixed; inset: 0; z-index: calc(var(--fb-z-base) + 60);
  pointer-events: none; opacity: .035; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 molten-obsidian glass material \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   Shared by every elevated surface: L1 panel, generative cards, L2 draw
   surface, L3 captions + summon. */
.fb-glass, .card {
  position: relative; isolation: isolate;
  border-radius: 20px;
  color: var(--fb-fg);
  background:
    radial-gradient(135% 95% at 50% -14%, color-mix(in srgb, var(--fb-accent) 12%, transparent), transparent 60%),
    linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.012) 40%, rgba(255,255,255,0.02)),
    rgba(12,13,17,0.66);
  -webkit-backdrop-filter: blur(26px) saturate(155%);
  backdrop-filter: blur(26px) saturate(155%);
  box-shadow:
    0 34px 90px -34px rgba(0,0,0,0.86),
    0 8px 24px -18px rgba(0,0,0,0.7),
    inset 0 1px 0 rgba(255,255,255,0.16),
    inset 0 -34px 70px -48px rgba(0,0,0,0.65);
}
.card { padding: 16px; }
/* faint diagonal specular sheen (static \u2014 surfaces stay calm) */
.fb-glass::before, .card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; z-index: -1;
  pointer-events: none;
  background: linear-gradient(135deg, transparent 0%, color-mix(in srgb, var(--fb-platinum) 16%, transparent) 16%, transparent 34%);
}
/* true 1px gradient rim-light \u2014 brighter at the top-left "lit" edge */
.fb-glass::after, .card::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
  pointer-events: none;
  background: linear-gradient(155deg,
    var(--fb-gold-bright) 0%, color-mix(in srgb, var(--fb-platinum) 60%, transparent) 14%,
    transparent 38%, transparent 64%,
    color-mix(in srgb, var(--fb-accent) 46%, transparent) 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: .9;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   DESIGN LEVEL 1 \u2014 "The Companion": an Aura you hold.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/* \u2014 Launcher: a living light-form, not a button with an icon \u2014 */
.trigger {
  position: fixed; bottom: 24px; right: 24px; z-index: var(--fb-z-base);
  width: 64px; height: 64px; padding: 0; border: none; border-radius: 50%;
  background: transparent; cursor: pointer; isolation: isolate;
  display: grid; place-items: center;
  -webkit-tap-highlight-color: transparent;
  transition: transform .35s var(--fb-ease-spring);
  will-change: transform;
}
:host([data-position="bottom-left"]) .trigger { left: 24px; right: auto; }
.trigger-aura { width: 100%; height: 100%; display: block; border-radius: 50%; }
/* the obsidian well the light sits in + its cast glow on the page */
.trigger::before {
  content: ""; position: absolute; inset: 0; border-radius: 50%; z-index: -1;
  background: radial-gradient(circle at 38% 34%, #1b1d25, var(--fb-void) 72%);
  box-shadow:
    0 14px 40px -10px rgba(0,0,0,0.6),
    0 0 38px -6px color-mix(in srgb, var(--fb-accent) 55%, transparent),
    inset 0 1px 0 rgba(255,255,255,0.10);
  border: 1px solid color-mix(in srgb, var(--fb-accent) 45%, transparent);
}
/* a slow breathing halo ring \u2014 the presence "inhaling" */
.trigger::after {
  content: ""; position: absolute; inset: -5px; border-radius: 50%; z-index: -1;
  border: 1px solid color-mix(in srgb, var(--fb-accent) 36%, transparent);
  animation: fb-breathe var(--fb-breath) var(--fb-ease) infinite;
}
.trigger:hover { transform: translateY(-3px) scale(1.05); }
.trigger:active { transform: translateY(-1px) scale(.99); }
@keyframes fb-breathe {
  0%, 100% { transform: scale(1); opacity: .55; }
  50% { transform: scale(1.18); opacity: 0; }
}

/* \u2014 Panel: a slab of molten obsidian with a gold light-seam at the brow \u2014 */
.panel {
  position: fixed; bottom: 24px; right: 24px; z-index: var(--fb-z-base);
  width: 392px; max-width: calc(100vw - 28px);
  height: 580px; max-height: calc(100vh - 48px);
  display: flex; flex-direction: column; overflow: hidden;
  border-radius: 26px; color: var(--fb-fg);
  background:
    radial-gradient(150% 80% at 50% -8%, color-mix(in srgb, var(--fb-accent) 9%, transparent), transparent 56%),
    linear-gradient(180deg, var(--fb-surface) 0%, var(--fb-bg) 26%, var(--fb-void) 100%);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow:
    0 50px 120px -40px rgba(0,0,0,0.9),
    0 10px 30px -20px rgba(0,0,0,0.7),
    inset 0 1px 0 rgba(255,255,255,0.07);
  isolation: isolate;
}
:host([data-position="bottom-left"]) .panel { left: 24px; right: auto; }
/* the light-seam \u2014 a bright gold thread along the top edge */
.panel::before {
  content: ""; position: absolute; left: 0; right: 0; top: 0; height: 1px; z-index: 3;
  background: linear-gradient(90deg, transparent, var(--fb-gold-bright), color-mix(in srgb, var(--fb-accent) 70%, transparent), transparent);
  opacity: .9;
}
/* a soft aura bloom behind the header, gently breathing */
.panel::after {
  content: ""; position: absolute; left: 50%; top: -40px; width: 240px; height: 160px; z-index: -1;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--fb-accent) 26%, transparent), transparent 72%);
  filter: blur(6px); opacity: .6;
  animation: fb-bloom calc(var(--fb-breath) * 1.3) var(--fb-ease) infinite;
}
@keyframes fb-bloom { 0%,100% { opacity: .38; transform: translateX(-50%) scale(1); } 50% { opacity: .7; transform: translateX(-50%) scale(1.08); } }

.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 18px 14px; position: relative; z-index: 2;
}
.profile { display: flex; align-items: center; gap: 12px; }
/* living avatar \u2014 a miniature Aura, not a letter */
.avatar {
  width: 40px; height: 40px; border-radius: 50%; flex: none; position: relative;
  background: radial-gradient(circle at 38% 34%, #1c1e26, var(--fb-void) 75%);
  border: 1px solid color-mix(in srgb, var(--fb-accent) 40%, transparent);
  box-shadow: 0 0 22px -8px color-mix(in srgb, var(--fb-accent) 70%, transparent), inset 0 1px 0 rgba(255,255,255,0.08);
  overflow: hidden;
}
.avatar canvas { width: 100%; height: 100%; display: block; }
.name { font-weight: 600; font-size: 15px; letter-spacing: -.01em; color: var(--fb-fg); }
.status {
  font-size: 11.5px; color: var(--fb-muted); display: flex; align-items: center; gap: 6px;
  letter-spacing: .02em; margin-top: 1px; text-transform: lowercase;
}
.dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--fb-pos); flex: none;
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--fb-pos) 60%, transparent);
  animation: fb-livedot 2.6s var(--fb-ease) infinite;
}
/* state-of-light: the status dot + word recolour with the agent's state */
.panel[data-state="listening"] .dot { background: var(--fb-silver); animation-duration: 1.1s; }
.panel[data-state="thinking"]  .dot { background: var(--fb-gold-bright); animation-duration: 1.8s; }
.panel[data-state="speaking"]  .dot { background: var(--fb-gold); animation-duration: .9s; }
.panel[data-state="listening"] .status { color: var(--fb-silver); }
.panel[data-state="speaking"]  .status,
.panel[data-state="thinking"]  .status { color: color-mix(in srgb, var(--fb-gold-bright) 80%, var(--fb-fg)); }
@keyframes fb-livedot { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 55%, transparent); } 70%,100% { box-shadow: 0 0 0 7px transparent; } }

.icon-btn {
  background: none; border: none; color: var(--fb-faint); cursor: pointer;
  padding: 7px; border-radius: 10px; display: grid; place-items: center;
  transition: color .2s var(--fb-ease), background .2s var(--fb-ease);
}
.icon-btn:hover { color: var(--fb-fg); background: rgba(255,255,255,0.06); }
.icon-btn svg { width: 18px; height: 18px; }

/* \u2014 Conversation: editorial, breathing, not a stack of chat bubbles \u2014 */
.messages {
  flex: 1; overflow-y: auto; padding: 8px 18px 16px;
  display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 1;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.16) transparent;
}
.messages::-webkit-scrollbar { width: 8px; }
.messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.14); border-radius: 8px; }
.messages::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.26); }

.bubble {
  max-width: 90%; font-size: 14.5px; line-height: 1.55; white-space: pre-wrap;
  word-wrap: break-word; text-wrap: pretty;
  animation: fb-rise-in .42s var(--fb-ease) both;
}
/* Pragya speaks as warm ivory prose with a gold margin-thread \u2014 editorial,
   weightless, unboxed. */
.bubble.pragya {
  align-self: flex-start; color: var(--fb-fg); padding-left: 14px;
  border-left: 1px solid color-mix(in srgb, var(--fb-accent) 50%, transparent);
}
/* The visitor's words: a cool, solid moonstone chip \u2014 the counter-light. */
.bubble.user {
  align-self: flex-end; padding: 9px 14px; border-radius: 16px 16px 5px 16px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--fb-silver) 22%, var(--fb-surface-2)), var(--fb-surface-2));
  border: 1px solid rgba(255,255,255,0.08); color: var(--fb-silver-bright);
}
.bubble.system {
  align-self: center; background: transparent; color: var(--fb-neg);
  font-size: 12px; text-align: center; border: none; padding: 0;
}
.grounding {
  display: inline-flex; align-items: center; gap: 6px; margin-top: 8px;
  font-size: 10px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--fb-pos); opacity: .9;
}
.grounding::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }
@keyframes fb-rise-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

/* "thinking" \u2014 three motes of light drifting upward */
.bubble.typing { display: inline-flex; gap: 6px; align-items: center; padding-left: 14px; border-left-color: color-mix(in srgb, var(--fb-gold-bright) 60%, transparent); }
.bubble.typing .dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--fb-gold-bright);
  box-shadow: 0 0 8px color-mix(in srgb, var(--fb-gold-bright) 70%, transparent);
  animation: fb-mote 1.3s var(--fb-ease) infinite;
}
.bubble.typing .dot:nth-child(2) { animation-delay: .17s; }
.bubble.typing .dot:nth-child(3) { animation-delay: .34s; }
@keyframes fb-mote { 0%,80%,100% { opacity: .35; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-4px); } }

.canvas { display: flex; flex-direction: column; gap: 12px; align-self: stretch; }

/* \u2014 Suggestion seeds \u2014 */
.chips { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 18px 10px; position: relative; z-index: 1; }
.chip {
  font-size: 12px; padding: 7px 13px; border-radius: 999px; cursor: pointer; font: inherit;
  color: color-mix(in srgb, var(--fb-gold-bright) 75%, var(--fb-fg));
  background: color-mix(in srgb, var(--fb-accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--fb-accent) 30%, transparent);
  transition: transform .2s var(--fb-ease-spring), background .2s var(--fb-ease), border-color .2s var(--fb-ease);
}
.chip:hover { background: color-mix(in srgb, var(--fb-accent) 18%, transparent); border-color: color-mix(in srgb, var(--fb-accent) 55%, transparent); transform: translateY(-1px); }
.chip:active { transform: translateY(0) scale(.98); }

/* \u2014 Input: voice-first. The mic is the hero; type as the quiet alternative \u2014 */
.input {
  display: flex; align-items: center; gap: 10px; padding: 14px 16px;
  position: relative; z-index: 2;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--fb-void) 55%, transparent));
}
.input::before {
  content: ""; position: absolute; left: 16px; right: 16px; top: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
}
.input textarea {
  flex: 1; resize: none; height: 42px; max-height: 110px; padding: 11px 14px;
  border-radius: 14px; border: 1px solid var(--fb-border);
  background: rgba(255,255,255,0.035); color: var(--fb-fg);
  font: inherit; font-size: 14px; outline: none;
  transition: border-color .2s var(--fb-ease), box-shadow .2s var(--fb-ease), background .2s var(--fb-ease);
}
.input textarea::placeholder { color: var(--fb-faint); }
.input textarea:focus {
  border-color: color-mix(in srgb, var(--fb-accent) 55%, transparent);
  background: rgba(255,255,255,0.055);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--fb-accent) 16%, transparent);
}
.in-btn {
  width: 42px; height: 42px; flex: none; border-radius: 14px; cursor: pointer;
  border: 1px solid var(--fb-border); color: var(--fb-fg);
  background: linear-gradient(180deg, color-mix(in srgb, var(--fb-accent) 16%, var(--fb-surface-2)), var(--fb-surface-2));
  display: grid; place-items: center;
  transition: transform .18s var(--fb-ease), background .18s var(--fb-ease), border-color .18s var(--fb-ease), box-shadow .25s var(--fb-ease);
}
.in-btn:hover { border-color: color-mix(in srgb, var(--fb-accent) 55%, transparent); background: color-mix(in srgb, var(--fb-accent) 24%, var(--fb-surface-2)); }
.in-btn:active { transform: scale(.93); }
.in-btn svg { width: 18px; height: 18px; }
/* mic LIVE \u2014 the button becomes a pulsing well of light synced to the voice */
.in-btn.live {
  color: #16130a; border-color: var(--fb-gold-bright);
  background: radial-gradient(circle at 40% 34%, var(--fb-gold-bright), var(--fb-accent) 78%);
  box-shadow:
    0 0 0 calc(2px + var(--fb-energy) * 10px) color-mix(in srgb, var(--fb-accent) 40%, transparent),
    0 0 22px color-mix(in srgb, var(--fb-accent) 60%, transparent);
}

@media (max-width: 480px) {
  .panel { width: 100vw; height: 100dvh; max-width: 100vw; max-height: 100dvh; bottom: 0; right: 0; border-radius: 0; }
  :host([data-position="bottom-left"]) .panel { left: 0; }
  .trigger { bottom: calc(24px + env(safe-area-inset-bottom, 0px)); }
  .input { padding-bottom: calc(14px + env(safe-area-inset-bottom, 0px)); }
  .icon-btn { min-width: 44px; min-height: 44px; }
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   GENERATIVE CANVAS \u2014 diagrams, charts, widgets. Surfaces stay calm and
   legible; they inherit the molten-glass material from .card above.
   (Selectors preserved verbatim so the SVG/DOM renderers keep working.)
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.caption { font-size: 12px; color: var(--fb-muted); margin-bottom: 10px; letter-spacing: .2px; line-height: 1.45; }
.empty { font-size: 12px; color: var(--fb-faint); font-style: italic; }

.fb-glass-rect { stroke: rgba(255,255,255,0.4); stroke-width: 1; }
.fb-glass-sheen { fill: url(#fbEdge); opacity: .55; pointer-events: none; }
.fb-glass-bead { stroke: rgba(255,255,255,0.45); stroke-width: 1.1; }
.fb-glass-spec { fill: rgba(255,255,255,0.7); pointer-events: none; }
.chart-area { opacity: .5; }

.fb-reveal-item { opacity: 0; animation: fb-rise .45s var(--fb-ease) forwards; }
@keyframes fb-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes fb-fade { to { opacity: 1; } }

.flow { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.flow-node {
  position: relative; width: 100%; text-align: center; padding: 11px 14px;
  border-radius: 14px; font-size: 13px; color: var(--fb-fg);
  border: 1px solid rgba(255,255,255,0.20);
  background:
    linear-gradient(160deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03)),
    color-mix(in srgb, var(--fb-accent) 15%, rgba(18,20,26,0.5));
  -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%);
  box-shadow: 0 8px 22px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.30);
}
.flow-edge { color: var(--fb-accent); font-size: 16px; line-height: 1; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--fb-accent) 60%, transparent)); }

.wf { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.wf-node {
  padding: 10px 14px; border-radius: 14px; font-size: 12.5px; text-align: center;
  color: var(--fb-fg); border: 1px solid rgba(255,255,255,0.20);
  background:
    linear-gradient(160deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03)),
    color-mix(in srgb, var(--fb-accent) 15%, rgba(18,20,26,0.5));
  -webkit-backdrop-filter: blur(12px) saturate(150%); backdrop-filter: blur(12px) saturate(150%);
  box-shadow: 0 8px 22px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.30);
}
.wf-start, .wf-end { border-radius: 999px; }
.wf-decision {
  font-style: italic;
  background: linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)), color-mix(in srgb, var(--fb-accent) 8%, rgba(18,20,26,0.5));
}
.wf-arrow { color: var(--fb-accent); font-size: 13px; white-space: nowrap; filter: drop-shadow(0 0 6px color-mix(in srgb, var(--fb-accent) 55%, transparent)); }

.graph svg, .cdiag svg, .chart svg { display: block; width: 100%; height: auto; overflow: visible; }
.fb-arrow-head { fill: var(--fb-accent); }
.graph-edge, .cdiag-edge { stroke: color-mix(in srgb, var(--fb-accent) 55%, rgba(255,255,255,0.25)); stroke-width: 1.6; stroke-linecap: round; }
.graph-node text, .cdiag-box text { fill: var(--fb-fg); font-size: 10px; font-weight: 500; }

.chart-title { font-size: 12px; color: var(--fb-muted); margin-bottom: 6px; }
.chart-val { fill: var(--fb-fg); font-size: 9px; }
.chart-axis { fill: var(--fb-muted); font-size: 9px; }
.chart-line { fill: none; stroke: var(--fb-accent); stroke-width: 2.4; stroke-linejoin: round; stroke-linecap: round; }
.chart-dot circle { fill: #fff; stroke: var(--fb-accent); stroke-width: 1.6; }
.chart-slice { fill: url(#fbAccentFill); opacity: calc(0.95 - var(--i, 0) * 0.12); stroke: rgba(255,255,255,0.35); stroke-width: 1; }

.roi { display: flex; flex-direction: column; gap: 10px; }
.roi-row { display: grid; grid-template-columns: 92px 1fr 62px; align-items: center; gap: 8px; font-size: 12px; color: var(--fb-muted); }
.roi-row input[type=range] { width: 100%; accent-color: var(--fb-accent); }
.roi-row .val { text-align: right; color: var(--fb-fg); }
.roi-result { display: flex; justify-content: space-around; gap: 12px; margin-top: 6px; padding-top: 10px; border-top: 1px solid var(--fb-border); }
.roi-result > div { display: flex; flex-direction: column; align-items: center; }
.roi-label { font-size: 11px; color: var(--fb-faint); }
.roi-pos { color: var(--fb-pos); font-weight: 600; font-size: 16px; }
.roi-neg { color: var(--fb-neg); font-weight: 600; font-size: 16px; }

table.cmp { width: 100%; border-collapse: collapse; font-size: 12px; }
table.cmp th, table.cmp td { border: 1px solid var(--fb-border); padding: 6px 8px; text-align: left; }
table.cmp th { color: var(--fb-accent); font-weight: 600; }

.mindmap svg, .timeline svg, .sankey svg { display: block; width: 100%; height: auto; overflow: visible; }
.fb-tip {
  position: absolute; z-index: 6; pointer-events: none; max-width: 210px;
  padding: 6px 9px; border-radius: 10px; font-size: 11.5px; line-height: 1.35;
  color: var(--fb-fg); background: rgba(14,15,19,0.94);
  border: 1px solid var(--fb-border); box-shadow: 0 10px 26px rgba(0,0,0,0.55);
}
.mm-edge { stroke: color-mix(in srgb, var(--fb-accent) 45%, rgba(255,255,255,0.2)); stroke-width: 1.4; }
.mm-edge-sub { stroke-dasharray: 3 3; opacity: .7; }
.mm-node text { fill: var(--fb-fg); font-size: 10px; font-weight: 500; }
.mm-node-sub text { font-size: 9px; }
.mm-root rect { stroke: var(--fb-accent); stroke-width: 1.4; }
.mm-badge { fill: var(--fb-accent); }
.mm-badge-t { fill: #15130c; font-size: 11px; font-weight: 700; pointer-events: none; }

.tl-axis { stroke: color-mix(in srgb, var(--fb-accent) 50%, rgba(255,255,255,0.2)); stroke-width: 2; stroke-linecap: round; }
.tl-date { fill: var(--fb-accent); font-size: 9px; font-weight: 600; }
.tl-label { fill: var(--fb-fg); font-size: 9.5px; }

.sk-link { fill: url(#fbAccentFill); opacity: .48; transition: opacity .15s ease; }
.sk-link:hover { opacity: .85; }
.sk-label { fill: var(--fb-fg); font-size: 9px; }

.cfg, .sim { display: flex; flex-direction: column; gap: 9px; }
.cfg-row, .sim-row { display: grid; grid-template-columns: 96px 1fr 58px; align-items: center; gap: 8px; font-size: 12px; color: var(--fb-muted); }
.cfg-row input[type=range], .sim-row input[type=range] { width: 100%; accent-color: var(--fb-accent); }
.cfg-val, .sim-slider-val { text-align: right; color: var(--fb-fg); }
.cfg-row label, .sim-row label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cfg-toggle { width: 18px; height: 18px; accent-color: var(--fb-accent); justify-self: start; }
.cfg-select { grid-column: 2 / 4; background: var(--fb-bg); color: var(--fb-fg); border: 1px solid var(--fb-border); border-radius: 8px; padding: 5px 8px; font: inherit; font-size: 12px; }
.cfg-out { display: flex; justify-content: space-around; gap: 12px; margin-top: 4px; padding-top: 10px; border-top: 1px solid var(--fb-border); }
.cfg-out > div { display: flex; flex-direction: column; align-items: center; }
.cfg-out-val { font-weight: 700; font-size: 17px; color: var(--fb-accent); }
.cfg-out-label { font-size: 11px; color: var(--fb-faint); }
.sim-chart { display: flex; flex-direction: column; gap: 7px; margin-bottom: 4px; }
.sim-bar-row { display: grid; grid-template-columns: 84px 1fr 56px; align-items: center; gap: 8px; font-size: 11.5px; }
.sim-bar-name { color: var(--fb-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sim-bar-track { height: 14px; border-radius: 7px; background: rgba(255,255,255,0.06); overflow: hidden; }
.sim-bar-fill { height: 100%; border-radius: 7px; background: linear-gradient(90deg, color-mix(in srgb, var(--fb-accent) 55%, transparent), var(--fb-accent)); transition: width .18s ease; }
.sim-bar-val { text-align: right; color: var(--fb-fg); }

.tabs-bar { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; }
.tabs-tab { font-size: 12px; padding: 6px 11px; border-radius: 10px; cursor: pointer; font: inherit; color: var(--fb-muted); background: transparent; border: 1px solid var(--fb-border); transition: color .18s var(--fb-ease), background .18s var(--fb-ease); }
.tabs-tab:hover { color: var(--fb-fg); }
.tabs-tab.active { color: #15130c; background: var(--fb-accent); border-color: var(--fb-accent); font-weight: 600; }
.tabs-tab:active { transform: scale(.96); }
.tabs-panel { font-size: 13px; line-height: 1.5; color: var(--fb-fg); white-space: pre-wrap; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   DESIGN LEVEL 2 \u2014 "The Presence": an Aura you step inside.
   The volumetric smoke field (ParticleField) is the star; the HUD is a
   whisper of chrome around it.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.l2 { position: fixed; inset: 0; z-index: var(--fb-z-base); pointer-events: none; }
.l2-hidden { display: none !important; }
.l2-scrim {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 90% at 50% 60%, transparent 40%, color-mix(in srgb, var(--fb-void) 55%, transparent) 100%);
}
.l2-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }

/* state-of-light readout \u2014 quiet, letterspaced, centred at the brow */
.l2-status {
  position: absolute; left: 50%; top: 24px; transform: translateX(-50%);
  font-size: 10.5px; letter-spacing: 3px; text-transform: uppercase;
  color: color-mix(in srgb, var(--fb-accent) 55%, rgba(214,216,224,0.55));
  pointer-events: none; transition: color .4s var(--fb-ease);
}
.l2[data-state="listening"] .l2-status { color: color-mix(in srgb, var(--fb-silver) 80%, transparent); }

.l2-close {
  position: absolute; right: 22px; top: 18px; pointer-events: auto;
  background: none; border: none; color: rgba(220,222,232,0.5); cursor: pointer;
  padding: 8px; border-radius: 10px; transition: color .2s var(--fb-ease), background .2s var(--fb-ease);
}
.l2-close:hover { color: var(--fb-fg); background: rgba(255,255,255,0.06); }
.l2-close svg { width: 20px; height: 20px; }

/* a reactive halo ring centred on the presence \u2014 scales with live amplitude */
.l2-halo {
  position: absolute; left: 50%; top: 45%; transform: translate(-50%,-50%) scale(calc(1 + var(--fb-energy) * .5));
  width: 240px; height: 240px; border-radius: 50%; pointer-events: none; z-index: 1;
  border: 1px solid color-mix(in srgb, var(--fb-accent) 22%, transparent);
  box-shadow: 0 0 calc(40px + var(--fb-energy) * 120px) -10px color-mix(in srgb, var(--fb-accent) 45%, transparent);
  opacity: 0; transition: opacity .8s var(--fb-ease);
}
.l2.awake .l2-halo { opacity: .7; }
.l2[data-state="listening"] .l2-halo { border-color: color-mix(in srgb, var(--fb-silver) 30%, transparent); box-shadow: 0 0 calc(40px + var(--fb-energy) * 120px) -10px color-mix(in srgb, var(--fb-silver) 45%, transparent); }

/* "Awaken" \u2014 the invitation. A breathing ring of light, not a play button. */
.l2-play {
  position: absolute; left: 50%; top: 45%; transform: translate(-50%,-50%);
  width: 104px; height: 104px; border-radius: 50%; pointer-events: auto; cursor: pointer;
  border: 1px solid color-mix(in srgb, var(--fb-accent) 60%, transparent);
  background: radial-gradient(circle at 40% 34%, color-mix(in srgb, var(--fb-accent) 26%, rgba(16,14,9,0.5)), rgba(14,12,8,0.45));
  color: var(--fb-gold-bright);
  display: grid; place-items: center;
  box-shadow: 0 0 70px -10px color-mix(in srgb, var(--fb-accent) 55%, transparent), inset 0 1px 0 rgba(255,255,255,0.2);
  transition: opacity .6s var(--fb-ease), transform .3s var(--fb-ease-spring);
  isolation: isolate;
}
.l2-play::after {
  content: ""; position: absolute; inset: -8px; border-radius: 50%; z-index: -1;
  border: 1px solid color-mix(in srgb, var(--fb-accent) 45%, transparent);
  animation: fb-breathe calc(var(--fb-breath) * .8) var(--fb-ease) infinite;
}
.l2-play:hover { transform: translate(-50%,-50%) scale(1.06); }
.l2-play svg { width: 38px; height: 38px; margin-left: 5px; }
.l2-hint {
  position: absolute; left: 50%; top: calc(45% + 78px); transform: translateX(-50%);
  font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
  color: color-mix(in srgb, var(--fb-accent) 45%, rgba(214,216,224,0.5)); pointer-events: none;
  animation: fb-fade-loop 3.4s var(--fb-ease) infinite;
}
@keyframes fb-fade-loop { 0%,100% { opacity: .35; } 50% { opacity: .85; } }

/* fading message column \u2014 luxurious, legible over moving smoke */
.l2-stack {
  position: absolute; right: 3vw; bottom: 104px; left: auto; pointer-events: none;
  width: min(360px, 42vw);
  display: flex; flex-direction: column; gap: 10px; align-items: flex-end; text-align: right;
}
.l2-msg {
  font-size: 16px; line-height: 1.5; letter-spacing: .2px; color: #d6dae3;
  max-width: 100%; text-shadow: 0 1px 3px rgba(0,0,0,0.9), 0 2px 22px rgba(0,0,0,0.6);
  transition: opacity .6s var(--fb-ease), transform .6s var(--fb-ease);
}
.l2-msg.agent { color: #f6f1e3; font-weight: 450; }

/* centred drawing surface \u2014 molten glass over the smoke */
.l2-draw {
  position: absolute; left: 50%; top: 43%;
  width: min(640px, 88vw); max-height: 64vh; overflow: auto; pointer-events: auto;
  display: flex; flex-direction: column; gap: 14px;
  opacity: 0; transform: translate(-50%, calc(-50% + 16px)); transition: opacity .55s var(--fb-ease), transform .55s var(--fb-ease);
}
.l2-draw.show { opacity: 1; transform: translate(-50%,-50%); }
.l2-draw .card {
  -webkit-backdrop-filter: blur(30px) saturate(180%); backdrop-filter: blur(30px) saturate(180%);
  box-shadow: 0 30px 80px -18px rgba(0,0,0,0.78), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -26px 56px -34px rgba(0,0,0,0.8);
}

.l2-input {
  position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%);
  width: min(720px, 92vw); display: flex; gap: 10px; align-items: center; pointer-events: auto;
}
.l2-input textarea {
  flex: 1; resize: none; height: 52px; max-height: 130px; padding: 15px 20px;
  border-radius: 999px; border: 1px solid rgba(255,255,255,0.14);
  background: rgba(16,17,22,0.5); color: #eef1f5; font: inherit; font-size: 15px; outline: none;
  -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
  transition: border-color .2s var(--fb-ease), box-shadow .2s var(--fb-ease), background .2s var(--fb-ease);
}
.l2-input textarea::placeholder { color: rgba(220,225,235,0.4); }
.l2-input textarea:focus { border-color: color-mix(in srgb, var(--fb-accent) 60%, transparent); background: rgba(20,21,28,0.62); box-shadow: 0 0 0 3px color-mix(in srgb, var(--fb-accent) 18%, transparent); }
.l2-send {
  width: 52px; height: 52px; flex: none; border-radius: 50%; cursor: pointer; pointer-events: auto;
  border: 1px solid color-mix(in srgb, var(--fb-accent) 60%, transparent); color: var(--fb-gold-bright);
  background: linear-gradient(180deg, color-mix(in srgb, var(--fb-accent) 30%, rgba(16,14,9,0.5)), rgba(16,14,9,0.5));
  display: grid; place-items: center;
  box-shadow: 0 8px 26px -10px color-mix(in srgb, var(--fb-accent) 60%, transparent);
  transition: transform .18s var(--fb-ease), background .18s var(--fb-ease);
}
.l2-send:hover { background: color-mix(in srgb, var(--fb-accent) 40%, rgba(16,14,9,0.5)); }
.l2-send:active { transform: scale(.93); }
.l2-send svg { width: 20px; height: 20px; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   DESIGN LEVEL 3 \u2014 "The Atmosphere": an Aura dissolved into the page.
   No widget. The agent is the light in the room: a breathing edge-aura, a
   spotlight that illuminates whatever Pragya references, glass captions
   anchored to content, and a \u2318K / long-press summon.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.l3 { position: fixed; inset: 0; z-index: var(--fb-z-base); pointer-events: none; }
.l3-hidden { display: none !important; }

/* breathing rim-light \u2014 the agent's presence at the edge of vision */
.l3-aura {
  position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0;
  transition: opacity 1s var(--fb-ease);
  box-shadow:
    inset 0 0 calc(70px + var(--fb-energy) * 150px) calc(-22px) color-mix(in srgb, var(--fb-accent) 42%, transparent),
    inset 0 0 2px 0 color-mix(in srgb, var(--fb-gold-bright) 30%, transparent);
}
.l3.awake .l3-aura { opacity: 1; animation: fb-aura-breath calc(var(--fb-breath) * 1.4) var(--fb-ease) infinite; }
.l3[data-state="listening"] .l3-aura { box-shadow: inset 0 0 calc(70px + var(--fb-energy) * 150px) -22px color-mix(in srgb, var(--fb-silver) 45%, transparent); }
.l3[data-state="thinking"] .l3-aura { animation-duration: calc(var(--fb-breath) * .8); }
@keyframes fb-aura-breath { 0%,100% { opacity: .65; } 50% { opacity: 1; } }

/* spotlight \u2014 dims the page and opens a soft window over the referenced spot */
.l3-veil {
  position: fixed; inset: 0; pointer-events: none; z-index: 2; opacity: 0;
  transition: opacity .7s var(--fb-ease);
  background: radial-gradient(circle var(--l3-r, 220px) at var(--l3-x, 50%) var(--l3-y, 40%),
    transparent 0%, transparent 55%, color-mix(in srgb, var(--fb-void) 78%, transparent) 100%);
}
.l3.spotlight .l3-veil { opacity: 1; }
.l3-ring {
  position: fixed; pointer-events: none; z-index: 3; border-radius: 18px; opacity: 0;
  left: var(--l3-rx, 0px); top: var(--l3-ry, 0px); width: var(--l3-rw, 0px); height: var(--l3-rh, 0px);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--fb-accent) 60%, transparent), 0 0 40px -4px color-mix(in srgb, var(--fb-accent) 55%, transparent);
  transition: opacity .6s var(--fb-ease), left .6s var(--fb-ease), top .6s var(--fb-ease), width .6s var(--fb-ease), height .6s var(--fb-ease);
}
.l3.spotlight .l3-ring { opacity: 1; }

/* floating glass captions \u2014 Pragya's words, anchored to the page */
.l3-caps {
  position: fixed; left: 50%; bottom: 4vh; transform: translateX(-50%); z-index: 5;
  width: min(560px, 92vw); display: flex; flex-direction: column; gap: 10px;
  align-items: center; pointer-events: none;
}
.l3-cap {
  pointer-events: auto; max-width: 100%; padding: 14px 18px; border-radius: 18px;
  font-size: 15px; line-height: 1.5; color: var(--fb-fg); text-wrap: pretty;
  animation: fb-rise-in .5s var(--fb-ease) both;
  transition: opacity .6s var(--fb-ease), transform .6s var(--fb-ease);
}
.l3-cap.user { color: var(--fb-silver-bright); font-size: 14px; }
.l3-cap .grounding { margin-top: 8px; }

/* the summon \u2014 a centred Aura with a prompt; appears on \u2318K / long-press */
.l3-seed {
  position: fixed; bottom: 26px; right: 26px; z-index: 6; width: 16px; height: 16px;
  border-radius: 50%; pointer-events: auto; cursor: pointer; border: none; padding: 0;
  background: radial-gradient(circle at 40% 36%, var(--fb-gold-bright), var(--fb-accent) 75%);
  box-shadow: 0 0 18px -2px color-mix(in srgb, var(--fb-accent) 70%, transparent);
  animation: fb-breathe var(--fb-breath) var(--fb-ease) infinite;
  transition: transform .3s var(--fb-ease-spring);
}
:host([data-position="bottom-left"]) .l3-seed { left: 26px; right: auto; }
.l3-seed:hover { transform: scale(1.5); }

.l3-summon {
  position: fixed; left: 50%; top: 38%; transform: translate(-50%,-50%) scale(.96); z-index: 7;
  width: min(560px, 92vw); pointer-events: auto; padding: 26px 24px 18px;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  opacity: 0; transition: opacity .4s var(--fb-ease), transform .4s var(--fb-ease-spring);
}
.l3.summoning .l3-summon { opacity: 1; transform: translate(-50%,-50%) scale(1); }
.l3-summon-backdrop {
  position: fixed; inset: 0; z-index: 6; pointer-events: none; opacity: 0;
  background: radial-gradient(120% 90% at 50% 38%, color-mix(in srgb, var(--fb-void) 40%, transparent), color-mix(in srgb, var(--fb-void) 82%, transparent));
  -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px);
  transition: opacity .4s var(--fb-ease);
}
.l3.summoning .l3-summon-backdrop { opacity: 1; pointer-events: auto; }
.l3-orb { width: 96px; height: 96px; display: block; }
.l3-summon-input {
  width: 100%; display: flex; gap: 10px; align-items: center;
}
.l3-summon-input textarea {
  flex: 1; resize: none; height: 52px; max-height: 120px; padding: 15px 20px;
  border-radius: 999px; border: 1px solid rgba(255,255,255,0.16);
  background: rgba(16,17,22,0.55); color: #eef1f5; font: inherit; font-size: 15px; outline: none;
  -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
  transition: border-color .2s var(--fb-ease), box-shadow .2s var(--fb-ease);
}
.l3-summon-input textarea::placeholder { color: rgba(220,225,235,0.4); }
.l3-summon-input textarea:focus { border-color: color-mix(in srgb, var(--fb-accent) 60%, transparent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--fb-accent) 18%, transparent); }
.l3-summon-send {
  width: 52px; height: 52px; flex: none; border-radius: 50%; cursor: pointer;
  border: 1px solid color-mix(in srgb, var(--fb-accent) 60%, transparent); color: var(--fb-gold-bright);
  background: linear-gradient(180deg, color-mix(in srgb, var(--fb-accent) 30%, rgba(16,14,9,0.5)), rgba(16,14,9,0.5));
  display: grid; place-items: center; transition: transform .18s var(--fb-ease), background .18s var(--fb-ease);
}
.l3-summon-send:hover { background: color-mix(in srgb, var(--fb-accent) 40%, rgba(16,14,9,0.5)); }
.l3-summon-send:active { transform: scale(.93); }
.l3-summon-send svg { width: 20px; height: 20px; }
.l3-summon-hint {
  font-size: 10.5px; letter-spacing: 2.5px; text-transform: uppercase;
  color: color-mix(in srgb, var(--fb-accent) 45%, rgba(214,216,224,0.5));
}
.l3-summon-hint kbd {
  font: inherit; font-size: 10px; padding: 2px 6px; border-radius: 6px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); color: var(--fb-fg);
}

@media (max-width: 480px) {
  .l2-input, .l3-caps { bottom: calc(26px + env(safe-area-inset-bottom, 0px)); }
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   EXTREME \u2014 runtime-generated full-page surface. Themed by the site's
   design tokens (--ds-*), with molten-obsidian fallbacks.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
.fbpage {
  position: fixed; inset: 0; z-index: var(--fb-z-page); overflow-y: auto; pointer-events: auto;
  background: var(--ds-color-background, var(--fb-void)); color: var(--ds-color-text, var(--fb-fg));
  font-family: var(--ds-font, "Geist", ui-sans-serif, system-ui, sans-serif);
  font-size: var(--ds-base-size, 16px);
}
.fbpage-bar {
  position: sticky; top: 0; z-index: 1; display: flex; align-items: center; gap: 10px;
  justify-content: space-between; padding: 14px 5vw;
  background: color-mix(in srgb, var(--ds-color-surface, var(--fb-surface)) 80%, transparent);
  -webkit-backdrop-filter: blur(18px); backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.fbpage-brand { font-weight: 700; color: var(--ds-color-primary, var(--fb-accent)); letter-spacing: -.01em; }
.fbpage-back {
  background: none; border: 1px solid var(--ds-color-primary, var(--fb-accent));
  color: var(--ds-color-primary, var(--fb-accent)); border-radius: 999px;
  padding: 7px 16px; font: inherit; font-size: 13px; cursor: pointer;
  transition: background .18s var(--fb-ease), color .18s var(--fb-ease);
}
.fbpage-back:hover { background: color-mix(in srgb, var(--ds-color-primary, var(--fb-accent)) 16%, transparent); }
.fbpage-inner { max-width: 1000px; margin: 0 auto; padding: 8px 5vw 96px; display: flex; flex-direction: column; gap: 34px; }
.fbpage-h2 { font-size: 1.6rem; font-family: var(--ds-font-heading, inherit); margin: 0 0 12px; letter-spacing: -.01em; }
.fbpage-body { line-height: 1.65; color: var(--ds-color-text, var(--fb-fg)); opacity: .92; max-width: 70ch; }
.fbpage-hero { text-align: center; padding: 56px 0 28px; }
.fbpage-hero-title { font-size: clamp(2rem, 5vw, 3.4rem); margin: 0 0 16px; font-family: var(--ds-font-heading, inherit); color: var(--ds-color-primary, var(--fb-accent)); letter-spacing: -.02em; text-wrap: balance; }
.fbpage-hero-sub { font-size: 1.15rem; opacity: .85; max-width: 60ch; margin: 0 auto 24px; line-height: 1.55; }
.fbpage-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }
.fbpage-card {
  background: color-mix(in srgb, var(--ds-color-surface, var(--fb-surface)) 70%, transparent);
  -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1); border-radius: var(--ds-radius, 18px); padding: 20px;
}
.fbpage-card-title { margin: 0 0 8px; font-size: 1.1rem; }
.fbpage-card p { margin: 0; opacity: .85; line-height: 1.55; }
.fbpage-price { font-size: 1.7rem; font-weight: 700; color: var(--ds-color-primary, var(--fb-accent)); margin: 6px 0 10px; }
.fbpage-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; opacity: .9; font-size: .95rem; }
.fbpage-features li::before { content: "\u2713 "; color: var(--ds-color-primary, var(--fb-accent)); }
.fbpage-btn {
  display: inline-block; border: none; cursor: pointer; font: inherit; font-weight: 600;
  padding: 13px 26px; border-radius: var(--ds-radius, 14px);
  background: var(--ds-color-primary, var(--fb-accent)); color: var(--ds-color-background, #15130c);
  transition: filter .18s var(--fb-ease), transform .18s var(--fb-ease);
}
.fbpage-btn:hover { filter: brightness(1.08); }
.fbpage-btn:active { transform: translateY(1px) scale(.99); }
.fbpage-btn:disabled { opacity: .6; cursor: default; }
.fbpage-form { display: flex; flex-direction: column; gap: 12px; max-width: 480px; }
.fbpage-field { display: flex; flex-direction: column; gap: 5px; font-size: .9rem; opacity: .9; }
.fbpage-field input, .fbpage-field textarea {
  font: inherit; padding: 11px 13px; border-radius: 12px; color: var(--ds-color-text, var(--fb-fg));
  border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.05); outline: none;
}
.fbpage-field textarea { min-height: 90px; resize: vertical; }
.fbpage-field input:focus, .fbpage-field textarea:focus { border-color: var(--ds-color-primary, var(--fb-accent)); }
.fbpage-media { max-width: 100%; border-radius: var(--ds-radius, 16px); }
.fbpage-caption { font-size: .85rem; opacity: .6; margin-top: 6px; }

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   ACCESSIBILITY \u2014 focus rings, contrast, reduced motion (non-negotiable).
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
:host *:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--fb-accent) 82%, white 8%);
  outline-offset: 2px; border-radius: 10px;
}
@media (prefers-contrast: more) {
  :host { --fb-border: rgba(255,255,255,0.30); --fb-muted: #cbd2dd; }
  .card { border-color: rgba(255,255,255,0.34); }
  .bubble.pragya { border-left-color: var(--fb-gold-bright); }
}
@media (prefers-reduced-motion: reduce) {
  :host *, :host *::before, :host *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
  .fb-reveal-item, .bubble, .l3-cap { opacity: 1 !important; transform: none !important; }
  .trigger::after, .l2-play::after, .l3-seed, .panel::after, .l2-hint { animation: none !important; }
  .trigger::after { opacity: 0 !important; }
}
`;var Na={mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'};function Gt(i,t,e){let n=document.createElement(i);return t&&(n.className=t),e&&(n.textContent=e),n}function Jm(){return typeof window!="undefined"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}var dn=class extends HTMLElement{constructor(){super(...arguments);this._options={};this.thinkingEl=null;this.built=!1;this.open=!1;this.auraState="dormant";this.connText="online";this.thinking=!1;this.speakingUntil=0;this.reactRaf=0}set options(e){this._options=e,this.built&&(this.config=cr({...Ei(this),...this._options}))}connectedCallback(){this.built||(this.config=cr({...Ei(this),...this._options}),this.style.setProperty("--fb-accent",this.config.accent),this.setAttribute("data-position",this.config.position),this.setAttribute("data-design",this.config.design),this.build(),this.built=!0,this.config.design==="level1"&&this.config.autoStart&&requestAnimationFrame(()=>this.openPanel()))}disconnectedCallback(){var e,n,s,r,o;this.reactRaf&&cancelAnimationFrame(this.reactRaf),(e=this.triggerAura)==null||e.dispose(),(n=this.avatarAura)==null||n.dispose(),(s=this.level2)==null||s.dispose(),(r=this.level3)==null||r.dispose(),(o=this.session)==null||o.destroy()}build(){let e=this.attachShadow({mode:"open"}),n=document.createElement("style");if(n.textContent=rc,e.appendChild(n),e.appendChild(Gt("div","fb-grain")),this.config.intelligence==="extreme"&&this.setupPageSurface(e),this.config.design==="level2"){this.buildLevel2(e);return}if(this.config.design==="level3"){this.buildLevel3(e);return}this.buildPanel(e)}setupPageSurface(e){let n=document.createElement("div");n.className="fbpage hidden";let s=document.createElement("div");s.className="fbpage-bar",s.append(Gt("div","fbpage-brand","Pragya"));let r=Gt("button","fbpage-back","Close");r.addEventListener("click",()=>n.classList.add("hidden")),s.append(r);let o=Gt("div","fbpage-inner");n.append(s,o),e.appendChild(n),this.pageSurface=n,this.pageRenderer=new nr(o,a=>this.onEnquiry(a)),Wa(this.config.api,this.config.site).then(a=>{if(a){Xa(n,a.tokens);let l=s.querySelector(".fbpage-brand");l&&a.name&&(l.textContent=a.name)}})}renderPage(e){!this.pageRenderer||!this.pageSurface||(this.pageSurface.classList.remove("hidden"),this.pageRenderer.render(e))}onEnquiry(e){let n=e.operationId?` using ${e.operationId}`:"";this.session.sendText(`Please submit this enquiry${n}: ${JSON.stringify(e.values)}`)}buildLevel2(e){let n=new fn(this.config.hooks),s=new Qs(e,this.config,{primeAudio:()=>this.session.primeAudio(),connect:()=>this.session.connect(),startVoice:()=>void this.session.startVoice(),stopVoice:()=>this.session.stopVoice(),submitText:r=>this.submitText(r),notifyRendered:r=>this.session.notifyRendered(r),reportComponentState:(r,o)=>this.session.reportComponentState(r,o),inputLevel:()=>this.session.inputLevel(),outputLevel:()=>this.session.outputLevel()});this.level2=s,this.session=new pn(this.config,n,{onStatus:r=>s.setStatus(r),onUserTranscript:(r,o)=>{!o&&r&&s.userMessage(r)},onAgentMessage:(r,o)=>s.agentMessage(r,o),onComponent:r=>s.addComponent(r),onPatch:(r,o)=>s.patch(r,o),onSystem:r=>s.systemMessage(r),onPage:r=>this.renderPage(r),onAgentAudio:()=>s.agentAudioTick(),onTourStatus:r=>s.setTourStatus(r)}),this.session.enableWelcome(()=>this.pageContext())}buildLevel3(e){let n=new fn(this.config.hooks),s=new tr(e,this.config,{primeAudio:()=>this.session.primeAudio(),connect:()=>this.session.connect(),startVoice:()=>void this.session.startVoice(),stopVoice:()=>this.session.stopVoice(),submitText:r=>this.submitText(r),notifyRendered:r=>this.session.notifyRendered(r),reportComponentState:(r,o)=>this.session.reportComponentState(r,o),inputLevel:()=>this.session.inputLevel(),outputLevel:()=>this.session.outputLevel()});this.level3=s,this.session=new pn(this.config,n,{onStatus:r=>s.setStatus(r),onUserTranscript:(r,o)=>{!o&&r&&s.userMessage(r)},onAgentMessage:(r,o)=>s.agentMessage(r,o),onComponent:r=>s.addComponent(r),onPatch:(r,o)=>s.patch(r,o),onSystem:r=>s.systemMessage(r),onPage:r=>this.renderPage(r),onAgentAudio:()=>s.agentAudioTick(),onTourStatus:r=>s.setTourStatus(r)}),this.session.enableWelcome(()=>this.pageContext())}buildPanel(e){let n=Jm();this.trigger=Gt("button","trigger"),this.trigger.setAttribute("aria-label","Talk to Pragya");let s=document.createElement("canvas");s.className="trigger-aura",this.trigger.append(s),this.trigger.addEventListener("click",()=>this.toggle()),n||this.bindMagnetic(this.trigger),e.appendChild(this.trigger),this.panel=Gt("div","panel hidden"),this.panel.setAttribute("data-state","dormant");let r=Gt("div","header"),o=Gt("div","profile"),a=Gt("div","avatar"),l=document.createElement("canvas");a.append(l);let c=Gt("div");c.append(Gt("div","name","Pragya")),this.statusEl=Gt("span","status"),this.statusEl.append(Gt("span","dot"),document.createTextNode(" online")),c.append(this.statusEl),o.append(a,c);let h=Gt("button","icon-btn");h.setAttribute("aria-label","Close"),h.innerHTML=Na.close,h.addEventListener("click",()=>this.close()),r.append(o,h),this.panel.append(r),this.messagesEl=Gt("div","messages"),this.canvasEl=Gt("div","canvas"),this.messagesEl.append(this.canvasEl),this.panel.append(this.messagesEl);let u=Gt("div","chips");["Show me pricing","How do you integrate?","Give me a quick tour"].forEach(p=>{let d=Gt("button","chip",p);d.addEventListener("click",()=>this.submitText(p)),u.append(d)}),this.panel.append(u);let f=Gt("div","input");this.textarea=Gt("textarea"),this.textarea.placeholder="Speak, or type a question\u2026",this.textarea.setAttribute("aria-label","Message Pragya"),this.textarea.addEventListener("keydown",p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),this.submitText(this.textarea.value),this.textarea.value="")}),this.micBtn=Gt("button","in-btn"),this.micBtn.innerHTML=Na.mic,this.micBtn.title="Hold a conversation by voice",this.micBtn.setAttribute("aria-label","Toggle voice"),this.micBtn.addEventListener("click",()=>this.toggleVoice()),this.voiceEnabled||this.micBtn.classList.add("hidden");let m=Gt("button","in-btn");m.innerHTML=Na.send,m.title="Send",m.setAttribute("aria-label","Send"),m.addEventListener("click",()=>{this.submitText(this.textarea.value),this.textarea.value=""}),f.append(this.textarea,this.micBtn,m),this.panel.append(f),e.appendChild(this.panel);let g=new fn(this.config.hooks);this.canvas=new Ye(this.canvasEl,p=>this.session.notifyRendered(p),(p,d)=>this.session.reportComponentState(p,d)),this.session=new pn(this.config,g,{onStatus:p=>{this.connText=p==="open"?"voice ready":p==="failed"?"text mode":"online",this.auraState==="dormant"&&this.updateStatusText()},onUserTranscript:(p,d)=>{d||(this.canvas.clear(),p&&(this.addMessage("user",p),this.showThinking()))},onAgentMessage:(p,d)=>{this.hideThinking(),this.addMessage("pragya",p,d),this.markSpeaking()},onComponent:p=>{this.hideThinking(),this.canvas.add(p),this.markSpeaking(),this.scrollDown()},onPatch:(p,d)=>this.canvas.applyPatch(p,d),onSystem:p=>{this.hideThinking(),this.addMessage("system",p)},onPage:p=>{this.hideThinking(),this.renderPage(p)},onAgentAudio:()=>this.markSpeaking(),onTourStatus:p=>{this.connText=p?"guided tour":"online",this.auraState==="dormant"&&this.updateStatusText()}});let v=()=>Math.max(this.session.inputLevel(),this.session.outputLevel());this.triggerAura=new Yn(s,{accent:this.config.accent,reducedMotion:n}),this.triggerAura.start(),this.avatarAura=new Yn(l,{accent:this.config.accent,reducedMotion:n}),this.avatarAura.setEnergyProvider(v),this.avatarAura.start(),this.session.enableWelcome(()=>this.pageContext()),this.addMessage("pragya",this.config.greeting)}bindMagnetic(e){let n=r=>{let o=e.getBoundingClientRect(),a=(r.clientX-(o.left+o.width/2))/o.width,l=(r.clientY-(o.top+o.height/2))/o.height;e.style.transform=`translate(${a*7}px, ${l*7-3}px) scale(1.06)`},s=()=>{e.style.transform=""};e.addEventListener("pointermove",n),e.addEventListener("pointerleave",s),e.addEventListener("pointerdown",s)}get voiceEnabled(){return this.config.intelligence!=="basic"}setState(e){var n,s,r;e!==this.auraState&&(this.auraState=e,(n=this.panel)==null||n.setAttribute("data-state",e),(s=this.avatarAura)==null||s.setState(e),(r=this.triggerAura)==null||r.setState(e),this.updateStatusText())}updateStatusText(){var n;let e={dormant:this.connText,listening:"listening",thinking:"thinking",speaking:"speaking"};(n=this.statusEl)!=null&&n.lastChild&&(this.statusEl.lastChild.textContent=" "+e[this.auraState])}markSpeaking(){this.speakingUntil=(typeof performance!="undefined"?performance.now():Date.now())+650}startReactiveLoop(){if(typeof requestAnimationFrame!="function")return;let e=()=>{if(!this.open){this.reactRaf=0;return}this.reactRaf=requestAnimationFrame(e);let n=this.session.inputLevel(),s=this.session.outputLevel();this.style.setProperty("--fb-energy",Math.max(n,s).toFixed(3));let r=typeof performance!="undefined"?performance.now():Date.now();s>.04&&this.markSpeaking();let o;r<this.speakingUntil?o="speaking":this.thinking?o="thinking":n>.05?o="listening":o="dormant",this.setState(o)};this.reactRaf=requestAnimationFrame(e)}addMessage(e,n,s){let r=Gt("div",`bubble ${e}`);r.append(Gt("div",void 0,n)),s!=null&&s.found&&r.append(Gt("span","grounding",`grounded \xB7 ${(s.confidence*100).toFixed(0)}%`)),this.messagesEl.insertBefore(r,this.canvasEl),this.scrollDown()}showThinking(){if(this.thinking=!0,this.thinkingEl)return;let e=Gt("div","bubble pragya typing");e.append(Gt("span","dot"),Gt("span","dot"),Gt("span","dot")),e.setAttribute("aria-label","Pragya is thinking"),this.thinkingEl=e,this.messagesEl.insertBefore(e,this.canvasEl),this.scrollDown()}hideThinking(){this.thinking=!1,this.thinkingEl&&(this.thinkingEl.remove(),this.thinkingEl=null)}scrollDown(){this.messagesEl.scrollTop=this.messagesEl.scrollHeight}submitText(e){e.trim()&&this.session.sendText(e.trim())}toggleVoice(){this.session.active?(this.session.stopVoice(),this.micBtn.classList.remove("live")):(this.session.startVoice(),this.micBtn.classList.add("live"))}pageContext(){if(typeof location=="undefined")return{};let e=location.pathname+(location.hash||""),n=typeof document!="undefined"?document.title:"",s=location.hash?location.hash.slice(1):void 0;if(!s&&typeof document!="undefined"){let r=Array.from(document.querySelectorAll("h1,h2,h3")),o=window.innerHeight||800,a=r.find(l=>{let c=l.getBoundingClientRect();return c.top>=-48&&c.top<o*.6});s=((a==null?void 0:a.textContent)||"").trim().slice(0,80)||void 0}return{page:e,title:n,section:s,sections:this.pageSections()}}pageSections(){if(typeof document=="undefined")return[];try{let e=[],n=new Set;for(let s of Array.from(document.querySelectorAll("[id]"))){let r=s.id;if(!r||n.has(r))continue;let o=s.tagName.toLowerCase();if(!(o==="section"||["div","main","article"].includes(o)&&!!s.querySelector("h1,h2,h3,h4")))continue;let l=s.querySelector("h1,h2,h3,h4"),c=((l==null?void 0:l.textContent)||"").replace(/\s+/g," ").trim().slice(0,70);if(n.add(r),e.push({id:r,label:c}),e.length>=30)break}return e}catch{return[]}}ask(e){this.config.design==="level1"&&this.openPanel(),this.submitText(e)}toggle(){this.config.design==="level1"&&(this.open?this.close():this.openPanel())}openPanel(){this.config.design==="level1"&&(this.open=!0,this.trigger.classList.add("hidden"),this.panel.classList.remove("hidden"),this.voiceEnabled&&this.session.primeAudio(),this.session.connect(),this.startReactiveLoop())}close(){var e;this.open=!1,(e=this.session)==null||e.abortTour(),this.reactRaf&&(cancelAnimationFrame(this.reactRaf),this.reactRaf=0),this.panel.classList.add("hidden"),this.trigger.classList.remove("hidden"),this.setState("dormant")}};dn.tagName="fluid-buddha";var ac="0.1.0";function oc(){typeof customElements!="undefined"&&!customElements.get(dn.tagName)&&customElements.define(dn.tagName,dn)}function Ua(i={}){oc();let t=document.createElement(dn.tagName);return t.options=i,document.body.appendChild(t),t}oc();function Km(){if(typeof document=="undefined")return;let i=document.currentScript;(!i||!i.getAttribute("data-backend"))&&(i=document.querySelector("script[data-backend]"));let t=Ei(i);if(!t.backend||t.autoInject===!1)return;let e=()=>Ua(t);document.body?e():document.addEventListener("DOMContentLoaded",e,{once:!0})}Km();var jm={init:Ua,VERSION:ac};return xc(Qm);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=fluid-buddha.global.js.map
