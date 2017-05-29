using System;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Linq;
using System.Collections.Generic;
using WienSubsBeta.Domain;

namespace WienSubsBeta.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public async Task<IActionResult> SearchAnime(string searchText)
        {
            var malApiUrl = "https://myanimelist.net/api/anime/search.xml";
            HttpWebRequest wr = (HttpWebRequest)WebRequest.Create(malApiUrl + "?q=" + searchText);

            var authHeaderBytes = System.Text.Encoding.UTF8.GetBytes("PhoenixItachi:juventus32");
            var authHeader = Convert.ToBase64String(authHeaderBytes);

            wr.Headers[HttpRequestHeader.Authorization] = "Basic " + authHeader;
            HttpWebResponse response = await wr.GetResponseAsync() as HttpWebResponse;
            List<Anime> animeList = new List<Anime>();
            try
            {
                if (response.StatusCode == HttpStatusCode.NoContent)
                {
                    return new JsonResult(new { more = false });
                }

                var responseStream = response.GetResponseStream();

                var xml = XDocument.Load(responseStream);
                var list = xml.Descendants("entry").ToList()?.Take(5);
                foreach (var anime in list)
                {
                    var animeObj = new Anime()
                    {
                        Title = anime.Element("title").Value,
                        Episodes = anime.Element("episodes").Value,
                        Status = anime.Element("status").Value,
                        Type = anime.Element("type").Value,
                        Score = anime.Element("score").Value,
                        Image = anime.Element("image").Value,
                        Synonyms = anime.Element("synonyms").Value,
                        Synopsis = anime.Element("synopsis").Value
                    };
                    animeList.Add(animeObj);
                }
            }
            catch (Exception e)
            {

            }

            return new JsonResult(animeList);
        }
    }
}
