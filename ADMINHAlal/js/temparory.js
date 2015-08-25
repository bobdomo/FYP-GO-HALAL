var menu = "";

$(document).ready(function()
{
    var menujson = $.ajax(
        { type: "POST",
          url: "php/temporary.php",
          async: false
        }).responseText;

    menu = JSON.parse(menujson);

    // var linkAdd = "<a href=\"javascript:saveAdd();\" title='Add'>" +
                               // "<img src='images/add.png' class='editLogo'/></a>";
     var linkAdd = "<a href=\"javascript:saveAdd();\" title='Add'>" +
                               "<img src='images/add.png' height='25px' class='editLogo'/></a>";
    var output =
        "<thead>"+
		"<tr>"+
    "<th>ID</th>"+
        "<th>Restaurant Name</th>"+
        "<th>Restaurant Address</th>"+
        "<th>Restaurant tel</th>"+
        "<th>Restaurant URL</th>"+
		"<th>Restaurant Coordinate</th>"+
		"<th>Restaurant Tag</th>"+
		"<th>Restaurant Criteria</th>"+
		"<th>Type of Cusine</th>"+
    "<th>Price Range</th>"+
        //"<td></td>"+
		"</tr>"+
		"</thead>"+
		"<tbody>"+
        "<tr>"+
        "<td style='text-align:center;'>Add New Item</td>"+
        "<td><input id='RName' type='text' value='' ></td>"+
        "<td><input id='Raddress' type='text' style='width: 146px; value=''></td>"+
        "<td><input id='Rtel' type='text' style='width: 122px;' value='' ></td>"+
        "<td><input id='Rurl' type='text' style='width: auto;' value=''></td>"+
        "<td><input id='Rtag' type='text' style='width: auto;' value=''></td>"+
        "<td><input id='Rcriteria' type='text' style='width: auto;' value=''></td>"+
        "<td><input id='Rprice' type='text' style='width: auto;' value=''></td>"+
        "<td><input id='Rprice' type='text' style='width: auto;' value=''></td>"+
        "<td><input id='Rprice' type='text' style='width: auto;' value=''></td>"+
        "<td>"+ linkAdd +"</td></tr></tbody>";

    //alert("1 : " +rest[0].restName + "\n2 : " +rest[1].restName);

    for(var i = 0; i < menu.length; i++) {

        var linkEdit = "<a href=\"javascript:Approve('" + i + "');\" title='Edit'>" +
                               "<img src='images/approve.png' height='25px' class='editLogo'/></a>";

        var linkDel = "<a href=\"javascript:delMenu('" + i + "');\" title='Delete'>" +
                               "<img src='images/delete.png' height='25px' class='editLogo'/></a>";
        output +=
            "<tr id=a><td>"+ menu[i].Restaurant_id  +"</td><td style='text-align:right;'>"+ menu[i].Restaurant_Name +
            "</td><td>"+ menu[i].Restaurant_address +
            "</td><td>"+ menu[i].Restaurant_tel +
            "</td><td>"+ menu[i].Restaurant_URL +
            "</td><td>"+ menu[i].Restaurant_coordinate +
            "</td><td>"+ menu[i].Restaurant_tag +
            "</td><td style='text-align:center;'>"+ menu[i].Restaurant_criteria +
            "</td><td style='text-align:center;'>"+ menu[i].Restaurant_cusine +
            "</td><td>"+ menu[i].Restaurant_price +
            "</td><td class='editLogo'>"+linkEdit+"&nbsp;"+linkDel+
            "</td></tr>";
    }

    $("#adminMenu").html(output);
});

function Menu(id,Restaurant_Name,Restaurant_address,Restaurant_tel,Restaurant_URL,Restaurant_coordinate,Restaurant_tag,Restaurant_criteria,Restaurant_cusine, Restaurant_price){
    this.Restaurant_id = id;
    this.Restaurant_Name = Restaurant_Name;
    this.Restaurant_address = Restaurant_address;
    this.Restaurant_tel = Restaurant_tel;
    this.Restaurant_URL = Restaurant_URL;
    this.Restaurant_coordinate = Restaurant_coordinate;
    this.Restaurant_tag = Restaurant_tag;
    this.Restaurant_criteria = Restaurant_criteria;
    this.Restaurant_cusine = Restaurant_cusine;
    this.Restaurant_price = Restaurant_price;
}

