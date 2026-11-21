/* Hero background: dithered mountains as a 1-bit bitmap. The screen is a grid of 3px pixels,
   each one either on, in one orange ink, or off; an 8x8 Bayer matrix decides which, so every
   tone (lit face, shaded face, haze, the fade into the ground) is drawn by pattern density. Three ranges of ridged noise,
   fainter with distance like haze, faces lit or shaded by slope (light from the left), each
   range drifting at its own parallax speed. A small flock of gull-shaped birds, drawn in the
   same dots, wanders the sky and scatters from the cursor. Runs at ~30fps only while the hero
   is on screen. */
import { loopWhileVisible, on, pageZoom, prefersReducedMotion } from '../lib/motion.js';

const FS = [
  'precision highp float;uniform vec2 res;uniform float t,pitch;uniform vec4 B[7];',
  'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
  'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}',
  'float b2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}',
  'float b8(vec2 a){return (b2(.25*a)*.25+b2(.5*a))*.25+b2(a);}',
  // ridged 1D noise: sharp peaks, soft valleys
  'float ridge(float x,float s,int n){float v=0.,a=.62,f=1.;for(int k=0;k<5;k++){if(k>=n)break;float r=1.-abs(vn(vec2(x*f,s+float(k)*7.))*2.-1.);v+=pow(r,2.2)*a;f*=2.1;a*=.38;}return v;}',
  'float range(float x,float s,float base,float amp){return base+amp*pow(ridge(x,s,5),1.6);}',
  // facets come from the broad shape only, so light and shade fall in big planes
  'float broad(float x,float s){return ridge(x,s,2);}',
  'float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;return length(pa-ba*clamp(dot(pa,ba)/dot(ba,ba),0.,1.));}',
  // a bird: two bent wings mirrored about its centre; B = x, y, flap (-1 down .. 1 up), half span
  'float bird(vec2 p,vec4 b){vec2 q=p-b.xy;float s=b.w;if(abs(q.x)>s*1.2||abs(q.y)>s)return 0.;q.x=abs(q.x);vec2 m=vec2(.45*s,.3*s+.22*s*b.z),tp=vec2(s,.5*s+.3*s*b.z);return step(min(seg(q,vec2(0.),m),seg(q,m,tp)),pitch*.7);}',
  'void main(){',
  ' vec2 c=floor(gl_FragCoord.xy/pitch);',
  ' vec2 cp=(c+.5)*pitch;float bd=0.;',
  ' for(int i=0;i<7;i++)bd=max(bd,bird(cp,B[i]));',
  ' if(bd>0.){gl_FragColor=vec4(vec3(.933,.376,.094)*.9,.9);return;}',
  ' vec2 uv=c*pitch/res;float x=uv.x*res.x/res.y,y=uv.y,v=0.,e=.004;',
  // near to far: base height, amplitude, frequency, drift, tone
  ' vec4 L[4];L[0]=vec4(-.03,.26,1.9,.011);L[1]=vec4(.05,.36,1.3,.006);L[2]=vec4(.12,.44,.95,.003);L[3]=vec4(.18,.5,.75,.0015);',
  ' float T[4];T[0]=1.;T[1]=.82;T[2]=.66;T[3]=.5;',
  ' for(int i=0;i<4;i++){',
  '  float xs=x*L[i].z+t*L[i].w+float(i)*13.1,s=float(i)*31.7;',
  '  float top=range(xs,s,L[i].x,L[i].y);',
  '  if(y<top){',
  '   float slope=broad(xs+.03,s)-broad(xs-.03,s);',
  '   float lit=mix(.5,1.,smoothstep(-.01,.01,slope));',
  '   float depth=(top-y)/L[i].y;',
  '   float body=mix(1.,.12,smoothstep(0.,.55,depth));',
  '   float edge=1.-smoothstep(0.,.01,top-y);',
  '   float mist=.75+.25*vn(vec2(x*3.-t*.04,y*9.));',
  '   v=T[i]*max(lit*body*mist,edge);',
  '   break;}',
  ' }',
  ' v*=smoothstep(0.,.24,y);',
  // hush the peaks that rise behind the headline, subtitle and buttons
  ' v*=1.-.8*exp(-(pow(uv.x-.5,2.)/.045+pow(y-.68,2.)/.012));',
  ' if(v<=0.)discard;',
  // one bit per pixel: on where the tone beats the Bayer threshold, one ink for every pixel
  ' if(clamp(v,0.,1.)<b8(c)+.004)discard;',
  ' float a=.34;',
  ' gl_FragColor=vec4(vec3(.933,.376,.094)*a,a);}',
].join('\n');

