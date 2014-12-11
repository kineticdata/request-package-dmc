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

var dataType;

function loadAddUpdate() {
	var type = getParameter("type");
	var dataModelId = getParameter("dataModel");
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
				
				
				//process the add or update display
				if (type == "add") {
					loadAdd();
				} else if (type == "update") {
					var helperId = getParameter("helperId");
					loadUpdate(helperId);
				} else {
					//redirect to the console if an inadiquate url was provided
					alert("Entry type not provided (add/update). You will be redirected");
					window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name=datamanagement', '_self');
				}
		
		  }
		});
	
	} else {
		//redirect to the console if an inadequate url was provided
		alert("A Data Model was not provided. You will be redirected");
		window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name=datamanagement', '_self');
	
	}

}

function loadAdd() {
	//get Data Model
	var dataModel = KD.utils.Action.getQuestionValue("Data Model");
	var dataModelJSON = JSON.parse(dataModel);
	
	//Set the index fields
	//KD.utils.Action.setQuestionValue("Index Field 1", dataModelJSON.bridgedata.paramval1);
	//KD.utils.Action.setQuestionValue("Index Field 2", dataModelJSON.bridgedata.paramval2);
	//KD.utils.Action.setQuestionValue("Index Field 3", dataModelJSON.bridgedata.paramval3);

	//handle the fields
	var fieldData = dataModelJSON.formConfig.fielddata;
	for (var key in fieldData)
	{
	   if (fieldData.hasOwnProperty(key))
	   {
		  //insert the question & helptext elements
		  var fieldName = fieldData[key].fieldName;
		  KD.utils.Action.insertElement(fieldName);
		  KD.utils.Action.insertElement(fieldName+" Text");
		  //set the label of the field
		  var label = fieldData[key].label;
		  var questionLabel = $('[label="'+fieldName+'"]').find('.questionLabel').html(label);
		  
		  //Set field required if specified
		  if (fieldData[key].required.toUpperCase() == "YES") {
			if (fieldData[key].type == "Text - Selection list"){
				KD.utils.Action.makeQuestionRequired("List"+fieldName);
			} else {
				KD.utils.Action.makeQuestionRequired(fieldName);
			}
		  }
		  //Set read only
		  if (fieldData[key].readonly.toUpperCase() == "YES") {
			if (fieldData[key].type == "Text - Selection list"){
				KD.utils.Action.setReadOnly("List"+fieldName);
			} else {
				KD.utils.Action.setReadOnly(fieldName);
			}
		  }
		  //If field type = list change text field to list and populate menu
		  //if (fieldData[key].type == "list") {
		  if (fieldData[key].type == "Text - Selection list") {
			//Hide the character Field and show the cooresponding list field
			KD.utils.Action.removeElement(fieldName);
			KD.utils.Action.insertElement("List"+fieldName);
			//Update the label on the list field to be correct to the data type
			var questionLabel = $('[label="List'+fieldName+'"]').find('.questionLabel').html(label);
			
			//populate the menu
			//get menu options
			var menuOptions = fieldData[key].menuOptions.split("::");
			//clear out menu
			var answerLayer = KD.utils.Util.getAnswerLayer("List"+fieldName);
			answerLayer.firstChild.length = 0;
			//Populate first menu item as blank
			answerLayer.firstChild.options[0] = new Option("","");
			//populate remaining menu items
			for (i=0; i<menuOptions.length; i++) {
				answerLayer.firstChild.options[i+1] = new Option(menuOptions[i],menuOptions[i]);
			}

		  }
		  //Set all default values because this is an add
		   if (fieldData[key].type == "Text - Selection list"){
			 KD.utils.Action.setQuestionValue("List"+fieldName, fieldData[key].defaultValue);
		   } else {
		     KD.utils.Action.setQuestionValue(fieldName, fieldData[key].defaultValue);
		   }
		  //set help text
		  var helpText = fieldData[key].helpText;
		  var helpId = "#"+fieldName.replace(/\s/g, "")+"Help";
		  $(helpId).html(helpText);
	   }
	}
	
	//show the add button. Submission requires use of a model (because synchronous trees aren't
	//available) so this should be done before the page has submitted. The function called when 
	//clicking add will submit the page, which will allow for tracking/audit trail and redirect
	//the user to the console
	KD.utils.Action.insertElement("Add Button");
}

