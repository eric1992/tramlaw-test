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
            public string CategoryId { get; set; }
            public uint? Start { get; set; }
        }

        private readonly Settings Settings;
        private readonly IRestClient APIClient;

        public SearchController() 
        {
            Settings = new Settings();
            APIClient = new RestClient(Settings.WalmartBaseURL);
        }

        [HttpGet("/api/Search")]
        public IActionResult Search([FromQuery]SearchParams param)
        {
            var request = new RestRequest("search", Method.GET);
            request.AddParameter("apiKey", Settings.WalmartAPIKey);
            if(!string.IsNullOrWhiteSpace(param.Query))
                request.AddParameter("query", param.Query);
            if(!string.IsNullOrWhiteSpace(param.CategoryId))
                request.AddParameter("categoryId", param.CategoryId);
            if(param.Start.HasValue)
                request.AddParameter("start", param.Start);
            var response = APIClient.Execute(request);
            if(response.StatusCode == (HttpStatusCode)200)
                return Ok(response.Content);
            return BadRequest(response.Content);
        }

    }
}
