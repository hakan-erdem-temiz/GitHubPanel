import React, { Component } from "react";
import {
  getEvents,
  fetchEventsbyDate,
  fetchEventsbyNames
} from "../services/eventService";

class Home extends Component {
  state = {
    publicEvents: []
  };

  async populateEvents() {
    const { data: publicEvents } = await getEvents();
    console.log(publicEvents);

    this.setState({ publicEvents });
  }

  async componentDidMount() {
    await this.populateEvents();
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.state.publicEvents.map((e, i) => (
            <li key={i}>{JSON.stringify(e)} </li>
          ))}
        </div>
      </div>
    );
  }
}
export default Home;
