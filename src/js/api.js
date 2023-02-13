function url() {
    return 'https://doctor-appointment.dev.doctis.app';
}
function mountQueryString(url, data) {
    var counter = 0;
    
    for (var field in data) {
        if (!counter) {
            url += '?' 
        } else {
            url += '&';
        }
        url += field + '=' + data[field];
    }
    
    return url;
}

function request(route, data, method) {
    if (!method) {
        method = 'get';
    }
    
    if (!data) {
        data = {};
    }
    
    switch(method) {
        case 'get':
            var url = mountQueryString(url() + route, data);
            var response =$http.get(url);
            
            return response.data;
        case 'post':
            var response = $http.post(url() + route, {
                body: data,
            });
            
            return response.data;
        default:
            throw new Error("Неизвестный тип запроса");
    }
}

function setSessId() {
    var body = {
        token: 'sPAkjwn{dk4&f;Vwv-?m'
    };
    
    var response = request("/authorizationT/", body, 'post');
    echo(response);
}