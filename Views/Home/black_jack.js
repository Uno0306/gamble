var dec = ["1s","1h","1d","1c","2s","2h","2d","2c","3s","3h","3d","3c","4s","4h","4d","4c","5s","5h","5d","5c",
            "6s","6h","6d","6c","7s","7h","7d","7c","8s","8h","8d","8c","9s","9h","9d","9c","10s","10h","10d","10c",
            "Js","Jh","Jd","Jc","Qs","Qh","Qd","Qc","Ks","Kh","Kd","Kc"];

var card=[];
var rst = [];
var suffle_sond = new Audio("audio/suffle.mp3" ) ;
var draw_sound = new Audio("audio/draw.mp3");
var callaudio = new Audio("audio/call.mp3");
var dieaudio = new Audio("audio/die.mp3");
var winaudio = new Audio("audio/win.mp3");
// 랜덤하게 추출 (array Ver)
function getRandom(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
function getRandomArray(min, max, count) {
  while (1) {
    var index = getRandom(min, max);
    // 중복 여부를 체크
    if (rst.indexOf(index) > -1) {
        continue;
      }
    rst.push(index);
    // 원하는 배열 갯수가 되면 종료
    if (rst.length == count) {
        break;
      }
  }
  return rst;
}
function suple(){
  suffle_sond.play();
  getRandomArray(0,dec.length-1,dec.length);
  for (var i = 0; i < dec.length ; i++) {
    card.push(dec[rst.pop()]);
  }
}
var player_card=[];
var com_card=[];
var count= 0;
var com_burst=0;
var pl_burst=0;
var score =500;
function player_draw(){
  player_card.push(card[count++]);
  cal_player(0);
}

function com_draw(){
  draw_sound.play();
  var num = parseInt(cal_dealer(0));
  if (num < 17){
    com_card.push(card[count++]);
    cal_dealer(0);
  }
}
function player_card_show(){
  var cell = document.getElementById("player_board");
  while ( cell.hasChildNodes() )
  {
    cell.removeChild( cell.firstChild );
  }
  for (var i = 0; i < player_card.length; i++) {
    var div = document.createElement("div");
    div.id = "player"+i;
    div.style.backgroundImage = "url('image/"+player_card[i]+".png')";
    div.style.backgroundSize = "120px 180px";
    cell.appendChild(div);
  }
}
function com_card_show(num){
  var cell = document.getElementById("dealer_board");
  while ( cell.hasChildNodes() )
  {
    cell.removeChild( cell.firstChild );
  }
  if (num == 1){
    var div = document.createElement("div");
    div.id = "com"+0;
    //div.innerHTML = com_card[0];
    div.style.backgroundImage = "url('image/back.png')";
    div.style.backgroundSize = "120px 180px";
    cell.appendChild(div);
  }
  for (var i = num; i < com_card.length; i++) {
    var div = document.createElement("div");
    div.id = "com"+i;
  //  div.innerHTML = com_card[i];
    div.style.backgroundImage = "url('image/"+com_card[i]+".png')";
    div.style.backgroundSize = "120px 180px";
    cell.appendChild(div);
  }
}
function new_start(){
  suple();
  setTimeout(turn,1000);
}
function turn(){
  player_card = [];
  com_card = [];
  com_burst=0;
  pl_burst=0;
  player_draw();
  com_draw();
  player_draw();
  com_draw();
  player_card_show();
  com_card_show(1);
  document.getElementById('start').style.display = "none";
  document.getElementById('gaming').style.display = "block";
  document.getElementById('restart').style.display = "none";
  //document.getElementById('com_num_board').style.display = "none";

}
function view() {
  viewer.innerHTML = card.slice(count,card.length);
}
function player_burst(){
  if(pl_burst==0){
    pl_burst=1;
    dieaudio.play();
    alert("player is burst");
    score-=100;
    player_card_show();
    com_card_show(0);
    setTimeout(end,100);
  }
}

function alert_com_burst(){
  var player_num = cal_player(0);

  alert("dealer is burst");
  if(player_num==21){
    callaudio.play();
    score+=100;
    alert("player blackjack");
  }
  else if(player_num>21&&pl_burst==0){
    pl_burst=1;
    score-=100;
    alert("player is burst");
  }
  else {
    callaudio.play();
  }
}

function dealer_burst(){
  com_card_show(0);
  if(com_burst==0){
    score+=100;
    setTimeout(alert_com_burst,100);

    com_burst=1;
  }
  com_card_show(0);
  setTimeout(end,300);
}
function cal_player(ace){
  var num = 0;
  if(ace==0){
    for (var i = 0; i < player_card.length; i++) {
      if(player_card[i][0]=='10'||player_card[i][0]=='J'||player_card[i][0]=='Q'||player_card[i][0]=='K'){
        num+=10;
      }
      else if (player_card[i][0]=='1') {
        num+=11;
      }
      else{
        num += parseInt(player_card[i][0]);
      }
    }
    var player_num = document.getElementById('player_num');
    player_num.value = num;
    if(num>21){
      return cal_player(1);
    }
  }
  if(ace==1){
    for (var i = 0; i < player_card.length; i++) {
      if(player_card[i][0]=='10'||player_card[i][0]=='J'||player_card[i][0]=='Q'||player_card[i][0]=='K'){
        num+=10;
      }
      else{
        num += parseInt(player_card[i][0]);
      }
    }
    var player_num = document.getElementById('player_num');
    player_num.value = num;
    if(num>21){
      setTimeout(player_burst,100);
    }
  }
  return num;
}
function cal_dealer(ace){
  var num = 0;
  if(ace==0){
    for (var i = 0; i < com_card.length; i++) {
      if(com_card[i][0]=='10'||com_card[i][0]=='J'||com_card[i][0]=='Q'||com_card[i][0]=='K'){
        num+=10;
      }
      else if (com_card[i][0]=='1') {
        num+=11;
      }
      else{
        num += parseInt(com_card[i][0]);
      }
    }
    var dealer_num = document.getElementById('dealer_num');
    dealer_num.value = num;
    if(num>21){

      return cal_dealer(1);
    }
  }
  if(ace==1){
    for (var i = 0; i < com_card.length; i++) {
      if(com_card[i][0]=='10'||com_card[i][0]=='J'||com_card[i][0]=='Q'||com_card[i][0]=='K'){
        num+=10;
      }
      else{

        num += parseInt(com_card[i][0]);
      }
    }
    var dealer_num = document.getElementById('dealer_num');
    dealer_num.value = num;

  }
  return num;
}

function pick(){
  player_draw();
  player_card_show();
  com_draw();
  com_card_show(1);
  var com_num = cal_dealer(0);
  if(com_num>21){
    setTimeout(dealer_burst,100);
    com_card_show(0);
  }
}
function call_to(){
  com_card_show(0);
  setTimeout(call,100);
}
function call(){
  var player_num = cal_player(0);
  var com_num = cal_dealer(0);
  player_card_show();
  com_card_show(0);

  if(com_num>21){
    setTimeout(dealer_burst,100);
    com_card_show(0);
  }
  else if(com_num < 17){
    com_draw();
    com_card_show(0);
    setTimeout(call,300);
    return;
  }

  else{
    if(player_num==21){
      score+=100;
      alert("player blackjack");
    }
    com_card_show(0);
    if(com_num > 21 && player_num>21){
      alert("draw");
    }
    if(com_num==21){
      score-=100;
      alert("dealer blackjack");
    }

    if((player_num>com_num&&player_num<22)||com_num>21){
      callaudio.play();
      score+=100;
      alert("player win");
    }
    else if((player_num<com_num&&com_num<22)||player_num>21){
      dieaudio.play();
      score-=100;
      alert("dealer win");
    }
    else{
      alert("draw");
    }
    setTimeout(end,100);
  }

}
function give_up(){
  alert("give_up");
  score-=50;
  player_card_show();
  com_card_show(0);
  setTimeout(end,100);
}
function end(){

  player_card_show();
  com_card_show(0);
  var player_score = document.getElementById('player_score');
  player_score.value = score;

  document.getElementById('restart').style.display = "block";
  document.getElementById('gaming').style.display = "none";
  //document.getElementById('com_num_board').style.display = "block";
  if(card.length-count<10){
    winaudio.play();
    alert("게임 종료");
    player_score=500;
    document.getElementById('restart').style.display = "none";
    document.getElementById('start').style.display = "block";
  }
}