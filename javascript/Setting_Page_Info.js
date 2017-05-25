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
            updateApplicationInfo(dataObject);
            break;
        case"Variable":
            updateVariableInfo(dataObject);
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
    var newValues = {};

    /*Updates the php session */
    user["name"] = name;
    user["email"] = email;
    for(var i = 0; i < dataObject["variables"].length; i++)
    {
        var variable = dataObject["variables"][i];
        // console.log(variable);
        user[variable["name"]] = $("#"+variable["name"]).val();
        var variableNewValue = {};
        variableNewValue["value"] = $("#"+variable["name"]).val();
        console.log("user/"+user["id"]+"/variable/"+variable["id"]);
        console.log(JSON.stringify(variableNewValue));
        apiChangeData("user/"+user["id"]+"/variable/"+variable["id"],"PUT",JSON.stringify(variableNewValue), function (status) {

        });
    }
    var dataToSend = "dataObject="+JSON.stringify(user)+"&dataType=User";
    objectToSessionObject(dataToSend);
    /*Updates the value in the database */
    newValues["name"] = name;
    newValues["email"] = email;
    console.log(JSON.stringify(newValues));
    apiChangeData("user/"+user["id"],"PUT",JSON.stringify(newValues), function (status) {
        printStatusSettingPageInfo(status);
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
    /*Updates the Php session that stores the object*/
    device["name"] = name;
    device["imei"] = imei;

    var dataToSend = "dataObject="+JSON.stringify(device)+"&dataType=Device";
    objectToSessionObject(dataToSend);
    /*Updates the value in the database */
    var newValues = {};
    newValues["name"] = name;
    newValues["imei"] = imei;
    apiChangeData("device/"+device["id"],"PUT",JSON.stringify(newValues),function (status) {
        printStatusSettingPageInfo(status);
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
    /*Updates the php session */
    group["name"] = name;
    group["prio"] = prio;
    console.log(JSON.stringify(group));
    var dataToSend = "dataObject="+JSON.stringify(group)+"&dataType=Group";
    objectToSessionObject(dataToSend);
    /*Updates the value in the database */
    var newValues = {};
    newValues["name"] = name;
    newValues["prio"] = prio;
    apiChangeData("group/"+group["id"],"PUT",JSON.stringify(newValues),function (status) {
        printStatusSettingPageInfo(status);
    });
}

/**
 * Updates the group with values from textBoxes on the site.
 * @param application
 */
function updateApplicationInfo(application)
{
    var name=$("#name").val();
    var apkName=$("#apkName").val();
    var apkURL=$("#apkURL").val();
    var packageName=$("#packageName").val();
    var dataDir=$("#dataDir").val();
    var forceInstall=$("#forceInstall").val();

    /*Updates the php session */
    application["name"] = name;
    application["apkName"] = apkName;
    application["apkURL"] = apkURL;
    application["packageName"] = packageName;
    application["dataDir"] = dataDir;
    application["forceInstall"] = forceInstall;
    var dataToSend = "dataObject="+JSON.stringify(application)+"&dataType=Application";
    objectToSessionObject(dataToSend);
    /*Updates the value in the database */
    var newValues = {};
    newValues["name"] = name;
    newValues["apkName"] = apkName;
    newValues["apkURL"] = apkURL;
    newValues["packageName"] = packageName;
    newValues["dataDir"] = dataDir;
    newValues["forceInstall"] = forceInstall;
    apiChangeData("application/"+application["id"],"PUT",JSON.stringify(newValues),function (status) {
        printStatusSettingPageInfo(status);
    });
}

function updateVariableInfo(variable)
{
    var name=$("#name").val();
    /*Updates the php session */
    variable["name"] = name;
    console.log(JSON.stringify(variable));
    var dataToSend = "dataObject="+JSON.stringify(variable)+"&dataType=Variable";
    objectToSessionObject(dataToSend);
    /*Updates the value in the database */
    var newValues = {};
    newValues["name"] = name;
    apiChangeData("variable/"+variable["id"],"PUT",JSON.stringify(newValues),function (status) {
        printStatusSettingPageInfo(status);
    });
}

/**
 * Post data to Session_Page.php that converts the post object to session object.
 * The data is split and stored in $_Session["dataObject"] and $_Session["dataType"].
 * @param dataToSend
 */
function objectToSessionObject(dataToSend)
{
    $.ajax({
        type: "POST",
        url: "Setting_Pages/Session_Page.php",
        data: dataToSend,
        success: function(response){
            // console.log(response);
        }
    });
}

/**
 * Pritns status of apiCalls in way that is suited for the page.
 * @param status
 */
function printStatusSettingPageInfo(status)
{
    switch(status)
    {
        case 200:
            alert("Updated successfully");
            // document.getElementById("errorField").innerText = "Updated successful";
            break;
        case 404:
            alert("This" + dataType + " doesn't exist anymore");
            break;
        default:
            alert("Error, try again");
            // document.getElementById("errorField").value = "Error, try again";
            break;
    }
    // if(window.opener === null) {
    //     location.reload();
    // }
    // else
    //     window.opener.location.reload();
}