import React, { useState, useEffect } from 'react';
import { IonLabel } from '@ionic/react';
import '../theme/cust.css';

const CountDown = () => {
    const [tick, setTick] = useState(120);
    const [presentTime, setPresentTime] = useState("");

    function convertToPresent(ticks:number) {
        let mins = Math.floor( ticks / 60 );
        let secs = ticks % 60;
        let secsOut:string = "";

        if(secs < 10) secsOut = "0"+secs.toString();
        else secsOut = secs.toString();

        setPresentTime(mins.toString()+":"+secsOut);

    }
    
    useEffect(() => {
        tick > 0 && setTimeout(() => setTick(tick - 1), 1000);
        convertToPresent(tick);
    }, [tick]);

    return(
    <IonLabel>Expires in {presentTime}</IonLabel>
    );
}

export default CountDown;