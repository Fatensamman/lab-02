'use strict';

let keywords = [];
const gallary = [];
pages();

$('.selectt').on('change', function () {
    $('.template-div').hide();
    let selected = $(this).val();
    $(`.${selected}`).fadeIn(800);
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
    toGetData('./../data/page-1.json');

    $('#1').on('click', function () {
        $('.section').html('');
        // $('.template-div').hide();
        $('.selectt').children().remove().end().append(`<option value="default">Filter by Keyword</option>`);
        toGetData('./../data/page-1.json');
    });
    $('#2').on('click', function () {
        $('.section').html('');
        // $('.template-div').hide();
        $('.selectt').children().remove().end().append(`<option value="default">Filter by Keyword</option>`);
        toGetData('./../data/page-2.json');
    });
};

$('.sort-by').on('change', function () {
    $('.section').html('');
    let option = $(this).val()
    if (option == 'Title') {
        sortByTitle();
    } else if (option == 'Horns'){
        sortByhorns();
    };
})
// function sorting() {
function sortByhorns() {
    gallary.sort((a, b) => {

        if (a.horns < b.horns) {
            return -1;
        }
        else if (a.horns > b.horns)
            return 1;
        else return 0;
    });
    $('.section').html('');
    gallary.forEach(element => {
        element.toHtml();
    });
}

function sortByTitle() {
    gallary.sort((a, b) => {
        if (b.title.toUpperCase() < a.title.toUpperCase()) {
            return 1;
        }
        else if (b.title.toUpperCase() > a.title.toUpperCase())
            return -1;
        else return 0;
    });
    $('.section').html('');
    gallary.forEach(element => {
        element.toHtml();
    });
}

