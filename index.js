const express = require('express');
const userRoutes = require('./routes/user-routes');

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
