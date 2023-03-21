// Define a function "endpoint" that takes a "type" parameter.
const endpoint = (type) => {
   // Use a switch statement instead of if-else for better readability and easier future expansion.
   switch (type) {
     case 'detail':
       // Return the Kanye Rest API URL for the "detail" type.
       return 'https://api.kanye.rest';
 
     case 'all':
       // Return the custom URL for the "all" type.
       return 'https://github.raw.com/iets';
 
     default:
       // Handle unknown types by returning an empty string or an error message.
       return '';
   }
 };
 
 // Export the "endpoint" function as the module's default export.
 module.exports = endpoint;
 