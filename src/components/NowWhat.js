import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import AvatarRaw from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';

import * as actions from "../store/actions";

import DashboardVisual from './Visualizations/Dashboard'
import ChartVisual from './Visualizations/Chart'
import MapVisual from './Visualizations/Map'
import DefaultSelection from './DefaultSelection'

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const Avatar = withStyles(avatarStyles)(AvatarRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

class NowWhat extends Component {

  state = {
    componentInView: "",
  };

  componentDidMount() {
      this.props.fetchDrone();

      this.fetchDroneTimer = setInterval(() => {
          this.props.fetchDrone();
      }, 4000)
  }

  componentWillUnmount() {
      clearTimeout(this.fetchDroneTimer)
  }

  handleClickDashboard = () => this.setState({componentInView: 'dashboard'});
  handleClickMap = () => this.setState({componentInView: 'map'});
  handleClickChart = () => this.setState({componentInView: 'chart'});

  renderComponentInView() {
    switch(this.state.componentInView) {
        case 'dashboard':
            return <DashboardVisual {...this.props} />;
        case 'map':
            return <MapVisual {...this.props} />;
        case 'chart':
            return <ChartVisual {...this.props} />;
        default:
            return <DefaultSelection/>;
    }
  }

  render() {
    const { classes } = this.props;
      return (
          <div>
            <Card className={classes.card}>
              <CardHeader title="Data Visual Stuffs"/>
              <CardContent>
                <List>
                  <ListItem>
                    <Avatar>1</Avatar>
                    <ListItemText primary="Dashboard"/>
                      <Button variant="contained" color="primary" onClick={this.handleClickDashboard}>
                        View Dashboard
                      </Button>
                  </ListItem>
                  <ListItem>
                    <Avatar>2</Avatar>
                    <ListItemText primary="Map"/>
                      <Button variant="contained" color="primary" onClick={this.handleClickMap}>
                        View Map
                      </Button>
                  </ListItem>
                  <ListItem>
                    <Avatar>3</Avatar>
                    <ListItemText primary="Chart"/>
                      <Button variant="contained" color="primary" onClick={this.handleClickChart}>
                        View Chart
                      </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            <div>
              {this.renderComponentInView()}
            </div>
          </div>
      );
  }
};

const mapState = (state, ownProps) => {
    const {
        loading,
        latitude,
        longitude,
        temperature,
        last_received,
        allTemperatures,
        allTimestamps
    } = state.drone;
    return {
        loading,
        latitude,
        longitude,
        temperature,
        last_received,
        allTemperatures,
        allTimestamps
    };
};

const mapDispatch = dispatch => ({
    fetchDrone: () =>
        dispatch({
            type: actions.FETCH_DRONE,
        })
});
export default connect(mapState, mapDispatch)(withStyles(styles)(NowWhat));
