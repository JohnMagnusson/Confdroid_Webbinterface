/**
 * Class used to display Device result on search.
 */
$(document).ready(function () {
    getDataFromAPI("Device/"+urlData, null, function(data){printDeviceInfo(data)});
});

function printDeviceInfo(device)
{
    var url = "Application_Result.php?activeType=Application&data=";
    createsContainerContent("applicationDiv", device["applications"], url);
    var url = "User_Result.php?activeType=User&data=";
    if(device["user"] != null)
        createsContainerContent("userDiv", new Array(device["user"]), url);

    $("#objectType").html("Device");
    $("#name").html('<b>Name:</b> ' + device["name"]);
    $("#nrOfApplications").html('<b>Nr applications:</b> ' + device["applications"].length);
    $("#createdDate").html('<b>Date created:</b> ' + device["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + device["id"]);
    $("#imei").html('<b>Imei:</b> ' + device["imei"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(device, "Device", null, "Setting_Page_Info.php?settingType=SQL");};
    document.getElementById('addBtnInfo').onclick = function(){openSettingPage(device, null, "Device", "Add_Page.php?pageName=Add_New&onlyAddNewPage=true");};
    document.getElementById('deleteBtnInfo').onclick = function(e){deleteElement(e, device["name"], device["id"]);};
    for (var i = 0; i < document.getElementsByClassName("addIcon").length; i++) {

        document.getElementsByClassName("addIcon")[i].onclick = function (e) {
            openSettingPage(device, "Device", e.target.parentNode.parentNode.firstChild.nextSibling.getAttribute("templateType"), "Add_Page.php?pageName=Add_Existing&onlyAddNewPage=false");
        }
    }
}