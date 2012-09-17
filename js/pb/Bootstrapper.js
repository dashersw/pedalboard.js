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
