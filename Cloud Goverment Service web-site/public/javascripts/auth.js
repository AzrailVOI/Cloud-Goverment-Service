window.onload = () =>{
  btn.addEventListener('click', () =>{
    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/login');

    var userData = {
      username: login.value
      password: pwd.value
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(userdata))
    xhr.onload = () =>{
      alert(this.responseText)
    }
    xhr.onerror = () =>{
      alert("server error!")
    }
  })
}