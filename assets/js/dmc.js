function parseDataDefinition(dataDefinition) {
	//parse the datadefinition, which should be stored in properly formatted JSON
	var myJson=JSON.parse(dataDefinition);
	
	//get the name of the form--used to set up add/update functions
	KD.utils.Action.setQuestionValue("Form Name", myJson.formConfig.formName);
	
	//extract the bridge model and qualification values.  The rows here must match the rows in the columndata,
	//unless you add additional rows in the column data section
	var bridgemodel=myJson.bridgedata.bridgename;
	var bridgequalification=myJson.bridgedata.qualification;
	//extract the bridge attribute values.  The rows here must match the rows in the columndata,
	//unless you add additional rows in the column data section
	var bridgeattributes=myJson.bridgedata.attributes;
	var bridgeorder=myJson.bridgedata.order;

	//extract parameter data from the data definition.  
	var parameterdata=myJson.bridgedata.parameters;

	//extract columndata from the data definition.  There must be one row for each bridge attribute, 
	//but there can be more.
	var tablecolumns=myJson.tableconfig.columndata;

	//getData(bridgequalification,bridgeattributes,paramval1,paramval2,paramval3,tablecolumns);
	getData(bridgemodel,bridgequalification,bridgeattributes,bridgeorder,parameterdata,tablecolumns);
}


function getData(bridgemodel,bridgequalification,bridgeattributes,bridgeorder,parameterdata,tablecolumns) {
	$('#dmcTable').html( '<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" id=\"dmcDataTable\"></table>' );
	var dataArray=[];
	var connector = new KD.bridges.BridgeConnector({templateId: clientManager.templateId});
	var connector2 = new KD.bridges.BridgeConnector({templateId: clientManager.templateId});
	var editors=[];

	connector.search(bridgemodel, bridgequalification, {
	  attributes: bridgeattributes,
	  parameters: parameterdata,
	  metadata: {"order": [bridgeorder]},
	  success: function(list) {
		for(var i=0;i<list.records.length;i++) {
			var currrecord=[];
			for(var j in list.records[i].attributes) {
			  if (list.records[i].attributes.hasOwnProperty(j)){
				currrecord.push(list.records[i].attributes[j]);
			  }
			}
			dataArray.push(currrecord);
		}
		//get editors
		  connector2.search("Data Management Console - Helper Data", "Index 1 | Index 2 | Index 3 (exact match/null)", {
		  attributes: ["Character Field 1"],
		  parameters: {"Index Field 1": "\"Data Management Console\"", "Index Field 2": "\"Configuration Menu Data\"", "Index Field 3": "\"Service Item Names for Editing Data\""},
		  success: function(list2) {
			for(var i=0;i<list2.records.length;i++) {
				var currrecord2=[];
				for(var j in list2.records[i].attributes) {
				  if (list2.records[i].attributes.hasOwnProperty(j)){
					currrecord2.push(list2.records[i].attributes[j]);
				  }
				}
				editors.push(currrecord2);
			}
			populateTable(dataArray,tablecolumns, editors);
		}
	  })
	}
	})
}

