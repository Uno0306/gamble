var userId = "";
var idClear = 0;

function join(){
    let won = 0;
    let eur = 0;
    let cny = 0;
    let jpy = 0;
    let usd = 0;

    userId = document.getElementById('id').value;
    var userPwd = document.getElementById('pwd').value;
    var userPwdChk = document.getElementById('pwdChk').value;
    var userName = document.getElementById('name').value;
    var userMoney = document.getElementById('money').value;
    var userUnit = document.getElementById('unit').value;
    var chip1 = 10;

    if(idClear==1){
        if(userPwd!=userPwdChk){
            alert("비밀번호를 확인해주세요");
        }else{
            firebase.database().ref('/user/'+userId).update({
                pwd : userPwd,
                name : userName,
                chip1 : chip1,
                nickName : ""
            });
            if(userUnit=="WON"){
                firebase.database().ref('/user/'+userId).update({
                    WON : parseFloat(userMoney), USD : 0, EUR : 0, JPY : 0, CNY : 0
                });
            }else if(userUnit=="USD"){
                firebase.database().ref('/user/'+userId).update({
                    WON : 0, USD : parseFloat(userMoney), EUR : 0, JPY : 0, CNY : 0
                });
            }else if(userUnit=="EUR"){
                firebase.database().ref('/user/'+userId).update({
                    WON : 0, USD : 0, EUR : parseFloat(userMoney), JPY : 0, CNY : 0
                });
            }else if(userUnit=="JPY"){
                firebase.database().ref('/user/'+userId).update({
                    WON : 0, USD : 0, EUR : 0, JPY : parseFloat(userMoney), CNY : 0
                });
            }else if(userUnit=="CNY"){
                firebase.database().ref('/user/'+userId).update({
                    WON : 0, USD : 0, EUR : 0, JPY : 0, CNY : parseFloat(userMoney)
                });
            }
            
            alert("회원가입이 완료되었습니다!");
            window.location.href="/Home/index";
        }
    }else{
        alert("아이디 중복 확인을 해주세요.")
    }

}



function checkId(){
    var chkId = [];
    var idCnt = 0;
    userId = document.getElementById('id').value;

    $(document).ready(function(){

        database.ref('/user/' + chkId).once('value').then(function (snapshot) {
            snapshot.forEach(function (idSnapshot) {
                var idKey = idSnapshot.key;
                chkId.push(idKey);
            });
            console.log(chkId);

            for(let i=0; i<=chkId.length-1; i++){
                if(userId==chkId[i]){
                    idCnt++;
                }
            }
            if(idCnt>0){
                alert("중복된 아이디입니다.");
                idClear=0;
            }else{
                alert("사용 가능한 아이디입니다.")
                idClear=1;
            }
        });
    });
}