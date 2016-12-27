(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var expect = chai.expect;
var should = chai.should();
// let test = require('../client/scripts/serverUtils');
var appClass = require('../client/scripts/app');
// console.log(test.logErrors);
// let testGameCarousel = new GameCarousel();
// console.log(testGameCarousel)

describe('Game Carousel', function (done) {

    it('GameCarousel should be a contructor', function(done) {
        let test = new GameCarousel();
        done();
        expect(test).to.be.instanceof(GameCarousel);
    });

    it('GameCarousel should have two properties activeGames and arrayOfGames', function(done){
        let test = new GameCarousel();
				done();
        expect(test).to.have.property('activeGames', 'arrayOfGames');
    });

		it('GameCarousel should have methods 5 methods on its prototype', function(done){
			let test = new GameCarousel();
			done();
			expect(test.prototype.loadToPage).to.be.an('function');
			expect(test.prototype.getAllData).to.be.an('function');
			expect(test.prototype.handleArrowControls).to.be.an('function');
			expect(test.prototype.createThumbnails).to.be.an('function');
			expect(test.prototype.volumePreset).to.be.an('function');
		});

		it('GameCarousel.prototype.getAllData should return 15 items', function(done){
      let test = new GameCarousel();
      test.getAllData();
      done();
      expect(test.arrayOfGames).to.have.lengthOf(15);
    });

    it('GameCarousel class target should respond to loadToPage method', function(done){
      let test = new GameCarousel();
      done();
      expect(test).to.respondTo('loadToPage')
    })
});

},{"../client/scripts/app":1}]},{},[2]);
