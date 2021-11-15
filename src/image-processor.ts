import path from "path";
import fs from "fs";
import { FileTree, toFlatArray } from "./filetree-scanner";
import { Logger } from "./logger";
import { getAbsolutePath } from "./paths";
import sharp from "sharp";

type Img = {inputAbsolutePath: string, outputAbsolutePath: string, outputRelativePath: string};
type ModulationConfig = {hue: number, saturation: number, brightness: number, lightness: number, contrast: number};
let modulationConfig: ModulationConfig;

export function setModulations(config: ModulationConfig) {
    modulationConfig = config;
}

export async function applyModulations(folderRelativePath: string, filetree: FileTree, allowOverwrite: boolean) {
    const outputRootAbsolutePath = getAbsolutePath(folderRelativePath);
    const flatArray = toFlatArray(filetree.folder).filter(e => e.type === 'file');
    Logger.info(`Input folder contained ${flatArray.length} images`);

    const filteredArray = flatArray
        .map(img => {
            const inputAbsolutePath = path.join(filetree.rootAbsolutePath, img.relativePath);
            const outputAbsolutePath = path.join(outputRootAbsolutePath, img.relativePath);
            return {inputAbsolutePath, outputAbsolutePath, outputRelativePath: img.relativePath};
        })
        .filter( img => {
            if(allowOverwrite) return img;
            else if( fs.existsSync(img.outputAbsolutePath) ) {
                Logger.info(`An image already exists at ${img.outputRelativePath}. Skipping.`);
            }
            else return img;
        });

    Logger.info(`Found ${filteredArray.length} images to apply modulations on.`)
    const promises = new Array<Promise<unknown>>();
    for(const img of filteredArray) {
        try {
            promises.push(internalApplyModulations(img));
        } catch (e) {
            console.error(`[Error processing image ${img.outputRelativePath}]`);
            console.error(e);
        }
    }
    for(const p of promises) await p;
    Logger.info("All images processed.")
}

async function internalApplyModulations(img: Img) {
    const contrast = modulationConfig.contrast;
    return sharp(img.inputAbsolutePath)
        .modulate(modulationConfig)
        .linear(contrast, -(128 * contrast) + 128)
        .toFile(img.outputAbsolutePath)
        .catch(e => {
            console.error("Error writing file " + img.outputAbsolutePath, e);
        })
}