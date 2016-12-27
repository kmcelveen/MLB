'use strict';

let expect = chai.expect;
let should = chai.should();
let serverScripts = require('../client/scripts/serverUtils');
let appClass = require('../client/scripts/app');

describe('Game Carousel', function (done) {

    it('GameCarousel should be a contructor', function (done) {
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
      expect(test).to.respondTo('loadToPage');
    })
});
