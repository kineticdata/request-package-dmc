var oParamTable;
var oTable;

//initially set the data row column to be 2 as that is always the first when added to blank.
//when displaying an existing structure, reset this based on the number of data columns
//also when deleting a row, reset this based on the remaining number of coulumns...or, completely reset each row's "table order" column value
var dataRows=2;
var tableOrder;
var dmcTable;
var tableDnd;

$(document).ready(function() {
} );

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

function loadAddUpdate() {
	//purposefully doesn't have 'var' before it as it is used elsewhere in this JS file and in 
	//other client-side events...change this when namespaced to this.type
	type = getParameter("type");
	
	var dataModelId = getParameter("dataModel");

	//process the add or update display
	if (type == "add" || type == "") {
		definitionTableBuild();
		KD.utils.Action.insertElement("Add Button");
		//nothing to do, the default display is add
	} else if (type == "update") {
		var helperId = getParameter("helperId");
		KD.utils.Action.insertElement("Update Button");
		loadUpdate(helperId);
	} 

}

function loadUpdate(helperId) {
 //Get values from existing record
	if (helperId) {
		//Store the KS_SRV_Helper record's Request ID for use when appying the update.
		KD.utils.Action.setQuestionValue("Data Type Definition Request ID", helperId);
		//Show the status field
		KD.utils.Action.insertElement('Status');
		
		//get data model details
		var connector2 = new KD.bridges.BridgeConnector({templateId: clientManager.templateId});
		
		connector2.retrieve('Data Management Console - Helper Data', 'By Record Id', {
		  attributes: ["Character Field 1","Character Field 2","Character Field 3","Character Field 4","Character Field 5","Character Field 6", "Character Field 7","Character Field 8","Character Field 9","Character Field 10","Character Field 11","Character Field 12","Character Field 13","Character Field 14",
		  "Index Field 1","Index Field 2","Index Field 3",
		  "Integer Field 1","Integer Field 2","Integer Field 3","Integer Field 4","Integer Field 5","Integer Field 6",
		  "Permission","Status"],
		  parameters: {'Record Id':helperId},
		  success: function(record) {
				//place the existing values in the relevant fields
				KD.utils.Action.setQuestionValue("Data Type Name", record.attributes["Character Field 1"]);
				KD.utils.Action.setQuestionValue("Status", record.attributes["Status"]);
				KD.utils.Action.setQuestionValue("Category Level 1", record.attributes["Character Field 10"]);
				KD.utils.Action.setQuestionValue("Category Level 2", record.attributes["Character Field 11"]);
				KD.utils.Action.setQuestionValue("Category Level 3", record.attributes["Character Field 12"]);
				KD.utils.Action.setQuestionValue("Data Type Definition JSON", record.attributes["Character Field 13"]);
				KD.utils.Action.setQuestionValue("Data Type Access Permissions", record.attributes["Permission"]);
				
				var dataModel = KD.utils.Action.getQuestionValue("Data Type Definition JSON");
				//purposefully doesn't have 'var' before it...change this when namespaced to this.dataModelJson
				dataModelJSON = JSON.parse(dataModel);
				definitionTableBuild(dataModelJSON.datatypestructure.tablestructure);
				
				KD.utils.Action.setQuestionValue("Service Item for editing data", dataModelJSON.formConfig.formName);
				KD.utils.Action.setQuestionValue("Bridge Model", dataModelJSON.bridgedata.bridgename);
				KD.utils.Action._fireChange(KD.utils.Util.getQuestionInput("Bridge Model"));
				
				//rest of workflow happens from within events attached to questions	
		  }
		});
    }		
}

//When the Data definition itself is being edited, retrieve the UniqueID values from the table
//This function is called from a client-side event on the 'Unique ID Field'
function setUniqueIDRowOnUpdate() {
	var uniqueIDData=oTable.fnGetData(getUniqueIDRow());
	if (uniqueIDData){
		KD.utils.Action.setQuestionValue('Unique ID Field',uniqueIDData[2]);
		KD.utils.Action.setQuestionValue('Unique ID Field Label',uniqueIDData[3]);
		KD.utils.Action.setQuestionValue('Unique ID Visible in Table',uniqueIDData[4]);
	}
}

//When the Data definition itself is being edited, retrieve the UniqueID values from the table
//This function is called from a client-side event on the 'Status field'
function setStatusRowOnUpdate() {
	var statusData=oTable.fnGetData(getStatusRow());
	if (statusData){
		KD.utils.Action.setQuestionValue('Status field',statusData[2]);
		KD.utils.Action.setQuestionValue('Status field label',statusData[3]);
		KD.utils.Action.setQuestionValue('Status toggle options',statusData[6]);
	}
}

