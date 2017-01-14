/**
 * Created by amis67 on 1/14/2017.
 */
$(function(){
    $.ajax({
        'url':'../assets/cart.json',
        success:function(data){
            var cart = data;
            console.log("cart--->",cart);
        },
        error:function(error){
            console.log("error is ",error);
        }
    });
})
