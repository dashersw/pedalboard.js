// Copyright 2011 Armagan Amcalar. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Bootstrapper for stomp.
 */

goog.provide('stomp.Bootstrapper');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('stomp.box.conv.Component');
goog.require('stomp.box.overdrive.Component');
goog.require('stomp.box.reverb.Component');
goog.require('stomp.box.volume.Component');
goog.require('stomp.io.FileInput');
goog.require('stomp.io.Output');



/**
 * Bootstrapper class includes things to do on startup.
 * @constructor
 */
stomp.Bootstrapper = function() {
    this.context = new webkitAudioContext();
    this.init();
    this.route();
};


/**
 * Initializes the input, the output and the pedal components.
 */
stomp.Bootstrapper.prototype.init = function() {
    this.input = new stomp.io.FileInput(this.context, 'audio/samples/sample.mp3');
    this.output = new stomp.io.Output(this.context);
    this.overdrivePedal = new stomp.box.overdrive.Component(this.context);
    this.reverbPedal = new stomp.box.reverb.Component(this.context);
    this.volumePedal = new stomp.box.volume.Component(this.context);
    this.speaker = new stomp.box.conv.Component(this.context);

    this.effects = [
        this.overdrivePedal,
        this.reverbPedal,
        this.volumePedal,
        this.speaker
    ];
    this.chain = [].concat(this.input, this.effects, this.output);

    goog.array.forEach(this.effects, function(effect) {
        document.getElementsByTagName('body')[0].innerHTML += effect.getPlaceholder();
    });
    goog.array.forEach(this.effects, function(effect) {
        effect.render();
    });

    this.overdrivePedal.setDrive(10);
    this.volumePedal.setLevel(10);
    this.reverbPedal.setLevel(3);
};


/**
 * Routes the signal.
 * Input -> volume pedal -> reverb pedal
 */
stomp.Bootstrapper.prototype.route = function() {
    for (var i = 0; i < this.chain.length - 1; i++) {
        this.chain[i].connect(this.chain[i + 1]);
    }
};


/**
 * Plays the input.
 */
stomp.Bootstrapper.prototype.play = function() {
    this.input.play();
};


/**
 * Stops the input.
 */
stomp.Bootstrapper.prototype.stop = function() {
    this.input.stop();
};

goog.exportProperty(stomp.Bootstrapper.prototype, 'play', stomp.Bootstrapper.prototype.play);
goog.exportProperty(stomp.Bootstrapper.prototype, 'stop', stomp.Bootstrapper.prototype.stop);
goog.exportSymbol('stomp', stomp.Bootstrapper);
