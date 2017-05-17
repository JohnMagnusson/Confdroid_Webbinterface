/*Javascript file for the php page Setting_Page_XML-SQL.php */
/*Updates the textArea with the clicked elements SQL or xml setting depending on the settingType*/

$('document').ready(function(){
    document.getElementById("li"+settingType).classList.add("activeSqlXml");
    console.log(dataObject);
});
/**
 * Updates the menu to the left with names on the applications.
 * @param settingType
 * @param application
 */
function updateSqlXmlMenu(e, settingType, application)
{
    cleanTextArea(settingType);                                        /*Clear textAreas*/
    if(document.getElementsByClassName("selectedApp")[0] != null) {    /*Puts selected class on click element*/
        document.getElementsByClassName("selectedApp")[0].classList.remove("selectedApp");
    }
    e.target.classList.add("selectedApp");

    $("#settingContainer").empty();
    document.getElementById("addBtn").style.visibility = "visible"     /*Displays add button when user can add a setting */
    if(application[settingType+ "_settings"].length >= 1)              //Checks if the object have settings fo the application. If not displays a message.
    {
        for(var i = 0; i < application[settingType+ "_settings"].length; i++)
        {
            createPTagsForData("settingContainer",application[settingType+ "_settings"][i], application[settingType+ "_settings"][i]["name"],settingType + ":"+i);
        }
    }
    else
        document.getElementById("settingContainer").innerHTML = "No Setting for this application";
}
/**
 * Updates the teaxtAreas
 * @param settingType, Decides which texAreas to target.
 * @param data, The data to paste in to textAreas.
 */
function updateTextArea(e,settingType,data)
{
    cleanTextArea(settingType);                                            /*Clear textAreas*/
    document.getElementById("updateBtn").style.visibility = "visible";     /*Button that updates the settings is now displayed */
    document.getElementById("addBtn").style.visibility = "visible"  /*Displays add button when user can add a setting */
    if(document.getElementsByClassName("selectedSetting")[0] != null) {    /*Puts selected class on click element*/
        document.getElementsByClassName("selectedSetting")[0].classList.remove("selectedSetting");
    }
    e.target.classList.add("selectedSetting");
    console.log("SettingType: " + settingType);
    if(settingType == "SQL")
    {
        document.getElementById("dbLocationTxt").innerHTML = data["dblocation"];
        document.getElementById("queryTxt").innerHTML = data["query"];
    }
    else
    {
        document.getElementById("fileLocationTxt").innerHTML = data["fileLocation"];
        document.getElementById("regexpTxt").innerHTML = data["regexp"];
        document.getElementById("replaceWithTxt").innerHTML = data["replaceWith"];
    }
}
/**
 * Creates a div, p tag and a thrashcan picture for text.
 * @param parentId
 * @param data
 * @param name
 */
function createPTagsForData(parentId, data, name, id)
{
    var div = document.createElement("div");
    div.id = "dataDiv"+id;
    var p = document.createElement("p");
    var trashCan = document.createElement("img");
    trashCan.id = id;
    trashCan.src = "../images/trash-can-icon.png";
    trashCan.classList.add("trashCanImg");
    p.id = id;
    p.innerHTML = name;
    div.appendChild(trashCan);
    div.appendChild(p);
    div.classList.add("textSettingMenu");
    document.getElementById(parentId).appendChild(div);
    trashCan.onclick = function (e)
    {
        var apiType = "application/";
        if(dataType == "Application")
            var appId = dataObject["id"];
        else
            var appId = dataObject["applications"][document.getElementsByClassName("selectedApp")[0].id.split("app")[1]]["id"];
        var lowerCaseSettingType = settingType.toLowerCase();
        var setting = "/"+lowerCaseSettingType + "setting/";
        var settingId = data["id"];
        apiType = apiType + appId + setting + settingId;
        if(confirm("Are you sure you want to delete " + settingType+":"+data["name"] + "?"))
        {
            //Delete
            if(dataType == "Application")
                dataObject[settingType+"_settings"].splice([trashCan.id.split("L")[1]],1);
            else
                dataObject["applications"][document.getElementsByClassName("selectedApp")[0].id.split("app")[1]][settingType+"_settings"].splice([trashCan.id.split("L")[1]],1);
            var dataToUpdate = "dataObject="+JSON.stringify(dataObject)+"&dataType="+dataType;
            objectToSessionObject(dataToUpdate);            //Updates the php Session object
            apiChangeData(apiType,"Delete",null, function (status) {
                printStatus(status,dataType);
            });
            // window.location.reload();
        }
    }
    p.onclick = function(e)
    {
        updateTextArea(e,id.split(":")[0], data);
    };
}
/**
 * Clears the textArea depending on settingType.
 * @param settingType
 */
