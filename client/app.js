( function ( $ ) {
  'use strict';
  $(document).ready(function(){
    console.log('Dom is loaded');
    $.ajax({
      method: "GET",
      url: "http://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json",
      dataType: "json",
      cache: false
    }).done(data => {
        console.log("this is the data", data);
        var html = '';
        var games = data.data.games.game
        console.log('this is the games', games)
        $.each(games, function (key, val) {
          console.log("this is the key", key)
          console.log("this is the val", val)
            html = '<div class="game-thumbnail">';
            html += '<img src ="' + val.video_thumbnails.thumbnail[0].content + '" />';
            html += '</div>';
            $('.games-section').append(html);
        });
    }).fail(err => {
        console.log(err);
    });
  });
} ( jQuery ) );





// $(document).ready(function(){
//   console.log('Dom is loaded');
//   $.ajax({
//     method: "GET",
//     url: "http://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json",
//     dataType: "json",
//     cache: false
//   }).done(data => {
//       console.log("this is the data", data);
//       let
//   }).fail(err => {
//       console.log(err);
//   });

// });



