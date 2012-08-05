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
    this.input = new stomp.io.FileInput(this.context, 'audio/sample.mp3');
    this.output = new stomp.io.Output(this.context);
    this.volumePedal = new stomp.box.volume.Component(this.context);
    this.reverbPedal = new stomp.box.reverb.Component(this.context);
};


/**
 * Routes the signal.
 */
stomp.Bootstrapper.prototype.route = function() {
    this.input.connectOutputTo(this.volumePedal.model.source);
    this.volumePedal.connectOutputTo(this.context.destination);
};

goog.exportSymbol('stomp', stomp.Bootstrapper);
