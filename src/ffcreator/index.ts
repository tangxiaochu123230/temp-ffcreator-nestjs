import path from 'path'
import { fork } from 'child-process-promise';

export async function ffcreatorMain({ cacheDir, outputVideoFilePath }: {
  cacheDir: string,
  outputVideoFilePath: string
}) {
  if (!cacheDir || !cacheDir.trim()) {
    throw new Error('cacheDir can not be empty');
  }
  if (!outputVideoFilePath || !outputVideoFilePath.trim()) {
    throw new Error(
      'outputVideoFilePath can not be empty',
    );
  }
  await fork(path.join(__dirname, "ffcreator_child_process"), [], {
    stdio: "inherit",
    env: {
      ...process.env,
      "FFCREATOR_CACHE_DIRECTORY": cacheDir,
      "FFCREATOR_OUTPUT_VIDEO_FILE_PATH": outputVideoFilePath,
    }
  })
}