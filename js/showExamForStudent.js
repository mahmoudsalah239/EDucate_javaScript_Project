const searchParams = new URLSearchParams(window.location.search);
let courseName = searchParams.get("courseName");

var examNameToShow = "";
var numberOfQuestionsToShow = 0;
var numberOfOptionsToShow = 0;
var examDurationToShow = 0;
// console.log(document.forms[0]);
var allExams = localStorage.getItem("exams");
console.log(allExams)
if (allExams == null) {

}

else {
    allExams = JSON.parse(allExams);
    console.log(allExams)
    var examToDisplay = allExams[courseName];
    console.log(examToDisplay);

    examNameToShow = examToDisplay.examName;
    numberOfQuestionsToShow = examToDisplay.numberOfQuestions;
    numberOfOptionsToShow = examToDisplay.numberOfOptions;
    examDurationToShow = examToDisplay.examDuration;
    document.getElementById("examName").innerText = examNameToShow;
    document.getElementById("examDuration").innerText = examDurationToShow + " minutes";
    document.getElementById("numberOfQuestions").innerText = numberOfQuestionsToShow;
    document.getElementById("inputHiddenExamName").value = examNameToShow;


    // question1Input1: "rrrrrrrrr"
    // question1Input2: "rrrrrrrrr"
    // question1Point: "1"
    // question1Radio: "1"
    // question2Input1: "rrrrrrrrr"
    // question2Input2: "rrrrrrrrr"
    // question2Point: "1"
    // question2Radio: "1"
    // questionInput1: "sss"
    // questionInput2: "sss"

    for (var i = 0; i < numberOfQuestionsToShow; i++) {
        addQuestion(i + 1);
    }

    function addQuestion(qustionNum) {
        var options = "";
        for (var i = 1; i <= numberOfOptionsToShow; i++) {

            var option =
                `
            <div class="input-group mb-3 option" id="qust${qustionNum}option${i}">
                <div class="input-group-text">
                    <input class=" mt-0 p-0" value="${i}"
                        id="question${qustionNum}Redio${i}" type="radio"
                        name="question${qustionNum}Radio" required>
                </div>
                <h3 id="question${qustionNum}Input${i}"
                    name="question${qustionNum}Input${i}"
                    class="mb-0  form-control option_title">${examToDisplay[`question${qustionNum}Input${i}`]}</h3>
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
                            class=" mb-0 form-control question_title">${examToDisplay[`questionInput${qustionNum}`]}</h2>
                    </div>
                    <div class='m-4'>
                        <div id="optionsOfQustion${qustionNum}">
                            ${options} 
                        </div>
                        <div class="mx-3 d-inline">
                            <label>Points: ${examToDisplay[`question${qustionNum}Point`]} </label>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
                    `
        document.getElementById("allQuestions").innerHTML += question;
    }

    function submitExam() {
        // var formExam = getElementById("createExam").submit();
        document.forms[0].submit();
    }

    // Set the initial timer value
    var munits = examDurationToShow - 1;
    var second = 10;
    var countdown = setInterval(function () {
        second--;
        document.getElementById("munits").innerHTML = munits;
        document.getElementById("second").innerHTML = second;

        if (second <= 0 && munits <= 0) {
            clearInterval(countdown);
            submitExam();
            console.log("Time's up!");
        }
        else if (second <= 0) {
            second = 10;
            munits -= 1;
        }

    }, 1000);
}
