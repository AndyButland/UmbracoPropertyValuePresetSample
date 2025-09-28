using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.Composing;

namespace UmbracoPropertyValuePresetSample.Web;

public class ManagementApiComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
        => builder.Services.ConfigureOptions<ProjectConfigureSwaggerGenOptions>();
}

public class ProjectBackOfficeSecurityRequirementsOperationFilter : BackOfficeSecurityRequirementsOperationFilterBase
{
    protected override string ApiName => "project-api";
}

public class ProjectConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
{
    public void Configure(SwaggerGenOptions options)
    {
        options.SwaggerDoc("project-api", new OpenApiInfo { Title = "Project API", Version = "1.0" });
        options.OperationFilter<ProjectBackOfficeSecurityRequirementsOperationFilter>();
        options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");
    }
}
