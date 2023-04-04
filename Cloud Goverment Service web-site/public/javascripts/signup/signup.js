import {Select} from '../select/select.js'
                           /*GENERAL START*/
const params = new URLSearchParams(window.location.search);
const pageNumber = params.get('page');
console.log("Page Number", pageNumber)
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


socket.on('countries', countries => {
  // console.log('Received countries:', countries);
  countriesArray = countries;
  createSelect(countriesArray);
});
                           /*GENERAL END*/



                           /*PAGE 1 START*/
var emailTypeCorrect = false
var checkPass = false
var loginTypeCorrect = false
if (pageNumber == 1){
  socket.on('typedPage1Err', status=>{
    if (status == false){
      alert('Enter the data correctly!')
    }
  })
                           /*PASSWORD START*/
  document.addEventListener('DOMContentLoaded', function() {
    var $password = document.getElementById('password')
    var $pass_sublabel = document.getElementById('pass_sublabel')
    var $form = document.querySelector('.form')
    var $submitButton = document.getElementById('btn')
    $form.removeAttribute('method')
    btn.setAttribute('type', 'button')
    // console.log($password)
    $password.addEventListener('input', () =>{
      // console.log("oi", $password.value)
      const password = $password.value;
      const hasLettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);
      const isLengthValid = password.length >= 8;
      const $check_pwd = document.getElementById('check_pwd')
      const $times_pwd = document.getElementById('times_pwd')
      if (hasLettersAndNumbers && isLengthValid) {
        $password.classList.remove('form-input-error')
        $password.classList.add('form-input-check')
        $pass_sublabel.classList.add('form-sublabel-check')
        $check_pwd.classList.add('form-input-confirm-sign-check')
        $times_pwd.classList.remove('form-input-confirm-sign-times')
        $form.setAttribute('method', 'POST')
        $submitButton.setAttribute('type', 'submit')
        checkPass = true
      } else {
        $password.classList.remove('form-input-check')
        $password.classList.add('form-input-error')
        $pass_sublabel.classList.remove('form-sublabel-check')
        $check_pwd.classList.remove('form-input-confirm-sign-check')
        $times_pwd.classList.add('form-input-confirm-sign-times')
        $form.removeAttribute('method')
        $submitButton.setAttribute('type', 'button')
        checkPass = false
      }
    })
  })
                           /*PASSWORD END*/

                           /*EMAIL START*/
  var emailError = false
  var emailErrorMess = false
  window.addEventListener('load', () => {
    const $email = document.getElementById('email')
    $email.oninput = () => {
      let email = $email.value
      socket.emit('checkEmail', email)
      if (!emailErrorMess){
        socket.on('emailError', status=>{
          console.log('sent')
          if (status){
            emailError = true
          }else {
            emailError = false
          }
          emailErrorFunc(emailError, $email.value)
        })

        emailErrorMess = true
      }

    }
  })
  function emailErrorFunc(emailError, input) {
    const $emailError = document.getElementById('email_sublabel')
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const $email = document.getElementById('email')
    // console.log(emailError, input)
    const $check_em = document.getElementById('check_em')
    const $times_em = document.getElementById('times_em')
    // console.log(!emailError, input != "", emailPattern.test(input) == true, input)
    if (emailError || input == "" || emailPattern.test(input) == false){  //incorrect email
      emailTypeCorrect = false
      $emailError.classList.remove('form-sublabel-opacity0')
      if (emailPattern.test(input) == false && !emailError || input == ""){
        $emailError.innerHTML = `Incorrect email input`
      }else if (emailPattern.test(input) == true && emailError){
        $emailError.innerHTML = `Account with this email already exists`
      }else {
        $emailError.innerHTML = `Incorrect email input or an account with this email already exists`
      }

        // console.log('incorrect')
      $check_em.classList.remove('form-input-confirm-sign-check')
      $email.classList.remove('form-input-check')
      $times_em.classList.add('form-input-confirm-sign-times')
      $email.classList.add('form-input-error')
    }else if (!emailError && input != "" && emailPattern.test(input) == true){   //correct email
      emailTypeCorrect = true
      $emailError.classList.add('form-sublabel-opacity0')
      // console.log('correct')
      $times_em.classList.remove('form-input-confirm-sign-times')
      $email.classList.remove('form-input-error')
      $check_em.classList.add('form-input-confirm-sign-check')
      $email.classList.add('form-input-check')
    }
  }
                             /*EMAIL END*/

                             /*LOGIN START*/
  var loginError = false
  var loginErrorMess = false
  window.addEventListener('load', () => {
    const $login = document.getElementById('login')
    $login.oninput = () => {
      let login = $login.value
      socket.emit('checkLogin', login)
      if (!loginErrorMess){
        socket.on('loginError', status=>{
          // console.log('sent')
          if (status){
            loginError = true
          }else {
            loginError = false
          }
          loginErrorFunc(loginError, login)
        })

        loginErrorMess = true
      }

    }
  })
  function loginErrorFunc(loginError, input) {
    const $loginError = document.getElementById('login_sublabel')
    const loginPattern = /^[A-Za-z]+$/;
    const $login = document.getElementById('login')
    // console.log(loginError, input)
    const $check_lg = document.getElementById('check_lg')
    const $times_lg = document.getElementById('times_lg')
    if (loginError || input == "" || loginPattern.test(input) == false){  //incorrect login
      loginTypeCorrect = false
      $loginError.classList.remove('form-sublabel-opacity0')
      if (loginPattern.test(input) == false && !loginError || input == ""){
        $loginError.innerHTML = `Incorrect login input`
      }else if (loginPattern.test(input) == true && loginError){
        $loginError.innerHTML = `Account with this login already exists`
      }else {
        $loginError.innerHTML = `Incorrect login input or an account with this login already exists`
      }

      // console.log('opqw')
      $check_lg.classList.remove('form-input-confirm-sign-check')
      $login.classList.remove('form-input-check')
      $times_lg.classList.add('form-input-confirm-sign-times')
      $login.classList.add('form-input-error')
    }else if (!loginError && input != "" && loginPattern.test(input) == true){   //correct login
      loginTypeCorrect = true
      $loginError.classList.add('form-sublabel-opacity0')
      // console.log('poi')
      $times_lg.classList.remove('form-input-confirm-sign-times')
      $login.classList.remove('form-input-error')
      $check_lg.classList.add('form-input-confirm-sign-check')
      $login.classList.add('form-input-check')
    }
  }
}

                           /*PAGE 1 END*/

                           /*PAGE 2 START*/
