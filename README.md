# Notely

## Normal Setup

    - first install mongodb
    - create .env file of from ```
        ACCESS_TOKEN_SCRET= put your access token here
        COOKIE_EXPIRE=1
        JWT_EXPIRE=1d
        # for normal setup
        # MONGODB_URI=mongodb://127.0.0.1:27017/notely
        # for docker setup
        MONGODB_URI=mongodb://mongodb:27017/notely
    ```
    - uncomment normal version of ```MONGODB_URI```  and comment docker version
    - on terminal use command ```node server.js```

## Docker Setup

    - create .env file of from ```
        ACCESS_TOKEN_SCRET= put your access token here
        COOKIE_EXPIRE=1
        JWT_EXPIRE=1d
        # for normal setup
        # MONGODB_URI=mongodb://127.0.0.1:27017/notely
        # for docker setup
        MONGODB_URI=mongodb://mongodb:27017/notely
    ```
    - uncomment docker version of ```MONGODB_URI``` and comment normal version
    - start docker
    - use command ```docker-compose up```

** After either step you access server at port 4000 \***

### API Documenation : [](https://documenter.getpostman.com/view/31564556/2s9YsFCtLe)

