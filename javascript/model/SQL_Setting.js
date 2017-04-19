/**
 * SQL_Setting stores the SQL setting for an application.
 */

function SQL_Setting(dbLocation, dbQueries)
{
    this.dbLocation = dbLocation;
    this.dbQueries = dbQueries;
}

/**
 * @returns String
 */
function getdbQueries()
{
    return this.dbQueries;
}

/**
 * @returns String
 */
function getDbLocation()
{
    return this.dbLocation;
}