function definitionTableBuild(dataArray) {
	var tableArray=[];
	if (type=="update" && dataArray){
		tableArray=dataArray;
	}
	
	/* Add table container and definition to container div */
	$('#dataDefinitionTable').html( '<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" id=\"dmcDataDefinitionTable\"></table>' );

	oTable = $('#dmcDataDefinitionTable').dataTable({
        "fnCreatedRow": function( nRow, aData, iDataIndex ) {
			if ( aData[0] != "Data Columns") {
				$('td', nRow).closest('tr').attr({NoDrag: "true",NoDrop: "true"});
			} else { dataRows++; }
		},
		"fnDrawCallback": function ( oSettings ) {
            if ( oSettings.aiDisplay.length == 0 )
            {
                return;
            }
             
            var nTrs = $('#dmcDataDefinitionTable tbody tr');
            var iColspan = nTrs[0].getElementsByTagName('td').length;
            var sLastGroup = "";
            for ( var i=0 ; i<nTrs.length ; i++ )
            {
                var iDisplayIndex = oSettings._iDisplayStart + i;
                var sGroup = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[0];
				
                if ( sGroup != sLastGroup )
                {
                    var nGroup = document.createElement( 'tr' );
                    var nCell = document.createElement( 'td' );
                    nCell.colSpan = iColspan;
                    nCell.className = "group";
                    nCell.innerHTML = sGroup;
                    nGroup.appendChild( nCell );
                    nTrs[i].parentNode.insertBefore( nGroup, nTrs[i] );
					$('#dmcDataDefinitionTable tbody tr .group').each(function(){
						$(this).closest('tr').attr({NoDrag:"true",NoDrop:"true"});
					});
                    sLastGroup = sGroup;
                }
            }
        },
		"aaData":tableArray,
		"aoColumns":[
			{
				"sTitle":"Group",
				"sClass":"thGroup",
				"bVisible":false,
				"mRender": function ( data, sort, row ) {
                    if (data=="Unique ID Column") {
					   return 1; }
					else if (data=="Status Column") {
						return 3; }
					else {return 2;}
                }
			},
			{
				"sTitle":"Table order",
				"sClass":"thTableorder",
				"bVisible":true,
				"bSortable":false,
				"sType":"numeric"
			},
			{"sTitle":"Source field","sClass":"thSourcefield","bVisible":true,"bSortable":false},
			{"sTitle":"Label","sClass":"thLabel","bVisible":true,"bSortable":false},
			{
				"sTitle":"Visible",
				"sClass":"thVisible",
				"bVisible":true,
				"bSortable":false,
				"mRender": function ( data, display, row ) {
                    //alert(data);
					if (data=="Visible in Table") {
						return "Yes"; }
					else {return data;}
                }
			},
			{"sTitle":"Type","sClass":"thType","bVisible":true,"bSortable":false},
			{"sTitle":"Selection options","sClass":"thSelectionoptions","bVisible":true,"bSortable":false},
			{"sTitle":"Input length","sClass":"thInputlength","bVisible":true,"bSortable":false},
			{"sTitle":"Default value","sClass":"thDefaultvalue","bVisible":true,"bSortable":false},
			{"sTitle":"Required","sClass":"thRequired","bVisible":true,"bSortable":false},
			{"sTitle":"Locked","sClass":"thLocked","bVisible":true,"bSortable":false},
			{"sTitle":"Help text","sClass":"thHelptext","bVisible":true,"bSortable":false}
		],
        "aaSortingFixed": [[ 0, 'asc' ]],
        "aaSorting": [[ 1, 'asc' ]],
		"bFilter": false,
		"bPaginate":false,
		"bDestroy":true,
		"sDom": 'T<"clear">rt',
		"oTableTools":{
		   "sRowSelect": "single",
		   "aButtons": [
				{
					"sExtends":    "text",
					"sButtonText": "Edit Row",
					"fnClick": function( nButton, oConfig, oFlash ) {
						var anSelected = TableTools.fnGetInstance( 'dmcDataDefinitionTable' ).fnGetSelected();
						if ( anSelected.length != 0 ) {
							//call the dataRow function and pass the current TR.  This will be used to populate
							//the current data as well as update the row when the user clicks Add

							var colType=oTable.fnGetData(anSelected[0])[0];
							if (colType=="Data Columns"){
								editDataRow(anSelected[0])
							} else if (colType=="Unique ID Column"){
								KD.utils.ClientManager.alertPanel(
									{
										header: "Unique ID Row",
										body: "Edit the 'Unique ID column' data by using the 'Data Source Unique ID Details' section, above."
									}
								);
							} else if (colType=="Status Column"){
								KD.utils.ClientManager.alertPanel(
									{
										header: "Status Row",
										body: "Edit the 'Status column' data by using the 'Data Source Status Details' section, above."
									}
								);
							}
						};
					}
				},
				{
					"sExtends":    "text",
					"sButtonText": "Delete Row",
					"fnClick": function( nButton, oConfig, oFlash ) {
						var anSelected = TableTools.fnGetInstance( 'dmcDataDefinitionTable' ).fnGetSelected();
						var colType=oTable.fnGetData(anSelected[0])[0];
						if ( anSelected.length !== 0 && colType == "Data Columns") {
							oTable.fnDeleteRow( anSelected[0] );

						//reset dataRows variable
						dataRows=2;
						
						//Loop through aoData, do not redraw table while looping.
						$('#dmcDataDefinitionTable tbody tr').find('.thTableorder').each(function(){ 
							//if the value is a number
							if (!isNaN($(this).text())){
								mytr=$(this).closest('tr').get(0);
								oTable.fnUpdate(dataRows,mytr,1,false)
								dataRows++
							}; 
						});

						//reDraw Table
						oTable.fnDraw();
						
						} else if ( anSelected.length !== 0 && colType=="Unique ID Column"){
							KD.utils.ClientManager.alertPanel(
								{
									header: "Unique ID Row",
									body: "The 'Unique ID column' is required and cannot be deleted."
								}
							);
						} else if ( anSelected.length !== 0 && colType=="Status Column"){
							KD.utils.ClientManager.alertPanel(
								{
									header: "Status Row",
									body: "The 'Status column' is required and cannot be deleted."
								}
							);
						}
					}
				}
			]
		}
    });
	
	dmcTable = document.getElementById('dmcDataDefinitionTable');
	tableDnD = new TableDnD();
	tableDnD.init(dmcTable);
}

function uniqueIDRow() {
	var row=getUniqueIDRow();
	var dataArray = [
		"Unique ID Column",
		"First",
		KD.utils.Action.getQuestionValue('Unique ID Field'),
		KD.utils.Action.getQuestionValue('Unique ID Field Label'),
		KD.utils.Action.getQuestionValue('Unique ID Visible in Table'),
		"",
		"",
		"",
		"",
		"Automatic",
		"",
		""
	];
	
	addOrUpdateRow(dataArray,row,"Unique ID Row");
}

