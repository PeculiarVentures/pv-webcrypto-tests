var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        name: "typescript",
        entry: {
            app: "./src/main.tsx",
            style: "./src/sass/app.scss"
        },
        output: {
            filename: "[name].js",
            path: `${__dirname}/built`,
            library: "[name]"
        },

        // Enable sourcemaps for debugging webpack"s output.
        // devtool: "source-map",

        resolve: {
            // Add ".ts" and ".tsx" as resolvable extensions.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                // All files with a ".ts" or ".tsx" extension will be handled by "ts-loader".
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },

                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader!postcss-loader!sass-loader",
                    }),
                },

                {
                    test: /\.png$/,
                    loader: "file-loader?name=img/[name].[ext]&outputPath=img/",
                },
                // {
                //     test: /\.css$/,
                //     loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                // },
                // {
                //     test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                //     loader: "file-loader"
                // }


            ],

            // preLoaders: [
            //     // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            //     { test: /\.js$/, loader: "source-map-loader" }
            // ]
        },


        plugins: [
            new ExtractTextPlugin({
                filename: "style.css",
                allChunks: true,
            })
        ],
        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
        },
    },
];