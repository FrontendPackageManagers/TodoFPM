# TodoMVC build with component and components

Several components are used in this application:

- visionmedia/page.js for routing
- component/model and component/collection for model management
- component/reactive for view model binding
- yields/store for local storage abstraction

## TODO

- avoid links start with `examples/component/`
- fix sorting when loading from store
- add styles to be compatible to TodoMVC
- add features to be compatible to TodoMVC
  - clear all competed
  - counter
  - for all features, [see here](https://github.com/tastejs/todomvc/blob/master/app-spec.md)
- tests:
  - download dependencies
  - download transitive deps
  - handle semantic versioning
  - handle remotes (npm, github, bitbucket)
  - handle private repos
  - handle different formats/types (zip/tarball, http)
  - module loader