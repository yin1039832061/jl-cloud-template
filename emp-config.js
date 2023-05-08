const path = require('path');
const envConfig = require('./config/index');
const package = require('./package.json');
module.exports = {
  // webpack 配置 默认 webpack 覆盖 webpack chain
  webpack() {
    return {
      output: {
        publicPath: envConfig.publicPath,
        path: path.resolve(__dirname, envConfig.outputDir),
      },
      devServer: {
        port: envConfig.port,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/'),
        },
      },
    };
  },
  /**
   * 共享基站 不引用可以不需要 externals
   * 同时引用 其他基站需要 external
   */
  externals() {
    return envConfig.externals;
  },
  // webpack chain 配置
  webpackChain(config) {
    config.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        ...{
          // head 的 title
          title: package?.title || '',
          files: {
            ...args[0].files,
            css: [...args[0].files.css, ...envConfig.cssConf],
          },
        },
      };
      return args;
    });
    const lessConfig = {
      module: {
        rule: {
          less: {
            test: /\.less$/,
            exclude: /\.module\.less$/,
            use: {
              less: {
                loader: require.resolve('less-loader'),
                options: {
                  lessOptions: {
                    modifyVars: {
                      '@ant-prefix': 'ant',
                      '@primary-color': '#386CE3',
                    },
                    javascriptEnabled: true,
                  },
                },
              },
            },
          },
        },
      },
    };
    config.merge(lessConfig);
  },
  // module federation 独立配置
  async moduleFederation() {

    return {
      /**
       * 项目名
       */
      name: package?.packageName || 'Demo',

      /**
       * 当前暴露模块索引文件
       */
      filename: 'jlpay.js',

      /**
       * 引入远程模块入口
       * "本项目引用模块命名空间":"远程模块项目名@项目地址"
       */
      remotes: envConfig.remotes,

      /**
       * 暴露可以调用模块
       * "被远程引用时的路径":"本项目相对路径"
       */
      exposes: {
        /* components */

        /* components */
        /* utils */

        /* utils */
        /* routes */
        './routes': 'src/routes.ts',
        /* routes */
      },
    };
  },
};
