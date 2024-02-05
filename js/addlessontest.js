
let add_lesson_div = document.getElementById("add_lesson_div");


var lessons_arr_index=0;
if(localStorage.getItem('courses_num')=== null)
{
    localStorage.setItem('courses_num', 0);

    lessons_arr_index= parseInt (localStorage.getItem('courses_num'));
}
else
{
lessons_arr_index= parseInt (localStorage.getItem('courses_num'));
}


var lessons_arr=[];
var lessons_arr_str =[];

    for(var i =0 ; i<localStorage.getItem('current_course_size') ; i++)
    {
        add_lesson_div.innerHTML+= `<div class="d-flex flex-column w-100 justify-content-start mb-3 border border-light" >
        <h2 class="mt-5" >Session number ${i+1} details </h2>
      
        <p class="fs-3 mt-5">Session name </p>
        <input required type="text" class="form-control" placeholder="">
      
        <p class="fs-3 mt-5">Session link</p>
        <input required type="url" class="form-control" placeholder="">
      
      
      </div>`; 
    };

    add_lesson_div.innerHTML+= `<input type="submit" id="save_lesson_btn" class="btn btn-info login_btn text-light btn-bg-color my-3 w-100" value="Save lessons"> `
    var save_lesson_btn = document.getElementById('save_lesson_btn');


    if(localStorage.getItem('current_course_size') == 1)
    {
        add_lesson_div.style="height: 72vh;";
    }

 var input_arr =document.getElementsByTagName("input");
         
var course_obj = JSON.parse (localStorage.getItem('course'));


var les_Name = [];
var les_Link = [];

add_lesson_div.addEventListener('submit',function(){
 
var h = 0;
for(var i =0 ; i<localStorage.getItem('current_course_size')*2 ; i+=2)
{
 lessons_arr[lessons_arr_index] = {
    course_Name : course_obj.Name ,  
    course_Description :course_obj.description ,  
    course_Size : course_obj.size ,  
    course_Price : course_obj.price ,  
    lesson_Name : input_arr[i].value  ,         
    lesson_Link :  input_arr[i+1].value,
    id : lessons_arr_index , 
  };
  les_Name[h] =lessons_arr[lessons_arr_index].lesson_Name; 
  les_Link[h] =lessons_arr[lessons_arr_index].lesson_Link; 
  h++;
}
lessons_arr[lessons_arr_index].lesson_Name = les_Name;
lessons_arr[lessons_arr_index].lesson_Link = les_Link;
    lessons_arr_str [lessons_arr_index] = JSON.stringify( lessons_arr[lessons_arr_index]);
    localStorage.setItem('course_obj'+lessons_arr_index, lessons_arr_str[lessons_arr_index]);
    lessons_arr_index++;
    localStorage.setItem('courses_num' , lessons_arr_index);  


    
})






