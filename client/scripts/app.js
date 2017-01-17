(function ($) {
  'use strict';

  console.log('Dom is loaded');

  let GameCarousel = function () {
    this.arrayOfGames = null;
    this.activeGame = 0;
  };

  window.GameCarousel = GameCarousel;

  GameCarousel.prototype.loadToPage = function () {
    this.getAllData();
    $(window).on('keydown', this.handleArrowControls.bind(this));
    $(window).on('keydown', this.pauseAudio.bind(this));
    $('.close .close2').on('click', function (e) {
      e.preventDefault();
      $('.modal').hide();
    });
  };

  GameCarousel.prototype.getAllData = function () {
    let that = this;
    $.get('/api/games').done(function (response) {
      that.arrayOfGames = response.data.games.game;
      if (!that.arrayOfGames) {
        $('.modal').modal('show');
      } else {
        that.createThumbnails();
      }
    }).fail(function (error) {
        console.log(error);
    });
  };

  GameCarousel.prototype.createThumbnails = function () {
    let template = '';
    $.each(this.arrayOfGames, function (i, game) {
      template = `<div class="pill">
                    <h6>${game.away_team_name} <span class="versus">@</span> ${game.home_team_name}</h6>
                      <div class="game-thumbnail">
                        <div>
                          <img class="game-img" src=${game.video_thumbnails.thumbnail[0].content}>
                        </div>
                      </div>
                      <h6>${game.venue}</h6>
                      <h6>${game.away_time}  ${game.away_ampm}  ${game.away_time_zone}</h6>
                    </div>`;
      $('#games-section').append(template);
    });
    let firstThumbNail = $('#games-section').children(':first');
    firstThumbNail.addClass('active');
  };

  GameCarousel.prototype.handleArrowControls = function (e) {
    e.preventDefault();
    if (e.keyCode === 37 && this.activeGame !== 0) {
      let activePill = $('.active').prev();
      $('.active').removeClass('active');
      this.activeGame--;
      window.scrollBy(-150, 0);
      activePill.addClass('active');
    } else if (e.keyCode === 39 && this.activeGame < this.arrayOfGames.length - 1) {
      let activePill = $('.active').next();
      $('.active').removeClass('active');
      this.activeGame++;
      window.scrollBy(150, 0);
      activePill.addClass('active');
    }
  };

  GameCarousel.prototype.volumePreset = function () {
    let audio = $('#audio');
    audio.volume = 0.1;
  };

  GameCarousel.prototype.pauseAudio = function (e) {
    let trackPlayedBool = true;
    let audioTrack = $('#audio');
    if (e.keyCode === 32 && trackPlayedBool !== false) {
      e.preventDefault();
      audioTrack.trigger('pause');
      trackPlayedBool = false;
    } else if (e.keyCode === 93 || e.keyCode === 91) {
      audioTrack.trigger('play');
      trackPlayedBool = true;
    }
  };
}(jQuery));
