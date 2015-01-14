
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
  qualification {
    name "Cox Dynamic Menu List"
    result_type "Multiple"
    parameter {
      name "Market"
      notes "Customer Market Value"
    }
    parameter {
      name "Question Label"
      notes "Menu Label of the Question"
    }
    parameter {
      name "Template Name"
      notes "Name of the Template"
    }
  }
  qualification {
    name "Index 1 | Index 2 | Index 3 | Character 1"
    result_type "Single"
    parameter {
      name "Character Field 1"
    }
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
}

model {
  name "Notification Content"
  status "Active"
  attribute {
    name "Body"
  }
  attribute {
    name "Instance ID"
  }
  attribute {
    name "Language"
  }
  attribute {
    name "Notification Name"
  }
  attribute {
    name "Request ID"
  }
  attribute {
    name "Scope"
  }
  attribute {
    name "Status"
  }
  attribute {
    name "Subject"
  }
  qualification {
    name "All"
    result_type "Multiple"
  }
  qualification {
    name "By Name"
    result_type "Multiple"
    parameter {
      name "Name"
    }
  }
  qualification {
    name "By Name and Scope"
    result_type "Multiple"
    parameter {
      name "Name"
    }
    parameter {
      name "Scope"
    }
  }
  qualification {
    name "By Name, Scope, and Language"
    result_type "Multiple"
    parameter {
      name "Language"
    }
    parameter {
      name "Name"
    }
    parameter {
      name "Scope"
    }
  }
  qualification {
    name "All Active"
    result_type "Multiple"
  }
  qualification {
    name "All Active by Scope + Global"
    result_type "Multiple"
    parameter {
      name "Scope"
    }
  }
}
model {
  name "Notification Recipient"
  status "Active"
  attribute {
    name "Instance ID"
  }
  attribute {
    name "Language"
  }
  attribute {
    name "Notification Name"
  }
  attribute {
    name "Recipient Value"
  }
  attribute {
    name "Request ID"
  }
  attribute {
    name "Scope"
  }
  attribute {
    name "Status"
  }
  attribute {
    name "Type"
  }
  qualification {
    name "All"
    result_type "Multiple"
  }
  qualification {
    name "By Name"
    result_type "Multiple"
    parameter {
      name "Name"
    }
  }
  qualification {
    name "By Name and Scope"
    result_type "Multiple"
    parameter {
      name "Name"
    }
    parameter {
      name "Scope"
    }
  }
  qualification {
    name "By Name, Scope, and Language"
    result_type "Multiple"
    parameter {
      name "Language"
    }
    parameter {
      name "Name"
    }
    parameter {
      name "Scope"
    }
  }
}

model_mapping {
  name "Data Management Console - Helper Data"
  model_name "Data Management Console - Helper Data"
  bridge_name "Remedy Server - Local"
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
    qualification_name "Cox Dynamic Menu List"
    query "('Status' = \"Active\") AND 'Index Field1' = <%=parameter[\"Template Name\"]%> AND 'Index Field2' = <%=parameter[\"Question Label\"]%> AND( 'Index Field3' = <%=parameter[\"Market\"]%> OR  'Index Field3' =\"ALL\")"
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
  qualification_mapping {
    qualification_name "Index 1 | Index 2 | Index 3 | Character 1"
    query "'Status' = \"Active\" AND 'Index Field1' = <%=parameter[\"Index Field 1\"]%> AND 'Index Field2' = <%=parameter[\"Index Field 2\"]%> AND 'Index Field3' = <%=parameter[\"Index Field 3\"]%> AND 'Character Field1' = <%=parameter[\"Character Field 1\"]%>"
  }
}

