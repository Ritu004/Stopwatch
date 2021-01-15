var mode = false;
var timecounter = 0;
var lapcounter = 0;
var action;
var lapno = 0;


var timemin, timesec, timecensec;
var lapmin, lapsec, lapcensec;

hideshowButton("#start","#lapbtn");
$("#start").click(function(){
  mode =true;
  hideshowButton("#stop","#lapbtn");
  startAction();
});
$("#stop").click(function(){
  hideshowButton("#resume","#reset");
  clearInterval(action);
});

$("#resume").click(function(){
  hideshowButton("#stop","#lapbtn");
  startAction();
});

$("#reset").click(function(){
 location.reload();
});

$("#lapbtn").click(function(){
    if(mode == true){
      clearInterval(action);
      lapcounter = 0;
      addlap();
      startAction();
    }
});

//Functions are here
function hideshowButton(x,y){
  $(".control").hide();
  $(x).show();
  $(y).show();
}
function startAction(){
  action = setInterval(function(){
    timecounter++;
    if(timecounter == 100*60*100){
      timecounter = 0;
    }
    lapcounter++;
    if(lapcounter == 100*60*100){
      lapcounter = 0;
    }
    updateTime();
  },10);
}

function updateTime(){
  timemin = Math.floor(timecounter/6000);
  timesec = Math.floor((timecounter%6000)/100);
  timecensec = Math.floor((timecounter%6000)%100);
  $("#timemin").text(format(timemin));
  $("#timesec").text(format(timesec));
  $("#timecensec").text(format(timecensec));
  
  lapmin = Math.floor(lapcounter/6000);
  lapsec = Math.floor((lapcounter%6000)/100);
  lapcensec = Math.floor((lapcounter%6000)%100);
  
   $("#lapmin").text(format(lapmin));
  $("#lapsec").text(format(lapsec));
  $("#lapcensec").text(format(lapcensec));
 
}
function format(number){
  if(number<10){
    return '0'+number;
 
  }
   else{
    return number;
  }
}

function addlap(){
  lapno++;
  var mylapinfo =
      '<div class="lapss">'+
        '<div class="laptitle">'+'Lap'+lapno+'</div>'+
        '<div class="lapcontent">'+ 
          '<span>'+format(lapmin)+'</span>'+
          ':<span>'+format(lapsec)+'</span>'+
          ':<span>'+format(lapcensec)+'</span>'
      +'</div>'
      +'</div>';
  $(mylapinfo).prependTo("#laps");
}