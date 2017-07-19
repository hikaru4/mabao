var hackerList,
    options = {
        valueNames: [
            'classname',
            'district',
            'weekday',
            'time',
            'age',
            'description',
            'id',
        ],
        item: 
            '<li class="item list-item">' +
              '<div class="classname"></div>' +
              '<div class="container">' +
                '<div class="location">' +
                  '<div class="city">台南市</div>' +
                  '<div class="district"></div>' +
                '</div>' +
                '<div class="datetime">' +
                  '<div class="weekday"></div>' +
                  '<div class="time"></div>' +
                '</div>' +
                '<div class="age"></div>' +
              '</div>' +
              '<div class="description"></div>' +
              '<div class="id"></div>' +
            '</li>'
    };

let url = '/mabao_list.json';

fetch(url)
    .then(res => res.json())
    .then((out) => {
        // 濾掉空的課程
        values = out.filter(function(item){
            return item.classname !== '';
        })
        hackerList = new List('hacker-list', options, values);
    })
    .catch(err => console.error(err));

$(document).on('click', '.list-item', function(e) {
    var id = e.currentTarget.lastElementChild.textContent,
        item = hackerList.get("id", id)[0]._values;

    for (var k in item){
        if (item.hasOwnProperty(k)) {
            elem = document.getElementById('info-' + k)
            if (elem){
                elem.innerHTML = item[k];
            }
        }
    }
    document.getElementById('mask').style.display = 'block';
    document.getElementById('item-info').style.display = 'block';
});


$(document).on('click', '#mask', function(e) {
    document.getElementById('mask').style.display = 'none';
    document.getElementById('item-info').style.display = 'none';
});
