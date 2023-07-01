import path from 'path'
import os from 'os'
import execa from 'execa'

async function main() {
  const { FFmepgPath, FFprobePath } = await getFFmpeg();
  await jest(FFmepgPath, FFprobePath);
  process.exit();
}

async function jest(FFmepgPath: string, FFprobePath: string) {
  await execa.command(
    [
      "jest --watch --config ./test/jest-e2e.json",
    ].join(" "),
    {
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
      extendEnv: true,
      env: {
        ...(os.platform() === "win32" ? {
          Path: `${process.env.Path};${path.normalize(path.join(FFmepgPath, ".."))};${path.normalize(path.join(FFprobePath, ".."))}`
        } : {}),
        ...(os.platform() !== "win32" ? {
          PATH: `${process.env.PATH}:${path.normalize(path.join(FFmepgPath, ".."))}:${path.normalize(path.join(FFprobePath, ".."))}`
        } : {}),
      }
    }
  );
}

async function getFFmpeg() {
  const ffmpeg = require('@ffmpeg-installer/ffmpeg');
  const ffprobe = require('@ffprobe-installer/ffprobe');
  const FFmepgPath = ffmpeg.path;
  const FFprobePath = ffprobe.path;
  return { FFmepgPath, FFprobePath };
}

export default main()
