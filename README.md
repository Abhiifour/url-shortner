TO START : node index.js
ROUTES :-  "/shorten" - take the url in the body of the request and provides shortid in response .
           "/:shortId" - redirects to original url and updates database.
           "/stats/:shortId" - shows stats in json.
dbConnect.js : to make connection with the Database.
url.js : it is the schema used.
index.js : carries the whole functionality.