// function editMenu(Restaurant_id){
//     var linkSave = "<a href=\"javascript:saveEdit('" + Restaurant_id + "');\" title='Save'>" +
//                                "<img src='images/save.png' height='25px' class='editLogo'/></a>";
//
//     var linkCancel = "<a href=\"javascript:cancelEdit('" + Restaurant_id + "');\" title='Cancel'>" +
//                          "<img src='images/back.png' height='25px' class='editLogo'/></a>";
//
//     var a = parseInt(Restaurant_id);
//     alert(a+1);
//     a//lert(Restaurant_id+1);
//
//     $("tr#"+Restaurant_id).html(
//         "<td style='text-align:right;'>"+menu[Restaurant_id].Restaurant_id+
//         "</td><td><input id='editName' type='text' value='"+menu[Restaurant_id].Restaurant_Name+"' >"+
//         "</td><td style='text-align:center;'><input id='editAddress' type='text' value='"+menu[Restaurant_id].Restaurant_address+"' >"+
//         "</td><td style='text-align:center;'><input id='edittel' type='text' value='"+menu[Restaurant_id].Restaurant_tel+"' >"+
//         "</td><td style='text-align:center;'><input id='editurl' type='text' value='"+menu[Restaurant_id].Restaurant_URL+"' >"+
//         "</td><td style='text-align:center;'><input id='editcoordinate' type='text' value='"+menu[Restaurant_id].Restaurant_coordinate+"' >"+
//         "</td><td style='text-align:center;'><input id='edittag' type='text' value='"+menu[Restaurant_id].Restaurant_tag+"' >"+
//         "</td><td style='text-align:center;'><input id='editcriteria' type='text' value='"+menu[Restaurant_id].Restaurant_criteria+"' >"+
//         "</td><td style='text-align:center;'><input id='editcusine' type='text' value='"+menu[Restaurant_id].Restaurant_cusine+"' >"+
//         "</td><td style='text-align:center;'><input id='editprice' type='text' value='"+menu[Restaurant_id].Restaurant_price+"'>"+
//                              "<td>"+linkSave+"&nbsp;"+linkCancel+
//         "</td>"
//     );
// }
//
// function cancelEdit(Restaurant_id){
//     var linkEdit = "<a href=\"javascript:editMenu('" + Restaurant_id + "');\" title='Edit'>" +
//                                "<img src='images/edit.png' class='editLogo'/></a>";
//
//     var linkDel = "<a href=\"javascript:delMenu('" + Restaurant_id + "');\" title='Delete'>" +
//                                "<img src='images/del.png' class='editLogo'/></a>";
//
//     $("tr#"+Restaurant_id).html("<td style='text-align:right;'>"+menu[Restaurant_id].Restaurant_id+
//             "</td><td>"+menu[Restaurant_id].Restaurant_Name+
//             "</td><td style='text-align:center;'>"+menu[Restaurant_id].Restaurant_address+
//             "</td><td style='text-align:center;'>"+menu[Restaurant_id].Restaurant_tel+
//             "</td><td style='text-align:center;'>"+menu[Restaurant_id].Restaurant_URL+
//             "</td><td style='text-align:center;'>"+menu[Restaurant_id].Restaurant_coordinate+
//             "</td><td style='text-align:center;'>"+menu[Restaurant_id].Restaurant_tag+
//             "</td><td style='text-align:center;'>"+menu[Restaurant_id].Restaurant_criteria+
//             "</td><td style='text-align:center;'>"+menu[Restaurant_id].Restaurant_cusine+
//             "</td><td>"+menu[Restaurant_id].Restaurant_price+
//             "</td><td class='editLogo'>"+linkEdit+"&nbsp;"+linkDel+
//             "</td>");
// }
//
// function saveEdit(Restaurant_id){
//     var name = $("#editName").val();
//     var address = $("#editAddress").val();
//     var tel = $("#edittel").val();
//     var url = $("#editurl").val();
//     var coordinate = $("#editcoordinate").val();
//     var tag = $("#edittag").val();
//     var criteria = $("#editcriteria").val();
//     var cusine = $("#editcusine").val();
//     var price = $("#editprice").val();
//
//     confirm("Save\n"+name+"\n"+address+"\n"+tel+"\n"+url+"\n"+coordinate+"\n"+tag+"\n"+criteria+"\n"+cusine+"\n"+price+"?");
//
//     saveMenu(menu[Restaurant_id].Restaurant_id, name, address, tel, url, coordinate, tag, criteria,cusine, price);
// }
//
// function saveMenu(Restaurant_id, name, address, tel, url,coordinate,tag,criteria,cusine,price){
//
//     var saveMenu = new Menu(Restaurant_id, name, address, tel, url,coordinate,tag,criteria,cusine,price);
//     var jsonMenu = JSON.stringify(saveMenu);
//     //alert(jsonMenu);
//     // var result = $.ajax(
//     //     {
//     //         type : "POST",
//     //         url : "php/saveMenu.php?json="+jsonMenu,
//     //         async : false
//     //     }).responseText;
//     //
//     // window.location.href="adminMenu.html";
//
//     //alert(result);
//     /*if(result == "SAVED")
//     {
//         alert("Change(s) has been Saved.");
//
//         //updateList();
//         editing = false;
//     }
//     else
//     {
//         alert("Failed to Save Change(s).");
//         editing = false;
//     }*/
// }

