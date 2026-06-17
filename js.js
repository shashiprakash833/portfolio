(function() {
  const track = document.getElementById('resume-track');
  const handle = document.getElementById('resume-handle');
  const fill = document.getElementById('resume-fill');
  const label = document.getElementById('resume-label');
  const panel = document.getElementById('resume-panel');

  let dragging = false, startX = 0, handleX = 4, maxX = 0, revealed = false;

  function setMax() { maxX = track.offsetWidth - handle.offsetWidth - 8; }
  setMax();
  window.addEventListener('resize', setMax);

  function onDown(x) {
    if (revealed) return;
    dragging = true;
    startX = x - handleX;
    handle.style.cursor = 'grabbing';
  }
  function onMove(x) {
    if (!dragging) return;
    let pos = Math.max(4, Math.min(x - startX, maxX));
    handleX = pos;
    handle.style.left = pos + 'px';
    fill.style.width = (pos + handle.offsetWidth) + 'px';
    label.style.opacity = Math.max(0, 1 - (pos / maxX) * 1.4);
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    handle.style.cursor = 'grab';
    if (handleX > maxX * 0.85) {
      reveal();
    } else {
      handleX = 4;
      handle.style.left = '4px';
      fill.style.width = handle.offsetWidth + 'px';
      label.style.opacity = 1;
    }
  }
  function reveal() {
    revealed = true;
    handleX = maxX;
    handle.style.left = maxX + 'px';
    fill.style.width = (maxX + handle.offsetWidth) + 'px';
    label.style.opacity = 0;
    handle.textContent = '✓';
    panel.style.maxHeight = '700px';
    panel.style.opacity = '1';
  }

  handle.addEventListener('mousedown', e => onDown(e.clientX));
  window.addEventListener('mousemove', e => onMove(e.clientX));
  window.addEventListener('mouseup', onUp);
  handle.addEventListener('touchstart', e => onDown(e.touches[0].clientX), {passive: true});
  window.addEventListener('touchmove', e => onMove(e.touches[0].clientX), {passive: true});
  window.addEventListener('touchend', onUp);
})();