function cleanTextArea(settingType)
{
    document.getElementById("addBtn").style.visibility = "hidden";
    document.getElementById("updateBtn").style.visibility = "hidden";
    if(settingType == "SQL")
    {
        $("#dbLocationTxt").empty();
        $("#queryTxt").empty();
    }
    else
    {
        $("#fileLocationTxt").empty();
        $("#regexpTxt").empty();
        $("#replaceWithTxt").empty();
    }
    $("#errorField").empty();
}

/*Data changing functions*/
function updateSetting()
{
    var applicationId = document.getElementsByClassName("selectedApp")[0].id.split("app")[1];
    console.log(applicationId);
    var setting = document.getElementsByClassName("selectedSetting")[0].id;
    var settingId = setting.split(":")[1];
    console.log("SettingId: " + settingId);
    var settingType = setting.split(":")[0];

    if(settingType == "SQL")
    {
        if(dataType == "Application")
            updateSqlSetting(dataObject[settingType+"_settings"], applicationId,settingId);
        else
            updateSqlSetting(dataObject["applications"][applicationId][settingType+"_settings"], applicationId,settingId);
    }
    else
    {
        if(dataType == "Application")
            updateXmlSetting(dataObject[settingType+"_settings"], applicationId,settingId);
        else
            updateXmlSetting(dataObject["applications"][applicationId][settingType+"_settings"], applicationId,settingId);
    }
}

/**
 * Updates sql setting and updates the php session object with the new data.
 * @param sqlSettings
 * @param applicationId
 * @param settingId
 */
function updateSqlSetting(sqlSettings, applicationId, settingId)
{
    var dbLocation = $("#dbLocationTxt").val();
    var query = $("#queryTxt").val();
    /*Updates the php session */
    sqlSettings[settingId]["dblocation"] = dbLocation;
    sqlSettings[settingId]["query"] = query;
    var dataToSend = "dataObject="+JSON.stringify(dataObject)+"&dataType="+dataType;
    objectToSessionObject(dataToSend);
    /*Updates the value in the database */
    var newSqlSetting = {};
    newSqlSetting["dblocation"] = dbLocation;
    newSqlSetting["query"] = query;
    apiChangeData("sqlsetting/"+sqlSettings[settingId]["id"],"PUT",JSON.stringify(newSqlSetting),function (status) {
        printStatus(status, "SQL");
    });
}
/**
 * Updates xml setting and updates the php session object with the new data.
 * @param xmlSettings
 * @param applicationId
 * @param settingId
 */
function updateXmlSetting(xmlSettings,applicationId, settingId)
{
    var fileLocation = $("#fileLocationTxt").val();
    var regexp = $("#regexpTxt").val();
    var replaceWith = $("#replaceWithTxt").val();
    /*Updates the php session */
    console.log(dataObject);
    console.log(xmlSettings);
    console.log( xmlSettings[settingId]);
    console.log(settingId);
    xmlSettings[settingId]["fileLocation"] = fileLocation;
    xmlSettings[settingId]["regexp"] = regexp;
    xmlSettings[settingId]["replaceWith"] = replaceWith;
    var dataToSend = "dataObject="+JSON.stringify(dataObject)+"&dataType="+dataType;
    objectToSessionObject(dataToSend);
    /*Updates the value in the database */
    var newXmlSetting = {};
    newXmlSetting["fileLocation"] = fileLocation;
    newXmlSetting["regexp"] = regexp;
    newXmlSetting["replaceWith"] = replaceWith;
    apiChangeData("xmlsetting/"+xmlSettings[settingId]["id"], "PUT",JSON.stringify(newXmlSetting),function (status) {
        printStatus(status, "XML");
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
 * Prints status of apiCalls in way that is suited for the page.
 * @param status
 */
function printStatus(status, dataType)
{
    switch(status)
    {
        case 200:
            document.getElementById("errorField").innerText = dataType + " updated";
            break;
        default:
            document.getElementById("errorField").value = status;
            break;
    }
}

function redirectToAddPage(settingType)
{
    var applicationId = document.getElementsByClassName("selectedApp")[0].id.split("app")[1];
    var url = "Add_Page.php?pageName=Add_Existing";
    if(dataType != "Application")
        var dataToSend = "dataObject="+JSON.stringify(dataObject)+"&dataType="+dataType + "&dataTypeToAdd="+settingType + "&applicationId="+applicationId;
    else
        var dataToSend = "dataObject="+JSON.stringify(dataObject)+"&dataType="+dataType + "&dataTypeToAdd="+settingType;
    console.log(dataToSend);
    objectToSessionObject(dataToSend);
    window.location.href = url;
}