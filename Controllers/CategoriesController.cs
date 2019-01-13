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
    public class CategoriesController : Controller
    {
        private readonly Settings Settings;
        private readonly IRestClient APIClient;
        public CategoriesController  ()
        {
            Settings = new Settings();
            APIClient = new RestClient(Settings.WalmartBaseURL);
        }

        [HttpGet("/api/Categories")]
        public IActionResult Categories()
        {
            var request = new RestRequest("taxonomy");
            request.AddParameter("apiKey", Settings.WalmartAPIKey);
            var response = APIClient.Execute(request);
            if(response.StatusCode == (HttpStatusCode)200)
                return Ok(response.Content);
            return BadRequest(response.Content);
        }
    }
    
}