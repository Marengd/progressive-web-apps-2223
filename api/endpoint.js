// Define a function "endpoint" that takes a "type" parameter and an optional "index" parameter.
const endpoint = (type, index) => {
  // Use a switch statement instead of if-else for better readability and easier future expansion.
  switch (type) {
    case 'detail':
      // Return the Kanye Rest API URL for the "detail" type.
      return 'https://api.kanye.rest';

    case 'all':
      // Return the custom URL for the "all" type, with the index parameter if provided.
      const baseUrl = 'https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json';
      // Append index if provided, else fetch all quotes.
      return index ? `${baseUrl}?index=${index}` : baseUrl;

    default:
      // Handle unknown types by returning an empty string or an error message.
      return '';
  }
};

// Export the "endpoint" function as the module's default export.
module.exports = endpoint;
