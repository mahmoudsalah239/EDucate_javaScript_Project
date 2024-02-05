//get data
import { course_names } from "./exportfunc.js";
let courses = course_names();
console.log(courses);
const searchParams = new URLSearchParams(window.location.search);
let courseId = searchParams.get("courseId");
let lessonList = document.getElementById("lessonList");
let items = [];
let choosenCourse = courses[courseId];
console.log(choosenCourse.lesson_Name.length);
console.log(choosenCourse.lesson_Link);

let courseName = document.getElementById("courseName");
courseName.innerHTML = choosenCourse.course_Name;

// console.log();
for (let i = 0; i < choosenCourse.lesson_Name.length; i++) {
  let item = `<div class="item p-2" id="${choosenCourse.lesson_Link[i]}">
        
    <strong><i class="fa-regular fa-circle-play"></i> vedio :</strong>  ${choosenCourse.lesson_Name[i]}
    </div>`;
  items.push(item);
}
for (let i = 0; i < items.length; i++) {
  lessonList.innerHTML += items[i];
}

let choosenLesson = document.getElementsByClassName("item");
for (let i = 0; i < items.length; i++) {
  choosenLesson[i].addEventListener("click", function (e) {
    changevedioSrc(e.target.id);
    let progressValue = 100 / choosenCourse.lesson_Name.length;
    updateProgress(progressValue);
  });
}

let iframe = document.querySelector("iframe");
iframe.setAttribute("src", choosenCourse.lesson_Link[0]);
function changevedioSrc(src) {
  iframe.setAttribute("src", src);
}
let searchBox = document.getElementById("searchBox");
searchBox.addEventListener("keyup", function () {
  let searchItems = [];
  for (let i = 0; i < choosenCourse.lesson_Name.length; i++) {
    if (choosenCourse.lesson_Name[i].includes(searchBox.value)) {
      let item = `<div class="item p-2" id="${choosenCourse.lesson_Link[i]}">
        
    <strong><i class="fa-regular fa-circle-play"></i> vedio :</strong>  ${choosenCourse.lesson_Name[i]}
    </div>`;
      searchItems.push(item);
    }

    lessonList.innerHTML = "";
    for (let i = 0; i < searchItems.length; i++) {
      lessonList.innerHTML += searchItems[i];
    }
  }
});
function updateProgress(value) {
  // let progressBar = document.getElementById("progress-bar");
  let progress = document.getElementById("progress");

  let currentWidth = parseFloat(progress.style.width) || 0;
  let newWidth = currentWidth + value;

  if (newWidth <= 100) {
    progress.style.width = newWidth + "%";
  } else {
    progress.style.width = "100%";
  }
}


let btnExam = document.getElementById("btnExam");
btnExam.innerHTML += `<a href="studentExam.html?courseName=${choosenCourse.course_Name}" class="btn btn-success w-100">test your self </a>`;