function statusRow() {
	var toggleOptions = KD.utils.Action.getQuestionValue('Status toggle options');
	if (toggleOptions=="" || toggleOptions.indexOf('::')<0){
		//would be considered error 601
		//ToDo:  Make this optional.  IF user doesn't want to toggle data, they would indicate "Not available" and this wouldn't be required.
		//       It would also need to not enable the 'Toggle' button on the DMC.
		
		//ToDo:  Update code to handle this in the DMC
		KD.utils.ClientManager.alertPanel(
			{
				header: "Missing data",
				body: "The 'Status toggle options' field must be completed."
			}
		);
		return false;
	}
	
	var row=getStatusRow();
	var dataArray=[
        "Status Column",
		"Last",
        KD.utils.Action.getQuestionValue('Status field'),
		KD.utils.Action.getQuestionValue('Status field label'),
        "Yes",
		"",
		KD.utils.Action.getQuestionValue('Status toggle options'),
		"",
		"",
		"Yes",
        "",
		"" 
	];
	
	addOrUpdateRow(dataArray,row,"Status Row");
}

function editDataRow(rowTR) {
	//Retrieve data
	var rowData = oTable.fnGetData(rowTR);
	
	//Set Data into fields
	tableOrder = rowData[1];
	KD.utils.Action.setQuestionValue('Data Source Field',rowData[2]);
	KD.utils.Action.setQuestionValue('Field Label',rowData[3]);
	KD.utils.Action.setQuestionValue('Field Visible in Table',rowData[4]);
	KD.utils.Action.setQuestionValue('Field Type',rowData[5]);
    KD.utils.Action.setQuestionValue('Field Selection Options',rowData[6]);
	KD.utils.Action.setQuestionValue('Field Length',rowData[7]);
	KD.utils.Action.setQuestionValue('Field Default Value',rowData[8]);
	KD.utils.Action.setQuestionValue('Field is Required',rowData[9]);
	KD.utils.Action.setQuestionValue('Field is Locked for Editing',rowData[10]);
    KD.utils.Action.setQuestionValue('Field Help Text',rowData[11]);
	
	//fire change event on field type to display and require related elements.
	KD.utils.Action._fireChange(KD.utils.Util.getQuestionInput('Field Type'));
		
	KD.utils.Action.insertElement('Update Cancel Data Row Buttons');
	KD.utils.Action.removeElement('Add Data Row Button');
}

function checkRequiredValue(row) {
	var errorCode;
	var messageHeader;
	var messageBody;
	
	var field_dsf = KD.utils.Action.getQuestionValue('Data Source Field');
	var field_fl = KD.utils.Action.getQuestionValue('Field Label');
	var field_ft = KD.utils.Action.getQuestionValue('Field Type');
	var field_fso = KD.utils.Action.getQuestionValue('Field Selection Options');
    var field_fr = KD.utils.Action.getQuestionValue('Field is Required');
	
	//only do this function if an earlier one hasn't already found an error.
	//ToDo: loop through these to determine what's missing and add it to the message...possibly even adding stylig?  The 'Add' function and reset style?
	if (!errorCode && (field_dsf=="" || field_fl=="" || field_ft=="" || field_fr=="")){
		errorCode = "102";
		messageHeader = "Missing field value";
		messageBody = "'Data source field', 'Field label', 'Field type', and 'Field is required' must be completed before adding this column to the data definition.";
	}
	
	if(!errorCode && (field_dsf!="")) {
		$('#dmcDataDefinitionTable tbody tr').find('.thSourcefield').each(function(){ 
			if ($(this).parent().get(0) != row) {
				if ($(this).text()==field_dsf){
					errorCode = "101";
					messageHeader = 'Duplicate field';
					messageBody = "Field " + field_dsf + " has already been added to the table.";
				}; 
			}
		})
	}
	
	//only do this function if the earlier one hasn't already found an error.
	if (!errorCode){
		if (field_ft=="Text - Selection list" && field_fso==""){
			errorCode = "103";
			messageHeader = "Missing 'Field selection options'";
			messageBody = "'Field selection options' must be defined when the field type is 'Text - Selection List'.";
		}
	}
    
	return {
        error: errorCode,
        messageHeader: messageHeader,
		messageBody: messageBody
    }
}

//no longer need to pass in the type
function dataRow(type) {
	var row;
	var myDataRow=dataRows;
	if (tableOrder && tableOrder!=null){
		//Need to populate this with the TR if we are updating a row...will need to use jQuery to retrieve selected row
		var updateRowTR=$('#dmcDataDefinitionTable .DTTT_selected').get(0);
		//alert(updateRowTR);
		row = updateRowTR;
		myDataRow=tableOrder;
	}
	
	var check = checkRequiredValue(row)
	
	if (check.error && check.error!=""){
		KD.utils.ClientManager.alertPanel(
			{
				header: check.messageHeader,
				body: check.messageBody
			}
		);
		return false;
	}
	
	
	var dataArray=[
        "Data Columns",
		myDataRow,
        KD.utils.Action.getQuestionValue('Data Source Field'),
		KD.utils.Action.getQuestionValue('Field Label'),
		KD.utils.Action.getQuestionValue('Field Visible in Table'),
		KD.utils.Action.getQuestionValue('Field Type'),
        KD.utils.Action.getQuestionValue('Field Selection Options'),
		KD.utils.Action.getQuestionValue('Field Length'),
		KD.utils.Action.getQuestionValue('Field Default Value'),
		KD.utils.Action.getQuestionValue('Field is Required'),
		KD.utils.Action.getQuestionValue('Field is Locked for Editing'),
        KD.utils.Action.getQuestionValue('Field Help Text')
	];
	
	addOrUpdateRow(dataArray,row,"Data Row");
	tableDnD.init(dmcTable);
	
	//Only update dataRows counter when it is a new row.
	/*if (!tableOrder || tableOrder==null){
		dataRows++;
	}*/

	//Reset fields and buttons
	dataRowUpdateClear();
}

function dataRowUpdateClear() {
	//ensure the TableOrder value is reset
	tableOrder=null;

	//Clear the selection as well
	//$('#dmcDataDefinitionTable .DTTT_selected').removeClass('DTTT_selected');
	TableTools.fnGetInstance( 'dmcDataDefinitionTable' ).fnSelectNone();
	
	//clear the data column fields
	clearDataColumnFields();
	
	//reset buttons
	KD.utils.Action.removeElement('Update Cancel Data Row Buttons');
	KD.utils.Action.insertElement('Add Data Row Button');
}

