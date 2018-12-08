import React, { Component } from 'react';
import Plot from 'react-plotly.js';
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

export default class ChartVisual extends Component {
    render() {
        const {
            classes,
            allTemperatures,
            allTimestamps
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader title="Graph Visualization"/>
                <CardContent>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Plot
                            data={[
                                {
                                    x: allTimestamps,
                                    y: allTemperatures,
                                    type: 'scatter',
                                    mode: 'lines',
                                    marker: {color: 'blue'},
                                }
                            ]}
                            layout={{title: 'Drone Temperature'}}
                        />
                    </div>
                </CardContent>
            </Card>
        )
    }
}