getResponseBody = (req) => ({
  data: req.body,
});

const imageResponder = (req, res) => {
  res.set('Content-type', 'image/jpeg');
  res.set('Content-Disposition', 'inline; filename="201-200x200.jpg');
  console.log(req, 'hi');
  return res.send(getResponseBody(req));
};

module.exports = imageResponder;
