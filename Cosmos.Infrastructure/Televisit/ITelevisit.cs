using System;
using System.Threading.Tasks;

namespace Cosmos.Infrastructure.Televisit
{
    public interface ITelevisit
    {
        VideoSDKToken GetToken();

        Task<dynamic> CreateMeeting(VideoSDKToken vSdkToken);

        Task<dynamic> ValidateMeeting(VideoSDKToken vSdkToken, string meetingId);
    }
}
