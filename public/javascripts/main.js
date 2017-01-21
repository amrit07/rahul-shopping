/**
 * Created by amis67 on 1/14/2017.
 */
$(function(){
    $.ajax({
        'url':'../assets/cart.json',
        success:function(data){
           console.log("data",data);
            var cart = data;
            // console.log("cart--->",cart);
            var item = getItem();
                //console.log("item above is ",item);
            item.then(function(data){
                // console.log("item below is ",data);
                console.log("Json data " + cart.productsInCart[0].p_id);
            var $item = $(data);
                // console.log("item is ---->",$item);
            var divStorage = $('<div class="itemRepeat"></div>');
            var products = cart.productsInCart;
            for(i=0,l=products.length;i<l;i++){
                //console.log("inside loop");
                var product = products[i],
                title = product.p_name,
                qty=product.p_quantity,
                unitPrice=product.p_price,
                imgSrc="assets/T"+product.p_id+".jpg",
                size=product.p_selected_size.name,
                color=product.p_selected_color.name,
                style=product.p_style;
                var $newItem = $item.clone(); // making a clone of the template we recieved
                $newItem.find('.title').html(title);
                $newItem.find('.style').html(style);
                $newItem.find('.img').attr('src', imgSrc);
                $newItem.find('.qty').val(qty);
                $newItem.find('.unit-price').val(unitPrice);
                $newItem.find('.price').val(unitPrice);
                


                divStorage.append($newItem);
            }
            //console.log("divstorage is ",divStorage);
            $("#repeat").append(divStorage);
            //callback
            itemReady();
            });
           

        },
        error:function(error){
            console.log("error is ",error);
        }
    });

    function itemReady(){
        var qty = $('.qty');
        qty.on('change',function(){
            var qtyElem = $(this);
            var parentElem = qtyElem.closest('.row');
            var unitPrice = parentElem.find('.unit-price').val();
            var price = parentElem.find('.price');
            var qty = qtyElem.val();
            price.val(qty*unitPrice);
            var totalPrice = 0;
            /////////// updating total price;
            var allPriceElement = $('.price');
            allPriceElement.each(function(index,elem){
                    totalPrice = totalPrice + Number($(elem).val());
            });

            $("#subtotal").html(totalPrice);

        });
    }

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
