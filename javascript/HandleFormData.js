/**
 * Functions to get data from an form and create an object from that data
 */

/**
 * Checks which object that is to be created
 */
function handleForm()
{
    switch(dataTypeToAdd)
    {
        case "Group":
            createGroup();
            break;
        case "User":
            createUser();
            break;
        case "Application":
            createApplication();
            break;
        case "Device":
            createDevice();
            break;
        case "SQL":
            createSql();
            break;
        case "XML":
            createXml();
            break;
    }
}

/**
 * Creates a group with data from form
 */
function createGroup()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["prio"] = document.getElementById("prio").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Group", "POST", myJson, function (status) {
        printStatusHandleFormData(status);
    });
}

/**
 * Creates a user with data from form
 */
function createUser()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["email"] = document.getElementById("email").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("User", "POST", myJson, function (status) {
        printStatusHandleFormData(status);
    });
}

/**
 * Creates a application with data from form
 */
function createApplication()
{
    var data = {};
    data["apkName"] = document.getElementById("apk_name").value;
    data["apkURL"] = document.getElementById("apk_url").value;
    // console.log(document.getElementById("force_install").checked);
    data["forceInstall"] = document.getElementById("force_install").checked;
    data["packageName"] = document.getElementById("package_name").value;
    data["dataDir"] = document.getElementById("data_dir").value;
    data["name"] = document.getElementById("friendly_name").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Application", "POST", myJson, function (status) {
        printStatusHandleFormData(status);
    });
}

/**
 * Creates a device with data from form
 */
function createDevice()
{
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["imei"] = document.getElementById("imei").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("Device", "POST", myJson, function (status) {
        printStatusHandleFormData(status);
    });
}

/**
 * Creates a sql setting with data from form
 */
function createSql()
{
    var data = {};
    data["name"] = document.getElementById("settingName").value;
    data["dblocation"] = document.getElementById("dbLocationTxt").value;
    data["query"] = document.getElementById("queryTxt").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("sqlsetting", "POST", myJson, function (status) {
        printStatusHandleFormData(status);
    });
}

/**
 * Creates a xml setting with data from form
 */
function createXml()
{
    var data = {};
    data["name"] = document.getElementById("settingName").value;
    data["fileLocation"] = document.getElementById("fileLocationTxt").value;
    data["regexp"] = document.getElementById("regexpTxt").value;
    data["replaceWith"] = document.getElementById("replaceWithTxt").value;
    var myJson = JSON.stringify(data);
    console.log(myJson);
    apiChangeData("xmlsetting", "POST", myJson, function (status) {
        printStatusHandleFormData(status);
    });
}

/**
 * Prints message depending on status call from API.
 * @param status
 */
function printStatusHandleFormData(status)
{
    switch(status)
    {
        case 200:
            alert("Succesfully created "+dataTypeToAdd);
            break;
        case 201:
            alert("Successfully added "+dataTypeToAdd);
            break;
        case 404:
            alert("This " + dataTypeToAdd + " doesn't exist anymore.");
            break;
        case 409:
            alert("Some conflict happened");
            break;
        default:
            alert("Error, try again");
            break;
    }
    if(window.opener == null) {
        location.reload();
    }
    else
        window.opener.location.reload();
}