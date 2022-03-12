// CONST
const _quantity = 0;
const _characters = 70;
const urlApi = "https://fakerapi.it/api/v1/";
// VARIABLES
var quantityGeneral = _quantity;

///////////////////
//CALLS

//Load API content
AddItem(6);

// Modal close
$(document).keyup(function(e) {
    let modal = $('#modal');
    if (!modal.is(':hidden')) {
        if (e.key === "Escape") { 
            closeModal(modal);
        }
    }
});
///////////////////

//////////////////
// FUNCTIONS
function loadMore(_num) {
    if (!_num) _num = 3;
    $.ajax({
        type: "GET",
        url: urlApi + "books",
        data: {
            _quantity: _num,
        },
        dataType: "JSON",
        success: function (result) {
            result.data.forEach(function (content) {
                $('#alternating_format-items').append(`<article class="row"><div class="col-4"><figure><a href="${content.image}" target="_blank"><img src="http://placeimg.com/346/190/tech" alt="image"></a></figure></div><div class="col-8"><h2><a href="${content.image}" target="_blank">${content.title}</a></h2><p>${content.description}</p></div></article>`);
            });
    },
});
}
function AddItem(_num) {
    if (!_num) _num = 1;
    $.ajax({
        type: "GET",
        url: urlApi + "texts",
        data: {
            _quantity: _num,
            _characters: _characters
        },
        dataType: "JSON",
        success: function (result) {
            result.data.forEach(function(content) {
                quantityGeneral++;
                $('#news_items').append(`<li><strong>List Item #${quantityGeneral}:</strong> ${content.content}</li>`);
            });
    },
    beforeSend: function () {
        $('.cont_loader').show();
    },
    complete: function () {
        $('.cont_loader').hide();
        if (quantityGeneral>=10) {
            $('#load_more').hide();            
        }
    },
});
}
function openPopup(_obj,_modal,_title,_text,_img,_video) {
    _obj = $(_obj);
    _modal = $(_modal);
    _modal_cont = _modal.find(".cont_modal");
    _modal_cont.html("");
        
    if (_img) {
        _modal_cont.append("<img src='" + _img + "'/>");
    }
    if (_title) {
        _title = _obj.parent("div").find("h3").html();
        _modal_cont.append("<h3>" + _title + "</h3>");
    }
    if (_text) {
        _text = _obj.parent("div").find("p").html();
        _modal_cont.append("<p>" + _text + "</p>");
    }
    if (_video) {
        _video = getIdYoutube(_video);
        _modal_cont.append('<div class="videoWrapper"><iframe src="//www.youtube.com/embed/' + _video + '" frameborder="0" allowfullscreen></iframe></div>');
    }
    
    _modal.fadeIn();
    _modal.next().fadeIn();
}
function closeModal(_modal) {
    _modal.fadeOut();    
    _modal.next().fadeOut();
}

function getIdYoutube(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
    return match[2];
    } else {
    return "error";
    }
}
//////////////////