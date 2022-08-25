import React from 'react';
import '../Exchange.scss';

import ExchangeDetailContext from "./ExchangeDetailContext";
import NavigationButton from "../Navigation/NavigationButton";
import ShowUrl from "../Navigation/ShowUrl";

import { loadDetail } from '../ExchangeLoader';

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
    this.loadExchange(this.props.exchangeId);
  }

  loadExchange(exchangeId) {
    loadDetail(exchangeId)
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
        <ShowUrl url={exchange[key]} description={serviceName} />
      </div>
    )
  }

  renderTwitter(exchange) {
    if (exchange.twitter_handle && exchange.twitter_handle.length > 0) {
      const url = `https://twitter.com/${exchange.twitter_handle}`;
      return (
        <div key={`twitter_${exchange.twitter_handle}`}>
          <ShowUrl url={url} description="Twitter" />
        </div>
      )
    } else {
      return ('')
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
      return <div className="message">Loading Exchange '{this.props.exchangeId}'...</div>;
    } else {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const yearsEstablished = (exchange.year_established !== null) ? currentYear - exchange.year_established : '';
      const yearEstablished = (exchange.year_established !== null) ? exchange.year_established : 'unspecified';

      // TODO: These will need labels
      return (
        <div className="exchange-details">
          <div className="header">
            <div className="title">Details for Exchange {exchange.name}</div>
          </div>
          <div className="controls">
            <NavigationButton className="backToMain"
              path="/"
              searchParams={{page: this.context.page}}
              state={{page: this.context.page}}
            >
              Back To Main
            </NavigationButton>
          </div>
          <div className="info">
            <div className="logo"><img src={exchange.image} alt="logo" /></div>
            <div>{exchange.name}</div>
            <div>{exchange.country}</div>
            <div className="url"><ShowUrl url={exchange.url} /></div>
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
ExchangeDetail.contextType = ExchangeDetailContext;

export default ExchangeDetail;
