const app = require("./app");

const port = process.env.PORT || 4001;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

module.exports = app;
