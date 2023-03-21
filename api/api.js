const endpoint = require("./endpoint") 

class Api {    
   get = async (type, query, page, pageSize) => {        
      const response = fetch(endpoint(type, query, page, pageSize))            
      .then((data) => {                
         return data;            
      })            
      .catch((err) => {                
         return err;            
      });       

   const res = await response;       
    // let count;        
    switch (res.status) {            
      case 200:                
      return await res.json()                // count = `Remaining fetches: ${res.headers["x-ratelimit-remaining"]}`;                // console.log(count);                // const repositories = octokit()                //     .request(endpoint(query, "repos"))                //
      //      .then((data) => {                
         //         return data;                //     })                //     .catch((err) => {                //         return err;                //     });                // return {                // user: res.data, repos: [{}, ...(await repositories).data]                // };            
         case 404:               
         break;
         
    }// count = `Remaining fetches: ${res.response.headers["x-ratelimit-remaining"]}`;                // console.log(count);                return res.response.data;        }    };    post = async (endpoint, body) => {        const response = await fetch(endpoint, {            method: "POST",            headers: {                "Content-Type": "application/json",            },            body: JSON.stringify(body),        });        if (!response.ok) {            throw new Error("Network response was not ok");        }        const data = response.json();        return data;    };}
   }}
    const api = new Api();
    module.exports = api

// const endpoint = require("./endpoint");
// const fetched = require("node-fetch");

// class Api {
//    get = async (type) => {
//       const promise = fetched('https://api.kanye.rest')
//       .then(response => {return response})
//       // .then(data => {return data.quote})
//       .catch(error => {
//         console.log(error);
//         failedRequests++;
//         throw error;
//       });

//       return promise
//    }
// }
// const api = new Api()
// module.exports = api;
