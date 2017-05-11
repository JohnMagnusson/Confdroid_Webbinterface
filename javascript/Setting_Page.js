/**Javascript for the Setting Page **/
function changeObjectData()
{
    switch(dataType)                   //Switch depending on the site that is loaded.
    {
        case"User":
            updateUserInfo(dataObject);
            break;
        case"Device":
            updateDeviceInfo(dataObject);
            break;
        case"Group":
            updateGroupInfo(dataObject);
            break;
         case"Application":
            alert("Application not implemented yet");
            break;
    }
}
/**
 * Updates user info with values from textBoxes on the site.
 * @param user
 */
function updateUserInfo(user){
    var name=$("#name").val();
    var email=$("#email").val();
    console.log(user);
    user["name"] = name;
    user["email"] = email;
    console.log(user);
    $.ajax({
        type: "PUT",
        url: "https://confdroid.brainstorm-labs.net/api/user/"+user["authToken"]+".json",
        data: user,
        success: function(result){
            console.log(result);
            document.getElementById("errorField").innerText = "User information updated";
        },
        error: function( jqXHR, textStatus, errorThrown) {
            switch(jqXHR["status"])
            {
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"] + " Response text: " + jqXHR["responseText"]);
                    document.getElementById("errorField").innerText = "Something went wrong test again";
                    break;
            }
        }
    });
}
/**
 * Updates the device with values from textBoxes on the site.
 * @param device
 */
function updateDeviceInfo(device)
{
    var name=$("#name").val();
    var imei=$("#imei").val();
    var newValues = {};
    newValues["name"] = name;
    newValues["imei"] = imei;

    /*Updates the Php session that stores the object*/
    device["name"] = name;
    device["imei"] = imei;

    // device = JSON.stringify(device);
    var dataToSend = "dataObject="+JSON.stringify(device)+"&dataType=Device";
    $.ajax({
        type: "POST",
        url: "Setting_Pages/Session_Page.php",
        data: dataToSend,
        success: function(response){
            console.log(response);
        }
    });
    console.log(imei);
    console.log(device["imei"]);
    $.ajax({
        type: "PUT",
        url: "https://confdroid.brainstorm-labs.net/api/device/"+device["imei"]+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie"),
        data: JSON.stringify(newValues),
        success: function(result){
            console.log(result);
            document.getElementById("errorField").innerText = "Device information updated";
        },
        error: function( jqXHR, textStatus, errorThrown) {
            switch(jqXHR["status"])
            {
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"] + " Response text: " + jqXHR["responseText"]);
                    document.getElementById("errorField").innerText = "Something went wrong test again";
                    break;
            }
        }
    });
}
/**
 * Updates the group with values from textBoxes on the site.
 * @param group
 */
function updateGroupInfo(group)
{
    var name=$("#name").val();
    var prio=$("#prio").val();
    group["name"] = name;
    group["prio"] = prio;
    console.log(group);
    $.ajax({
        type: "PUT",
        url: "https://confdroid.brainstorm-labs.net/api/Group/"+group["id"]+".json",
        data: group,
        success: function(result){
            console.log(result);
        },
        error: function( jqXHR, textStatus, errorThrown) {
            switch(jqXHR["status"])
            {
                case 200:
                    document.getElementById("errorField").innerText = "Group information updated";
                    break;
                default:
                    console.log("Textstatus: " + textStatus + " ErrorThrown: " + errorThrown + " Status code: " + jqXHR["status"] + " Response text: " + jqXHR["responseText"]);
                    document.getElementById("errorField").innerText = "Something went wrong test again";
                    break;
            }
        }
    });
}