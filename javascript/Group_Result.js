/**
 * Created by Elias on 2017-05-04.
 */
$(document).ready(function () {
    search2(token, adminId, "Group/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(group)
{
    console.log(group);
    var url = "User_Result.php?activeType=User&data=";
    createPTagsForData("userDiv", group["users"], url,"authToken");
    url = "Application_Result.php?activeType=Application&data=";
    createPTagsForData("applicationDiv", group["applications"], url,"imei");
}