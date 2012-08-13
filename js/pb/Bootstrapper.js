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
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('pb.box.reverb.Component');
goog.require('pb.box.volume.Component');
goog.require('pb.io.FileInput');
goog.require('pb.io.Output');



/**
 * Bootstrapper class includes things to do on startup.
 * @constructor
 */
pb.Bootstrapper = function() {
    this.context = new webkitAudioContext();
    this.init();
    this.route();
};


/**
 * Initializes the input, the output and the pedal components.
 */
pb.Bootstrapper.prototype.init = function() {
    this.input = new pb.io.FileInput(this.context, 'audio/sample.mp3');
    this.output = new pb.io.Output(this.context);
    this.volumePedal = new pb.box.volume.Component(this.context);
    this.reverbPedal = new pb.box.reverb.Component(this.context);
};


/**
 * Routes the signal.
 * Input -> volume pedal -> reverb pedal
 */
pb.Bootstrapper.prototype.route = function() {
    this.input.connect(this.volumePedal);
    this.volumePedal.connect(this.reverbPedal);
    this.reverbPedal.connect(this.output);
};


/**
 * Plays the input.
 */
pb.Bootstrapper.prototype.play = function() {
    this.input.play();
};


/**
 * Stops the input.
 */
pb.Bootstrapper.prototype.stop = function() {
    this.input.stop();
};

goog.exportProperty(pb.Bootstrapper.prototype, 'play', pb.Bootstrapper.prototype.play);
goog.exportProperty(pb.Bootstrapper.prototype, 'stop', pb.Bootstrapper.prototype.stop);
goog.exportSymbol('pb', pb.Bootstrapper);