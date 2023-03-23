// Import required modules
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Set the mode based on the environment variable or default to 'development'
const mode = process.env.NODE_ENV || 'development';

// Export the configuration object
module.exports = {
  mode, // Set the mode ('development' or 'production')
  entry: "./public/js/app.js", // Specify the entry point for the application
  output: {
    path: path.resolve(__dirname, "./public/dist"), // Set the output directory
    filename: "bundle.js", // Set the output filename
    publicPath: "/dist/", // Specify the public URL for the output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Match all CSS files
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Use the MiniCssExtractPlugin and css-loader
      },
      {
        test: /\.(woff|woff2)$/, // Match all font files with .woff or .woff2 extensions
        type: "asset/resource", // Load fonts as resources
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css", // Set the output filename for the extracted CSS
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './public'),
      watch: true,
    },
    host: 'localhost',
    port: 8080,
  },

};

