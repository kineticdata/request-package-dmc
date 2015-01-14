

var oTable;
var oRecipientTable;
var bridgeResultList = {};

$(document).ready(function() {
   buildRecipientTable(bridgeResultList);
   buildTable(bridgeResultList);
} );

function loadData() {
    //configure bridge connector
    var connector = new KD.bridges.BridgeConnector({templateId: clientManager.templateId});   

    //get recipient info
    connector.search('Notification Recipient', 'By Name', {
      attributes: ["Status","Scope","Type","Language","Recipient Value","Request ID","Instance ID"],
      parameters: {"Name":KD.utils.Action.getQuestionValue("_Notification Name")},
      metadata: {"order": [encodeURIComponent('<%=attribute["Request ID"]%>:ASC')]},
      success: function(list) {            
            buildRecipientTable(list.records);
            KD.utils.Action.insertElement("Add Recipient Button");
      }
    });

    //get content info    
    connector.search('Notification Content', 'By Name', {
      attributes: ["Status","Scope","Language","Subject","Body","Request ID","Instance ID"],
      parameters: {"Name":KD.utils.Action.getQuestionValue("_Notification Name")},
      metadata: {"order": [encodeURIComponent('<%=attribute["Request ID"]%>:ASC')]},
      success: function(list) {            
            buildTable(list.records);
            KD.utils.Action.insertElement("Add Content Button");
      }
    });

    KD.utils.Action.removeElement('Notification Name Section');
    KD.utils.Action.removeElement('Recipient Section');
    KD.utils.Action.removeElement('Content Section');
    KD.utils.Action.removeElement('Save Button Section');

}

function buildTable(dataArray) {
	/* Add table container and definition to container div */
	$('#notification-content-table').html( '<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" id=\"notification-table\"></table>' );
    oTable = $('#notification-table').DataTable({
        data:dataArray,
        columns:[
            {
                title:      'Instance ID',
                data:       'attributes.Instance ID',
                visible:    false
            },
            {
                title:      'Request ID',
                data:       'attributes.Request ID',
                visible:  false
            },
            {
                title:      'Status',
                data:       'attributes.Status'
            },
            {
                title:      'Scope',
                data:       'attributes.Scope'
            },
            {
                title:      'Language',
                data:       'attributes.Language'
            },
            {
                title:      'Subject',
                data:       'attributes.Subject'
            },
            {
                title:      'Body',
                data:       'attributes.Body',
                render:  function ( data, type, full, meta ) {
                     return data.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                   }
            },
            {
                title:          '',
                data:           null,
                defaultContent: "<button class='btn-edit' value='Edit'>Edit</button>",
                orderable:      false
            }
        ],
        searching: false,
        pageLength: 10,
        lengthChange: false,
        order: [[3,'asc']]
    });
    $('#notification-content-table table tbody').on( 'click', 'button', function () {
        var row = $(this).parents('tr'),
            index = oTable.row( row ).index(),
            data = oTable.row( row ).data();
        if (this.value=="Edit") {
            //set flag identifying this is a notification edit (requestid?)

			//Remove table sections to make it clear the user is now editting
			KD.utils.Action.removeElement('Content Table Section');
			KD.utils.Action.removeElement('Recipient Table Section');
			KD.utils.Action.setReadOnly('_Notification Name');
			KD.utils.Action.removeElement('Buttons');
			
            //show notification content section
            KD.utils.Action.insertElement('Save Button Section');
            KD.utils.Action.insertElement('Content Section');
            KD.utils.Action.removeElement('Notification Name Section');
            KD.utils.Action.removeElement('Recipient Section');
            KD.utils.Action.setReadWrite('Content Status');

            //populate notification content fields per the data in the row
            if (data.attributes['Scope']=="Global") {
                KD.utils.Action.setQuestionValue('Notification Scope','Global');
                KD.utils.Action.removeElement('_NotificationScopeSelection');
            } else {
                KD.utils.Action.setQuestionValue('Notification Scope','Non Global');
                KD.utils.Action.insertElement('_NotificationScopeSelection');
                KD.utils.Action.setQuestionValue('_NotificationScopeSelection',data.attributes['Scope']);
            }
            KD.utils.Action.setQuestionValue('Scope',data.attributes['Scope']);

            if (data.attributes['Language'] == "Default") {
                KD.utils.Action.setQuestionValue('_LanguageScope','Default');
                KD.utils.Action.removeElement('_LanguageSelection');
            } else {
                KD.utils.Action.setQuestionValue('_LanguageScope','Specific language');
                KD.utils.Action.insertElement('_LanguageSelection');
                KD.utils.Action.setQuestionValue('_LanguageSelection',data.attributes['Language']);
            }
            KD.utils.Action.setQuestionValue('Language',data.attributes['Language']);

            KD.utils.Action.setQuestionValue('Subject Line',data.attributes['Subject']);
            KD.utils.Action.setQuestionValue('Message Body',data.attributes['Body']);
            KD.utils.Action.setQuestionValue('Content Request ID',data.attributes['Request ID']);
            KD.utils.Action.setQuestionValue('Content Status',data.attributes['Status']);
            KD.utils.Action.setQuestionValue('Modification Type','Updated Content');
        }
    } );
}


