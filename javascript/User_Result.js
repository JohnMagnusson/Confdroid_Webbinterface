/**
 * Class used to display information about a specific user.
 */
$(document).ready(function () {
    getDataFromAPI("User/"+urlData, null, function(data){printUserInfo(data)});
});

/**
 * Prints all the information about the user.
 * @param user
 */
function printUserInfo(user)
{
    var url = "Group_Result.php?activeType=Group&data=";
    createsContainerContent("groupDiv", user["groups"], url);            //Displays the users groups
    url = "Device_Result.php?activeType=Device&data=";
    createsContainerContent("deviceDiv", user["devices"], url);          //Displays the users devices
    url = "Application_Result.php?activeType=Application&data=";
    createsContainerContent("applicationDiv", user["applications"], url);//Displays the users applications
    url = "Variable_Result.php?activeType=Variable&data=";
    createsContainerContent("variableDiv", user["variables"], url);     //Displays the users applications
    /*Display all vital information about the user in the infoDiv */
    $("#objectType").html("User");
    $("#name").html('<b>Name:</b> ' +  $($.parseHTML(user["name"])).text());
    $("#email").html('<b>Email:</b> ' +  $($.parseHTML(user["email"])).text());
    $("#nrOfDevces").html('<b>Nr devices:</b> ' + user["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + user["groups"].length);
    $("#createdDate").html('<b>Date created:</b> ' + user["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + user["id"]);
    $("#authToken").html('<b>Authtoken:</b> ' + user["authToken"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(user, "User", null, 'Setting_Page_Info.php');};
    document.getElementById('deleteBtnInfo').onclick = function(e){deleteElement(e, user["name"], user["id"]);};
    for (var i = 0; i < document.getElementsByClassName("addIcon").length; i++) {

        document.getElementsByClassName("addIcon")[i].onclick = function (e) {
            openSettingPage(user, "User", e.target.parentNode.parentNode.firstChild.nextSibling.getAttribute("templateType"), "Add_Page.php?pageName=Add_Existing&onlyAddNewPage=false");
        }
    }
}