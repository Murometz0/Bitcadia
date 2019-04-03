import "fontawesome";
import { AppRouter } from 'aurelia-router';
import { Aurelia } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { I18N } from "aurelia-i18n";
import { Promise, config } from "bluebird";
import $ = require("jquery");
import * as _ from "lodash";
import * as process from "process";
import Backend = require('i18next-xhr-backend');
import { executeInDebug, executeInTest } from "./executeInEnvironment";

window["global"] = window;
window["process"] = process;
executeInTest(() => {
  (global as any).scriptFlag += 0;
  $(document.head).on('DOMNodeInserted', function (e) {
    if (e.target.textContent && e.target.tagName === "STYLE" && (global as any).scriptFlag) {
      (global as any).scriptFlag--;
      e.target.remove();
    }
  });
});

window["define"]("text", () => {
  return {
    load: (moduleId: string,
      require: (id: string | string[]) => Promise<any>,
      onload: (content: string) => void) => {
      return require([moduleId]).then(onload);
    }
  };
});

global.Promise = Promise;
config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia, start: boolean = true) {
  const fxConfig = aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('resources')
    .plugin('aurelia-dialog')
    .plugin('aurelia-validation')
    .plugin('aurelia-i18n', (instance: I18N) => {
      instance.i18next.use(Backend);
      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: 'locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
          ajax: function (url, options, callback, data) {
            (window as any).require([url], (jsonData) => callback(jsonData || data, { status: 200 }));
          },
          parse: (data) => data
        },
        lng: 'en',
        attributes: ['t', 'i18n'],
        ns: ["shell", "user", "claim", "challenge", "judge", "federation"],
        fallbackLng: 'en',
        debug: false,

      }).then(() => {
        const router: AppRouter = aurelia.container.get(AppRouter);
        router.transformTitle = (title) => instance.tr(title);

        const eventAggregator = aurelia.container.get(EventAggregator);
        eventAggregator.subscribe('i18n:locale:changed', () => {
          router.updateTitle();
        });
      });
    });

  executeInDebug(() =>
    aurelia.use.developmentLogging()
  );


  executeInTest(() =>
    aurelia.use.plugin('aurelia-testing')
  );


  start && aurelia.start().then(() => aurelia.setRoot());
  return fxConfig;
}
