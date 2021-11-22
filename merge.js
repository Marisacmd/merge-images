const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
var fs = require('fs');
var path = require('path');
	//APP_ROOT path will be changed in real project, the following just to introduce path resolution
const APP_ROOT = __dirname;
const outDir = path.join(APP_ROOT, "./out");
const sampleDataDir = path.join(APP_ROOT, "./sample-data");
const sampleDataRaw = ['one.png', 'two.png', 'three.png'];

async function getMergedImage(arrImagesRaw) {
	//get images paths
    arrImages = [];
    arrImagesRaw.forEach(function(part) {
        arrImages.push(path.join(sampleDataDir, part));
    })
	//get merged image via 'merge-images'/'canvas'
    const b64Data = await mergeImages(arrImages, {
        Canvas: Canvas,
        Image: Image
    });
	//remove data 'headers'
    const rawb64Data = b64Data.replace(/^data:image\/png;base64,/, "");
	//write result to out dir
    const mergedImage = await fs.writeFile(path.resolve(__dirname, path.join(outDir, '/merged.png')), rawb64Data, 'base64', (err) => {
        console.log(err)
    });
}

getMergedImage(sampleDataRaw);
