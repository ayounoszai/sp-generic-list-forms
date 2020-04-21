<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" meta:webpartpageexpansion="full"  %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Import Namespace="Microsoft.SharePoint" %> <%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePoint:ListFormPageTitle runat="server"/>
</asp:Content>



<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
	<div id="app"></div>
	<script type="text/javascript" src="http://localhost:8080/js/chunk-vendors.js"></script>
	<script type="text/javascript" src="http://localhost:8080/js/app.js"></script>
  
  
      

	<!-- REPLACE PageType, ID and __WebPartId with values from SP created page -->
	<WebPartPages:WebPartZone runat="server" FrameType="None" ID="Main" Title="loc:Main">
		<ZoneTemplate>
      <WebPartPages:DataFormWebPart runat="server" ViewFlag="1048584" PageType="PAGE_EDITFORM"    PartOrder="2" ID="g_4a870e92_776b_4c16_a2eb_395323dc04e7" __WebPartId="{4A870E92-776B-4C16-A2EB-395323DC04E7}">
				<Xsl>
					<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:dsp="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal"></xsl:stylesheet>
				</Xsl>
			</WebPartPages:DataFormWebPart>
		</ZoneTemplate>
	</WebPartPages:WebPartZone>
</asp:Content>