function populateTable(dataArray,tablecolumns, editors) {

    //Define the console table using the jquery dataTables plugin with the TableTools extra
	//https://datatables.net & https://datatables.net/extras/tabletools/
	$('#dmcDataTable').dataTable({
		"aaData":dataArray,
		"bDestroy": true,
		"sDom": 'T<"clear">lfrtip',
		"oTableTools":{
		   "sSwfPath":BUNDLE.relativePackagePath + "resources/js/DataTables-1.9.4/extras/TableTools/media/swf/copy_csv_xls_pdf.swf",
		   "sRowSelect": "multi",
		   "aButtons": [
				{
					"sExtends":    "text",
					"sButtonText": "Add Row",
					"fnClick": function( nButton, oConfig, oFlash ) {
						if ( $.inArray(KD.utils.Action.getQuestionValue("Form Name"), editors) && KD.utils.Action.getQuestionValue("Form Name") != "* None (adding entries is not available from the DMC)") {
						//If the form used by this data type is KS_SRV_Helper, display the add/update service item for that form
						//be sure to pass the request ID for the data type/data model and a type of add
							window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name='+KD.utils.Action.getQuestionValue("Form Name")
							+'Row'
							+'&dataModel='+KD.utils.Action.getQuestionValue("Data Model ID")
							+'&type=add', '_self');
						}  else {
							alert("This form does not currently support add. Please contact your administrator if you require this functionality.");
						}
					}
				},
				{
					"sExtends":    "text",
					"sButtonText": "Toggle Status",
					"fnClick": function( nButton, oConfig, oFlash ) {
						var rows = TableTools.fnGetInstance( 'dmcDataTable' ).fnGetSelectedData();
						var numberOfRows = rows.length;
						if (numberOfRows > 0) {
							if ( KD.utils.Action.getQuestionValue("Form Name") == "KS_SRV_Helper") {
								//If the form used by this data type is KS_SRV_Helper, call the toggle status function for that form
								toggleHelperStatus(rows);
							} else {
							    //If the form isn't already processed, a toggle function doesn't exist, so display an error
								alert("This form does not currently support toggle status. Please contact your administrator if you require this functionality.");
							}
						} else {
						    //if the number of rows selected is 0, display an error
							alert("Please select at least one row");
						}
					}
				},
				{
					"sExtends":    "text",
					"sButtonText": "Update Row",
					"fnClick": function( nButton, oConfig, oFlash ) {
						var rows = TableTools.fnGetInstance( 'dmcDataTable' ).fnGetSelectedData();
						var numberOfRows = rows.length;
						if (numberOfRows == 0) {
							//if the number of rows selected is 0, display an error
							alert("Please select a row to update");
						} else if (numberOfRows > 1) {
							//Update can only be performed on one row at a time, so if the number of rows selected is greater than 1, display an error
							alert("Please select only one row to update");
						} else {
							if ( $.inArray(KD.utils.Action.getQuestionValue("Form Name"), editors) && KD.utils.Action.getQuestionValue("Form Name") != "* None (adding entries is not available from the DMC)") {
							//If the form used by this data type is KS_SRV_Helper, display the add/update service item for that form
							//be sure to pass the request ID for the data type/data model, the request ID of the row selected, and a type of update
								window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name='+KD.utils.Action.getQuestionValue("Form Name")
								+'Row&helperId='+rows[0][0]
								+'&dataModel='+KD.utils.Action.getQuestionValue("Data Model ID")
								+'&type=update', '_self');
							} else {
								alert("This form does not currently support update. Please contact your administrator if you require this functionality.");
							}
						}
					}
				},
				{
					"sExtends":    "text",
					"sButtonText": "File Upload",
					"fnClick": function( nButton, oConfig, oFlash ) {						
						if ( KD.utils.Action.getQuestionValue("Form Name") == "KS_SRV_Helper" || KD.utils.Action.getQuestionValue("Form Name") == "DMCDataDefinition" ) {
						//If the form used by this data type is KS_SRV_Helper, open the file upload service item
						//be sure to pass the request ID for the data type/data model, the request ID of the row selected, and a type of update
							window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name=DMCFileUpload'
							+'&dataModel='+KD.utils.Action.getQuestionValue("Data Model ID"), '_self');
						} else {
							alert("This form does not currently support file uploads. Please contact your administrator if you require this functionality.");
						}
					}
				},
				{
					"sExtends":    "collection",
					"sButtonText": "Save Selected",
					"aButtons":    [ {"sExtends": "copy", "bSelectedOnly": true}, {"sExtends": "print", "bSelectedOnly": true}, {"sExtends": "csv", "bSelectedOnly": true}, {"sExtends": "xls", "bSelectedOnly": true}, {"sExtends": "pdf", "bSelectedOnly": true} ]
				},
				{
					"sExtends":    "collection",
					"sButtonText": "Save All",
					"aButtons":    [ "copy", "print", "csv", "xls", "pdf" ]
				},
				"select_all",
				"select_none"
			]
		},
		"aoColumns":tablecolumns
	}).columnFilter; 
}
function toggleHelperStatus(rows) {
    //find the index of the existing Status value
	var sizeOfRows = rows[0].length;
	var indexOfStatus = sizeOfRows -1;
	//Initialize new status value
	var newStatus = "Active";
	
	//Set the new status values for each row
	for (i=0;i<rows.length;i++) {
	
		success = function (o) {
			if (i == (rows.length-1)) {
				//redisplay console after success if this is the last row udpated
				window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name=datamanagement&dataType='+encodeURIComponent(KD.utils.Action.getQuestionValue("Data Types")), '_self');
			}
		};

		failure = function (o) {
			alert("An error has ocurred attempting to save the record");
		};
		//create connection
		connection = new KD.utils.Callback(success, failure, []);

		// Setup a failure message that is needed by _makeSyncRequest
		connection.failure = failure;
		//get date to help prevent caching
		var now = new Date();
	
		//Set new status value variable (the opposite of what is currently in the record
		if (rows[i][indexOfStatus] == "Active") { newStatus = "Inactive"; } else { newStatus = "Active"; }
				
		//Set the new status value callback
		var updateRequestUrl = '../datamanagement/interface/callbacks/updateHelperStatus.jsp?helperID=' + rows[i][0]
		updateRequestUrl = updateRequestUrl + '&status=' + newStatus + '&noCache=' + now.getTime();
		//make sync request to toggle the status
		KD.utils.Action._makeSyncRequest(BUNDLE.packagePath + updateRequestUrl, connection);
	}
}

function getParameter(param) {
  param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+param+"=([^&]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if ( results == null ) 
    return "";
  else
    return results[1];
}

function setDataTypes(dataType) {
	//This function is used to grab the data type provided in the URL and place
	//into into the question-firing the changes to display the table
	//This is used when automatically redisplaying the console page for users
	//after adds or updates
    dataType =  decodeURIComponent(dataType);
	KD.utils.Action.setQuestionValue('Data Types', dataType);
	var dataTypeElem = KD.utils.Util.getQuestionInput('Data Types');
	KD.utils.Action._fireChange(dataTypeElem);
}
