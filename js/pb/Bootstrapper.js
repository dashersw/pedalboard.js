// Copyright 2012 Armagan Amcalar. All Rights Reserved.
//
// This file is part of Pedalboard.js.
//
// Pedalboard.js is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pedalboard.js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pedalboard.js.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @fileoverview Bootstrapper for pb.
 */

goog.provide('pb.Bootstrapper');
goog.require('pb.Stage');



/**
 * Bootstrapper class includes things to do on startup.
 * @constructor
 */
pb.Bootstrapper = function() {
    this.initStage();
    this.stage.render(document.getElementById('floor'));
    this.initBoard();
    this.initSamples();
};


/**
 * Initializes the setting, the sample player and their settings.
 */
pb.Bootstrapper.prototype.initSamples = function() {
    var that = this;
    var state = false;

    var cb = document.getElementById('controlButton');
    var samples = document.getElementsByClassName('sample');
    var sampleNo = 1;
    samples = Array.prototype.slice.call(samples);
    var lb = document.getElementsByClassName('linein')[0];

    var playLineIn = function() {
        that.stage.stop();
        that.stage.input = new pb.io.StreamInput(that.stage.getContext());
        goog.events.listen(that.stage.input, 'loaded', function() {
            that.stage.route();
        });
    }

    lb.addEventListener('click', function() {
        state = true;
        sampleNo = 6;
        cBDraw();
        settings[sampleNo - 1]();
        playLineIn();
    }, false);
    var settings = [];

    var cBDraw = function() {
        cb.innerHTML = state ? '&#9724;' : '&#9654;';
        samples.forEach(function(sample) {
            sample.className = 'sample';
        });
        samples[sampleNo] && (samples[sampleNo - 1].className = 'sample on');

        sampleNo == 6 ? lb.className = 'linein on' : lb.className = 'linein';
    };

    var play = function() {
        if (sampleNo == 6) {
            playLineIn();
            return;
        }
        settings[sampleNo - 1] && settings[sampleNo - 1]();
        that.stage.play('audio/samples/sample' + sampleNo + '.mp3');
    }

    var cBHandler = function() {
        state = !state;
        cBDraw();
        that.stage.stop();
        if (state) play();
    };

    cb.addEventListener('click', cBHandler, false);

    samples.forEach(function(sample) {
        sample.addEventListener('click', function() {
            sampleNo = Array.prototype.slice.call(sample.parentNode.children).indexOf(sample) + 1;
            state = true;
            cBDraw();
            play();
        });
    });

    settings.push(function() {
        !that.overdrive.bypassSwitch.getState() && that.overdrive.bypassSwitch.toggle();
        that.overdrive.setLevel(10);
        that.overdrive.setDrive(2);
        that.overdrive.setTone(7);
        that.reverb.setLevel(10);
    });

    settings.push(function() {
        !that.overdrive.bypassSwitch.getState() && that.overdrive.bypassSwitch.toggle();
        that.overdrive.setLevel(6);
        that.overdrive.setDrive(6);
        that.overdrive.setTone(3);
        that.reverb.setLevel(3);
    });

    settings.push(function() {
        !that.overdrive.bypassSwitch.getState() && that.overdrive.bypassSwitch.toggle();
        that.overdrive.setLevel(6);
        that.overdrive.setDrive(10);
        that.overdrive.setTone(5);
        that.reverb.setLevel(10);
    });

    settings.push(function() {
        that.overdrive.bypassSwitch.getState() && that.overdrive.bypassSwitch.toggle();
        that.overdrive.setLevel(10);
        that.overdrive.setDrive(0);
        that.overdrive.setTone(10);
        that.reverb.setLevel(10);
    });

    settings.push(function() {
        !that.overdrive.bypassSwitch.getState() && that.overdrive.bypassSwitch.toggle();
        that.overdrive.setLevel(10);
        that.overdrive.setDrive(10);
        that.overdrive.setTone(3);
        that.reverb.setLevel(7);
    });

    settings.push(function() {
        that.overdrive.bypassSwitch.getState() && that.overdrive.bypassSwitch.toggle();
        that.overdrive.setLevel(10);
        that.overdrive.setDrive(10);
        that.overdrive.setTone(3);
        that.reverb.setLevel(7);
    });
};


/**
 * Initializes a board with some pedals.
 */
pb.Bootstrapper.prototype.initBoard = function() {
    var ctx = this.stage.getContext();

    var board = new pb.Board(ctx);
    this.stage.setBoard(board);

    this.overdrive = new pb.stomp.Overdrive(ctx);
    this.reverb = new pb.stomp.Reverb(ctx);
    this.volume = new pb.stomp.Volume(ctx);
    this.speaker = new pb.stomp.Conv(ctx);

    board.addPedals([this.overdrive, this.reverb, this.volume, this.speaker]);

    this.overdrive.setDrive(8);
    this.overdrive.setTone(4);
    this.overdrive.setLevel(6);
    this.volume.setLevel(10);
    this.reverb.setLevel(3);
};


/**
 * Initializes a stage.
 */
pb.Bootstrapper.prototype.initStage = function() {
    this.stage = new pb.Stage();
};

goog.exportSymbol('pb', pb.Bootstrapper);
