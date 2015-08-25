var menu = "";

$(document).ready(function()
{
    var menujson = $.ajax(
        { type: "POST", 
          url: "php/adminMenu.php", 
          async: false
        }).responseText;
    
    menu = JSON.parse(menujson);
   
    var linkAdd = "<a href=\"javascript:saveAdd();\" title='Add'>" +
                               "<img src='images/add.png' class='editLogo'/></a>";
    
    var output =        
        "<tr>"+
        "<td>ID #</td>"+
        "<td>Menu Name</td>"+
        "<td>Price (RM)</td>"+
        "<td>Pax</td>"+
        "<td>Details</td>"+
        "<td></td>"+
        "</tr>"+
        "<tr>"+        
        "<td style='text-align:center;'>Add New Item</td>"+
        "<td><input id='addName' type='text' value='' ></td>"+
        "<td><input id='addPrice' type='text' style='width: 146px; value=''></td>"+
        "<td><input id='addPax' type='text' style='width: 122px;' value='' ></td>"+
        "<td><input id='addDetail' type='text' style='width: auto;' value=''>"+
        "<td>"+linkAdd+"</td></tr>";
    
    //alert("1 : " +rest[0].restName + "\n2 : " +rest[1].restName);
    
    for(var i = 0; i < menu.length; i++) {
        
        var linkEdit = "<a href=\"javascript:editMenu('" + i + "');\" title='Edit'>" +
                               "<img src='images/edit.png' class='editLogo'/></a>";
        
        var linkDel = "<a href=\"javascript:delMenu('" + i + "');\" title='Delete'>" +
                               "<img src='images/del.png' class='editLogo'/></a>";
        output += 
            "<tr id="+i+"><td style='text-align:right;'>"+menu[i].menuID+                    
            "</td><td>"+menu[i].menuName+
            "</td><td style='text-align:center;'>"+menu[i].menuPrice+
            "</td><td style='text-align:center;'>"+menu[i].menuPax+
            "</td><td>"+menu[i].menuDetails+
            "</td><td class='editLogo'>"+linkEdit+"&nbsp;"+linkDel+
            "</td></tr>";
    }
    
    $("#adminMenu").html(output);
});

function Menu(id, name, price, pax, detail){
    this.menuID = id;
    this.menuName = name;
    this.menuPrice = price;
    this.menuPax = pax;
    this.menuDetails = detail;
}

/*function addMenu(){
    
    var linkSave = "<a href='javascript:saveAdd();' title='Save'>" +
        "<img src='images/save.png' class='editLogo'/></a>";
    
     $("#add").html(
         "<tr><td></td>"+
         "<td><input id='addName' type='text' value='' ></td>"+
         "<td><input id='addPrice' type='text' value=''></td>"+
         "<td><input id='addPax' type='text' value='' ></td>"+
         "<td><input id='addDetail' type='text' value=''>"+
         "<td>"+linkSave+"&nbsp;"+linkCancel+
         "</td></tr>"
     );
    
}*/

function editMenu(id){
    var linkSave = "<a href=\"javascript:saveEdit('" + id + "');\" title='Save'>" +
                               "<img src='images/save.png' class='editLogo'/></a>";
    
    var linkCancel = "<a href=\"javascript:cancelEdit('" + id + "');\" title='Cancel'>" + 
                         "<img src='images/back.png' class='editLogo'/></a>";
       
    $("tr#"+id).html(
        "<td style='text-align:right;'>"+menu[id].menuID+
        "</td><td><input id='editName' type='text' value='"+menu[id].menuName+"' >"+
        "</td><td style='text-align:center;'><input id='editPrice' type='text' value='"+menu[id].menuPrice+"' >"+
        "</td><td style='text-align:center;'><input id='editPax' type='text' value='"+menu[id].menuPax+"' >"+
        "</td><td><input id='editDetail' type='text' value='"+menu[id].menuDetails+"'>"+                       "<td>"+linkSave+"&nbsp;"+linkCancel+
        "</td>"
    );
}

function cancelEdit(id){
    var linkEdit = "<a href=\"javascript:editMenu('" + id + "');\" title='Edit'>" +
                               "<img src='images/edit.png' class='editLogo'/></a>";
    
    var linkDel = "<a href=\"javascript:delMenu('" + id + "');\" title='Delete'>" +
                               "<img src='images/del.png' class='editLogo'/></a>";
           
    $("tr#"+id).html("<td style='text-align:right;'>"+menu[id].menuID+
            "</td><td>"+menu[id].menuName+
            "</td><td style='text-align:center;'>"+menu[id].menuPrice+
            "</td><td style='text-align:center;'>"+menu[id].menuPax+
            "</td><td>"+menu[id].menuDetails+
            "</td><td class='editLogo'>"+linkEdit+"&nbsp;"+linkDel+
            "</td>");
}

function saveEdit(id){
    var name = $("#editName").val();
    var price = $("#editPrice").val();
    var pax = $("#editPax").val();
    var detail = $("#editDetail").val();
    
    confirm("Save\n"+name+"\n"+price+"\n"+pax+"\n"+detail+"?");
    
    saveMenu(menu[id].menuID, name, price, pax, detail);
}

function saveMenu(id, name, price, pax, detail){
    
    var saveMenu = new Menu(id, name, price, pax, detail);
    var jsonMenu = JSON.stringify(saveMenu);
    //alert(jsonMenu);
    var result = $.ajax(
        {
            type : "POST",
            url : "php/saveMenu.php?json="+jsonMenu,
            async : false
        }).responseText;
    
    window.location.href="adminMenu.html";
    
    //alert(result);
    /*if(result == "SAVED")
    {
        alert("Change(s) has been Saved.");
        
        //updateList();
        editing = false;
    }
    else
    {
        alert("Failed to Save Change(s).");
        editing = false;
    }*/
}

function saveAdd(){
    
     //alert("Masuk  saveAdd()");

     var currUser = $.ajax(
         {
            type: "POST", 
            url: "php/adminLogin.php?do=getUserID", 
            async: false 
         }
     ).responseText;
    
    //alert(currUser);
    
    var name = $("#addName").val();
    var price = $("#addPrice").val();
    var pax = $("#addPax").val();
    var detail = $("#addDetail").val();
    
    //alert(currUser+name+price+pax+detail);
    
    var answer = confirm("Save\n"+name+"\n"+price+"\n"+pax+"\n"+detail+"?");
    
    if(answer)
    {  
        var result = $.ajax(
            {
                type : "POST",
                url : "php/addMenu.php?userID="+currUser+"&menuName="+name+"&menuPrice="+price+"&menuPax="+pax+"&menuDetails="+detail,
                async : false
            }).responseText;
            
        window.location.href="adminMenu.html"
    }
}

function delMenu(id){
    var answer = confirm("Delete Item?");
    
    //alert(menu[id].menuID);
    
    if(answer)
    {
        var result = $.ajax(
            {
                type : "POST",
                url : "php/delMenu.php?menuID="+menu[id].menuID,
                async : false
            }).responseText;

        if(result == "DELETED")
        {
            alert("Menu has been Deleted.");

            window.location.href="adminMenu.html"; 
        }
        else
        {
            alert("Failed to Delete Menu.");
            
            window.location.href="adminMenu.html" 
        }
    }
    
       
}
