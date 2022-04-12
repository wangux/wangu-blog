# css
渐进增强
.transition {
-webkit-transition: all .5s;
-moz-transition: all .5s;
-o-transition: all .5s;
transition: all .5s;
}
优雅降级
.transition {
transition: all .5s;
-o-transition: all .5s;
-moz-transition: all .5s;
-webkit-transition: all .5s;
}

常用的四大浏览器及其对应的css私有前缀
谷歌		-webkit-
firefox  	-moz-
opera	-o-
IE		-ms-

css3中，11种UI元素状态伪类选择器
E:hover	E:focus	E:active		E:enabled	E:disabled	E:read-only	E:read-write	E:checked

居中
```js
//不知具体宽高
position: absolute;
top:0;
bottom: 0;
left: 0;
right: 0；
margin: auto;

//知道具体宽高
position: absolute;
width: 100px;
height: 200px;
top:50%;
left: 50%;
margin-left: -50px;
margin-top: -100px;

//弹性盒
display: flex;
justify-content: center;
align-items: center;

//table
display: table-cell;
text-align: center;
vertical-align: center;

//简单元素
height:50px;
line-height:50px;
text-align: center;
```


设置全局置灰（默哀）
html {
        filter: grayscale(100%); 
        -webkit-filter: grayscale(100%); 
        -moz-filter: grayscale(100%); 
        -ms-filter: grayscale(100%); 
        -o-filter: grayscale(100%); 
        -webkit-filter: grayscale(1);
}