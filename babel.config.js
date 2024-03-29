module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@assets': './src/assets',
          '@app-views': './src/app-views',
          '@app-navigation': './src/app-navigation',
          '@app-uikits': './src/app-uikits',
          '@app-components': './src/app-components',
          '@app-languages': './src/app-languages',
        },
      },
    ],
  ],
};