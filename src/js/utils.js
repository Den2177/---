function saveUserPolis() {
    var $parseTree = c().parseTree;
    var $session = c().session;
    $session.polis1 =  String($parseTree._Number);
    var numbers = _.pluck($parseTree.Number1, "value");
    numbers = String(numbers).replace(/,/g, '');
    $session.polis = numbers;
    
    echo($session.polis);
}