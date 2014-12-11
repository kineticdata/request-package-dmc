<jsp:useBean id="UserContext" scope="session" class="com.kd.kineticSurvey.beans.UserContext"/>
<%@page import="com.kd.kineticSurvey.impl.RemedyHandler"%>
<%@include file="../../../../core/framework/models/ArsBase.jspf" %>
<%
    /* Defined here because this jsp will be called seperately. That is, not part of the Catalog jsp. */
    HelperContext context = UserContext.getArContext();
    HelperContext defaultContext = UserContext.getArContext();
try {
    defaultContext = RemedyHandler.getDefaultHelperContext();
} catch (Exception e){
    // Handle exception
    throw new RuntimeException(e);
}

%>

<%@include file="../../framework/models/helper.jspf"%>
<%
    String helperID = request.getParameter("helperID");
    String status = request.getParameter("status");
	

	//Update the record. Error is thrown within this code if the create doesn't happen
	Helper.updateStatus(defaultContext, helperID, status);

 %>