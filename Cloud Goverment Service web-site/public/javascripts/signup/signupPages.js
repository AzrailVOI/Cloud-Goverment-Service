const form = document.querySelector('.form-div')
const body = document.getElementById('body')
function page3(){
    return `
<div>
  <label><b>First Name*</b></label>
  <input class="form-input" id="fname" type="text" name="fname" required="required"/>
</div>
<div>
  <label><b>Middle Name*</b></label>
  <input class="form-input" id="mname" type="text" name="mname" required="required"/>
</div>
<div>
  <label><b>Last Name*</b></label>
  <input class="form-input" id="lname" type="text" name="lname" required="required"/>
</div>
<div>
  <label><b>Your country</b></label>
  <div id="select"></div>
</div>
    `
}


function page1() {
    return `
<div>
  <label><b>Create Login*</b></label>
  <div class="form-input-confirm">
    <input class="form-input" id="login" type="text" name="login" required="required"/>
    <i class="fa fa-check form-input-confirm-sign" id="check_lg"></i>
    <i class="fa fa-times form-input-confirm-sign" id="times_lg"></i>
  </div>
  <span class="form-sublabel form-sublabel-email form-sublabel-opacity0" id="login_sublabel">*</span>
</div>
<div>
  <label><b>Create Password*</b></label>
  <div class="form-input-confirm">
    <input class="form-input" id="password" type="password" name="password"  required="required"/>
    <i class="fa fa-check form-input-confirm-sign" id="check_pwd"></i>
    <i class="fa fa-times form-input-confirm-sign" id="times_pwd"></i>
  </div>
  <span class="form-sublabel form-sublabel-password" id="pass_sublabel">*The password must be at least 8 characters long and contain both English letters and numbers.</span>
</div>
<div>
  <label><b>Your EMail*</b></label>
  <div class="form-input-confirm">
    <input class="form-input form-input-confirm" id="email" type="email" name="email" required="required"/>
    <i class="fa fa-check form-input-confirm-sign" id="check_em"></i>
    <i class="fa fa-times form-input-confirm-sign" id="times_em"></i>
  </div>
  <span class="form-sublabel form-sublabel-email form-sublabel-opacity0" id="email_sublabel">*</span>
  
<!--  <button type="button" class="form-input form-btn form-btn-type_button" id="check_email">Check EMail availability</button>-->
  
</div>
    `
}
function page2() {

    let formReal = document.querySelector('.form')
    formReal.setAttribute('action', 'signup?page=3')
    return`
<div>
  <label style="font-size: 15pt;"><b>Confirm your EMail*</b></label>
  <div class="form-input-confirm">
    <input class="form-input form-input-confirm"  id="confirm_email" type="text" name="confirm_email" required="required" placeholder="123456" maxlength="6"/>
    <i class="fa fa-check form-input-confirm-sign" id="check"></i>
    <i class="fa fa-times form-input-confirm-sign" id="times"></i>
  </div>
  <span class="form-sublabel">Enter the code sent to your email. If you haven't received the email, please check your spam or junk folder.</span>

</div>   
    `
}

/*
form-input-error
form-input-check
form-input-confirm-sign-check
form-input-confirm-sign-times
*/


for (let i = 0; i < 1; i++) {
    var submBut = document.getElementById('btn')
}
const params = new URLSearchParams(window.location.search);
const pageNumber = params.get('page');
if (pageNumber == 1){
    form.insertAdjacentHTML('beforeend', page1())
    submBut.setAttribute('data-page', "2")
}else if(pageNumber == 2){
    form.insertAdjacentHTML('beforeend', page2())
    submBut.setAttribute('data-page', "3")
    submBut.value = "Continue"
    submBut.insertAdjacentHTML('beforebegin', `
    <button type="button" class="form-input form-btn form-btn-type_button" id="confirm_code">Confirm Code</button>
    `)
}else if(pageNumber == 3){
    form.insertAdjacentHTML('beforeend', page3())
    submBut.value = 'Complete Sign Up'
}