const fs = require("fs");
const yaml = require("js-yaml");

module.exports = (files, answers) => {
  let results = {};
  files.forEach((file) => {
    results[file] = {};
    const filename = file.replace(".yml", "");
    const doc = yaml.load(
      fs.readFileSync(
        `${process.env.GITHUB_WORKSPACE}/.github/workflows/${file}`,
        "utf8"
      )
    );

    if (answers[filename].includes(doc.on.schedule[0].cron.trim())) {
      results[file].isCorrect = true;
      results[file].report = {
        type: "actions",
        level: "info",
        msg: `Results for ${filename}: correct`,
      };
    } else {
      results[file].isCorrect = false;
      results[file].report = {
        type: "actions",
        level: "fatal",
        msg: `Expected ${filename} to contain the cron syntax ${
          answers[filename][0]
        } or ${
          answers[filename][1]
        }, but got ${doc.on.schedule[0].cron.trim()}`,
      };
    }
  });

  return results;
};
