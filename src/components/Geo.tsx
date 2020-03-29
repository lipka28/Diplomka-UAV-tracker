import { Geolocation } from '@ionic-native/geolocation/ngx';

class Geo {
        private gps: Geolocation
    constructor() {
        this.gps = new Geolocation();
    }

    async getPosition(){
        return await this.gps.getCurrentPosition();
    }
}

export default new Geo()