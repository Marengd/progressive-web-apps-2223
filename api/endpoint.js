const endpoint = (type) => {
   if (type == 'detail') {
      return 'https://api.kanye.rest'
   } else if (type == "all") {
      return 'github.raw.com/iets'
   }
}

module.exports = endpoint