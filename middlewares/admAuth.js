const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("NO TOKEN!!!")
    return res.status(401).json({ message: 'No token, authorization denied', uri: "/1(4)/auth" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
