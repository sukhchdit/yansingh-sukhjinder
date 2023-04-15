// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //This code is not suppose to change/commit, please be aware
  //production: false,
  //apiport: 'https://uat.api.cosmosclinical.com/',
  //clientapiport: 'https://uat.cosmosclinical.com/',
  //  adobeApiKey: 'c588cde80cff412c83e5a3bd1c2c70f7'
   //adobeApiKey: '6bf5e336414a4c5baee39bc2efd396b1',
      production: false,
     apiport: 'https://localhost:44306/',
     clientapiport: 'http://localhost:4200/#/',
  // adobeApiKey: '13d1cddae3a0441d95393e775ff3cb88', //it workrs for UAT environment
  adobeApiKey:'864c55ab812d48d197487a192e777308'
  //adobeApiKey: '55b415282907432c8c02b16fd2cc047a'
  //This code is not suppose to change/commit, please be aware
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, x`zoneDelegate.ingetDataSourcevokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
