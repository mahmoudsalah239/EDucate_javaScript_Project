import { course_names } from "./exportfunc.js";
// console.log(course_names());
var coursesArr = course_names();
console.log(coursesArr)
var myCourses = localStorage.getItem('enrollmentData');
var currentUserEmail = localStorage.getItem('currentUserEmail');
console.log(myCourses)
if (myCourses == null) {

}
else {
    myCourses = JSON.parse(myCourses);
    var MyEnrollmentCourses = myCourses[currentUserEmail];
    console.log(MyEnrollmentCourses)


    let courses = [];
    for (let i = 0; i < MyEnrollmentCourses.length; i++) {
        for (let j = 0; j < coursesArr.length; j++) {
            if (MyEnrollmentCourses[i] == coursesArr[j].id) {
                let courseTemplate =
                    `
                <div class=" col-12 col-md-3   p-0 shadow m-2 ">
                            <a href="studentCourse.html?courseId=${i}">
                                <img src="images/logo.png" class="card-img-top card-image w-100" alt="...">
                                <div class="card-body ">
                                    <h3 class="card-title text-center">${coursesArr[j].course_Name} </h3>
                                    <p class="text-center">${coursesArr[j].course_Description}</p>
                                    <div class="social text-center p-3 ">
                                        
                                        <strong class="text-center text-danger">${coursesArr[j].course_Price == 0? "free"
                                                                                    : coursesArr[j].course_Price}</strong>
                                    </div>
                                </div>
                            </a>
                        </div>

                `
              
                courses.push(courseTemplate);

            }
        }

    }
    var coursesContainer = document.getElementById("course-id")
    for (let i = 0; i < courses.length; i++) {
        coursesContainer.innerHTML += courses[i];
    }

}