/**
 * Created by Elias on 2017-05-04.
 */
$(document).ready(function () {
    getDataFromAPI("Group/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(group)
{
    var url = "User_Result.php?activeType=User&data=";
    createPTagsForData("userDiv", group["users"], url,"authToken");
    url = "Application_Result.php?activeType=Application&data=";
    createPTagsForData("applicationDiv", group["applications"], url,"imei");
    /*Updates information */
    $("#objectType").html("Group");
    $("#name").html('<b>Name:</b> ' + group["name"]);
    $("#prio").html('<b>Prio:</b> ' + group["prio"]);
    $("#id").html('<b>Id:</b> ' + group["id"]);
}