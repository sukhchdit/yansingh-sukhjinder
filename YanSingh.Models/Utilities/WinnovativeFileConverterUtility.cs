using YanSingh.Models.Helpers;
using Microsoft.AspNetCore.Hosting;
using WnvWordToPdf;
using Winnovative;

namespace YanSingh.Models.Utilities
{
    public static class WinnovativeFileConverterUtility
    {
        public static byte[] ConvertWordToPdf(string filePath, string fileName)
        {
            // Create a Word to PDF converter object with default settings
            WordToPdfConverter wordToPdfConverter = new WordToPdfConverter();

            // Set license key received after purchase to use the converter in licensed mode
            // Leave it not set to use the converter in demo mode
            wordToPdfConverter.LicenseKey = "DYOSgpaRgpKClIySgpGTjJOQjJubm5uCkg==";

            // Word Content Destination and Spacing Options

            // Set Word content destination in PDF page
            //if (collection["xLocationTextBox"][0].Length > 0)
            //    wordToPdfConverter.PdfDocumentOptions.X = float.Parse(collection["xLocationTextBox"]);
            //if (collection["yLocationTextBox"][0].Length > 0)
            //    wordToPdfConverter.PdfDocumentOptions.Y = float.Parse(collection["yLocationTextBox"]);
            //if (collection["contentWidthTextBox"][0].Length > 0)
            //    wordToPdfConverter.PdfDocumentOptions.Width = float.Parse(collection["contentWidthTextBox"]);
            //if (collection["contentHeightTextBox"][0].Length > 0)
            //    wordToPdfConverter.PdfDocumentOptions.Height = float.Parse(collection["contentHeightTextBox"]);

            //// Set Word content top and bottom spacing or leave them not set to have no spacing for the Word content
            //wordToPdfConverter.PdfDocumentOptions.TopSpacing = float.Parse(collection["topSpacingTextBox"]);
            //wordToPdfConverter.PdfDocumentOptions.BottomSpacing = float.Parse(collection["bottomSpacingTextBox"]);

            //// Add Header

            //// Enable header in the generated PDF document
            //wordToPdfConverter.PdfDocumentOptions.ShowHeader = collection["addHeaderCheckBox"].Count > 0;

            //// Draw header elements
            //if (wordToPdfConverter.PdfDocumentOptions.ShowHeader)
            //    DrawHeader(wordToPdfConverter, true);

            //// Add Footer

            //// Enable footer in the generated PDF document
            //wordToPdfConverter.PdfDocumentOptions.ShowFooter = collection["addFooterCheckBox"].Count > 0;

            //// Draw footer elements
            //if (wordToPdfConverter.PdfDocumentOptions.ShowFooter)
            //    DrawFooter(wordToPdfConverter, true, true);

            string wordFile = filePath + "/" + fileName;

            // Convert the Word document to a PDF document
            byte[] outPdfBuffer = wordToPdfConverter.ConvertWordFile(wordFile);
            //var stream=wordToPdfConverter.ConvertWordFileToStream(wordFile//)

            // Send the PDF file to browser
            //FileResult fileResult = new FileContentResult(outPdfBuffer, "application/pdf");
            //fileResult.FileDownloadName = "WordToPdf.pdf";

            return outPdfBuffer;
        }
        public static byte[] GeneratePdfFromHtml(string htmlString, AppSetting _appSettings)
        {
            HtmlToPdfConverter htmlToPdfConverter = new HtmlToPdfConverter();
            htmlToPdfConverter.PdfDocumentOptions.TopMargin = 36;
            htmlToPdfConverter.PdfDocumentOptions.BottomMargin = 36;
            htmlToPdfConverter.LicenseKey = "fvDh8eDx4fHg4P/h8eLg/+Dj/+jo6Og=";// _appSettings.WinnovativeLicenseKey; //"fvDh8eDx4fHg4P/h8eLg/+Dj/+jo6Og=";

            htmlToPdfConverter.PdfDocumentOptions.PdfPageSize = Winnovative.PdfPageSize.A4;// SelectedPdfPageSize(collection["pdfPageSizeDropDownList"]);

            htmlToPdfConverter.PdfDocumentOptions.PdfPageOrientation = Winnovative.PdfPageOrientation.Portrait; ///Sel0ectedPdfPageOrientation(collection["pdfPageOrientationDropDownList"]);

            string baseUrl = ""; //collection["baseUrlTextBox"];
            return htmlToPdfConverter.ConvertHtml(htmlString, baseUrl);
        }
    }
}
