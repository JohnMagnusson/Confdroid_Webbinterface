/**
 * XML_Setting stores the xml setting for an app.
 */

function XML_Setting(xmlLocation, xmlQuery)
{
    this.xmlLocation = xmlLocation;
    this.xmlQuery = xmlQuery;
}

/**
 * @returns String
 */
function getXmlLocation()
{
    return this.xmlLocation;
}

/**
 * @returns String
 */
function getXmlQuery()
{
    return this.xmlQuery;
}