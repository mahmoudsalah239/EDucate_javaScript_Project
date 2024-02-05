var currentUser = {};
var resultOfOldData = {};
var keyOfCurrentUser = "";
function getCurrentUserFromLocalStorage() {
    var emailOfCurrentUser = localStorage.getItem('currentUserEmail');
    var contOfStudents = Number(localStorage.getItem("contOfStudents"));
    var Students = localStorage.getItem("stuentData");
    if (Students != null) {
        resultOfOldData = JSON.parse(Students);
        //search for emali 
        //console.log("Number of student = " + contOfStudents);
        for (var i = 0; i < contOfStudents; i++) {
            //console.log("cont of index = " + i);
            //console.log("Email from LocalStorage = " + resultOfOldData[`student${i}`].email);
            if (resultOfOldData[`student${i}`].email == emailOfCurrentUser) {
                currentUser = resultOfOldData[`student${i}`];
                keyOfCurrentUser = `student${i}`;
                i = contOfStudents;
            }
        }
    }
}

if (currentUser.hasOwnProperty("image") == false) {
    currentUser["image"] = "images/maleOrFemale.jpg";
}

getCurrentUserFromLocalStorage();
var element = document.getElementById("registerAndLogin");
element.innerHTML = `<div class='pe-5'><a href='studentProfile.html'><i class='fa-solid fa-user fa-2xl'></i><span class='fs-4'> ${currentUser["name"]}</span></a></div>`;
var image = document.getElementById("profileImage");
image.src = currentUser["image"];
var imagesManOrGirl;
function pushImageis() {
    if (resultOfOldData[keyOfCurrentUser].gender == "male") {
        imagesManOrGirl = `
                    <div class="col-md col-6">
                        <img src="images/manChooice1.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>
                    <div class="col-md col-6">
                        <img src="images/manChooice2.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>

                    <div class="col-md col-6">
                        <img src="images/manChooice3.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>

                    <div class="col-md col-6">
                        <img src="images/manChooice4.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>
                    <div class="col-md col-6">
                        <img src="images/manChooice5.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>
    `

    }
    else {

        imagesManOrGirl = `
                    <div class="col-md col-6">
                        <img src="images/girlChooice1.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>
                    <div class="col-md col-6">
                        <img src="images/girlChooice2.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>

                    <div class="col-md col-6">
                        <img src="images/girlChooice3.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>

                    <div class="col-md col-6">
                        <img src="images/girlChooice4.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>
                    <div class="col-md col-6">
                        <img src="images/girlChooice5.jpg" alt="Lightbox Image" class=" shadow rounded-4 lightboxImage"
                            onclick="selectedImage(this)">
                    </div>
    `

    }
    var imageContainer = document.getElementById("imageToChooice");
    if (imageContainer != null) {
        imageContainer.innerHTML = imagesManOrGirl;
    }
}
pushImageis();
// function searchAboutEmail(email) {
// }

var firstNameOfStudent = "";
var lastNameOfStudent = "";
var emailOfStudent = "";
var addressOfStudent = "";
var SSNOfStudent = "";
var phoneOfStudent = "";
var genderOfStudent = "";

function getInputTags() {
    firstNameOfStudent = document.getElementById("firstName");
    lastNameOfStudent = document.getElementById("lastName");
    emailOfStudent = document.getElementById("email");
    addressOfStudent = document.getElementById("address");
    SSNOfStudent = document.getElementById("SSN");
    phoneOfStudent = document.getElementById("phone");
    genderOfStudent = document.getElementById("gendar");

}
getInputTags();


function displayDataOfstudentInForm() {
    getCurrentUserFromLocalStorage();
    var userName = currentUser["name"];
    // console.log("name = " + userName);
    var firstAndLastName = userName.split(" ");
    firstNameOfStudent.value = firstAndLastName[0];
    if (firstAndLastName.length > 1) {
        lastNameOfStudent.value = firstAndLastName[1];
    }
    emailOfStudent.value = currentUser["email"];
    SSNOfStudent.value = currentUser["ssn"];

    if (currentUser.hasOwnProperty("phone")) {
        phoneOfStudent.value = currentUser["phone"];
    }


    if (currentUser.hasOwnProperty("gender")) {
        var gendarOfStudent = currentUser["gender"];
        var selectedGender = document.querySelector(`[value="${gendarOfStudent}"]`);
        if (selectedGender) {
            selectedGender.selected = true;
        }
    }
    var addressOfStudent = currentUser["address"];
    var selectedAddress = document.querySelector(`[value="${addressOfStudent}"]`);
    if (selectedAddress) {
        selectedAddress.selected = true;
    }
    var fullName = firstNameOfStudent.value.concat(" " + lastNameOfStudent.value);
    document.getElementById("fullName").innerHTML = fullName;


}

