(()=>{"use strict";var e={485:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AI=t.init=t.setCharacter=t.setMove=t.move=t.OnSkull=t.onSkull=t.character=void 0;const a=n(620),o=n(372),r=n(714),c=n(746);t.character=null,t.onSkull=!0,t.OnSkull=function(e){t.onSkull=e},t.move="U";let i=0;t.setMove=function(e){t.move=e},t.setCharacter=function(e){t.character=e},t.init=function(){t.onSkull=!0,t.move="U",i=0,t.character=null,s=0,u=!1};let s=0,u=!1;t.AI=function e(){if(!t.character||!o.character)return;let n=Date.now();if(a.conspicuous?u=a.conspicuous:u&&(u=!1,s=n),!t.character||i+(s+1e3<n&&!a.conspicuous?0:800)>=n)return;let l,{x:d,y:m}=t.character;if(a.conspicuous){let n=o.character.x-t.character.x,a=o.character.y-t.character.y;const r=e=>e>0?1:0==e?0:-1;let i=[];-1==r(n)?i.push("L"):1==r(n)&&i.push("R"),-1==r(a)?i.push("U"):1==r(a)&&i.push("D"),l=i[Math.floor(Math.random()*i.length)];let s=null;switch(l){case"D":s=(0,c.getObject)(d,m+1);break;case"L":s=(0,c.getObject)(d-1,m);break;case"R":s=(0,c.getObject)(d+1,m);break;case"U":s=(0,c.getObject)(d,m-1)}if(!l)return;if("Wall"==s?.name)return e()}else{let e=(0,c.getReverseDirection)(t.move),n=r.Direction.filter((t=>{if(t==e)return!1;switch(t){case"D":return"Wall"!=(0,c.getObject)(d,m+1)?.name;case"L":return"Wall"!=(0,c.getObject)(d-1,m)?.name;case"R":return"Wall"!=(0,c.getObject)(d+1,m)?.name;case"U":return"Wall"!=(0,c.getObject)(d,m-1)?.name}}));l=n[Math.floor(Math.random()*n.length)],0==n.length&&(l=e)}t.move=l,t.character.pos=(0,c.moveObject)(t.character.pos,t.move),i=n}},372:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.init=t.playerMove=t.setCharacter=t.updatePlayerLastMove=t.character=t.move=t.lastMove=t.direction=void 0;const a=n(620),o=n(746);class r extends Set{last(){return Array.from(this)[this.size-1]}}function c(){t.lastMove=Date.now()}t.direction="U",t.lastMove=0,t.move=new r,t.character=null,t.updatePlayerLastMove=c,t.setCharacter=function(e){t.character=e},t.playerMove=function(){if(t.character&&t.lastMove+250<Date.now()&&0!==t.move.size){let e=t.move.last();a.shitKet||(t.direction=e),t.character.pos=(0,o.moveObject)(t.character.pos,e),c()}},t.init=function(){t.direction="U",t.lastMove=0,t.move.clear(),t.character=null}},459:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SoundDisable=t.SoundEnable=t.MusicDisable=t.MusicEnable=t.GameAudio=void 0;const a=n(971);class o extends Audio{constructor(e,t){super(e),this.playbackRate=t?.speed??1,this.loop=t?.loop??!1,this.volume=t?.volume??1}play(){return this.stop(),super.play()}stop(){super.pause(),this.currentTime=0}}class r extends o{type="music";constructor(e,t){super(e,t),this.loop=!0,this.muted=!0}}class c extends o{type="sound";constructor(e,t){super(e,t),this.loop=!1}}const i="./src/mp3";t.GameAudio={"Scary-Piano-Glissando":new c(`${i}/Scary-Piano-Glissando.mp3`,{speed:2}),"Anxious-Humming":new r(`${i}/Anxious-Humming.mp3`),Music:new r(`${i}/Music.mp3`,{volume:.5}),Scream:new c(`${i}/Scream.mp3`,{volume:.2}),Scream_p1:new c(`${i}/Scream_p1.mp3`,{volume:.2})},t.MusicEnable=function(){"menu"==a.frame&&t.GameAudio.Music.play();for(let e in t.GameAudio){let n=t.GameAudio[e];"music"==n.type&&(n.muted=!1)}},t.MusicDisable=function(){for(let e in t.GameAudio){let n=t.GameAudio[e];"music"==n.type&&(n.muted=!0)}},t.SoundEnable=function(){for(let e in t.GameAudio){let n=t.GameAudio[e];"sound"==n.type&&(n.muted=!1)}},t.SoundDisable=function(){for(let e in t.GameAudio){let n=t.GameAudio[e];"sound"==n.type&&(n.muted=!0)}},window.GameAudio=t.GameAudio},620:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.win=t.lose=t.conspicuous=t.SkullCountInit=t.SkullCount=t.addSkullCountPick=t.SkullCountPick=t.currentMap=t.currentMapSize=t.exit=t.shitKet=t.openMap=void 0;const a=n(459),o=n(485),r=n(372),c=n(714),i=n(470),s=n(746),u=n(971);t.openMap=async function(e){A.style.display="none",r.init(),o.init(),t.SkullCountPick=0,t.SkullCount=1,t.SkullCountInit=!1,b=!1,t.shitKet=!1;let n=new Image;n.src=URL.createObjectURL(await(await fetch(`./src/maps/${e}.png`)).blob()),n.onload=()=>{let e=document.createElement("canvas"),a=e.getContext("2d");e.width=n.width,e.height=n.height,a.drawImage(n,0,0,n.width,n.height),t.currentMapSize=[n.width,n.height],t.currentMap=a.getImageData(0,0,n.width,n.height).data,m.width=n.width,m.height=n.height,S.imageSmoothingEnabled=!1,document.addEventListener("keydown",(e=>{"ShiftLeft"==e.code&&(t.shitKet=!0),r.character&&c.DirectionKeys.includes(e.code)&&r.move.add((0,s.getDirection)(e.code))})),document.addEventListener("keyup",(e=>{"ShiftLeft"==e.code&&(t.shitKet=!1),c.DirectionKeys.includes(e.code)&&r.move.has((0,s.getDirection)(e.code))&&r.move.delete((0,s.getDirection)(e.code))})),M()}},t.shitKet=!1,t.exit=function(){document.onkeydown=document.onkeyup=null,b=!0,(0,u.show)("menu")};const l=document.querySelector("#canvas"),d=document.querySelector("#mask"),m=document.querySelector("#map"),h=l.getContext("2d"),p=d.getContext("2d"),S=m.getContext("2d");function y(){l.width=innerWidth,l.height=innerHeight,h.imageSmoothingEnabled=!1,d.width=innerWidth,d.height=innerHeight,p.imageSmoothingEnabled=!1,S.imageSmoothingEnabled=!1}y(),window.addEventListener("resize",y);const f=new Image;f.src="./sprite.png";let v=1e3/60,g=Date.now(),k=0,b=!1;function M(){if(b)return;let e=Date.now(),n=e-g;n>v&&(g=e-n%v,r.playerMove(),o.AI(),function(){h.clearRect(0,0,l.width,l.height);let e=t.currentMap.slice(0);for(let n=0;n<t.currentMap.length;n+=4){const a=n/4%t.currentMapSize[0],c=Math.floor(n/4/t.currentMapSize[0]),u=i.SIZE/2;let l=!0;r.character&&(Math.abs(r.character.x-a)>3||Math.abs(r.character.y-c)>3)&&(l=!1),h.save(),h.translate(a*i.SIZE+u-I.x,c*i.SIZE+u-I.y);const d=(0,s.getRGBA)(n);let m=(0,s.getObject)(d);if(l&&h.drawImage(f,1*i.SPRITE_SIZE,0,i.SPRITE_SIZE,i.SPRITE_SIZE,-u,-u,i.SIZE,i.SIZE),null!==m){if(r.character?.pos==n&&(r.character.x=a,r.character.y=c),o.character?.pos==n)switch(o.setCharacter({x:a,y:c,pos:o.character.pos}),o.move){case"D":h.rotate(-180*Math.PI/180);break;case"L":h.rotate(-90*Math.PI/180);break;case"R":h.rotate(90*Math.PI/180)}"Tank-U"==m.name&&null==r.character&&r.setCharacter({pos:n,x:a,y:c}),"Dekodor"==m.name&&null==o.character&&o.setCharacter({pos:n,x:a,y:c}),"Skull"==m.name&&(t.SkullCountInit||((a+c)%5==0?t.SkullCount++:(0,s.setRGBA)(n,[0,0,0,1])),h.scale(.4,.4)),l&&h.drawImage(f,m.spritePos*i.SPRITE_SIZE,0,i.SPRITE_SIZE,i.SPRITE_SIZE,-u,-u,i.SIZE,i.SIZE),h.restore(),"Dekodor"==m.name?(0,s.setRGBA)(n,o.onSkull?[255,255,0,255]:[0,0,0,0],e):"0,0,0,0"===d.join(",")&&(0,s.setRGBA)(n,[255,255,0,255],e)}else h.restore()}let n=new ImageData(e,t.currentMapSize[0],t.currentMapSize[1]);if(S.putImageData(n,0,0),!r.character)return;t.conspicuous=!1,p.save(),p.fillRect(0,0,d.width,d.height),p.translate(-I.x,-I.y),p.globalCompositeOperation="destination-out",p.fillRect(r.character.x*i.SIZE,r.character.y*i.SIZE,i.SIZE,i.SIZE);const c=(e=0,n=0)=>{p.save();let a=r.character;p.translate(a.x*i.SIZE+e*i.SIZE,a.y*i.SIZE+n*i.SIZE),p.fillRect(0,0,i.SIZE,i.SIZE),t.conspicuous||"Dekodor"!=(0,s.getObject)(a.x+e,a.y+n)?.name||(t.conspicuous=!0),p.restore()};function m(e,t,n){let{x:a,y:o}=r.character;for(let r=1;r<=2;r++){let i=e.includes("H")?r*t:0,u=e.includes("V")?r*(n??t):0;if("Wall"===(0,s.getObject)(a+i,o+u)?.name){c(i,u);break}c(i,u)}}function y(e,t){return"Wall"===(0,s.getObject)(r.character.x+e,r.character.y+t)?.name}"default"==u.mode?(m(["V"],-1),m(["V"],1),m(["H"],-1),m(["H"],1),m(["H","V"],-1,-1),m(["H","V"],1,-1),m(["H","V"],-1,1),m(["H","V"],1,1),y(-1,-1)||(c(-1,-2),c(-2,-1)),y(1,-1)||(c(1,-2),c(2,-1)),y(1,1)||(c(1,2),c(2,1)),y(-1,1)||(c(-1,2),c(-2,1))):"SCP-173"==u.mode&&(["U"].includes(r.direction)&&(m(["V"],-1),c(-1,0),c(1,0),!y(-1,-1)&&c(-1,-2),!y(1,-1)&&c(1,-2)),["D"].includes(r.direction)&&(m(["V"],1),c(-1,0),c(1,0),!y(-1,1)&&c(-1,2),!y(1,1)&&c(1,2)),["L"].includes(r.direction)&&(m(["H"],-1),c(0,-1),c(0,1),!y(-1,-1)&&c(-2,-1),!y(-1,1)&&c(-2,1)),["R"].includes(r.direction)&&(m(["H"],1),c(0,-1),c(0,1),!y(1,-1)&&c(2,-1),!y(1,1)&&c(2,1)),["L","U"].includes(r.direction)&&m(["H","V"],-1,-1),["R","U"].includes(r.direction)&&m(["H","V"],1,-1),["L","D"].includes(r.direction)&&m(["H","V"],-1,1),["R","D"].includes(r.direction)&&m(["H","V"],1,1)),w+8e3<Date.now()&&(!E&&t.conspicuous&&(E=!0,a.GameAudio["Scary-Piano-Glissando"].play(),w=Date.now()),t.conspicuous||(E=!1)),p.restore()}(),!t.SkullCountInit&&(t.SkullCountInit=!0),function(){if(!r.character)return;let e={x:0,y:0};e.x=r.character.x*i.SIZE-innerWidth/2+i.SIZE/2,e.y=r.character.y*i.SIZE-innerHeight/2+i.SIZE/2,I.x+=(e.x-I.x)/20,I.y+=(e.y-I.y)/20}(),k++),requestAnimationFrame(M)}t.SkullCountPick=0,t.addSkullCountPick=function(){return++t.SkullCountPick},t.SkullCount=1,t.SkullCountInit=!1,t.conspicuous=!1;let E=!1,w=0,I={x:0,y:0};const A=document.querySelector("#alert"),D=document.querySelector("#alert > h2"),R=document.querySelector("#scream");function x(){a.GameAudio.Scream.play(),a.GameAudio.Scream_p1.play(),R.classList.add("a"),setTimeout((()=>R.classList.remove("a")),500),D.innerHTML="You lose",A.style.display="flex",b=!0}function L(){D.innerHTML="You win",A.style.display="flex",b=!0}t.lose=x,t.win=L,window.getObject=s.getObject,window.lose=x,window.win=L;const P=document.querySelector("#fps");setInterval((()=>{P.innerHTML=`${k} FPS`,k=0}),1e3)},714:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Direction=t.DirectionKeys=void 0,t.DirectionKeys=["KeyW","KeyD","KeyA","KeyS"],t.Direction=["U","R","L","D"]},971:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.show=t.frame=t.mode=void 0;const a=n(459),o=n(620),r=document.querySelector("#start_btn"),c=document.querySelector("#SCP-173_btn"),i=document.querySelector("#tutor_btn"),s=document.querySelector("#restart_btn"),u=document.querySelector("#menu_btn"),l=document.querySelector("#maps"),d=document.querySelector("#mapPreview"),m=document.querySelector("#version"),h=document.querySelector("#music"),p=document.querySelector("#sound");r.addEventListener("click",(()=>{t.mode="default",y("game")})),c.addEventListener("click",(()=>{t.mode="SCP-173",y("game")})),i.addEventListener("click",(()=>{y("tutor")})),s.addEventListener("click",(()=>{(0,o.openMap)(f)})),u.addEventListener("click",(()=>{y("menu")})),t.mode="default",t.frame="menu";let S="menu";function y(e){t.frame=e,document.querySelectorAll("body > div").forEach((e=>e.style.display="none")),document.querySelector(`body > div#${e}`).style.display="flex","game"==e?((0,o.openMap)(f),a.GameAudio.Music.stop(),a.GameAudio["Anxious-Humming"].play()):"menu"==e&&(a.GameAudio["Anxious-Humming"].stop(),a.GameAudio.Music.play()),S=e}t.show=y;for(let e=0;e<4;e++)l.insertAdjacentHTML("beforeend",`<span${0==e?' class="active"':""}>${e+1}<span>`);let f=0;document.querySelectorAll("#maps > span").forEach(((e,t)=>{e.onclick=()=>{document.querySelector("#maps > span.active")?.classList.remove("active"),e.classList.add("active"),f=t},e.onmouseover=()=>{d.src=`./src/maps/${t}.png`,d.style.left=`${e.offsetLeft+e.offsetWidth/2}px`,d.style.top=`${e.offsetTop+e.offsetHeight+10}px`},e.onmouseout=()=>{d.src=""}})),fetch("./package.json").then((e=>e.json().then((e=>{m.innerHTML=e.version})))),h.onclick=()=>{h.classList.contains("a")?(h.classList.remove("a"),a.MusicDisable()):(h.classList.add("a"),a.MusicEnable())},p.onclick=()=>{p.classList.contains("a")?(p.classList.remove("a"),a.SoundDisable()):(p.classList.add("a"),a.SoundEnable())},a.SoundEnable(),document.addEventListener("keydown",(e=>{if("Escape"==e.code)return(0,o.exit)()}))},746:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getObject=t.setRGBA=t.getRGBA=t.moveObject=t.getDirection=t.getReverseDirection=void 0;const a=n(620),o=n(470),r=n(485),c=n(372);function i(e){return[a.currentMap[e+0],a.currentMap[e+1],a.currentMap[e+2],a.currentMap[e+3]]}function s(e,t,n=a.currentMap){n[e+0]=t[0],n[e+1]=t[1],n[e+2]=t[2],n[e+3]=t[3]}function u(e,t){return Array.isArray(e)?o.list.find((t=>t.RGBA.join(",")==e.join(",")))??null:a.currentMapSize?u(i(4*e+4*t*a.currentMapSize[0])):null}t.getReverseDirection=function(e){switch(e){case"D":return"U";case"L":return"R";case"R":return"L";case"U":return"D"}},t.getDirection=function(e){switch(e){case"KeyW":return"U";case"KeyD":return"R";case"KeyA":return"L";case"KeyS":return"D"}throw Error()},t.moveObject=function(e,t){let n,o=e==c.character?.pos,l=e==r.character?.pos,d=i(e),m=!1,h=r.onSkull;switch(t){case"U":n=4*-a.currentMapSize[0],o&&!a.shitKet&&(d[2]=255);break;case"R":n=4,o&&!a.shitKet&&(d[2]=254);break;case"L":n=-4,o&&!a.shitKet&&(d[2]=253);break;case"D":n=4*a.currentMapSize[0],o&&!a.shitKet&&(d[2]=252)}let p=i(e+n);switch(u(p)?.name){case"Wall":return s(e,d),e;case"Tank-U":case"Tank-R":case"Tank-L":case"Tank-D":if(l)return(0,a.lose)(),e;case"Dekodor":if(o)return(0,a.lose)(),e;case"Skull":o&&((0,a.addSkullCountPick)()==a.SkullCount&&(0,a.win)(),m=!0),l&&!h&&(r.OnSkull(!0),m=!0)}return l&&h&&"0,0,0,1"==p.join(",")?(r.OnSkull(!1),s(e,[0,0,0,0])):s(e,m?[0,0,0,1]:p),s(e+n,d),e+n},t.getRGBA=i,t.setRGBA=s,t.getObject=u},470:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.list=t.SIZE=t.SPRITE_SIZE=void 0,t.SPRITE_SIZE=32,t.SIZE=2*t.SPRITE_SIZE,t.list=[{name:"Wall",RGBA:[0,0,0,255],spritePos:6},{name:"Tank-U",RGBA:[0,0,255,255],spritePos:2},{name:"Tank-R",RGBA:[0,0,254,255],spritePos:3},{name:"Tank-L",RGBA:[0,0,253,255],spritePos:4},{name:"Tank-D",RGBA:[0,0,252,255],spritePos:5},{name:"Dekodor",RGBA:[255,0,0,255],spritePos:0},{name:"Skull",RGBA:[0,0,0,0],spritePos:7}]}},t={};!function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}(971)})();