function buildRecipientTable(dataArray) {
	/* Add table container and definition to container div */
	$('#notification-recipient-table').html( '<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" id=\"recipient-table\"></table>' );
    oRecipientTable = $('#recipient-table').DataTable({
        data:dataArray,
        columns:[
            {
                title:      'Instance ID',
                data:       'attributes.Instance ID',
                visible:    false
            },
            {
                title:      'Request ID',
                data:       'attributes.Request ID',
                visible:  false
            },
            {
                title:      'Status',
                data:       'attributes.Status'
            },
            {
                title:      'Scope',
                data:       'attributes.Scope'
            },
            {
                title:      'Use Content Language',
                data:       'attributes.Language'
            },
            {
                title:      'Type',
                data:       'attributes.Type'
            },
            {
                title:      'Recipient(s)',
                data:       'attributes.Recipient Value'
            },
            {
                title:          '',
                data:           null,
                defaultContent: "<button class='btn-edit' value='Edit'>Edit</button>",
                orderable:      false
            }
        ],
        searching: false,
        pageLength: 10,
        lengthChange: false
    });
    $('#notification-recipient-table table tbody').on( 'click', 'button', function () {
        var row = $(this).parents('tr'),
            index = oRecipientTable.row( row ).index(),
            data = oRecipientTable.row( row ).data();
        if (this.value=="Edit") {
            //set flag identifying this is a recipient edit (requestid?)
			
			//Remove table sections to make it clear the user is now editting
			KD.utils.Action.removeElement('Content Table Section');
			KD.utils.Action.removeElement('Recipient Table Section');
			KD.utils.Action.setReadOnly('_Notification Name');
			KD.utils.Action.removeElement('Buttons');

            //show recipient section
            KD.utils.Action.insertElement('Save Button Section');
            KD.utils.Action.insertElement('Recipient Section');
            KD.utils.Action.insertElement('Recipient Type');
            KD.utils.Action.insertElement('_RecipientScope');
            KD.utils.Action.insertElement('_RecipientLanguage');
            KD.utils.Action.removeElement('Notification Name Section');
            KD.utils.Action.removeElement('Content Section');
            KD.utils.Action.setReadWrite('Recipient Status');

            //populate recipient fields per the data in the row
            KD.utils.Action.setQuestionValue('Predefined Recipient','Predefined recipient');
            KD.utils.Action.setReadOnly('Predefined Recipient');

            if (data.attributes['Scope']=="Global") {
                KD.utils.Action.setQuestionValue('_RecipientScope','Global');
                KD.utils.Action.removeElement('_RecipientScopeSelection');
            } else {
                KD.utils.Action.setQuestionValue('_RecipientScope','Non Global');
                KD.utils.Action.insertElement('_RecipientScopeSelection');
                KD.utils.Action.setQuestionValue('_RecipientScopeSelection',data.attributes['Scope']);
            }
            KD.utils.Action.setQuestionValue('Recipient Scope',data.attributes['Scope']);

            if (data.attributes['Language'] == "Default") {
                KD.utils.Action.setQuestionValue('_RecipientLanguage','Default');
                KD.utils.Action.removeElement('_RecipientLanguageSelection');
            } else {
                KD.utils.Action.setQuestionValue('_RecipientLanguage','Specific language');
                KD.utils.Action.insertElement('_RecipientLanguageSelection');
                KD.utils.Action.setQuestionValue('_RecipientLanguageSelection',data.attributes['Language']);
            }
            KD.utils.Action.setQuestionValue('Recipient Language',data.attributes['Language']);

            KD.utils.Action.setQuestionValue('Recipient Type',data.attributes['Type']);
            if (data.attributes['Type'] != "Catalog Role") {
                KD.utils.Action.removeElement('_RecipientValueRole');
                KD.utils.Action.insertElement('Recipient Value');
            } else {
                KD.utils.Action.insertElement('_RecipientValueRole');
                KD.utils.Action.setQuestionValue('_RecipientValueRole',data.attributes['Recipient Value']);
            }
            KD.utils.Action.setQuestionValue('Recipient Value',data.attributes['Recipient Value']);


            KD.utils.Action.setQuestionValue('Recipient Request ID',data.attributes['Request ID']);
            KD.utils.Action.setQuestionValue('Recipient Status',data.attributes['Status']);
            KD.utils.Action.setQuestionValue('Modification Type','Updated Recipient');
        }
    } );
}

