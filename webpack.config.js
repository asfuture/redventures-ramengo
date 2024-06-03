const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './script.js', // Arquivo de entrada principal
  output: {
    filename: 'bundle.js', // Arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  module: {
    rules: [
      // Regra para arquivos CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      // Regra para arquivos de imagem
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    // Plugin para extrair CSS em um arquivo separado
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
    // Plugin para minificar HTML
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    // Plugin para otimizar CSS
    new OptimizeCssAssetsPlugin(),
    // Plugin para minificar JavaScript
    new TerserPlugin(),
  ],
};
