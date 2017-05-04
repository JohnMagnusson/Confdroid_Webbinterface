/**
 * Created by Elias on 2017-05-02.
 */
$(document).ready(function () {
    search2(token, adminId, "User/"+userId, null, function(data, searchType, authToken, id){printUserInfo(data, authToken, id)});
});

function printUserInfo(user, authToken, id)
{
    var url = "Group_Result.php?authToken="+authToken+"&id="+id+"&groupId=";
    createPTagsForData("groupDiv", user[0]["groups"], url);
    url = "Device_Result.php?authToken="+authToken+"&id="+id+"&deviceImei=";
    createPTagsForData("deviceDiv", user[0]["devices"], url);

    // for(var i = 0; i < groups.length; i++)
    // {
    //     var p = document.createElement("p");
    //     p.id = i;
    //     p.innerHTML = groups[i]["name"] + "<img src='../images/Trash-can-icon.png' class='img'><img src='../images/Settings-icon.png' class='img'>";
    //     p.classList.add("templateText");
    //     p.onclick = function(e){url+=groups[e.target.id]["id"];changeLocation(url)};
    //     document.getElementById("groupDiv").appendChild(p);
    // }
    // var devices = user[0]["devices"];
    // for(var i = 0; i < devices.length; i++)
    // {
    //     var p = document.createElement("p");
    //     p.id = i;
    //     p.innerHTML = devices[i]["name"] + "<img src='../images/Trash-can-icon.png' class='img'><img src='../images/Settings-icon.png' class='img'>";
    //     p.classList.add("templateText");
    //     document.getElementById("deviceDiv").appendChild(p);
    // }
}