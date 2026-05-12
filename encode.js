const { exec } = require("child_process");
const path = require("path");

// ===============================
// INPUT / OUTPUT
// ===============================

const inputVideo = "/home/senku/Desktop/ScreenRecording/2026-05-12 10-10-35.mp4";
const outputVideo = "/home/senku/Desktop/ScreenRecording/2026-05-12 10-10-36.mp4";

// ===============================
// FFMPEG COMMAND
// ===============================

const ffmpegCommand = `
ffmpeg -i "${inputVideo}" \
-vf "yadif,format=yuv420p" \
-c:v libx264 \
-preset slow \
-crf 18 \
-profile:v high \
-level 4.1 \
-pix_fmt yuv420p \
-colorspace bt709 \
-color_primaries bt709 \
-color_trc bt709 \
-c:a aac \
-ar 48000 \
-b:a 192k \
-movflags +faststart \
"${outputVideo}"
`;

// ===============================
// EXECUTE COMMAND
// ===============================

console.log("Starting video encoding...\n");

exec(ffmpegCommand, (error, stdout, stderr) => {
  if (error) {
    console.error("Encoding failed:");
    console.error(error.message);
    return;
  }

  if (stderr) {
    console.log(stderr);
  }

  console.log("\nEncoding completed successfully!");
  console.log(`Output file: ${path.resolve(outputVideo)}`);
});