function delMenu(id){
    var answer = confirm("Delete Item?");

    // alert(menu[id].Restaurant_Name);

    if(answer)
    {
        var result = $.ajax(
            {
                type : "POST",
                url : "php/deleterestaurant.php?menuID="+menu[id].Restaurant_id,
                async : false
            }).responseText;

        if(result == "DELETED")
        {
            alert("Menu has been Deleted.");

            window.location.href="index.html";
        }
        else
        {
            alert("Failed to Delete Menu.");

            window.location.href="index.html"
        }
    }


}

function Approve(id){
  var answer = confirm("Approve This Restaurant?");

  // var result= $.ajax(
  //   {
  //     type : "POST",
  //     url : "php/approverestaurant.php?name="+menu[i].Restaurant_name +"&address=" +menu[i].Restaurant_address+"&tel="+menu[i].Restaurant_tel+"&url="+menu[i].Restaurant_URL+"&coordinate="+menu[i].Restaurant_coordinate+"&tag="+menu[i].restaurant_tag+"&criteria="+menu[i].Restaurant_criteria+"&Cuisine="+menu[i].Restaurant_cusine+"&price"+menu[i].Restaurant_price,
  //     // +"&criteria="+ menu[i].Restaurant_criteria +"&url="+ menu[i].Restaurant_URL +
  //     // "&tel="+ menu[i].Restaurant_tel +"&Cuisine="+ menu[i].Restaurant_cusine + "&price=" + menu[i].Restaurant_price +
  //     // "&rating=" + menu[i].Restaurant_rating + "&coordinate=" + menu[i].Restaurant_coordinate + ,
  //     async: false
  //   }).responseText;

 //alert(result.url);
if (answer){
  // var name = menu[i].Restaurant_name;
  // var address = menu[i].Restaurant_address;
  // var tel = menu[i].Restaurant_Tel;
  // var url = menu[i].Restaurant_URL;
  // var criteria = menu[i].Restaurant_Criteria;
  // var tag = menu[i].Restaurant_Tag;
  // var cuisine = menu[i].Restaurant_Cusine;
  // var price = menu[i].Restaurant_price;
  // var coord = menu[i].Restaurant_coordinates;
  //
  // alert(name);

  // alert("ayam");
  //var url ="http://localhost/api/?interface=admininsert&price="+z+"&criteria="+c+"&cuisine="+b;
//  var url = "http://localhost/api/?interface=admininsert&pname="+ name +"&paddress="+ address +"&ptel="+ tel +"&pcriteria="+ criteria +"&purl="+ url +"&ptag="+ tag +"&pcuisine="+ cuisine +"&pprice="+ price +"&pcoord="+coord;
//  alert(url);
  // JSONP(url,function(data){
  //
  //   })


    alert("The List Has Been Approved")
    window.location.href= "index.html"
  //  delmenu(id);

  // else{
  //   alert("Failed to approve you Choice, Contact Developer");
  //   window.location="index.html";
  // }
  // alert(menu[id].Restaurant_Name);
}
}
