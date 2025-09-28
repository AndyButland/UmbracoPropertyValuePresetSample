import { UmbContextBase } from "@umbraco-cms/backoffice/class-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { PROJECT_PROPERTY_VALUE_PRESET_CONTEXT } from "./property-value-preset-context-token.js";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { PresetValueDto, PresetValues } from "../api/index.js";
import { UMB_MANAGEMENT_API_SERVER_EVENT_CONTEXT, UmbManagementApiServerEventModel } from "@umbraco-cms/backoffice/management-api";

export class ProjectPropertyValuePresetContext extends UmbContextBase {
  #presetDefinitions = new UmbObjectState<PresetValueDto[] | undefined>(undefined);
  presetDefinitions = this.#presetDefinitions.asObservable();

	#serverEventContext?: typeof UMB_MANAGEMENT_API_SERVER_EVENT_CONTEXT.TYPE;

  constructor(host: UmbControllerHost) {
    super(host, PROJECT_PROPERTY_VALUE_PRESET_CONTEXT);

		this.consumeContext(UMB_MANAGEMENT_API_SERVER_EVENT_CONTEXT, (context) => {
			this.#serverEventContext = context;
			this.#observeServerEvents();
		});
  }

  async hostConnected() {
    super.hostConnected();

    await this.#getPresets();
  }

  async #getPresets() {
    const { data } = await tryExecute(this, PresetValues.getPresetValues());
    if (data) {
      this.#presetDefinitions.setValue(data)
    }
  }

	#observeServerEvents() {
    console.log("observeServerEvents");
    const eventSources: Array<string> = ["Umbraco:CMS:Document"];
    const eventTypes: Array<string> = ["PresetValuesUpdated"];
    this.observe(
			this.#serverEventContext?.byEventSourcesAndEventTypes(eventSources, eventTypes),
			(event) => {
				if (!event) return;
				this.#onServerEvent(event);
			},
			'umbObserveServerEvents',
		);
	}

	async #onServerEvent(event: UmbManagementApiServerEventModel) {
		console.log(event);
    await this.#getPresets();
	}
}

export default ProjectPropertyValuePresetContext;