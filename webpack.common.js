const DominionContentPlugin = require("./plugins/dominion-content-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const path = require("path");
const webpack = require("webpack");

process.traceDeprecation = true;

module.exports = function(isProduction) {
  return {
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".styl", ".pug", ".vue"],
      alias: {
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
        "vue$": "vue/dist/vue.esm-browser.js"
      }
    },
    entry: {
    // index: ["./src/index-page.ts", "./styles/index.styl"],
    // sets: ["./src/sets-page.ts", "./styles/sets.styl"],
      rules: ["./src/rules-page.ts", "./styles/rules.styl"],
    // cards: ["./src/cards-page.ts", "./styles/cards.styl"],
    // boxes: ["./src/boxes-page.ts", "./styles/sets.styl"],
    },
    output: {
      path: path.resolve(__dirname, "docs"),
      filename: "[name]-[contenthash].js"
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values for the lang attribute to the right configs here.
              // other preprocessors should work out of the box, no loader config like this necessary.
              "scss": "vue-style-loader!css-loader!sass-loader",
              "sass": "vue-style-loader!css-loader!sass-loader?indentedSyntax",
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          }
        },
        {
          resourceQuery: /blockType=i18n/,
          type: "javascript/auto",
          loader: "@intlify/vue-i18n-loader"
        },
        { 
          test: /\.pug$/,
          use: ["@webdiscus/pug-loader"],
        },
        {
          test: /\.styl$/,
          use: [
            {loader: MiniCssExtractPlugin.loader},
            "css-loader",
            "stylus-loader"
          ]
        },
        {
          test: /\.css$/,
          use: [
            "vue-style-loader",
            "css-loader"
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new DominionContentPlugin(),
/*
      new HtmlWebpackPlugin({
        template: "./views/index.pug",
        chunks: ["index"],
        filename: "index.html",
        isProduction: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: "./views/sets.pug",
        chunks: ["sets"],
        filename: "sets.html",
        isProduction: isProduction,
      })
*/
      new HtmlWebpackPlugin({
        template: "./views/rules.pug",
        chunks: ["rules"],
        filename: "rules.html",
        isProduction: isProduction,
      }),
/*
      new HtmlWebpackPlugin({
        template: "./views/cards.pug",
        chunks: ["cards"],
        filename: "cards.html",
        isProduction: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: "./views/boxes.pug",
        chunks: ["boxes"],
        filename: "boxes.html",
        isProduction: isProduction,
      }),
*/
      new MiniCssExtractPlugin({
        filename: "[name]-[contenthash].css",
        chunkFilename: "[id]-[contenthash].css",
      }),
      new webpack.DefinePlugin({
        // Définit la variable globale pour les options de Vue
        '__VUE_OPTIONS_API__': true,
        '__VUE_PROD_DEVTOOLS__': false,
    }),
    ]
  }
} 
