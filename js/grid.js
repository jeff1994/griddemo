window.onload = function(){
 function createXMLHttpRequest()  //创建ajax请求
{  
    if(window.ActiveXObject)  
    {  
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
    }  
    else if(window.XMLHttpRequest)  
    {  
        xmlHttp = new XMLHttpRequest();  
    }  
}  
function startRequest()  //开始请求（false采用同步加载，原因是异步加载好多参数后面获取不到）
{  
    createXMLHttpRequest();  
    try  
    {  
        xmlHttp.onreadystatechange = handleStateChange;  
        xmlHttp.open("GET", "Json.json", false);  
        xmlHttp.send(null);  
    }  
    catch(exception)  
    {  
        alert("xmlHttp Fail");  
    }  
}  
function handleStateChange()  //根据返回的状态判断是否ajax成功
{     
    if(xmlHttp.readyState == 4)  
    {         
        if (xmlHttp.status == 200 || xmlHttp.status == 0)  
        {  
            var result = xmlHttp.responseText;  
            resultJs=JSON.parse(result);
           	console.log(resultJs);
        }  
    }  
   
}  

function creatTable()//创建表格
{
	//创建表格的架子
	box = document.createElement("div");
    box.className="headDiv";
    box.style.position="relative";
    tab = document.createElement("table");
    var tr = document.createElement("tr");    
    box.appendChild(tab);
    tab.appendChild(tr);
    document.body.appendChild(box);
    
    
    //获取表头和表体的数量
	headLength = resultJs.fields.length;
	//console.log("headLength"+headLength);
	dataLength=resultJs.data.length;	
	
	//开始往表格（头）里添加数据
	 for(var i=0;i<headLength;i++){
            var th = document.createElement("th");
            var addV = document.createElement("div");
            addV.style.overflow = "hidden";
            addV.className = "divInner";
            addV.innerHTML = resultJs.fields[i];
           //console.log(resultJs.fields[i]);
            th.appendChild(addV);
            tr.appendChild(th);
        }
       
        //往表格里添加数据（表体）
        for(var j=0;j<dataLength;j++){
            var trChild = document.createElement("tr");
                tab.appendChild(trChild);
            for(var i=0;i<headLength;i++){
                var td = document.createElement("td");
                var addD = document.createElement("div");
                addD.setAttribute("contenteditable","true"); //设置为这是一段可编辑的段落
                addD.className = "divInner";
                var field = resultJs.fields[i];
               // console.log(resultJs.fields[i]);
                addD.innerHTML = resultJs.data[j][field];
                
                //console.log(resultJs.data[j][field]);
                td.appendChild(addD);
                trChild.appendChild(td);
}
       }
}

//设置不动的表头
function setScrollid(){
	var tb2 = tab.cloneNode(true);  
   
    var len = tb2.rows.length;  
	
    for(var i=tb2.rows.length;i>1;i--){  
     
      tb2.deleteRow(1);  
    } 
    
    var bak = document.createElement("div");  
    box.appendChild(bak);     
    bak.appendChild(tb2);           
    bak.style.position = "absolute";               
    bak.style.left = 0;      
    bak.style.top = "0px";         
   	box.onscroll = function(){ 
   		
        bak.style.top = this.scrollTop+"px";                       
    }
       
}

//以上所有函数的调用
	createXMLHttpRequest();	
	startRequest();	
	handleStateChange();
	creatTable();
	setScrollid();

};