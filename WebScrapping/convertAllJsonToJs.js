import fs from "fs";
import path from "path";

// Input directory containing .json files
const inputDir = "C:\\Users\\lenovo\\Desktop\\THENEWSSCRAPER\\WebScrapping";

// Output directory with existing .js files to be overwritten
const outputDir = "C:\\Users\\lenovo\\Desktop\\THENEWSSCRAPER\\Newsscrapper\\src\\dataavail";

// Read all files in the input directory
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading input directory:", err);
    return;
  }

  // Filter only .json files (ignore package files)
  const jsonFiles = files.filter(
    (file) =>
      file.endsWith(".json") &&
      file !== "package.json" &&
      file !== "package-lock.json"
  );

  if (jsonFiles.length === 0) {
    console.log("No valid JSON files found in input directory.");
    return;
  }

  jsonFiles.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const baseName = path.basename(file, ".json"); // e.g., 'home'
    const outputPath = path.join(outputDir, `${baseName}.js`);

    // Skip if corresponding .js file does not exist
    if (!fs.existsSync(outputPath)) {
      console.warn(`⚠️ Skipping: ${outputPath} does not exist.`);
      return;
    }

    // Read JSON content
    fs.readFile(inputPath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading ${file}:`, err);
        return;
      }

      try {
        const jsonData = JSON.parse(data); // Validate JSON
        const variableName = baseName.replace(/[^a-zA-Z0-9_$]/g, "_"); // Sanitize

        const jsContent =
          `const ${variableName} = ` +
          JSON.stringify(jsonData, null, 2) +
          `;\n\nexport default ${variableName};\n`;

        // Overwrite the .js file
        fs.writeFile(outputPath, jsContent, "utf8", (err) => {
          if (err) {
            console.error(`Error writing to ${outputPath}:`, err);
          } else {
            console.log(`✅ Updated ${outputPath} with data from ${file}`);
          }
        });
      } catch (parseErr) {
        console.error(`Error parsing ${file}:`, parseErr);
      }
    });
  });
});
