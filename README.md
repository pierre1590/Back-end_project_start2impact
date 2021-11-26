# Back-End Project

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
    </li>
    <li><a href=#apis>APIs</a></li>
    <li><a href=#installation>Installation</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#framework">Framework</a></li> 
    <li><a href="#check-apis">Check APIs</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About the project
The project consists in the creation of 7 APIs or endpoints, three for authentication and logout; and the other 4 allow a user to create, edit, delete or view all posts.

# APIs
## APIs for registration, login and logout
- Registration :
```
(Method:POST)   http://127.0.0.1:8080/auth/register
```
- Login  :
```
(Method:POST)   http://127.0.0.1:8080/auth/login
```
- Logout :
```
(Method:DELETE) http://127.0.0.1:8080/auth/logout
```

## APIs for posts
- Create a post :
```
(Method:POST)  http://127.0.0.1:8080/feed/posts
```
- Edit a post :
```
(Method:PUT)   http://127.0.0.1:8080/feed/posts/:id
```
- List all posts :
```
(Method:GET)   http://127.0.0.1:8080/feed/posts
```
- Delete a post :
```
(Method:DELETE) http://127.0.0.1:8080/feed/posts/:id
```
## Installation
1) Clone the repo :
 ``` 
 git clone https://github.com/pierre1590/Back-end_project_start2impact
```
2) Setup a MySQL Database;
3) Import the migration file <code>migration_script.sql</code>
4) Create a nodemon.json file and fill it with your DB data:
```
{
    "env" : {
        "NODE_PORT" : "",
        "NODE_DATABASE" : "",
        "NODE_DATABASE_USER" : "",
        "NODE_DATABASE_PW" : "",
        "NODE_DATABASE_URL" : "" 
    }
}

5) In the root folder, cerate a directory named <code>Public</code> and and in this last folder create another folder called <code>img</code>  to allocate the images..
```
6) Install project dependencies :
```
     npm install 
```
7) Start the server :
```
     npm start
```

## Built with 
- Node.js
- MySQL
- Sequelize
- JSON Web Tokens
- Bcryptjs


## Framework
- Express.js

## Check APIs
To verify that the end-points worked I used Talend API Tester - Free edition, but you can also use other apps like Postman.
1) Create a project.
2) Add a request.
3) Select the method(GET,POST,...) and type the link in the address bar:
```
http://localhost:port/
```
4) Click on the "save" button and then on the "send" button.

## Contact

Piero Sabino - [@SabinoPiero](https://twitter.com/SabinoPiero) - [P137ru590](https://www.instagram.com/p137ru590/?hl=it) - [Piero Sabino](https://www.linkedin.com/in/piero-sabino-15a1b671/) - piero.sa@icloud.com

Project Link: [https://github.com/pierre1590/Back-end_project_start2impact](https://github.com/pierre1590/Back-end_project_start2impact)


