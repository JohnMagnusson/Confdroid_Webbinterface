/**
 * Class used to display information about a specific variable.
 */
$(document).ready(function () {
    getDataFromAPI("Variable/"+urlData, null, function(data){printVariableInfo(data)});
});

/**
 * Prints all the information about the variable
 * @param user
 */
function printVariableInfo(variable)
{
    getUsers(variable["userValues"]);
    /*Display all vital information about the user in the infoDiv */
    $("#objectType").html("Variable");
    $("#name").html('<b>Name:</b> ' +  $($.parseHTML(variable["name"])).text());
    $("#nrOfUsers").html('<b>Nr Users:</b> ' + variable["userValues"].length);
    $("#id").html('<b>Id:</b> ' + variable["id"]);
    document.getElementById('settingBtnInfo').onclick = function(){openSettingPage(variable, "Variable", null, 'Setting_Page_Info.php?hiddenMenu=true');};
    document.getElementById('deleteBtnInfo').onclick = function(e){deleteElement(e, variable["name"], variable["id"]);};
    for (var i = 0; i < document.getElementsByClassName("addIcon").length; i++) {

        document.getElementsByClassName("addIcon")[i].onclick = function (e) {
            openSettingPage(variable, "Variable", e.target.parentNode.parentNode.firstChild.nextSibling.getAttribute("templateType"), "Add_Page.php?pageName=Add_Existing&onlyAddNewPage=false");
        }
    }
}

function getUsers(userValues)
{
    var length = 0;
    for(key in userValues)
        length++;

    var userArr = new Array();
    var i = 0;
    for(key in userValues)
    {
        getDataFromAPI("User/"+key,null, function (data, searchType) {
            userArr[i++] = data;
            if(userArr.length == length)
            {
                var url = "User_Result.php?activeType=User&data=";
                createsContainerContent("userDiv", userArr, url);
            }
        });
    }
}