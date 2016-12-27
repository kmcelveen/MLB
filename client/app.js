( function ( $ ) {
  'use strict';
  console.log('Dom is loaded');

  let GameCarousel = function () {
        this.arrayOfGames = '';
        this.activeGame = 0;
  };
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
        that.arrayOfGames = data.data.games.game.slice();
        that.createThumbnails();
      }).fail(function(error){
          console.log(error);
      });
    };
    GameCarousel.prototype.createThumbnails = function (){
      let template = '';
      let that = this;
      try {
        $.each(that.arrayOfGames, function(i, game){
            template = '<div class="pill">';
            template += '<h6>'+game.away_team_name+ ' @ ' + game.home_team_name+'</h6>';
            template +='<div class="game-thumbnail">';
            template += '<div>';
            template += '<img class="game-img" src ="' + game.video_thumbnails.thumbnail[0].content + '" >';
            template += '</div>';
            template += '</div>';
            template += '<h6>'+ game.venue +'</h6>';
            template += '<h6>'+ game.away_time + ' ' + game.away_ampm + ' ' + game.away_time_zone +'</h6>';
            template +='</div>';
          $('#games-section').append(template);
        });
        let gameSect = $('#games-section').children(":first");
        gameSect.addClass('active');
      }
      catch(e) {
        console.log(e);
      }
    };

    GameCarousel.prototype.handleArrowControls = function (e){
      e.preventDefault();
      if(e.keyCode === 37 && this.activeGame != 0){
            let activePill = $('.active').prev()
            $('.active').removeClass('active');
            this.activeGame--;
            window.scrollBy(-100, 0);
            activePill.addClass('active');
      }else if(e.keyCode === 39 && this.activeGame < this.arrayOfGames.length - 1){
            let activePill = $('.active').next()
            $('.active').removeClass('active');
            this.activeGame++;
            window.scrollBy(100, 0);
            activePill.addClass('active');
      }
    };
} ( jQuery ) );
