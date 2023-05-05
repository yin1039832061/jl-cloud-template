const utils = require('./utils');
const env = process.env.NODE_TYPE || 'dev';
const port = 8001;

function getResource(env) {
  const isDev = env === 'dev';
  const externals = [
    {
      module: 'react',
      global: 'React',
      entry: isDev
        ? 'https://ux-assest.jlpay.com/emp/react/react.development.js'
        : 'https://ux-assest.jlpay.com/emp/react/react.production.min.js',
    },
    {
      module: 'react-dom',
      global: 'ReactDOM',
      entry: isDev
        ? 'https://ux-assest.jlpay.com/emp/react-dom/react-dom.development.js'
        : 'https://ux-assest.jlpay.com/emp/react-dom/react-dom.production.min.js',
    },
    {
      module: 'react-router-dom',
      global: 'ReactRouterDOM',
      entry: isDev
        ? 'https://ux-assest.jlpay.com/emp/react-router-dom/react-router-dom.js'
        : 'https://ux-assest.jlpay.com/emp/react-router-dom/react-router-dom.min.js',
    },
    {
      module: 'axios',
      global: 'axios',
      entry: 'https://ux-assest.jlpay.com/emp/axios/axios.min.js',
    },
    {
      module: 'amis',
      global: 'amis',
      entry: isDev
        ? 'https://ux-assest.jlpay.com/emp/amis-dev/sdk.js'
        : 'https://ux-assest.jlpay.com/emp/amis-prod/sdk.js',
    },
  ];
  const cssConf = isDev
    ? [
        'https://ux-assest.jlpay.com/emp/amis-dev/sdk.css',
        'https://ux-assest.jlpay.com/emp/amis-dev/helper.css',
        'https://ux-assest.jlpay.com/emp/amis-dev/iconfont.css',
      ]
    : [
        'https://ux-assest.jlpay.com/emp/amis-prod/sdk.css',
        'https://ux-assest.jlpay.com/emp/amis-prod/helper.css',
        'https://ux-assest.jlpay.com/emp/amis-prod/iconfont.css',
      ];
  return {
    externals,
    cssConf,
  };
}

const { externals: devExternals, cssConf: devCssConf } = getResource('dev');

const { externals: prodExternals, cssConf: prodCssConf } = getResource('prod');

const prod = {
  // TODO 
  publicPath: 'https://partner-mng.xgd.com/cloudmanage/',
  remotes: {
    '@emp-saas': 'saasManageModule@https://cs-mng.jlpay.com/jlpay.js',
  },
  externals: prodExternals,
  cssConf: prodCssConf,
  outputDir: 'dist/prod/',
};
const fat = {
  // TODO 
  publicPath: 'https://partner-mng-fat.xgd.com/cloudmanage/',
  remotes: {
    '@emp-saas': 'saasManageModule@https://cs-mng-fat.jlpay.com/jlpay.js',
  },
  externals: devExternals,
  cssConf: devCssConf,
  outputDir: 'dist/fat/',
};
const develop = {
  // TODO 
  publicPath: 'https://partner-mng-dev.xgd.com/cloudmanage/',
  remotes: {
    '@emp-saas': 'saasManageModule@https://cs-mng-dev.jlpay.com/jlpay.js',
  },
  externals: devExternals,
  cssConf: devCssConf,
  outputDir: 'dist/dev/',
};
const dev = {
  port,
  publicPath: `http://${utils.getNetworkIp()}:${port}/`,
  remotes: {
    '@emp-saas': 'saasManageModule@http://localhost:8086/jlpay.js',
  },
  externals: devExternals,
  cssConf: devCssConf,
  outputDir: '/',
};

const configs = { prod, fat, develop, dev };
module.exports = {
  ...configs[env],
};
