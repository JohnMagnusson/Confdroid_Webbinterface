/**
 * Class used to display group result on search.
 */
$(document).ready(function () {
    getDataFromAPI("Group/"+urlData, null, function(data){printGroupInfo(data)});
});

function printGroupInfo(group)
{
    var url = "User_Result.php?activeType=User&data=";
    createsContainerContent("userDiv", group["users"], url);
    url = "Application_Result.php?activeType=Application&data=";
    createsContainerContent("applicationDiv", group["applications"], url);
    /*Updates information */
    $("#objectType").html("Group");
    $("#name").html('<b>Name:</b> ' + group["name"]);
    $("#prio").html('<b>Prio:</b> ' + group["prio"]);
    $("#id").html('<b>Id:</b> ' + group["id"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(group, "Group", null, "Setting_Page_Info.php?settingType=SQL");};
    document.getElementById('addBtnInfo').onclick = function(){openSettingPage(group, null, "Group", "Add_Page.php?pageName=Add_New&onlyAddNewPage=true");};
    document.getElementById('deleteBtnInfo').onclick = function(e){deleteElement(e, group["name"], group["id"]);};
}