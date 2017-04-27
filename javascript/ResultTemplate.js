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
    this.div.id = "Template";
    this.div.innerHTML = this.title;
    var dataDiv = document.createElement('div');
    dataDiv.id = "dataDiv";
    // $('#'+dataDiv.id).addClass("outer");
    this.div.appendChild(dataDiv);
    console.log("h");
    // console.log(this.data);
    for(var i = 0; i < this.data.length; i++)
    {
        dataDiv.innerHTML += this.data[i]["name"];
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