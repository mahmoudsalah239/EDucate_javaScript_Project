// import {course_names} from "./exportfunc";
import { course_names } from "./exportfunc.js";

// console.log(course_names());
var coursesArr = course_names();

let allCoursesDiv = document.getElementById("allCoursesDiv");
let coursesNum = localStorage.getItem("courses_num");
// alert(localStorage.getItem("courses_num"));

// localStorage.getItem("")
// alert()
var x="";
for(var i = 0 ; i<coursesNum; i++)
{
   var coursesCards = `<div class="card p-0 mx-3 shadow col-lg-3  col-md-4 col-sm-12">
   <img src="images/home.jpg" class="card-img-top w-100" alt="...">
   <div class="card-body">
     <h3 class="card-title text-center">${coursesArr[i].course_Name}</h3>
     <p class="text-center">${coursesArr[i].course_Description}</p>
     <div class="social d-flex justify-content-around p-3">
      
     </div>
   </div>
 </div>`;
 x+=coursesCards;
}
allCoursesDiv.innerHTML+= x;