/**
 * Functions for the admin interface page
 */
$(document).ready(function () {
    var url=window.location.href.split('/');
    var name=url[url.length-1];
    if(name.indexOf("Admin_Interface.php") >= 0) {
        document.getElementsByClassName("addIcon")[0].onclick = function () {
            openSettingPage(null, null, activeType, "Add_Page.php?pageName=Add_New&onlyAddNewPage=true");
        }
    }
});

/**
 * Prints the searched data.
 * @param data
 * @param searchType
 */
function printData(data, searchType)
{
    var url;
    switch(searchType)
    {
        case "User":
            url = "User_Result.php?activeType=User&data=";
            activeType = "User";
            break;
        case "Group":
            url = "Group_Result.php?activeType=Group&data=";
            activeType = "Group";
            break;
        case "Device":
            url = "Device_Result.php?activeType=Device&data=";
            activeType = "Device";
            break;
        case "Application":
            url = "Application_Result.php?activeType=Application&data=";
            activeType = "Application";
            break;
    }
    createsContainerContent("searchInfo", data, url);
}