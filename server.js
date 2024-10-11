const app = require('./index');  // Import the app instance
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Blog platform listening at http://localhost:${port}`);
});
