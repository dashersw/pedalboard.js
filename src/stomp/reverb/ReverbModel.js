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
 * @fileoverview Reverb pedal component model.
 *
 * Inspiration and impulse response buffer taken from
 *
 * http://kevincennis.com/audio/
 * http://kevincennis.com/audio/assets/sounds/pcm90cleanplate.wav
 *
 * More can be found at
 * http://www.dubbhism.com/2008/10/free-download-60-classic-and-king-tubby.html
 * http://www.adventurekid.se/akrt/free-reverb-impulse-responses/
 */

goog.provide('pb.stomp.ReverbModel');
goog.require('pb.stomp.ConvModel');



/**
 * Component model for reverb pedal.
 *
 * @constructor
 * @extends {pb.stomp.ConvModel}
 * @param {AudioContext} context The context this component model will operate on.
 */
pb.stomp.ReverbModel = function(context) {
    goog.base(this, context);
};
goog.inherits(pb.stomp.ReverbModel, pb.stomp.ConvModel);


/**
 * @override
 */
pb.stomp.ReverbModel.prototype.iRPath = 'audio/ir/reverb/pcm90cleanplate.wav';
