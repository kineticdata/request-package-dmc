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
	String char_1 = request.getParameter("char_1");
	String char_2 = request.getParameter("char_2");
	String char_3 = request.getParameter("char_3");
	String char_4 = request.getParameter("char_4");
	String char_5 = request.getParameter("char_5");
	String char_6 = request.getParameter("char_6");
	String char_7 = request.getParameter("char_7");
	String char_8 = request.getParameter("char_8");
	String char_9 = request.getParameter("char_9");
	String char_10 = request.getParameter("char_10");
	String char_11 = request.getParameter("char_11");
	String char_12 = request.getParameter("char_12");
	String char_13 = request.getParameter("char_13");
	String char_14 = request.getParameter("char_14");
	String date_1 = request.getParameter("date_1");
	String date_2 = request.getParameter("date_2");
	String date_3 = request.getParameter("date_3");
	String date_4 = request.getParameter("date_4");
	String date_5 = request.getParameter("date_5");
	String date_6 = request.getParameter("date_6");
	String date_7 = request.getParameter("date_7");
	String dtime_1 = request.getParameter("dtime_1");
	String dtime_2 = request.getParameter("dtime_2");
	String dtime_3 = request.getParameter("dtime_3");
	String dtime_4 = request.getParameter("dtime_4");
	String dtime_5 = request.getParameter("dtime_5");
	String dtime_6 = request.getParameter("dtime_6");
	String dtime_7 = request.getParameter("dtime_7");
	String time_1 = request.getParameter("time_1");
	String time_2 = request.getParameter("time_2");
	String time_3 = request.getParameter("time_3");
	String time_4 = request.getParameter("time_4");
	String time_5 = request.getParameter("time_5");
	String time_6 = request.getParameter("time_6");
	String time_7 = request.getParameter("time_7");
	String int_1 = request.getParameter("int_1");
	String int_2 = request.getParameter("int_2");
	String int_3 = request.getParameter("int_3");
	String int_4 = request.getParameter("int_4");
	String int_5 = request.getParameter("int_5");
	String int_6 = request.getParameter("int_6");
	String disp_1 = "";
	String disp_2 = "";
	String disp_3 = "";
	String disp_4 = "";
	String disp_5 = "";
	String disp_6 = "";
	String index_1 = request.getParameter("index_1");
	String index_2 = request.getParameter("index_2");
	String index_3 = request.getParameter("index_3");
	String survey_instance_id = request.getParameter("template");
	String customer_survey_instance_id = request.getParameter("csrv");

	//Update the record. Error is thrown within this code if the create doesn't happen
	Helper.updateHelper(defaultContext,  helperID,  char_1,  char_2,  char_3,  char_4, 
             char_5,  char_6,  char_7,  char_8,  char_9,  char_10,  char_11,  char_12, 
             char_13,  char_14,  date_1,  date_2,  date_3,  date_4,  date_5,  date_6, 
             date_7,  dtime_1,  dtime_2,  dtime_3,  dtime_4,  dtime_5,  dtime_6,  dtime_7, 
             time_1,  time_2,  time_3,  time_4,  time_5,  time_6,  time_7,  disp_1,  disp_2, 
             disp_3,  disp_4,  disp_5,  disp_6,  int_1,  int_2,  int_3,  int_4,  int_5, 
             int_6,  index_1,  index_2,  index_3,  survey_instance_id,  customer_survey_instance_id);
	Helper.updateStatus(defaultContext, helperID, status);
	
	//Update record permissions if necessary
	String permission = request.getParameter("permission");
	if ((permission != null) || !("".equals(permission))) {
		Helper.updatePermission(defaultContext, helperID, permission);
	}

 %>