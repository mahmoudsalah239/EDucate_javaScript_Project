
var oldPasswordFromLocalStorage = "";
var keyOfCurrentUser = "";
var Students = localStorage.getItem("stuentData");
var resultOfOldData = JSON.parse(Students);
function getCurrentUserFromLocalStorage() {
    var emailOfCurrentUser = localStorage.getItem('currentUserEmail');
    var contOfStudents = Number(localStorage.getItem("contOfStudents"));
    for (var i = 0; i < contOfStudents; i++) {
        if (resultOfOldData[`student${i}`].email == emailOfCurrentUser) {
            oldPasswordFromLocalStorage = resultOfOldData[`student${i}`].password;
            keyOfCurrentUser = `student${i}`;
            return true;
        }
    }
    return false;
}


getCurrentUserFromLocalStorage();
document.getElementById("fullName").innerHTML = resultOfOldData[keyOfCurrentUser].name;
document.getElementById("imageInChangePassword").src=resultOfOldData[keyOfCurrentUser].image;

console.log(oldPasswordFromLocalStorage);
var regularExpressionOfPassword = "^[a-zA-Z]{3,}[0-9]{1,}[@#$%^&*()+_\-][a-z]{2,}$";
function validRegExpMatchPassword() {
    var password = document.getElementById("newPassword").value;
    var re = new RegExp(regularExpressionOfPassword);
    return re.test(password);
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

function validPasswordMatch() {
    var password = document.getElementById('newPassword');
    var repeatPassword = document.getElementById('confirmNewPassword');
    var passwordMatchError = document.getElementById('errorUserPasswordAndConfirm');
    passwordMatchError.classList.add("error");
    if (password.value !== repeatPassword.value && (password.value != "" || repeatPassword.value != "")) { //
        passwordMatchError.classList.remove("error");
        return false;
    }
    else {
        passwordMatchError.classList.add("error");
        return true;
    }
}
function clearInputs() {
    document.getElementById('newPassword').value = "";
    document.getElementById('confirmNewPassword').value = "";
    document.getElementById('oldPassword').value = "";
}

function changePassword() {
    var oldPassword = document.getElementById('oldPassword').value;
    var oldPasswordError = document.getElementById('errorOldPassword');
    if (oldPassword == "") {
        oldPasswordError.classList.remove("error");
        oldPasswordError.innerText = "Please enter a old password";
    }
    else if (oldPassword != oldPasswordFromLocalStorage) {
        oldPasswordError.classList.remove("error");
        oldPasswordError.innerText = "Password is incorrect";
    }
    else {
        var matchedPasswords = validPasswordMatch();
        if (matchedPasswords) {
            var password = document.getElementById('newPassword').value;

            resultOfOldData[keyOfCurrentUser].password = password;
            var result = JSON.stringify(resultOfOldData);
            localStorage.setItem("stuentData", result);
            document.getElementById("changedSuccessfully").classList.remove("error");
            clearInputs();
        }
    }
}

document.getElementById("newPassword").addEventListener("blur", validatePassword);
document.getElementById("confirmNewPassword").addEventListener("blur", validPasswordMatch);
document.getElementById("btnChangePassword").addEventListener("click", changePassword);
