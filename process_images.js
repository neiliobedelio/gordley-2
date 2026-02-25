const { Jimp } = require('jimp');

async function processImage(inputPath, outputPath) {
    try {
        const image = await Jimp.read(inputPath);

        // Loop through all pixels
        for (let y = 0; y < image.bitmap.height; y++) {
            for (let x = 0; x < image.bitmap.width; x++) {
                // Determine the index for this pixel's RGBA data
                const idx = (image.bitmap.width * y + x) << 2;

                const red = image.bitmap.data[idx + 0];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];
                const alpha = image.bitmap.data[idx + 3];

                // Calculate luminance
                const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

                // Threshold: If darker than a very light gray, turn it purely black
                if (luminance < 200) {
                    image.bitmap.data[idx + 0] = 0;   // R
                    image.bitmap.data[idx + 1] = 0;   // G
                    image.bitmap.data[idx + 2] = 0;   // B
                    image.bitmap.data[idx + 3] = 255; // Alpha
                } else {
                    // Turn to pure transparent instead of white!
                    image.bitmap.data[idx + 0] = 0;
                    image.bitmap.data[idx + 1] = 0;
                    image.bitmap.data[idx + 2] = 0;
                    image.bitmap.data[idx + 3] = 0; // Transparent!
                }
            }
        }

        await image.write(outputPath);
        console.log(`Successfully processed ${inputPath} and saved to ${outputPath}`);
    } catch (e) {
        console.error("Error processing " + inputPath, e);
    }
}

async function run() {
    await processImage('assets/parallax_mg.png', 'assets/parallax_mg_adjusted.png');
    await processImage('assets/parallax_fg.png', 'assets/parallax_fg_adjusted.png');
}

run();
