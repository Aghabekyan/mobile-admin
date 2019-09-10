// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  name: 'stage',
  webUrl: 'https://giz.app.volo.am',
  hostingUrl: 'https://giz.app.volo.am',
  userHostingUrl: 'https://giz.api.app.volo.am',
  defaultHostingUrl: 'https://giz.api.app.volo.am',
  identityServerUrl: 'https://giz.auth.app.volo.am',
  whitelistedDomains: ['giz.api.app.volo.am', 'giz.app.volo.am', 'giz.auth.app.volo.am'],
  production: false
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
