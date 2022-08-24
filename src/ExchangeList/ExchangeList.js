import React from 'react';

import '../Exchange.css';

import NavigationButton from "../Navigation/NavigationButton";
import NavigationDiv from "../Navigation/NavigationDiv";

// Show the actual list of exchanges.
class ExchangeList extends React.Component {
  renderExchange(exchange) {
    const exchangePath = `/exchange/${exchange.id}`;
    const newState = {
      page: this.props.page,
      exchangeId: exchange.id,
    }

    return (
      <li key={exchange.id} className="exchange">
        <NavigationDiv className="logo" path={exchangePath} page={this.props.page} state={newState}>
          <img src={exchange.image} />
        </NavigationDiv>
        <NavigationDiv className="info" path={exchangePath} page={this.props.page} state={newState}>
            {exchange.name}
        </NavigationDiv>
        <NavigationDiv className="country" path={exchangePath} page={this.props.page} state={newState}>
          {exchange.country}
        </NavigationDiv>
        <NavigationDiv className="url" path={exchangePath} page={this.props.page} state={newState}>
          <a href={exchange.url} target="_blank">{exchange.url}</a>
        </NavigationDiv>
        <NavigationDiv className="trustRank" path={exchangePath} page={this.props.page} state={newState}>
          Trust Rank {exchange.trust_score_rank}
        </NavigationDiv>
      </li>
    )
  }

  render() {
    return (
      <ul className="exchange-list">
        {this.props.exchanges.map(exchange => this.renderExchange(exchange))}
      </ul>
    )
  }
}

export default ExchangeList;
