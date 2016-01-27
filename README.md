for utility package
========================
To Install:

-Place the package in your packages
-Place the library from datamanagement/setup/library in your library folder
-import the arx file from the datamanagement/setup/Data folder into your KS_SRV_Helper form
-import the bridges from the datamanagement/setup/Bridges(using KURL, more information about how to do this can be found on community)
-import the handlers from the from the datamanagement/setup/Handlers
-import the Service Items and tree from datamanagement/setup/Service Items 
    The following information is important for the service item import:
	The 5.2 service items are largely the same as the 5.1 service items. There are two main differences:
	1) the 5.2 Upload item provided uses a Task 4 tree. The item and the tree are provided because the tree will 
	   likely not import with the item successfully because your task server will be named something different 
	   than ours is. Once you import the service items, set the task server information at the catalog level, 
	   then import the tree. You should be good to go.
	2) The catalog will now have the task server information defined on it. You will need to update this to
	   match your task server information.
	
	NOTE: The items will import into a Catalog Name of "Data Management". You may move them into whatever 
	the name of your catalog is. We have to name it something for export.
	   
	Also, you will need to Update the Advanced tab on each item to reflect the correct "slug" for your catalog.
	***There is also one text element on the "Data Management Console" service item, called "Add Data Type" that
	also has to be updated with the catalog slug. Also, there are links in the Confirmation Text on the Confirmation 
	Page of the "New Data Set Definition" item that need to be updated with the slug.***
	
	Note: you may also need to change the Display Page (JSP) path to reflect the name of your theme if you have renamed it 
	from the default of "responsive". If you do, there are paths that need changing in the Advanced headers of the  Add Update
	and File Upload items as well.

