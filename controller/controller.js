const api = require("../api/api");

const index = (req, res) => {
  // console.log();
  
   res.render('pages/index', {/* Hier voor quotes / vars */});
 };

 const generator = (req, res) => {
  api.get("detail")
  .then(quote => {res.render('pages/generator', {quote})})
  .catch(err => {throw new Error})
  //  res.render('pages/generator', {/* Hier voor quotes / vars */});
 };


 module.exports = {
   index,
   generator,
 }