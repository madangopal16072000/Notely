# Notely

## Normal Setup

1. **Install MongoDB.**
2. **run `npm install` in the same directory to download all the dependencies**
3. **Create a `.env` file with the following content in the same folder:**
    ```env
    ACCESS_TOKEN_SECRET=put your access token here
    COOKIE_EXPIRE=1
    JWT_EXPIRE=1d
    MONGODB_URI=mongodb://127.0.0.1:27017/notely
    ```
4. **Run the command `node server.js` in your terminal.**
5. **For running tests use `npm run test`.**
6.  [![Demo](https://img.youtube.com/vi/7oGHamQHXyA/0.jpg)](https://www.youtube.com/watch?v=7oGHamQHXyA)



   
## Docker Setup

1. **Create a `.env` file with the following content in the same folder:**
    ```env
    ACCESS_TOKEN_SECRET=put your access token here
    COOKIE_EXPIRE=1
    JWT_EXPIRE=1d
    MONGODB_URI=mongodb://mongodb:27017/notely
    ```
2. **Start Docker ( for installing docker visit https://www.docker.com/products/docker-desktop/)**
3. **Use the command `docker-compose up` in the same folder.**
4. **For running test first move to container shell using `docker exec -it <container-name> sh` you can find the name of backend container name by using `docker ps`.**
5. **For running tests use `npm run test`.**
6. [![Demo](https://img.youtube.com/vi/D292456GQnE/0.jpg)](https://www.youtube.com/watch?v=D292456GQnE)

**After completing either setup, you can access the server at http://127.0.0.1:4000.**


### API Documenation
#### Link : [Click here](https://documenter.getpostman.com/view/31564556/2s9YsFCtLe)



