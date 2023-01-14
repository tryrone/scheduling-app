// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require("expo/metro-config");

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push("cjs");

// module.exports = defaultConfig;
const { getDefaultConfig } = require("expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  },
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    ],
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  },
};
