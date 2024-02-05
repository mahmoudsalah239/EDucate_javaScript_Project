
import { course_names } from "./exportfunc.js";
const coursesDetails = course_names();
const params = new URLSearchParams(window.location.search);
const courseId = params.get("courseId");

console.log(coursesDetails);

if (!localStorage.getItem("currentUserEmail")) {
  window.location.replace("login.html");
}
const userEmail = localStorage.getItem("currentUserEmail");

for (let index = 0; index < coursesDetails.length; index++) {
  const element = coursesDetails[index];
  if (element.id == courseId) {
    break;
  }

  if (index == coursesDetails.length - 1) {
    window.location.replace("studentHome.html");
  }
}

for (let index = 0; index < coursesDetails.length; index++) {
  const element = coursesDetails[index];
  if (element.id == courseId) {
    document.getElementById("course-name").innerText = element.course_Name;
    document.getElementById("course-description").innerText =
      element.course_Description;
    document.getElementById("course-price").innerText = element.course_Price;
  }
}

var enrollmentData =
  localStorage.getItem("enrollmentData") == undefined ? {} : JSON.parse(localStorage.getItem("enrollmentData"));

console.log(enrollmentData);

if (!enrollmentData[userEmail]) {
  enrollmentData[userEmail] = [];
}

var userCourses = enrollmentData[userEmail];
console.log(userCourses);

document.addEventListener("DOMContentLoaded", () => {
  if (userCourses.includes(courseId)) {
    document.getElementById("enroll").innerText = "Go to Course";
  }
});

document.getElementById("enroll").addEventListener("click", () => {
  if (!userCourses.includes(courseId)) {
    enrollmentData[userEmail].push(courseId);
    localStorage.setItem("enrollmentData", JSON.stringify(enrollmentData));
  }
  window.location.replace(`studentCourse.html?courseId=${courseId}`);
});
