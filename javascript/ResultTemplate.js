/**
 * Created by Elias on 2017-04-27.
 */

function ResultTemplate(title, data)
{
    this.title = title;
    this.data = data;
    this.createDiv();
}

ResultTemplate.prototype.getTitle = function()
{
    return this.title;
}

function getData()
{
    return this.data;
}

function setData(data)
{
    this.data = data;
}

function setTitle(title)
{
    this.title = title;
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
        dataDiv.innerHTML += "<p class='templateText'>"+this.data[i]["name"] + "<img src='images/trash-can-icon.png' class='img'></p>";
        // console.log("o");
        // console.log(this.data[0]["groups"]);
        // dataDiv.onclick = function(e){printData(this.data[0]["groups"], "groups")};
    }
}

ResultTemplate.prototype.getDiv = function()
{
    return this.div;
}

function removeDiv() {
    this.div.parentNode.removeChild(this.div);
}

function resetDiv()
{
    this.div.innerHTML = "";
}