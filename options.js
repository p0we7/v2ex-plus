function saveChoice(e){
    setCookie(e.target.name, e.target.value);
}

//window.onload = function(){

    //消息提醒 默认开启
    var _newMsg = document.newMsgSelect.newMsg;
    !getCookie('newMsg') && (_newMsg[0].checked = true) || (_newMsg[1].checked = true);
    _newMsg[0].disabled = false;
    _newMsg[1].disabled = false;
    _newMsg[0].onclick = saveChoice;
    _newMsg[1].onclick = saveChoice;

    //图床设置 默认微博
    var _imageHosting = document.imageHostingSelect.imageHosting;
    getCookie('imageHosting') != 'imgur' && (_imageHosting[0].checked = true) || (_imageHosting[1].checked = true);
    _imageHosting[0].disabled = false;
    _imageHosting[1].disabled = false;
    _imageHosting[0].onclick = saveChoice;
    _imageHosting[1].onclick = saveChoice;

    //自动签到 默认关闭
    var _autoMission = document.autoMissionSelect.autoMission;
    getCookie('autoMission') && (_autoMission[0].checked = true) || (_autoMission[1].checked = true);
    _autoMission[0].disabled = false;
    _autoMission[1].disabled = false;
    _autoMission[0].onclick = saveChoice;
    _autoMission[1].onclick = saveChoice;

    //主题预览 默认开启
    var _preview = document.previewSelect.preview;
    !getCookie('preview') && (_preview[0].checked = true) || (_preview[1].checked = true);
    _preview[0].disabled = false;
    _preview[1].disabled = false;
    _preview[0].onclick = saveChoice;
    _preview[1].onclick = saveChoice;

    //自动折叠 默认开启
    var _fold = document.foldSelect.fold;
    !getCookie('fold') && (_fold[0].checked = true) || (_fold[1].checked = true);
    _fold[0].disabled = false;
    _fold[1].disabled = false;
    _fold[0].onclick = saveChoice;
    _fold[1].onclick = saveChoice;

    //绝对时间 默认关闭
    var _realDate = document.realDateSelect.realDate;
    getCookie('realDate') && (_realDate[0].checked = true) || (_realDate[1].checked = true);
    _realDate[0].disabled = false;
    _realDate[1].disabled = false;
    _realDate[0].onclick = saveChoice;
    _realDate[1].onclick = saveChoice;

    //定时激活微博 默认关闭
    var _autoLoginWeibo = document.autoLoginWeiboSelect.autoLoginWeibo;
    getCookie('autoLoginWeibo') && (_autoLoginWeibo[0].checked = true) || (_autoLoginWeibo[1].checked = true);
    _autoLoginWeibo[0].disabled = false;
    _autoLoginWeibo[1].disabled = false;
    _autoLoginWeibo[0].onclick = saveChoice;
    _autoLoginWeibo[1].onclick = saveChoice;

    //新标签页浏览主题 默认关闭
    var _newWindow = document.newWindowSelect.newWindow;
    getCookie('newWindow') && (_newWindow[0].checked = true) || (_newWindow[1].checked = true);
    _newWindow[0].disabled = false;
    _newWindow[1].disabled = false;
    _newWindow[0].onclick = saveChoice;
    _newWindow[1].onclick = saveChoice;

    //楼主回复背景色 默认rgba('255', '255', '249', '0.4')
    var _keyReplyColor = document.keyReplyColorSelect.keyReplyColor;
    var _keyReplyA = document.keyReplyColorSelect.keyReplyA;
    var _keyReplyAValue = document.getElementById("keyReplyAValue");
    var color = getCookie('keyReplyColor');
    var colorA = getCookie('keyReplyA');
    color = color && color.split(",") || ['255', '255', '249'];
    _keyReplyColor.value = '#' + (~~color[0]).toString(16) + (~~color[1]).toString(16) + (~~color[2]).toString(16);
    _keyReplyA.value = colorA || 0.4;
    _keyReplyAValue.innerHTML = colorA || 0.4;
    _keyReplyColor.disabled = false;
    _keyReplyA.disabled = false;
    _keyReplyColor.onchange = function(e){
        var hex = this.value.toLowerCase();
        var r = hex.substr(1,2);
        var g = hex.substr(3,2);
        var b = hex.substr(5,2);
        setCookie('keyReplyColor', parseInt(r,16)+','+parseInt(g,16)+','+parseInt(b,16));
    };
    _keyReplyA.onmousemove = function(e){
        _keyReplyAValue.innerHTML = this.value;
    };
    _keyReplyA.onchange = function(e){
        _keyReplyAValue.innerHTML = this.value;
        saveChoice(e);
    };

    //重置所有设置
    document.getElementById('allDefault').onclick = function(){
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
            location.reload();
        }
    };

    //查看屏蔽列表
    document.getElementById('blockList').onclick = function(){
        chrome.runtime.sendMessage({get_blockList: 't'});
    };

//}