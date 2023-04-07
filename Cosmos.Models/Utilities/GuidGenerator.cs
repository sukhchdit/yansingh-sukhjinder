using System;

namespace Cosmos.Models.Utilities
{
    public static class GuidGenerator
    {
        public static string GetGuid() { 
            return Guid.NewGuid().ToString("N");
        }
    }
}
