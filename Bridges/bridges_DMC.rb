model {
  name "Groups"
  status "Active"
  attribute {
    name "Group ID"
  }
  attribute {
    name "Group Name"
  }
  qualification {
    name "Find Current Regular Groups"
    result_type "Multiple"
  }
}
model {
  name "Data Management Console - Helper Data"
  status "Active"
  attribute {
    name "Character Field 1"
  }
  attribute {
    name "Character Field 10"
  }
  attribute {
    name "Character Field 11"
  }
  attribute {
    name "Character Field 12"
  }
  attribute {
    name "Character Field 13"
  }
  attribute {
    name "Character Field 14"
  }
  attribute {
    name "Character Field 2"
  }
  attribute {
    name "Character Field 3"
  }
  attribute {
    name "Character Field 4"
  }
  attribute {
    name "Character Field 5"
  }
  attribute {
    name "Character Field 6"
  }
  attribute {
    name "Character Field 7"
  }
  attribute {
    name "Character Field 8"
  }
  attribute {
    name "Character Field 9"
  }
  attribute {
    name "Create Date"
  }
  attribute {
    name "Customer Survey ID"
  }
  attribute {
    name "Date Field 1"
  }
  attribute {
    name "Date Field 2"
  }
  attribute {
    name "Date Field 3"
  }
  attribute {
    name "Date Field 4"
  }
  attribute {
    name "Date Field 5"
  }
  attribute {
    name "Date Field 6"
  }
  attribute {
    name "Date Field 7"
  }
  attribute {
    name "Date Time Field 1"
  }
  attribute {
    name "Date Time Field 2"
  }
  attribute {
    name "Date Time Field 3"
  }
  attribute {
    name "Date Time Field 4"
  }
  attribute {
    name "Date Time Field 5"
  }
  attribute {
    name "Date Time Field 6"
  }
  attribute {
    name "Date Time Field 7"
  }
  attribute {
    name "Index Field 1"
  }
  attribute {
    name "Index Field 2"
  }
  attribute {
    name "Index Field 3"
  }
  attribute {
    name "Integer Field 1"
  }
  attribute {
    name "Integer Field 2"
  }
  attribute {
    name "Integer Field 3"
  }
  attribute {
    name "Integer Field 4"
  }
  attribute {
    name "Integer Field 5"
  }
  attribute {
    name "Integer Field 6"
  }
  attribute {
    name "Last Modified By"
  }
  attribute {
    name "Modified Date"
  }
  attribute {
    name "Permission"
  }
  attribute {
    name "Request ID"
  }
  attribute {
    name "Status"
  }
  attribute {
    name "Submitter"
  }
  attribute {
    name "Survey ID"
  }
  attribute {
    name "Time Field 1"
  }
  attribute {
    name "Time Field 2"
  }
  attribute {
    name "Time Field 3"
  }
  attribute {
    name "Time Field 4"
  }
  attribute {
    name "Time Field 5"
  }
  attribute {
    name "Time Field 6"
  }
  attribute {
    name "Time Field 7"
  }
  qualification {
    name "All Entries"
    result_type "Multiple"
    parameter {
      name "Index Field 1"
    }
    parameter {
      name "Index Field 2"
    }
    parameter {
      name "Index Field 3"
    }
  }
  qualification {
    name "All All"
    result_type "Multiple"
  }
  qualification {
    name "All Entries - Special Param 3"
    result_type "Multiple"
    parameter {
      name "Index Field 1"
    }
    parameter {
      name "Index Field 2"
    }
    parameter {
      name "Index Field 3"
    }
  }
  qualification {
    name "By Record Id"
    result_type "Single"
    parameter {
      name "Record Id"
    }
  }
  qualification {
    name "Index 1"
    result_type "Multiple"
    parameter {
      name "Index Field 1"
      notes "<b>Index 1</b> &nbsp; will match the exact value provided when retrieving data.  This value will also be used when adding new records. <i><b>Put double quotes around the text.</b></i>"
    }
  }
  qualification {
    name "Index 1 | Index 2 (any match/wildcards/non-null)"
    result_type "Multiple"
    parameter {
      name "Index Field 1"
      notes "<b>Index 1</b> &nbsp; will match the exact value provided when retrieving data. <i><b>Put double quotes around the text.</b></i>"
    }
    parameter {
      name "Index Field 2"
      notes "<b>Index 2</b> &nbsp; use a specific value, or include % for wildcard searches.  This value cannot be blank (null), and will not retrieve null values. <i><b>Put double quotes around the text.</b></i>"
    }
  }
  qualification {
    name "Index 1 | Index 2 (exact match/null)"
    result_type "Multiple"
    parameter {
      name "Index Field 1"
      notes "<b>Index 1</b> &nbsp; will match the exact value provided when retrieving data. <i><b>Put double quotes around the text.</b></i>"
    }
    parameter {
      name "Index Field 2"
      notes "<b>Index 2</b> &nbsp; use a specific value, or enter $\\NULL$ to search for a blank value. <i><b>Put double quotes around specific values -- but NOT around $\\NULL$.</b></i>"
    }
  }
  qualification {
    name "Index 1 | Index 2 | Index 3 (any match/wildcards/non-null)"
    result_type "Multiple"
    parameter {
      name "Index Field 1"
      notes "<b>Index 1</b> &nbsp; will match the exact value provided when retrieving data. <i><b>Put double quotes around the text.</b></i>"
    }
    parameter {
      name "Index Field 2"
      notes "<b>Index 2</b> &nbsp; will match the exact value provided when retrieving data. <i><b>Put double quotes around the text.</b></i>"
    }
    parameter {
      name "Index Field 3"
      notes "<b>Index 3</b> &nbsp; use a specific value, or include % for wildcard searches.  This value cannot be blank (null), and will not retrieve null values. <i><b>Put double quotes around the text.</b></i>"
    }
  }
  qualification {
    name "Index 1 | Index 2 | Index 3 (exact match/null)"
    result_type "Multiple"
    parameter {
      name "Index Field 1"
      notes "<b>Index 1</b> &nbsp; will match the exact value provided when retrieving data. <i><b>Put double quotes around the text.</b></i>"
    }
    parameter {
      name "Index Field 2"
      notes "<b>Index 2</b> &nbsp; will match the exact value provided when retrieving data. <i><b>Put double quotes around the text.</b></i>"
    }
    parameter {
      name "Index Field 3"
      notes "<b>Index 3</b> &nbsp; use a specific value, or enter $\\NULL$ to search for a blank value. <i><b>Put double quotes around specific values -- but NOT around $\\NULL$.</b></i>"
    }
  }
}
model {
  name "Data Management Console - Data Definitions"
  status "Active"
  attribute {
    name "Character Field 1"
  }
  attribute {
    name "Character Field 10"
  }
  attribute {
    name "Character Field 11"
  }
  attribute {
    name "Character Field 12"
  }
  attribute {
    name "Character Field 13"
  }
  attribute {
    name "Character Field 14"
  }
  attribute {
    name "Character Field 2"
  }
  attribute {
    name "Character Field 3"
  }
  attribute {
    name "Character Field 4"
  }
  attribute {
    name "Character Field 5"
  }
  attribute {
    name "Character Field 6"
  }
  attribute {
    name "Character Field 7"
  }
  attribute {
    name "Character Field 8"
  }
  attribute {
    name "Character Field 9"
  }
  attribute {
    name "Request ID"
  }
  attribute {
    name "Status"
  }
  qualification {
    name "By Data Type Name"
    result_type "Single"
    parameter {
      name "Data Type Name"
    }
  }
  qualification {
    name "By Record Id"
    result_type "Single"
    parameter {
      name "Record Id"
    }
  }
}
model {
  name "Data Management Console - Data Types"
  status "Active"
  attribute {
    name "Data Type Name"
  }
  attribute {
    name "Level 1"
  }
  attribute {
    name "Level 2"
  }
  attribute {
    name "Level 3"
  }
  attribute {
    name "Status"
  }
  qualification {
    name "All Active"
    result_type "Multiple"
  }
  qualification {
    name "By Level 1"
    result_type "Multiple"
    parameter {
      name "Level 1"
    }
  }
  qualification {
    name "By Level 1 and 2"
    result_type "Multiple"
    parameter {
      name "Level 1"
    }
    parameter {
      name "Level 2"
    }
  }
  qualification {
    name "By Level 1, 2 and 3"
    result_type "Multiple"
    parameter {
      name "Level 1"
    }
    parameter {
      name "Level 2"
    }
    parameter {
      name "Level 3"
    }
  }
  qualification {
    name "By Record Id"
    result_type "Single"
    parameter {
      name "Record Id"
    }
  }
}
model {
  name "Data Management Console - Bridge Model Attributes"
  status "Active"
  attribute {
    name "Attribute Name"
  }
  qualification {
    name "By Bridge Name"
    result_type "Multiple"
    parameter {
      name "Bridge Name"
    }
  }
}
model {
  name "Data Management Console - Bridge Models"
  status "Active"
  attribute {
    name "Name"
  }
  qualification {
    name "All"
    result_type "Multiple"
  }
}
model {
  name "Data Management Console - Bridge Qualifications"
  status "Active"
  attribute {
    name "Name"
  }
  qualification {
    name "All Multiple Results Types By Model Name"
    result_type "Multiple"
    parameter {
      name "Model Name"
    }
  }
}
model {
  name "Data Management Console - Bridge Qualification Parameters"
  status "Active"
  attribute {
    name "Name"
  }
  attribute {
    name "Notes"
  }
  qualification {
    name "By Bridge and by Qualification"
    result_type "Multiple"
    parameter {
      name "Bridge Model"
    }
    parameter {
      name "Bridge Qualification"
    }
  }
  qualification {
    name "By Bridge and by Qualification and by Parameter"
    result_type "Single"
    parameter {
      name "Bridge Model"
    }
    parameter {
      name "Bridge Parameter"
    }
    parameter {
      name "Bridge Qualification"
    }
  }
}
model_mapping {
  name "Data Management Console - Bridge Model Attributes"
  model_name "Data Management Console - Bridge Model Attributes"
  bridge_name "Local ARS Server"
  structure "KS_BRG_Attribute"
  status "Active"
  attribute_mapping {
    attribute_name "Attribute Name"
    field_mapping "<%=field[\"name\"]%>"
  }
  qualification_mapping {
    qualification_name "By Bridge Name"
    query "'Status' = \"Active\" AND 'model_name'=\"<%=parameter[\"Bridge Name\"]%>\""
  }
}
model_mapping {
  name "Data Management Console - Bridge Models"
  model_name "Data Management Console - Bridge Models"
  bridge_name "Local ARS Server"
  structure "KS_BRG_Model"
  status "Active"
  attribute_mapping {
    attribute_name "Name"
    field_mapping "<%=field[\"name\"]%>"
  }
  qualification_mapping {
    qualification_name "All"
    query "'Status' = \"Active\""
  }
}
model_mapping {
  name "Data Management Console - Bridge Qualification Parameters"
  model_name "Data Management Console - Bridge Qualification Parameters"
  bridge_name "Local ARS Server"
  structure "KS_BRG_Parameter"
  status "Active"
  attribute_mapping {
    attribute_name "Name"
    field_mapping "<%=field[\"name\"]%>"
  }
  attribute_mapping {
    attribute_name "Notes"
    field_mapping "<%=field[\"notes\"]%>"
  }
  qualification_mapping {
    qualification_name "By Bridge and by Qualification"
    query "'Status' = \"Active\" AND 'model_name'=\"<%=parameter[\"Bridge Model\"]%>\" AND 'qualification_name'=\"<%=parameter[\"Bridge Qualification\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Bridge and by Qualification and by Parameter"
    query "'Status' = \"Active\" AND 'model_name'=\"<%=parameter[\"Bridge Model\"]%>\" AND 'qualification_name'=\"<%=parameter[\"Bridge Qualification\"]%>\" AND 'name'=\"<%=parameter[\"Bridge Parameter\"]%>\""
  }
}
model_mapping {
  name "Data Management Console - Bridge Qualifications"
  model_name "Data Management Console - Bridge Qualifications"
  bridge_name "Local ARS Server"
  structure "KS_BRG_Qualification"
  status "Active"
  attribute_mapping {
    attribute_name "Name"
    field_mapping "<%=field[\"name\"]%>"
  }
  qualification_mapping {
    qualification_name "All Multiple Results Types By Model Name"
    query "'Status' = \"Active\" AND 'result_type' = \"Multiple\" AND 'model_name'=\"<%=parameter[\"Model Name\"]%>\""
  }
}
model_mapping {
  name "Data Management Console - Data Definitions"
  model_name "Data Management Console - Data Definitions"
  bridge_name "Local ARS Server"
  structure "KS_SRV_Helper"
  status "Active"
  attribute_mapping {
    attribute_name "Character Field 1"
    field_mapping "<%=field[\"Character Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 10"
    field_mapping "<%=field[\"Character Field10\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 11"
    field_mapping "<%=field[\"Character Field11\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 12"
    field_mapping "<%=field[\"Character Field12\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 13"
    field_mapping "<%=field[\"Character Field13\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 14"
    field_mapping "<%=field[\"Character Field14\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 2"
    field_mapping "<%=field[\"Character Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 3"
    field_mapping "<%=field[\"Character Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 4"
    field_mapping "<%=field[\"Character Field4\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 5"
    field_mapping "<%=field[\"Character Field5\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 6"
    field_mapping "<%=field[\"Character Field6\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 7"
    field_mapping "<%=field[\"Character Field7\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 8"
    field_mapping "<%=field[\"Character Field8\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 9"
    field_mapping "<%=field[\"Character Field9\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 1"
    field_mapping "<%=field[\"Index Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 2"
    field_mapping "<%=field[\"Index Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 3"
    field_mapping "<%=field[\"Index Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Request ID"
    field_mapping "<%=field[\"Request ID\"]%>"
  }
  attribute_mapping {
    attribute_name "Status"
    field_mapping "<%=field[\"Status\"]%>"
  }
  qualification_mapping {
    qualification_name "By Data Type Name"
    query "'Index Field1'=\"Data Management Console\" AND 'Index Field2'=\"Data Definition\" AND 'Character Field1'=\"<%=parameter[\"Data Type Name\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Record Id"
    query "'Request ID' = \"<%=parameter[\"Record Id\"]%>\""
  }
}
model_mapping {
  name "Data Management Console - Data Editing Service Items"
  model_name "Data Management Console - Data Editing Service Items"
  bridge_name "Local ARS Server"
  structure "KS_SRV_Helper"
  status "Active"
}
model_mapping {
  name "Data Management Console - Data Types"
  model_name "Data Management Console - Data Types"
  bridge_name "Local ARS Server"
  structure "KS_SRV_Helper"
  status "Active"
  attribute_mapping {
    attribute_name "Character Field 1"
    field_mapping "<%=field[\"Character Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 10"
    field_mapping "<%=field[\"Character Field10\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 11"
    field_mapping "<%=field[\"Character Field11\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 12"
    field_mapping "<%=field[\"Character Field12\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 13"
    field_mapping "<%=field[\"Character Field13\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 14"
    field_mapping "<%=field[\"Character Field14\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 2"
    field_mapping "<%=field[\"Character Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 3"
    field_mapping "<%=field[\"Character Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 4"
    field_mapping "<%=field[\"Character Field4\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 5"
    field_mapping "<%=field[\"Character Field5\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 6"
    field_mapping "<%=field[\"Character Field6\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 7"
    field_mapping "<%=field[\"Character Field7\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 8"
    field_mapping "<%=field[\"Character Field8\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 9"
    field_mapping "<%=field[\"Character Field9\"]%>"
  }
  attribute_mapping {
    attribute_name "Data Type Name"
    field_mapping "<%=field[\"Character Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 1"
    field_mapping "<%=field[\"Index Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 2"
    field_mapping "<%=field[\"Index Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 3"
    field_mapping "<%=field[\"Index Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Level 1"
    field_mapping "<%=field[\"Character Field10\"]%>"
  }
  attribute_mapping {
    attribute_name "Level 2"
    field_mapping "<%=field[\"Character Field11\"]%>"
  }
  attribute_mapping {
    attribute_name "Level 3"
    field_mapping "<%=field[\"Character Field12\"]%>"
  }
  attribute_mapping {
    attribute_name "Status"
    field_mapping "<%=field[\"Status\"]%>"
  }
  qualification_mapping {
    qualification_name "Active Data Types"
    query "'Index Field1'=\"Data Management Console\" AND 'Index Field2'=\"Data Definition\" AND 'Status' = \"Active\""
  }
  qualification_mapping {
    qualification_name "All Active"
    query "'Index Field1' = \"Data Management Console\" AND 'Index Field2' = \"Data Definition\" AND 'Status' = \"Active\""
  }
  qualification_mapping {
    qualification_name "All Data Types"
    query "'Index Field1'=\"Data Management Console\" AND 'Index Field2'=\"Data Definition\""
  }
  qualification_mapping {
    qualification_name "By Level 1"
    query "'Index Field1' = \"Data Management Console\" AND 'Index Field2' = \"Data Definition\" AND 'Status' = \"Active\" AND 'Character Field10' = \"<%=parameter[\"Level 1\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Level 1 and 2"
    query "'Index Field1' = \"Data Management Console\" AND 'Index Field2' = \"Data Definition\" AND 'Status' = \"Active\" AND 'Character Field10' = \"<%=parameter[\"Level 1\"]%>\" AND 'Character Field11' = \"<%=parameter[\"Level 2\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Level 1, 2 and 3"
    query "'Index Field1' = \"Data Management Console\" AND 'Index Field2' = \"Data Definition\" AND 'Status' = \"Active\" AND 'Character Field10' = \"<%=parameter[\"Level 1\"]%>\" AND 'Character Field11' = \"<%=parameter[\"Level 2\"]%>\" AND 'Character Field12' = \"<%=parameter[\"Level 3\"]%>\""
  }
}
model_mapping {
  name "Data Management Console - Helper Data"
  model_name "Data Management Console - Helper Data"
  bridge_name "Local ARS Server"
  structure "KS_SRV_Helper"
  status "Active"
  attribute_mapping {
    attribute_name "Character Field 1"
    field_mapping "<%=field[\"Character Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 10"
    field_mapping "<%=field[\"Character Field10\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 11"
    field_mapping "<%=field[\"Character Field11\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 12"
    field_mapping "<%=field[\"Character Field12\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 13"
    field_mapping "<%=field[\"Character Field13\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 14"
    field_mapping "<%=field[\"Character Field14\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 2"
    field_mapping "<%=field[\"Character Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 3"
    field_mapping "<%=field[\"Character Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 4"
    field_mapping "<%=field[\"Character Field4\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 5"
    field_mapping "<%=field[\"Character Field5\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 6"
    field_mapping "<%=field[\"Character Field6\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 7"
    field_mapping "<%=field[\"Character Field7\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 8"
    field_mapping "<%=field[\"Character Field8\"]%>"
  }
  attribute_mapping {
    attribute_name "Character Field 9"
    field_mapping "<%=field[\"Character Field9\"]%>"
  }
  attribute_mapping {
    attribute_name "Create Date"
    field_mapping "<%=field[\"Create Date\"]%>"
  }
  attribute_mapping {
    attribute_name "Customer Survey ID"
    field_mapping "<%=field[\"CustomerSurveyInstanceID\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Field 1"
    field_mapping "<%=field[\"Date Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Field 2"
    field_mapping "<%=field[\"Date Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Field 3"
    field_mapping "<%=field[\"Date Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Field 4"
    field_mapping "<%=field[\"Date Field4\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Field 5"
    field_mapping "<%=field[\"Date Field5\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Field 6"
    field_mapping "<%=field[\"Date Field6\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Field 7"
    field_mapping "<%=field[\"Date Field7\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Time Field 1"
    field_mapping "<%=field[\"Date/Time Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Time Field 2"
    field_mapping "<%=field[\"Date/Time Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Time Field 3"
    field_mapping "<%=field[\"Date/Time Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Time Field 4"
    field_mapping "<%=field[\"Date/Time Field4\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Time Field 5"
    field_mapping "<%=field[\"Date/Time Field5\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Time Field 6"
    field_mapping "<%=field[\"Date/Time Field6\"]%>"
  }
  attribute_mapping {
    attribute_name "Date Time Field 7"
    field_mapping "<%=field[\"Date/Time Field7\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 1"
    field_mapping "<%=field[\"Index Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 2"
    field_mapping "<%=field[\"Index Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Index Field 3"
    field_mapping "<%=field[\"Index Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Integer Field 1"
    field_mapping "<%=field[\"Integer Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Integer Field 2"
    field_mapping "<%=field[\"Integer Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Integer Field 3"
    field_mapping "<%=field[\"Integer Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Integer Field 4"
    field_mapping "<%=field[\"Integer Field4\"]%>"
  }
  attribute_mapping {
    attribute_name "Integer Field 5"
    field_mapping "<%=field[\"Integer Field5\"]%>"
  }
  attribute_mapping {
    attribute_name "Integer Field 6"
    field_mapping "<%=field[\"Integer Field6\"]%>"
  }
  attribute_mapping {
    attribute_name "Last Modified By"
    field_mapping "<%=field[\"Last Modified By\"]%>"
  }
  attribute_mapping {
    attribute_name "Modified Date"
    field_mapping "<%=field[\"Modified Date\"]%>"
  }
  attribute_mapping {
    attribute_name "Permission"
    field_mapping "<%=field[\"write_permission_group\"]%>"
  }
  attribute_mapping {
    attribute_name "Request ID"
    field_mapping "<%=field[\"Request ID\"]%>"
  }
  attribute_mapping {
    attribute_name "Status"
    field_mapping "<%=field[\"Status\"]%>"
  }
  attribute_mapping {
    attribute_name "Submitter"
    field_mapping "<%=field[\"Submitter\"]%>"
  }
  attribute_mapping {
    attribute_name "Survey ID"
    field_mapping "<%=field[\"SurveyInstanceID\"]%>"
  }
  attribute_mapping {
    attribute_name "Time Field 1"
    field_mapping "<%=field[\"Time Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Time Field 2"
    field_mapping "<%=field[\"Time Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Time Field 3"
    field_mapping "<%=field[\"Time Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Time Field 4"
    field_mapping "<%=field[\"Time Field4\"]%>"
  }
  attribute_mapping {
    attribute_name "Time Field 5"
    field_mapping "<%=field[\"Time Field5\"]%>"
  }
  attribute_mapping {
    attribute_name "Time Field 6"
    field_mapping "<%=field[\"Time Field6\"]%>"
  }
  attribute_mapping {
    attribute_name "Time Field 7"
    field_mapping "<%=field[\"Time Field7\"]%>"
  }
  qualification_mapping {
    qualification_name "All All"
    query "'Index Field1' = \"Filter Matrix\""
  }
  qualification_mapping {
    qualification_name "All Entries"
    query "'Index Field1' = <%=parameter[\"Index Field 1\"]%> AND 'Index Field2' = <%=parameter[\"Index Field 2\"]%> AND 'Index Field3' = <%=parameter[\"Index Field 3\"]%>"
  }
  qualification_mapping {
    qualification_name "All Entries - Special Param 3"
    query "'Index Field1' = <%=parameter[\"Index Field 1\"]%> AND 'Index Field2' = <%=parameter[\"Index Field 2\"]%> AND 'Index Field3' LIKE <%=parameter[\"Index Field 3\"]%> AND ('Status' = \"Active\" OR 'Status' = \"Inactive\") "
  }
  qualification_mapping {
    qualification_name "By Record Id"
    query "'Request ID' = \"<%=parameter[\"Record Id\"]%>\""
  }
  qualification_mapping {
    qualification_name "Index 1"
    query "('Status' = \"Active\" OR 'Status' = \"Inactive\") AND 'Index Field1' = <%=parameter[\"Index Field 1\"]%>"
  }
  qualification_mapping {
    qualification_name "Index 1 | Index 2 (any match/wildcards/non-null)"
    query "('Status' = \"Active\" OR 'Status' = \"Inactive\") AND 'Index Field1' = <%=parameter[\"Index Field 1\"]%> AND 'Index Field2' LIKE <%=parameter[\"Index Field 2\"]%>"
  }
  qualification_mapping {
    qualification_name "Index 1 | Index 2 (exact match/null)"
    query "('Status' = \"Active\" OR 'Status' = \"Inactive\") AND 'Index Field1' = <%=parameter[\"Index Field 1\"]%> AND 'Index Field2' = <%=parameter[\"Index Field 2\"]%>"
  }
  qualification_mapping {
    qualification_name "Index 1 | Index 2 | Index 3 (any match/wildcards/non-null)"
    query "('Status' = \"Active\" OR 'Status' = \"Inactive\") AND 'Index Field1' = <%=parameter[\"Index Field 1\"]%> AND 'Index Field2' = <%=parameter[\"Index Field 2\"]%> AND 'Index Field3' LIKE <%=parameter[\"Index Field 3\"]%>"
  }
  qualification_mapping {
    qualification_name "Index 1 | Index 2 | Index 3 (exact match/null)"
    query "('Status' = \"Active\" OR 'Status' = \"Inactive\") AND 'Index Field1' = <%=parameter[\"Index Field 1\"]%> AND 'Index Field2' = <%=parameter[\"Index Field 2\"]%> AND 'Index Field3' = <%=parameter[\"Index Field 3\"]%>"
  }
}
model_mapping {
  name "Groups"
  model_name "Groups"
  bridge_name "Local ARS Server"
  structure "Group"
  status "Active"
  attribute_mapping {
    attribute_name "Group ID"
    field_mapping "<%=field[\"Group ID\"]%>"
  }
  attribute_mapping {
    attribute_name "Group Name"
    field_mapping "<%=field[\"Group Name\"]%>"
  }
  qualification_mapping {
    qualification_name "Find Current Regular Groups"
    query "'Status' = \"Current\" AND 'Group Category' = \"Regular\""
  }
}