function getUniqueIDRow() {
	var mytr;
	$('#dmcDataDefinitionTable tbody tr').find('.thTableorder').each(function(){ 
		if ($(this).text()=="First"){
			mytr=$(this).closest('tr').get(0);
		}; 
	})
	return mytr;
}

function getStatusRow() {
	var mytr;
	$('#dmcDataDefinitionTable tbody tr').find('.thTableorder').each(function(){ 
		if ($(this).text()=="Last"){
			mytr=$(this).closest('tr').get(0);
		}; 
	})
	return mytr;
}

function addOrUpdateRow(dataArray,row,rowLabel) {
	if (typeof row != "undefined"){
		//update row
		//alert (rowLabel + ' is in table at position: ' + oTable.fnGetPosition(row) + ', updating.');
		oTable.fnUpdate( dataArray,row );
			
	} else {
		//add row
		//alert(rowLabel + ' not in table, adding.');
		oTable.fnAddData( dataArray );
	}
}

function clearDataColumnFields() {
	KD.utils.Action.setQuestionValue('Data Source Field','');
	KD.utils.Action.setQuestionValue('Field Label','');
	KD.utils.Action.setQuestionValue('Field Visible in Table',null);
	KD.utils.Action.setQuestionValue('Field Type','');
    KD.utils.Action.setQuestionValue('Field Selection Options','');
	KD.utils.Action.setQuestionValue('Field Length','');
	KD.utils.Action.setQuestionValue('Field Default Value','');
	KD.utils.Action.setQuestionValue('Field is Required',null);
	KD.utils.Action.setQuestionValue('Field is Locked for Editing',null);
    KD.utils.Action.setQuestionValue('Field Help Text','');
	
	//remove and make optional any fields made dynamically visible
	KD.utils.Action.removeElement('Field Selection Options');
	KD.utils.Action.removeElement('Field Length');
	KD.utils.Action.makeQuestionOptional('Field Selection Options');
	KD.utils.Action.makeQuestionOptional('Field Length');
}

/** Starting of the param table*/
function buildParameterTable(paramdataArray) {
	var dataArray = [];
	if (type=="update" && paramdataArray) {
		dataArray=paramdataArray;
	}
	/* Add table container for the bridge parameter table */
	$('#dataBridgeParamTable').html( '<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"display\" id=\"dmcBridgeParameterTable\"></table>' );

	var bridgeName = KD.utils.Action.getQuestionValue('Bridge Model');
	var bridgeQual = KD.utils.Action.getQuestionValue('Bridge Qualification');
	
	//Took this out for now, since we're going to build the table manully as people add params.
	//getParameterData(bridgeName,bridgeQual);
	populateParamTable(dataArray);
}

//function not currently used.  Instead, build empty table and let the user apply each value.  this way
//if they change the qualification, it doesn't lost any values they have.  (In the verification before we save definition, 
//we need to check each parameter to be sure it has a corresponding value in the table -- and there are no extras.)
function getParameterData(bridgeName,bridgeQual) {
	var dataArray=[];
	var connector = new KD.bridges.BridgeConnector({templateId: clientManager.templateId});

	connector.search('Data Management Console - Bridge Qualification Parameters', 'By Bridge and by Qualification', {
	  attributes: ['Name'],
	  parameters: {'Bridge Model':bridgeName,'Bridge Qualification':bridgeQual},
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
		populateParamTable(dataArray);
	  }
	});
}

function populateParamTable(dataArray) {
	oParamTable = $('#dmcBridgeParameterTable').dataTable({
		"aaData":dataArray,
		"bDestroy": true,
		//"sDom": 'T<"clear">lfrtip',
		"sDom": 'T<"clear">rt',
		"bFilter": false,
		"bLengthChange": false,
		"bPaginate":false,
		"bInfo":false,
		"aoColumns":[
			{
				"sTitle":"Parameter",
				"sClass":"thParametername"
			},
			{
				"sTitle":"Value",
				"sClass":"thParamvalue"
			}
		],
		"oTableTools":{
		   "sRowSelect": "single",
		   "aButtons": [
				{
					"sExtends":    "text",
					"sButtonText": "Edit Row",
					"fnClick": function( nButton, oConfig, oFlash ) {
						var anSelected = TableTools.fnGetInstance( 'dmcBridgeParameterTable' ).fnGetSelected();
						if ( anSelected.length !== 0 ) {
							//call the dataRow function and pass the current TR.  This will be used to populate
							//the current data as well as update the row when the user clicks Add
							//alert(oParamTable.fnGetData(anSelected[0]));
							editParameterRow(anSelected[0])
						};
					}
				},
				{
					"sExtends":    "text",
					"sButtonText": "Delete Row",
					"fnClick": function( nButton, oConfig, oFlash ) {
						var anSelected = TableTools.fnGetInstance( 'dmcBridgeParameterTable' ).fnGetSelected();
						if ( anSelected.length !== 0 ) {
							oParamTable.fnDeleteRow( anSelected[0] );
						};
					}
				}
			]
		}
	});
}

function editParameterRow(rowTR) {
	//Retrieve data
	var rowData = oParamTable.fnGetData(rowTR);
	
	//Set Data into fields
	KD.utils.Action.setQuestionValue('Bridge Parameter',rowData[0]);
	KD.utils.Action.setQuestionValue('Bridge Parameter Value',rowData[1]);
	
	//Trigger change on Bridge Parameter value to retrieve the parameter notes
	var bridgeParamEl = KD.utils.Util.getQuestionInput('Bridge Parameter');
	KD.utils.Action._fireChange(bridgeParamEl);
	
	KD.utils.Action.insertElement('Update Cancel Parameter Row Buttons');
	KD.utils.Action.removeElement('Add Parameter Row Button');
}

