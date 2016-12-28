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
      // $(window).on('keypress', this.pauseAudio.bind(this));
    };

    GameCarousel.prototype.getAllData = function () {
      let that = this;
      let date = new Date();
      let day = date.getDate().toString();
      let month = date.getMonth().toString();
      let year = date.getFullYear().toString();
      // Provided variables to test static json url and dynamic json url.
      let staticUrl = "//gdx.mlb.com/components/game/mlb/year_2016/month_05/day_20/master_scoreboard.json";
      let dynamicUrl = "http://gdx.mlb.com/components/game/mlb/year_"+year+"/month_"+month+"/day_"+day+"/master_scoreboard.json";
      $.ajax({
        method: 'GET',
        url: staticUrl,
        dataType: 'json',
        cache: false
      }).done(function(data) {
        console.log(data)
        that.arrayOfGames = data.data.games.game;
        if(!that.arrayOfGames){
          console.log("in here");
          toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": false,
          "positionClass": "toast-top-left",
          "preventDuplicates": true,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
          toastr.info('Sorry kid...no games today. Dry those eyes!');

          $('#games-section').append('<object src="../assets/crying-jordan9.gif" width="498" height="272" class="giphy-embed"></object>');
        }else{
          that.createThumbnails();
        }
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

    GameCarousel.prototype.volumePreset = function () {
       let audio = $('#audio');
       audio.volume = 0.2;
    };

    GameCarousel.prototype.pauseAudio = function (e) {
      let trackPlayedBool = true;
      let audioTrack = document.getElementById('audio');
      console.log(audioTrack);
       if(e.keyCode === 0 || e.keyCode === 32){
         e.preventDefault()
         audioTrack.pause()
          trackPlayedBool = false;
       } else {
         audioTrack.play();
         trackPlayedBool = true;
       }
    };

} ( jQuery ) );
