var currentStrack = true;
if((window.screen.availWidth <= 768 && window.innerHeight > window.innerWidth) || '' == 'horizontal') {
    restack(true);
}
function restack(horizontal) {
    var tc, ic, t, i, c, f, sv, sh, d, height, flt, width;
    tc = document.getElementById('textareacontainer');
    ic = document.getElementById('iframecontainer');
    c = document.getElementById('container');
    tc.className = tc.className.replace('horizonral', '');
    ic.className = ic.className.replace('horizonral', '');
    c.className = c.className.replace('horizontal', '');
    stack = '';
    if (horizontal) {
        tc.className = tc.className + ' horizontal';
        ic.className = ic.className + ' horizontal';
        c.className = c.className + ' horizontal';
        stack = ' horizontal';
        document.getElementById('textareacontainer').style.height = '50%';
        document.getElementById('iframecontainer').style.height = '50%';
        document.getElementById('textareacontainer').style.width = '100%';
        document.getElementById('iframcontainer').style.width = '100%';
        currentStrack = false;
    } else {
        document.getElementById('textareacontainer').style.height = '100%';
        document.getElementById('iframecontainer').style.height = '100%';
        document.getElementById('textareacontainer').style.width = '50%';
        document.getElementById('iframcontainer').style.width = '50%';
        // currentStrack = true;
    }
    fixDragBtn();
    showFrameSize();
}
function showFrameSize() {
    var t;
    var width, height;
    width = Number(w3_getStyleValue(document.getElementById('iframeResult'), 'width').replace('px', '')).toFixed();
    height = Number(w3_getStyleValue(document.getElementById('iframeResult'), 'height').replace('px', '')).toFixed();
    document.getElementById('framesize').innerHTML = 'Preview Size: <span>' + width + ' x ' + height + '</span>';
}
var dragging = false;
var stack;
function fixDragBtn() {
    var textareawidth, leftpadding, dragleft, containertop, buttonwidth
    var containertop = Number(w3_getStyleValue(document.getElementById('container'), 'top').replace('px', ''));
    if (stack != ' horizontal') {
        document.getElementById('dragbar').style.width = '5px';
        textareasize = Number(w3_getStyleValue(document.getElementById('textareawrapper'), 'width').replace('px', ''));
        leftpadding = Number(w3_getStyleValue(document.getElementById('textarea'), 'padding-left').replace('px', ''));
        buttonwidth = Number(w3_getStyleValue(document.getElementById('dragbar'), 'width').replace('px', ''));
        textareaheight = w3_getStyleValue(document.getElementById('textareawrapper'), 'height');
        dragleft = textareasize + leftpadding + (leftpadding / 2) - (buttonwidth / 2);
        document.getElementById('dragbar').style.top = containertop + 'px';
        document.getElementById('dragbar').style.left = dragleft + 'px';
        document.getElementById('dragbar').style.height = textareaheight;
        document.getElementById('dragbar').style.cursor = 'col-resize';
    } else {
        document.getElementById('dragbar').style.height = '5px';
        if (window.getComputedStyle) {
            textareawidth = window.getComputedStyle(document.getElementById('textareawrapper'), null).getPropertyValue('height');
            textareaheight = window.getComputedStyle(document.getElementById('textareawrapper'), null).getPropertyValue('width');
            leftpadding = window.getComputedStyle(document.getElementById('textarea'), null).getPropertyValue('padding-top');
            buttonwidth = window.getComputedStyle(document.getElementById('dragbar'), null).getPropertyValue('height');
        } else {
            dragleft = document.getElementById('textareawrapper').currentStyle['width'];
        }
        textareawidth = Number(textareawidth.replace('px', ''));
        leftpadding = Number(leftpadding.replace('px', ''));
        buttonwidth = Number(buttonwidth.replace('px', ''));
        dragleft = containertop + textareawidth + leftpadding + (leftpadding / 2);
        document.getElementById('dragbar').style.top = dragleft + 'px';
        document.getElementById('dragbar').style.left = '5px';
        document.getElementById('dragbar').style.width = textareaheight;
        document.getElementById('dragbar').style.cursor = 'row-resize';
    }
}
function dragstart(e){
    e.preventDefault();
    dragging = true;
    var main = document.getElementById('iframecontainer');
}
function dragmove(e){
    if(dragging){
        document.getElementById('shield').style.display = 'block';
        if(stack != ' horizontal'){
            var percentage = (e.pageX / window.innerWidth) * 100;
            if(percentage > 5 && percentage < 98){
                var mainPercentage = 100 - percentage;
                document.getElementById('textareacontainer').style.width = percentage + '%';
                document.getElementById('iframecontainer').style.width = mainPercentage + '%';
                fixDragBtn();
            }
        }else{
            var containertop = Number(w3_getStyleValue(document.getElementById('container'), 'top').replace('px', ''));
            var percentage =((e.pageY - containertop + 20) / (window.innerHeight - containertop + 20)) * 100;
            if(percentage > 5 && percentage < 98){
                var mainPercentage = 100 - percentage;
                document.getElementById('textareacontainer').style.height = percentage + '%';
                document.getElementById('iframecontainer').style.height = mainPercentage + '%';
                fixDragBtn();
            }
        }
        showFrameSize();
    }
}
function dragend(){
    document.getElementById('shield').style.display = 'none';
    dragging = false;
    var vend = navigator.vendor;
    if(window.editor && vend.indexOf('Apple') == -1){
        window.editor.refresh();
    }
}
if(window.addEventListener){
    document.getElementById('dragbar').addEventListener('mousedown', function(e){
        dragstart(e);
    });
    document.getElementById('dragbar').addEventListener('touchstart', function(e){
        dragstart(e);
    });
    window.addEventListener('mousemove', function(e){
        dragmove(e);
    });
    window.addEventListener('touchmove', function(e){
        dragmove(e);
    });
    window.addEventListener('mouseup', dragend);
    window.addEventListener('touchend', dragend);
    window.addEventListener('load', fixDragBtn);
    window.addEventListener('mouseup', showFrameSize);
}
function w3_getStyleValue(e, style){
    if(window.getComputedStyle){
        return window.getComputedStyle(e, null).getPropertyValue(style);
    }else{
        return e.currentStyle[style];
    }
}
// filter
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("item");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}
var btnContainer = document.getElementById("btnCategory");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
// end filter
// editor
let textHtml, textCss, isPageHtml, isPageCss;
function setEditor() {
    window.html = ace.edit("htmlEditor");
    html.setTheme("ace/theme/github");
    html.session.setMode("ace/mode/html");
    if (textHtml != undefined) {
        html.setValue(textHtml);
        textHtml = undefined;
    }
    html.getSession().on("change", function () {
        update();
        localStorage.setItem(isPageHtml, html.getValue());
    });
    window.css = ace.edit("cssEditor");
    css.setTheme("ace/theme/github");
    css.session.setMode("ace/mode/css");
    if (textCss != undefined) {
        css.setValue(textCss);
        textCss = undefined;
    }
    css.getSession().on("change", function () {
        update();
        localStorage.setItem(isPageCss, css.getValue());
    });
}
function update() {
    var res = document.getElementById("iframeResult").contentWindow.document;
    res.open();
    res.write(html.getValue() + "<style>" + css.getValue() + "</style>");
    res.close();
}
setEditor();
update();
function readTextFile(file, name) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var text = rawFile.responseText;
                // page1 = text;
                localStorage.setItem(name, text)
            }
        }
    }
    rawFile.send();
}
readTextFile('/webapp/templates/zyxel/default_wp/login.html', 'page1')
readTextFile('/webapp/templates/zyxel/default_wp/session.html', 'page2')
readTextFile('/webapp/templates/zyxel/default_wp/logout.html', 'page3')
readTextFile('/webapp/templates/zyxel/default_wp/css/portal.css', 'page4')
readTextFile('/webapp/templates/mywebpage/login.html', 'page5')
readTextFile('/webapp/templates/mywebpage/welcome.html', 'page6')
readTextFile('/webapp/templates/mywebpage/style.css', 'page7')
var buttonlogin = document.getElementById('z_loginPage');
buttonlogin.onclick = function () {
    isPageHtml = undefined;
    isPageCss = undefined;
    textHtml = localStorage.getItem('page1');
    textCss = localStorage.getItem('page4');
    isPageHtml = 'page1';
    isPageCss = 'page4';
    setEditor();
    chkCustomize()
}
var buttonsession = document.getElementById('z_sessionPage');
buttonsession.onclick = function () {
    isPageHtml = undefined;
    isPageCss = undefined;
    textHtml = localStorage.getItem('page2');
    textCss = localStorage.getItem('page4');
    isPageHtml = 'page2';
    isPageCss = 'page4';
    setEditor();
    chkCustomize()
}
var buttonlogout = document.getElementById('z_logoutPage');
buttonlogout.onclick = function () {
    isPageHtml = undefined;
    isPageCss = undefined;
    textHtml = localStorage.getItem('page3');
    textCss = localStorage.getItem('page4');
    isPageHtml = 'page3';
    isPageCss = 'page4';
    setEditor();
    chkCustomize()
}
var buttonlogout = document.getElementById('my_loginPage');
buttonlogout.onclick = function () {
    isPageHtml = undefined;
    isPageCss = undefined;
    textHtml = localStorage.getItem('page5');
    textCss = localStorage.getItem('page7');
    isPageHtml = 'page5';
    isPageCss = 'page7';
    setEditor();
    chkCustomize()
}
var buttonlogout = document.getElementById('my_welcomePage');
buttonlogout.onclick = function () {
    isPageHtml = undefined;
    isPageCss = undefined;
    textHtml = localStorage.getItem('page6');
    textCss = localStorage.getItem('page7');
    isPageHtml = 'page6';
    isPageCss = 'page7';
    setEditor();
    chkCustomize()
}
// end editor
// start customize
var acc1 = document.getElementById('acc1')
var acc2 = document.getElementById('acc2')
function chkCustomize(){
    if(isPageCss == 'page4'){
        acc1.style.display = 'block';
        acc2.style.display = 'none';
    }else if(isPageCss == 'page7'){
        acc2.style.display = 'block';
        acc1.style.display = 'none';
    }
}
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic',
    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            hsva: true,
            cmyk: true,
            input: true,
            clear: true,
            save: true
        }
    }
});
pickr.on('change', (color, instance) => {
    const rgbaColor = color.toRGBA().toString();
    window.css = ace.edit("cssEditor");
    css.session.replace(new ace.Range(65, 0, 65, Number.MAX_VALUE), '    border-color: ' + rgbaColor +';');
    css.session.replace(new ace.Range(88, 0, 88, Number.MAX_VALUE), '    background-color: ' + rgbaColor +';');
    css.session.replace(new ace.Range(95, 0, 95, Number.MAX_VALUE), '    color: ' + rgbaColor +';');
    css.session.replace(new ace.Range(96, 0, 96, Number.MAX_VALUE), '    border-color: ' + rgbaColor +';');
});
function uploadFile01(){
    var fileInput = document.getElementById('fileInput01');
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function () {
        // console.log(reader.result);
        window.css = ace.edit("cssEditor");
        css.session.replace(new ace.Range(24, 0, 24, Number.MAX_VALUE), '   .hloginTop .hlogo{ position:absolute; display:block; background:url('+reader.result+'); width:100%; height:100%; left:10px; margin: 5px; background-repeat: no-repeat; }');
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
function uploadFile02(){
    var fileInput = document.getElementById('fileInput02');
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function () {
        // console.log(reader.result);
        window.css = ace.edit("cssEditor");
        css.session.replace(new ace.Range(1, 0, 1, Number.MAX_VALUE), '   body{ font-family:Century Gothic, Arial, Helvetica, sans-serif; background:url('+reader.result+'); background-repeat: no-repeat; background-size: cover; height: 100vh; }');
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
function uploadFile03(){
    var fileInput = document.getElementById('fileInput03');
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function () {
        // console.log(reader.result);
        window.html = ace.edit("htmlEditor");
        html.session.replace(new ace.Range(14, 0, 14, Number.MAX_VALUE), '<img src="'+reader.result+'">');
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
function uploadFile04(){
    var fileInput = document.getElementById('fileInput04');
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function () {
        // console.log(reader.result);
        window.css = ace.edit("cssEditor");
        css.session.replace(new ace.Range(12, 0, 12, Number.MAX_VALUE), 'background-image: url('+reader.result+');');
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
// end customize
// start download
function downloadZip() {
    var checked = document.getElementById('selected')
    if(checked.options[checked.selectedIndex].text=='Zyxel'){
        var zip = new JSZip();
        zip.file("login.html", localStorage.getItem('page1'));
        zip.file("session.html", localStorage.getItem('page2'));
        zip.file("logout.html", localStorage.getItem('page3'));
        var css = zip.folder("css");
        css.file("portal.css", localStorage.getItem('page4'));
        zip.generateAsync({type: "blob"})
        .then(function (content) {
            saveAs(content, "zyxel.zip");
        });
    }else if(checked.options[checked.selectedIndex].text=='My Web Page'){
        var zip = new JSZip();
        zip.file("login.html", localStorage.getItem('page5'));
        zip.file("welcome.html", localStorage.getItem('page6'));
        var css = zip.folder("css");
        css.file("style.css", localStorage.getItem('page7'));
        zip.generateAsync({type: "blob"})
        .then(function (content) {
            saveAs(content, "mywebpage.zip");
        });
    }
}
// end download