function loadUpdate(helperId) {
//get Data Model
	var dataModel = KD.utils.Action.getQuestionValue("Data Model");
	var dataModelJSON = JSON.parse(dataModel);
	
	//Set the index fields
	//KD.utils.Action.setQuestionValue("Index Field 1", dataModelJSON.bridgedata.paramval1);
	//KD.utils.Action.setQuestionValue("Index Field 2", dataModelJSON.bridgedata.paramval2);
	//KD.utils.Action.setQuestionValue("Index Field 3", dataModelJSON.bridgedata.paramval3);

	//handle the fields
	var fieldData = dataModelJSON.formConfig.fielddata;
	for (var key in fieldData)
	{
	   if (fieldData.hasOwnProperty(key))
	   {
		  //insert the question & helptext elements
		  var fieldName = fieldData[key].fieldName;
		  KD.utils.Action.insertElement(fieldName);
		  KD.utils.Action.insertElement(fieldName+" Text");
		  //set the label of the field
		  var label = fieldData[key].label;
		  var questionLabel = $('[label="'+fieldName+'"]').find('.questionLabel').html(label);
		  
		  //Set field required if specified
		  if (fieldData[key].required.toUpperCase() == "YES") {
			KD.utils.Action.makeQuestionRequired(fieldName);
		  }
		  //Set read only
		  if (fieldData[key].readonly.toUpperCase() == "YES") {
			KD.utils.Action.setReadOnly(fieldName);
		  }
		  //If field type = list change text field to list and populate menu
		  if (fieldData[key].type == "Text - Selection list") {
			//Hide the character Field and show the cooresponding list field
			KD.utils.Action.removeElement(fieldName);
			KD.utils.Action.insertElement("List"+fieldName);
			//update the list field label to reflect the correct value for the data type
			var questionLabel = $('[label="List'+fieldName+'"]').find('.questionLabel').html(label);
			
			//populate the menu
			//get menu options
			var menuOptions = fieldData[key].menuOptions.split("::");
			//clear out menu
			var answerLayer = KD.utils.Util.getAnswerLayer("List"+fieldName);
			answerLayer.firstChild.length = 0;
			//Populate first menu item as blank
			answerLayer.firstChild.options[0] = new Option("","");
			//populate remaining menu items
			for (i=0; i<menuOptions.length; i++) {
				answerLayer.firstChild.options[i+1] = new Option(menuOptions[i],menuOptions[i]);
			}

		  }
		  //set help text
		  var helpText = fieldData[key].helpText;
		  var helpId = "#"+fieldName.replace(/\s/g, "")+"Help";
		  $(helpId).html(helpText);
	   }
	}
	
	 //Get values from existing record
	if (helperId) {
		KD.utils.Action.setQuestionValue("helperID", helperId);
		//get data model details
		var connector2 = new KD.bridges.BridgeConnector({templateId: clientManager.templateId});

		connector2.retrieve('Data Management Console - Helper Data', 'By Record Id', {
		  attributes: ["Character Field 1","Character Field 2","Character Field 3","Character Field 4","Character Field 5","Character Field 6", "Character Field 7","Character Field 8","Character Field 9","Character Field 10","Character Field 11","Character Field 12","Character Field 13","Character Field 14",
		  "Index Field 1","Index Field 2","Index Field 3",
		  "Integer Field 1","Integer Field 2","Integer Field 3","Integer Field 4","Integer Field 5","Integer Field 6",
		  "Date Field 1","Date Field 2","Date Field 3","Date Field 4","Date Field 5","Date Field 6","Date Field 7",
		  "Date Time Field 1","Date Time Field 2","Date Time Field 3","Date Time Field 4","Date Time Field 5","Date Time Field 6","Date Time Field 7",
		  "Time Field 1","Time Field 2","Time Field 3","Time Field 4","Time Field 5","Time Field 6","Time Field 7","Status"],
		  parameters: {'Record Id':helperId},
		  success: function(record) {
				//place the existing values in the relevant fields
				KD.utils.Action.setQuestionValue("Character Field 1", record.attributes["Character Field 1"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 1", record.attributes["Character Field 1"]);
				KD.utils.Action.setQuestionValue("Character Field 2", record.attributes["Character Field 2"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 2", record.attributes["Character Field 2"]);
				KD.utils.Action.setQuestionValue("Character Field 3", record.attributes["Character Field 3"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 3", record.attributes["Character Field 3"]);
				KD.utils.Action.setQuestionValue("Character Field 4", record.attributes["Character Field 4"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 4", record.attributes["Character Field 4"]);
				KD.utils.Action.setQuestionValue("Character Field 5", record.attributes["Character Field 5"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 5", record.attributes["Character Field 5"]);
				KD.utils.Action.setQuestionValue("Character Field 6", record.attributes["Character Field 6"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 6", record.attributes["Character Field 6"]);
				KD.utils.Action.setQuestionValue("Character Field 7", record.attributes["Character Field 7"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 7", record.attributes["Character Field 7"]);
				KD.utils.Action.setQuestionValue("Character Field 8", record.attributes["Character Field 8"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 8", record.attributes["Character Field 8"]);
				KD.utils.Action.setQuestionValue("Character Field 9", record.attributes["Character Field 9"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 9", record.attributes["Character Field 9"]);
				KD.utils.Action.setQuestionValue("Character Field 10", record.attributes["Character Field 10"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 10", record.attributes["Character Field 10"]);
				KD.utils.Action.setQuestionValue("Character Field 11", record.attributes["Character Field 11"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 11", record.attributes["Character Field 11"]);
				KD.utils.Action.setQuestionValue("Character Field 12", record.attributes["Character Field 12"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 12", record.attributes["Character Field 12"]);
				KD.utils.Action.setQuestionValue("Character Field 13", record.attributes["Character Field 13"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 13", record.attributes["Character Field 13"]);
				KD.utils.Action.setQuestionValue("Character Field 14", record.attributes["Character Field 14"]);
				KD.utils.Action.setQuestionValue("ListCharacter Field 14", record.attributes["Character Field 14"]);
				KD.utils.Action.setQuestionValue("Index Field 1", record.attributes["Index Field 1"]);
				KD.utils.Action.setQuestionValue("ListIndex Field 1", record.attributes["Index Field 1"]);
				KD.utils.Action.setQuestionValue("Index Field 2", record.attributes["Index Field 2"]);
				KD.utils.Action.setQuestionValue("ListIndex Field 2", record.attributes["Index Field 2"]);
				KD.utils.Action.setQuestionValue("Index Field 3", record.attributes["Index Field 3"]);
				KD.utils.Action.setQuestionValue("ListIndex Field 3", record.attributes["Index Field 3"]);
				KD.utils.Action.setQuestionValue("Integer Field 1", record.attributes["Integer Field 1"]);
				KD.utils.Action.setQuestionValue("Integer Field 2", record.attributes["Integer Field 2"]);
				KD.utils.Action.setQuestionValue("Integer Field 3", record.attributes["Integer Field 3"]);
				KD.utils.Action.setQuestionValue("Integer Field 4", record.attributes["Integer Field 4"]);
				KD.utils.Action.setQuestionValue("Integer Field 5", record.attributes["Integer Field 5"]);
				KD.utils.Action.setQuestionValue("Integer Field 6", record.attributes["Integer Field 6"]);
				KD.utils.Action.setQuestionValue("Date Field 1", record.attributes["Date Field 1"]);
				KD.utils.Action.setQuestionValue("Date Field 2", record.attributes["Date Field 2"]);
				KD.utils.Action.setQuestionValue("Date Field 3", record.attributes["Date Field 3"]);
				KD.utils.Action.setQuestionValue("Date Field 4", record.attributes["Date Field 4"]);
				KD.utils.Action.setQuestionValue("Date Field 5", record.attributes["Date Field 5"]);
				KD.utils.Action.setQuestionValue("Date Field 6", record.attributes["Date Field 6"]);
				KD.utils.Action.setQuestionValue("Date Field 7", record.attributes["Date Field 7"]);
				KD.utils.Action.setQuestionValue("Date Time Field 1", record.attributes["Date Time Field 1"]);
				KD.utils.Action.setQuestionValue("Date Time Field 2", record.attributes["Date Time Field 2"]);
				KD.utils.Action.setQuestionValue("Date Time Field 3", record.attributes["Date Time Field 3"]);
				KD.utils.Action.setQuestionValue("Date Time Field 4", record.attributes["Date Time Field 4"]);
				KD.utils.Action.setQuestionValue("Date Time Field 5", record.attributes["Date Time Field 5"]);
				KD.utils.Action.setQuestionValue("Date Time Field 6", record.attributes["Date Time Field 6"]);
				KD.utils.Action.setQuestionValue("Date Time Field 7", record.attributes["Date Time Field 7"]);
				KD.utils.Action.setQuestionValue("Status", record.attributes["Status"]);
				//If there is no value in the time field, don't bother trying to process it, but if there is a value it needs to be
				//changed from military time (ex. 17:00:00) to "standard remedy format" for input (ex. 5:00:00 PM)
				if (record.attributes["Time Field 1"] != "") { KD.utils.Action.setQuestionValue("Time Field 1", processTimeForDisplay(record.attributes["Time Field 1"])); }
				if (record.attributes["Time Field 2"] != "") { KD.utils.Action.setQuestionValue("Time Field 2", processTimeForDisplay(record.attributes["Time Field 2"])); }
				if (record.attributes["Time Field 3"] != "") { KD.utils.Action.setQuestionValue("Time Field 3", processTimeForDisplay(record.attributes["Time Field 3"])); }
				if (record.attributes["Time Field 4"] != "") { KD.utils.Action.setQuestionValue("Time Field 4", processTimeForDisplay(record.attributes["Time Field 4"])); }
				if (record.attributes["Time Field 5"] != "") { KD.utils.Action.setQuestionValue("Time Field 5", processTimeForDisplay(record.attributes["Time Field 5"])); }
				if (record.attributes["Time Field 6"] != "") { KD.utils.Action.setQuestionValue("Time Field 6", processTimeForDisplay(record.attributes["Time Field 6"])); }
				if (record.attributes["Time Field 7"] != "") { KD.utils.Action.setQuestionValue("Time Field 7", processTimeForDisplay(record.attributes["Time Field 7"])); }
		
		  }
		});
	
	}
	
	
	//show the update button. Submission requires use of a model (because synchronous trees aren't
	//available) so this should be done before the page has submitted. The function called when 
	//clicking update will submit the page, which will allow for tracking/audit trail and redirect
	//the user to the console
	KD.utils.Action.insertElement("Update Button");
}

function processTimeForUrl(time) {
	//Remedy stores data in seconds since 12:00:00 AM/00:00:00
	//Take a sting like 5:00:00 PM and turn it into seconds since 12:00:00 AM
	//Start at 0
	var time_s = 0;
	//If the string specifies PM, add 12 hours worth of seconds
	if (time.indexOf("PM") != -1) {
		time_s = 43200;
	}
	//Take the AM/PM value off the end of the string
	var timestrs = time.split(" ");
	//Split the string to gets hours, minutes and seconds
	var timeParts = timestrs[0].split(":");
	//change the hours to 0 if they are 12--necessary for calculation
	if (timeParts[0] == "12") timeParts[0] = "0";
	//add the hours, minutes and seconds to the existing value to get the final value.
	time_s = time_s + (parseInt(timeParts[0])*3600) + (parseInt(timeParts[1])*60) + parseInt(timeParts[2]);
	
	//return the calculated number of seconds
	return time_s; 
}

function processDateTimeForUrl(datetime) {
	//Remedy wants date time data as mm/dd/yyyy HH:mm:ss
	//but it comes from a date time question as YYYY-MM-ddTHH:mm:ssZ
	if (datetime) {
	//Split the date from the time
	var dateTimeParts = datetime.split("T");
	//Take the Z off the time
	var timePart = dateTimeParts[1].replace("Z","");
	//Split the date apart
	var dateParts = dateTimeParts[0].split("-");
	
	//create the new string
	var newDateTime = dateParts[1] +"/"+ dateParts[2] +"/"+ dateParts[0] + " " + timePart;
	//return the calculated number of seconds
	return newDateTime; 
	} else { return datetime; }
}

function processTimeForDisplay(time) { 
	//Remedy stores data in seconds since 12:00:00 AM/00:00:00, but the API returns a military time
    //change time from military time (ex. 17:00:00) to "standard remedy format" for input (ex. 5:00:00 PM)
	var storedTime = time;
	//Split the military time into hours minuts and seconds
	var timeParts = storedTime.split(":");
	//Turn the hours into an integer so it can be manipuated
	var hours = parseInt(timeParts[0]);
	//Figure out whether the time is AM or PM
	var dayPart = " AM";
	if (hours >= 12) { hours = hours - 12; dayPart = " PM";}
	//the military hour for midnight 0, change this to 12
	if (hours == 0) { hours = 12; }
	//put the time string together
	var displayTime = hours.toString() +":"+ timeParts[1] +":"+ timeParts[2] + dayPart;
	
	//return time string for display
	return displayTime;
}

function showConsole(dataType) {
	//redirect to the console referencing the provided data type
	window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name=datamanagement&dataType='+encodeURIComponent(dataType), '_self');
}

function updateRecord(){

	//Display wait pop-up
	setStatusWAIT =
		new YAHOO.widget.Panel("wait", {
			width: "340px",
			fixedcenter: true,
			close: false,
			draggable: true,
			zindex: 4,
			modal: true,
			visible: false
		});

	setStatusWAIT.setHeader("Updating Record");
	setStatusWAIT.setBody("<img src='http://l.yimg.com/a/i/us/per/gr/gp/rel_interstitial_loading.gif' />");
	setStatusWAIT.render(document.body);

	setStatusWAIT.show();

	//actions done on success of the callback
	success = function (o) {
		setStatusWAIT.hide();
		//submit page
		Dom.getElementsByClassName('templateButton', 'input', KD.utils.Util.getElementObject("Submit"))[0].click();
	};

	//actions done if the callback fails
	failure = function (o) {
		alert("An error has ocurred attempting to save the record");
		setStatusWAIT.hide();
	};

	 //get values necessary to pass to the callback here
	var helperID = KD.utils.Action.getQuestionValue("helperID");
	var index_1 = KD.utils.Action.getQuestionValue("Index Field 1");
	var index_2 = KD.utils.Action.getQuestionValue("Index Field 2");
	var index_3 = KD.utils.Action.getQuestionValue("Index Field 3");
	var char_1 = KD.utils.Action.getQuestionValue("Character Field 1");
	var char_2 = KD.utils.Action.getQuestionValue("Character Field 2");
	var char_3 = KD.utils.Action.getQuestionValue("Character Field 3");
	var char_4 = KD.utils.Action.getQuestionValue("Character Field 4");
	var char_5 = KD.utils.Action.getQuestionValue("Character Field 5");
	var char_6 = KD.utils.Action.getQuestionValue("Character Field 6");
	var char_7 = KD.utils.Action.getQuestionValue("Character Field 7");
	var char_8 = KD.utils.Action.getQuestionValue("Character Field 8");
	var char_9 = KD.utils.Action.getQuestionValue("Character Field 9");
	var char_10 = KD.utils.Action.getQuestionValue("Character Field 10");
	var char_11 = KD.utils.Action.getQuestionValue("Character Field 11");
	var char_12 = KD.utils.Action.getQuestionValue("Character Field 12");
	var char_13 = KD.utils.Action.getQuestionValue("Character Field 13");
	var char_14 = KD.utils.Action.getQuestionValue("Character Field 14");
	var int_1 = KD.utils.Action.getQuestionValue("Integer Field 1");
	var int_2 = KD.utils.Action.getQuestionValue("Integer Field 2");
	var int_3 = KD.utils.Action.getQuestionValue("Integer Field 3");
	var int_4 = KD.utils.Action.getQuestionValue("Integer Field 4");
	var int_5 = KD.utils.Action.getQuestionValue("Integer Field 5");
	var int_6 = KD.utils.Action.getQuestionValue("Integer Field 6");
	var date_1 = KD.utils.Action.getQuestionValue("Date Field 1");
	var date_2 = KD.utils.Action.getQuestionValue("Date Field 2");
	var date_3 = KD.utils.Action.getQuestionValue("Date Field 3");
	var date_4 = KD.utils.Action.getQuestionValue("Date Field 4");
	var date_5 = KD.utils.Action.getQuestionValue("Date Field 5");
	var date_6 = KD.utils.Action.getQuestionValue("Date Field 6");
	var date_7 = KD.utils.Action.getQuestionValue("Date Field 7");
	var dtime_1 = KD.utils.Action.getQuestionValue("Date Time Field 1");
	var dtime_2 = KD.utils.Action.getQuestionValue("Date Time Field 2");
	var dtime_3 = KD.utils.Action.getQuestionValue("Date Time Field 3");
	var dtime_4 = KD.utils.Action.getQuestionValue("Date Time Field 4");
	var dtime_5 = KD.utils.Action.getQuestionValue("Date Time Field 5");
	var dtime_6 = KD.utils.Action.getQuestionValue("Date Time Field 6");
	var dtime_7 = KD.utils.Action.getQuestionValue("Date Time Field 7");
	var time_2 = KD.utils.Action.getQuestionValue("Time Field 2");
	var time_3 = KD.utils.Action.getQuestionValue("Time Field 3");
	var time_4 = KD.utils.Action.getQuestionValue("Time Field 4");
	var time_5 = KD.utils.Action.getQuestionValue("Time Field 5");
	var time_6 = KD.utils.Action.getQuestionValue("Time Field 6");
	var time_7 = KD.utils.Action.getQuestionValue("Time Field 7");
	var time_1 = KD.utils.Action.getQuestionValue("Time Field 1");
	var status = KD.utils.Action.getQuestionValue("Status");
	
	//create connection
	connection = new KD.utils.Callback(success, failure, []);

	// Setup a failure message that is needed by _makeSyncRequest
	connection.failure = failure;
	//get date to help prevent caching
	var now = new Date();
	//Create URL
	var updateRequestUrl = '../datamanagement/interface/callbacks/updateHelper.jsp?helperID=' + helperID
	+ '&index_1=' + encodeURIComponent(index_1)  + '&index_2=' + encodeURIComponent(index_2) + '&index_3=' + encodeURIComponent(index_3) 
	+ '&char_1=' + encodeURIComponent(char_1)  + '&char_2=' + encodeURIComponent(char_2) + '&char_3=' + encodeURIComponent(char_3) + '&char_4=' + encodeURIComponent(char_4) + '&char_5=' + encodeURIComponent(char_5) + '&char_6=' + encodeURIComponent(char_6) + '&char_7=' + encodeURIComponent(char_7) + '&char_8=' + encodeURIComponent(char_8) + '&char_9=' + encodeURIComponent(char_9) + '&char_10=' + encodeURIComponent(char_10) + '&char_11=' + encodeURIComponent(char_11) + '&char_12=' + encodeURIComponent(char_12) + '&char_13=' + encodeURIComponent(char_13) + '&char_14=' + encodeURIComponent(char_14) 
	+ '&int_1=' + encodeURIComponent(int_1) + '&int_2=' + encodeURIComponent(int_2) + '&int_3=' + encodeURIComponent(int_3) + '&int_4=' + encodeURIComponent(int_4) + '&int_5=' + encodeURIComponent(int_5) + '&int_6=' + encodeURIComponent(int_6) 
	+ '&date_1=' + encodeURIComponent(date_1) + '&date_2=' + encodeURIComponent(date_2) + '&date_3=' + encodeURIComponent(date_3) + '&date_4=' + encodeURIComponent(date_4) + '&date_5=' + encodeURIComponent(date_5) + '&date_6=' + encodeURIComponent(date_6) + '&date_7=' + encodeURIComponent(date_7)
	+ '&dtime_1=' + encodeURIComponent(processDateTimeForUrl(dtime_1)) + '&dtime_2=' + encodeURIComponent(processDateTimeForUrl(dtime_2)) + '&dtime_3=' + encodeURIComponent(processDateTimeForUrl(dtime_3)) + '&dtime_4=' + encodeURIComponent(processDateTimeForUrl(dtime_4)) + '&dtime_5=' + encodeURIComponent(processDateTimeForUrl(dtime_5)) + '&dtime_6=' + encodeURIComponent(processDateTimeForUrl(dtime_6)) + '&dtime_7=' + encodeURIComponent(processDateTimeForUrl(dtime_7));
	//Times shouldn't be passed if they aren't populated or the record will populate with midnight (12:00:00 AM)
	if (time_1 != null && time_1 != "") { updateRequestUrl = updateRequestUrl + '&time_1=' + encodeURIComponent(processTimeForUrl(time_1)); }
	if (time_2 != null && time_2 != "") { updateRequestUrl = updateRequestUrl + '&time_2=' + encodeURIComponent(processTimeForUrl(time_2)); }
	if (time_3 != null && time_3 != "") { updateRequestUrl = updateRequestUrl + '&time_3=' + encodeURIComponent(processTimeForUrl(time_3)); }
	if (time_4 != null && time_4 != "") { updateRequestUrl = updateRequestUrl + '&time_4=' + encodeURIComponent(processTimeForUrl(time_4)); }
	if (time_5 != null && time_5 != "") { updateRequestUrl = updateRequestUrl + '&time_5=' + encodeURIComponent(processTimeForUrl(time_5)); } 
	if (time_6 != null && time_6 != "") { updateRequestUrl = updateRequestUrl + '&time_6=' + encodeURIComponent(processTimeForUrl(time_6)); }
	if (time_7 != null && time_7 != "") { updateRequestUrl = updateRequestUrl + '&time_7=' + encodeURIComponent(processTimeForUrl(time_7)); }
	updateRequestUrl = updateRequestUrl + '&status=' + status + '&noCache=' + now.getTime();
	//make sync request
	KD.utils.Action._makeSyncRequest(BUNDLE.packagePath + updateRequestUrl, connection);

}


function addRecord(){
	//Display wait pop-up
	setStatusWAIT =
		new YAHOO.widget.Panel("wait", {
			width: "340px",
			fixedcenter: true,
			close: false,
			draggable: true,
			zindex: 4,
			modal: true,
			visible: false
		});

	setStatusWAIT.setHeader("Saving new Record");
	setStatusWAIT.setBody("<img src='http://l.yimg.com/a/i/us/per/gr/gp/rel_interstitial_loading.gif' />");
	setStatusWAIT.render(document.body);

	setStatusWAIT.show();

	//actions done on success of the callback
	success = function (o) {
		setStatusWAIT.hide();
		//submit page
		Dom.getElementsByClassName('templateButton', 'input', KD.utils.Util.getElementObject("Submit"))[0].click();
	};

	//actions done if the callback fails
	failure = function (o) {
		alert("An error has ocurred attempting to save the record");
		setStatusWAIT.hide();
	};

	//get values necessary to pass here
	var index_1 = KD.utils.Action.getQuestionValue("Index Field 1");
	var index_2 = KD.utils.Action.getQuestionValue("Index Field 2");
	var index_3 = KD.utils.Action.getQuestionValue("Index Field 3");
	var char_1 = KD.utils.Action.getQuestionValue("Character Field 1");
	var char_2 = KD.utils.Action.getQuestionValue("Character Field 2");
	var char_3 = KD.utils.Action.getQuestionValue("Character Field 3");
	var char_4 = KD.utils.Action.getQuestionValue("Character Field 4");
	var char_5 = KD.utils.Action.getQuestionValue("Character Field 5");
	var char_6 = KD.utils.Action.getQuestionValue("Character Field 6");
	var char_7 = KD.utils.Action.getQuestionValue("Character Field 7");
	var char_8 = KD.utils.Action.getQuestionValue("Character Field 8");
	var char_9 = KD.utils.Action.getQuestionValue("Character Field 9");
	var char_10 = KD.utils.Action.getQuestionValue("Character Field 10");
	var char_11 = KD.utils.Action.getQuestionValue("Character Field 11");
	var char_12 = KD.utils.Action.getQuestionValue("Character Field 12");
	var char_13 = KD.utils.Action.getQuestionValue("Character Field 13");
	var char_14 = KD.utils.Action.getQuestionValue("Character Field 14");
	var int_1 = KD.utils.Action.getQuestionValue("Integer Field 1");
	var int_2 = KD.utils.Action.getQuestionValue("Integer Field 2");
	var int_3 = KD.utils.Action.getQuestionValue("Integer Field 3");
	var int_4 = KD.utils.Action.getQuestionValue("Integer Field 4");
	var int_5 = KD.utils.Action.getQuestionValue("Integer Field 5");
	var int_6 = KD.utils.Action.getQuestionValue("Integer Field 6");
	var date_1 = KD.utils.Action.getQuestionValue("Date Field 1");
	var date_2 = KD.utils.Action.getQuestionValue("Date Field 2");
	var date_3 = KD.utils.Action.getQuestionValue("Date Field 3");
	var date_4 = KD.utils.Action.getQuestionValue("Date Field 4");
	var date_5 = KD.utils.Action.getQuestionValue("Date Field 5");
	var date_6 = KD.utils.Action.getQuestionValue("Date Field 6");
	var date_7 = KD.utils.Action.getQuestionValue("Date Field 7");
	var dtime_1 = KD.utils.Action.getQuestionValue("Date Time Field 1");
	var dtime_2 = KD.utils.Action.getQuestionValue("Date Time Field 2");
	var dtime_3 = KD.utils.Action.getQuestionValue("Date Time Field 3");
	var dtime_4 = KD.utils.Action.getQuestionValue("Date Time Field 4");
	var dtime_5 = KD.utils.Action.getQuestionValue("Date Time Field 5");
	var dtime_6 = KD.utils.Action.getQuestionValue("Date Time Field 6");
	var dtime_7 = KD.utils.Action.getQuestionValue("Date Time Field 7");
	var time_2 = KD.utils.Action.getQuestionValue("Time Field 2");
	var time_3 = KD.utils.Action.getQuestionValue("Time Field 3");
	var time_4 = KD.utils.Action.getQuestionValue("Time Field 4");
	var time_5 = KD.utils.Action.getQuestionValue("Time Field 5");
	var time_6 = KD.utils.Action.getQuestionValue("Time Field 6");
	var time_7 = KD.utils.Action.getQuestionValue("Time Field 7");
	var time_1 = KD.utils.Action.getQuestionValue("Time Field 1");
	var status = KD.utils.Action.getQuestionValue("Status");
	
	//create connection
	connection = new KD.utils.Callback(success, failure, []);

	// Setup a failure message that is needed by _makeSyncRequest
	connection.failure = failure;
	//get date to help prevent caching
	var now = new Date();
	//Create URL
	var createRequestUrl = '../datamanagement/interface/callbacks/createHelper.jsp?' 
	+ '&index_1=' + encodeURIComponent(index_1)  + '&index_2=' + encodeURIComponent(index_2) + '&index_3=' + encodeURIComponent(index_3) 
	+ '&char_1=' + encodeURIComponent(char_1)  + '&char_2=' + encodeURIComponent(char_2) + '&char_3=' + encodeURIComponent(char_3) + '&char_4=' + encodeURIComponent(char_4) + '&char_5=' + encodeURIComponent(char_5) + '&char_6=' + encodeURIComponent(char_6) + '&char_7=' + encodeURIComponent(char_7) + '&char_8=' + encodeURIComponent(char_8) + '&char_9=' + encodeURIComponent(char_9) + '&char_10=' + encodeURIComponent(char_10) + '&char_11=' + encodeURIComponent(char_11) + '&char_12=' + encodeURIComponent(char_12) + '&char_13=' + encodeURIComponent(char_13) + '&char_14=' + encodeURIComponent(char_14) 
	+ '&int_1=' + encodeURIComponent(int_1) + '&int_2=' + encodeURIComponent(int_2) + '&int_3=' + encodeURIComponent(int_3) + '&int_4=' + encodeURIComponent(int_4) + '&int_5=' + encodeURIComponent(int_5) + '&int_6=' + encodeURIComponent(int_6) 
	+ '&date_1=' + encodeURIComponent(date_1) + '&date_2=' + encodeURIComponent(date_2) + '&date_3=' + encodeURIComponent(date_3) + '&date_4=' + encodeURIComponent(date_4) + '&date_5=' + encodeURIComponent(date_5) + '&date_6=' + encodeURIComponent(date_6) + '&date_7=' + encodeURIComponent(date_7)
	+ '&dtime_1=' + encodeURIComponent(processDateTimeForUrl(dtime_1)) + '&dtime_2=' + encodeURIComponent(processDateTimeForUrl(dtime_2)) + '&dtime_3=' + encodeURIComponent(processDateTimeForUrl(dtime_3)) + '&dtime_4=' + encodeURIComponent(processDateTimeForUrl(dtime_4)) + '&dtime_5=' + encodeURIComponent(processDateTimeForUrl(dtime_5)) + '&dtime_6=' + encodeURIComponent(processDateTimeForUrl(dtime_6)) + '&dtime_7=' + encodeURIComponent(processDateTimeForUrl(dtime_7));
	//Times shouldn't be passed if they aren't populated or the record will populate with midnight (12:00:00 AM)
	if (time_1 != null && time_1 != "") { createRequestUrl = createRequestUrl + '&time_1=' + encodeURIComponent(processTimeForUrl(time_1)); }
	if (time_2 != null && time_2 != "") { createRequestUrl = createRequestUrl + '&time_2=' + encodeURIComponent(processTimeForUrl(time_2)); }
	if (time_3 != null && time_3 != "") { createRequestUrl = createRequestUrl + '&time_3=' + encodeURIComponent(processTimeForUrl(time_3)); }
	if (time_4 != null && time_4 != "") { createRequestUrl = createRequestUrl + '&time_4=' + encodeURIComponent(processTimeForUrl(time_4)); }
	if (time_5 != null && time_5 != "") { createRequestUrl = createRequestUrl + '&time_5=' + encodeURIComponent(processTimeForUrl(time_5)); } 
	if (time_6 != null && time_6 != "") { createRequestUrl = createRequestUrl + '&time_6=' + encodeURIComponent(processTimeForUrl(time_6)); }
	if (time_7 != null && time_7 != "") { createRequestUrl = createRequestUrl + '&time_7=' + encodeURIComponent(processTimeForUrl(time_7)); }
	createRequestUrl = createRequestUrl + '&status=' + status + '&noCache=' + now.getTime();
	//make sync request
	KD.utils.Action._makeSyncRequest(BUNDLE.packagePath + createRequestUrl, connection);

}