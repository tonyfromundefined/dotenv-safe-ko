'use strict';

const util = require('util');

function MissingEnvVarsError (allowEmptyValues, dotenvFilename, exampleFilename, missingVars, error) {
    const errorMessage =
      `아래 환경변수들이 ${exampleFilename} 파일에 선언되어 있으나, 현재 환경에서 찾을 수 없습니다:\n` +
      `${missingVars.join(', ')}`;

    const allowEmptyValuesMessage = !allowEmptyValues
        ? (
            "만약 해당 환경변수들이 비어있어도 괜찮다면, `allowEmptyValues` 옵션을 활용할 수 있습니다:\n" +
            "require('dotenv-safe-ko').config({\n" +
            "  allowEmptyValues: true,\n" +
            "});"
        )
        : '';

    const envErrorMessage = error
        ? (
            `또한, ${dotenvFilename} 파일에서 환경변수를 읽는 동안 아래의 에러가 추가적으로 발생했습니다:\n`+
            `${error.message}`
        )
        : '';

    Error.call(this);
    this.name = this.constructor.name;
    this.missing = missingVars;
    this.example = this.sample = exampleFilename;
    this.message = [errorMessage, allowEmptyValuesMessage, envErrorMessage]
        .filter(Boolean)
        .join('\n\n');
    Error.captureStackTrace(this, this.constructor);
}

util.inherits(MissingEnvVarsError, Error);
module.exports = MissingEnvVarsError;
