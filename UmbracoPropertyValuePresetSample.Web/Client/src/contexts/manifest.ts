import type { ManifestGlobalContext } from "@umbraco-cms/backoffice/extension-registry";

const contextManifest: ManifestGlobalContext = {
  type: "globalContext",
  alias: "Project.PropertyValuePresetContext",
  name: "Project Property Value Preset Context",
  api: () => import("./property-value-preset-context.js"),
};

export const manifests = [contextManifest];