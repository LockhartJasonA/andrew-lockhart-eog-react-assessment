import React from 'react';
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

const DefaultSelection = props => {

    return (
        <Card style={{  margin: "5% 25%" }}>
            <CardHeader title="Welcome!"/>
            <CardContent>
                Click 1 of the buttons above to get started
            </CardContent>
        </Card>
    );
};

export default DefaultSelection;
