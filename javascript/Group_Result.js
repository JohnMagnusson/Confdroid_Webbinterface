/**
 * Created by Elias on 2017-05-04.
 */
$(document).ready(function () {
    search2(token, adminId, "Group/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(group)
{
    // console.log(group);
    // var url = "User_Result.php?activeType=User&data=";
    // createPTagsForData("userDiv", group[0]["users"], url,"authToken");
    // url = "Device_Result.php?activeType=Device&data=";
    // createPTagsForData("deviceDiv", group[0]["devices"], url,"imei");
}