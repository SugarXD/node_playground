const https = require('https');

const getSquareImageUrl = 'https://picsum.photos/200';

const options = {
  method: 'GET',
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
    'Referrer-Policy': 'no-referrer',
    'User-Agent': 'test',
  },
};

const randomImageController = {
  getSquareImage(req, res, next) {
    let imageBuffer = '';
    https.get(getSquareImageUrl, options, (res) => {
      // retry
      if (res.statusCode === 302) {
        https.get(res.headers.location, options, (res) => {
          let body = new Buffer(0);

          if (res.statusCode !== 200) {
            return console.error(`HTTP ${res.statusCode}`);
          }

          res.on('data', (chunk) => {
            console.log(chunk);
            body = Buffer.concat([body, chunk]);
          });

          res.on('end', () => {
            imageBuffer = body;
            console.log(imageBuffer, 'img buff');
          });

          res.on('error', (err) => {
            console.error(err);
          });
        });
      } else {
        req.state = res;
      }
    });
    console.log('imageBuffer', imageBuffer);
    // res.write(imageBuffer); // error here
    req.body = imageBuffer;
    return next();
  },
};

module.exports = randomImageController;
