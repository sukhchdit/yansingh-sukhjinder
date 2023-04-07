using System;
using System.Threading.Tasks;
using Cosmos.Models.Helpers;
using Flurl.Http;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.Extensions.Options;

/// <summary>
/// 
/// </summary>
namespace Cosmos.Infrastructure.Televisit
{
    /// <summary>
    /// 
    /// </summary>
    public class Televisit : ITelevisit
    {
        /// <summary>
        /// 
        /// </summary>
        private readonly VideoSDKSettings _appSettings;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="appSettings"></param>
        public Televisit(IOptions<AppSetting> appSettings)
        {
            _appSettings = appSettings.Value.TeleVistSettings;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public VideoSDKToken GetToken()
        {
            var token = JwtBuilder.Create()
                     .WithAlgorithm(new HMACSHA256Algorithm()) // symmetric
                     .WithSecret(_appSettings.ApiSecreateKey)
                     .AddClaim("exp", DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds())
                     .AddClaim("iat", DateTimeOffset.UtcNow.ToUnixTimeSeconds())
                     .AddClaim("apikey", _appSettings.ApiKey)
                     .AddClaim("permissions", new string[2] { "allow_join", "allow_mod" })
                     .Encode();

            return new VideoSDKToken() { Token = token };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="vSdkToken"></param>
        /// <returns></returns>
        public  async Task<dynamic> CreateMeeting(VideoSDKToken vSdkToken)
        {
            string uri = _appSettings.ApiEndPoint + "/api/meetings";

            var response = await uri
                .WithHeader("Authorization", vSdkToken.Token)
                .PostAsync()
                .ReceiveJson();

            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="vSdkToken"></param>
        /// <param name="meetingId"></param>
        /// <returns></returns>
        public async Task<dynamic> ValidateMeeting(VideoSDKToken vSdkToken,string meetingId)
        {
            string uri = _appSettings.ApiEndPoint + "/api/meetings/" + meetingId;

            var response = await uri
               .WithHeader("Authorization", vSdkToken.Token)
               .PostAsync()
               .ReceiveJson();

            return response;
        }
    }
}
