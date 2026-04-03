const P5_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js'

export function buildSrcdoc(userCode) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin:0; overflow:hidden; background:#1a1a2e; }
  #err { display:none; position:absolute; inset:0; background:rgba(229,57,53,0.92);
    color:#fff; font-family:monospace; font-size:13px; padding:14px;
    white-space:pre-wrap; z-index:10; }
</style>
<script src="${P5_CDN}"></script>
</head>
<body>
<div id="err"></div>
<script>
window.onerror = function(msg,_,line) {
  var el=document.getElementById('err');
  el.textContent='Line '+line+': '+msg;
  el.style.display='block';
  return true;
};
function setup() { createCanvas(windowWidth, windowHeight); }
function draw() {
  try {
${userCode}
  } catch(e) {
    var el=document.getElementById('err');
    el.textContent='Error: '+e.message;
    el.style.display='block';
    noLoop();
  }
}
</script>
</body>
</html>`
}