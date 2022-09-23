window.addEventListener('load', () => {
    //1.获取元素
    let arrow_l = document.querySelector('.arrow-l');
    let arrow_r = document.querySelector('.arrow-r');
    let focus = document.querySelector('.focus');
    let dt = document.querySelector('.dt')
    let dd = document.querySelector('.dd')
    let focusWidth = focus.offsetWidth +41;
    console.log(focusWidth);
    //鼠标经过离开事件
    focus.addEventListener('mouseenter', () => {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //鼠标经过停止定时器
        clearInterval(timer);
        timer = null;
    })
    //鼠标经过全部商品 dd显示 
    // dt.addEventListener('mouseenter',()=>{
    //     dd.style.display='block';
    //     // console.log(111);
    // })
    //  //鼠标离开全部商品 dd隐藏 
    // dt.addEventListener('mouseleave',()=>{
    //     dd.style.display='none';
    // })
    focus.addEventListener('mouseleave', () => {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //鼠标离开开启定时器
        timer = setInterval(() => {
            //手动调用事件
            arrow_r.click();
        }, 2000)
    })
    //动态生成小圆圈
    let ul = focus.querySelector('ul');
    let ol = focus.querySelector('.circle')
    // console.log(ul.children.length);

    for (let i = 0; i < ul.children.length; i++) {
        //创建小li
        let li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义设定
        li.setAttribute('index', i);
        //把小li插入
        ol.appendChild(li);
        //小li 小圆圈的排他思想
        li.addEventListener('click', function () {
            //干掉所有人 把所有的小li 清除 current 类名
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下当前的
            this.className = 'current';

            //点击小圆圈移动 ul图片
            //ul 的移动距离 小圆圈的索引号 * 图片的宽度
            //点击小li 拿到当前小li的索引号
            let index = this.getAttribute('index');
            //点击小li 把li 的索引号给num
            num = index;
            //点击小li 把li 的索引号给circle
            circle = index;
            console.log(focusWidth);
            console.log(index);

            animate(ul, -index * focusWidth);
        })
    }
    //把第一个ol 的小li的类名设置 current
    ol.children[0].className = 'current';
    //克隆第一张图片 放到ul的最后面
    let first = ul.children[0].cloneNode(true);
    ul.append(first);
    //点击右侧按钮滚动图片
    let num = 0;
    //circle控制小圆圈的变量
    let circle = 0;
    //flage节流阀 防止快速点击
    let flage = true;

    arrow_r.addEventListener('click', () => {
        if (flage) {
            flage = false;//关闭节流阀
            //如果走到最后复制的图片也就是第一张 我们的ul要快速的复原 left为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, () => {
                flage = true//打开节流阀 
            });
            //点击右侧按钮小圆圈跟着一起变
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });


    arrow_l.addEventListener('click', () => {
        if (flage) {
            flage = false;//关闭节流阀
            //如果走到最后复制的图片也就是第一张 我们的ul要快速的复原 left为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = - num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, () => {
                flage = true;//打开节流阀
            });
            //点击右侧按钮小圆圈跟着一起变
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? circle = ol.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        //先清除其他的小圆圈current类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的clas类为current
        ol.children[circle].className = 'current';
    }
    //自动播放图片定时器
    let timer = setInterval(() => {
        //手动调用事件
        arrow_r.click();
    }, 2000)

})