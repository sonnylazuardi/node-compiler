node compiler.
==============

node compiler is an online compiler api that compile C++ language. It uses g++ compiler executed by [execsync](https://github.com/mgutz/execSync). The compiler api is built on [express](https://github.com/visionmedia/express) and run on linux (ubuntu, debian, fedora, etc.) or windows server.

![node compiler logo](http://imageshack.com/scaled/large/827/6fnd.png)

## Installation

- install [node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager) and g++ on server

        apt-get install g++
- download the tarball or clone this repo
- open command prompt, change dir to the project directory and type command

        npm install
- if you're using windows server change the server.js into this one

        var child = child_process.fork(__dirname + '/child-win.js');
- run the server.js

        node server.js

## Quick Start

Open your browser and go to this address

	http://localhost:3000/compile

![screenshot](http://imageshack.com/scaled/large/5/q76s.jpg)

You may configure how much queue that can be served by a server by changing the following line

    var maxQueue = 10;

## Features

- [Ace](https://github.com/ajaxorg/ace) code editor
- Syntax highlighter
- Program Input
- Save to localstorage
- Time Execution

## Todo next

- create sandbox to avoid dangerous c++ code
- compile to other languages such as Java, Python, PHP, Ruby.
- auto detect language syntax highlighting
- add code snippet

## Disclaimer

Don't use it in production server, It's still dangerous to let compile dangerous c++ code in your server

## License

(The MIT License)

Copyright (c) 2013-2014 Sonny Lazuardi <sonnylazuardi@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
