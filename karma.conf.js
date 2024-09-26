module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-spec-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    reporters: ["progress", "spec"],
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
    client: {
      captureConsole: true,
    },
  });
};
