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
   String Level1 = request.getParameter("Level1");
   String Level2 = request.getParameter("Level2");
   String Level3 = request.getParameter("Level3");
   if (Level1 == null) { Level1 = ""; }
   if (Level2 == null) { Level2 = ""; }
   if (Level3 == null) { Level3 = ""; }
   String DataTypes = "";
	//Update the record. Error is thrown within this code if the create doesn't happen
	String query = "'Index Field1' = \"Data Management Console\" AND 'Index Field2' = \"Data Definition\" AND 'Status' = \"Active\""; 
	if (Level1 != "" ) {
		query = query + " AND 'Character Field10' = \"" + Level1 + "\""; 
	}
	if (Level2 != "" ) {
		query = query + " AND 'Character Field11' = \"" + Level2 + "\""; 
	}
	if (Level3 != "" ) {
		query = query + " AND 'Character Field12' = \"" + Level3 + "\""; 
	}
	myLogger.debug("built query: " + query);
	Helper[] records = Helper.find(context, query);
	myLogger.debug("found helpers");
	for (Helper record : records) {
		Level1 = Level1 + "::" + record.getCharacterField10();
		myLogger.debug("Level 1 " + record.getCharacterField10());
		Level2 = Level2 + "::" + record.getCharacterField11();
		myLogger.debug("Level2 " + record.getCharacterField11());
		Level3 = Level3 + "::" + record.getCharacterField12();
		myLogger.debug("Level3 " + record.getCharacterField12());
		DataTypes = DataTypes + "::" + record.getCharacterField1();
		myLogger.debug("DataTypes " + record.getCharacterField1());
	}


 %>
<%=Level1%>;;<%=Level2%>;;<%=Level3%>;;<%=DataTypes%>