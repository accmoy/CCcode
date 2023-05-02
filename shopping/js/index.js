window.addEventListener('load', function() {
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 鼠标经过focus 就显示隐藏左右按钮和停止计时器
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })
    // 动态生成小圆圈  有几张图片就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for(var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        // 记录当前圆圈的索引号，通过自定义属性来做
        li.setAttribute('index',i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for(var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 当我们点击了某个小li 就拿到当前小li的索引号
            var index = this.getAttribute('index');
            // 当我们点击某个小li 就要把这个li的索引号给num
            num = index;
            // 当我们点击某个小li 就要把这个li的索引号给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if(flag) {
            flag = false;           //关闭节流阀
            if(num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;    //打开节流阀
            });
            circle++;
            for(var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            if(circle == ol.children.length) {
                circle = 0;
            }
            ol.children[circle].className = 'current';
        }
    })
    arrow_l.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == 0) {
                // 跳转到最后一张照片
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if(circle < 0) {
                circle = ol.children.length  - 1;
            } 
            for(var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    })
    // 自动播放轮播图
    var timer = this.setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    },2000);
})