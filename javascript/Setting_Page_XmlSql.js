/*Javascript file for the php page Setting_Page_XML-SQL.php */
/*Updates the textArea with the clicked elements SQL or xml setting depending on the settingType*/

$('document').ready(function(){
    document.getElementById("li"+settingType).classList.add("activeSqlXml");
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
    if(application[settingType+ "_settings"].length >= 1)                   //Checks if the object have settings fo the application. If not displays a message.
    {
        for(var i = 0; i < application[settingType+ "_settings"].length; i++)
        {
            createPTagsForData("settingContainer",application[settingType+ "_settings"][i], (settingType+i));
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
    if(document.getElementsByClassName("selectedSetting")[0] != null) {    /*Puts selected class on click element*/
        document.getElementsByClassName("selectedSetting")[0].classList.remove("selectedSetting");
    }
    e.target.classList.add("selectedSetting");
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
function createPTagsForData(parentId, data, name)
{
    var div = document.createElement("div");
    div.id = "dataDiv"+name;
    var p = document.createElement("p");
    var trashCan = document.createElement("img");
    trashCan.id = name;
    trashCan.src = "../images/trash-can-icon.png";
    trashCan.classList.add("trashCanImg");
    p.id = name;
    p.innerHTML = name;
    div.appendChild(trashCan);
    div.appendChild(p);
    div.classList.add("textSettingMenu");
    document.getElementById(parentId).appendChild(div);
    trashCan.onclick = function (e)
    {
        alert("Clicked trashcan");
    }
    p.onclick = function(e)
    {
        updateTextArea(e,name.substr(0,3), data);         //Substrings from position 1 -> 3;
    };
}
/**
 * Clears the textArea depending on settingType.
 * @param settingType
 */
function cleanTextArea(settingType)
{
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
    var applicationId = document.getElementsByClassName("selectedApp")[0].id.substr(3);
    console.log(applicationId);
    var setting = document.getElementsByClassName("selectedSetting")[0].id;
    var settingId = setting.substr(3);
    var settingType = setting.substr(0,3);
    if(settingType == "SQL")
    {
        updateSqlSetting(dataObject["applications"][applicationId][settingType+"_settings"], applicationId,settingId);
    }
    else
    {
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
    var newSqlSetting = {};
    newSqlSetting["dbLocation"] = dbLocation;
    newSqlSetting["query"] = query;

    /*Updates the php session */
    dataObject["applications"][applicationId][settingType+"_settings"][settingId]["dbLocation"] = dbLocation;
    dataObject["applications"][applicationId][settingType+"_settings"][settingId]["query"] = query;
    var dataToSend = "dataObject="+JSON.stringify(dataObject)+"&dataType="+dataType;
    $.ajax({
        type: "POST",
        url: "Setting_Pages/Session_Page.php",
        data: dataToSend,
        success: function(response){
            console.log(response);
        }
    });
    console.log(JSON.stringify(newSqlSetting));
    $.ajax({
        type: "PUT",
        url: "https://confdroid.brainstorm-labs.net/api/sqlsetting/"+sqlSettings[settingId]["id"]+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie"),
        data: JSON.stringify(newSqlSetting),
        success: function(result){
            console.log(result);
            document.getElementById("errorField").innerText = "SQL setting updated";
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

function updateXmlSetting(xmlSettings,applicationId, settingId)
{
    var fileLocation = $("#fileLocationTxt").val();
    var regexp = $("#regexpTxt").val();
    var replaceWith = $("#replaceWithTxt").val();

    var newXmlSetting = {};
    newXmlSetting["fileLocation"] = fileLocation;
    newXmlSetting["regexp"] = regexp;
    newXmlSetting["replaceWith"] = replaceWith;

    /*Updates the php session */
    dataObject["applications"][applicationId][settingType+"_settings"][settingId]["fileLocation"] = fileLocation;
    dataObject["applications"][applicationId][settingType+"_settings"][settingId]["regexp"] = regexp;
    dataObject["applications"][applicationId][settingType+"_settings"][settingId]["replaceWith"] = replaceWith;
    var dataToSend = "dataObject="+JSON.stringify(dataObject)+"&dataType="+dataType;
    $.ajax({
        type: "POST",
        url: "Setting_Pages/Session_Page.php",
        data: dataToSend,
        success: function(response){
            console.log(response);
        }
    });

    $.ajax({
        type: "PUT",
        url: "https://confdroid.brainstorm-labs.net/api/xmlsetting/"+xmlSettings[settingId]["id"]+".json?authToken="+$.cookie("authCookie")+"&id="+$.cookie("adminIdCookie"),
        data: JSON.stringify(newXmlSetting),
        success: function(result){
            console.log(result);
            document.getElementById("errorField").innerText = "XML updated";
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
