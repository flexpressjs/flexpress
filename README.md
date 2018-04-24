# Flexpress

Flexpress is a Node.js framework that is probably different from every other framework you saw in the past.

The main reason for that is that it actually consists in a single package.json file: https://github.com/flexpressjs/skeleton.

We like to call Flexpress an incremental framework: it starts from zero and grows with your needs.

Trying it is the simplest way to understand it:

```
$ mkdir myproject && cd myproject
$ curl -O https://raw.githubusercontent.com/flexpressjs/skeleton/master/package.json
$ yarn # Yarn is required as npm is not working with Flexpress

yarn install v1.5.1
info No lockfile found.
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
$ ./node_modules/.bin/flexpress

Reading your projects dependencies
Resolving recipes
Flexpress operations: 2 recipes
  - Configuring express (>= 4.0.0) from recipe def2a4c2aa218dae7cb10cbae48b32b2
  - Configuring flexpress (>= 0.0.1) from recipe dfedb616a1e6aa1523595cb64ce93639

Some files may have been created or updated to configure your new packages.
Please review, edit and commit them: these files are yours.


 You just installed express with Flexpress!
 What's next?

  * Run your application:
    1. Execute the following command: node index.js

    2. Browse to the http://localhost:3000/ URL. Your application is working!
       Quit the server with CTRL-C.

  * Read the documentation on https://github.com/flexpressjs/flexpress
    Remember that all the files created using Flexpress are *yours*: modify them as you whish!

  * If you want to use the templating engine Pug, install it using the following command:

      yarn add pug

  * If you want to use the PostgreSQL database, install the library using the following command:

      yarn add pg

  * If you want to use the socket.io, install it using the following command:

      yarn add socket.io

  * Have a look at all the other recommended libraries you can use on https://flexpress.titouangalopin.com

Done in 5.99s.
```

Flexpress works by wiring and configuring packages right after you install them. A default basic structure is provided
but each time you add a new package that is known to Flexpress, it will set it up for you and give you advices on how
to use this package.

Try to add socket.io for instance:

```
$ yarn add socket.io

yarn add v1.5.1
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 20 new dependencies.
info Direct dependencies
└─ socket.io@2.1.0
info All dependencies
├─ after@0.8.2
├─ arraybuffer.slice@0.0.7
├─ async-limiter@1.0.0
├─ backo2@1.0.2
├─ base64id@1.0.0
├─ blob@0.0.4
├─ callsite@1.0.0
├─ component-bind@1.0.0
├─ component-inherit@0.0.3
├─ engine.io-client@3.2.1
├─ engine.io-parser@2.1.2
├─ engine.io@3.2.0
├─ object-component@0.0.3
├─ socket.io-adapter@1.1.1
├─ socket.io-client@2.1.0
├─ socket.io@2.1.0
├─ to-array@0.1.4
├─ ultron@1.1.1
├─ xmlhttprequest-ssl@1.5.5
└─ yeast@0.1.2
$ ./node_modules/.bin/flexpress


Reading your projects dependencies
Resolving recipes
Downloading 1 recipe
Flexpress operations: 1 recipe
  - Configuring socket.io (>= 2.0.0) from recipe ee0f8a819c5c772be762a645540a567e

Some files may have been created or updated to configure your new packages.
Please review, edit and commit them: these files are yours.


 You just installed socket.io!
 What's next?

  * In your index.js file or in your routes, you can use the socket.io server:

        app.get('io').on('connection', (socket) => {
            socket.on('foobar', (msg) => {
                // Implement your logic here
            });
        });

  * In your view, you can use the socket.io client:

        <script src="/socket.io/socket.io.js"></script>
        <script>
            var socket = io();
            socket.emit('foobar', 'Hello world!');
        </script>

  * Learn more about socket.io on https://socket.io/docs/.

Done in 4.42s.
```

Flexpress created `config/socket.io.js` and `packages/socket.io.js` and gave you some indications on how to use your 
newly installed package.

Flexpress will react to every package listed on https://flexpress.titouangalopin.com/. 
