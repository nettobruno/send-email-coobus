const app = require('./app');
require('dotenv/config');

app.listen(process.env.PORT_HOST || 3333, () => {
  console.log('A API de envio de email do cooBus está funcionando corretamente✅');
});
