import ip from 'ip';
import Express, { Router } from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import webpackConfig from '../../config/webpack.config';

const app = new Express()
  , router = new Router();

// add mock logic
require('./logic/users')(router);

app.use('/api', router)
  .use(webpackMiddleware(webpack(webpackConfig), {
    stats: {
      colors: true,
      modules: false,
    },
  }));

app.listen(3000, () => {
  console.log(`Listening on http://${ip.address()}:3000/aaa.html`);
});
