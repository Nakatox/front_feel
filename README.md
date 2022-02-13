
# Front Feel 


## Setup the api

- First you need to clone the repo :
```console
git clone https://github.com/Nakatox/api_feel
```
- Install all dependances

- Then you need to setup the database
```console
bin/console d:d:c
```
```console
bin/console d:m:m
```
- Once your database is created you need tu run the fixtures
```console
bin/console doctrine:fixtures:load
```
- And run the server
```console
symfony serv
```

## Setup The Front

- First clone the repo 
```console
git clone https://github.com/Nakatox/front_feel
```
- Install all the dependences
```console
yarn
```
- Run the serv 
```console
yarn dev
```

- And finnally go to your localhost on the port 3000 (or the one indicated in the console )

### Test the app

Just log with the User you have created with the fixtures
```
email : root@root.fr
password : root
```
And if you want to create your own, you can in the register tabs

### And thats it ! Your app is ready
