create server.js file
npm init in terminal to create package.json
npm install cloudinary cors dotenv express mongoose multer nodemon

cloudinary - for storing images and audios/mp3 files
cors - connect backend and frontend
dotenv - store enviroment variables
express - to create backend APIs
mongoose - to connect with database / manage database
multer - upload image and mp3 files that comes from frontend
nodemon - to create a script that will run our project

in package.json ->
add "type":"module" in package.json under "main"
add "server":"nodemon server.js" under scripts -> this will help when we make any changes in the backend it will restart the server

create src folder

under src folder ->
create config folder = store all configurations
create controllers folder = will store all api logics
create middleware folder = install all middlewares
create models folder = store the models we create using mongoose / help us manage the database
create routes folder = to create multiple routes for backend

create .env file under src = store secret key and api key

start on server.js
