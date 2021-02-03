module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 283:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(105)
const yaml = __nccwpck_require__(982)
const fs = __nccwpck_require__(747)

async function run () {
  try {
    const files = core.getInput('files').split(',')
    //   TODO: verify the proper files were passed and learner didn't tamper with grading.yml

    const answers = {
      'stale-daily': '0 0 * * *',
      'stale-weekly': '0 0 * * MON',
      'stale-monthly': '0 0 1 * *'
    }

    files.forEach((file) => {
      const filename = file.replace('.yml', '')

      const doc = yaml.load(
        fs.readFileSync(
        `${process.env.GITHUB_WORKSPACE}/.github/workflows/${file}`,
        'utf8'
        )
      )
      // TODO: if desired keys dont' exist prevent failure but provide feedback
      if (answers[filename].trim() === doc.on.schedule[0].cron.trim()) {
        console.log(`Results for ${filename}: correct`)
      } else {
        console.log(`Results for ${filename}: incorrect`)
        core.setFailed(
          `File ${filename} is incorrect, see the troubleshooting step for help.`
        )
        core.setOutput('report', {
          type: 'issue',
          level: 'warning',
          msg:
          `Expected ${filename} to contain the cron syntax ${answers[filename]}, got ${doc.on.schedule[0].cron.trim()}`
        })
      }
    })
  } catch (error) {
    core.setFailed(error)
  }
}

run()


/***/ }),

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 982:
/***/ ((module) => {

module.exports = eval("require")("js-yaml");


/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(283);
/******/ })()
;