# Blog-API
blog API with authentication and comments 

# Getting Started As a developer
### Postman
You can find postman collection for most of the api routes in the project directory 

### These instructions will get you a copy of the project up and running on your local machine.
Below steps are needed only for the first time when you setup your dev machine

### Installing
Install node.js server from https://nodejs.org/en/download/

### Clone this git repository, if you haven't done already.
git clone https://github.com/NoOourAn/Blog-API.git

### Install local npm dependencies
npm install

### Prepare .env file with the follwing vars
- MONGO_DB = 'mongodb://localhost/blogDB'
- S3_ACCESS_KEY= 'yourAccessKey'
- S3_ACCESS_SECRET= 'YourAccessSecret'
- TOKEN_SECRETKEY= 'YourTokenSecretKey'
- HOST = '' 
- PORT = ''
- BUCKET_URL = 'https://nour-blog.s3.amazonaws.com/'
- SITE_KEY = "Your SiteKey for google Recaptcha"
- SECRET_KEY = "Your SecretKey for google Recaptcha"
- API_KEY = "YourApiKey"
- SMTP_SERVER = "smtp-relay.sendinblue.com" ///or any server you want
- LOGIN = 'YourLogin' ///SMTP login
- PASS = 'YourPass' ///SMTP password

---


# Getting Started As a Consumer
### We assume that you have basic understanding of how to consume APIs 
My Blog APIs are HTTP based RESTful APIs that use  ,API request and response bodies are formatted in JSON   
## Note: How to Use endpoints
API Service Url => http://localhost:3000/api    
{baseUrl}/api/{endpoint}?api_key={Your_Api_Key} => ex. http://localhost:3000/api/posts?api_key=000000000
## API Documentation - Resources
### login
- POST /login

### users
- POST /users
- GET /users
- GET /users/{user_id}

### posts
- POST /posts
- GET /posts
- GET /posts/{post_id}
- PATCH /posts/{post_id}
- DELETE /posts/{post_id}

### comments
- POST /posts/{post_id}/comments
- GET /posts/{post_id}/comments
- GET /posts/{post_id}/comments/{comment_id}
- PATCH /posts/{post_id}/comments/{comment_id}
- DELETE /posts/{post_id}/comments/{comment_id}







