document.addEventListener('DOMContentLoaded', function() {
  function updateCurrentDateTime() {
    var now = new Date();
    var formattedDateTime = now.toLocaleString();
    document.getElementById('currentDateTime').textContent = formattedDateTime;
  }
  updateCurrentDateTime();
  setInterval(updateCurrentDateTime, 1000);
});