export default function startDither(cv) {
  const gl = cv.getContext('webgl', { premultipliedAlpha: true, antialias: false });
  if (!gl) return () => {};
  const shader = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, shader(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
  gl.attachShader(pr, shader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return () => {};
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(pr, 'res'), uT = gl.getUniformLocation(pr, 't'), uP = gl.getUniformLocation(pr, 'pitch'), uB = gl.getUniformLocation(pr, 'B');

  // dots stay 3 screen px apart whatever the page zoom: size the buffer in device pixels
  function size() {
    const z = pageZoom(), dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(cv.clientWidth * z * dpr); cv.height = Math.round(cv.clientHeight * z * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    gl.uniform2f(uRes, cv.width, cv.height); gl.uniform1f(uP, 3 * dpr);
  }

  /* the flock, in canvas device pixels (y up). Each bird wanders its own heading, keeps loosely
     with the others, stays in the sky above the ridges and out of the headline, and scatters
     from the cursor, flapping harder while it flees. */
  const N = 7, BU = new Float32Array(N * 4);
  let birds = [], mouse = null, K = 1;
  function seed() {
    const W = cv.width, H = cv.height; K = Math.min(2, window.devicePixelRatio || 1);
    birds = [];
    for (let i = 0; i < N; i++) {
      const a = Math.random() * 6.28;
      let x, y, ex, ey;
      do { x = Math.random() * W; y = H * (.5 + Math.random() * .42); ex = (x - W / 2) / (W * .26); ey = (y - H * .72) / (H * .13); } while (ex * ex + ey * ey < 1.2);
      birds.push({ x, y, vx: Math.cos(a) * 40 * K, vy: Math.sin(a) * 10 * K, h: a, ph: Math.random() * 6.28, fear: 0, s: (13 + Math.random() * 5) * K });
    }
  }
  function step(dt) {
    const W = cv.width, H = cv.height;
    let cx = 0, cy = 0;
    birds.forEach(b => { cx += b.x; cy += b.y; }); cx /= N; cy /= N;
    birds.forEach(b => {
      b.h += (Math.random() - .5) * 2.4 * dt;
      const cruise = 45 * K;
      let ax = (Math.cos(b.h) * cruise - b.vx) * .8, ay = (Math.sin(b.h) * cruise * .35 - b.vy) * .8;
      ax += (cx - b.x) * .02; ay += (cy - b.y) * .02;                                   // keep loosely together
      birds.forEach(o => { if (o === b) return; const dx = b.x - o.x, dy = b.y - o.y, d = Math.hypot(dx, dy); if (d > 0 && d < 40 * K) { ax += dx / d * 120 * K; ay += dy / d * 120 * K; } });
      if (b.y < H * .5) ay += (H * .5 - b.y) * 3; if (b.y > H * .94) ay -= (b.y - H * .94) * 3; // sky band above the ridges
      const ex = (b.x - W / 2) / (W * .26), ey = (b.y - H * .72) / (H * .13), e = ex * ex + ey * ey; // out of the headline
      if (e < 1) { ax += ex * 400 * K; ay += ey * 400 * K; }
      if (mouse) { const mx = b.x - mouse.x, my = b.y - mouse.y, md = Math.hypot(mx, my), R = 150 * K; if (md < R && md > 0) { const f = 1 - md / R; ax += mx / md * 2200 * K * f; ay += my / md * 2200 * K * f; b.fear = 1; b.h = Math.atan2(my, mx); } }
      b.vx += ax * dt; b.vy += ay * dt;
      const sp = Math.hypot(b.vx, b.vy), max = (60 + 220 * b.fear) * K; if (sp > max) { b.vx *= max / sp; b.vy *= max / sp; }
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.x < -b.s * 2) b.x = W + b.s; else if (b.x > W + b.s * 2) b.x = -b.s;      // wrap across the hero
      b.fear = Math.max(0, b.fear - dt * .8);
      b.ph += (6 + 14 * b.fear) * dt;
    });
  }
  function upload() { birds.forEach((b, i) => { BU[i * 4] = b.x; BU[i * 4 + 1] = b.y; BU[i * 4 + 2] = Math.sin(b.ph); BU[i * 4 + 3] = b.s; }); gl.uniform4fv(uB, BU); }
  function draw(ms) { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.uniform1f(uT, ms / 1000); upload(); gl.drawArrays(gl.TRIANGLES, 0, 3); }

  const host = cv.parentNode;
  let last = 0, prev = 0;
  size(); seed(); draw(0);
  const offs = [
    on(host, 'pointermove', e => { const r = cv.getBoundingClientRect(); mouse = { x: (e.clientX - r.left) * cv.width / r.width, y: (r.bottom - e.clientY) * cv.height / r.height }; }),
    on(host, 'pointerleave', () => { mouse = null; }),
    on(window, 'resize', () => { const w = cv.width, h = cv.height; size(); birds.forEach(b => { b.x *= cv.width / w; b.y *= cv.height / h; }); draw(last); }),
  ];
  if (!prefersReducedMotion()) {
    offs.push(loopWhileVisible(host, ms => {
      if (ms - prev < 33) return;
      step(Math.min(.1, (ms - prev) / 1000)); prev = ms; last = ms; draw(ms);
    }));
  }
  return () => offs.forEach(off => off());
}