function checkRequiredValueParam(row) {
	var errorCode;
	var messageHeader;
	var messageBody;
	
	var param_name = KD.utils.Action.getQuestionValue('Bridge Parameter');
	var param_value = KD.utils.Action.getQuestionValue('Bridge Parameter Value');
	
	if (param_name=="" || param_value=="") {
		errorCode = "201";
		messageHeader = "Missing data"
		messageBody = "Both the 'Bridge Parameter' and the 'Bridge Parameter Value' fields must be completed to add a new row.";
	}
	
	if(!errorCode && (param_name!="")) {
		$('#dmcBridgeParameterTable tbody tr').find('.thParametername').each(function(){ 
			if ($(this).parent().get(0) != row) {
				if ($(this).text()==param_name){
					errorCode = "201";
					messageHeader = "Duplicate parameter"
					messageBody = "Parameter " + param_name + " has already been added to the table."
				}
			}
		})
	}
	
	return {
        error: errorCode,
        messageHeader: messageHeader,
		messageBody: messageBody
    }
}

//no longer need to pass the type field in...
function dataParamRow(type) {
	var row;
	
	//check if there is a row selected
	var updateRowTR=$('#dmcBridgeParameterTable .DTTT_selected');
	if (updateRowTR && updateRowTR.length==1){
		row = updateRowTR.get(0);
	}
	
	var check = checkRequiredValueParam(row)
	if (check.error && check.error!=""){
		KD.utils.ClientManager.alertPanel(
			{
				header: check.messageHeader,
				body: check.messageBody
			}
		);
		return false;
	}

	var dataArray=[
        KD.utils.Action.getQuestionValue('Bridge Parameter'),
		KD.utils.Action.getQuestionValue('Bridge Parameter Value')
	];
	
	addOrUpdateParamRow(dataArray,row);
	
	//Reset fields and buttons
	paramRowUpdateClear();
}

function addOrUpdateParamRow(dataArray,row) {
	if (typeof row != "undefined"){
		//update row
		oParamTable.fnUpdate( dataArray,row );
			
	} else {
		//add row
		oParamTable.fnAddData( dataArray );
	}
	
	//Clear Parameter Notes field
	$('.parameterNotes').html('');
}

function paramRowUpdateClear() {
	//clear selected row
	//$('#dmcBridgeParameterTable .DTTT_selected').removeClass('DTTT_selected');
	TableTools.fnGetInstance( 'dmcBridgeParameterTable' ).fnSelectNone();
	
	
	//clear the data column fields
	clearParamColumnFields();
	
	//reset buttons
	KD.utils.Action.removeElement('Update Cancel Parameter Row Buttons');
	KD.utils.Action.insertElement('Add Parameter Row Button');
}

function clearParamColumnFields() {
	KD.utils.Action.setQuestionValue('Bridge Parameter',''),
	KD.utils.Action.setQuestionValue('Bridge Parameter Value','')
}

/** Ending of the param table*/

function toggleElement(elLabel) {
	var el=KD.utils.Util.locateIDByLabel(document,elLabel,true);
	//$('#'+el).toggle('slow');
	$('#'+el).slideToggle('slow');
}

function createJSON() {
	var validateFlds = validateFields();
	if (validateFlds.error && validateFlds.error != "") {
		KD.utils.ClientManager.alertPanel(
			{
				header: validateFlds.messageHeader,
				body: validateFlds.messageBody
			}
		);
		return false;
	}
	
	var validateParamsTable = validateParameters();
	if (validateParamsTable.error && validateParamsTable.error != "") {
		KD.utils.ClientManager.alertPanel(
			{
				header: validateParamsTable.messageHeader,
				body: validateParamsTable.messageBody
			}
		);
		return false;
	}
	var validateDataTable = validateDataDefTable();
	if (validateDataTable.error && validateDataTable.error != "") {
		KD.utils.ClientManager.alertPanel(
			{
				header: validateDataTable.messageHeader,
				body: validateDataTable.messageBody
			}
		);
		return false;
	}
	
	//toJson code here
	var bridgedata = jsonBridgedata();
	var tableconfig = jsonTableconfig();
	var formconfig = jsonFormconfig();
	var datatypestructure = '"datatypestructure":{';
	datatypestructure += tableconfig.tablestructure;
	if (bridgedata.parameterstructure && bridgedata.parameterstructure!=""){
		datatypestructure += ("," + bridgedata.parameterstructure);
	}
	datatypestructure += '}';
	
	//combine all parts
	if (bridgedata && tableconfig && formconfig){
		var jsonString = "{" + bridgedata.bridgedata + "," + datatypestructure + "," + tableconfig.tableconfig + "," + formconfig + "}"
	} else {
		return false;
	}
	
	//write to JSON question
	KD.utils.Action.setQuestionValue('Data Type Definition JSON',jsonString);
	
	// Do all replacements when interpreting the JSON.  Otherwise, you can't open it up and parse it properly to display the user the values they need to type in.
	// Can't do this here -- Need to do it when the JSON is stored, and "undoit" when the JSON is read to edit this.
	// comma ==--> %2C
	// Double Quotes ==-->%22
	// Percent == -->%25
	
	return true;
	//if successful, send via model to helper because the JSON might be too large to fit in one 4000 character field.
	/*if (type=='update'){
		var updateRecordResult = updateRecord();
	} else {
		var addRecordResult = addRecord();
	}
	
	if ((addRecordResult && addRecordResult==false) || (updateRecordResult && updateRecordResult==false)){
		KD.utils.ClientManager.alertPanel(
			{
				header: "Error",
				body: "There was an error saving this record.  Please try again.  If you continue to have problems, please check with your Administrator."
			}
		);
		return false;
	} else {
		return true;
	}*/
	
	//To Do:  When you open this for editing, get the JSON from Helper -- not the answer value and populate field by parsing/extracting all the data.
	//        When you submit/save...should it modify the old record, or mark it inactive and replace it with a new one?  If doing the latter, it'll 
	//        automatically create an audit trail.
}

