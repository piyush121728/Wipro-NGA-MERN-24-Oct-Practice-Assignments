module.exports = function logger(req,res,next){
  console.log(`[CustomLog] ${req.method} ${req.url}`);
  next();
};
