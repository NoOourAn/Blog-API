const express = require('express')
const app = express()
const port = 4200


//general path
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});

app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
