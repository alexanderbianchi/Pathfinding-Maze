(this.webpackJsonpvisualizer=this.webpackJsonpvisualizer||[]).push([[0],{12:function(t,n,e){},14:function(t,n,e){},15:function(t,n,e){"use strict";e.r(n);var i=e(1),s=e(6),a=e.n(s),r=e(7),o=e(5),l=(e(12),e(0)),c=function(t){var n=t.isStart?"node-start":t.isEnd?"node-end":t.isWall?"wall":"";return Object(l.jsx)("button",{className:"Node ".concat(n),id:"node-".concat(t.row,"-").concat(t.col),onMouseOver:function(n,e){return t.OnEnter(t.row,t.col)},onMouseDown:function(n,e){return t.OnDown(t.row,t.col)},onMouseUp:function(){return t.OnUp()}})};e(14);function h(t,n){return Math.abs(t.x-n.x)+Math.abs(t.y-n.y)}var u=function(t,n){var e=[],i=[],s=[],a=[];e.push(t);for(var r=function(){for(var t=0,r=0;r<e.length;r++)e[r].f<e[t].f&&(t=r);var o=e[t];if(a.push(o),o===n){var l=o;for(s.push(l);l.previous;)s.push(l.previous),l=l.previous;return{v:{path:s,visitedNodes:a}}}e=e.filter((function(t){return t!==o})),i.push(o);for(var c=o.neighbors,u=0;u<c.length;u++){var d=c[u];if(!i.includes(d)&&!d.isWall){var f=o.g+1,v=!1;e.includes(d)?f<d.g&&(d.g=f,v=!0):(d.g=f,v=!0,e.push(d)),v&&(d.h=h(d,n),d.f=d.h+d.g,d.previous=o)}}};e.length>0;){var o=r();if("object"===typeof o)return o.v}return{path:s,visitedNodes:a,error:"no path"}};function d(t){if(0!=t.length){for(var n=t.length-1;n>0;n--){var e=Math.floor(Math.random()*(n+1)),i=t[n];t[n]=t[e],t[e]=i}return t[0]}}function f(t){var n=Array.from(t);return n[Math.floor(Math.random()*n.length)]}var v=[];var g=function(t){var n=new Set,e=new Set,i=f(function(t){for(var n=new Set,e=0;e<t.length;e++)for(var i=0;i<t[e].length;i++){var s=t[e][i];e%2==0&&i%2==0?(t[e][i].addWallNeighbors(t),d(t[e][i].wallNeighbors),t[e][i].isWall=!1,s.isStart||s.IsEnd||!s.isWall||(document.getElementById("node-".concat(s.x,"-").concat(s.y)).className="Node"),n.add(t[e][i])):t[e][i].isStart||t[e][i].isEnd||(t[e][i].isWall=!0,s.isStart||s.IsEnd||!s.isWall||(document.getElementById("node-".concat(s.x,"-").concat(s.y)).className="Node wall")),t[e][i].mazeStatus="unvisited"}return n}(t));n.add(i),e.add(i);var s=i;s.mazeStatus="visited",function t(i){n.delete(s);for(var a=s.wallNeighbors,r=0;r<a.length;r++)"unvisited"==a[r].mazeStatus?n.add(a[r]):a[r].mazeStatus;if(0!=n.size){s=f(n),e.add(s),s.mazeStatus="visited";for(var o=[],l=0;l<s.wallNeighbors.length;l++)"visited"==s.wallNeighbors[l].mazeStatus&&o.push(s.wallNeighbors[l]);var c=d(o),h=(c.x+1+s.x+1)/2-1,u=(c.y+1+s.y+1)/2-1;i[h][u].isWall=!1,v.push([h,u]),n.size>0&&t(i)}}(t);for(var a=function(n){var e=v[n][0],i=v[n][1],s=t[e][i];setTimeout((function(){s.isStart||s.IsEnd||s.isWall||(document.getElementById("node-".concat(s.x,"-").concat(s.y)).className="Node")}),70*n)},r=0;r<v.length;r++)a(r);return t},b=Math.round(window.innerHeight/34),m=Math.round(window.innerWidth/27),j=!0,p=!0,N=2,w=2,x=b-3,O=m-3,W=!1,y=!1,S=function(){var t=Object(i.useState)([]),n=Object(o.a)(t,2),e=n[0],s=n[1];Object(i.useEffect)((function(){a()}),[]);var a=function(){for(var t=new Array(b),n=0;n<b;n++)t[n]=new Array(m);!function(t){for(var n=0;n<b;n++)for(var e=0;e<m;e++)t[n][e]=new h(n,e)}(t),s((function(){return t}))};function h(t,n){this.x=t,this.y=n,this.f=0,this.h=0,this.g=0,this.mazeStatus=void 0,this.wallNeighbors=[],this.isWall=!1,this.connections=[],this.addWallNeighbors=function(t){var n=this.x,e=this.y;n>1&&this.wallNeighbors.push(t[n-2][e]),n<b-2&&this.wallNeighbors.push(t[n+2][e]),e>1&&this.wallNeighbors.push(t[n][e-2]),e<m-2&&this.wallNeighbors.push(t[n][e+2])},this.visited=!1,this.isStart=this.x===N&&this.y===w,this.isEnd=this.x===x&&this.y===O,this.neighbors=[],this.previous=void 0,this.addNeighbors=function(t){var n=this.x,e=this.y,i=t.length,s=t[1].length;n>0&&this.neighbors.push(t[n-1][e]),n<i-1&&this.neighbors.push(t[n+1][e]),e>0&&this.neighbors.push(t[n][e-1]),e<s-1&&this.neighbors.push(t[n][e+1]),!(n>0&&e>0)||t[n-1][e].isWall&&t[n][e-1].isWall||this.neighbors.push(t[n-1][e-1]),e<s-1&&n<i-1&&0==t[n+1][e].isWall&&0==t[n][e+1].isWall&&this.neighbors.push(t[n+1][e+1]),!(e<s-1&&n>0)||t[n-1][e].isWall&&t[n][e+1].isWall||this.neighbors.push(t[n-1][e+1]),!(e>0&&n<i-1)||t[n+1][e].isWall&&t[n][e-1].isWall||this.neighbors.push(t[n+1][e-1])}}var d=Object(i.useState)(!1),f=Object(o.a)(d,2),v=f[0],S=f[1],E=function(t,n){y||(S((function(){return!0})),k(t,n))},z=function(){S((function(){return!1}))},M=function(t,n){v&&k(t,n)},I=function(){if(!y){for(var t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++){var i=e[t][n];i.isWall=!1,i.neighbors=[],i.class=i.isStart?"node-start":i.isEnd?"node-end":i.isWall?"wall":"",document.getElementById("node-".concat(i.x,"-").concat(i.y)).className="Node ".concat(i.class),i.f=0,i.h=0,i.g=0,i.visited=!1,i.neighbors=[],i.previous=void 0}W=!1,s((function(){return e}))}},k=function(t,n){W&&I();var i=Object(r.a)(e);j||i[t][n].isEnd?p||i[t][n].isStart?i[t][n].isEnd||i[t][n].isStart||i[t][n].isWall?(i[t][n].isEnd&&(x=null,O=null,p=!1,i[t][n].isEnd=!1),i[t][n].isStart&&(N=null,w=null,j=!1,i[t][n].isStart=!1),i[t][n].isWall&&(i[t][n].isWall=!1)):i[t][n].isWall=!0:(x=t,O=n,p=!0,i[t][n].isEnd=!0):(N=t,w=n,j=!0,i[t][n].isStart=!0),s((function(){return i}))},B=Object(l.jsx)("div",{children:e.map((function(t,n){return Object(l.jsx)("div",{className:"rowWrapper",children:t.map((function(t,e){var i=t.isStart,s=t.isEnd,a=t.isWall;return Object(l.jsx)(c,{isStart:i,isEnd:s,row:n,col:e,OnEnter:M,OnDown:E,isWall:a,OnUp:z},e)}))},n)}))});return Object(l.jsxs)("div",{className:"container",children:[Object(l.jsx)("div",{className:"header",children:Object(l.jsx)("h1",{className:"title",children:"Pathfinding Visualizer"})}),Object(l.jsx)("div",{className:"header",children:Object(l.jsx)("p",{children:"click and drag to create walls - replace start and end nodes with click"})}),Object(l.jsxs)("div",{className:"row",children:[Object(l.jsx)("div",{className:"col-sm",children:Object(l.jsx)("button",{onClick:function(){if(j&&p)if(W)I();else{!function(t){for(var n=0;n<t.length;n++)for(var e=0;e<t[n].length;e++)t[n][e].addNeighbors(t)}(e),s((function(){return e}));var t=e[N][w],n=e[x][O],i=u(t,n),a=i.path,r=i.visitedNodes;y=!0;for(var o=function(e){e===r.length?setTimeout((function(){!function(t,n,e){for(var i=function(i){setTimeout((function(){var s=t[i];s!==n&&s!==e&&(document.getElementById("node-".concat(s.x,"-").concat(s.y)).className="Node node-shortest")}),5*i)},s=0;s<t.length;s++)i(s)}(a,t,n),y=!1}),16*e):setTimeout((function(){var i=r[e];i!==t&&i!==n&&(document.getElementById("node-".concat(i.x,"-").concat(i.y)).className="Node node-visited")}),15*e)},l=0;l<=r.length;l++)o(l);W=!0}},children:"Vizualize Path (A*)"})}),Object(l.jsx)("div",{className:"col-sm",children:Object(l.jsx)("button",{onClick:function(){if(!y){I();for(var t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++)e[t][n].isEnd||e[t][n].isStart||(Math.random(1)<.2?(e[t][n].isWall=!0,document.getElementById("node-".concat(t,"-").concat(n)).className="Node wall"):e[t][n].isWall=!1);s((function(){return e}))}},children:"Random Walls"})}),Object(l.jsx)("div",{className:"col-sm",children:Object(l.jsx)("button",{onClick:I,children:"Reset"})}),Object(l.jsx)("div",{className:"col-sm",children:Object(l.jsx)("button",{onClick:function(){j&&p&&!y&&(s((function(){return g(e)})),y=!0,W=!1)},children:"Generate Maze (Prim's Algorithm)"})})]}),B]})},E=function(){return Object(l.jsx)("div",{children:Object(l.jsx)(S,{})})};a.a.render(Object(l.jsx)(E,{}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.783489c8.chunk.js.map