function save() {
    //determine what is being saved
    var modType = KD.utils.Action.getQuestionValue('Modification Type'),
          fieldCheck=false,
          saveData={};

    if (modType=="Updated Recipient") {
        saveData['Helper Entry ID'] = KD.utils.Action.getQuestionValue("Recipient Request ID");
        saveData['Status'] = KD.utils.Action.getQuestionValue("Recipient Status");
        saveData['Helper Entry Type'] = "Notification Recipient";
        saveData['Notification Name'] = KD.utils.Action.getQuestionValue("_Notification Name");
        saveData['Index3'] = KD.utils.Action.getQuestionValue("Recipient Scope");
        saveData['Char1'] = KD.utils.Action.getQuestionValue("Recipient Type");
        saveData['Char2'] = KD.utils.Action.getQuestionValue("Recipient Language");
        saveData['Char13'] = KD.utils.Action.getQuestionValue("Recipient Value");

        var fieldCheck = checkFields(saveData);
        if (!fieldCheck) {
            alert('A required field is missing');
        } else {
            //call update function
            //alert('Call update function - Recipient');
            updateRecord(saveData);
        }
    }
    if (modType=="Updated Content") {
        saveData['Helper Entry ID'] = KD.utils.Action.getQuestionValue("Content Request ID");
        saveData['Status'] = KD.utils.Action.getQuestionValue("Content Status");
        saveData['Helper Entry Type'] = "Notification Content";
        saveData['Notification Name'] = KD.utils.Action.getQuestionValue("_Notification Name");
        saveData['Index3'] = KD.utils.Action.getQuestionValue("Scope");
        saveData['Char1'] = KD.utils.Action.getQuestionValue("Language");
        saveData['Char13'] = KD.utils.Action.getQuestionValue("Subject Line");
        saveData['Char14'] = KD.utils.Action.getQuestionValue("Message Body");

        var fieldCheck = checkFields(saveData);
        if (!fieldCheck) {
            alert('A required field is missing');
        } else {
            //call update function
            //alert('Call update function - Content');
            updateRecord(saveData);
        }
    }
    if (modType=="New Recipient") {
        saveData['Status'] = KD.utils.Action.getQuestionValue("Recipient Status");
        saveData['Helper Entry Type'] = "Notification Recipient";
        saveData['Notification Name'] = KD.utils.Action.getQuestionValue("_Notification Name");
        saveData['Index3'] = KD.utils.Action.getQuestionValue("Recipient Scope");
        saveData['Char1'] = KD.utils.Action.getQuestionValue("Recipient Type");
        saveData['Char2'] = KD.utils.Action.getQuestionValue("Recipient Language");
        saveData['Char13'] = KD.utils.Action.getQuestionValue("Recipient Value");

        var fieldCheck = checkFields(saveData);
        if (!fieldCheck) {
            alert('A required field is missing');
        } else {
            //call update function
            //alert('Call add function - Recipient');
            addRecord(saveData);
        }
    }
    if (modType=="New Content") {
        saveData['Status'] = KD.utils.Action.getQuestionValue("Content Status");
        saveData['Helper Entry Type'] = "Notification Content";
        saveData['Notification Name'] = KD.utils.Action.getQuestionValue("_Notification Name");
        saveData['Index3'] = KD.utils.Action.getQuestionValue("Scope");
        saveData['Char1'] = KD.utils.Action.getQuestionValue("Language");
        saveData['Char13'] = KD.utils.Action.getQuestionValue("Subject Line");
        saveData['Char14'] = KD.utils.Action.getQuestionValue("Message Body");

        var fieldCheck = checkFields(saveData);
        if (!fieldCheck) {
            alert('A required field is missing');
        } else {
            //call update function
            //alert('Call add function - Content');
            addRecord(saveData);
        }
    }
    if (modType=="New Notification") {
        //submit up to two entries -- one for recipient and one for content

        //first - notification content
        saveData['Status'] = KD.utils.Action.getQuestionValue("Content Status");
        saveData['Helper Entry Type'] = "Notification Content";
        saveData['Notification Name'] = KD.utils.Action.getQuestionValue("Notification Name");
        saveData['Index3'] = KD.utils.Action.getQuestionValue("Scope");
        saveData['Char1'] = KD.utils.Action.getQuestionValue("Language");
        saveData['Char13'] = KD.utils.Action.getQuestionValue("Subject Line");
        saveData['Char14'] = KD.utils.Action.getQuestionValue("Message Body");

        var fieldCheck = checkFields(saveData);
        if (!fieldCheck) {
            alert('A required field is missing from the content section');
        } else {
            //call update function
            //alert('Call add function - New Notification - Content');
            addRecord(saveData);
        }

        //next notification recipient 
        if (KD.utils.Action.getQuestionValue("Predefined Recipient")=="Predefined recipient") {
            saveData={};
            saveData['Status'] = KD.utils.Action.getQuestionValue("Recipient Status");
            saveData['Helper Entry Type'] = "Notification Recipient";
            saveData['Notification Name'] = KD.utils.Action.getQuestionValue("Notification Name");
            saveData['Index3'] = KD.utils.Action.getQuestionValue("Recipient Scope");
            saveData['Char1'] = KD.utils.Action.getQuestionValue("Recipient Type");
            saveData['Char2'] = KD.utils.Action.getQuestionValue("Recipient Language");
            saveData['Char13'] = KD.utils.Action.getQuestionValue("Recipient Value");

            var fieldCheck = checkFields(saveData);
            if (!fieldCheck) {
                alert('A required field is missing from the recipient section');
            } else {
                //call update function
                //alert('Call add function - New Notification - Recipient');
                addRecord(saveData);
            }
        }
    }
	
	
}

