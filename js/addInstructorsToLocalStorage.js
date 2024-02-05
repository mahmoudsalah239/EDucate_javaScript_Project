
var Instructors = {
    instructor1: {
        name: "Abdallah Mahfouz",
        email: "abdallahmahfouze111@gmail.com",
    },
    instructor2: {
        name: "Mahmoud Salah",
        email: "mahmoudsalah111@gmail.com",
    },
    instructor3: {
        name: "Saeed Mohamed",
        email: "saeedmohamed@gmail.com",
    },
    instructor4: {
        name: "Salwa Hammad",
        email: "salwahammad111@gmail.com",
    }
};
var InstructorsStringify = JSON.stringify(Instructors);
localStorage.setItem("instructors", InstructorsStringify);

var contOfStudents = 0;
if (localStorage.getItem("contOfStudents") == null) {
    localStorage.setItem("contOfStudents", contOfStudents);
}
else {
    contOfStudents = Number(localStorage.getItem("contOfStudents"));
}

for (var j = 1; j <= 4; j++) {
    var resultOfOldData = {};
    var oldData = localStorage.getItem("stuentData");
    if (oldData != null) {
        var flag = false;
        resultOfOldData = JSON.parse(oldData);
        for (var i = 0; i < contOfStudents; i++) {
            if (resultOfOldData[`student${i}`].email == Instructors[`instructor${j}`]["email"]) {
                flag = true;
                i = contOfStudents;
            }
        }
        if (flag == false) {
            var object = {
                "name": Instructors[`instructor${j}`]['name'],
                "email": Instructors[`instructor${j}`]["email"],
                "password": "abdallah123@mo",
                "ssn": "12345678910111"
            }
            resultOfOldData[`student${contOfStudents}`] = object;
            contOfStudents += 1;
            var result = JSON.stringify(resultOfOldData);
            localStorage.setItem("stuentData", result);
            localStorage.setItem("contOfStudents", contOfStudents);
        }
    }
    else {
        var result = JSON.stringify(resultOfOldData);
        localStorage.setItem("stuentData", result);
        localStorage.setItem("contOfStudents", contOfStudents);
    }
}
