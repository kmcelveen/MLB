$(document).ready(function(){
  console.log('Dom is loaded');
  $.ajax({
    method: "GET",
    url: "http://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json",
    dataType: "json",
    cache: false
  }).done(data => {
      console.log("this is the data", data)
  }).fail(err => {
      console.log(err);
  });

});