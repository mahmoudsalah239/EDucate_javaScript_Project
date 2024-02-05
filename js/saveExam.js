
var examNameToSave = "";
var numberOfQuestionsToSave = 0;
var numberOfOptionsToSave = 0;
var examDurationToSave = 0;

var arrOfQuestions = [];

function getInformationFromURL() {

    // examNameToSave=document.getElementById("examName").innerText;
    // numberOfQuestionsToSave=document.getElementById("numberOfQuestions").innerText;
    // numberOfQuestionsToSave = document.getElementById("numberOfQuestions").innerText;
    // examDurationToSave = document.getElementById("examDuration").innerText;
    // console.log("In Function Get Information");
    var queryString = window.location.search;
    var params = queryString.split("?")[1];
    params = params.split("&");
    examNameToSave = params[0].split("=")[1];
    numberOfQuestionsToSave = Number(params[1].split("=")[1]);
    numberOfOptionsToSave = Number(params[2].split("=")[1]);
    examDurationToSave = Number(params[3].split("=")[1]);
    var object = {
        examName: examNameToSave,
        numberOfQuestions: numberOfQuestionsToSave,
        numberOfOptions: numberOfOptionsToSave,
        examDuration: examDurationToSave,
    }

    //arrOfQuestions.push(examInformationObject);
    var objectLingth = numberOfOptionsToSave + 3;
    var cont = 1;
    for (var i = 4; i < params.length; i += objectLingth) {

        for (var j = i; j < 4 + objectLingth * cont; j++) {
            object[params[j].split("=")[0]] = params[j].split("=")[1];
        }
        cont += 1;
        //arrOfQuestions.push(object);
    }
    var exams = localStorage.getItem("exams");
    if (exams == null) {
        exams = {};
        console.log("mahmoued");
    }
    else {
        exams = JSON.parse(exams);
    }

    console.log(exams);
    exams[examNameToSave] = object;
    const examStringify = JSON.stringify(exams);
    localStorage.setItem("exams", examStringify);
    console.log(examNameToSave);
    //window.location.href = "AllCourses.html";
}
getInformationFromURL();
const retrievedJsonString = localStorage.getItem(examNameToSave);
if (retrievedJsonString !== null) {
    const retrievedArray = JSON.parse(retrievedJsonString);
    console.log(retrievedArray);
}
else {
    console.log(`No data found for key: ${examNameToSave}`);
}


