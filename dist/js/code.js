const _quantity = 0;
const _characters = 70;
const urlApi = "https://fakerapi.it/api/v1/texts";

var quantityGeneral = _quantity;

/* $.ajax({
    type: "GET",
    url: urlApi,
    data: {
        _quantity: _quantity,
        _characters: _characters
    },
    dataType: "JSON",
    success: function (result) {        
        console.log(result.data);        
        $('#news_items').html("");
        result.data.forEach(function(content, index) {
            $('#news_items').append(`<li><strong>List Item #${index+1}:</strong> ${content.content}</li>`);
        });
    },
    beforeSend: function () {
        $('#news_items').html('<div class="loader">Loading...</div>');
    },
}); */

AddItem(6);

function AddItem(_num) {
    if (!_num) _num = 1;
    $.ajax({
    type: "GET",
    url: urlApi,
    data: {
        _quantity: _num,
        _characters: _characters
    },
    dataType: "JSON",
        success: function (result) {
            result.data.forEach(function(content, index) {
            quantityGeneral++;
            $('#news_items').append(`<li><strong>List Item #${index+quantityGeneral}:</strong> ${content.content}</li>`);
        });
    },
});
}