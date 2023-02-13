function auth() {
    var sessId = getSessId();
    save("sess_id", sessId);
    echo(getItem("sess_id"));
    
    var foundedUser = findUserByPolis();
    save('person_id', foundedUser.Person_id);
    
    var userAttach = findUserAttach();
    save('person_attach', userAttach);
    save('lpu_id', userAttach.attach_data[0].Lpu_id);
    
    var moby = getMobyNameById();
    save("moby", moby);
    
    if (sessId && foundedUser && userAttach && moby) {
        $reactions.transition("/getDoctor");
    } else {
        transferToOperator("778");
    }
}