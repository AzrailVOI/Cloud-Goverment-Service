function tryAgain() {
  window.location.assign("/");
}
fetch('/')
  .then(response => response.json())
  .then(({ message }) => {
    alert(message);
  });
if (history.pushState) {
  history.pushState(null, null, location.href);
  window.onpopstate = function() {
    history.go(1);
  };
}
const socket = io();

let signupText = document.querySelector('.signup')
socket.on('registration', (registration)=>{
  if (registration.status === 'new'){
    signupText.innerHTML = `Don't have an account?<a class="signup-link" href="signup?page=1">Create one</a>`
  }else if (registration.status === 'continue'){
    signupText.innerHTML = `*You haven't completed the registration of your new account.<a class="signup-link" style="font-weight: 600;" href="signup?page=${registration.current_page}">Continue</a>`
    signupText.classList.add('signup-continue')
  }
})
//<span class="signup">You haven't completed the registration of your new account.<a class="signup-link" href="signup?page=1">Continue</a></span>