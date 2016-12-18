Semantic UI Meteorize
=====================

This tool generates 2 meteor packages based on Semantic UI.

- [Semantic-UI-Meteor-Data](https://github.com/Semantic-Org/Semantic-UI-Meteor-Data)
- [Semantic-UI-Meteor](https://github.com/Semantic-Org/Semantic-UI-Meteor)

Pre-requisites
---------------

- Docker
- Write access to Semantic-UI-Meteor-Data and Semantic-UI-Meteor
- Publish access to Atmosphere for the packages
  - <https://atmospherejs.com/semantic/ui>
  - <https://atmospherejs.com/semantic/ui-data>

Versioning
----------

The versions of each packages are identical based on the version of Semantic UI.

If `PACKAGE_VERSION` is `2.2.6` then it will download Semantic UI `v2.2.6` and generate the packages with version `2.2.6`.

Sometime you may want to fix a package and the version of Semantic UI has not been changed. Therefore you can use `PACKAGE_VERSION=2.2.6_1` which will still download Semantic UI `2.2.6` but will publish the packages with version `2.2.6_1`.

Usage
------

```bash
# build docker image
$ make docker-build
# configure env.sh
$ cp env.template.sh env.sh
# edit env.sh properly
$ vim env.sh
# shell docker container
$ make docker-shell
# dependencies
$ make deps
# generate
$ make generate

# do some testing!!!

# publish semantic:ui-data
$ make publish-ui-data
# publish semantic:ui
$ make publish-ui
# clean
$ make clean
```

### Fix issues with the packages

```bash
# fix the problem
# commit it
$ git commit -am "fix..."
$ git push origin master

# change env var PACKAGE_VERSION with something like 2.2.6_1

# generate
$ make generate

# do some testing!!!

# publish semantic:ui-data
$ make publish-ui-data
# publish semantic:ui
$ make publish-ui
```

Testing
-------

TBD

Structure
---------

file/folder | description
--- | ---
dist/ | generated meteor packages
gulp-tasks/ | gulp tasks separated in multiple files to ease the development
lib/ | contains files that creates the data for themes, sites and definitions
meteor-test/ | meteor app that uses semantic ui packages from dist/
scripts/ | script to publish the packages
templates/ | files to copy (and generates) to the packages
tmp/ | downloaded data like semantic ui and generated data from gulp
gulpfile.js | tasks for generating the packages
