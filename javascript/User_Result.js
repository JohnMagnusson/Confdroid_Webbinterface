/**
 * Created by Elias on 2017-05-02.
 */
$(document).ready(function () {
    search2(token, adminId, "User/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(user)
{
    var url = "Group_Result.php?data=";
    createPTagsForData("groupDiv", user[0]["groups"], url, "id");
    url = "Device_Result.php?data=";
    createPTagsForData("deviceDiv", user[0]["devices"], url,"imei");
    console.log(user);
    $("name").text("Name: ss" + user[0]["id"]);
    $("name").text("Name: ss" + user[0]["name"]);
}