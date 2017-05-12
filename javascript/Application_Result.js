/**
 * Class used to display Applicaiton result on search.
 */
$(document).ready(function () {
    getDataFromAPI("Application/"+urlData, null, function(data){printApplicationInfo(data)});
});

function printApplicationInfo(application)
{
    var url = "Group_Result.php?activeType=Group&data=";
    createsContainerContent("groupDiv", application["groups"], url);
    url = "Device_Result.php?activeType=Device&data=";
    createsContainerContent("deviceDiv", application["devices"], url);
    url = "User_Result.php?activeType=User&data=";
    createsContainerContent("userDiv", application["users"], url);
    $("#objectType").html("Application");
    $("#name").html('<b>Name:</b> ' + application["name"]);
    $("#apkName").html('<b>Apk Name:</b> ' + application["apkName"]);
    $("#packageName").html('<b>Package Name:</b> ' + application["packageName"]);
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + application["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + application["groups"].length);
    $("#nrOfUsers").html('<b>Nr users in:</b> ' + application["users"].length);
    $("#id").html('<b>Id:</b> ' + application["id"]);
    // document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(user, "User");};
}