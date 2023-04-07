using System;
using System.IO;
using Adobe.PDFServicesSDK;
using Adobe.PDFServicesSDK.auth;
using Adobe.PDFServicesSDK.pdfops;
using Adobe.PDFServicesSDK.io;
using Microsoft.AspNetCore.Http;

namespace Cosmos.Models.Utilities
{
    public static class AdobeFileConverterUtility
    {
        public static void ConvertWordToPdf(string filePath, string fileName)
        {
            try
            {
                // Initial setup, create credentials instance.
                var currentDir = Directory.GetCurrentDirectory();
                Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                                .FromFile(Directory.GetCurrentDirectory() + "/AdobeConfig/pdfservices-api-credentials.json")
                                .Build();

                //Create an ExecutionContext using credentials and create a new operation instance.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
                CreatePDFOperation createPdfOperation = CreatePDFOperation.CreateNew();

                // Set operation input from a source file.
                FileRef source = FileRef.CreateFromLocalFile(filePath+"/" + fileName);

                createPdfOperation.SetInput(source);

                // Execute the operation.
                FileRef result = createPdfOperation.Execute(executionContext);
                // Save the result to the specified location.
                var newFileName = fileName.Substring(0, fileName.LastIndexOf("."));
                result.SaveAs(filePath + "/" + newFileName + ".pdf");
            }
            catch (Exception ex)
            {
                //log.Error("Exception encountered while executing operation", ex);
            }
        }  
        public async static  void ConvertWordToPdfWithoutSaving( IFormFile file, string filePath, string fileName)
        {
            try
            {
                // Initial setup, create credentials instance.
                var currentDir = Directory.GetCurrentDirectory();
                Credentials credentials = Credentials.ServiceAccountCredentialsBuilder()
                                .FromFile(Directory.GetCurrentDirectory() + "/AdobeConfig/pdfservices-api-credentials.json")
                                .Build();

                //Create an ExecutionContext using credentials and create a new operation instance.
                ExecutionContext executionContext = ExecutionContext.Create(credentials);
                CreatePDFOperation createPdfOperation = CreatePDFOperation.CreateNew();

                // Set operation input from a source file.
                //   FileRef source = FileRef.CreateFromLocalFile(filePath+"/"+fileName);

                using (var ms = new MemoryStream())
                {
                    file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    //var stream = new FileStream();
                    //    await file.CopyToAsync(stream);
                    FileRef source = FileRef.CreateFromStream(ms, CreatePDFOperation.SupportedSourceFormat.DOCX.GetMediaType());
                createPdfOperation.SetInput(source);

                // Execute the operation.
                FileRef result = createPdfOperation.Execute(executionContext);
                // Save the result to the specified location.
                var newFileName = fileName.Substring(0, fileName.LastIndexOf("."));
                result.SaveAs(filePath + "/" + newFileName + ".pdf");

                }
            }
            catch (Exception ex)
            {
                //log.Error("Exception encountered while executing operation", ex);
            }
        }
    }
}
