module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env', // Usado para importar
        path: '.env',       // Caminho do arquivo .env
      }]
    ],
  };
};
