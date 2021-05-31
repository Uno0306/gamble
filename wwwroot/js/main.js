var id = sessionStorage.getItem("userId");
console.log(id);

// Output id     
function loginId(){
    var current_id_key = "";
    current_id_key += id+'님 환영합니다.';
    $('#showId').append(current_id_key);
}



// after id check then choose two option
var test_append ="";
if(id == "" || id == undefined){
    test_append += "<p>ddddd</p>";
    $('#test_append').append(test_append);
}
else{
    test_append += "<p>session존재</p>";
    console.log(test_append);
    $('#test_append').append(test_append);
    alert("asdf");
}


