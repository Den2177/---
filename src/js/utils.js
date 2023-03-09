function saveUserPolis() {
    var $parseTree = c().parseTree;
    var $session = c().session;
    $session.polis1 =  String($parseTree._Number);
    var numbers = _.pluck($parseTree.Number1, "value");
    numbers = String(numbers).replace(/,/g, '');
    $session.polis = numbers;
    
    echo($session.polis);
}

function formattedPolis(polis) {
    return polis.split("").join(" ");
}

function formatTel(phone) {
    return phone[0] + ' ' + phone[1] + phone[2] + phone[3] + ' ' + phone[4] + phone[5] + phone[6] + ' ' + phone[7] + phone[8] + ' ' + phone[9] + phone[10];
}


function listenInterrupting() {
    $dialer.bargeInResponse({
        bargeInTrigger: "final",
    });
}


function sendResponse(text) {
    var response = c().response;
    
    response.replies = response.replies || [];
    
    response.replies.push({
        type: 'text',
        text: text,
    });
}

function transferToOperator(phoneNumber) {
    var response = c().response;
    
    response.replies = response.replies || [];
    
    response.replies.push({
        type: "switch",
        phoneNumber: phoneNumber, 
        continueCall: false,
        continueRecording: true,
    });
}

function c() {
    return $jsapi.context();
}

function echo(data) {
    log(toPrettyString(data));
}

function sendAudio(aurl, name) {
    var response = c().response;
    
    response.replies = response.replies || [];
    
    response.replies.push({
        type: 'audio',
        audioUrl: url,
        audioName: name,
    });
}

function save(key, value) {
    var $session = c().session;
    $session[key] = value;
}

function getItem(key) {
    var $session = c().session;
    
    return $session[key];
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
        counter++;
    }
    
    echo(url);
    
    return url;
}