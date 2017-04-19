/**
 * This class stores data of an app.
 * Settings, if it should be force installed, data directory, apk name and apk url.
 */

function Application(sql_setting, xml_setting, force_install, dataDir, apkName, apkUrl)
{
    this.sql_setting = sql_setting;
    this.xml_setting = xml_setting;
    this.force_install = force_install;
    this.dataDir = dataDir;
    this.apkName = apkName;
    this.apkUrl = apkUrl;
}

/**
 * @return SQL_Setting
 */
 function getSql_setting() {
    return sql_setting;
}
/**
 * @return XML_Setting
 */
function getXml_setting() {
    return xml_setting;
}
/**
 * @return boolean
 */
function isForce_install() {
    return force_install;
}
/**
 * @return String
 */
function getDataDir() {
    return dataDir;
}
/**
 * @return String
 */
function getApkName() {
    return apkName;
}
/**
 * @return String
 */
function getApkUrl() {
    return apkUrl;
}