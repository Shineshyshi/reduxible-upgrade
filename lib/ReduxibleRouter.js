"use strict";

exports.__esModule = true;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _reduxSimpleRouter = require("redux-simple-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ReduxibleRouter = function () {
  function ReduxibleRouter(options, history, store) {
    (0, _classCallCheck3["default"])(this, ReduxibleRouter);

    this.routes = options.routes;
    this.container = options.container;
    this.errorContainer = options.errorContainer;
    this.devTools = options.devTools;
    this.extras = options.extras;
    this.history = history;
    this.store = store;
    (0, _reduxSimpleRouter.syncReduxAndRouter)(history, store);
  }

  ReduxibleRouter.renderComponent = function renderComponent(_ref) {
    var container = _ref.container,
        _ref$component = _ref.component,
        component = _ref$component === undefined ? _react2["default"].createElement("div", null) : _ref$component,
        error = _ref.error,
        _ref$store = _ref.store,
        store = _ref$store === undefined ? {} : _ref$store,
        _ref$extras = _ref.extras,
        extras = _ref$extras === undefined ? {} : _ref$extras;

    var Html = container;
    return "<!doctype html>\n" + _server2["default"].renderToString(_react2["default"].createElement(Html, (0, _extends3["default"])({ component: component, error: error, store: store }, extras)));
  };

  ReduxibleRouter.prototype.provide = function provide(children) {
    return _react2["default"].createElement(
      _reactRedux.Provider,
      { store: this.store, key: "provider" },
      children
    );
  };

  ReduxibleRouter.prototype.renderServer = function () {
    var _ref2 = (0, _asyncToGenerator3["default"])( /*#__PURE__*/_regenerator2["default"].mark(function _callee(location) {
      var _ref3, redirectLocation, component, container, store, extras, _container, _extras;

      return _regenerator2["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.route(location);

            case 3:
              _ref3 = _context.sent;
              redirectLocation = _ref3[0];
              component = _ref3[1];
              container = this.container, store = this.store, extras = this.extras;
              return _context.abrupt("return", {
                redirectLocation: redirectLocation,
                rendered: ReduxibleRouter.renderComponent({
                  container: container,
                  component: component,
                  store: store,
                  extras: extras
                })
              });

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              _container = this.errorContainer, _extras = this.extras;

              if (_container) {
                _context.t0.component = ReduxibleRouter.renderComponent({
                  container: _container,
                  error: _context.t0,
                  extras: _extras
                });
              }
              throw _context.t0;

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 10]]);
    }));

    function renderServer(_x) {
      return _ref2.apply(this, arguments);
    }

    return renderServer;
  }();

  ReduxibleRouter.prototype.route = function route(location) {
    var _this = this;

    return new _promise2["default"](function (resolve, reject) {
      (0, _reactRouter.match)({ routes: _this.routes, location: location }, function (error, redirectLocation, renderProps) {
        if (error) {
          return reject(error);
        }

        if (!redirectLocation && !renderProps) {
          return reject(new Error("Failed to route. There is no matching path. Please check your routes configuration."));
        }

        if (redirectLocation) {
          return resolve([redirectLocation]);
        }
        if (renderProps) {
          return resolve([null, _this.provide(_react2["default"].createElement(_reactRouter.__RouterContext, renderProps))]);
        }
      });
    });
  };

  ReduxibleRouter.prototype.renderClient = function renderClient(container, callback) {
    _reactDom2["default"].render(this.provide(this.getRouter()), container, callback);
  };

  ReduxibleRouter.prototype.renderClientWithDevTools = function renderClientWithDevTools(container, callback) {
    window.React = _react2["default"];
    // render twice is necessary.
    // if not, React shows invalid server-client DOM sync error.
    _reactDom2["default"].render(this.provide(this.getRouterWithDevTools()), container, callback);
  };

  ReduxibleRouter.prototype.getRouter = function getRouter() {
    return _react2["default"].createElement(_reactRouter.Router, { history: this.history, routes: this.routes });
  };

  ReduxibleRouter.prototype.getRouterWithDevTools = function getRouterWithDevTools() {
    var DevTools = this.devTools;
    return _react2["default"].createElement(
      "div",
      null,
      this.getRouter(),
      " ",
      _react2["default"].createElement(DevTools, null)
    );
  };

  return ReduxibleRouter;
}();

exports["default"] = ReduxibleRouter;
//# sourceMappingURL=ReduxibleRouter.js.map