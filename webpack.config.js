const path = require('path')
const MODE = 'development'

const isSourceMap = MODE === 'development'

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path:path.join(__dirname,'dist'),
        filename: "main.js"
    },

    module: {
        /*☆☆☆
        module.ruleは配列の末尾から実行されていく。
        今回はTypeScript から JavaScript にコンパイルして、JavaScript から ES5 にトランスパイルしたい。
        だから先にts-loaderでjsにして、babel-loaderでes5にする。
        ？？？
        でもわざわざbabelを挟むメリットが分からない。ts-loaderで一気にes5にトランスパイルすればよいのでは。
        */
      rules: [
        {
            test: /\.(ts|tsx)$/,
            //node_modulesはコンパイルさせない。
            exclude: `${__dirname}/node_modules/`,
            use: [
                {
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env', '@babel/react']
                    }
                },
                {
                    loader:'ts-loader',
                    options:{
                        //typescriptの設定ファイルを指定。無くてもいい。
                        configFile:path.join(__dirname,'tsconfig.json')
                    }
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                //linkタグに出力。動的にstyleタグが作られ、head要素内に差し込まれる
                {
                    loader: 'style-loader',
                },
                //cssをバンドル
                {
                    loader: 'css-loader',
                    options:{
                        sourceMap:isSourceMap,
                        //CSSローダーの前に適用されるローダーの数を有効/無効またはセットアップ
                        //0 -> no loaders (default), 1 -> postcss-loader, 2 -> postcss-loaderまたはsass-loader
                        importLoaders: 2
                    }
                },
                //sassをcssに変換
                {
                    loader: 'sass-loader',
                    options:{
                        sourceMap:isSourceMap
                    }
                },
            ]
        },
        //画像もjsとしてバンドルする
        {
            test:/\.(gif|png|jpg|svg)$/,
            //画像をbase64としてjsに取り込む
            type: "asset/inline",
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    // ES5(IE11等)向けの指定（webpack 5以上で必要）
    target: ["web", "es5"],
    //webpack-dev-serverの設定。webpackが開発サーバを立ちあげてくれる。コードを更新すると自動的にビルドしてブラウザのビューが更新。
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
      },
};