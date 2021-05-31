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
}


// Output Exchange rate     
function ratee(){
    var money_list = [];
    var money_list_val = [];
    $(document).ready(function(){
        database.ref('/user/' +id).once('value').then(function (snapshot) {
            snapshot.forEach(function (costSnapshot) {
                var costKey = costSnapshot.key;
                var costVal = costSnapshot.val();
                money_list.push(costKey);
                money_list_val.push(costVal);
            });
            
            var test_key_append = "";
            
            for(let i=0; i<5; i++){
                test_key_append += '  '+money_list_val[i]+money_list[i]+' <button onclick="exchange'+i+'()">교환</button> '+'  <br> ';
                console.log("단위"+money_list[i]);
                console.log("얼마"+money_list_val[i]);
            }
            
            $('.chean').append(test_key_append);
        });
    });
}


function exchange0(){

}