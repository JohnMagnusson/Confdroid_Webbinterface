/**
 * Created by Elias on 2017-05-02.
 */
$(document).ready(function () {
    getDataFromAPI("User/"+urlData, null, function(data){printUserInfo(data)});
});

function printUserInfo(user)
{
    var url = "Group_Result.php?activeType=Group&data=";
    createPTagsForData("groupDiv", user["groups"], url, "id");
    url = "Device_Result.php?activeType=Device&data=";
    createPTagsForData("deviceDiv", user["devices"], url,"imei");
    url = "Application_Result.php?activeType=Application&data=";
    createPTagsForData("applicationDiv", user["applications"], url,"id");
    /*Display all vital information about the user in the infoDiv */
    $("#objectType").html("User");
    $("#name").html('<b>Name:</b> ' + user["name"]);
    $("#email").html('<b>Email:</b> ' + user["email"]);
    $("#nrOfDevces").html('<b>Nr devices:</b> ' + user["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + user["groups"].length);
    $("#createdDate").html('<b>Date created:</b> ' + user["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + user["id"]);
    $("#authToken").html('<b>Authtoken:</b> ' + user["authToken"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(user, "User", null, 'Setting_Page_Info.php');};
    for (var i = 0; i < document.getElementsByClassName("addIcon").length; i++) {

        document.getElementsByClassName("addIcon")[i].onclick = function (e) {
            openSettingPage(user, "User", e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML.slice(0, -1), "Add_Page_Info.php");
        }
    }
}