
//regular Expression for  name , email ,password and SSN
var regularExpressionOfFullName = "^[a-zA-Z]{3,}";
var regularExpressionOfEmail = "^[a-zA-Z]{3,}[1-9]{1,}@[a-z]{2,6}\.[a-z]{2,6}$";
var regularExpressionOfPassword = "^[a-zA-Z]{3,}[0-9]{1,}[@#$%^&*()+_\-][a-z]{2,}$";
var regularExpressionOfSSN = "^[0-9]{14}$";

//chack the userNname matches the pattern
function validRegExpMatchForName() {
    var name = document.getElementById("userName").value;
    var re = new RegExp(regularExpressionOfFullName);
    return re.test(name);
}

function validRegExpMatchForEmail() {
    var email = document.getElementById("userEmail").value;
    var re = new RegExp(regularExpressionOfEmail);
    return re.test(email);
}
function validRegExpMatchPassword() {
    var password = document.getElementById("userPassword").value;
    var re = new RegExp(regularExpressionOfPassword);
    return re.test(password);
}
function validRegExpMatchForSSN() {
    var ssn = document.getElementById("userSSN").value;
    var re = new RegExp(regularExpressionOfSSN);
    return re.test(ssn);
}
function validateFullName() {
    var errorName = document.getElementById("errorUserName");
    errorName.classList.add("error");
    var isName = validRegExpMatchForName();
    if (isName) {
        return true;
    }
    else {
        errorName.classList.remove("error");
        return false;
    }
}

function validateSSN() {
    var errorSSN = document.getElementById("errorUserSSN");
    errorSSN.classList.add("error");
    var isSSN = validRegExpMatchForSSN();
    if (isSSN) {
        return true;
    }
    else {
        errorSSN.classList.remove("error");
        return false;
    }
}
function validateAddress() {
    var address = document.getElementById("address").value;
    errorAddress = document.getElementById("errorUserAddress");
    errorAddress.classList.add("error");
    if (address != "none") {
        return true;
    }
    else {
        errorAddress.classList.remove("error");
        return false;
    }
}

function validateEmail() {
    var errorEmail = document.getElementById("errorUserEmail");
    errorEmail.classList.add("error");
    var isEmail = validRegExpMatchForEmail();
    if (isEmail) {
        return true;
    }
    else {
        errorEmail.classList.remove("error");
        errorEmail.innerHTML = "Please enter correct Email";
        return false;
    }
}

function validPasswordMatch() {
    var password = document.getElementById('userPassword');
    var repeatPassword = document.getElementById('ConfirmPassword');
    var passwordMatchError = document.getElementById('errorUserPasswordAndConfirm');
    passwordMatchError.classList.add("error");
    if (password.value !== repeatPassword.value) {
        passwordMatchError.classList.remove("error");
        return false;
    }
    else {
        passwordMatchError.classList.add("error");
        return true;
    }
}
function validatePassword() {
    var errorPassword = document.getElementById("errorUserPassword");
    errorPassword.classList.add("error");
    var isPassword = validRegExpMatchPassword();
    if (isPassword) {
        return true;
    }
    else {
        errorPassword.classList.remove("error");
        return false;
    }
}
//add event 'blur' to  all inputs in Form 
document.getElementById("userName").addEventListener("blur", validateFullName);
document.getElementById("userEmail").addEventListener("blur", validateEmail);
document.getElementById("userPassword").addEventListener("blur", validatePassword);
document.getElementById("ConfirmPassword").addEventListener("blur", validPasswordMatch);
document.getElementById("userSSN").addEventListener("blur", validateSSN);
document.getElementById("address").addEventListener("blur", validateAddress);

document.getElementById("myForm").addEventListener("submit", function (event) {
    //stop the defult action of the Form 
    event.preventDefault();
    var isPassword = validatePassword();
    var isConfirmPassword = validPasswordMatch();
    var isName = validateFullName();
    var isEmail = validateEmail();
    var isSSN = validateSSN();
    //this console for test 
    console.log(" Name: ".concat(isName));
    console.log(" Password: " + isPassword);
    console.log(" Email: " + isEmail);
    console.log(" SSN: " + isSSN);
    console.log(" Confirm Password: " + isConfirmPassword);

    if (isPassword == false || isName == false || isEmail == false || isSSN == false || isConfirmPassword == false) {
    }
    else {

        var isSaved = saveInformationToLocalStorage();
        if (isSaved) {

            event.target.submit();
        }
    }
});

function saveInformationToLocalStorage() {
    //get the data that student entered into the register form
    var userNameRegister = document.getElementById("userName").value;
    var userEmailRegister = document.getElementById("userEmail").value;
    var userPasswordRegister = document.getElementById("userPassword").value;
    var userSsnRegister = document.getElementById("userSSN").value;
    var userAddressRegister = document.getElementById("address").value;
    //console.log(name, email, password, ssn,address);
    var object = {
        "name": userNameRegister,
        "email": userEmailRegister,
        "address": userAddressRegister,
        "password": userPasswordRegister,
        "ssn": userSsnRegister,
        "image": "images/maleOrFemale.jpg"
    }
    //get cont Of Students from localstorage
    var contOfStudents = 0;
    if (localStorage.getItem("contOfStudents") == null) {
        localStorage.setItem("contOfStudents", contOfStudents);
    }
    else {
        contOfStudents = Number(localStorage.getItem("contOfStudents"));
    }

    //get students that are registerd from localstorage
    var flagForEmail = false;
    var oldData = localStorage.getItem("stuentData");
    if (oldData != null) {
        resultOfOldData = JSON.parse(oldData);
        //search for emali 
        console.log("Number of student = " + contOfStudents);
        for (var i = 0; i < contOfStudents; i++) {
            console.log("cont of index = " + i);
            //console.log("Email from LocalStorage = " + resultOfOldData[`student${i}`].email);
            if (resultOfOldData[`student${i}`].email == userEmailRegister) {
                flagForEmail = true;
                i = contOfStudents;
            }
        }
    }
    else {
        var resultOfOldData = {};
    }
    //select  tag that have errorUserEmail
    //chack if email is already existing in local storage  show error message 
    var errorEmail = document.getElementById("errorUserEmail");
    if (flagForEmail) {
        errorEmail.classList.remove("error");
        errorEmail.innerHTML = "This Email is already exists";
        return false;
    }
    //if email is not existing in local storage  store  this student in local storage
    else {
        errorEmail.classList.add("error");
        resultOfOldData[`student${contOfStudents}`] = object;
        var result = JSON.stringify(resultOfOldData);
        localStorage.setItem("stuentData", result);
        contOfStudents += 1;
        localStorage.setItem("contOfStudents", contOfStudents);
        localStorage.setItem("currentUserEmail", userEmailRegister)
        return true;
    }
}
