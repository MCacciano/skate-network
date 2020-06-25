exports.example = (req, res, next) => {
  console.log('example controller for the example route GET');
  res.status(200).json({ success: true, route: '/' });
};
