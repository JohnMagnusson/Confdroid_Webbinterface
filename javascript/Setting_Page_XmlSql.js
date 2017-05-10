/*Javascript file for the php page Setting_Page_XML-SQL.php */
/*Updates the textArea with the clicked elements SQL or xml setting depending on the settingType*/

function updateSqlXmlMenu(settingType, application)
{
    console.log(application);
    if(settingType == "SQL")                //SQL Setting case
    {
        // console.log(application);
        // createPTagsForData("settingContainer",)
    }
    else                                    //XML Setting case
    {

    }
}

// function updateTextArea(settingType, settingings)
// {
//     if(settingType == "SQL")                //SQL Setting case
//     {
//         document.getElementById("textArea").innerText = settingings[settingType]
//     }
//     else                                    //XML Setting case
//     {
//         alert(settingType);
//     }
// }

// function createPTagsForData(parentId, data, type)
// {
//     $("#"+parentId).empty();
//     for(var i = 0; i < data.length; i++)
//     {
//         var div = document.createElement("div");
//         div.id = "dataDiv"+i;
//         var p = document.createElement("p");
//         var trashCan = document.createElement("img");
//         trashCan.id = i;
//         trashCan.src = "../images/trash-can-icon.png";
//         trashCan.classList.add("img");
//         p.id = i;
//         p.innerHTML = data[i]["name"];
//         div.appendChild(trashCan);
//         div.appendChild(p);
//         div.classList.add("templateText");
//         document.getElementById(parentId).appendChild(div);
//         trashCan.onclick = function (e)
//         {
//             // deleteElement(e, data, type);
//             alert("Clicked trashcan");
//         }
//         p.onclick = function(e)
//         {
//             alert("Clicked pTag");
//             // url+=data[e.target.id][type];
//             // changeLocation(url)
//         };
//     }
// }