//get data
import { course_names } from "./exportfunc.js";

var localStorageCourses = course_names();

let coursesContainer = document.getElementById("course-id");
let courses = [];
for (let i = 0; i < localStorageCourses.length; i++) {
  let courseTemplate = ` 
        <div class="card-flex-basis d-flex">
                        <a href="courseOveview.html?courseId=${
                          localStorageCourses[i].id
                        }" class="custom-card row ">
                            <div class="card p-0 shadow ">                                <img src="images/logo.png" class="card-img-top card-image w-100" alt="...">
                                <div class="card-body ">
                                    <h3 class="card-title text-center">${
                                      localStorageCourses[i].course_Name
                                    }</h3>
                                    <p class="text-center">${
                                      localStorageCourses[i].course_Description
                                    }</p>
                                    <div class="social text-center p-3 ">
                                  
                                      <a href="#"><i class="fa-solid fa-heart" style="color: #742323" id="${
                                        localStorageCourses[i].id
                                      }"></i></a>
                                      <strong class="text-center text-danger"> price: ${
                                        localStorageCourses[i].course_Price == 0
                                          ? "free"
                                          : localStorageCourses[i].course_Price
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

var userSearch = document.getElementById("user-search");
userSearch.addEventListener("keyup", function searchFunction() {
  let searchItems = [];
  for (let i = 0; i < localStorageCourses.length; i++) {
    if (
      localStorageCourses[i].course_Name
        .toUpperCase()
        .includes(userSearch.value.toUpperCase())
    ) {
      let item = ` 
        <div class="card-flex-basis d-flex">
                        <a href="studentCourse.html?courseId=${
                          localStorageCourses[i].id
                        }" class="custom-card row ">
                            <div class="card p-0 shadow ">
                                <img src="images/logo.png" class="card-img-top card-image w-100" alt="...">
                                <div class="card-body ">
                                    <h3 class="card-title text-center">${
                                      localStorageCourses[i].course_Name
                                    }</h3>
                                    <p class="text-center">${
                                      localStorageCourses[i].course_Description
                                    }</p>
                                    <div class="social text-center p-3 ">
                                      <a href="#"><i class="fa-solid fa-heart" style="color: #742323" id="${
                                        localStorageCourses[i].id
                                      }"></i></a>
                                      <strong class="text-center text-danger"> price: ${
                                        localStorageCourses[i].course_Price == 0
                                          ? "free"
                                          : localStorageCourses[i].course_Price
                                      }</strong>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    `;

      searchItems.push(item);
    }
    coursesContainer.innerHTML = "";
    for (let i = 0; i < searchItems.length; i++) {
      // console.log(searchItems[i]);
      coursesContainer.innerHTML += searchItems[i];
    }
  }
});

let checkprice = document.querySelectorAll("input[type='checkbox']");

for (let i = 0; i < checkprice.length; i++) {
  checkprice[i].addEventListener("change", function (e) {
    let searchItems = [];
    if (e.target.checked) {
      // console.log(e.target.checked)
      // console.log((Number(e.target.getAttribute("data-price"))))
      for (let i = 0; i < localStorageCourses.length; i++) {
        // data-SPrice="0" data-Lprice="100"
        if (
          localStorageCourses[i].course_Price >=
            Number(e.target.getAttribute("data-SPrice")) &&
          localStorageCourses[i].course_Price <=
            Number(e.target.getAttribute("data-Lprice"))
        ) {
          let item = ` 
                      <div class="card-flex-basis d-flex">
                        <a href="studentCourse.html?courseId=${
                          localStorageCourses[i].id
                        }" class="custom-card row ">
                            <div class="card p-0 shadow ">
                                <img src="images/logo.png" class="card-img-top card-image w-100" alt="...">
                                <div class="card-body ">
                                    <h3 class="card-title text-center">${
                                      localStorageCourses[i].course_Name
                                    }</h3>
                                    <p class="text-center">${
                                      localStorageCourses[i].course_Description
                                    }</p>
                                    <div class="social text-center p-3 ">
                                      <a href="#"><i class="fa-solid fa-heart" style="color:#742323" id="${
                                        localStorageCourses[i].id
                                      }" ></i></a>
                                      <strong class="text-center text-danger"> price: ${
                                        localStorageCourses[i].course_Price == 0
                                          ? "free"
                                          : localStorageCourses[i].course_Price
                                      }</strong>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    `;

          searchItems.push(item);
        }
        coursesContainer.innerHTML = "";
        for (let i = 0; i < searchItems.length; i++) {
          coursesContainer.innerHTML += searchItems[i];
        }
      }
    } else {
      for (let i = 0; i < localStorageCourses.length; i++) {
        let item = ` 
        <div class="card-flex-basis d-flex">
                        <a href="studentCourse.html?courseId=${
                          localStorageCourses[i].id
                        }" class="custom-card row ">
                            <div class="card p-0 shadow ">
                                <img src="images/logo.png" class="card-img-top card-image w-100" alt="...">
                                <div class="card-body ">
                                    <h3 class="card-title text-center">${
                                      localStorageCourses[i].course_Name
                                    }</h3>
                                    <p class="text-center">${
                                      localStorageCourses[i].course_Description
                                    }</p>
                                    <div class="social text-center p-3 ">
                                      <a href="#" ><i class="fa-solid fa-heart" style="color:#742323" id="${
                                        localStorageCourses[i].id
                                      }"></i></a>
                                      <strong class="text-center text-danger"> price: ${
                                        localStorageCourses[i].course_Price == 0
                                          ? "free"
                                          : localStorageCourses[i].course_Price
                                      }</strong>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    `;
        if (!searchItems.includes(item)) {
          searchItems.push(item);
        }
        coursesContainer.innerHTML = "";
        for (let i = 0; i < searchItems.length; i++) {
          coursesContainer.innerHTML += searchItems[i];
        }
      }
    }
  });
}
let favCourses = [];
if (localStorage.getItem("favCourses") != []) {
  let dataFromLocalStorge = localStorage.getItem("favCourses");
  favCourses = JSON.parse(dataFromLocalStorge);
  // console.log(favCourses);
}

let addTofav = document.getElementsByClassName("fa-heart");
for (let i = 0; i < addTofav.length; i++) {
  if (favCourses.map((item) => item.id).includes(localStorageCourses[i].id)) {
    addTofav[i].style.color = "red";
  }

  addTofav[i].addEventListener("click", function (e) {
    let exists = favCourses
      .map((item) => item.id)
      .includes(localStorageCourses[e.target.id].id);
    if (!exists) {
      favCourses.push(localStorageCourses[e.target.id]);
    } else {
      e.target.style.color = "red";
    }

    localStorage.setItem("favCourses", JSON.stringify(favCourses));
  });

  // console.log(localStorageCourses[e.target.id])
}

// const dummyData = [
//   {
//     course_Id: 1,
//     course_Name: "Introduction to JavaScript",
//     course_Description:
//       "Learn the fundamentals of JavaScript programming language.",
//     course_Size: 10,
//     lesson_Names: [
//       "Getting Started",
//       "Variables and Data Types",
//       "Control Flow",
//       "Functions",
//       "Arrays",
//       "Objects",
//       "DOM Manipulation",
//       "Events",
//       "AJAX",
//       "ES6 Features",
//     ],
//     lesson_Links: [
//       "Link1",
//       "Link2",
//       "Link3",
//       "Link4",
//       "Link5",
//       "Link6",
//       "Link7",
//       "Link8",
//       "Link9",
//       "Link10",
//     ],
//   },
//   {
//     course_Id: 2,
//     course_Name: "Python Programming Basics",
//     course_Description:
//       "Explore the basics of Python programming language for beginners.",
//     course_Size: 8,
//     lesson_Names: [
//       "Introduction to Python",
//       "Variables and Data Types",
//       "Control Flow",
//       "Functions",
//       "Lists",
//       "Dictionaries",
//       "File Handling",
//       "Error Handling",
//     ],
//     lesson_Links: [
//       "Link1",
//       "Link2",
//       "Link3",
//       "Link4",
//       "Link5",
//       "Link6",
//       "Link7",
//       "Link8",
//     ],
//   },
//   {
//     course_Id: 3,
//     course_Name: "Java Programming Mastery",
//     course_Description:
//       "Master the concepts of Java programming language for building robust applications.",
//     course_Size: 12,
//     lesson_Names: [
//       "Getting Started with Java",
//       "Variables and Data Types",
//       "Control Flow",
//       "Object-Oriented Programming",
//       "Collections",
//       "Exception Handling",
//       "Multithreading",
//       "File I/O",
//       "Database Connectivity",
//       "Networking",
//       "JavaFX",
//       "Servlets and JSP",
//     ],
//     lesson_Links: [
//       "Link1",
//       "Link2",
//       "Link3",
//       "Link4",
//       "Link5",
//       "Link6",
//       "Link7",
//       "Link8",
//       "Link9",
//       "Link10",
//       "Link11",
//       "Link12",
//     ],
//   },
//   {
//     course_Id: 4,
//     course_Name: "Web Development with HTML and CSS",
//     course_Description:
//       "Build your foundation in web development using HTML and CSS.",
//     course_Size: 6,
//     lesson_Names: [
//       "Introduction to HTML",
//       "HTML5 Features",
//       "Introduction to CSS",
//       "CSS Layouts",
//       "Responsive Design",
//       "CSS Flexbox",
//     ],
//     lesson_Links: ["Link1", "Link2", "Link3", "Link4", "Link5", "Link6"],
//   },
//   {
//     course_Id: 5,
//     course_Name: "C# Programming for Beginners",
//     course_Description:
//       "Learn the basics of C# programming language and start building desktop applications.",
//     course_Size: 9,
//     lesson_Names: [
//       "Getting Started with C#",
//       "Variables and Data Types",
//       "Control Flow",
//       "Object-Oriented Programming",
//       "Collections",
//       "Exception Handling",
//       "File I/O",
//       "Windows Forms",
//       "WPF Applications",
//     ],
//     lesson_Links: [
//       "Link1",
//       "Link2",
//       "Link3",
//       "Link4",
//       "Link5",
//       "Link6",
//       "Link7",
//       "Link8",
//       "Link9",
//     ],
//   },
//   {
//     course_Id: 6,
//     course_Name: "PHP Web Development",
//     course_Description:
//       "Explore server-side scripting with PHP and build dynamic web applications.",
//     course_Size: 7,
//     lesson_Names: [
//       "Introduction to PHP",
//       "PHP Basics",
//       "Working with Forms",
//       "Database Connectivity",
//       "Sessions and Cookies",
//       "PHP Security",
//       "Introduction to Laravel",
//     ],
//     lesson_Links: [
//       "Link1",
//       "Link2",
//       "Link3",
//       "Link4",
//       "Link5",
//       "Link6",
//       "Link7",
//     ],
//   },
// ];
