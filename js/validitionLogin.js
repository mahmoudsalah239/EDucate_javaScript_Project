
// var userPasswordLogin = document.getElementById("passwordLogin").value;
// var userNameLogin = document.getElementById("userNameLogin").value;
// console.log(userPasswordLogin);
// console.log(userNameLogin);

document.getElementById("myFormLogin").addEventListener("submit", function (event) {
    event.preventDefault();
    var correctDataOfLogin = validateLogin();
    if (correctDataOfLogin == true) {
        var emali = document.getElementById("userNameLogin").value;
        localStorage.setItem("currentUserEmail", emali);
        event.target.submit();
    }
});

function validateLogin() {
    document.getElementById("errorUserNameLogin").classList.add("error");
    document.getElementById("errorPasswordLogin").classList.add("error");
    var userPasswordLogin = document.getElementById("passwordLogin").value;
    var userNameLogin = document.getElementById("userNameLogin").value;
    console.log(userNameLogin);
    var flag = true;
    if (userNameLogin == "" || userPasswordLogin == "") {
        if (userNameLogin == "") {
            document.getElementById("errorUserNameLogin").classList.remove("error");
            clearLogInForm();
            flag = false;
        }
        if (userPasswordLogin == "") {
            document.getElementById("errorPasswordLogin").classList.remove("error");
            flag = false;
        }
    }
    else {
        var formAction = document.getElementById("myFormLogin");
        var isExist = searchAdoutStudent(userNameLogin, userPasswordLogin);
        if (isExist == 1) {
            var isStudent = false;
            var Instructors = localStorage.getItem("instructors");
            Instructors = JSON.parse(Instructors);
            for (var i = 1; i <= 4; i++) {
                if (Instructors[`instructor${i}`]["email"] == userNameLogin) {
                    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
                    formAction.action = "AllCourses.html";
                    console.log(formAction);
                    isStudent = true;
                    i = 5;
                }
            }
            if (isStudent == false) {
                formAction.action = "studentHome.html";
            }
            console.log(document.getElementById("myFormLogin").action);
        }
        if (isExist == 0) {
            formAction.action = "studentHome.html";
            document.getElementById("errorUserNameLogin").classList.remove("error");
            flag = false;
        }
        else if (isExist == -1) {
            formAction.action = "studentHome.html";
            document.getElementById("errorPasswordLogin").classList.remove("error");
            flag = false;
        }
    }
    return flag;
}
/*
this function returns:
    1 if userName and password are exist
    0 if userName are not exist
    -1 if password is not correct and userName is exist
    -2 if localStorage  don't contain any data
*/

function searchAdoutStudent(userNameLogin, userPasswordLogin) {
    //get data from local storage 
    console.log("userName: " + userNameLogin);
    var oldData = localStorage.getItem("stuentData");
    if (oldData != null) {
        var resultOfOldData = JSON.parse(oldData);
        console.log(resultOfOldData);
        var contOfStudentsAreRegisterd = Number(localStorage.getItem("contOfStudents"));
        for (var i = 0; i < contOfStudentsAreRegisterd; i++) {
            console.log("email from LocalStorage: " + resultOfOldData[`student${i}`].email);
            console.log("student Log In: " + userNameLogin);
            if (resultOfOldData[`student${i}`].email == userNameLogin) {
                console.log("eamil:" + resultOfOldData[`student${i}`].email);
                if (resultOfOldData[`student${i}`].password == userPasswordLogin) {
                    return 1;
                }
                return -1;
            }
        }
        return 0;
    }
    else {
        document.getElementById("errorUserNotFind").classList.remove("error");
        clearLogInForm();
        return -2;
    }
}

function clearLogInForm() {
    document.getElementById("passwordLogin").value = null;
    document.getElementById("userNameLogin").value = null;
}