model_mapping {
  name "Notification Content"
  model_name "Notification Content"
  bridge_name "Remedy Server - Local"
  structure "KS_SRV_Helper"
  status "Active"
  attribute_mapping {
    attribute_name "Body"
    field_mapping "<%=field[\"Character Field14\"]%>"
  }
  attribute_mapping {
    attribute_name "Instance ID"
    field_mapping "<%=field[\"instanceId\"]%>"
  }
  attribute_mapping {
    attribute_name "Language"
    field_mapping "<%=field[\"Character Field1\"]%>"
  }
  attribute_mapping {
    attribute_name "Notification Name"
    field_mapping "<%=field[\"Index Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Request ID"
    field_mapping "<%=field[\"Request ID\"]%>"
  }
  attribute_mapping {
    attribute_name "Scope"
    field_mapping "<%=field[\"Index Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Status"
    field_mapping "<%=field[\"Status\"]%>"
  }
  attribute_mapping {
    attribute_name "Subject"
    field_mapping "<%=field[\"Character Field13\"]%>"
  }
  qualification_mapping {
    qualification_name "All"
    query "'Index Field1' = \"Notification Content\""
  }
  qualification_mapping {
    qualification_name "All Active"
    query "'Status' = \"Active\" AND 'Index Field1' = \"Notification Content\""
  }
  qualification_mapping {
    qualification_name "All Active by Scope + Global"
    query "'Status' = \"Active\" AND 'Index Field1' = \"Notification Content\" AND ('Index Field3 = \"Global\" OR 'Index Field3' = \"<%=parameter[\"Scope\"]%>\")"
  }
  qualification_mapping {
    qualification_name "By Name"
    query "'Index Field1' = \"Notification Content\" AND 'Index Field2' = \"<%=parameter[\"Name\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Name and Scope"
    query "'Index Field1' = \"Notification Content\" AND 'Index Field2' = \"<%=parameter[\"Name\"]%>\" AND 'Index Field3' = \"<%=parameter[\"Scope\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Name, Scope, and Language"
    query "'Index Field1' = \"Notification Content\" AND 'Index Field2' = \"<%=parameter[\"Name\"]%>\" AND 'Index Field3' = \"<%=parameter[\"Scope\"]%>\" AND 'Character Field1' = \"<%=parameter[\"Language\"]%>\""
  }
}
model_mapping {
  name "Notification Recipient"
  model_name "Notification Recipient"
  bridge_name "Remedy Server - Local"
  structure "KS_SRV_Helper"
  status "Active"
  attribute_mapping {
    attribute_name "Instance ID"
    field_mapping "<%=field[\"instanceId\"]%>"
  }
  attribute_mapping {
    attribute_name "Language"
    field_mapping "<%=field[\"Character Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Notification Name"
    field_mapping "<%=field[\"Index Field2\"]%>"
  }
  attribute_mapping {
    attribute_name "Recipient Value"
    field_mapping "<%=field[\"Character Field13\"]%>"
  }
  attribute_mapping {
    attribute_name "Request ID"
    field_mapping "<%=field[\"Request ID\"]%>"
  }
  attribute_mapping {
    attribute_name "Scope"
    field_mapping "<%=field[\"Index Field3\"]%>"
  }
  attribute_mapping {
    attribute_name "Status"
    field_mapping "<%=field[\"Status\"]%>"
  }
  attribute_mapping {
    attribute_name "Type"
    field_mapping "<%=field[\"Character Field1\"]%>"
  }
  qualification_mapping {
    qualification_name "All"
    query "'Index Field1' = \"Notification Recipient\""
  }
  qualification_mapping {
    qualification_name "By Name"
    query "'Index Field1' = \"Notification Recipient\" AND 'Index Field2' = \"<%=parameter[\"Name\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Name and Scope"
    query "'Index Field1' = \"Notification Recipient\" AND 'Index Field2' = \"<%=parameter[\"Name\"]%>\" AND 'Index Field3' = \"<%=parameter[\"Scope\"]%>\""
  }
  qualification_mapping {
    qualification_name "By Name, Scope, and Language"
    query "'Index Field1' = \"Notification Recipient\" AND 'Index Field2' = \"<%=parameter[\"Name\"]%>\" AND 'Index Field3' = \"<%=parameter[\"Scope\"]%>\" AND 'Character Field2' = \"<%=parameter[\"Language\"]%>\""
  }
}