var confirmedEmail = false;
if (pageNumber == 2){
  window.addEventListener('load', ()=>{
    var $times = document.getElementById('times')
    var $check = document.getElementById('check')
    var $confirm_email = document.getElementById('confirm_email')
    $confirm_email.addEventListener('input', ()=>{
       $confirm_email.value=$confirm_email.value.replace(/[^0-9]/g,'');
    })


  $confirm_email.addEventListener('input', () =>{
    this.value=this.value.replace(/[^0-9]/g,'');
  })
  socket.on('sendcode', code=>{
    // console.log('Confirm?', code)
    if (code){
      confirmedEmail = true
      $times.classList.remove('form-input-confirm-sign-times')
      $confirm_email.classList.remove('form-input-error')
      $check.classList.add('form-input-confirm-sign-check')
      $confirm_email.classList.add('form-input-check')
    }else{
      confirmedEmail = false
      $check.classList.remove('form-input-confirm-sign-check')
      $confirm_email.classList.remove('form-input-check')
      $times.classList.add('form-input-confirm-sign-times')
      $confirm_email.classList.add('form-input-error')
    }
  })

    var confirmBtn = document.getElementById('confirm_code')
    confirmBtn.addEventListener('click', function() {
      let typecode = $confirm_email.value
      socket.emit('typecode', typecode)
    });

  })
}
                           /*PAGE 2 END*/


                           /*PAGE 3 START*/
let country;
function createSelect(countries) {
  const select = new Select("#select", {
    placeholder: "Choose your country",
    // selectedId: "UKR",
    data: countries,
    onSelect(item){
      // console.log("Selected:", item)
      country = item
      // console.log("country:", item)


    }
  });
  window.s = select

}
                           /*PAGE 3 END*/











                           /*FINAL SENDING*/
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
let fullForm = false;
window.onload = ()=>{
  const submitButton = document.getElementById('btn')
  submitButton.onclick = async () =>{
    if (pageNumber == 1){
      var loginInput = document.getElementById('login');
      var passInput = document.getElementById('password');
      var emailInput = document.getElementById('email');


      let userdata_local = JSON.parse(localStorage.getItem('userdata1'));
      // console.log("f", userdata_local)
      userdata_local.login = loginInput.value
      userdata_local.email = emailInput.value
      userdata_local.password = passInput.value
      // console.log("e", userdata_local)
      localStorage.setItem("userdata1", JSON.stringify(userdata_local));
      // console.log("le", JSON.parse(localStorage.getItem('userdata1')))
      socket.emit('email', emailInput.value)
      let typedPage1 = {
        emailType: emailTypeCorrect,
        passType: checkPass,
        loginType: loginTypeCorrect
      }
      socket.emit('page1Typed', typedPage1)
    }
    if (pageNumber == 3){
      var fnameInput = document.getElementById('fname');
      var mnameInput = document.getElementById('mname');
      var lnameInput = document.getElementById('lname');
      var countrySelect = country

      let userdata_local = JSON.parse(localStorage.getItem('userdata2'));
      // console.log("f", userdata_local)

      userdata_local.fname = fnameInput.value
      userdata_local.mname = mnameInput.value
      userdata_local.lname = lnameInput.value
      userdata_local.country = countrySelect
      // console.log("e", userdata_local)

      localStorage.setItem("userdata2", JSON.stringify(userdata_local));
      // console.log("sds", JSON.parse(localStorage.getItem('userdata2')))

      fullForm = true
      // console.log("oo", fullForm)
    }
    if (fullForm == true){
      const data1 = JSON.parse(localStorage.getItem('userdata1'));
      const data2 = JSON.parse(localStorage.getItem('userdata2'));
      const fullform = {fullForm: fullForm}
      const combinedData = {...data1, ...data2, ...fullform};
      localStorage.setItem('combinedData', JSON.stringify(combinedData));
      // console.log("final", JSON.parse(localStorage.getItem('combinedData')))
      const formData = JSON.parse(localStorage.getItem('combinedData'))
      socket.emit('signup', formData);
    }
  }
}
