import type { ProjectPropertyValuePresetContext } from "./property-value-preset-context.js";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";

export const PROJECT_PROPERTY_VALUE_PRESET_CONTEXT = new UmbContextToken<ProjectPropertyValuePresetContext>("project-property-value-preset-context");