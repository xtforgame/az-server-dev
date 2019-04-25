var path = require('path');
var GulpConfig = require('az-gulp-env-lite').GulpConfig;

var projRoot  = path.resolve(__dirname, '..');
var config = {
  projRoot: projRoot,
  base: projRoot,
  submodules: {
    commonLibrary: {
      prefix: 'common',
      entry: {
        dir: 'src/common',
        js: {
          glob: '**/*.{js,ts}',
        },
        ts: {
          tsconfig: 'tsconfig.json',
          glob: '**/*.ts',
        },
      },
      output: {
        default: {
          js: {},
        },
      },
    },
    server: {
      prefix: 'server',
      useCommonLibrary: {
        relativePath: 'common'
      },
      reloadDelay: 1500,
      entry: {
        dir: 'src/server',
        js: {
          glob: '**/*.{js,ts}',
        },
        ts: {
          tsconfig: 'tsconfig.json',
          glob: '**/*.ts',
        },
      },
      output: {
        default: {
          dir: 'dist/server',
          js: {
            filename: 'index.js',
          },
        },
        //dev: {},
        //dist: {},
      },
      options: {
        default: {
          babel: {},
          nodemon: {
            ext: 'js,html,ts',
          },
        },
        //dev: {},
        //dist: {},
      },
    },
  },
};

module.exports = new GulpConfig(config);
