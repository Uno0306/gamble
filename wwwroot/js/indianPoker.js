var dec = ["1s","1d","2s","2d","3s","3d","4s","4d","5s","5d","6s","6d","7s","7d","8s","8d","9s","9d", "10s","10d"];
var card=[];
var rst = [];
var player_card=0;
var com_card=0;
var count= 0;
// var winaudio = new Audio("audio/win.mp3");
// var loseaudio = new Audio("audio/lose.mp3");
// var callaudio = new Audio("audio/call.mp3");
// var dieaudio = new Audio("audio/die.mp3");
var round = 0;

function getRandom(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomArray(min, max, count)
{
  while (1)
  {
    var index = getRandom(min, max);
    // 중복 여부를 체크
    if (rst.indexOf(index) > -1)
    {
      continue;
    }
    rst.push(index);
    // 원하는 배열 갯수가 되면 종료
    if (rst.length == count)
    {
      break;
    }
  }
  return rst;
}

function suple()//게임이 시작되자마자 시작 되는 함수, 카드 셔플을 담당
{
  getRandomArray(0,dec.length-1,dec.length);
  for (var i = 0; i < dec.length ; i++)
  {
    card.push(dec[rst.pop()]);
  }
  count=0;
  turnccnt=0;
  player_card = card[count++];
  com_card = card[count++];
  Score();
  Turn();
}

var call_cnt=0;
var turncnt=0;
var score=0;
var comdie =0;
var comcall=0;
function Turn()//누구의 턴인지 알려주는 함수
{
  round=count/2;
  roundtext.innerHTML="Round :";
  document.getElementById('round').innerHTML = round;
  dealeremotion.style.backgroundImage="url('image/dealer_basic.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  if(count==22)
  {
    if(score>0)
    {
    //   winaudio.play();
    //   winaudio.currentTime = 0;
      alert("WIN");
    }
    else if(score==0)
    {
      alert("DRAW");
    }
    else
    {
    //   loseaudio.play();
    //   loseaudio.currentTime = 0;
      alert("LOSE");
    }
    rst=[];
    card=[];

    return;
  }
  if(comdie==1)
  {
      dealer.innerHTML="";
      comdie=0;
  }
  if(comcall==1)
  {
    dealer.innerHTML="";
    comcall=0;
  }
  com.style.backgroundImage = "url('../image/"+com_card+".png')";
  com.style.backgroundSize = "140px 200px";
  player.style.backgroundImage = "url('../image/back.png')";
  player.style.backgroundSize = "140px 200px";
  if(turncnt%2==0)
  {
  }
  else if(turncnt%2==1)
  {
    ComTurn();
  }
}

function ComTurn()
{
  var callordie = Math.floor(Math.random()*5)+parseInt(player_card[0]);
  if(callordie>8)
  {
    DieWin();
  }
  else
  {
    if(call_cnt==1){comcall=1;}
    dealer.innerHTML="Call";
    Call();
  }
}
function Call()
{
//   callaudio.play();
//   callaudio.currentTime = 0;
  if(call_cnt==1)//두번째 call
  {
    dealer.innerHTML="Call";
    call_cnt=0;
    OpenCard();
  }
  else//첫번째 call
  {
    dealer.innerHTML="Call";
    call_cnt=1;
    turncnt+=1;
    Turn();
  }
  console.log("call " + player_card);
}
function OpenCard()
{
    if(player_card[0]>com_card[0])
    {
      CallWin();
    }
    else if(player_card[0]<com_card[0])
    {
      CallLose();
    }
    else if(player_card[0]==com_card[0])
    {
      Draw()
    }else{
      player.style.backgroundImage="url('../image/"+player_card+".png')";
      player.style.backgroundSize = "140px 200px";
    }
}
function Draw(){
  turncnt++;
  call_cnt=0;
  player_card = card[count++];
  com_card = card[count++];
  setTimeout(Turn,2000);
}
function CallWin()
{
  score+=200;
  turncnt = 0;
  call_cnt=0;
  comcall=1;
  player.style.backgroundImage="url('../image/"+player_card+".png')";
  console.log("callWin");
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundImage="url('../image/dealer_lose.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();
  player_card = card[count++];
  com_card = card[count++];
  setTimeout(Turn,2000);
  console.log("call Win " + player_card);
}
function CallLose(){
  score-=200;
  turncnt = 1;
  call_cnt=0;
  comcall=1;
  player.style.backgroundImage="url('../image/"+player_card+".png')";
  player.style.backgroundSize = "140px 200px";
  console.log("callLose");
  dealeremotion.style.backgroundImage="url('../image/dealer_win.png')";
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();
  player_card = card[count++];
  com_card = card[count++];
  setTimeout(Turn,2000);
  console.log("call Lose " + player_card);
}
function DieWin(){
  //   dieaudio.play();
  //   dieaudio.currentTime = 0;
  if(com_card[0][0]=="9"){score+=400;}
  score+=100;
  turncnt=0;
  call_cnt=0;
  comdie=1;
  dealer.innerHTML="DIE"
  player.style.backgroundImage="url('../image/"+player_card+".png')";
  console.log("dieWin");
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundImage="url('../image/dealer_lose.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();
  player_card = card[count++];
  com_card = card[count++];
  setTimeout(Turn,2000);
  console.log("die Win " + player_card);
}
function DieLose()
{
  //   dieaudio.play();
  //   dieaudio.currentTime = 0;
  if(player_card[0][0]=="9"){score-=400;}
  score-=100;
  turncnt=1;
  call_cnt=0;
  dealer.innerHTML="";
  player.style.backgroundImage="url('../image/"+player_card+".png')";
  console.log("dieLose");
  player.style.backgroundSize = "140px 200px";
  dealeremotion.style.backgroundImage="url('../image/dealer_win.png')";
  dealeremotion.style.backgroundSize = "80px 80px";
  Score();
  player_card = card[count++];
  com_card = card[count++];
  setTimeout(Turn,2000);
  console.log("die Lose " + player_card);
}
function Score()
{
  winscore.innerHTML = score;
}