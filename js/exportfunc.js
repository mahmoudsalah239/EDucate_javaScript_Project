export function course_names()
{
    var arr = [];
    for(var i =0 ; i<localStorage.getItem('courses_num'); i++)
{ 
    var obj = JSON.parse(localStorage.getItem('course_obj'+i));
   arr[i] = obj;
}
return arr;
}
