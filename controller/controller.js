const api = require("../api/api");

const index = (req, res) => {
  console.log(api.get());
   res.render('pages/index', {/* Hier voor quotes / vars */});
 };

 const generator = (req, res) => {
   res.render('pages/generator', {/* Hier voor quotes / vars */});
 };


 module.exports = {
   index,
   generator,
 }