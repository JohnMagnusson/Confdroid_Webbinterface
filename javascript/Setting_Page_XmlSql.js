/*Javascript file for the php page Setting_Page_XML-SQL.php */
/*Updates the textArea with the clicked elements SQL or xml setting depending on the settingType*/

$('document').ready(function(){
    // $("li").removeClass("#sqlAndXmlMenu .activeSqlXml");
    // $( '#li'+settingType).last().addClass( "#sqlAndXmlMenu .activeSqlXml" );
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
        // deleteElement(e, data, type);
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
}

/*Data changing functions*/

