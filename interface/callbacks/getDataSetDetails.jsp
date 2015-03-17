<jsp:useBean id="UserContext" scope="session" class="com.kd.kineticSurvey.beans.UserContext"/>
<%@page import="com.kd.kineticSurvey.impl.RemedyHandler"%>
<%@page import="org.apache.log4j.Logger"%>
<%@page import="com.kd.kineticSurvey.impl.SurveyLogger"%>
<%@include file="../../../../core/framework/models/ArsBase.jspf" %>
<%
Logger myLogger = SurveyLogger.getLogger();
/* Defined here because this jsp will be called seperately. That is, not part of the Catalog jsp. */
HelperContext context = UserContext.getArContext();

%><%@include file="../../framework/models/helper.jspf"%>
<%
   String DataSetID = "";
   String DataSetDetails = "";
   String DataType = request.getParameter("DataType");
   if (DataType == null) { DataType = ""; }
	//Update the record. Error is thrown within this code if the create doesn't happen
	String query = "'Index Field1' = \"Data Management Console\" AND 'Index Field2' = \"Data Definition\" AND 'Status' = \"Active\" AND 'Character Field1' = \"" + DataType + "\""; 
	//myLogger.debug("built query: " + query);
	Helper[] records = Helper.find(context, query);
	//myLogger.debug("found helpers");
	for (Helper record : records) {
		DataSetID = record.getRequestID();
		//myLogger.debug("DataSetID " + record.getRequestID());
		DataSetDetails = record.getCharacterField13();
		//myLogger.debug("DataSetDetails " + record.getCharacterField13());
	}
	if (DataSetID == "") { DataSetID = "No Permission"; }

 %>
<%=DataSetID%>;;;<%=DataSetDetails%>