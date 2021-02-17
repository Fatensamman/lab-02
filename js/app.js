'use strict';

let keywords = [];
let gallary = [];
pages();

$('.selectt').on('change', function () {
    $('.template-div').hide();
    let selected = $(this).val();
    $(`.${selected}`).fadeIn(800);
    if (selected == "default") {
        $('.template-div').show();
    }
})

function Box(elem) {
    this.image_url = elem.image_url;
    this.title = elem.title;
    this.description = elem.description;
    this.keyword = elem.keyword;
    this.horns = elem.horns;
    gallary.push(this);
}

Box.prototype.toHtml = function () {
    let template = $('#container').html();
    // console.log(this);
    let newObj = Mustache.render(template, this);
    $('.section').append(newObj)
}

function toGetData(url) {
    keywords = [];
    // $(document).ready(function () {
    $.ajax(url).then((data) => {
        data.forEach((element) => {
            let newBox = new Box(element);
            newBox.toHtml();
            if (keywords.indexOf(newBox.keyword.toLowerCase()) === -1) {
                keywords.push(newBox.keyword);
            }
        });
        keywords.forEach((keyword) => {
            $('.selectt').append(`
                <option value=${keyword}>${keyword}</option>`);
        });
    });
    // });
}

function pages() {
    gallary =[]
    toGetData('data/page-1.json');

    $('#1').on('click', function () {
        $('.section').html('');
        gallary = [];
        // $('.template-div').hide();
        $('.selectt').children().remove().end().append(`<option value="default">Filter by Keyword</option>`);
        toGetData('data/page-1.json');
    });
    $('#2').on('click', function () {
        $('.section').html('');
        gallary = [];
        // $('.template-div').hide();
        $('.selectt').children().remove().end().append(`<option value="default">Filter by Keyword</option>`);
        toGetData('data/page-2.json');
    });
};

$('.sort-by').on('change', function () {
    $('.section').html('');
    let option = $(this).val()
    if (option == 'byTitle') {
        sortBy(gallary,'title');
    } else if (option == 'byHorns') {
        sortBy(gallary,'horns');
    };
})
// function sorting() {
function sortBy(arr , Property) {
    arr.sort((a, b) => {

        if (a[Property] < b[Property]){
            return -1;
        }
        else if (a[Property] > b[Property])
            return 1;
        else return 0;
    });
    $('.section').html('');
    arr.forEach(element => {
        element.toHtml();
    });
}


