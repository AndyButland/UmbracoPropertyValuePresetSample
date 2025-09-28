import type { UmbEntryPointOnInit } from "@umbraco-cms/backoffice/extension-api";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { manifests as contexts } from "./contexts/manifest.js";
import { manifests as propertyValuePresets } from "./property-value-presets/manifest.js";
import { client } from "./api/client.gen.js";

const manifests: Array<UmbExtensionManifest> = [
  ...contexts,
  ...propertyValuePresets,
];

export const onInit: UmbEntryPointOnInit = (host, extensionRegistry) => {
  console.log("Project extensions initializing 🎉");
  extensionRegistry.registerMany(manifests);

  host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
    if (!authContext) return;
    const config = authContext.getOpenApiConfiguration();

    client.setConfig({
      baseUrl: config.base,
      auth: async () => await authContext.getLatestToken(),
      credentials: config.credentials,
    });
  });
};