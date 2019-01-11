using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using tramlaw_test;

namespace tramlaw_test.Controllers
{
    public class SearchController : Controller
    {
        public class SearchParams 
        {
            public string Query { get; set;}
        }

        [HttpGet("/api/Search")]
        public IActionResult Search([FromQuery]SearchParams param)
        {
            var settings = new Settings();
            var client = new RestClient(settings.WalmartBaseURL);
            var request = new RestRequest("search", Method.GET);
            request.AddParameter("apiKey", settings.WalmartAPIKey);
            if(!string.IsNullOrWhiteSpace(param.Query))
                request.AddParameter("query", param.Query);
            var response = client.Execute(request);
            if(response.StatusCode == HttpStatusCode.Accepted)
                return Ok(response.Content);
            return BadRequest(response.Content);
        }

    }
}
