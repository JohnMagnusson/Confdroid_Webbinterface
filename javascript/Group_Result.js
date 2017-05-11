/**
 * Created by Elias on 2017-05-04.
 */
$(document).ready(function () {
    getDataFromAPI("Group/"+urlData, null, function(data){printUserInfo(data)});
});

function printUserInfo(group)
{
    var url = "User_Result.php?activeType=User&data=";
    createPTagsForData("userDiv", group["users"], url,"authToken");
    url = "Application_Result.php?activeType=Application&data=";
    createPTagsForData("applicationDiv", group["applications"], url,"id");
    /*Updates information */
    $("#objectType").html("Group");
    $("#name").html('<b>Name:</b> ' + group["name"]);
    $("#prio").html('<b>Prio:</b> ' + group["prio"]);
    $("#id").html('<b>Id:</b> ' + group["id"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(group, "Group", null, "Setting_Page_Info.php?settingType=SQL");};
}