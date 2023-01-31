theme: /

    state: Start
        q!: $regex</start>
        a: Здравствуйте! Меня зовут Светлана. Я помогу вам записаться на прием к врачу.
        a: Скажите, пожалуйста, визит к доктору нужен для ребенка или взрослого пациента?
        go!: /choiceAgeType
        
    state: choiceAgeType
        state: 1
            q: * Взрослый *
            q: * взросл* *
            q: * зрелый * 
            q: * зрел* *
            q: * взрослого *
            script: 
                $session.ageType = "Взрослый";
            go!: /getPolis    
        state: 2
            q: * ребенок *
            q: * маленьк* *
            q: * ребенка *
            q: * ребенк* *
            script:
                $session.ageType = "Ребенок";
            go!: /getPolis
            
    state: getPolis 
        a: Хорошо. Назовите пожалуйста номер пациента, которому оформляем запись на прием.
        a: Номер полиса единого образца состоит из шестнадцати цифр
        
        state: action
            q: $repeat<$Number1>
            script:
                saveUserPolis();
            go!: /getPolis/checkPolis
            
        state: checkPolis
            if: $session.polis.length == 16
                go!: /getPolis/correctPolis
            else:
                go!: /getPolis/polisError 
                
        state: polisError
            a: Вы назвали номер полиса некорректного формата. Номер полиса должен состоять шестнадцати цифр
            a: Пожалуйста, для оформления вызова назовите номер полиса пациента еще раз, четко по одной цифре.
            go!: /getPolis
            
        state: correctPolis
            script:
                sendResponse("Номер полиса пациента: " + formattedPolis($session.polis) + " .все вено?");
            state: yes
                q: $AGREEMENT
                q: $yes
                q: да*
                q: *да*
                q: * ага *
                q: * да *
                script:
                    sendPolisToServer($session.polis);
                    // если пациент не определен (запрос с ошибкой) перенаправить на оператора
            state: no
                q: $NEGATION
                q: $no
                q: нет*
                q: * не* *
                go!: /getPolis
        state: repeat 
            q: * Повторите * 
            q: * что вы сказали? *
            q: * Что простите? *
            q: * не понял *
            q: * не понял что вы сказали *   
            q: * че? *   
            q: * че вы сказали? * 
            q: * я не понял *   
            q: * я не поняла *   
            go!: /state1
            
    state: getDoctor
        a: Хорошо! Скажите, к какому врачу вам нужно записаться на прием.
        go!: 
            
    state: connectWithOperator
        a: Соединяю вас с оператором, оставайтесь на линии.
        script:
            transferToOperator();        
            
    state: NoMatch
        event!: noMatch
        a: Я не понял. Вы сказали: {{$request.query}}