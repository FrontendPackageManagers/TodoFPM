TodoFPM
=======

TodoMVC inspired comparison for Frontend Package Manager

# Motivation
[TodoMVC](http://todomvc.com) is a great site help choosing a MVC framework. If you want to compare package manager for the browser, you'll probably find [frontend-packagers](https://github.com/wilmoore/frontend-packagers) by Wil Moore, which is great.

But the problem is that code and tools are evolving so fast and it's really hard to keep the documenation and comparisons in sync the the current version.

So the idea was born to do the same like TodoMVC does, but just for front-end package managers. To get a up-to-date comparisons for tools like [browserify](http://browserify.org), [component](https://github.com/componentjs/component) and [duo](http://duojs.org), the process will be automated and features for each package manager will be evaluated by browser tests. 

## Primary Goal
This project will check if features are available for the package manager, for instance::
- install transitive dependencies
- resolve semantic versioning
- provide development dependencies
- provide CommonJS module loader

There will be a [spec](https://github.com/Todo-Frontend-Package-Manager/spec) which defines which functions need to be provided for the tests. These tests will be run in an automated proccess and results will be written into a file. So this provide both a history and the latest information to compare each package manager. 



## Secondary Gaol
You don't need to create a Todo application, because it's not the focus. But a non-sense application (just to verify if dependencies are loaded or `require` is available, ...) isn't nice to explore. 

# Setup

## Run server

`make`

## Run examples

> Currently there is only one app

```
cd examples/component
make
```
