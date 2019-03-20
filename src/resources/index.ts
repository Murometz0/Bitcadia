import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './attributes/attribute',
    './attributes/valid',
    './elements/contract']);
}
