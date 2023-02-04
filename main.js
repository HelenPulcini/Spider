const {crawlPage} = require("./crawl.js")

async function main() {
   if (process.argv.length < 3) { //< 3 because 1 is interpreter 2 is program 3 is argument  e.g ~/java/Spider$ website.com
    console.log("no website provided");
    process.exit(1)
   }
   if (process.argv.length > 3) { 
    console.log("too many arguments");
    process.exit(1)
   }
   const baseURL = process.argv[2]

   console.log(`starting crawl of ${baseURL}`);
   const pages = await crawlPage(baseURL, baseURL, {}) //the first url, the next url, an empty array of pages

   for (const page of Object.entries(pages)) { //unless you make pages an object you cannot iterate through it
    console.log(page);
    
   }
}

main()