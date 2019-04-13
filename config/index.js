import path from 'path'

const config = {
  projectName: 'taro',
  date: '2019-3-27',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  alias: {
    'components': path.resolve(__dirname, '..', 'src/components'),
    'pages': path.resolve(__dirname, '..', 'src/pages'),
    'store': path.resolve(__dirname, '..', 'src/store'),
    'constants': path.resolve(__dirname, '..', 'src/constants'),
    'api': path.resolve(__dirname, '..', 'src/api'),
    'assets': path.resolve(__dirname, '..', 'src/assets'),
    'utils': path.resolve(__dirname, '..', 'src/utils'),
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8'
            ]
          }
        },
        pxtransform: {
          enable: true,
          config: {

          }
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        // css modules 功能开关与相关配置
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module，下文详细说明
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // css modules 功能开关与相关配置
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module，下文详细说明
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
