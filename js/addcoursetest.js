var next_btn = document.getElementById("next_btn");
var add_course_div = document.getElementById("add_course_div");
var warning_space = document.getElementById("warning_space");
var course_form = document.getElementById("course_form");

var sessions_num = document.getElementById("Sessions_num");
var course_name = document.getElementById("course_name");
var course_description = document.getElementById("course_description");
var paid = document.getElementById("paid");
var free = document.getElementById("free");
var price_details_div = document.getElementById("price_details");

var courses_arr_index=0;
if(localStorage.getItem('courses_num')=== null)     // make sure if creating course num here and having index for the array here in this file is valuable
{
    localStorage.setItem('courses_num', 0);

    courses_arr_index= parseInt (localStorage.getItem('courses_num'));
}
else
{
courses_arr_index= parseInt (localStorage.getItem('courses_num'));
}

var courses_arr=[];
var courses_arr_str =[];
 
course_name.addEventListener('blur',function(){
    for(let i =0 ; i<parseInt (localStorage.getItem('courses_num')); i++)
    {
        let validation = JSON.parse (localStorage.getItem(`course_obj${i}`));
        if( course_name.value == validation.course_Name)
        {
            document.getElementById("warning_space").innerHTML=  '<span class="text-danger fs-6 px-2">you have already added this course before</span>'
            course_name.focus();
            let name_classes = next_btn.getAttribute("class");
            name_classes +=" disabled";
            next_btn.setAttribute("class",name_classes);
            break;
         
        }
        else
        {
            document.getElementById("warning_space").innerHTML=  ''
            next_btn.classList.remove("disabled");
            
        }
    }
})











function course_Price_Div ()
{
    price_details_div.innerHTML=(`<p id="course_Price_P" class="fs-3 mt-5">Course price</p>   <span id="warning_space3" ></span>
    <input id="course_Price_Input" required type="number" class="form-control" placeholder=""></input>`)
}

function del_Course_Price_Div ()
{
    price_details_div.innerHTML=('');
}

    paid.addEventListener('click', course_Price_Div);
    free.addEventListener('click', del_Course_Price_Div);
    






    
course_form.addEventListener('submit',function(event){

    var sessions_num_value = sessions_num.value;    
    if( (Number (sessions_num_value) % 2 != 0 & Number (sessions_num_value) % 2 != 1) || Number (sessions_num_value) <= 0 )
    {
        event.preventDefault();
        document.getElementById("warning_space2").innerHTML=  '<span class="text-danger fs-6 px-2">Enter integer number starting from 1</span>'
        sessions_num.focus();
 
    }
    else
    {
        document.getElementById("warning_space2").innerHTML=  ''
    }

    let cost;

   if(free.checked)
   {
     cost = 0;
   }
   else if(paid)
   {

    var course_Price_Input = document.getElementById('course_Price_Input');
    cost =course_Price_Input.value ;        

    if( (Number (course_Price_Input.value) % 2 != 0 & Number (course_Price_Input.value) % 2 != 1) || Number (course_Price_Input.value) <= 0 )
        {
            event.preventDefault();
            // alert("error");
            document.getElementById("warning_space3").innerHTML=  '<span class="text-danger fs-6 px-2">Enter integer number starting from 1</span>'
            course_Price_Input.focus();
        }

        else
        {
            document.getElementById("warning_space3").innerHTML=  ''
        }

    }

   
    localStorage.setItem('current_course_size' , sessions_num.value);

    courses_arr[courses_arr_index]={
        Name :  course_name.value,
        description : course_description.value,
        size : sessions_num.value,
        price : cost,
    };
    courses_arr_str [courses_arr_index] = JSON.stringify( courses_arr[courses_arr_index]);
    localStorage.setItem('course', courses_arr_str[courses_arr_index]);
    courses_arr_index++;
   
})