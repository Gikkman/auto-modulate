import { ensureProperty, ensurePropertyNumber, readProperties } from "./properties";
import { filetreeScanner, copyFiletreeFolderStructure } from "./filetree-scanner";
import { applyModulations, setModulations } from "./image-processor";
import { configureLogger, Logger } from "./logger";

async function main() {
    const props = readProperties("auto-modulate.properties");
    configureLogger(props.get("app.log-level")?.toString());

    const inputFolder = ensureProperty("input.folder", props);
    const outputFolder = ensureProperty("output.folder", props);
    const allowOverwrite = ensureProperty("output.allow-overwrite", props) === 'true';

    const hue = ensurePropertyNumber("modulate.hue", props);
    const saturation = ensurePropertyNumber("modulate.saturation", props);
    const brightness = ensurePropertyNumber("modulate.brightness", props);
    const lightness = ensurePropertyNumber("modulate.lightness", props);
    
    const fileTree = filetreeScanner(inputFolder, ["png", "jpg", "jpeg"]);
    copyFiletreeFolderStructure(outputFolder, fileTree);

    setModulations({hue, saturation, brightness, lightness});
    await applyModulations(outputFolder, fileTree, allowOverwrite);
}

main()
.then(async () => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    console.log("---- Press any key to exit ----")
    process.stdin.on('data', () => {
        process.exit();
    });
})
.catch(e => {
    Logger.error("Uncaught exception:");
    Logger.error(e);
});