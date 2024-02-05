
// var currentUser = {};
var resultOfOldData = {};
var keyOfCurrentUser = "";
var emailOfCurrentUser = localStorage.getItem('currentUserEmail');

function getCurrentUserFromLocalStorage(emailOfCurrentUser) {
    var contOfStudents = Number(localStorage.getItem("contOfStudents"));
    var Students = localStorage.getItem("stuentData");
    if (Students != null) {
        resultOfOldData = JSON.parse(Students);
        //search for emali 
        for (var i = 0; i < contOfStudents; i++) {
            if (resultOfOldData[`student${i}`].email == emailOfCurrentUser) {
                // currentUser = resultOfOldData[`student${i}`];
                keyOfCurrentUser = `student${i}`;
                i = contOfStudents;
            }
        }
    }
}

getCurrentUserFromLocalStorage(emailOfCurrentUser);

function chackEmail() {
    var errorEmail = document.getElementById("errorUserEmail");
    errorEmail.classList.add("error");
    var interdEmail = document.getElementById("chackEmail").value;
    if (interdEmail == "") {
        errorEmail.classList.remove("error");
        errorEmail.innerHTML = "Please enter a valid email";
    }
    else if (interdEmail != emailOfCurrentUser) {
        errorEmail.classList.remove("error");
        errorEmail.innerHTML = "This email not currected";
    }
    else {
        createBodyOfPssword();
    }
}
function createBodyOfPssword() {

    //h1
    var h1Element = document.createElement('h1');
    h1Element.className = "text-center mb-5 col-12";
    h1Element.textContent = "Change Password";
    //div
    var divPerantElement = document.createElement('div');
    divPerantElement.className = "col-12 d-flex justify-content-center row mb-3";
    //inputs
    var input1NewPasswordElement = document.createElement('input');
    input1NewPasswordElement.id = "newPassword";
    input1NewPasswordElement.type = "password";
    input1NewPasswordElement.className = "form-control  w-75";
    input1NewPasswordElement.placeholder = "Enter New Password...";
    input1NewPasswordElement.addEventListener("blur", validatePassword);

    var input2ConfirmNewPasswordElement = document.createElement('input');
    input2ConfirmNewPasswordElement.id = "confirmNewPassword";
    input2ConfirmNewPasswordElement.type = "password";
    input2ConfirmNewPasswordElement.className = "mt-3 form-control  w-75";
    input2ConfirmNewPasswordElement.placeholder = "Confirm New Password...";
    input2ConfirmNewPasswordElement.addEventListener("blur", validPasswordMatch);
    //error divs
    var errorNewPasswordDivElement = document.createElement("div");
    errorNewPasswordDivElement.id = "errorNewPassword";
    errorNewPasswordDivElement.className = "error w-75 ps-3 mt-2  alert alert-danger p-0";
    errorNewPasswordDivElement.textContent = "Enter Complex Password";

    var errorConfirmNewPasswordDivElement = document.createElement("div");
    errorConfirmNewPasswordDivElement.id = "errorConfirmNewPassword";
    errorConfirmNewPasswordDivElement.className = "error w-75 ps-3 mt-2  alert alert-danger p-0";
    errorConfirmNewPasswordDivElement.textContent = " New Password, Confirm New Passwordnot match";

    //button
    var containerOfButtonElement = document.createElement("div");
    containerOfButtonElement.className = " px-0 col-12 d-flex justify-content-center mb-4";
    var buttonSubmitElement = document.createElement("button");
    buttonSubmitElement.className = "disabled btn mt-3 d-block btn-success w-75";
    buttonSubmitElement.id = "addNewPassword";
    buttonSubmitElement.textContent = "Submit";
    buttonSubmitElement.onclick = changeOldPasswordInLocalStorage;
    //append button submit to div container
    containerOfButtonElement.appendChild(buttonSubmitElement);

    //append  h1,input newPassword,input confirmNewPassword,
    //div errorNewPassword , div errorConfirmNewPassword and container of button to section
    divPerantElement.appendChild(h1Element);
    divPerantElement.appendChild(input1NewPasswordElement);
    divPerantElement.appendChild(errorNewPasswordDivElement);
    divPerantElement.appendChild(input2ConfirmNewPasswordElement);
    divPerantElement.appendChild(errorConfirmNewPasswordDivElement);
    divPerantElement.appendChild(containerOfButtonElement);
    //remove any tags from the section element
    document.getElementById("bodyOfSection").innerHTML = "";
    //append the perant element to the section
    document.getElementById("bodyOfSection").appendChild(divPerantElement);
}

var regularExpressionOfPassword = "^[a-zA-Z]{3,}[0-9]{1,}[@#$%^&*()+_\-][a-z]{2,}$";
function validRegExpMatchPassword() {
    var newPassword = document.getElementById("newPassword").value;
    var re = new RegExp(regularExpressionOfPassword);
    return re.test(newPassword);
}
function validatePassword() {
    var btnSubmitNewPassword = document.getElementById("addNewPassword");
    btnSubmitNewPassword.classList.remove("disabled");
    var errorPassword = document.getElementById("errorNewPassword");
    errorPassword.classList.add("error");
    var isPassword = validRegExpMatchPassword();
    if (isPassword) {
        return true;
    }
    else {
        btnSubmitNewPassword.classList.add("disabled");
        errorPassword.classList.remove("error");
        return false;
    }
}
function validPasswordMatch() {
    var btnSubmitNewPassword = document.getElementById("addNewPassword");
    btnSubmitNewPassword.classList.remove("disabled");
    var password = document.getElementById('newPassword');
    var repeatPassword = document.getElementById('confirmNewPassword');
    var passwordMatchError = document.getElementById('errorConfirmNewPassword');
    passwordMatchError.classList.add("error");
    if (password.value !== repeatPassword.value) {
        passwordMatchError.classList.remove("error");
        btnSubmitNewPassword.classList.add("disabled");
        return false;
    }
    else {
        passwordMatchError.classList.add("error");
        return true;
    }
}

function changeOldPasswordInLocalStorage() {
    var matched = validPasswordMatch();
    if (matched) {
        var password = document.getElementById('newPassword').value;
        resultOfOldData[keyOfCurrentUser].password = password;
        var result = JSON.stringify(resultOfOldData);
        localStorage.setItem("stuentData", result);
        window.location.href = "login.html";
    }
}
document.getElementById("btnChackEmail").addEventListener("click", chackEmail);


/*
    var body = `
                <h1 class="text-center mb-5 col-12">Change Password</h1>
                <div class="col-12 d-flex justify-content-center row mb-3">
                    <input id="newPassword" class="form-control  w-75" type="password" placeholder="Enter New Password...">
                    <div id="errorNewPassword" class="error w-75 ps-3 mt-2  alert alert-danger p-0">
                        Enter Complex Password
                    </div>
                    <input id="confirmNewPassword" class="mt-3 form-control  w-75" type="password" placeholder="Confirm New Password...">
                    <div id="errorConfirmNewPassword" class="error w-75 ps-3 mt-2  alert alert-danger p-0">
                        New Password, Confirm New Passwordnot match
                    </div>
                </div>
                <div class="col-12 d-flex justify-content-center mb-4">
                    <button id="addNewPassword" class="btn mt-3 d-block btn-success w-75">Submit</button>
                </div>
            `
    */
