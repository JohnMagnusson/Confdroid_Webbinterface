/**
 * Class used to display information about a specific user.
 */
$(document).ready(function () {
    getDataFromAPI("User/"+urlData, null, function(data){printUserInfo(data)});
});

/**
 * Prints all the information about the user
 * @param user
 */
function printUserInfo(user)
{
    var url = "Group_Result.php?activeType=Group&data=";
    createsContainerContent("groupDiv", user["groups"], url);
    url = "Device_Result.php?activeType=Device&data=";
    createsContainerContent("deviceDiv", user["devices"], url);
    url = "Application_Result.php?activeType=Application&data=";
    createsContainerContent("applicationDiv", user["applications"], url);
    url = "Variable_Result.php?activeType=Variable&data=";
    createsContainerContent("variableDiv", user["variables"], url);
    /*Display all vital information about the user in the infoDiv */
    $("#objectType").html("User");
    $("#name").html('<b>Name:</b> ' +  $($.parseHTML(user["name"])).text());
    $("#email").html('<b>Email:</b> ' +  $($.parseHTML(user["email"])).text());
    $("#nrOfDevces").html('<b>Nr devices:</b> ' + user["devices"].length);
    $("#nrOfGroups").html('<b>Nr groups in:</b> ' + user["groups"].length);
    $("#createdDate").html('<b>Date created:</b> ' + user["dateCreated"]);
    $("#id").html('<b>Id:</b> ' + user["id"]);
    $("#authToken").html('<b>Authtoken:</b> ' + user["authToken"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(user, "User", null, 'Setting_Page_Info.php');};
    document.getElementById('deleteBtnInfo').onclick = function(e){deleteElement(e, user["name"], user["id"]);};
    for (var i = 0; i < document.getElementsByClassName("addIcon").length; i++) {

        document.getElementsByClassName("addIcon")[i].onclick = function (e) {
            openSettingPage(user, "User", e.target.parentNode.parentNode.firstChild.nextSibling.getAttribute("templateType"), "Add_Page.php?pageName=Add_Existing&onlyAddNewPage=false");
        }
    }
}

/**
 * Creates a container for the data and puts in the parentIdContainer.
 * Makes the object clickable and adds setting, delete pictures.
 * @param parentId
 * @param data
 * @param url
 */
function createsContentForVariableContainer(parentId, data)
{
    $("#"+parentId).empty();
    if(data.length === 0)
    {
        var p = document.createElement("p");
        p.id = 0;
        p.style = "font-size:120%;margin-top:3%;margin-left:5%;";
        p.innerHTML = "Nothing Found";
        document.getElementById(parentId).appendChild(p);
    }
    else
    {
        for(var i = 0; i < data.length; i++)
        {
            var div = document.createElement("div");
            div.id = "dataDiv"+i;
            var p2 = document.createElement("p");
            p2.id = i;
            p2.innerHTML = $($.parseHTML(data[i]["name"])).text()+":"+$($.parseHTML(data[i]["value"])).text();
            var trashCan = document.createElement("img");
            trashCan.id = i;
            trashCan.src = "../images/trash-can-icon.png";
            trashCan.classList.add("img");
            var settings = document.createElement("img");
            settings.id = i;
            settings.src = "../images/settings-icon.png";
            settings.classList.add("img");
            div.appendChild(trashCan);
            div.appendChild(settings);
            div.appendChild(p2);
            div.classList.add("temporary");
            document.getElementById(parentId).appendChild(div);
            trashCan.onclick = function (e)
            {
                deleteElement(e, data[e.target.id]["name"], data[e.target.id]["id"]);
            };
            settings.onclick = function (e) {
                getDataFromAPI(url.split("_")[0]+"/"+data[e.target.id]["id"],null,function (data, searchType) {     /*Gets data from the clicked element, then searches on the clicked element and uses a callback function to call on openSettingPage*/
                    openSettingPage(data,searchType.split("/")[0], null,"Setting_Page_Info.php?settingType=SQL");
                });
            };
        }
    }
}