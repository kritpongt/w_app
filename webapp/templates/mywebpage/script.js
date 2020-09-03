var ns = false;
if (navigator.appName == "Netscape") {
    ns = true;
}
var errorNum = $E;
var mp_idx = "$M";
var ps_path = "$a";
var ft_path = "$b";
var free_time_login = 0;  /* 0:use default free time page, 1:use customized ftee time page.*/
var free_time_page = "$Z/free_time.html?mp_idx=" + mp_idx;
var terms_of_service = 0; /* If you want to enable Terms of Service, please set the value as 1 */
var terms_of_service_path = "$Z/terms_of_service.html";

function checkKey(evt) {
    if (ns) {
        if (evt.which == 13) /* Enter */
            document.login.submit();
    } else {
        if (evt.keyCode == 13) /* Enter */
            document.login.submit();
    }
}
function initTask() {
    document.getElementById("uamask").style.display = (mp_idx == "preview") ? "block" : "none";
    document.login.action = '/weblogin.cgi';
    document.error.action = '/webauth_error.cgi';
    document.error.error_num.value = errorNum;
    document.getElementById("mp_idx").value = mp_idx;
    document.getElementById("error_mp_idx").value = mp_idx;
    ft_data_retention();
    paymentService();
    freeTime();
}
function chkError() {
    if (errorNum != 0) {
        document.error.submit();
    }
    document.login.username.select();
    document.login.username.focus();
}
function walledGarden() {
    /* Walled Garden List*/
    var w = $w;
    if (w != 0) {
        document.getElementById('wrapper').style.width = '600px';
        document.getElementById('form_wrappers').style.width = '600px';
        document.getElementById('loginHotels').style.width = '600px';
        document.getElementById('table_a').style.display = 'block';
        document.getElementById('table_b').style.display = 'block';
        document.getElementById('urlList').style.display = 'block';
        var list = "", temp;
        for (i = 0; i < w.length; i++) {
            var data = w[i];
            for (var key in data) {
                temp = "<li><a href=" + data[key] + " target=\'_blank\'>" + key + "</a></li>";
                list += temp;
            }
        }
        document.getElementById('url').innerHTML = list;
    }
}
function ft_data_retention() {
    /* Customized free_time.html URL Link */
    if (free_time_login == 1 && ft_path != "") {
        var ft_data_retention_href = "<a href='" + free_time_page + "' target=\'_self\'>Click here to get a free account.</a>";
        document.getElementById('ft_data_retention').innerHTML = ft_data_retention_href;
    }
}
function paymentService() {
    /* Payment Service URL Link */
    if (ps_path != "") {
        var payment_href = "<a href='#' target=\'_self\' onclick=\"chkTerms(1)\">Without an account? Click here to get an account by online payment.</a>";
        document.getElementById('payment').innerHTML = payment_href;
    }
}
function freeTime() {
    /* Free Time URL Link */
    if (ps_path == "" && ft_path != "" && free_time_login == 0) {
        var free_time_href = "<a href='#' target=\'_self\' onclick=\"chkTerms(0)\">Without an account? Click here to get a free account.</a>";
        document.getElementById('free').innerHTML = free_time_href;
    }
}
/* Terms of Service */
function TermsOfService() {
    if (terms_of_service == 1) {
        document.getElementById("termsdiv").style.display = "block";
        /* Terms of Service URL */
        document.getElementById("termslink").innerHTML = "<span style=\"margin-left: 10px;\">I understand and accept the</span><a href=\"" + terms_of_service_path + "\" target='_blank' style=\"padding-left:3px;\">Terms and Conditions</a>.";
    }
}
/* Terms of Service */
function chkService() {
    if (terms_of_service == 1) {
        if (document.getElementById("terms").checked) {
            document.login.submit();
        } else {
            alert("Please read and accept terms and conditions");
        }
    } else {
        document.login.submit();
    }
}
function chkTerms(f) {
    if (terms_of_service == 1) {
        if (!document.getElementById("terms").checked) {
            alert("Please read and accept terms and conditions");
            return;
        }
    }
    if (f) {
        window.location.href = "/" + ps_path + "&free_time_login=" + free_time_login;
    } else {
        window.location.href = "/" + ft_path;
    }
}