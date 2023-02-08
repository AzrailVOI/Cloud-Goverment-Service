function tryAgain() {
  window.location.assign("/");
}
fetch('/')
  .then(response => response.json())
  .then(({ message }) => {
    alert(message);
  });
