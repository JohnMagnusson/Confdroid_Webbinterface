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
    $("#name").html('<b>Name:</b> ' + $($.parseHTML(application["name"])).text());
    $("#apkName").html('<b>Apk Name:</b> ' + $($.parseHTML(application["apkName"])).text());
    $("#apkURL").html('<b>APK Url:</b> ' + $($.parseHTML(application["apkURL"])).text());
    $("#packageName").html('<b>Package Name:</b> ' + $($.parseHTML(application["packageName"])).text());
    $("#dataDir").html('<b>Data dir:</b> ' + $($.parseHTML(application["dataDir"])).text());
    $("#forceInstall").html('<b>Force install:</b> ' + $($.parseHTML(application["forceInstall"])).text());
    $("#nrOfDevices").html('<b>Nr devices:</b> ' + application["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + application["groups"].length);
    $("#nrOfUsers").html('<b>Nr users in:</b> ' + application["users"].length);
    $("#id").html('<b>Id:</b> ' + application["id"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(application, "Application", null, "Setting_Page_Info.php?settingType=SQL");};
    document.getElementById('addBtnInfo').onclick = function(){openSettingPage(application, null, "Application", "Add_Page.php?pageName=Add_New&onlyAddNewPage=true");};
    document.getElementById('deleteBtnInfo').onclick = function(e){deleteElement(e, application["name"], application["id"]);};
    for (var i = 0; i < document.getElementsByClassName("addIcon").length; i++) {

        document.getElementsByClassName("addIcon")[i].onclick = function (e) {
            openSettingPage(application, "Application", e.target.parentNode.parentNode.firstChild.nextSibling.getAttribute("templateType"), "Add_Page.php?pageName=Add_Existing&onlyAddNewPage=false");
        }
    }
}