using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using System;
using System.IO;
using System.Text;

namespace Cosmos.Models.Utilities
{
    public static class CommonUtil
    {
        public static string NumberToString(int value)
        {
            StringBuilder sb = new StringBuilder();

            do
            {
                value--;
                int remainder = 0;
                value = Math.DivRem(value, 26, out remainder);
                sb.Insert(0, Convert.ToChar('A' + remainder));

            } while (value > 0);

            return sb.ToString();
        }

        public static string ReadPhysicalFile(string path, IHostingEnvironment _hostingEnvironment)
        {
            if (_hostingEnvironment == null)
                throw new InvalidOperationException($"{nameof(IHostingEnvironment)} is not initialized");

            IFileInfo fileInfo = _hostingEnvironment.ContentRootFileProvider.GetFileInfo(path);

            if (!fileInfo.Exists)
                throw new FileNotFoundException($"Template file located at \"{path}\" was not found");

            using (var fs = fileInfo.CreateReadStream())
            {
                using (var sr = new StreamReader(fs))
                {
                    return sr.ReadToEnd();
                }
            }
        }
    }
}
