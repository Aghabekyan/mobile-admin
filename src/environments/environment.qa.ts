// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'qa',
  webUrl: 'http://10.100.0.41',
  hostingUrl: 'http://10.100.0.41',
  userHostingUrl: 'http://10.100.0.40:8001',
  defaultHostingUrl: 'http://10.100.0.40:8001',
  identityServerUrl: 'http://10.100.0.43:8000',
  whitelistedDomains: ['10.100.0.40:8001', '10.100.0.41', '10.100.0.43:8000'],
  production: false
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
