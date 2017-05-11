$(document).ready(function () {
    getDataFromAPI("Device/"+urlData, null, function(data){printUserInfo(data)});
});

function printUserInfo(device)
{
    var url = "Application_Result.php?activeType=Application&data=";
    createPTagsForData("applicationDiv", device["applications"], url, "id");

    $("#objectType").html("Device");
    $("#name").html('<b>Name:</b> ' + device["name"]);
    $("#nrOfApplications").html('<b>Nr applications:</b> ' + device["applications"].length);
    $("#createdDate").html('<b>Date created:</b> ' + device["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + device["id"]);
    $("#imei").html('<b>Imei:</b> ' + device["imei"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(device, "Device", null, "Setting_Page_Info.php?settingType=SQL");};
}