function auth() {
    var sessId = getSessId();
    save("sess_id", sessId);
    
    var foundedUser = findUserByPolis();
    save('person_id', foundedUser.Person_id);
    
    var userAttach = findUserAttach();
    save('person_attach', userAttach);
    save('lpu_id', userAttach.attach_data.Lpu_id);
    
    var moby = getMobyNameById();
    echo(moby);
}