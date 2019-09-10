// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  webUrl: 'http://localhost:4200',
  hostingUrl: 'http://localhost:56926',
  userHostingUrl: 'http://10.100.0.38:8001',
  defaultHostingUrl: 'http://10.100.0.38:8001',
  identityServerUrl: 'http://10.100.0.39:8000',
  whitelistedDomains: ['10.100.0.38:8001', 'localhost:56926', '10.100.0.39:8000'],
  production: false
};
/* export const environment = {
   webUrl: 'http://localhost:4200',
   hostingUrl: 'http://localhost:4200',
   userHostingUrl: 'http://localhost:8001',
   defaultHostingUrl: 'http://localhost:8001',
   identityServerUrl: 'http://localhost:8000',
   whitelistedDomains: ['localhost:8001', 'localhost:4200', 'localhost:8000'],
   production: false
 };*/

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
