import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import MapIcon from "@material-ui/icons/Place"
import { withStyles } from "@material-ui/core/styles";

const cardStyles = theme => ({
    root: {
        background: theme.palette.primary.main
    },
    title: {
        color: "white"
    }
});

const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

class MapPin extends Component{
    render() {
        return(
            <div>
                <MapIcon/>
            </div>
        )
    }
}

export default class MapVisual extends Component {
    state = {
        center: {
            lat: 30.08,
            lng: -95.56
        },
        zoom: 14
    };

    render() {
        const {
            classes,
            longitude,
            latitude,
        } = this.props;

        let starterCoords = {
            center: {
                lat: latitude,
                lng: longitude
            },
            zoom: 11
        };

        return (
            <Card className={classes.card}>
                <CardHeader title="Map Visualization"/>
                <CardContent style={{ width: '900px', height: '500px' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: '' }}
                        defaultCenter={starterCoords.center}
                        defaultZoom={starterCoords.zoom}
                    >
                        <MapPin
                            lat={latitude}
                            lng={longitude}
                            text={'Drone'}
                        />
                    </GoogleMapReact>
                </CardContent>
            </Card>
        )
    }
}