(this["webpackJsonp100-prisoners"]=this["webpackJsonp100-prisoners"]||[]).push([[0],{22:function(e,n,t){e.exports=t(48)},48:function(e,n,t){"use strict";t.r(n);var a,r,l,c=t(0),u=t.n(c),i=t(16),o=t.n(i),s=t(4),m=t(1),f=t(2),p=t(17),b=t.n(p),d=t(11),v=t.n(d),E=t(3),g=(t(45),E.a.div(a||(a=Object(f.a)(["\n  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;\n  height: fit-content;\n  text-align: center;\n  border-radius: 5px;\n  box-sizing: border-box;\n  width: 60px;\n\n  p,\n  span {\n    margin: 0;\n  }\n  span {\n    font-size: 0.8rem;\n    margin-left: 25px;\n    margin-top: 10px;\n    color: steelblue;\n  }\n"]))));function j(e){var n=e.cardLabel,t=e.cardValue,a=e.color,r=e.style,l=void 0!==t;return u.a.createElement(g,{style:Object(s.a)({backgroundColor:a,padding:l?"15px 15px 0 15px":"15px"},r)},u.a.createElement("p",null,n),l&&u.a.createElement("span",null,t))}var x=E.a.div(r||(r=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]))),O=E.a.div(l||(l=Object(f.a)(["\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: 1fr 1fr;\n  gap: 30px;\n"])));function h(e){var n=e.boxes,t=e.currentGuess,a=e.currentPrisoner;function r(e){return e.value===a&&t===e.label?"lime":e.label===t?"deepskyblue":e.visited?"gold":"whitesmoke"}return u.a.createElement(x,null,u.a.createElement(O,null,n.map((function(e){return u.a.createElement(j,{key:e.label,cardLabel:e.label,cardValue:e.value,color:r(e)})}))))}var y,w,S,k=t(21);function C(e,n){console.log(e),n&&alert(e)}var P=E.a.div(y||(y=Object(f.a)(["\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n  height: 100vh;\n"]))),A=E.a.div(w||(w=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 200px;\n\n  & > p {\n    margin: 1rem 0 0 0;\n  }\n"]))),L=E.a.div(S||(S=Object(f.a)(["\n  display: flex;\n  align-items: center;\n  margin: 30px 0;\n  span {\n    margin-right: 20px;\n  }\n"])));function I(){var e,n=(e=new Array(100).fill(null).map((function(e,n){return n+1})),Object(k.a)(e).sort((function(){return Math.random()-.5})));return new Array(100).fill(0).map((function(e,t){return{label:t+1,value:n[t],visited:!1}}))}function T(){var e=Object(c.useState)(I()),n=Object(m.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(1),l=Object(m.a)(r,2),i=l[0],o=l[1],f=Object(c.useState)(null),p=Object(m.a)(f,2),d=p[0],E=p[1],g=Object(c.useState)(0),x=Object(m.a)(g,2),O=x[0],y=x[1],w=Object(c.useState)(0),S=Object(m.a)(w,2),k=S[0],T=S[1],V=Object(c.useState)(0),D=Object(m.a)(V,2),F=D[0],G=D[1],W=Object(c.useState)(!1),z=Object(m.a)(W,2),B=z[0],J=z[1],M=Object(c.useState)(600),N=Object(m.a)(M,2),R=N[0],U=N[1],q=Object(c.useState)(!1),H=Object(m.a)(q,2),K=H[0],Q=H[1];function X(){G((function(e){return e+1})),a(I()),o(1),y(0),E(null)}function Y(e){a((function(n){return n.map((function(n){return n.label===e?Object(s.a)(Object(s.a)({},n),{},{visited:!0}):n}))}))}function Z(){y((function(e){return e+1}))}function $(){C("Prisoner ".concat(i," SUCCEEDED in ").concat(O," guess").concat(O>1?"es":""),B);var e=i+1;if(e>100)return C("WIN",B),T((function(e){return e+1})),void X();a((function(e){return e.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{visited:!1})}))})),o(e),y(0),E(null)}return Object(c.useEffect)((function(){if(!K){var e=setTimeout((function(){if(O>=50)return C("Prisoner ".concat(i," FAILED"),B),void X();if(null==d){var e=i;return Z(),E(i),void Y(e)}var n=t.find((function(e){return e.label===d}));if(!n)throw new Error("error finding box with label ".concat(d));var a=n.value;Z(),E(a),Y(a)}),R);return function(){clearInterval(e)}}})),Object(c.useEffect)((function(){var e=t.find((function(e){return e.label===d}));if(e&&e.value===i){var n=setTimeout((function(){$()}),R);return function(){return clearTimeout(n)}}}),[i,d,R]),u.a.createElement(P,null,u.a.createElement(A,null,u.a.createElement(L,null,u.a.createElement("span",{style:{marginRight:"30px"}},"Speed"),u.a.createElement(b.a,{minValue:5,maxValue:1500,step:5,formatLabel:function(e){return"".concat(e," ms")},value:R,onChange:function(e){return U(e)}})),u.a.createElement(L,null,u.a.createElement("span",null,"Show Alerts"),u.a.createElement(v.a,{onChange:function(e){return J(e)},checked:B})),u.a.createElement(L,{style:{marginTop:0}},u.a.createElement("span",null,"Pause"),u.a.createElement(v.a,{onChange:function(e){return Q(e)},checked:K})),u.a.createElement(j,{cardLabel:i,color:"whitesmoke",style:{alignSelf:"center",marginBottom:"15px"}}),u.a.createElement("p",null,"Current Prisoner Guesses: ",O),u.a.createElement("p",null,"Wins: ",k),u.a.createElement("p",null,"Attempts: ",F),u.a.createElement("p",null,"Win %: ",(F?k/F:0).toFixed(3))),u.a.createElement(h,{boxes:t,currentGuess:d,currentPrisoner:i}))}var V=function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement("main",null,u.a.createElement(T,null)))};o.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(V,null)),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.d2a664ef.chunk.js.map