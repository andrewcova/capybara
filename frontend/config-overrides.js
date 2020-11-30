const {
  override,
  overrideDevServer,
  addWebpackPlugin
} = require("customize-cra");
const CopyPlugin = require('copy-webpack-plugin');

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
     // points to the popup entry point
     entry: 'src/popup/index.tsx',
     template: 'public/popup.html',
     outPath: '/popup.html'
  }
]);

const devServerConfig = () => config => {
  return {
     ...config,
     // webpackDevService doesn't write the files to desk
     // so we need to tell it to do so so we can load the
     // extension with chrome
     writeToDisk: true
  }
}

const copyPlugin = new CopyPlugin({
  patterns: [
     // copy assets
     { from: 'public', to: '' },
  ]
})

module.exports = {
  webpack: override(
     addWebpackPlugin(
        copyPlugin
     ),
     multipleEntry.addMultiEntry,
  ),
  devServer: overrideDevServer(
     devServerConfig()
  ),

};
