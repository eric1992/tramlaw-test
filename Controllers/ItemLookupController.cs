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
    public class ItemLookupController : Controller
    {
        public class ItemLookupParams
        {
            public string UPC { get; }
        }

        [HttpGet("/api/Items/{itemId}")]
        public IActionResult ItemLookup(string itemId)
        {
            var settings = new Settings();
            var client = new RestClient(settings.WalmartBaseURL);
            var request = new RestRequest($"items/{itemId}", Method.GET);
            request.AddParameter("apiKey", settings.WalmartAPIKey);
            var response = client.Execute(request);
            if(response.StatusCode == (HttpStatusCode)200)
                return Ok(response.Content);
            return BadRequest(response.Content);
        }
    }   
}