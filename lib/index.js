'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _WebpackConfig = require('./WebpackConfig');

var _WebpackConfig2 = _interopRequireDefault(_WebpackConfig);

var _ConfigValidator = require('./ConfigValidator');

var _ConfigValidator2 = _interopRequireDefault(_ConfigValidator);

var _path = require('path');

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LavasCore = function () {
    function LavasCore() {
        var cwd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
        (0, _classCallCheck3.default)(this, LavasCore);

        this.cwd = cwd;
    }

    (0, _createClass3.default)(LavasCore, [{
        key: 'init',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.loadConfig(process.env.NODE_ENV);

                            case 2:
                                this.config = _context.sent;


                                _ConfigValidator2.default.validate(this.config);

                                this.webpackConfig = new _WebpackConfig2.default(this.config);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function init() {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: 'loadConfig',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                var _this = this;

                var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'development';
                var config, configDir, files, temp;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                config = {};
                                configDir = (0, _path.join)(this.cwd, 'config');
                                files = _glob2.default.sync('**/*.js', {
                                    cwd: configDir
                                });
                                _context3.next = 5;
                                return _promise2.default.all(files.map(function () {
                                    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(filepath) {
                                        var paths, name, cur, i;
                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        filepath = filepath.substring(0, filepath.length - 3);

                                                        paths = filepath.split('/');
                                                        name = void 0;
                                                        cur = config;

                                                        for (i = 0; i < paths.length - 1; i++) {
                                                            name = paths[i];
                                                            if (!cur[name]) {
                                                                cur[name] = {};
                                                            }

                                                            cur = cur[name];
                                                        }

                                                        name = paths.pop();

                                                        _context2.next = 8;
                                                        return _promise2.default.resolve().then(function () {
                                                            return require('' + (0, _path.join)(configDir, filepath));
                                                        });

                                                    case 8:
                                                        cur[name] = _context2.sent;

                                                    case 9:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this);
                                    }));

                                    return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }()));

                            case 5:
                                temp = config.env || {};

                                if (temp[env]) {
                                    _lodash2.default.merge(config, temp[env]);
                                }

                                return _context3.abrupt('return', config);

                            case 8:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function loadConfig() {
                return _ref2.apply(this, arguments);
            }

            return loadConfig;
        }()
    }, {
        key: 'koaMiddleware',
        value: function koaMiddleware(context, next) {}
    }]);
    return LavasCore;
}();

exports.default = LavasCore;
module.exports = exports['default'];