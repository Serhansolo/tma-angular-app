# TMA Angular App

This app was written as a Development Case to judge ones knowledge of Frontend Development. Challenge your mind to learn more and more as your career progresses. The ultimate goals of oneself should be reaching professional heights and discovering your boundaries over and over again.

## Now lets get to the good stuff...
### Running the dev server

This is pretty straight forward since the defaults of `ng new` have not been altered. Just run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building the whole thing

As mentioned before, these also run by using the defaults of Angular. Simply run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

**Github Pages**

Since this app is deployable out of the box the Github Pages were used for convenience. To be able to add your fork of the project on Github Pages just npm install the angular-cli-ghpages package. Instructions on how to do so can be found [here](https://github.com/angular-schule/angular-cli-ghpages).

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). The CLI should automatically launch the browser with the results if it doesn't head over to `http://localhost:9876/` to see the results.

### Running end-to-end tests

No e2e tests were written (yet).
