const core = require("@actions/core");
const yaml = require("js-yaml");
const fs = require("fs");

async function run() {
  try {
    const files = core.getInput("files").split(",");
    //   TODO: verify the proper files were passed and learner didn't tamper with grading.yml

    const answers = {
      "stale-daily": "0 0 * * *",
      "stale-weekly": ["0 0 * * MON", "0 0 * * 1"],
      "stale-monthly": "0 0 1 * *",
    };

    files.forEach((file) => {
      const filename = file.replace(".yml", "");

      const doc = yaml.load(
        fs.readFileSync(
          `${process.env.GITHUB_WORKSPACE}/.github/workflows/${file}`,
          "utf8"
        )
      );

      // TODO: if desired keys dont' exist prevent failure but provide feedback
      if (answers[filename].trim().includes(doc.on.schedule[0].cron.trim())) {
        console.log(`Results for ${filename}: correct`);
      } else {
        console.log(`Results for ${filename}: incorrect`);
        core.setFailed(
          `File ${filename} is incorrect, click on the Troubleshooting step of this workflow for more info.`
        );
        core.setOutput("report", {
          type: "actions",
          level: "fatal",
          msg: `Expected ${filename} to contain the cron syntax ${
            answers[filename]
          }, got ${doc.on.schedule[0].cron.trim()}`,
        });
      }
    });
  } catch (error) {
    core.setFailed(error);
  }
}

run();
