
what is middleware ?

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

There are three type of middleWare:

   1. built in
   2. custom
   3.third party

   .use()
   
use() is used to define middleware that executes on every request, regardless of the HTTP method (GET, POST, PUT, DELETE, etc.). Path Pattern Matching: app. use() can be used to define middleware that runs only for specific URL paths. If no path is specified, it applies to all routes.


<!-- In an Express.js application, the line of code app.use('/subdir', express.static(path.join(__dirname, 'public'))) serves static files from the 'public' directory under the '/subdir' URL path. Here's a breakdown:

express.static Middleware: This built-in middleware function serves static files such as images, CSS files, and JavaScript files. 
EXPRESSJS.COM

path.join(__dirname, 'public'): This constructs an absolute path to the 'public' directory, ensuring the correct directory is referenced regardless of where the script is executed from. 
EXPRESSJS.COM

app.use('/subdir', ...): This mounts the middleware at the '/subdir' path, meaning all static files will be served with this base URL.

For example, if there's a file named image.jpg in the 'public' directory, it would be accessible via http://localhost:3000/subdir/image.jpg. -->
