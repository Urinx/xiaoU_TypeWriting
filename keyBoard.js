CodeList=CodeList.split(',');
var pingyin=[],InputChar=[];

function $(element){
    return document.querySelector(element);
}
function $A(element){
    return document.querySelectorAll(element);
}

function FindIn(s) {
    var find=-1,low=0,mid=0,high=CodeList.length;
    var sEng="";
    while(low<high){
        mid=(low+high)/2;
        mid=Math.floor(mid);
        sEng=CodeList[mid];
        if(sEng.indexOf(s,0)==0){find=mid;break;}
        sEng=CodeList[mid-1];
        if(sEng.indexOf(s,0)==0){find=mid;break;}
        if(sEng<s){low=mid+1;}else{high=mid-1;}
    }
    while(find>0){
        sEng=CodeList[find-1];
        if(sEng.indexOf(s,0)==0){find--;}else{break;}
    }
    return find;
}

function imeEngine(char){
    var index=FindIn(char.toLowerCase()),words='';
    for(var i=0,zn=[];CodeList[index] && i<100;i++,index+=i,zn.push((CodeList[index]+'').split(' ')[1]));
    for(var i=0;zn[0] && i<5;i++,words+='<span>'+zn.shift()+'</span>');
    $('.wordbar').innerHTML='<span id="pingyin">'+pingyin.join('')+'</span>'+words+'<span id="next">></span>';
    $('#next').addEventListener('click',function(){
        var span=$A('.wordbar span');
        for(var i=1;i<6;i++){
            span[i].innerHTML=zn[0]?zn.shift():'';
        }
    });
    var span=$A('.wordbar span');
    for(var i=1;i<6;i++){
        span[i].onclick=function(){
            var k=this.innerHTML.length;
            for(var i=0;i<k;i++){
                InputChar.push(this.innerHTML[i]);
            }
            $('.input').value=InputChar.join('');
            $('.ios7_keyboard').removeChild($('.wordbar'));
            pingyin=[];
        }
    }
}

function hideOnBlur(obj,show){
    obj.style.top=document.body.offsetHeight+'px';
    obj.style.display='block';
    obj.onclick=function(){
        event.stopPropagation();//阻止冒泡
    }
    $('body').onclick=function(){
        $('.wordbar')?obj.removeChild($('.wordbar')):false;
        pingyin=[];
        if (obj.offsetTop<document.body.offsetHeight) {
            obj.style.top=obj.offsetTop+'px';
            obj.style.top=document.body.offsetHeight+'px';
        }
    }
    show.onclick=function(){
        show.readOnly=true;
        obj.style.top=document.body.offsetHeight-obj.offsetHeight+'px';
        event.stopPropagation();
    }
}

function putWords(){
    if($('.wordBar')){
        if(this.value=='<'){
            pingyin.length==1?$('.wordBar').parentNode.removeChild($('.wordBar')):false;
            pingyin.pop();
        }
        else if(this.value=='space'){
            pingyin.push(' ');
        }
        else if(this.value=='return'){
            //
        }
        else if(this.value=='zn'){
            //
        }
        else if(this.value=='123'){
            //
        }
        else if(this.value=='^'){
            //
        }
        else{
            pingyin.push(this.value);
        }
        $('.wordBar')?$('.wordBar').innerHTML=pingyin.join(''):false;
    }
    else{
        if(!/<|\^|zn|123|space|return/.test(this.value)){
            var wordbar=document.createElement('div');
            wordbar.innerHTML=this.value;
            pingyin.push(this.value);
            wordbar.setAttribute('class','wordbar');
            $('.ios7_keyboard').appendChild(wordbar);
        }
        else if(/</.test(this.value)){
            InputChar.pop();
            $('.input').value=InputChar.join('');
        }
    }
    $('.wordBar')?imeEngine(pingyin.join('')):false;
}


window.onload=function(){
    hideOnBlur($('.ios7_keyboard'),$('.input'));
    var input=$A('.ios7_keyboard p input');
    for (var i = 0; i < input.length; i++) {
        input[i].addEventListener('click',putWords);
    };
}