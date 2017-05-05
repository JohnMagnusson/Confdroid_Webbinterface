/**
 * Display user result
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
    /*Display all vital information about the user in the infoDiv */
    $("#name").html('<b>Name:</b> ' + user[0]["name"]);
    $("#email").html('<b>Email:</b> ' + user[0]["email"]);
    $("#nrOfDevces").html('<b>Nr devices:</b> ' + user[0]["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + user[0]["groups"].length);
    $("#createdDate").html('<b>Date created:</b> ' + user[0]["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + user[0]["id"]);
    $("#authToken").html('<b>Authtoken:</b> ' + user[0]["authToken"]);
}
