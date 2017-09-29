import { readFile, writeFile } from 'fs';
import * as path from 'path';
import * as glob from 'glob';

function promiseify(fn: any): any {
  return function(): any {
    const args = [].slice.call(arguments, 0);

    return new Promise((resolve, reject) => {
      // tslint:disable-next-line
      fn.apply(this, args.concat([(err: any, value: any) => {
        if (err)
          reject(err);
        else
          resolve(value);
      }]));
    });
  };
}

const readFileAsync = promiseify(readFile);
const writeFileAsync = promiseify(writeFile);

export const copyResources = (projectPath: string) => {
  const files = glob.sync('**/*.ts', {cwd: projectPath});

  return Promise.all(files
    .map((filePath: string) => {
      const fullFilePath = path.join(projectPath, filePath);

      return readFileAsync(fullFilePath, 'utf-8')
        .then((content: string) => writeFileAsync(fullFilePath, content))
        .catch((err: string) => {
          console.error('An error occured: ', err);
        });
    }));
};
