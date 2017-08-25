'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _skeleton = require('<%- skeleton.path %>');

var _skeleton2 = _interopRequireDefault(_skeleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _vue2.default({
    components: {
        Skeleton: _skeleton2.default
    },
    template: '<skeleton />'
});
module.exports = exports['default'];