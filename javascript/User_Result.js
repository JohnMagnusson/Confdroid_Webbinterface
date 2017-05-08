/**
 * Created by Elias on 2017-05-02.
 */
$(document).ready(function () {
    search2(token, adminId, "User/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(user)
{
    var url = "Group_Result.php?activeType=Group&data=";
    createPTagsForData("groupDiv", user["groups"], url, "id");
    url = "Device_Result.php?activeType=Device&data=";
    createPTagsForData("deviceDiv", user["devices"], url,"imei");
}