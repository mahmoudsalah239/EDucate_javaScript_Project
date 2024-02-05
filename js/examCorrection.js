


var examName = null;
var params = null;
var numberOfQuestions = 0;
function getInformationFromURL() {
    var queryString = window.location.search;
    params = queryString.split("?")[1];
    params = params.split("&");
    examName = params[0].split("=")[1];
    console.log(examName);
    params.shift();
}
getInformationFromURL();
studentAnswer = {};

for (let index = 0; index < params.length; index++) {
    studentAnswer[params[index].split("=")[0]] = params[index].split("=")[1];
}

var corrctAnswer = {};
var points = {};
var boolAnswer = {};
var totalPointsOfCorrectExam = 0;
var totalPointsOfStudentExam = 0;

//get exam from local storage  and store correct answers to correctAnswer dictionary
if (examName != null) {
    var allExams = localStorage.getItem("exams");
    allExams = JSON.parse(allExams);
    var exam = allExams[examName];
    numberOfQuestions = exam["numberOfOptions"];
    console.log(exam);
    for (let index = 1; index <= params.length; index++) {
        corrctAnswer[`question${index}Radio`] = exam[`question${index}Radio`]
        points[`question${index}Point`] = exam[`question${index}Point`];
        totalPointsOfCorrectExam += Number(exam[`question${index}Point`]);
    }
}

for (let index = 1; index <= params.length; index++) {

    if (corrctAnswer[`question${index}Radio`] == studentAnswer[`question${index}Radio`]) {
        console.log(`point of Question ${index} = ` + studentAnswer[`question${index}Radio`]);
        totalPointsOfStudentExam += Number(points[`question${index}Point`]);
        var correctOptions = Number(exam[`question${index}Radio`]);
        boolAnswer[`question${index}Input${correctOptions}`] = true;
        console.log(`point of question ${index} =`, totalPointsOfStudentExam);
    }
    else {
        var incorrectOptions = Number(studentAnswer[`question${index}Radio`]);
        boolAnswer[`question${index}Input${incorrectOptions}`] = false;
    }
}

// console.log("point for each question");
// console.log(points);
// console.log("total points of correct exam");
// console.log(totalPointsOfCorrectExam);
// console.log("corrctAnswer");
// console.log(corrctAnswer);
// console.log("studentAnswer")
// console.log(studentAnswer);
// console.log("flagQuestion");
// console.log(boolAnswer);
// console.log("total points of Student exam");
// console.log(totalPointsOfStudentExam);


if (totalPointsOfStudentExam <= totalPointsOfCorrectExam / 2) {

     document.getElementById("nav").style.display ="block";
     document.getElementById("footer").style.display ="block";
    // var nav=document.getElementById("nav");
    // if(nav!=null) {
    //     nav.style.display ="block";
    // }
    var failedInExam = `
                <main  class="p-0 container row align-content-center mx-auto justify-content-center d-flex my-5">
                    <section class="col-12 d-flex row justify-content-center  col-md-7 col-sm-9 shadow h-50 py-5 px-2">
                        <h3 class="col-12 text-center">You failed the exam. Do you want to retake the exam?</h3>
                        <div class="d-flex justify-content-center col-12 col-md-6 p-2 ">
                            <button id="takeExamAgain" class="btn btn-info p-3 fs-3">Take the exam again</button>
                        </div>
                        <div class="d-flex justify-content-center col-12 col-md-6 p-2 ">
                            <button id="showResultOfExam" class="btn btn-danger p-3 fs-3">Show result of exam</button>
                        </div>
                    </section>
                </main>
                `;
    document.getElementById('body').innerHTML += failedInExam;

}

