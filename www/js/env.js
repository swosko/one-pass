// -------------
// Environment specific configuration
// ----------------------------------------------------
var __env = {}; // used in NG app

(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.apiUrl = 'http://onepassdataapi.azurewebsites.net/api/';
    //window.__env.apiUrl = 'http://localhost:59996/api/';

    // DEBUG flag
    window.__env.enableDebug = true;
}(this));