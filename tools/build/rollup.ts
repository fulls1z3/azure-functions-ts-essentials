import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as ts from 'typescript';
import * as camelCase from 'camelcase';
import * as rollup from 'rollup';
import * as commonJs from 'rollup-plugin-commonjs';
import * as sourceMaps from 'rollup-plugin-sourcemaps';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as uglify from 'rollup-plugin-uglify';

import { NODE_MODULES, root } from './helpers';
import { inlineResources } from './inline-resources';

const packageName = 'azure-functions-ts-essentials';
const compilationFolder = root('.temp');
const globals = {};
let external: Array<string> = [];

const recursiveMkDir = (dir: string) => {
  if (!existsSync(dir)) {
    recursiveMkDir(path.dirname(dir));
    mkdirSync(dir);
  }
};

const relativeCopy = (fileGlob: string, from: string, to: string) => {
  return new Promise((res, reject) => {
    glob(fileGlob, {
      cwd: from,
      nodir: true
    }, (err: string, files: Array<any>) => {
      if (err)
        reject(err);

      for (const file of files) {
        if (file.indexOf(NODE_MODULES) >= 0)
          continue;

        const origin = path.join(from, file);
        const destination = path.join(to, file);
        const data = readFileSync(origin, 'utf-8');

        recursiveMkDir(path.dirname(destination));
        writeFileSync(destination, data);
      }

      res();
    });
  });
};

const reportDiagnostics = diagnostics => {
  diagnostics.forEach(diagnostic => {
    let message = 'Error';

    if (diagnostic.file) {
      const where = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      message += ` ${diagnostic.file.fileName} ${where.line}, ${where.character} ${1}`;
    }

    message += `: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`;
    // tslint:disable-next-line
    console.log(message);
  });
};

const parseConfig = project => {
  const configFileText = readFileSync(project).toString();

  const result = ts.parseConfigFileTextToJson(project, configFileText);
  const configObject = result.config;

  if (!configObject) {
    reportDiagnostics([result.error]);
    process.exit(1);
  }

  const configParseResult = ts.parseJsonConfigFileContent(configObject, ts.sys, path.dirname(project));

  if (configParseResult.errors.length > 0) {
    reportDiagnostics(configParseResult.errors);
    process.exit(1);
  }

  return configParseResult;
};

const tsc = (project: string) => {
  return new Promise(resolve => {
    const config = parseConfig(project);

    const program = ts.createProgram(config.fileNames, config.options);
    const emitResult = program.emit();

    reportDiagnostics(ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics));

    resolve(emitResult.emitSkipped ? 1 : 0);
  });
};

const build = () => {
  const paths = {
    src: root('src'),
    temp: path.join(compilationFolder, packageName),
    es2015: path.join(compilationFolder, `${packageName}-es2015`),
    es5: path.join(compilationFolder, `${packageName}-es5`),
    dist: root('dist')
  };

  external = external.concat(Object.keys(globals));

  return Promise.resolve()
    .then(() => relativeCopy('**/*', paths.src, paths.temp)
      .then(() => inlineResources(paths.temp))
      // tslint:disable-next-line
      .then(() => console.log(`>>> ${packageName}: Inlining succeeded`))
    )
    .then(() => tsc(`${paths.temp}/tsconfig.es2015.json`)
      .then(exitCode => new Promise((res, reject) => {
        exitCode === 0
          ? res()
          : reject();
      }))
      // tslint:disable-next-line
      .then(() => console.log(`>>> ${packageName}: ES2015 compilation succeeded`))
    )
    .then(() => tsc(`${paths.temp}/tsconfig.es5.json`)
      .then(exitCode => new Promise((res, reject) => {
        exitCode === 0
          ? res()
          : reject();
      }))
      // tslint:disable-next-line
      .then(() => console.log(`>>> ${packageName}: ES5 compilation succeeded`))
    )
    .then(() => Promise.resolve()
      .then(() => relativeCopy('**/*.d.ts', paths.es2015, paths.dist))
      .then(() => relativeCopy('**/*.metadata.json', paths.es2015, paths.dist))
      // tslint:disable-next-line
      .then(() => console.log(`>>> ${packageName}: Typings and metadata copy succeeded`))
    )
    .then(() => {
      const es5Entry = path.join(paths.es5, 'index.js');
      const es2015Entry = path.join(paths.es2015, 'index.js');
      const rollupBaseConfig = {
        moduleName: camelCase(packageName),
        sourceMap: true,
        globals,
        external,
        plugins: [
          nodeResolve({
            module: true,
            jsnext: true
          }),
          commonJs(),
          sourceMaps()
        ]
      };

      const umdConfig = {
        ...rollupBaseConfig,
        entry: es5Entry,
        dest: path.join(paths.dist, 'bundles', `${packageName}.umd.js`),
        format: 'umd'
      };

      const minUmdConfig = {
        ...rollupBaseConfig,
        entry: es5Entry,
        dest: path.join(paths.dist, 'bundles', `${packageName}.umd.min.js`),
        format: 'umd',
        plugins: rollupBaseConfig.plugins.concat([uglify({})])
      };

      const es5config = {
        ...rollupBaseConfig,
        entry: es5Entry,
        dest: path.join(paths.dist, `${packageName}.es5.js`),
        format: 'es'
      };

      const es2015config = {
        ...rollupBaseConfig,
        entry: es2015Entry,
        dest: path.join(paths.dist, `${packageName}.js`),
        format: 'es'
      };

      const bundles = [
        umdConfig,
        minUmdConfig,
        es5config,
        es2015config
      ]
        .map(options => rollup.rollup(options)
          .then((bundle: any) => bundle.write(options)));

      return Promise.all(bundles)
      // tslint:disable-next-line
        .then(() => console.log(`>>> ${packageName}: All bundles generated successfully`));
    })
    .then(() => Promise.resolve()
      .then(() => relativeCopy('LICENSE', root(), paths.dist))
      .then(() => relativeCopy('package.json', root(), paths.dist))
      .then(() => relativeCopy('README.md', root(), paths.dist))
      // tslint:disable-next-line
      .then(() => console.log(`>>> ${packageName}: Package files copy succeeded`))
      // tslint:disable-next-line
      .then(() => console.log(`\n`))
    )
    .catch(e => {
      console.error(`>>> ${packageName}: Build failed, see below for errors\n`);
      console.error(e);
      process.exit(1);
    });
};

build();
