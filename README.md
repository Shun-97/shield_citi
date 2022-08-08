SMU Team 7Rs

# Getting started
##  Ubuntu Server ( No VNC )
<hr>

Run the VM \
docker build -t ubuntu-server . \
docker run -it -p 5901:5901 ubuntu-server \

## Microservices
<hr>

### Note on Building Microservice

To build microservices, we start from port 4001, which is our auth js so please build in sequence (do not jump ports)
Each microservice contains a mongodb folder, which starts from port 27017, this is tricky, 

To start: \
*Navigate to the microservice folder*
```
npm i
node server.js
```

## MongoDB
<hr>
As each pc only can have one instance of mongodb, we need to publish the database on the container. \
*Note: Please do ensure that you have a dockerfile and a init-mongo.js within each mongodb folder.*

To build the mongodb, please run the following commands inside the mongodb folder within YOUR microservice

To start: \
*Navigate to the microservice/mongodb folder*
```
docker build -t <microserviceName> + "db" .
docker run -itd -p <270**>:27017 <microserviceName> + "db"
```
### Example:
auth is running on port 27017, and createaccount is 27019! so we write it like this

```
docker build -t authdb .  
docker run -itd -p 27017:27017 authdb
```

```
docker build -t coursedb .
docker run -itd -p 27019:27017 coursedb
```

Note: the port number on the left increases, but the port number on the right remains the same as thats the port (27017) that mongodb runs on the container
## List of Microservice and their db (Name : Port)
<hr>

- authentication
  - authdb : 27017:207017
- courseDetails
  - coursedetdb : 27020:207017
- createCourse
  - coursesdb : 27019:207017

## Connecting microservice to mongodb
<hr>

Template:

```
const uri = "mongodb://admin:team7rsdell@127.0.0.1:<port number of the port u declare in the docker run command>/<name of the db you create in init-mongo.js>"
```

example code: authdb
```
const uri = "mongodb://admin:team7rsdell@127.0.0.1:27017/accounts"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('connected'))
.catch(e=>console.log(e));
```
example code: coursesdb
```
const uri = "mongodb://admin:team7rsdell@127.0.0.1:27019/courses"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('connected'))
.catch(e=>console.log(e));
```