function exitEdit() {
	//remove edit sections
	KD.utils.Action.removeElement('Content Section');
	KD.utils.Action.removeElement('Recipient Section');
	KD.utils.Action.removeElement('Save Button Section');
	//Insert table sections to because edit is exited
	KD.utils.Action.insertElement('Content Table Section');
	KD.utils.Action.insertElement('Recipient Table Section');
	KD.utils.Action.insertElement('Add Content Button');
	KD.utils.Action.insertElement('Add Recipient Button');
	KD.utils.Action.setReadWrite('_Notification Name');
	KD.utils.Action.insertElement('Buttons');
}

function confirmExit(){

    $( "#dialog" ).html("Your changes will not be saved. Are you sure?").dialog({
      modal: true,
      buttons: {
        "Don't Save": function() {
          $( this ).dialog( "close" );
		  $( "#dialog" ).html("");
		  exitEdit();
        },
        Cancel: function() {
          $( this ).dialog( "close" );
		  $( "#dialog" ).html("");
        }
      }
    });
  }
  
  function displaySaveError(type){
	var errMessage = "";
	if (type == "Notification Recipient") { errMessage = "This combination of Notification Name, Scope, Language, and Recipient Type already existed. The recipient was not added.";}
	else { errMessage = "This combination of Notification Name, Scope, and Language already existed. The message was not added.";}
    $( "#dialog" ).html(errMessage).dialog({
      modal: true,
      buttons: {
        OK: function() {
          $( this ).dialog( "close" );
		  $( "#dialog" ).html("");
        }
      }
    });
  }
 
function checkFields(saveData){
    var hasAllValues=true;

    for (var name in saveData){
        if (!saveData.hasOwnProperty(name)) continue;
        if (saveData[name]=="") {
            //alert(name);
            hasAllValues=false;
            break;
        }
    }

    return hasAllValues;
}

function checkSMTP(value){
  var match = value.match(/^([\w-\.]+\@[\w\.-]+\.[a-zA-Z]{2,4})(,\s*[\w-\.]+\@[\w\.-]+\.[a-zA-Z]{2,4})*$/g);
  if (match == "" || match == null) {
	 $( "#dialog" ).html("It appears this may not be a valid list of SMTP addresses, please verify your input.").dialog({
      modal: true,
      buttons: {
        OK: function() {
          $( this ).dialog( "close" );
		  $( "#dialog" ).html("");
        }
      }
    });
  }
}

