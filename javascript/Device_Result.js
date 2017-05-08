$(document).ready(function () {
    search2(token, adminId, "Device/"+data, null, function(data, searchType){printUserInfo(data)});
});

function printUserInfo(device)
{
    console.log(device);
}