// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')
var sauce = require('../../sauce.json'); // 引进 userName 和 key

function isDebug(argument) {
  return argument === '--debug'
}

// 生成一个 SauceLabs 浏览器配置信息，可以指定运行的系统和浏览器版本
function createCustomLauncher (browser, platform, version) {
    return {
        base: 'SauceLabs',
        browserName: browser,
        platform: platform,
        version: version
    };
}

// 定义所有需要在云端测试的平台和浏览器
// 名字的定义是随意的，SauceLabs 只会根据配置内容来启动对应的浏览器
// 所有完整的平台设备列表：https://saucelabs.com/platforms
var customLaunchers = {
    // 主流浏览器
    sl_win_chrome: createCustomLauncher('chrome', 'Windows 7'),
    sl_mac_chrome: createCustomLauncher('chrome', 'OS X 10.10'),

    // 移动设备浏览器
    sl_ios_8_safari: createCustomLauncher('iphone', null, '8.4'),
    sl_ios_9_safari: createCustomLauncher('iphone', null, '9.3'),
    sl_android_4_2: createCustomLauncher('android', null, '4.2'),
    sl_android_5_1: createCustomLauncher('android', null, '5.1'),

    // Microsoft Edge
    sl_edge: createCustomLauncher('MicrosoftEdge', 'Windows 10'),

    // IE 浏览器
    sl_ie_9: createCustomLauncher('internet explorer', 'Windows 7', '9'),
    sl_ie_10: createCustomLauncher('internet explorer', 'Windows 8', '10'),
    sl_ie_11: createCustomLauncher('internet explorer', 'Windows 10', '11')
};

if (!process.argv.some(isDebug)) {
  module.exports = function (config) {
    // 将 SauceLabs 提供的 username 和 accesskey 放到环境变量中
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        process.env.SAUCE_USERNAME = sauce.username;
        process.env.SAUCE_ACCESS_KEY = sauce.accesskey;
    }
    
    // 设置测试的超时时间
    var maxExecuteTime = 5*60*1000;
    config.set({
      // to run in additional browsers:
      // 1. install corresponding karma launcher
      //    http://karma-runner.github.io/0.13/config/browsers.html
      // 2. add it to the `browsers` array below.
      // browsers: ['PhantomJS'],
      // 自定义运行测试的 SauceLabs 浏览器
      customLaunchers: customLaunchers,
      browsers: Object.keys(customLaunchers),
      frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
      reporters: ['spec', 'coverage', 'saucelabs'],
      files: ['./index.js'],
      preprocessors: {
        './index.js': ['webpack', 'sourcemap']
      },
      webpack: webpackConfig,
      webpackMiddleware: {
        noInfo: true
      },
      coverageReporter: {
        dir: './coverage',
        reporters: [
          { type: 'lcov', subdir: '.' },
          { type: 'text-summary' }
        ]
      },
      // SauceLabs 的配置，这里只需要配置几个重要的字段即可，完整的字段可以参考：
      // https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
      sauceLabs: {
          // 测试结果是否公开，如果希望生成矩阵图，必须是 public
          public: 'public',
          // 是否在测试过程记录虚拟机的运行录像
          recordVideo: false,
          // 是否在测试过程记录虚拟机的图像
          recordScreenshots: false,
          // 测试名称
          testName: 'Cross browsers test',
          // 测试的记录号，可以为任意字符，如果希望生成矩阵图，build 不能为空
          build: 'build-' + Date.now()
      },
      // 最大超时时间
      captureTimeout: maxExecuteTime,
      browserNoActivityTimeout: maxExecuteTime
    })
  }  
} else {
  module.exports = function (config) {
    config.set({
      browsers: ['Chrome'],
      frameworks: ['mocha-debug', 'mocha', 'sinon-chai'],
      files: ['./index.js'],
      preprocessors: {
        './index.js': ['webpack', 'sourcemap']
      },
      webpack: webpackConfig,
      webpackMiddleware: {
        noInfo: true
      }
    })
  }  
}
