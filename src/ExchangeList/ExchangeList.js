import React from 'react';

import '../Exchange.scss';

import NavigationDiv from "../Navigation/NavigationDiv";
import ShowUrl from "../Navigation/ShowUrl";

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
        <NavigationDiv className="logo" path={exchangePath} state={newState}>
          <img src={exchange.image} alt="logo" />
        </NavigationDiv>
        <div className="info">
          <NavigationDiv className="name" path={exchangePath} state={newState}>
              {exchange.name}
          </NavigationDiv>
          <NavigationDiv className="country" path={exchangePath} state={newState}>
            {exchange.country}
          </NavigationDiv>
          <NavigationDiv className="url" path={exchangePath} state={newState}>
            <ShowUrl url={exchange.url} />
          </NavigationDiv>
          <NavigationDiv className="trustRank" path={exchangePath} state={newState}>
            Trust Rank {exchange.trust_score_rank}
          </NavigationDiv>
        </div>
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
