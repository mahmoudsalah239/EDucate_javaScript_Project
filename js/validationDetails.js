import { course_names } from "./exportfunc.js";
let courses = course_names();
console.log(courses[0].course_Name );
var examName = document.getElementById("examName");
for (var i = 0; i < courses.length; i++) {

    let option =` <option value="${courses[i].course_Name}">${courses[i].course_Name}</option>`;
    examName.innerHTML+=option;
}
var regularExpressionOfExamName = "^[a-zA-Z]{1,}.+";

function validRegExpMatch() {
    var examName = document.getElementById("examName").value;
    var re = new RegExp(regularExpressionOfExamName);
    return re.test(examName);
}
function validateExamName() {
    var examNameError = document.getElementById('examNameError');
    var isName = validRegExpMatch();
    examNameError.innerHTML = null;
    if (isName) {
        console.log(isName);
        return true;
    }
    else {
        console.log(isName);

        examNameError.innerHTML = "enter a valid name that is more than 3 letters long";
        return false;
    }
}

function validateExamQuestions() {
    var numberOfQuestions = Number(document.getElementById('numberOfQuestions').value);
    var examQuestionError = document.getElementById('examQuestionError');
    examQuestionError.innerHTML = null;
    if (numberOfQuestions > 0 && numberOfQuestions <= 10) {
        return true;
    }
    else {
        examQuestionError.innerHTML = "enter number of questions between 1 and 10";
        return false;
    }
}
/*
function validateExamOptions() {
    var numberOfOptions = Number(document.getElementById('numberOfOptions').value);
    var QuestionOptionsError = document.getElementById('QuestionOptionsError');
    QuestionOptionsError.innerHTML = null;
    if (numberOfOptions > 0 && numberOfOptions <= 4) {
        return true;
    }
    else {
        QuestionOptionsError.innerHTML = "Please enter the number of Options between 1 and 4";
        return false;
    }
}
*/
function validateExamDuration() {
    var examDuration = Number(document.getElementById('examDuration').value);
    var examDurationError = document.getElementById('examDurationError');
    examDurationError.innerHTML = null;
    if (examDuration > 0 && examDuration <= 60) {
        return true;
    }
    else {
        examDurationError.innerHTML = "enter number of minutes between 10 and 60 minutes";
        return false;
    }
}
function validateForm(event) {
    isName = validateExamName();
    isQuestion = validateExamQuestions();
    //isOption = validateExamOptions();
    isMinutes = validateExamDuration();

    if (!isName || !isQuestion || !isMinutes ){//|| !isOption) {
        event.preventDefault();
    }
}

// add  blure even to  input  exam name

examName.addEventListener("blur", validateExamName);

// add  blure even to  input  number of questions
var numberOfQuestions = document.getElementById('numberOfQuestions');
numberOfQuestions.addEventListener("blur", validateExamQuestions);

/*
// add  blure even to  input  number of options 
var numberOfOptions = document.getElementById('numberOfOptions');
numberOfOptions.addEventListener("blur", validateExamOptions);
*/
// add  blure even to  input  exam duration
var examDuration = document.getElementById('examDuration');
examDuration.addEventListener("blur", validateExamDuration);

// add  submit to form
var detailsOfExam = document.getElementById('detailsOfExam');
detailsOfExam.addEventListener("submit", validateForm);

