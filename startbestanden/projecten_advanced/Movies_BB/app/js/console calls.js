
jQuery.post('api/films',{
    'filmId': 99,
    'titel':'Once upon a time in the West',
    'beschrijving': 'Supercoole western',
    'regisseur': 'Sergio Leone',
    'duur': '3u',
    'foto': 'onceuponatimeinthewest.jpg',
    'genre': 'western'
})


jQuery.ajax({
    url:    '/api/films/52b2f2d04fea40981f000001',
    type:   'PUT',
    data:   {
        'filmId': 88,
        'titel': 'Once upon a time in the West',
        'beschrijving': 'Supercoole western',
        'duur': '5u',
        'foto': 'onceuponatimeinthewest.jpg',
        'release': new Date("1968-12-21T01:00+01:00"),
        'genre': 'western',
        'regisseur': 'Sergio Leone'
    },
    success: function(data, textStatus, jsXHR) {
        console.log('POST Response:')
        console.dir(data)
        console.log(textStatus)
    }
})


jQuery.ajax({
    url:    '/api/films/555b3716a2a79d46dfc8e4f8',
    type: 'DELETE',
    success:    function(data, textStatus, jsXHR) {
        console.log('POST Response:')
        console.dir(data)
        console.log(textStatus)
    }
})

jQuery.post('/api/films', {
    'filmId':   8,
    'titel':    'Zero Dark Thirty',
    'beschrijving': 'The hunt for Bin Laden',
    'genre': 'Thriller',
    'duurtijd': '2u37min',
    'release': new Date("2013-01-30T01:00+01:00"),
    'foto': 'Zero_dark_thirty.jpg',
    'cast': [{'acteur': 'Jessica Chastain'}, {'acteur': 'Jason Clarke'}]
})