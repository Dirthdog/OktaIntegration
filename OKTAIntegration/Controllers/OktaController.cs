using Okta.Core.Clients;
using Okta.Core.Models;
using System.Net.Http;
using System.Web.Http;

namespace OKTAIntegration.Controllers
{
    public class OktaController : ApiController
    {

        string APIKey = "{Fill in when generated}"; //My Generated Token
        public IHttpActionResult Authenticate(string ID)
        {
            var oktaClient = new OktaClient(APIKey, "financialpartners");
            var usersClient = oktaClient.GetUsersClient();

            try
            {

                if (ID == "1") //Get a User
                {
                    var user = usersClient.Get("eric.pahl@financialpartners.com");
                    return Ok(user);
                };

                if (ID == "2") //Not Sure what to do here yet
                    return Ok("Authorized 2");

                if (ID == "3") //Create a New User
                {
                    var user = new User("newuser1@financialpartners.com", "newuser1@financialpartners.com", "New", "User1");
                    user.Credentials.Password = new Password() { Value = "1234" };
                    user = usersClient.Add(user);
                    return Ok(user);
                }
                if (ID == "4") //Deactivate a User
                {
                    var user = usersClient.Get("newuser@financialpartners.com");
                    usersClient.Deactivate(user);
                    return Ok(user);
                }

                if (ID == "5") //Get Session
                {
                    //Not Super Clear on what to do here the API guide is weak for C# developers
                    //It assumes you have strong knowledge of REST and JSON
                    var session = oktaClient.GetSessionsClient();
                    session.Create("eric.pahl@financialpartners.com", "7381!");
                    return Ok(session); //this should be a token

                }
                else
                    return Ok("NotOkay");
            }
            catch (System.Exception ex)
            {
                throw new HttpResponseException(new HttpResponseMessage());
            }
            
        }


        public IHttpActionResult OktaWithData(string ID, string SomeData)
        {
            var oktaClient = new OktaClient(APIKey, "financialpartners");
            var usersClient = oktaClient.GetUsersClient();

            try
            {
                if (ID == "3") //Create a New User
                {
                    var user = new User("newuser@financialpartners.com", "newuser@financialpartners.com", "New", "User");
                    user = usersClient.Add(user);
                    return Ok(user);
                }
                if (ID == "4") //Deactivate a User
                {
                    var user = usersClient.Get("newuser@financialpartners.com");
                    usersClient.Deactivate(user);
                    return Ok(user);
                }
                else
                    return Ok("NotOkay");
            }
            catch (System.Exception ex)
            {

                return Ok("NotOkay" + ex.Message + ex.InnerException);

            }


        }
    }
}
