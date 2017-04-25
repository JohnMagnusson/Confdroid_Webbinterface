/**
 * This class stores data of an app.
 * Settings, if it should be force installed, data directory, apk name and apk url.
 */

function Application(sqlSetting, xmlSetting, forceInstall, dataDir, apkName, apkUrl)
{
    this.sqlSetting = sqlSetting;
    this.xmlSetting = xmlSetting;
    this.forceInstall = forceInstall;
    this.dataDir = dataDir;
    this.apkName = apkName;
    this.apkUrl = apkUrl;
}

/**
 * @return SQL_Setting
 */
 function getSqlSetting() {
    return sqlSetting;
}
/**
 * @return XML_Setting
 */
function getXmlSetting() {
    return xmlSetting;
}
/**
 * @return boolean
 */
function isForceInstall() {
    return forceInstall;
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