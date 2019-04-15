'use strict';

const Graph = require('node-dijkstra');

class CloudTravel {
    constructor() {
        this.route = new Graph();
    }

    calculateDist(lat1, lat2, long1, long2) {
        let radiusOfEarth = 4000;
        let radiusLat1 = Math.PI * lat1 / 180;
        let radiusLat2 = Math.PI * lat2 / 180;
        let diff = long1 - long2;
        let radiusDiff = Math.PI * diff / 180;

        let distance = Math.acos(Math.sin(radiusLat1) * Math.sin(radiusLat2) + Math.cos(radiusLat1) * Math.cos(radiusLat2) * Math.cos(radiusDiff));

        distance = distance * radiusOfEarth;

        return distance;
    }

    shortestTrip(latitude, longitude, canTravel, origin, destination) {
        if (origin === destination) {
            // console.log('0.00');
            return 0.00;
        }
        let graphNode = {};
        for (let i = 0; i < latitude.length; i++) {
            let canTravelArr = canTravel[i].split(' ').map(Number);
            let gNode = canTravelArr.reduce((node, port) => {
                let portdist = this.calculateDist(latitude[i], latitude[port], longitude[i], longitude[port]);
                node['' + port] = portdist;
                return node;
            }, {})
            graphNode[i] = gNode;
        }
        // console.log(JSON.stringify(graphNode));
        Object.keys(graphNode).forEach(element => {
            this.route.addNode('' + element, graphNode[element]);
        });

        let result = this.route.path('' + origin, '' + destination, { cost: true });
        // console.log(result);
        return result.cost ? result.cost : -1;
    }

    /*  latitude.forEach((item, index) => {
         console.log(this.calculateDist(latitude[index], latitude[index + 1], longitude[index], longitude[index + 1]));

     }); */

}
let cloud = new CloudTravel();
// console.log(cloud.shortestTrip([0, 0, 70], [90, 0, 45], ["2", "0 2", "0 1"], 0, 1));
console.log(cloud.shortestTrip([0, 0, 70], [90, 0, 45], ["2", "0 2", "0 1"], 0, 1))
console.log(cloud.shortestTrip([0, 0, 70], [90, 0, 45], ["1 2", "0 2", "0 1"], 0, 1))
console.log(cloud.shortestTrip([0, 30, 60], [25, -130, 78], ["1 2", "0 2", "0 1"], 0, 0))
console.log(cloud.shortestTrip([0, 20, 55], [-20, 85, 42], ["1", "0", "0"], 0, 2))