import path from 'path'
import os from 'os'
import execa from 'execa'

async function main() {
  await build();
  process.exit();
}

async function build() {
  await execa.command(
    [
      "nest build",
    ].join(" "),
    {
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
      extendEnv: true,
    }
  );
}

export default main()