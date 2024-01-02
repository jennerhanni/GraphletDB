const path = require("path");

module.exports = {
    entry: {
        library: "./src/index.js",
        demo: "./demo/graphletjs.demo.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js" // This will create separate bundles for each entry
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
        ],
    },
};
