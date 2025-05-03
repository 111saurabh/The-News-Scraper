import csvtojson from "csvtojson";
import fs from "fs";

const csvFilePaths = [
  "./sports.csv",
  "./tech.csv",
  "./world.csv",
  "./business.csv",
  "./home.csv",
];

csvFilePaths.forEach((csvFilePath) => {
  csvtojson()
    .fromFile(csvFilePath)
    .then((json) => {
      const jsonFilePath = csvFilePath.replace(".csv", ".json");
      fs.writeFileSync(jsonFilePath, JSON.stringify(json), "utf-8", (err) => {
        if (err) {
          console.log(err);
        }
      });
      console.log(`Converted ${csvFilePath} to ${jsonFilePath}`);
    });
});
