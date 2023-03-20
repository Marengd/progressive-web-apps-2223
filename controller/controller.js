const index = (req, res) => {
   res.render('pages/index', {/* Hier voor quotes / vars */});
 };

 const generator = (req, res) => {
   res.render('pages/generator', {/* Hier voor quotes / vars */});
 };

 module.exports = {
   index,
   generator,
 }