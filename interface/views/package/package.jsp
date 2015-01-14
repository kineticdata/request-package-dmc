<%-- Include the package initialization file. --%>
<%@include file="../../../framework/includes/packageInitialization.jspf"%>
<%
    // Retrieve the main catalog object
    Catalog catalog = Catalog.findByName(context, customerRequest.getCatalogName());
    // Preload the catalog child objects (such as Categories, Templates, etc)
    catalog.preload(context);
%>
<%-- Include the bundle js config initialization. --%>
<%@include file="../../../../../core/interface/fragments/packageJsInitialization.jspf" %>
<!-- Page Stylesheets -->
<link rel="stylesheet" href="<%= bundle.packagePath()%>assets/css/package.css" type="text/css" />
<%-- Include the application content. --%>
<%@include file="../../../../../core/interface/fragments/applicationHeadContent.jspf"%>
<%@include file="../../../../../core/interface/fragments/displayHeadContent.jspf"%>
<%-- Include the form content, including attached css/javascript files and custom header content --%>
<%@include file="../../../../../core/interface/fragments/formHeadContent.jspf"%>

<!-- Page Stylesheets -->
<link rel="stylesheet" href="<%= bundle.packagePath()%>../../libraries/DataTables-1.10.3/media/css/jquery.dataTables.css" type="text/css" />

<!-- Package Javascript -->
<script type="text/javascript" src="<%=bundle.packagePath()%>../../libraries/DataTables-1.10.3/media/js/jquery.dataTables.min.js"></script>

<script type="text/javascript" src="<%=bundle.packagePath()%>assets/js/notifications.js"></script>
<section class="container">
    <h2>
		<%= customerRequest.getTemplateName()%>
	</h2>
</section> 
<section class="container">
	<%@include file="../../../../../core/interface/fragments/displayBodyContent.jspf"%>
</section>