# our-wedding-heroes

[![Build Status](https://travis-ci.org/InsidersByte/our-wedding-heroes.svg)](https://travis-ci.org/InsidersByte/our-wedding-heroes)
[![Code Climate](https://codeclimate.com/github/InsidersByte/honeymoon-gift-list/badges/gpa.svg)](https://codeclimate.com/github/InsidersByte/honeymoon-gift-list)
[![bitHound Overall Score](https://www.bithound.io/github/InsidersByte/our-wedding-heroes/badges/score.svg)](https://www.bithound.io/github/InsidersByte/our-wedding-heroes)  
[![Dependency Status](https://david-dm.org/insidersbyte/our-wedding-heroes.svg)](https://david-dm.org/insidersbyte/our-wedding-heroes)
[![devDependency Status](https://david-dm.org/insidersbyte/our-wedding-heroes/dev-status.svg)](https://david-dm.org/insidersbyte/our-wedding-heroes#info=devDependencies)

A wedding website with a honeymoon gift list.

## Requirements

* [NodeJS](https://nodejs.org/en/)
    * Version 6.x
* [MongoDB](https://www.mongodb.org/downloads)

## Setup

1.  **Clone the repo**

    ```bash
    $ git clone https://github.com/InsidersByte/our-wedding-heroes.git
    $ cd our-wedding-heroes
    ```

2. **Install dependencies**

    ```bash
    $ npm install
    ```

3. **Make sure MongoDB is running**

    ```bash
    $ lsof -iTCP:27017 -sTCP:LISTEN
    ```

4. **Start the server**

    ```bash
    $ npm start
    ```

    > run `npm run start:dev` to use nodemon

5.  **Run the setup**

    visit [http://localhost:8080/admin/setup](http://localhost:8080/admin/setup)

    > I am planning to redirect from [http://localhost:8080/admin](http://localhost:8080/admin) to [http://localhost:8080/admin/setup](http://localhost:8080/admin/setup) automatically if the setup has not been run yet, but this feature does not exist at the moment [#111](https://github.com/InsidersByte/our-wedding-heroes/issues/111).


## deploying to digitalocean with dokku


1. sign up for digitalocean. setup ssh keys. spin up [dokku "droplet"](https://www.digitalocean.com/features/one-click-apps/dokku/).
2. note the IP. visit w/ web browser to set up dokku box.
3. set up [domain name with digitalocean](https://cloud.digitalocean.com/networking#actions-domains) for dokku droplet - dokku is designed to serve each app from a [subdomain](http://dokku.viewdocs.io/dokku/dns/#using-a-sub-domain-myappmyserverexampletld): `<app1>|<app2>|<appN>.<dokku-domain>.<domain>.<tld>`.
4. if you want to try deploying the our-wedding-heros app, make sure the `database:`[ environment variable](https://github.com/100ideas/our-wedding-heroes/blob/develop/server/config/config.js#L4) in `server/config/config.js` is set from `process.env.MONGO_URL `
5. `> git remote add dokku dokku@<your-dokku-box>:<app-name>`
6. `> git push dokku <your fav branch>:master` (dokku only deploys from its' master branch). This is all it takes to initiate the build process on the remote box & autoconfiguration of nginx.
7. Set up [mongo dokku plugin](https://github.com/dokku/dokku-mongo): `ssh root@<your-dokku-box>` (uses ssh keys set up previously)
  1. ```> dokku config:set <app-name> NPM_CONFIG_PRODUCTION=false```
  2. ```> dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo```
  3. ```> dokku mongo:create <app-db-name>```
  4. ```> dokku mongo:link <app-db-name> <app-name>```
8. Potentially push to dokku again from your development box, wait for build. Should automatically hook into mongo and init db, then get served by nginx at `<app-name>.<dokku-domain>.<domain>.<TLD>` 👍

- If you like dokku, there is a [bash script](http://dokku.viewdocs.io/dokku/community/clients/#bash-zsh-etc-dokku_clientsh) that helps with administration.
- if `npm build` fails on your droplet, maybe you should add [some swap space](https://codentrick.com/check-swap-file-to-prevent-npm-install-can-be-killed/) or upgrade droplet size (I guess 1 gb is necessary for webpack).
- [Deploying the Right Way: Dokku on Digital Ocean](https://www.andrewmunsell.com/blog/dokku-tutorial-digital-ocean/) goes into more detail about all the steps above.
- maybe set up [`forever` or `upstart` to keep node running](http://stackoverflow.com/a/26798229/957984) in dokku - )not sure if it's necessary)
- lastly, If you decide to try out digitalocean, you can use my [promo code](https://m.do.co/c/ae32ed44c587) to get $10 in hosting credit, enough for a month or two of hosting - I'll get $25 in credit too.


### syncing development db with production

I authored most of the content for the site locally. Since it is mostly stored in mongo and not in git, here is a quick way to **drop the production** db and replace it with a copy of the development db (not typical):

```bash
# map mongodb to external ports
# note first port listed and use below as <port>. these ports map from nginx
# to the typical mongo ports running in the mongo docker container.
$ dokku mongo:expose <dbname>

# get mongodb auth
$ dokku mongo:info <app-name>
> mongodb://<username>:<password>@<internal-docker-hostname>:27017/<dbname>

# drop remote db and replace with dev db
$ mongodump --archive --db <dbname> | mongorestore --host <dokku-hostname> --port <port> --username <username> --password <password> --drop --archive --db <dbname>
```
