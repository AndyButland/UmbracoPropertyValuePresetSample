namespace UmbracoPropertyValuePresetSample.Web.Models;

public class PresetValueDto
{
    public required Guid DocTypeId { get; set; }

    public required string PropertyAlias { get; set; }

    public object? Value { get; set; }
}
