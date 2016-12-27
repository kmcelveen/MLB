( function ( $ ) {
  'use strict';
  console.log('Dom is loaded');

  let GameCarousel = function () {
        this.arrayOfGames = '';
        this.activeGame = 0;
  }
  window['GameCarousel'] = GameCarousel;


    GameCarousel.prototype.loadToPage = function () {
      this.getAllData();
      $(window).on('keydown', this.handleArrowControls)
    };

    GameCarousel.prototype.getAllData = function () {
      let that = this;
      $.ajax({
        method: 'GET',
        url: "http://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json",
        dataType: 'json',
        cache: false
      }).done(function(data) {
        console.log(data);
        that.arrayOfGames = data.data.games.game.slice();
        that.createThumbnails();
        // console.log(that.games)
      }).fail(function(error){
          console.log(error);
      });
    }

    GameCarousel.prototype.createThumbnails = function (){
      var template = ''
      var that = this;
      try {
        $.each(that.arrayOfGames, function(i, game){
            template = '<div class="game-thumbnail id=#'+this.activeGame+1+'">';
            template += '<div>'
            template += '<img class="game-img" src ="' + game.video_thumbnails.thumbnail[0].content + '" >';
            template += '</div>';
            template += '</div>';
          $('#games-section').append(template);
        });
        var gameSect = $('#games-section').children(":first");
        console.log(gameSect)
        gameSect.addClass('active');
      }
      catch(e) {
        console.log(e);
      }

    }

    // .addClass('active');
    GameCarousel.prototype.handleArrowControls = function (e){
      e.preventDefault();
      if(e.keyCode === 37){
        console.log('left arrow')
        if(!$('.active').prev()){
            return false;
        }else {
          var test = $('.active').prev()
          $('.active').removeClass('active');
          test.addClass('active');
          $('.active').scrollIntoView();
        }
        // this.activeGame--;
        // $('#'+this.activeGame).scrollIntoView();
      }else if(e.keyCode === 39){
        if(!$('.active').next()){
            return false;
        }else {
          var test = $('.active').next()
          $('.active').removeClass('active');
          test.addClass('active');
          // $(' div .active').scrollIntoView();
          // window.scrollBy(100, 0);
        }
        console.log('right arrow');
        // window.scrollBy(100, 0);
      }
    }
  //   $.ajax({
  //     method: "GET",
  //     url: "http://gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json",
  //     dataType: "json",
  //     cache: false
  //   }).done(data => {
  //       // console.log("this is the data", data)
  //       var html = '';
  //       var games = data.data.games.game
  //       // console.log('this is the games', games)
  //       $.each(games, function (key, val) {
  //         // console.log("this is the key", key)
  //         console.log("this is the val", val)
  //           html = '<div class="game-thumbnail">';
  //           html += '<img class="game-img" src ="' + val.video_thumbnails.thumbnail[0].content + '" />';
  //           html += '</div>';
  //           $('.games-section').append(html);
  //           console.log('this is thecontext', this.venue);
  //       });
  //

  //   }).fail(err => {
  //       console.log(err);
  //   });

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
