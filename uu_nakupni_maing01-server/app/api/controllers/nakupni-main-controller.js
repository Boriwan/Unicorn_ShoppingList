"use strict";
const NakupniMainAbl = require("../../abl/nakupni-main-abl.js");

class NakupniMainController {
  init(ucEnv) {
    return NakupniMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return NakupniMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return NakupniMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new NakupniMainController();
