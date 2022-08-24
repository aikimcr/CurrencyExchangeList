import React from 'react';
import '../Exchange.scss';

import NavigationButton from "../Navigation/NavigationButton";

import load from '../ExchangeLoader';

class ExchangeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      exchange: {},
    }
  }

  componentDidMount() {
    this.loadExchange();
  }

  loadExchange(page) {
    load(`https://api.coingecko.com/api/v3/exchanges/${this.props.exchangeId}`)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            exchange: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  renderUrl(key, exchange) {
    let [serviceName, , otherIdx ] = key.split(/_/);
    serviceName = serviceName.replace(/^./, serviceName.charAt(0).toUpperCase());

    if (otherIdx) {
      serviceName = `${serviceName} ${otherIdx}`;
    }

    return (
      <div key={key}>
        <a href={exchange[key]} target="_blank">{serviceName}</a>
      </div>
    )
  }

  renderTwitter(exchange) {
    if (exchange.twitter_handle && exchange.twitter_handle.length > 0) {
      const url = `https://twitter.com/${exchange.twitter_handle}`;
      return (
        <div>
          <a href={url} target="_blank">Twitter</a>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  renderSocialMediaLinks(exchange) {
    const urlKeys = Object.keys(exchange).filter((key) => {
      return key !== 'url' && key.match(/url/) && exchange[key].length > 0;
    });

    return (
      <div className="social-media">
        {urlKeys.map((key) => this.renderUrl(key, exchange))}
        {this.renderTwitter(exchange)}
      </div>
    )
  }

  render() {
    const { error, isLoaded, exchange } = this.state;
    if (error) {
      return <div className="message">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="message">Loading...</div>;
    } else {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const yearsEstablished = (exchange.year_established !== null) ? currentYear - exchange.year_established : '';
      const yearEstablished = (exchange.year_established !== null) ? exchange.year_established : 'unspecified';

      // TODO: These will need labels
      return (
        <div className="exchange-details">
          <div className="controls">
            <NavigationButton className="backToMain" path="/" page={this.props.page}>
              Back To Main
            </NavigationButton>
          </div>
          <div className="info">
            <img src={exchange.image} />
            <div>{exchange.name}</div>
            <div>{exchange.country}</div>
            <div className="url"><a href={exchange.url} target="_blank">{exchange.url}</a></div>
            <div><span>Trust Rank</span> <span>{exchange.trust_score_rank}</span></div>
            <div>{`Established ${yearsEstablished} years (${yearEstablished})`}</div>
            <div className="description">{exchange.description}</div>
            <div className="socialMediaContainer">{this.renderSocialMediaLinks(exchange)}</div>
          </div>
        </div>
      )
    }
  }
}

export default ExchangeDetail;
