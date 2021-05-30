var cardBack = new Audio("audio/card_back.mp3");
var callaudio = new Audio("audio/call.mp3");
var loseaudio = new Audio("audio/lose.mp3");
var winaudio = new Audio("audio/win.mp3");
var dec = ["1s", "1s", "2s", "2s", "3s", "3s", "4s", "4s", "5s", "5s"];
var base = "../image/";
var default_score = parseInt(0);
var cnt = 0;
var card = [];
var rst = [];
var losecount = 3;
var wincount = 0;

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
function shuffle() {
  rst = [];
  card = [];
  var score_result = document.getElementById("score_result");
  score_result.innerHTML = "현재 점수 : " + default_score;
  getRandomArray(0, dec.length - 1, dec.length);
  for (var i = 0; i < dec.length; i++) {
    card.push(dec[rst.pop()]);
  }
}
function refresh() {
  default_score = 0;
  cnt = 0;

  shuffle();
  card_show();
}
function win_print() { //이긴 후(맞춘 후) 점수
  var score_result = document.getElementById("score_result");
  default_score += 100;
  score_result.innerHTML = "현재 점수 : " + default_score;
  card1.style.display = "none";
  card2.style.display = "none";
//   callaudio.play();
//   callaudio.currentTime = 0;
  ++wincount;
  if (wincount == 5) {
    // winaudio.play();
    // winaudio.currentTime = 0;
    alert("You Win !");
    location.href = "twin_card_stage2.html";
  }
}
function lose_print() {
  //alert("패배");
  var score_result = document.getElementById("score_result");
  default_score -= 50;
  score_result.innerHTML = "현재 점수 : " + default_score;
  lose_action();
  //lose_action();
}
function lose_action() { //틀렸을때 점수가 깍인 후 실행될 것
//   loseaudio.play();
//   loseaudio.currentTime = 0;
  alert("남은 기회 " + (--losecount));
  //loseaudio.paly();
  card1.style.backgroundImage = "url('../image/back.png')";
  card1.style.backgroundSize = "106px 152px";
  card2.style.backgroundImage = "url('../image/back.png')";
  card2.style.backgroundSize = "106px 152px";
  if (losecount == 0) {
    // loseaudio.play();
    // loseaudio.currentTime = 0;
    alert("Game Over");
    cnt = 0;
    start();
  }
}
function card_show() { //시작버튼 누르면 카드가 뒤집혀 5초동안 보여짐
  if (cnt >= 1) {
    alert("다시 시작하시려면 다시시작 버튼을 눌러주세요! \n카드가 섞이지 않음");
    //continue;
  } else {
    for (var i = 0; i < 10; i++) { //사진 랜덤으로 고르기
      var ch_card = document.getElementById(i);
      ch_card.style.display = "block";
      ch_card.style.backgroundImage = "url('" + base + card[i] + ".png')";
      ch_card.style.backgroundSize = "106px 152px";
    }
  }
  setTimeout(start, 5000); //5초동안 보여줌
  cnt += 1;
}

function start() {
  losecount = 3;
  wincount = 0;
  default_score = 0;
  var score_result = document.getElementById("score_result");
  score_result.innerHTML = "현재 점수 : " + default_score;
  for (var i = 0; i < 10; i++) {
    var ch_card = document.getElementById(i);
    ch_card.innerHTML = "";
    ch_card.style.backgroundImage = "url('../image/back.png')";
  }
}
var check1 = 0;
var check2 = 0;
var card1 = 0;3
var card2 = 0;

function turn(num) {
  var ch_card = document.getElementById(num);
  //cardBack.currentTime(0.2);
  cardBack.play();
  cardBack.currentTime = 0;
  ch_card.style.backgroundImage = "url('../image/" + card[num] + ".png')";
  ch_card.style.backgroundSize = "106px 152px";
  if (check1 == 0) {
    check1 = card[num];
    card1 = ch_card;
  } else if (check2 == 0) {
    check2 = card[num];
    card2 = ch_card;
    if (check1 == check2) {
      //alert("승리");
      check1 = 0;
      check2 = 0;
      setTimeout(win_print, 100);
    } else {
      setTimeout(lose_print, 100);
      //lose_print();
      check1 = 0;
      check2 = 0;
    }
  }
}