/**
 * Created by cyber05 on 18/05/2015.
 */

<select name='<%= id %>' id='<%= id %>'><%_.forEach(films, function(film) { %><option value='<%= film.number %>'> <%= film.name %> </option><% }); %></select>