else {
    getCurrentUserFromLocalStorage()
    var certificate = `
    <main class="container-fluid">
        <div class="box my-5 d-flex flex-row justify-content-center">
            <div class="row w-75 text-center rounded py-5 cParent shadow">
                <div class="w-10 col-3 c2">
                    <img class="w-100" src="images/cDesign2.png" alt="">
                </div>
                <div style="z-index: 1;">
                    <h1 class="my-5" style="color: #049DD9;">
                        congratulations
                    </h1>
                    <h4>for completing the ${examName} course</h4>
                    <p class="my-5">This certificate is proudly presented to</p>
                    <div id="course-id" class="border w-50 mx-auto shadow-sm p-2 my-2 mb-3 rounded course-name"
                        style="background-color: rgb(245,245,245);">
                        <h3 style="color: #049DD9;">${currentUser}</h3>
                    </div>
                    <p class="my-5">Hopefully this award can be a motivation to further improve your abilities in the
                        future.</p>
                    <input class="btn w-25 my-4 text-white" style="background-color: #049DD9;" type="button"
                        value="print">
                </div>


                <div class="w-10 col-3 c1 ">
                    <img class="w-100" src="images/cDesign1.png" alt="">
                </div>
                <div class="fix"></div>
            </div>

        </div>
    </main>
    `
    document.getElementById("examPass").style.display = "flex";
    var timer = setTimeout(() => {
        document.getElementById("examPass").style.display = "none";
    }, 6000);

    document.getElementById('body').innerHTML = certificate;

    //store the certificate in the local storage to display in page my certificate in my profile
    var certificate = localStorage.getItem('certificate');
    if (certificate == null) {
        certificate = {};
    }
    else {
        certificate = JSON.parse(certificate);
    }
    var currentDate = new Date();
    var currentDateString = currentDate.toLocaleDateString();
    certificate[examName] = currentDateString;
    certificate = JSON.stringify(certificate);
    localStorage.setItem('certificate', certificate);
}
var currentUser = "";
function getCurrentUserFromLocalStorage() {
    var emailOfCurrentUser = localStorage.getItem('currentUserEmail');
    var contOfStudents = Number(localStorage.getItem("contOfStudents"));
    var Students = localStorage.getItem("stuentData");
    if (Students != null) {
        resultOfOldData = JSON.parse(Students);
        for (var i = 0; i < contOfStudents; i++) {
            if (resultOfOldData[`student${i}`].email == emailOfCurrentUser) {
                currentUser = resultOfOldData[`student${i}`].name;
            }
        }
    }
}

var btnShowResultOfExam = document.getElementById("showResultOfExam");
if (btnShowResultOfExam != null) {
    btnShowResultOfExam.addEventListener("click", showResultOfExam);
}
var btnTakeExamAgain = document.getElementById("takeExamAgain");
if (btnTakeExamAgain != null) {
    btnTakeExamAgain.addEventListener("click", function () {
        window.location.href = `studentExam.html?courseName=${examName}`;
    });
}

