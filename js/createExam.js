
var examName = "";
var numberOfQuestions = 0;
var numberOfOptions = 0;
var examDuration = 0;

function getDataFromURL() {

    var queryString = window.location.search;
    var params = queryString.split("?")[1];
    params = params.split("&");
    examName = params[0].split("=")[1];
    numberOfQuestions = params[1].split("=")[1];
    numberOfOptions = params[2].split("=")[1];
    examDuration = params[3].split("=")[1];
}

getDataFromURL();


document.getElementById("examName").innerText = examName;
document.getElementById("examDuration").innerText = examDuration + " minutes";
document.getElementById("numberOfQuestions").innerText = numberOfQuestions;
//to send in URL
document.getElementById("inputHiddenExamName").value = examName;
document.getElementById("inputHiddenNumberOfQuestions").value = numberOfQuestions;
document.getElementById("inputHiddenNumberOfOptions").value = numberOfOptions;
document.getElementById("inputHiddenExamDuration").value = examDuration;

for (var i = 0; i < numberOfQuestions; i++) {
    addQuestion(i + 1);
}

function addQuestion(qustionNum) {
    var options = "";
    for (var i = 0; i < numberOfOptions; i++) {

        var option =
            `
                    <div class="input-group mb-3 option" id="qust${qustionNum}option${i + 1}">
                        <div class="input-group-text">
                            <input class=" mt-0 p-0" value="${i + 1}" id="question${qustionNum}Redio${i + 1}" type="radio"
                                    name="question${qustionNum}Radio" required>
                        </div>
                        <input id="question${qustionNum}Input${i + 1}" name="question${qustionNum}Input${i + 1}"
                                class="form-control option_title" type="text" required
                                placeholder='Enter the option title...' value="">
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
                                    <textarea  value="" id="questionInput${qustionNum}" name="questionInput${qustionNum}"
                                        class="form-control question_title" required
                                        placeholder='Enter the question ...'></textarea>
                                </div>
                                <div class='m-4'>
                                    <div id="optionsOfQustion${qustionNum}">
                                        ${options}  
                                    </div>
                                    <div class="mx-3 d-inline">
                                        <label>Points</label>
                                        <input type="number" class="form-control" style="width:100px ;display:inline" value="1" name="question${qustionNum}Point" id="question${qustionNum}Point" min="1"
                                            max="100">
                                    </div>
                                </div>
                            </div>
                            <div class="col-1">
                                <button class="btn" id="Del_Q${qustionNum}" onclick="del_question(${qustionNum})">
                                   
                                </button>
                            </div>
                            <hr>
                        </div>
                    `
    document.getElementById("allQuestions").innerHTML += question;
}
/*
function del_question(id) {
    var idx = "Q" + id;
    document.getElementById(idx).remove()
    var val = 0;
    console.log(typeof (id))
    for (var i = 0; i < numberOfQuestion; i++) {
        if (i !== parseInt(id)) {
            console.log(i + "enter")

            //div all
            var item = document.getElementById("Q" + i)
            item.setAttribute('id', "Q" + (parseInt(val)));
            //lable
            idx = "QNtxt" + i;
            item = document.getElementById(idx)
            item.textContent = "Q" + (parseInt(val))
            item.setAttribute('id', "QNtxt" + (parseInt(val)));
            // delete item
            item = document.getElementById("Del_Q" + i)
            item.setAttribute('id', "Del_Q" + (parseInt(val)));
            item.setAttribute('onclick', "del_question(" + (parseInt(val)) + ")");
            //Q Input
            item = document.getElementById("questionText" + i)
            item.setAttribute('id', "questionText" + (parseInt(val)));
            item.setAttribute('name', "Q" + (parseInt(val)));
            //Q Input Point
            item = document.getElementById("QPI" + i)
            item.setAttribute('id', "QPI" + (parseInt(val)));
            item.setAttribute('name', "QPI" + (parseInt(val)));
            //btn add
            item = document.getElementById("btn_add" + i)
            item.setAttribute('id', "btn_add" + parseInt(val));
            item.setAttribute('onclick', "add_option(" + (parseInt(val)) + ")");
            //btn sub
            item = document.getElementById("btn_sub" + i)
            item.setAttribute('id', "btn_sub" + parseInt(val));
            item.setAttribute('onclick', "sub_option(" + (parseInt(val)) + ")");
            //Q Option div
            item = document.getElementById("Q" + i + "O")
            item.setAttribute('id', "Q" + parseInt(val) + "O");
            //Q Option hidden input
            var ON = document.getElementById("ON" + i).value;
            item = document.getElementById("ON" + i)
            item.setAttribute('id', "ON" + parseInt(val));

            //Q Option name
            for (var j = 0; j < parseInt(ON); j++) {
                // radio
                item = document.getElementById("Q" + i + "R" + j)
                item.setAttribute('id', "Q" + val + "R" + j);
                item.setAttribute('name', "QR" + val);
                // input
                item = document.getElementById("Q" + i + "I" + j)
                item.setAttribute('id', "Q" + val + "I" + j);
                item.setAttribute('name', "Q" + val + "I" + j);
                // div
                item = document.getElementById("O" + i + j)
                item.setAttribute('id', "O" + val + j);
            }
            val++;
        }
        console.log(i + "end")
    }
    numberOfQuestion--;
    document.getElementById("QuestionsNumber").textContent = numberOfQuestion;
    document.getElementById("N_question").value = numberOfQuestion;
};

function addOption(valx) {
    var ON = document.getElementById("ON" + valx).value;
    console.log(ON)
    if (parseInt(ON) < 4) {
        var Option = `
        <div class="input-group mb-3 " id = "O${valx}${parseInt(ON)}">
                <div class="input-group-text">
                 <input class=" mt-0 p-0" value="${parseInt(ON)}" id = "Q${valx}R${parseInt(ON)}" required type="radio" name="QR${valx}">
                </div>
            <input id="Q${valx}I${parseInt(ON)}"  name="Q${valx}I${parseInt(ON)}" class="form-control option_title" type="text" required placeholder='Enter the option title...'>
        </div>`;
        const idO = "Q" + valx + "O";
        document.getElementById(`#Q${valx}O`).appendChild(Option);
        ON = parseInt(ON) + 1;
        document.getElementById("ON" + valx).value = parseInt(ON);
    }

}
function sub_option(valx) {
    var ON = document.getElementById("ON" + valx).value;
    console.log(ON)
    if (parseInt(ON) > 2) {
        ON = parseInt(ON) - 1;
        document.getElementById("O" + valx + ON).remove()
        document.getElementById("ON" + valx).value = parseInt(ON);
    }

}*/