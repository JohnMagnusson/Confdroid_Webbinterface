/**
 * XML_Setting stores the xml setting for an app.
 */

function XML_Setting(fileLocation, ragexp, replaceWith)
{
    this.fileLocation = fileLocation;
    this.ragexp = ragexp;
    this.replaceWith = replaceWith;
}

/**
 * @returns String
 */
function getFileLocation()
{
    return this.fileLocation;
}

/**
 * @returns String
 */
function getRagexp()
{
    return this.ragexp;
}
function getReplaceWith()
{
    return this.replaceWith;
}