function showResultOfExam() {

    // document.getElementById("nav").style.display ="none";
    document.getElementById("footer").style.display ="none";
    document.getElementById("body").innerHTML=
    `
    <div class="div-print container m-auto p-5">
            <main>
                <section id="resultOfExam" class="shadow rounded-3">
                    <div id="createExam" class="bg-light rounded-3 p-2 px-md-5 py-md-3">
                        <div class=" d-flex justify-content-end p-3">
                            <div class="text-center p-0  rounded-5" style="width: 150px; border: 2px solid black;">
                                <p class="fs-1 pb-0 fw-bold" id="studentMark"></p>
                                <hr>
                                <p class="fs-1 fw-bold pt-0" id="totalMark"></p>
                            </div>
                        </div>
                        <div class="d-flex row justify-content-center p-3">
                            <h1 class="text-center">Exam Name: <span id="examName"></span></h1>
                            <h2 class="text-center">Exam Duration: <span id="examDuration"></span></h2>
                            <h2 class="text-center">Number Of Questions: <span id="numberOfQuestions"></span></h2>
                        </div>
                        <div class='container' id='allQuestionsForDisplay'>


                        </div>
                        <button id='print-exam' onclick="printExam()"
                            class="btn fs-1 btn-success w-100 fs-3">Print</button>
                    </div>
                </section>
            </main>
        </div>
    `
    document.getElementById('resultOfExam').style.display = 'block';
    document.getElementById("studentMark").innerText = totalPointsOfStudentExam;
    document.getElementById("totalMark").innerText = totalPointsOfCorrectExam;

    if (totalPointsOfStudentExam < totalPointsOfCorrectExam) {
        document.getElementById("studentMark").classList.add("text-danger");
    }
    else {
        document.getElementById("studentMark").classList.add("text-success");
    }


    var examNameToShow = "";
    var numberOfQuestionsToShow = 0;
    var numberOfOptionsToShow = 0;
    var examDurationToShow = 0;
    //var retrievedJsonString = localStorage.getItem("OOP");
    var retrievedArray = allExams[examName];

    console.log(retrievedArray);

    examNameToShow = retrievedArray.examName;
    numberOfQuestionsToShow = retrievedArray.numberOfQuestions;
    numberOfOptionsToShow = retrievedArray.numberOfOptions;
    examDurationToShow = retrievedArray.examDuration;
    document.getElementById("examName").innerText = examNameToShow;
    document.getElementById("examDuration").innerText = examDurationToShow + " minutes";
    document.getElementById("numberOfQuestions").innerText = numberOfQuestionsToShow;

    for (var i = 0; i < numberOfQuestionsToShow; i++) {
        addQuestion(i + 1);
    }

    function addQuestion(qustionNum) {
        var options = "";
        var selectedOption = "";
        for (var i = 1; i <= numberOfOptionsToShow; i++) {
            if (boolAnswer.hasOwnProperty(`question${qustionNum}Input1`) == true || boolAnswer.hasOwnProperty(`question${qustionNum}Input2`) == true
                || boolAnswer.hasOwnProperty(`question${qustionNum}Input3`) == true || boolAnswer.hasOwnProperty(`question${qustionNum}Input4`) == true) {
                if (boolAnswer[`question${qustionNum}Input${i}`] == true) {
                    selectedOption = `
                            <input class="bg-correct-answer mt-0 p-0" value="${i}"
                               id="question${qustionNum}Redio${i}" type="radio"
                               name="question${qustionNum}Radio" disabled >
                       `
                }
                else if (boolAnswer[`question${qustionNum}Input${i}`] == false) {
                    selectedOption = `
                            <input class="bg-incorrect-answer mt-0 p-0" value="${i}"
                                id="question${qustionNum}Redio${i}" type="radio"
                                name="question${qustionNum}Radio" disabled >
                            `
                }
                else {
                    selectedOption = `
                            <input class=" mt-0 p-0" value="${i}"
                                id="question${qustionNum}Redio${i}" type="radio"
                                name="question${qustionNum}Radio" disabled >
                            `
                }
            }
            else {
                var notAns = Number(exam[`question${qustionNum}Radio`]);
                console.log("aaaa= " + notAns);
                if (notAns == i) {
                    // console.log("eeeee= " + notAns);
                    selectedOption = `
                            <input class="bg-correct-answer mt-0 p-0" value="${notAns}"
                                id="question${qustionNum}Redio${notAns}" type="radio"
                                name="question${qustionNum}Radio" disabled >
                            `
                }
                else {
                    selectedOption = `
                            <input class=" mt-0 p-0" value="${notAns}"
                                id="question${qustionNum}Redio${notAns}" type="radio"
                                name="question${qustionNum}Radio" disabled >
                            `
                }
            }
            var option =
                `
            <div class="input-group mb-3 option" id="qust${qustionNum}option${i}">
                <div class="input-group-text">
                    ${selectedOption}
                </div> 
                <h3 id="question${qustionNum}Input${i}"
                    name="question${qustionNum}Input${i}"
                    class="mb-0  form-control option_title">${retrievedArray[`question${qustionNum}Input${i}`]}</h3>
            </div>
            `
            options += option;
        }
        var question = `
            <div class='row mx-1' id="question${qustionNum}">
                <div class="col-11">
                    <div class="input-group mb-3">
                        <div class="input-group-text">
                            <label class='m-0' id="questionNumText${qustionNum}">Q${qustionNum}</label>
                        </div>
                        <h2 id="questionInput${qustionNum}" name="questionInput${qustionNum}"
                            class=" mb-0 form-control question_title">${retrievedArray[`questionInput${qustionNum}`]}</h2>
                    </div>
                    <div class='m-4'>
                        <div id="optionsOfQustion${qustionNum}">
                            ${options} 
                        </div>
                        <div class="mx-3 d-inline">
                            <label>Points: ${retrievedArray[`question${qustionNum}Point`]} </label>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
                    `
        document.getElementById("resultOfExam").style.display = "block";
        document.getElementById("allQuestionsForDisplay").innerHTML += question;
    }
}

function printExam() {
    window.print();
}
