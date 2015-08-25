$(document).ready(function() {
    
    $('#regBtn').click(function() {
        regAdmin();
    });
});

function regAdmin() {
        
    var rEmail = $('#rEmail').val();
    var rPassword = $('#rPassword').val();
    var rName = $('#rName').val();
    var rRadio = $('#rRadio').val();
    var rAddress = $('#rAddress').val();
    
    if(rEmail != "" && rPassword != "" && rName != "" && rRadio != "" && rAddress != ""){
        //alert("OK!");    
        
        var answer = confirm("Confirm to Register?");
        
        if(answer)
        { 
            var result = $.ajax(
                {
                    type : "POST",
                    url : "php/adminRegister.php?rEmail="+rEmail+"&rPassword="+rPassword+"&rName="+rName+"&rRadio="+rRadio+"&rAddress="+rAddress,
                    async : false
                }).responseText;
            
            window.location.href="adminLogin.html";
        }
        else{
            window.location.href="adminRegister.html"
        }
    }
    else{
        alert("All field must be filled!");
    }
    
     
    
    
    
}