displayDataOfstudentInForm();



function searchAboutEmailInLocalStorage() {
    var contOfStudents = Number(localStorage.getItem("contOfStudents"));
    var Students = localStorage.getItem("stuentData");
    var emailToUpdate = document.getElementById("email").value;
    console.log(emailToUpdate);
    if (Students != null) {
        resultOfOldData = JSON.parse(Students);
        for (var i = 0; i < contOfStudents; i++) {
            var studentKey = `student${i}`;
            if (resultOfOldData[studentKey].email == emailToUpdate && studentKey != keyOfCurrentUser) {
                //email is existing in local storage
                return i;
            }
        }
        //email not exist in local storage
        return -1;
    }
    //error  in data in local storage  "not data in local storage"
    return -2;
}


var regularExpressionOfEmail = "^[a-zA-Z]{3,}[1-9]{1,}@[a-z]{2,6}\.[a-z]{2,6}$";
var regularExpressionOfPhoneNumber = "^(011|010|012|015)[0-9]{8}$";

function validRegExpMatchForEmail() {
    var email = document.getElementById("email").value;
    var re = new RegExp(regularExpressionOfEmail);
    return re.test(email);
}
function validRegExpMatchForPhoneNumber() {
    var phone = document.getElementById("phone").value;
    if (phone == "") {
        return true;
    }
    else {
        var re = new RegExp(regularExpressionOfPhoneNumber);
        return re.test(phone);
    }

}

function validateEmail() {
    var errorEmail = document.getElementById("errorUserEmail");
    errorEmail.classList.add("error");
    var isEmail = validRegExpMatchForEmail();
    if (isEmail) {
        var isExists = searchAboutEmailInLocalStorage();
        if (isExists >= 0) {
            errorEmail.classList.remove("error");
            errorEmail.innerHTML = "This Email is already exists";
            document.getElementById("btnUpdate").classList.add("disabled");
        }
        else {
            document.getElementById("btnUpdate").classList.remove("disabled");
        }
        return true;
    }
    else {
        errorEmail.classList.remove("error");
        errorEmail.innerHTML = "Please enter correct Email";
        document.getElementById("btnUpdate").classList.add("disabled");

        return false;
    }
}
function validatePhoneNumber() {
    var errorEmail = document.getElementById("errorUserPhone");
    errorEmail.classList.add("error");
    var isPhone = validRegExpMatchForPhoneNumber();
    if (isPhone) {
        document.getElementById("btnUpdate").classList.remove("disabled");
        return true;
    }
    else {
        errorEmail.classList.remove("error");
        errorEmail.innerHTML = "Please enter correct phone number";
        document.getElementById("btnUpdate").classList.add("disabled");
        return false;
    }
}

document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhoneNumber);

function getDataFromInputsTages() {
    getInputTags();
    getCurrentUserFromLocalStorage();
    var fullName = firstNameOfStudent.value.concat(" " + lastNameOfStudent.value);
    // console.log(fullName);
    document.getElementById("fullName").innerHTML = fullName;
    currentUser["name"] = fullName;
    currentUser["email"] = emailOfStudent.value;
    currentUser["address"] = addressOfStudent.value;
    //currentUser["ssn"] = SSNOfStudent.value;
    currentUser["phone"] = phoneOfStudent.value;
    currentUser["gender"] = genderOfStudent.value;
    console.log("Gender: " + genderOfStudent.value);

    resultOfOldData[keyOfCurrentUser] = currentUser;
    var result = JSON.stringify(resultOfOldData);
    localStorage.setItem("stuentData", result);
    localStorage.setItem('currentUserEmail', emailOfStudent.value);

    image.src = currentUser["image"];
    pushImageis();
    displayDataOfstudentInForm();
}

document.getElementById("btnUpdate").addEventListener("click", getDataFromInputsTages);

function showImages() {
    var contenarOfImage = document.getElementById("lightbox");
    contenarOfImage.style.display = "block";
    console.log(contenarOfImage);

}
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}
function selectedImage(image) {
    var src = image.getAttribute('src');
    currentUser["image"] = src;
    resultOfOldData[keyOfCurrentUser] = currentUser;
    var result = JSON.stringify(resultOfOldData);
    localStorage.setItem("stuentData", result);
    document.getElementById("profileImage").src = src;
    closeLightbox();
}