function addRecord(saveData){
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

	//get values necessary to pass here
	var permission = "0;";
	var index_1 = saveData['Helper Entry Type'];
	var index_2 = saveData['Notification Name'];
	var index_3 = saveData['Index3'];;
	var char_1 = saveData['Char1'];
	var char_2 = (saveData['Char2']) ? saveData['Char2'] : "";
	var char_3 = "";
	var char_4 = "";
	var char_5 = "";
	var char_6 = "";
	var char_7 = "";
	var char_8 = "";
	var char_9 = "";
	var char_10 = "";
	var char_11 = "";
	var char_12 = "";
	var char_13 = saveData['Char13'];
	var char_14 = (saveData['Char14']) ? saveData['Char14'] : "";
	var int_1 = "";
	var int_2 = "";
	var date_1 = "";
	var date_2 = "";
	var dtime_1 = "";
	var dtime_2 = "";
	var time_2 = null;
	var time_1 = null;
	var status = saveData['Status'];

	var createRecordResult = $.ajax({
		type: "post",
		url: BUNDLE.packagePath + "../notifications/interface/callbacks/createNotification.jsp",
		cache: false,
		data: {	
				index_1: 	index_1,
				index_2: 	index_2,
				index_3:	index_3,
				char_1:		char_1,
				char_2:		char_2,
				char_3:		char_3,
				char_4:		char_4,
				char_5:		char_5,
				char_6:		char_6,
				char_7:		char_7,
				char_8:		char_8,
				char_9:		char_9,
				char_10:	char_10,
				char_11:	char_11,
				char_12:	char_12,
				char_13:	char_13,
				char_14:	char_14,
				int_1:		int_1,
				int_2:		int_2,
				date_1:		date_1,
				date_2:		date_2,
				dtime_1:	dtime_1,
				dtime_2:	dtime_2,
				status:		status,
				permission: permission
				}
	}).done(function(data, textStatus, jqXHR){
		setStatusWAIT.hide();
				if (data.indexOf("null") != -1) {displaySaveError(index_1);
				} else {
				reactivateAdd();
                KD.utils.Action._fireChange(KD.utils.Util.getQuestionInput('Modification Type'));
					//Refresh table(s)
                loadData();
				}

	
	}).fail(function( jqXHR, textStatus, errorThrown){
		alert(jqXHR.status);
        alert(errorThrown);
		setStatusWAIT.hide();
	})
	
	return createRecordResult;

}

function updateRecord(saveData){

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

	//get values necessary to pass here
	var permission = "0;"
	var helperID = saveData['Helper Entry ID'];
	var index_1 = saveData['Helper Entry Type'];
	var index_2 = saveData['Notification Name'];
	var index_3 = saveData['Index3'];;
	var char_1 = saveData['Char1'];
	var char_2 = (saveData['Char2']) ? saveData['Char2'] : "";
	var char_3 = "";
	var char_4 = "";
	var char_5 = "";
	var char_6 = "";
	var char_7 = "";
	var char_8 = "";
	var char_9 = "";
	var char_10 = "";
	var char_11 = "";
	var char_12 = "";
	var char_13 = saveData['Char13'];
	var char_14 = (saveData['Char14']) ? saveData['Char14'] : "";
	var int_1 = "";
	var int_2 = "";
	var date_1 = "";
	var date_2 = "";
	var dtime_1 = "";
	var dtime_2 = "";
	var time_2 = null;
	var time_1 = null;
	var status = saveData['Status'];
	
	var updateRecordResult = $.ajax({
		type: "post",
		url: BUNDLE.packagePath + "../notifications/interface/callbacks/updateNotification.jsp",
		cache: false,
		data: {	helperID: 	helperID, 
				index_1: 	index_1,
				index_2: 	index_2,
				index_3:	index_3,
				char_1:		char_1,
				char_2:		char_2,
				char_3:		char_3,
				char_4:		char_4,
				char_5:		char_5,
				char_6:		char_6,
				char_7:		char_7,
				char_8:		char_8,
				char_9:		char_9,
				char_10:	char_10,
				char_11:	char_11,
				char_12:	char_12,
				char_13:	char_13,
				char_14:	char_14,
				int_1:		int_1,
				int_2:		int_2,
				date_1:		date_1,
				date_2:		date_2,
				dtime_1:	dtime_1,
				dtime_2:	dtime_2,
				permission: permission,
				status:		status
				},
		error: function(jqXHR, textStatus, errorThrown){
			alert(jqXHR.status);
			alert(errorThrown);
			setStatusWAIT.hide();
			return false;
		},
		success: function(){
			setStatusWAIT.hide();
			reactivateAdd();
			KD.utils.Action._fireChange(KD.utils.Util.getQuestionInput('Modification Type'));
			//Refresh table(s)
			loadData();
		}
	})

	return updateRecordResult;
}

function reactivateAdd() {

	//Insert table sections to because add/edit is complete
	KD.utils.Action.insertElement('Content Table Section');
	KD.utils.Action.insertElement('Recipient Table Section');
	KD.utils.Action.insertElement('Add Content Button');
	KD.utils.Action.insertElement('Add Recipient Button');
	KD.utils.Action.setReadWrite('_Notification Name');
	KD.utils.Action.insertElement('Buttons');
}
