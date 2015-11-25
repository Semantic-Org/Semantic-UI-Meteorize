Meteorize Semantic UI
=====================

Workflows
---------

### Bump version of Semantic UI

This happens whenever Semantic UI changes version.

    $ ./scripts/generate.sh 2.1.4
    # do some testing, and
    $ ./publish.sh 2.1.4

    # or 1 command without testing
    $ ./scripts/generate-and-publish.sh 2.1.4

### Fix issues with the packages

This happens whenever a fix is needed for the Meteor packages.

1. fix the problems
2. **commit** the changes prior executing scripts
3. choose the package version
  a. version should be something like `2.1.4_1`
4. `$ ./scripts/generate.sh 2.1.4_1`
5. do some testing
6. `$ ./scripts/publish.sh 2.1.4_1`

### Testing

TBD

Structure
---------

file/folder | description
--- | ---
dist/ | generated meteor packages
gulp-tasks/ | gulp tasks separated in multiple files to ease the development
lib/ | contains files that creates the data for themes, sites and definitions
meteor-test/ | meteor app that uses semantic ui packages from dist/
scripts/ | script to generate and publish the packages
templates/ | files to copy (and generates) to the packages
tmp/ | downloaded data like semantic ui and generated data from gulp
gulpfile.js | tasks for generating the packages

