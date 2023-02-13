function baseUrl() {
    return 'https://doctor-appointment.dev.doctis.app';
}

function token() {
    return 'sPAkjwn%7Bdk4%26f%3BVwv-%3Fm';
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
            var url = mountQueryString(baseUrl() + route, data);
            var response =$http.get(url);
            
            return response.data;
        case 'post':
            var response = $http.post(baseUrl() + route, {
                body: data,
            });
            
            return response.data;
        default:
            throw new Error("Неизвестный тип запроса");
    }
}

function getSessId() {
    var body = {
        token: 'sPAkjwn{dk4&f;Vwv-?m'
    };
    
    var response = request("/authorizationT/", body, 'post');
    
    return response.sess_id;
}

function findUserByPolis() {
    var body = {
        token: token(),
        polis_id: getItem("polis"),
        sess_id: getItem('sess_id'),
    }
    
    var response = request("/mget_person_search/", body, 'get');
    
    return response.data[0];
}

function findUserAttach() {
    var body = {
        token: token(),
        sess_id: getItem("sess_id"),
        person_id: getItem("person_id")
    };
    
    var response = request("/person_attach/", body, 'get');
    
    return response.data[0];
}

function getMobyNameById() {
    var body = {
        token: token(),
        sess_id: getItem("sess_id"),
        lpu_id: getItem("lpu_id"),
    };
    
    var response = request("/moby_id/", body, 'get');
    
    return response.data[0];
}