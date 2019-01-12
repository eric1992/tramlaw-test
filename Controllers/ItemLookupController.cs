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
        private readonly Settings Settings;
        private readonly IRestClient APIClient;
        public ItemLookupController()
        {
            Settings = new Settings();
            APIClient = new RestClient(Settings.WalmartBaseURL);
        }

        [HttpGet("/api/Items/{itemId}")]
        public IActionResult ItemLookup(string itemId)
        {
            var request = new RestRequest($"items/{itemId}", Method.GET);
            request.AddParameter("apiKey", Settings.WalmartAPIKey);
            var response = APIClient.Execute(request);
            if(response.StatusCode == (HttpStatusCode)200)
                return Ok(response.Content);
            return BadRequest(response.Content);
        }

        [HttpGet("/api/Items/{itemId}/Recommendations")]
        public IActionResult ItemRecommendations(string itemId)
        {
            var request = new RestRequest("nbp", Method.GET);
            request.AddParameter("apiKey", Settings.WalmartAPIKey);
            request.AddParameter("itemId", itemId);
            var response = APIClient.Execute(request);
            if(response.StatusCode == (HttpStatusCode)200)
                return Ok(response.Content);
            return BadRequest(response.Content);
        }
    }   
}