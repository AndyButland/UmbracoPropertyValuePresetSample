import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import { UmbPropertyTypePresetModelTypeModel, UmbPropertyValuePresetApiCallArgs, type UmbPropertyValuePreset } from '@umbraco-cms/backoffice/property';
import type { UmbPropertyEditorConfig } from '@umbraco-cms/backoffice/property-editor';
import { PROJECT_PROPERTY_VALUE_PRESET_CONTEXT } from '../contexts/property-value-preset-context-token';
import { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { PresetValueDto } from '../api';

export class ProjectPropertyValuePreset extends UmbControllerBase
	implements UmbPropertyValuePreset<string, UmbPropertyEditorConfig>
{
	#presetDefinitions: PresetValueDto[] = [];

	constructor(host: UmbControllerHost) {
		super(host);

    this.consumeContext(PROJECT_PROPERTY_VALUE_PRESET_CONTEXT, (instance) => {
      if (!instance) return;
      this.observe(instance.presetDefinitions, (presetDefinitions) => {
        if (presetDefinitions) {
					this.#presetDefinitions = presetDefinitions;
        }
      });
    });
  }

	async processValue(value: any, _config: UmbPropertyEditorConfig, _typeArgs: UmbPropertyTypePresetModelTypeModel, callArgs: UmbPropertyValuePresetApiCallArgs) {
		const entityTypeUnique = callArgs.entityTypeUnique;
		if (!entityTypeUnique) return value;

		const propertyAlias = callArgs.alias;

		const matchingPresetDefinition = this.#presetDefinitions
			.find(x => x.docTypeId == entityTypeUnique && x.propertyAlias == propertyAlias);
		if (matchingPresetDefinition?.value) {
			return matchingPresetDefinition.value;
		}

		return value;
	}

	destroy(): void {
		super.destroy();
	}
}

export { ProjectPropertyValuePreset as api };
