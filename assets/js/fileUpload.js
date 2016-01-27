var dataType;

function loadAddUpdate() {
	var dataModelId = KD.utils.Util.getParameter("dataModel");
	if (dataModelId) {
		KD.utils.Action.setQuestionValue("Data Model helperID", dataModelId);
		//get data model details
		var connector = new KD.bridges.BridgeConnector({templateId: clientManager.templateId});

		//retrieve the data definition and data type from the data definition
		connector.retrieve('Data Management Console - Data Definitions', 'By Record Id', {
		  attributes: ["Character Field 13","Character Field 1"],
		  parameters: {'Record Id':dataModelId},
		  success: function(record) {
				//get the details about the dataset so we can process the page correctly
				KD.utils.Action.setQuestionValue("Data Model", record.attributes["Character Field 13"]);
				KD.utils.Action.setQuestionValue("Data Type", record.attributes["Character Field 1"]);
				dataType = record.attributes["Character Field 1"];
				$('.datatypetext').html(record.attributes["Character Field 1"]);
				determineOtherCriteria();
		  }
		});
	
	} else {
		//redirect to the console if an inadequate url was provided
		alert("A Data Model was not provided. You will be redirected");
		window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name='+BUNDLE.config.slug+'datamanagement', '_self');
	
	}

}

function determineOtherCriteria() {
	var dataModelJson = $.parseJSON(KD.utils.Action.getQuestionValue('Data Model'));
	KD.utils.Action.setQuestionValue("Bridge Model", dataModelJson.bridgedata.bridgename);
	KD.utils.Action.setQuestionValue("Bridge Qualification", dataModelJson.bridgedata.qualification);
	var dataModelStructure = dataModelJson.datatypestructure.tablestructure;
	
	//determine field count and field order.
	//Remove 1 since we are not expecting the RequestID field
	var csvFieldCount = dataModelStructure.length-1;
	var csvFieldOrder = [];
	var helperFieldOrder = [];
	for (i=0;i<csvFieldCount+1;i++) {
		if (dataModelStructure[i][2]!="Request ID"){
			csvFieldOrder.push(dataModelStructure[i][3]);
			helperFieldOrder.push(dataModelStructure[i][2]);
		}
	}
	var csvExpectationsText="The CSV must meet these qualifications: <br>" +
	                        "   <ul><li><b>Number of columns:</b> "  + csvFieldCount + "</li>" +
							"   <li><b>Order of columns:</b> " + csvFieldOrder.join(" | ") + "</li></ul>";
	
	$('#csvexpectations').html(csvExpectationsText);
	KD.utils.Action.setQuestionValue("Helper Fields",helperFieldOrder.join("||"));
	KD.utils.Action.setQuestionValue("Bridge Parameters",buildQualification(dataModelJson.bridgedata.parameters));
}

function buildQualification(o){
    var parse = function(_o){
        var a = [], t;
        for(var p in _o){
            if(_o.hasOwnProperty(p)){
                t = _o[p];
                if(t && typeof t == "object"){
                    a[a.length]= p + "::{" + arguments.callee(t).join("||") + "}";
                }
                else {
                    if(typeof t == "string"){
                    
                        a[a.length] = [ p+ "::\"" + t.toString() + "\"" ];
                    }
                    else{
                        a[a.length] = [ p+ "::" + t.toString()];
                    }
                }
            }
        }
        return a;
    }
    return parse(o).join("||");
}

