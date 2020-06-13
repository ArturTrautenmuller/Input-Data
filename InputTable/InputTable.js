var cellbkp;
function UploadData(TableId,filePath,serverURL){
var PostData = {
	FilePath:filePath,
	Tabela: []
	
	};
var table = document.getElementById(TableId);
var rows = table.childNodes;
for(var i = 0; i < rows.length;i++){
	var cells = rows[i].childNodes;
	var postRow = [];
	for(var j = 0;j < cells.length;j++){
		var cell = cells[j].childNodes;
		console.log(cell);
		cellbkp = cell;
		if(cell[0].value != null && cell[0].value != ''){
			postRow.push(cell[0].value);
		}
		
	
	}
	if(postRow.length > 0){
		PostData.Tabela.push(postRow);
	}
}

//enviar para o servidor
var settings = {
  "url": serverURL+"/Table/postData",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": ["application/json", "text/plain"]
   
  },
 "data":JSON.stringify(PostData)
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
//


}

function AddLine(TableId,qtdColumn){
	var row = document.createElement("tr");
	for(var i = 0; i < qtdColumn;i++){
					 var cell = document.createElement("td");
					  var textBlock = document.createElement("input");
					  textBlock.setAttribute("type","text");
					  textBlock.setAttribute("style","width:100%");

     				 cell.appendChild(textBlock);
     				 row.appendChild(cell);
	}
	
	document.getElementById(TableId).appendChild(row);
}

//getData();

define( [
        'jquery',"text!./InputTable.css"
    ],
    function ( $,cssContent ) {
        'use strict';
		$("<style>").html(cssContent).appendTo("head");
        return {

  
			definition: {
				type: "items",
				component: "accordion",
				items: {
					appearancePanel: {
						uses: "settings",
						items: {
							MyStringProp: {
								ref: "filePath",
								type: "string",
								label: "File Path",
								defaultValue: "C:/desq/DePara.csv"
							},
							ServerURL: {
								ref: "serverUrl",
								type: "string",
								label: "Server URL",
								defaultValue: "http://localhost:63447"
							}
						}
					}
				}
			},
            paint: function ( $element, layout ) {

				 $element.empty();
				  var settings = {
				  "url": layout.serverUrl+"/Table/getData",
				  "method": "GET",
				  "timeout": 0,
				  "headers": {
					"Content-Type": "application/x-www-form-urlencoded"

				  },
				  "data": {
					"FilePath": layout.filePath
				  }
				};

				$.ajax(settings).done(function (response) {
				var info = response;
				  var tbl = document.createElement("table");
			   var tblBody = document.createElement("tbody");
			   var hashTableId = "InputTableBody"+Math.floor(Math.random() * 1000);
			   tblBody.setAttribute("id",hashTableId);
			   
  				
			  for (var j = 0; j < info.length; j++) {
   
 				   var row = document.createElement("tr");

 				   for (var i = 0; i < info[j].length; i++) {
      
    				  var cell = document.createElement("td");
    				  var cellText = document.createTextNode(info[j][i]);
					  var textBlock = document.createElement("input");
					  textBlock.setAttribute("type","text");
					  textBlock.setAttribute("value",info[j][i]);
					  textBlock.setAttribute("style","width:100%");

     				 cell.appendChild(textBlock);
     				 row.appendChild(cell);
   					 }

    
   			 tblBody.appendChild(row);
  }

  
  			 tbl.appendChild(tblBody);
  
 
 				// tbl.setAttribute("border", "1");
				 tbl.setAttribute("class","Tabela");
				 var tableDiv = document.createElement("div");
				 tableDiv.setAttribute("class","TabelaDiv");
				 tableDiv.appendChild(tbl);
				 $element.append( tableDiv );
				 
				 var cargaButton = document.createElement("button");
				 cargaButton.appendChild(document.createTextNode("+"));
				 cargaButton.setAttribute("onclick","AddLine('"+hashTableId+"',"+info[0].length+")");
				 cargaButton.setAttribute("class","AddButton");
				 
             	$element.append( cargaButton );
				
				var salvarButton = document.createElement("button");
				 salvarButton.appendChild(document.createTextNode("Salvar"));
				 salvarButton.setAttribute("onclick","UploadData('"+hashTableId+"','"+layout.filePath+"','"+layout.serverUrl+"')");
				 salvarButton.setAttribute("class","SalvarButton");
				 
             	$element.append( salvarButton );
				
				  
				  
				  
				});
				 
				 
				 
				 
				 
				 
               
				
				

            }
        };
    } );