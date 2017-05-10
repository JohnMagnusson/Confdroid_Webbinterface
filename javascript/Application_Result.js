/**
 * Created by Elias on 2017-05-09.
 */
$(document).ready(function () {
    getDataFromAPI("Application/"+urlData, null, function(data){printApplicationInfo(data)});
});

function printApplicationInfo(application)
{
    var url = "Group_Result.php?activeType=Group&data=";
    createPTagsForData("groupDiv", application["groups"], url, "id");
    url = "Device_Result.php?activeType=Device&data=";
    createPTagsForData("deviceDiv", application["devices"], url,"imei");
    $("#objectType").html("Application");
    $("#name").html('<b>Name:</b> ' + application["name"]);
    $("#apkName").html('<b>Apk Name:</b> ' + application["apkName"]);
    $("#packageName").html('<b>Package Name:</b> ' + application["packageName"]);
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + application["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + application["groups"].length);
    $("#nrOfUsers").html('<b>Nr groups in:</b> ' + application["users"].length);
    $("#id").html('<b>Id:</b> ' + application["id"]);
    // document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(user, "User");};
}