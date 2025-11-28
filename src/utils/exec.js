import { exec } from "child_process";
import { spawn } from "child_process";

export function run(cmd, stdin = null) {
  return new Promise((resolve, reject) => {
    if (stdin === null) {
      exec(cmd, (err, stdout, stderr) => {
        if (err) reject(err);
        else resolve(stdout || stderr);
      });
    } else {
      const child = spawn("sh", ["-c", cmd]);
      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      child.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(stderr));
        } else {
          resolve(stdout || stderr);
        }
      });

      if (stdin) {
        child.stdin.write(stdin);
        child.stdin.end();
      }
    }
  });
}
