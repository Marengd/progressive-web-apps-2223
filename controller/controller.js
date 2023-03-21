const api = require("../api/api");

const index = (req, res) => {
  // console.log();

  // Alles wat in const generator staat \/ Hieronder dus
  // Ook hierin, alleen dan voor het renderen van alle quotes. 
  // Vooral naar hieronder kijken.
  
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