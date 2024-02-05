if (localStorage.getItem("favCourses") != []) {
  var dataFromLocalStorge = localStorage.getItem("favCourses");

  var favCourses = JSON.parse(dataFromLocalStorge);
  console.log(favCourses);

  var coursesContainer = document.getElementById("course-id");
  var courses = [];
  for (let i = 0; i < favCourses.length; i++) {
    var courseTemplate = ` 
    <div class="card-flex-basis d-flex">
                    <a href="studentCourse.html?courseId=${
                      favCourses[i].id
                    }" class="custom-card row ">
                        <div class="card p-0 shadow ">
                            <img src="images/logo.png" class="card-img-top card-image w-100" alt="...">
                            <div class="card-body ">
                                <h3 class="card-title text-center">${
                                  favCourses[i].course_Name
                                }</h3>
                                <p class="text-center">${
                                  favCourses[i].course_Description
                                }</p> 
                                <div class="social text-center p-3 ">
                               
                                  <a href="#"><i class="fa-solid fa-heart" id="${
                                    favCourses[i].id
                                  }"></i></a>
                                  <strong class="text-center text-danger mx-3"> price: ${
                                    favCourses[i].course_Price == 0
                                      ? "free"
                                      : favCourses[i].course_Price
                                  }</strong>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                `;
    courses.push(courseTemplate);
  }
  for (let i = 0; i < courses.length; i++) {
    coursesContainer.innerHTML += courses[i];
  }
}

let heart = document.getElementsByClassName("fa-heart");
for (let i = 0; i < heart.length; i++) {
  heart[i].addEventListener("click", function (e) {
    console.log(favCourses[e.target.id]);
    favCourses.splice(favCourses.indexOf(favCourses[e.target.id], 1));
    console.log(favCourses.indexOf(favCourses[e.target.id]));
    localStorage.setItem("favCourses", favCourses);
    location.reload();
  });
}
