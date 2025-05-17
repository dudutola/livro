document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('welcome-modal');
  const closeBtn = document.getElementById('close-modal');
  const openBtn = document.getElementById('open-modal');

  if (openBtn) {
    openBtn.onclick = function() {
      modal.style.display = 'block';
    };
  }
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});
