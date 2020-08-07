var fs = require("fs");
var child_process = require("child_process");
var jsFileContents = fs.readFileSync("./cards.js").toString();

try {
    if (!fs.existsSync("./output")) {
        fs.mkdirSync("./output");
    }
} catch (ex) {
    console.log("Failed to create output directory");
}

try {
    var javascriptArrayString = jsFileContents.replace("var cards = ", "");
    var jsonString = JSON.stringify(JSON.parse(javascriptArrayString), null, 4);
    fs.writeFileSync("./output/cards.json", jsonString);
    console.log("Converted cards.js to cards.json");
} catch (ex) {
    console.log("Failed to convert to json", ex);
}


try {
    var typescriptSnippet = 'import {Card} from "../card.model";\n'
        + "var cards: Card[] = ";
    fs.writeFileSync("./output/cards.ts", jsFileContents.replace("var cards = ", typescriptSnippet));
    child_process.execSync("tsc output/cards.ts --noEmit", {stdio: "inherit"});
    console.log("Cards typechecked");
} catch (ex) {
    console.log("Failed to do typechecking", ex);
}
