using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;
using UmbracoPropertyValuePresetSample.Web.Models;

namespace UmbracoPropertyValuePresetSample.Web.Controllers;

[ApiController]
[ApiVersion("1.0")]
[MapToApi("project-api")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[JsonOptionsName(Constants.JsonOptionsNames.BackOffice)]
[Route("api/v{version:apiVersion}/project")]
[ApiExplorerSettings(GroupName = "Preset Values")]
public class GetPresetValuesController : Controller
{
    private readonly IContentTypeService _contentTypeService;

    public GetPresetValuesController(IContentTypeService contentTypeService) => _contentTypeService = contentTypeService;

    [HttpGet("preset-values")]
    [MapToApiVersion("1.0")]
    [ProducesResponseType(typeof(IEnumerable<PresetValueDto>), StatusCodes.Status200OK)]
    public IActionResult GetPresetValues()
    {
        const string TestPageDocTypeAlias = "testPage";

        Guid testPageDocumentTypeKey = _contentTypeService.Get(TestPageDocTypeAlias)!.Key;

        var dtos = new List<PresetValueDto>
        {
            new() {
                DocTypeId = testPageDocumentTypeKey,
                PropertyAlias = "text1",
                Value = "Green"
            },
            new() {
                DocTypeId = testPageDocumentTypeKey,
                PropertyAlias = "text2",
                Value = "Red"
            },
            new() {
                DocTypeId = testPageDocumentTypeKey,
                PropertyAlias = "list1",
                Value = "Blue"
            },
            new() {
                DocTypeId = testPageDocumentTypeKey,
                PropertyAlias = "number1",
                Value = 42
            }
        };
        return Ok(dtos);
    }
}