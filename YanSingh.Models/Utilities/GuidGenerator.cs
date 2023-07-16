using System;

namespace YanSingh.Models.Utilities
{
    public static class GuidGenerator
    {
        public static string GetGuid() { 
            return Guid.NewGuid().ToString("N");
        }
    }
}
