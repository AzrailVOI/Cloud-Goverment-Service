import {Select} from '../select/select.js'

const params = new URLSearchParams(window.location.search);
const pageNumber = params.get('page');
if (history.pushState) {
  history.pushState(null, null, location.href);
  window.onpopstate = function() {
    history.go(1);
  };
}
let goback = document.getElementById('backtologin');
goback.addEventListener('click', ()=>{
  window.location.replace("/");
})




const socket = io();
let countriesArray = [];

socket.on('clientId', (clientId) => {
  console.log('Received clientId:', clientId); // выводим уникальный идентификатор клиента в консоль
});

socket.on('countries', countries => {
  console.log('Received countries:', countries);
  countriesArray = countries;
  createSelect(countriesArray);
});

let country;
function createSelect(countries) {
  const select = new Select("#select", {
    placeholder: "Choose your country",
    // selectedId: "UKR",
    data: countries,
    onSelect(item){
      console.log("Selected:", item)
      country = item
      console.log("country:", item)


    }
  });
  window.s = select

}



var checkPass = false;
if (pageNumber == 1){
  document.addEventListener('DOMContentLoaded', function() {
    var $password = document.getElementById('password')
    var $form = document.querySelector('.form')
    $form.removeAttribute('method')
    btn.setAttribute('type', 'button')
    console.log($password)
    $password.addEventListener('input', () =>{
      console.log("oi", $password.value)
      const password = $password.value;
      const hasLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);
      const isLengthValid = password.length >= 8;

      if (hasLettersAndNumbers && isLengthValid) {
        $password.classList.remove('form-input-error')
        $password.classList.add('form-input-check')
        $form.setAttribute('method', 'POST')
        btn.setAttribute('type', 'submit')
        checkPass = true
      } else {
        $password.classList.remove('form-input-check')
        $password.classList.add('form-input-error')
        $form.removeAttribute('method')
        btn.setAttribute('type', 'button')
        checkPass = false
      }
    })
  })
}




console.log("ss", pageNumber)
if (pageNumber == 1){
  var userData1={
    login: "",
    password: "",
    email: ""
  }
  localStorage.setItem('userdata1', JSON.stringify(userData1));
}else if (pageNumber == 3){
  var userData2={
    fname: "",
    mname: "",
    lname: "",
    country: ""
  }
  localStorage.setItem('userdata2', JSON.stringify(userData2));
}
var confirmedEmail = false;
console.log("btn", Number(pageNumber))
if (Number(pageNumber) === 2){
  socket.on('sendcode', code=>{
    console.log('Confirm?', code)
    if (code){
      confirmedEmail = true
      document.getElementById('times').classList.remove('form-input-confirm-sign-times')
      document.getElementById('confirm_email').classList.remove('form-input-error')
      document.getElementById('check').classList.add('form-input-confirm-sign-check')
      document.getElementById('confirm_email').classList.add('form-input-check')
    }else{
      confirmedEmail = false
      document.getElementById('check').classList.remove('form-input-confirm-sign-check')
      document.getElementById('confirm_email').classList.remove('form-input-check')
      document.getElementById('times').classList.add('form-input-confirm-sign-times')
      document.getElementById('confirm_email').classList.add('form-input-times')
    }
  })
  window.addEventListener('load', function() {
    var confirmBtn = document.getElementById('confirm_code')
    confirmBtn.addEventListener('click', function() {
      let typecode = document.getElementById('confirm_email').value
      socket.emit('typecode', typecode)
    });
  });

}



















let fullForm = false;
window.onload = ()=>{
  btn.onclick = async () =>{
    if (Number(pageNumber) == 1){
      var loginInput = document.getElementById('login');
      var passInput = document.getElementById('password');
      var emailInput = document.getElementById('email');


      let userdata_local = JSON.parse(localStorage.getItem('userdata1'));
      console.log("f", userdata_local)
      userdata_local.login = loginInput.value
      userdata_local.email = emailInput.value
      userdata_local.password = passInput.value
      console.log("e", userdata_local)
      localStorage.setItem("userdata1", JSON.stringify(userdata_local));
      console.log("le", JSON.parse(localStorage.getItem('userdata1')))
      socket.emit('email', emailInput.value)

    }
    if (Number(pageNumber) == 3){
      var fnameInput = document.getElementById('fname');
      var mnameInput = document.getElementById('mname');
      var lnameInput = document.getElementById('lname');
      var countrySelect = country

      let userdata_local = JSON.parse(localStorage.getItem('userdata2'));
      console.log("f", userdata_local)

      userdata_local.fname = fnameInput.value
      userdata_local.mname = mnameInput.value
      userdata_local.lname = lnameInput.value
      userdata_local.country = countrySelect
      console.log("e", userdata_local)

      localStorage.setItem("userdata2", JSON.stringify(userdata_local));
      console.log("sds", JSON.parse(localStorage.getItem('userdata2')))

      fullForm = true
      console.log("oo", fullForm)
    }
    if (fullForm == true){
      const data1 = JSON.parse(localStorage.getItem('userdata1'));
      const data2 = JSON.parse(localStorage.getItem('userdata2'));
      const fullform = {fullForm: fullForm}
      const combinedData = {...data1, ...data2, ...fullform};
      localStorage.setItem('combinedData', JSON.stringify(combinedData));
      console.log("final", JSON.parse(localStorage.getItem('combinedData')))
      const formData = JSON.parse(localStorage.getItem('combinedData'))
      socket.emit('signup', formData);
    }
  }
}
