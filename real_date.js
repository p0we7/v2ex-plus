//——————————————————————————————————绝对时间——————————————————————————————————
chrome.runtime.sendMessage({get_realDate_status: 't'}, function(response) {
    if ( response.realDate_status ) {
        // By v2ex.com/t/247255
        (function(win, doc, $) {
            // 检测列表
            var classList = [
                '.header .gray',    // 楼主时间
                '.cell .small',     // 列表时间
                '.inner .small',    // 最后一条
                '.dock_area .fade', // 个人主页回复列表
                '.subtle .fade',    // 附言栏
                '.cell .snow'       // 系统提醒
            ];
            // 时间正则
            /*
             * RegExp.exec() 返回结构说明
             * 0: 匹配的时间文本
             * 1: 天数
             * 2: 小时数
             * 3: 分钟数
             */
            var dateReg = /(?:(\d+)\s*天前)|(?:(?:(\d+)\s*小时\s*)?(\d+)\s*分钟前)|(?:几秒前|刚刚)/g;
            // 执行检查和替换
            for(var ind in classList) {
                $(classList[ind]).each(function(index, item) {
                    var showDate, itemContent, matchArray;
                    item = $(item);
                    dateReg.lastIndex = 0;
                    itemContent = item.html();
                    matchArray = dateReg.exec(itemContent);
                    showDate = realDate(matchArray);
                    if(showDate) {
                        item.html(itemContent.replace(matchArray[0], showDate));
                    }
                });
            }
            /**
             * 获取绝对时间
             */
            function realDate(matchArray) {
                if(!matchArray)
                    return false;
                var now = new Date(),
                    nowHour = now.getHours(),
                    dayNum = matchArray[1] || 0,
                    hourNum = matchArray[2] || 0,
                    minuteNum = matchArray[3] || 0,
                    itemNow, resultDate, resultTime;
                now.setDate(now.getDate() - dayNum);
                now.setHours(now.getHours() - hourNum);
                now.setMinutes(now.getMinutes() - minuteNum);
                itemNow = new Date(now);
                resultDate = [itemNow.getFullYear(), itemNow.getMonth() + 1, itemNow.getDate()].join('-');
                resultTime = [fixZero(itemNow.getHours()), fixZero(itemNow.getMinutes())].join(':');
                if(dayNum > 0) {
                    return resultDate;
                } else {
                    if(hourNum >= nowHour) {
                        return [resultDate, resultTime].join(' ');
                    } else {
                        return resultTime;
                    }
                }
            }
            /**
             * 数字补零
             */
            function fixZero(num) {
                return num > 9 ? num : '0' + num;
            }
        })(window, document, window.jQuery);
    }
});

//——————————————————————————————————绝对时间——————————————————————————————————

