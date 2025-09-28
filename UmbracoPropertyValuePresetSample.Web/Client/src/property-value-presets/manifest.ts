export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'propertyValuePreset',
    forPropertyEditorSchemaAlias: 'Umbraco.TextBox',
    alias: 'Project.PropertyValuePreset.TextBox',
    name: 'Text Box Preset for Initial Values',
    api: () => import('./project-property-value-preset.js'),
  },
  {
    type: 'propertyValuePreset',
    forPropertyEditorSchemaAlias: 'Umbraco.TextArea',
    alias: 'Project.PropertyValuePreset.TextArea',
    name: 'Text Area Preset for Initial Values',
    api: () => import('./project-property-value-preset.js'),
  },
  {
    type: 'propertyValuePreset',
    forPropertyEditorSchemaAlias: 'Umbraco.DropDown.Flexible',
    alias: 'Project.PropertyValuePreset.DropDown.Flexible',
    name: 'Drop Down Preset for Initial Values',
    api: () => import('./project-property-value-preset.js'),
  },
  {
    type: 'propertyValuePreset',
    forPropertyEditorSchemaAlias: 'Umbraco.Integer',
    alias: 'Project.PropertyValuePreset.DropDown.Integer',
    name: 'Integer Preset for Initial Values',
    api: () => import('./project-property-value-preset.js'),
  },
];