function jsonBridgedata() {
	var bridgedata = '"bridgedata":{';
	bridgedata += '"bridgename":"' + KD.utils.Action.getQuestionValue('Bridge Model') + '"';
	bridgedata += ',"qualification":"' + KD.utils.Action.getQuestionValue('Bridge Qualification') + '"';
	
	//set the metadata to sort by the unique ID
	var sortattribute = '<%=attribute["' + KD.utils.Action.getQuestionValue('Unique ID Field') +'"]%>:ASC';
	bridgedata += ', "order": "'+ encodeURIComponent(sortattribute)+'"';
	
	
	//get attributes (all data source fields used)
		var attr=[];
		$('#dmcDataDefinitionTable tbody tr').find('.thSourcefield').each(function () {
			attr.push('"'+$(this).text().replace(/"/g, '\\"')+'"');
		});
	bridgedata += ',"attributes":[' + attr.join(",") + ']';
	
	
	//add each parameter and value
	if ($('#dmcBridgeParameterTable tbody tr').find('.thParametername').size()>0){
		bridgedata += ',"parameters":{';
		var parameterstructure = '"parameters":[';
		$('#dmcBridgeParameterTable tbody tr').find('.thParametername').each(function () {
			//do we need to worry about percent/wildcard values here?  Maybe we do this on the UI side => offer a 
			//checkbox "Any non-null value" that converts to "%25"...or we have a separate columns for "processing value", 
			//and store the encoded values there?
			bridgedata += '"' + $(this).text().replace(/"/g, '\\"') + '":"' + $(this).closest('tr').find('.thParamvalue').text().replace(/"/g, '\\"') + '",';
			parameterstructure += '["' + $(this).text().replace(/"/g, '\\"') + '","' + $(this).closest('tr').find('.thParamvalue').text().replace(/"/g, '\\"') + '"],';
		});
		//remove last comma
		bridgedata = bridgedata.slice(0,-1);
		bridgedata += '}';
		
		parameterstructure = parameterstructure.slice(0,-1);
		parameterstructure += ']';
	}
	
	//close the bridgedata section
	bridgedata += "}";
	
	//return bridgedata;
	
	return {
		bridgedata: bridgedata,
		parameterstructure: parameterstructure
	}
}

function jsonTableconfig() {
	//the spaces at end ensure a space between class names
	var classHidden="hideCol ";
	var classReqId="reqId ";
	var classStatusCol="statusCol ";
	
	var tableconfig = '"tableconfig":{';
	tableconfig += '"columndata":[';
	var tablestructure = '"tablestructure":[';
	$('#dmcDataDefinitionTable tbody tr').find('.thLabel').each(function(){
		var thisRowData = oTable.fnGetData($(this).closest('tr').get(0));

		//identify any classes
		var hidden=((thisRowData[4].toUpperCase()!="YES") ? classHidden : "");
		var reqId=((thisRowData[0]=="Unique ID Column") ? classReqId : "");
		var statusCol=((thisRowData[0]=="Status Column") ? classStatusCol : "");
		
		//add details
		tableconfig += '{"sTitle":"' + $(this).text().replace(/"/g, '\\"') + '","sClass":"' + hidden + reqId + statusCol + '"},';
		
		//assemble all row content
		var thisRowJson = '[';
		for (var i=0;i<thisRowData.length;i++){		
			//add details
			thisRowJson += '"'+thisRowData[i].toString().replace(/"/g, '\\"')+'",';
		}
		//remove the last comma
		thisRowJson=thisRowJson.slice(0,-1);
		
		//close the row
		thisRowJson += '],';
		
		//append to tablestructure
		tablestructure += thisRowJson;
		
	})

	//remove the last comma
	tableconfig = tableconfig.slice(0,-1);
	tablestructure=tablestructure.slice(0,-1);
	
	//close the columndata section
	tableconfig += ']';
	tablestructure += ']';
	
	//close the tableconfig section
	tableconfig += '}';
	
	return {
		tableconfig: tableconfig,
		tablestructure: tablestructure
	}
}

function jsonFormconfig() {
	var formconfig = '"formConfig":{';
	formconfig += '"formName":"' + KD.utils.Action.getQuestionValue('Service Item for editing data') + '"';
	formconfig += ',"fielddata":['
	$('#dmcDataDefinitionTable tbody tr').find('.thSourcefield').each(function(){
		var thisRowData = oTable.fnGetData($(this).closest('tr').get(0));
		if (thisRowData[0]=="Data Columns"){
			formconfig +=    '{"fieldName":"' + thisRowData[2].replace(/"/g, '\\"') + 
							'","label":"' + thisRowData[3].replace(/"/g, '\\"') + 
							'","type":"' + thisRowData[5] + 
							'","menuOptions":"' + thisRowData[6].replace(/"/g, '\\"') + 
							'","inputLength":"' + thisRowData[7] + 
							'","defaultValue":"' + thisRowData[8].replace(/"/g, '\\"') + 
							'","required":"' + thisRowData[9] + 
							'","readonly":"' + thisRowData[10] + 
							'","helpText":"' + thisRowData[11].replace(/"/g, '\\"') + '"},';
		}
	});
	
	//remove the last comma
	formconfig = formconfig.slice(0,-1);
	
	//close the fielddata section
	formconfig += ']';
	
	//close the formconfig section
	formconfig += '}';
	
	return formconfig;
}

function validateFields() {
	var errorCode;
	var messageHeader;
	var messageBody;
	
	if (KD.utils.Action.getQuestionValue('Data Type Name')=="" || KD.utils.Action.getQuestionValue('Bridge Model')=="" || KD.utils.Action.getQuestionValue('Bridge Qualification')=="" || KD.utils.Action.getQuestionValue('Service Item for editing data')=="") {
		errorCode="501";
		messageHeader="Data missing";
		messageBody="Some of the general data type information is missing.  Check the Data Type Basics section at the top of the page and \n \
		ensure that the 'Data Type Name', 'Bridge Model', 'Bridge Qualification', and 'Service Item for editing data' fields are completed."
	}
	
	return {
		error: errorCode,
		messageHeader: messageHeader,
		messageBody: messageBody
	}
}

function validateParameters() {
	var errorCode;
	var messageHeader;
	var messageBody;

	var paramOptions = [];
	$('#'+KD.utils.Util.locateIDByLabel(document,'Bridge Parameter',true)+' option').each(function () {
		if ($(this).text()!=""){
			paramOptions.push($(this).text());
		}
	});
	
	var paramTableItems = [];
	$('#dmcBridgeParameterTable tbody tr').find('.thParametername').each(function () {
		if ($(this).text()!=""){
			paramTableItems.push($(this).text());
		}
	});
	
	if (paramOptions.length != paramTableItems.length) {
		errorCode="301";
		messageHeader="Bridge parameter mismatch";
		messageBody="The number of parameters for the selected bridge qualification (" + paramOptions.length + ") doesn't match the number of number of parameters defined (" + paramTableItems.length + ").\n \
		Each qualification parameter needs to have a matching value in the parameter table.";
	}
	
	//only check this if the earlier check did not find an error.
	//at the present time, this issue can't occur because the parameter table is being reinitialized when the bridge qualification is updated.
	if (!errorCode) {
		for (var i = 0; i < paramOptions.length; i++) {
			if ($.inArray(paramOptions[i],paramTableItems)<0) { 
				//alert("Missing: " + paramOptions[i]);
				errorCode="302";
				messageHeader="Missing parameter value";
				messageBody="Parameter " + paramOptions[i] + " is not included in the parameter table.  Please review the parameter table and make the necessary updates."
			}
			break;
		}
	}
	
	return {
		error: errorCode,
		messageHeader: messageHeader,
		messageBody: messageBody
	}
}

function validateDataDefTable() {
	var errorCode;
	var messageHeader;
	var messageBody;
	var uniqueIDFieldName;
	var statusFieldName;
	var dataColumns=[];
	
	//check that table values match a data source field option.
	var fieldOptions = [];
	$('#'+KD.utils.Util.locateIDByLabel(document,'Data Source Field',true)+' option').each(function () {
		if ($(this).text()!=""){
			fieldOptions.push($(this).text());
		}
	});
	
	var dataTableItems = [];
	$('#dmcDataDefinitionTable tbody tr').find('.thSourcefield').each(function () {
		if ($(this).text()!=""){
			dataTableItems.push($(this).text());
		}
	});

	for (var i = 0; i < dataTableItems.length; i++) {
		if ($.inArray(dataTableItems[i],fieldOptions)<0) { 
			errorCode="401";
			messageHeader="Invalid source field";
			messageBody="The field " + dataTableItems[i] + " is not a valid data source field for this bridge model.\n \
			Please review the data definition table and make the necessary updates.";
		}
		break;
	}
	
	//If no earlier error found, check for UniqueID row
	if (!errorCode) {
		var uniqueIDRow = [];
		$('#dmcDataDefinitionTable tbody tr').find('.thTableorder').each(function () {
			if ($(this).text()=="First"){
				uniqueIDRow.push($(this).text());
				//store data source field name for later validation
				uniqueIDFieldName=$(this).parent().find('.thSourcefield').text();
			}
		});
		
		if (uniqueIDRow.length < 1){
			errorCode="402";
			messageHeader="Missing Unique ID Column definition";
			messageBody="The Unique ID column is missing. Add this row by populating the 'Data Source Unique ID Row Details' section.";
		}
	}
	
	//If no earlier error found, check for status row
	if (!errorCode) {
		var statusRow = [];
		$('#dmcDataDefinitionTable tbody tr').find('.thTableorder').each(function () {
			if ($(this).text()=="Last"){
				statusRow.push($(this).text());
				//store data source field name for later validation
				statusFieldName=$(this).parent().find('.thSourcefield').text();
			}
		});
		
		if (statusRow.length < 1){
			errorCode="403";
			messageHeader="Missing Status Column definition";
			messageBody="The Status column is missing. Add this row by populating the 'Data Source Status Row Details' section.";
		}
	}
	
	//If no earlier error found, validate that UniqueID and Status are not the same field.
	if (!errorCode && uniqueIDFieldName === statusFieldName) {	
		errorCode="404";
		messageHeader="Duplicate values";
		messageBody="The Unique ID field cannot be the same as the Status field. \n \
		Please review and make the appropriate changes in either the 'Data Source Unique ID Details' section and/or the 'Data Source Status Row Details' section.";
	}
	
	
	//If no earlier error found, validate at least one data column.
	if (!errorCode) {
		var dataRowCount = 0;
		$('#dmcDataDefinitionTable tbody tr').find('.thTableorder').each(function () {
			if (!isNaN($(this).text())){
				dataRowCount++;
				//populate dataColumns for later user.
				dataColumns.push($(this).parent().find('.thSourcefield').text());
			}
		});
		
		if (dataRowCount == 0){
			errorCode="405";
			messageHeader="No data columns";
			messageBody="There are no data columns defined in the Data Definition Table.  There must be at least one data column defined.";
		}
	}
	
	if (!errorCode && $.inArray(uniqueIDFieldName,dataColumns)>-1) {
		errorCode="406";
		messageHeader="Duplicate field value";
		messageBody="The Unique ID Field has the same source field as a data column and is not allowed.\n \
		Please delete the data column, or select the proper Unique ID field from the 'Data Source Unique ID Details' section.";
	}
	
	if (!errorCode && $.inArray(statusFieldName,dataColumns)>-1) {
		errorCode="407";
		messageHeader="Duplicate field value";
		messageBody="The Status Field has the same source field as a data column and is not allowed.\n \
		Please delete the data column, or select the proper Status field from the 'Data Source Status Row Details' section.";
	}
	
	return {
		error: errorCode,
		messageHeader: messageHeader,
		messageBody: messageBody
	}
}

function showConsole() {
    var dataType = "Data Management Console - Data Type Definitions";
	//redirect to the console referencing the provided data type
	window.open(KD.utils.ClientManager.webAppContextPath + '/DisplayPage?name=datamanagement&dataType='+encodeURIComponent(dataType), '_self');
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

	//get values necessary to pass here
	var jsonCreated = createJSON();
	if (jsonCreated == false) {
		alert("An error has ocurred attempting to save the record");
		setStatusWAIT.hide();
		return false;
	};
	var permission = KD.utils.Action.getQuestionValue("Data Type Access Permissions");
	//alert("Permission: "+permission);
	var index_1 = "Data Management Console";
	var index_2 = "Data Definition";
	var index_3 = "";
	var char_1 = KD.utils.Action.getQuestionValue("Data Type Name");
	var char_2 = ""; 
	var char_3 = "";
	var char_4 = "";
	var char_5 = "";
	var char_6 = "";
	var char_7 = "";
	var char_8 = "";
	var char_9 = "";
	var char_10 = KD.utils.Action.getQuestionValue("Category Level 1");
	var char_11 = KD.utils.Action.getQuestionValue("Category Level 2");
	var char_12 = KD.utils.Action.getQuestionValue("Category Level 3");
	var char_13 = KD.utils.Action.getQuestionValue("Data Type Definition JSON");
	var char_14 = "";
	var int_1 = "";
	var int_2 = "";
	var int_3 = "";
	var int_4 = "";
	var int_5 = "";
	var int_6 = "";
	var date_1 = "";
	var date_2 = "";
	var date_3 = "";
	var date_4 = "";
	var date_5 = "";
	var date_6 = "";
	var date_7 = "";
	var dtime_1 = "";
	var dtime_2 = "";
	var dtime_3 = "";
	var dtime_4 = "";
	var dtime_5 = "";
	var dtime_6 = "";
	var dtime_7 = "";
	var time_2 = null;
	var time_3 = null;
	var time_4 = null;
	var time_5 = null;
	var time_6 = null;
	var time_7 = null;
	var time_1 = null;
	var status = "Active";

	var createRecordResult = $.ajax({
		type: "post",
		url: BUNDLE.packagePath + "../datamanagement/interface/callbacks/createHelper.jsp",
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
				int_3:		int_3,
				int_4:		int_4,
				int_5:		int_5,
				int_6:		int_6,
				date_1:		date_1,
				date_2:		date_2,
				date_3:		date_3,
				date_4:		date_4,
				date_5:		date_5,
				date_6:		date_6,
				date_7:		date_7,
				dtime_1:	dtime_1,
				dtime_2:	dtime_2,
				dtime_3:	dtime_3,
				dtime_4:	dtime_4,
				dtime_5:	dtime_5,
				dtime_6:	dtime_6,
				dtime_7:	dtime_7,
				status:		status,
				permission: permission
				}
	}).done(function(data, textStatus, jqXHR){
		setStatusWAIT.hide();
		//submit page
		Dom.getElementsByClassName('templateButton', 'input', KD.utils.Util.getElementObject("Submit"))[0].click();
	}).fail(function( jqXHR, textStatus, errorThrown){
		alert(jqXHR.status);
        alert(errorThrown);
		setStatusWAIT.hide();
	})
	
	return createRecordResult;

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

	//get values necessary to pass here
	var jsonCreated = createJSON();
	if (jsonCreated == false) {
		alert("An error has ocurred attempting to save the record");
		setStatusWAIT.hide();
		return false;
	};
	var permission = KD.utils.Action.getQuestionValue("Data Type Access Permissions");
	var helperID = KD.utils.Action.getQuestionValue("Data Type Definition Request ID");
	var index_1 = "Data Management Console";
	var index_2 = "Data Definition";
	var index_3 = "";
	var char_1 = KD.utils.Action.getQuestionValue("Data Type Name");
	var char_2 = ""; 
	var char_3 = "";
	var char_4 = "";
	var char_5 = "";
	var char_6 = "";
	var char_7 = "";
	var char_8 = "";
	var char_9 = "";
	var char_10 = KD.utils.Action.getQuestionValue("Category Level 1");
	var char_11 = KD.utils.Action.getQuestionValue("Category Level 2");
	var char_12 = KD.utils.Action.getQuestionValue("Category Level 3");
	var char_13 = KD.utils.Action.getQuestionValue("Data Type Definition JSON");
	var char_14 = "";
	var int_1 = "";
	var int_2 = "";
	var int_3 = "";
	var int_4 = "";
	var int_5 = "";
	var int_6 = "";
	var date_1 = "";
	var date_2 = "";
	var date_3 = "";
	var date_4 = "";
	var date_5 = "";
	var date_6 = "";
	var date_7 = "";
	var dtime_1 = "";
	var dtime_2 = "";
	var dtime_3 = "";
	var dtime_4 = "";
	var dtime_5 = "";
	var dtime_6 = "";
	var dtime_7 = "";
	var time_2 = null;
	var time_3 = null;
	var time_4 = null;
	var time_5 = null;
	var time_6 = null;
	var time_7 = null;
	var time_1 = null;
	var status = KD.utils.Action.getQuestionValue("Status");
	
	var updateRecordResult = $.ajax({
		type: "post",
		url: BUNDLE.packagePath + "../datamanagement/interface/callbacks/updateHelper.jsp",
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
				int_3:		int_3,
				int_4:		int_4,
				int_5:		int_5,
				int_6:		int_6,
				date_1:		date_1,
				date_2:		date_2,
				date_3:		date_3,
				date_4:		date_4,
				date_5:		date_5,
				date_6:		date_6,
				date_7:		date_7,
				dtime_1:	dtime_1,
				dtime_2:	dtime_2,
				dtime_3:	dtime_3,
				dtime_4:	dtime_4,
				dtime_5:	dtime_5,
				dtime_6:	dtime_6,
				dtime_7:	dtime_7,
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
			//submit page
			Dom.getElementsByClassName('templateButton', 'input', KD.utils.Util.getElementObject("Submit"))[0].click();
		}
	})

	return updateRecordResult;
}