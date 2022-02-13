var source = $('#profile-template').html();
var template = Handlebars.compile(source);
var searchButton = $('#search-button');
var profiles = [];

searchButton.on('click', function() {
    var search = $('#search').val();
    fetch(search);
});

var addProfiles = function(data) {
    profiles.splice(0);
    profiles.push({
        login: data.author.login || null,
        imgURL: data.author.avatar_url ||null
    });
}

var fetch = function(query) {
    console.log('made it into fetch');
    $.ajax({
        method: "GET",
        url: "https://api.github.com/repos/facebook/react/commits/" + query,
        dataType: "json",
        success: function(data) {
            console.dir(data);
            console.log(data);
            addProfiles(data);
            renderProfiles();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

var renderProfiles = function() {
    for(let k = 0; k < profiles.length; k++) {
        let newProfile = template(profiles[k]);
        $('.results').append(newProfile);
    }
}