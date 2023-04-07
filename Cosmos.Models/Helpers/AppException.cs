
using System;
using System.Globalization;

namespace Cosmos.Models.Helpers
{
    public class AppException:Exception
    {
        public AppException() : base() { }

        public AppException(string message) : base(message) { }

        public AppException(string message, params object[] args):base(String.Format(CultureInfo.CurrentCulture, message, args))
        { }
    }
}
