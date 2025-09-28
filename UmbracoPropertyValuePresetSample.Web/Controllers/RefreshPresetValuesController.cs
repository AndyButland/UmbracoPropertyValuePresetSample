using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Common.Filters;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.ServerEvents;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Core.Models.ServerEvents;

namespace UmbracoPropertyValuePresetSample.Web.Controllers;

[ApiController]
[ApiVersion("1.0")]
[MapToApi("project-api")]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[JsonOptionsName(Constants.JsonOptionsNames.BackOffice)]
[Route("api/v{version:apiVersion}/project")]
[ApiExplorerSettings(GroupName = "Preset Values")]
public class RefreshPresetValuesController : Controller
{
    private readonly IServerEventRouter _serverEventRouter;

    public RefreshPresetValuesController(IServerEventRouter serverEventRouter) => _serverEventRouter = serverEventRouter;

    [HttpPost("preset-values")]
    [MapToApiVersion("1.0")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> RefreshPresetValues()
    {
        await _serverEventRouter.RouteEventAsync(new ServerEvent
        {
            EventSource = Constants.ServerEvents.EventSource.Document,
            EventType = "PresetValuesUpdated"
        });
        return Ok();
    }
}