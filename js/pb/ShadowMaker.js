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
 * @fileoverview ShadowMaker for pb.
 */


goog.provide('pb.shadowMaker');
goog.require('goog.color');
goog.require('goog.style');


pb.shadowMaker = function (element, length, darkness, weight) {
    var elStyle = document.defaultView.getComputedStyle(element, null);
    var colorText = elStyle.getPropertyValue('background-color');
    var hslArray = goog.color.hexToHsl(goog.color.parse(colorText).hex);

    darkness = darkness || 1;

    hslArray[2] = hslArray[2] * darkness;

    var shadowTemplate = function (x, y, blur, a, d) {
        d = d || 0;
        d = d + 'px';
        return x + 'px ' + y + 'px ' + blur + 'px ' + d + ' hsl(' + hslArray[0] + ', ' + (hslArray[1] * 100) + '%, ' + a + '%)';
    };
    var all = '';
    var shadows = [];
    var xAngle = (window.innerWidth / 2 - goog.style.getPageOffset(element).x - element.offsetWidth / 2) / 30;
    var yAngle = (window.innerHeight / 2 - goog.style.getPageOffset(element).y - element.offsetHeight / 2) / 30;

    var yConDist = yAngle * length / 10;

    var con = length;

    while (length--) {
        var xDist = xAngle * length / con;
        var yDist = yConDist * length * 2 / con;//yAngle * Math.sqrt(length) * length / con;

        shadows.push(
            shadowTemplate(
                xDist,
                yDist,
                0,
                hslArray[2] * 100 - hslArray[2] * 100 * (length + 5) / con / 1.6));
    }
    shadows.splice(0, 0,
        shadowTemplate(xAngle, yConDist * 2, con * 4, 0, 0),
//        shadowTemplate(xAngle / weight, yConDist * 2, con / 2, 0,  con / 4 / weight),
        shadowTemplate(xAngle / weight / 8, yConDist * 3, con * 4, 30,  con / 12),
        shadowTemplate(xAngle / weight / 8, yConDist * 2, con, 0,  con / 4 / weight),
        shadowTemplate(xAngle / weight / 8, yConDist * 2.55, con * 2, 5,  con / 3 /  weight)
);

    element.style.boxShadow = shadows.reverse().join(', ');
    element.style.left = '-' + xAngle + 'px';
};

pb.textShadowMaker = function(element, length, before, after, invertY, invertX) {
    before = before || [];
    after = after || [];
    var elStyle = document.defaultView.getComputedStyle(element, null);
    var colorText = elStyle.getPropertyValue('color');
    var hslArray = goog.color.hexToHsl(goog.color.parse(colorText).hex);

    var shadowTemplate = function (x, y, blur, a) {
        return x + 'px ' + y + 'px ' + blur + 'px hsl(' + hslArray[0] + ', ' + (hslArray[1] * 100) + '%, ' + a + '%)';
    };
    var all = '';
    var shadows = [];
    var xAngle = (window.innerWidth / 2 - goog.style.getPageOffset(element).x - element.offsetWidth / 2) / 30;
    var yAngle = (window.innerHeight - goog.style.getPageOffset(element).y - element.offsetHeight / 2) / 30;

    var yConDist = yAngle * length / 10;

    var con = length;

    while (length--) {
        var xDist = xAngle * length / con;
        var yDist = yConDist * length * 2 / con;//yAngle * Math.sqrt(length) * length / con;
        if (invertY) yDist = -yDist;
        if (invertX) xDist = -xDist * Math.pow(invertX, 4);
        shadows.push(
            shadowTemplate(
                xDist,
                yDist,
                0,
                hslArray[2] * 100 - hslArray[2] * 100 * (length + 5) / con / 1.6));
    }
    shadows.splice(0, 0,
        shadowTemplate(xAngle, 0, con * 2, 0),
        shadowTemplate(xAngle, yConDist * 1.8, con / 2, 0),
        shadowTemplate(xAngle, yConDist * 2.5, con * 2, 0));

    shadows = [].concat(before,shadows.reverse(),after);

    element.style.textShadow = shadows.join(', ');
};
