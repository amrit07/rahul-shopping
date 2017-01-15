/**
 * Created by amis67 on 1/14/2017.
 */
$(function(){
    $.ajax({
        'url':'../assets/cart.json',
        success:function(data){
            var cart = data;
            // console.log("cart--->",cart);
            var item = getItem();
            console.log("item above is ",item);
            item.then(function(data){
            // console.log("item below is ",data);
                
                     var $item = $(data);
            console.log("item is ---->",$item);
            var divStorage = $('<div class="itemRepeat"></div>');
            var products = cart.productsInCart;
            for(i=0,l=products.length;i<l;i++){
                console.log("inside loop");
                var product = products[i],
                title = product.p_name,
                qty=product.p_quantity,
                unitPrice=product.p_price,
                imgSrc="P"+product.p_id+".jpg",
                size=product.p_selected_size.name,
                color=product.p_selected_color.name,
                style=product.p_style;
                var $newItem = $item.clone(); // making a clone of the template we recieved
                $newItem.find('.title').html(title);
                divStorage.append($newItem);
            }
            console.log("divstorage is ",divStorage);
            $("#repeat").append(divStorage);

            });
           

        },
        error:function(error){
            console.log("error is ",error);
        }
    });



    function getItem(){
    var item = jQuery.Deferred();
    $.ajax({
        url:"../assets/item.html",
        success:function(data){
        //  console.log("data inside getItem is ",data);
            item.resolve(data);
        },
        error:function(error){
            item.reject(error);
        }
    });

    return item.promise();

}
})
