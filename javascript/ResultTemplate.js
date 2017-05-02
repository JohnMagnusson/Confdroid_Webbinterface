/**
 * Created by Elias on 2017-04-27.
 */

function ResultTemplate(title, data)
{
    this.title = title;
    this.data = data;
}

ResultTemplate.prototype.setTemplate = function (title, data) {
    this.title = title;
    this.data = data;
}

ResultTemplate.prototype.createDiv = function()
{
    this.div = document.createElement('div');
    this.div.id = "template";
    this.div.innerHTML = "<h2 class='optionTitle'>"+this.title+"</h2>";
    this.div.classList.add("template");
    var dataDiv = document.createElement('div');
    dataDiv.id = "dataDiv";
    dataDiv.classList.add("dataDiv");
    this.div.appendChild(dataDiv);
    for(var i = 0; i < this.data.length; i++)
    {
        dataDiv.innerHTML += "<p class='templateText'>"+this.data[i]["name"] + "<img src='images/trash-can-icon.png' class='img'><img src='images/settings-icon.png' class='img'></p>";
        dataDiv.addEventListener('click', function(e){
            window.location.replace("result_pages/Group_Result.php");
        });
    }
    dataDiv.innerHTML += "<img src='images/Add-icon.png' class='addIcon'>";
}

function removeDiv() {
    this.div.parentNode.removeChild(this.div);
}

function resetDiv()
{
    this.div.innerHTML = "";
}