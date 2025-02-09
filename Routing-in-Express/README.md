
what is middleware ?

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

There are three type of middleWare:

   1. built in
   2. custom
   3.third party

   .use()
   
use() is used to define middleware that executes on every request, regardless of the HTTP method (GET, POST, PUT, DELETE, etc.). Path Pattern Matching: app. use() can be used to define middleware that runs only for specific URL paths. If no path is specified, it applies to all routes.
