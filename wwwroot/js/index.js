// Move to join
function goJoin(){
    window.location.href="/Home/join";
}

// Login
function login(){
    var idCheck = [];
    var userId = document.getElementById('id').value;
    var pwdCheck = [];
    var userPwd = document.getElementById('pwd').value;

    $(document).ready(function(){
        if(userId != "" && userId != undefined){
            if(userPwd != "" && userPwd != undefined){
                database.ref('/user/' + userId).once('value').then(function (snapshot) {
                    snapshot.forEach(function (idSnapshot) {
                        var idKey = idSnapshot.key;
                        var pwdVal = idSnapshot.val();
                        idCheck.push(idKey);
                        pwdCheck.push(pwdVal);
                    });
                    if(userPwd == pwdCheck[8]){
                        alert("로그인 성공!");
                        sessionStorage.setItem("userId",userId);
                        
                        window.location.href="/Home/main";
                    }
                    else{
                        alert("아이디 또는 비밀번호가 잘못 되었습니다.");
                    }
                });
            }else{
                alert("비밀번호를 입력해주세요.");
            }
        }
        else{
            alert("아이디를 입력해주세요.");
        }
    });    
}

// Output Exchange rate     
function rate(){
    var money_list = [];
    var money_list_val = [];
    $(document).ready(function(){
        database.ref('/admin/' + money_list + '/exchange/').once('value').then(function (snapshot) {
            snapshot.forEach(function (costSnapshot) {
                var costKey = costSnapshot.key;
                var costVal = costSnapshot.val();
                money_list.push(costKey);
                money_list_val.push(costVal);
            });
            console.log(money_list);
            console.log(money_list_val);
            
            var test_key_append = "";
            
            for(let i=0; i<=money_list.length-1; i++){
                test_key_append += '<p>'+money_list[i]+'  '+money_list_val[i]+'</p>';
            }
            
            $('#test').append(test_key_append);
        });
    });
}

