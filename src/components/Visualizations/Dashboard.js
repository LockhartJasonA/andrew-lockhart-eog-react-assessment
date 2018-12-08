import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
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

export default class DashboardVisual extends Component {

    state = {
        currentTime: new Date().getTime()
    };

    componentWillMount() {
        this.currentTimeTimer = setInterval(() => {
            this.setState({currentTime: new Date().getTime()})
        }, 500)
    }

    componentWillUnmount() {
        clearTimeout(this.currentTimeTimer)
    }

    render() {
        const {
            classes,
            longitude,
            latitude,
            temperature,
            last_received
        } = this.props;

        let prettySeconds = Math.round((this.state.currentTime - last_received) / 1000)
        let timeText = (prettySeconds === 1) ? 'second ago' : 'seconds ago';

        return (
            <Card className={classes.card}>
                <CardHeader title="Dashboard Visualization"/>
                <CardContent>
                    <div>
                        Temperature: {temperature}
                    </div>
                    <div>
                        Latitude: {longitude}
                    </div>
                    <div>
                        Longitude: {latitude}
                    </div>
                    <div>
                        Last Received: {prettySeconds} {timeText}
                    </div>
                </CardContent>
            </Card>
        )
    }
}