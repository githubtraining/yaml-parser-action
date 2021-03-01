const core = require("@actions/core");

const gradeLearner = require("./lib/gradeLearner");

async function run() {
  try {
    const files = core.getInput("files").split(",");
    //   TODO: verify the proper files were passed and learner didn't tamper with grading.yml

    const answers = {
      "stale-daily": ["0 0 * * *"],
      "stale-weekly": ["0 0 * * MON", "0 0 * * 1"],
      "stale-monthly": ["0 0 1 * *"],
    };

    const results = gradeLearner(files, answers);
    core.setOutput("report", results);
    // TODO pinpoint the exact file that failed
    if (
      results["stale-daily"].report.level !== "info" ||
      results["stale-monthly"].report.level !== "info" ||
      results["stale-weekly"].report.level !== "info"
    ) {
      throw results;
    }
  } catch (error) {
    core.setFailed(error);
  }
}

run();
