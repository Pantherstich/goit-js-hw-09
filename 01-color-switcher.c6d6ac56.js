const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");t.addEventListener("click",(function(){e.disabled=!1,t.disabled=!0,n=setInterval(a,1e3)})),e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,clearInterval(n)}));let n=null;function a(){d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}e.disabled=!0;
//# sourceMappingURL=01-color-switcher.c6d6ac56.js.map
