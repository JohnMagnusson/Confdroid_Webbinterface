$(document).ready(function () {
    getDataFromAPI("Device/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(device)
{
    var url = "Application_Result.php?activeType=App&data=";
    createPTagsForData("applicationDiv", device["applications"], url, "id");
}