import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";
import type { DotenvConfigOptions } from "dotenv";
import dotenv from "dotenv";

import { removeEmptyStringValues } from "./removeEmptyStringValues";
import { difference } from "./difference";

export type ConfigOptions = DotenvConfigOptions & {
  exampleEnvPath?: string;
  allowEmptyStringValues?: boolean;
};

export function config(options?: ConfigOptions) {
  dotenv.config(options);

  const exampleEnvPath = options?.exampleEnvPath ?? ".env.example";
  const allowEmptyStringValues = options?.allowEmptyStringValues ?? false;

  const env = allowEmptyStringValues
    ? process.env
    : removeEmptyStringValues(process.env);

  const exampleVars = dotenv.parse(
    fs.readFileSync(path.resolve(exampleEnvPath))
  );
  const missingVars = difference(Object.keys(exampleVars), Object.keys(env));

  if (missingVars.length > 0) {
    // eslint-disable-next-line
    const message = `[error] 아래 환경변수가 ${chalk.bold.blue(`"${exampleEnvPath}"`)} 파일에 선언되어 있지만, 현재 환경에서 찾을 수 없어요. 필요한 환경변수를 담고있는 ${chalk.bold.blue(`".env"`)} 파일을 프로젝트 루트에 작성해주시거나 현재 환경 안에 환경변수로 아래 변수들을 추가해주세요.`;
    console.error(chalk.red(message));
    console.error(missingVars.map((v) => `  - ${v}`).join("\n") + "\n");

    process.exit(1);
  }
}
