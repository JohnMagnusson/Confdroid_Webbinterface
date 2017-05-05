/**
 * Created by Elias on 2017-05-04.
 */
$(document).ready(function () {
    search2(token, adminId, "Group/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(group)
{
    console.log(group)
    // console.log(group);
    // var url = "User_Result.php?data=";
    // createPTagsForData("userDiv", group[0]["users"], url,"authToken");
    // url = "Device_Result.php?data=";
    // createPTagsForData("deviceDiv", group[0]["devices"], url,"imei");
    /*Display all vital information about the user in the infoDiv */
    $("#name").html('<b>Name:</b> ' + group[0]["name"]);
    $("#prio").html('<b>Prio:</b> ' + group[0]["prio"]);
    $("#id").html('<b>Id:</b> ' + group[0]["id"]);
}