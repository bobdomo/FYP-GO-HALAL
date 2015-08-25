var order = "";

$(document).ready(function()
{
    var menujson = $.ajax(
        { type: "POST", 
          url: "php/getorder.php", 
          async: false
        }).responseText;
    
    order = JSON.parse(menujson);
    var output = "";
    
    //alert("1 : " +order[0].orderName + "\n2 : " +order[1].orderName);
    
    for(var i = 0; i < order.length; i++) {
                output += "<tr><td>"+
                    
                    "<div class='event'>"+
                    "<span>#"+(i+1)+"</span>"+
                    "<div class='info'>"+
                    order[i].orderDate+"<br>"+
                    "<h4>"+order[i].customerName+"</h4>"+
                    order[i].orderName+
                    "</br>"+order[i].orderName+
                    "</div>"+  
                    "<input class='detailButton' type='button' value='Show Details' onclick='window.location.href='#''>"+  
                    "<div class='price'> RM "+order[i].totalPrice+
                    "</div></div>"+                         
                    "</td></tr>";
    }
    
    $("#ordermenu").html(output);
});