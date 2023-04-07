namespace Cosmos.Models.Helpers
{

    public class TwilioSettings
    {
        public string TwilioAccountSid { get; set; }
        public string TwilioApiKey { get; set; }
        public string TwilioApiSecret { get; set; }
    }

    public class VideoSDKSettings
    {
        public string ApiEndPoint { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecreateKey { get; set; }
    }

    public class AppSetting
    {
        public TwilioSettings TwilioSettings { get; set; }

        public VideoSDKSettings TeleVistSettings { get; set; }
        public string Connection { get; set; }
        public string Secret { get; set; }
        public string EmailFrom { get; set; }
        public string MailServer { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Port { get; set; }
        public bool EnableSsl { get; set; }
        public string EmailSubjectForgotPassword { get; set; }
        public string ForgotPasswordUrl { get; set; }
        public string EmailSubjectWelcomeEmail { get; set; }
        public string EmailSubjectAccountStatus { get; set; }
        public string WinnovativeLicenseKey { get; set; }
        public string RenderImagesUrl { get; set; }
        public string EmailSubjectAccountActivation { get; set; }
        public string EmailSubjectCalendarEventScheduled { get; set; }
        public string EmailSubjectCalendarEventDeleted { get; set; }
        
        public string BaseUrl { get; set; }
        public string eDiaryBaseUrl { get; set; }
        public string eSignClientId { get; set; }
        public string eSignClientSecret { get; set; }
        public string eSignApiBaseUrl { get; set; }
        public string eSignApiThemeColor { get; set; }
        public string EmailSubjectOrganizationNewUser { get; set; }
        public string StartTLS { get; set; }

        //AWS S3 Bucket settings
        public string awsAccessKeyId { get; set; }
        public string awsSecretAccessKey { get; set; }
        public string awsbucketName { get; set; }
        public string awsDirectoryName { get; set; }
        public string PublicS3 { get; set; }

        public string environment { get; set; }

        public string ClickSendUsername { get; set; }
        public string ClickSendPassword { get; set; }

        public string sendGridApiBaseUrl { get; set; }

        public string TelevisiBaseUrl { get; set; }

    }

    public class ConnectionString
    {
        public string DefaultConnection { get; set; }
    }
}
