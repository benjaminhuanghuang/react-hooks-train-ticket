



## Trouble shooting
-https://github.com/timarney/react-app-rewired/issues/421
Thank you very much for the hints! I was finally able to find the issue. The problem was in the ManifestPlugin configuration from CRA. It assumes that the entry point will be called main, the default from Webpack
```
  const entrypointFiles = {};
  Object.keys(entrypoints).forEach(entrypoint => {
    entrypointFiles[entrypoint] = entrypoints[entrypoint].filter(fileName => !fileName.endsWith('.map'));
  });
```