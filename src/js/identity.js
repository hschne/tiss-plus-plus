/**
 * Created by hans on 19.09.15.
 */
var identity = (function () {
    function xhrWithAuth(method, url, interactive, callback) {
        var access_token;

        var retry = true;

        getToken();

        function getToken() {
            chrome.identity.getAuthToken({interactive: interactive}, function (token) {
                if (chrome.runtime.lastError) {
                    callback(chrome.runtime.lastError);
                    return;
                }

                access_token = token;
                requestStart();
            });
        }

        function requestStart() {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
            xhr.onload = requestComplete;
            xhr.send();
        }

        function requestComplete() {
            if (this.status == 401 && retry) {
                retry = false;
                chrome.identity.removeCachedAuthToken({token: access_token},
                    getToken);
            } else {
                callback(null, this.status, this.response);
            }
        }
    }


    var authenticate = function interactiveSignIn() {
        chrome.identity.getAuthToken({'interactive': true}, function () {
            if (chrome.runtime.lastError) {
                //An error happened
            } else {
                //Token retrieved
            }
        });
    };

    var revokeToken = function () {
        chrome.identity.getAuthToken({'interactive': false},
            function (current_token) {
                if (!chrome.runtime.lastError) {

                    chrome.identity.removeCachedAuthToken({token: current_token},
                        function () {
                        });

                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
                    current_token);
                    xhr.send();

                }
            });
    };

    return {
        authenticate: authenticate,
        revokeToken: revokeToken,
        authenticatedRequest: xhrWithAuth
    }
}());
