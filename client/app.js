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
      $(window).on('keydown', this.handleArrowControls.bind(this))
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
    };

    GameCarousel.prototype.createThumbnails = function (){
      var template = '';
      var that = this;
      try {
        $.each(that.arrayOfGames, function(i, game){
            template = '<div class="game-thumbnail">';
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
    };

    GameCarousel.prototype.handleArrowControls = function (e){
      e.preventDefault();
      if(e.keyCode === 37 && this.activeGame != 0){
          console.log('left arrow');
            var test = $('.active').prev()
            $('.active').removeClass('active');
            this.activeGame--;
            window.scrollBy(-100, 0);
            test.addClass('active');
      }else if(e.keyCode === 39 && this.activeGame < this.arrayOfGames.length - 1){
        console.log('right arrow');
            var test = $('.active').next()
            $('.active').removeClass('active');
            this.activeGame++;
            window.scrollBy(100, 0);
            test.addClass('active');
      }
    };
} ( jQuery ) );
