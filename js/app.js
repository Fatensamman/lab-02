'use strict';

const keywords = [];

$(document).ready(function () {
	$.ajax('./../data/page-1.json').then((data) => {
		data.forEach((element) => {
			let newBox = new Box(element);
            if(keywords.indexOf(newBox.keyword) == -1){
			keywords.push(newBox.keyword);}
			newBox.render();
		});

		keywords.forEach((keyword) => {
			$('select').append(`
	        <option value=${keyword}>${keyword}</option>`);
		});
	});
});

function Box(elem) {
	this.image_url = elem.image_url;
	this.title = elem.title;
	this.description = elem.description;
	this.keyword = elem.keyword;
	this.horns = elem.horns;
}

Box.prototype.render = function () {
	$('.Item').append(
        `<div class = "template-div">
		<h2>${this.title}</h2>
        <img src=${this.image_url} alt=${this.title}>
        <p>${this.description}</p></div>`,
	);
};
// 'use strict';


// let keywords = [];

// $(document).ready(function() {
//     $.ajax('./../data/page-1.json')
//     .then(data => {
//         data.forEach((element,i) => {
//             let newBox =  new box(element);
//             newBox.render();
//             // keywords.push(element.keyword)

//         });
//     })
// })

// $.ajax('./../data/page-1.json')
//     .then(data => {
//         data.forEach((element,i) => {
//             let newBox =  new box(element);
//             newBox.render();
//             // keywords.push(element.keyword)

//         });
//     })


// function box(elem) {
//     this.image_url =elem.image_url;
//     this.title = elem.title,
//     this.description = elem.description,
//     this.keyword = elem.keyword,
//     this.horns = elem.horns
//     keywords.push(this.keyword)
// }

// box.prototype.render = function () {
//     $('.Item').append(
//         `<h2>${this.title}</h2>
//         <img src=${this.image_url} alt="">
//         <p>${this.description}</p>`
//     )
// };

// // $(document).ready(function() {
//     keywords.forEach(keyword => {
//         $('.selectt').append(`
//             <option value=${keyword}>${keyword}</option>`
//         );
//     })
// // })



// console.log(keywords);

// // for(let i=0; i<keywords.length;i++){
// //     console.log(keywords[i]);
// //     // console.log(i)
// // }



