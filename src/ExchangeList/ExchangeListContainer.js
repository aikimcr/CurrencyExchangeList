import React from 'react';
import '../Exchange.css';

import ExchangeList from "./ExchangeList";

import { load } from '../ExchangeLoader';

class ExchangeListContainer extends React.Component {
  constructor(props) {
    super(props);

    let startingPage = this.props.page;

    this.state = {
      page: startingPage,
      isLoaded: false,
      error: null,
      exchanges: [],
    }
  }

  componentDidMount() {
    this.loadExchanges(this.state.page);
  }

  loadExchanges(page) {
    debugger;
    load('https://api.coingecko.com/api/v3/exchanges', {per_page: 10, page: page})
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            exchanges: result,
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

  pageForward() {
    const newPage = Number(this.state.page) + 1;
    this.setState({
      page: newPage,
      isLoaded: false,
      error: null,
      exchanges: [],
    });

    // const newUrl = new URL(location);
    // newUrl.searchParams.forEach((value, key, sp) => { sp.delete(key); });
    //
    // if (newPage && Number(newPage) !== 1) {
    //   newUrl.searchParams.set('page', newPage);
    // }
    //
    // location.href = newUrl.toString();
  }

  pageBack() {
    if (this.state.page > 1) {
      const newPage = Number(this.state.page) - 1;
      this.setState({
        page: newPage,
        isLoaded: false,
        error: null,
        exchanges: [],
      });

      // const newUrl = new URL(location);
      // newUrl.searchParams.forEach((value, key, sp) => { sp.delete(key); });
      //
      // if (newPage && Number(newPage) !== 1) {
      //   newUrl.searchParams.set('page', newPage);
      // }
      //
      // location.href = newUrl.toString();
    }
  }

  render() {
    const { error, isLoaded, exchanges } = this.state;
    if (error) {
      return <div className="message">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="message">Loading Page {this.state.page}...</div>;
    } else {
      // TODO: The prevButton really should be hidden on page 1
      const prevButtonClass = this.state.page === 1 ? 'hidden' : 'prevButton';
      const prevButtonToPage = this.state.page - 1;
      cosnt nextButtonToPage = this.state.page + 1;
      return (
        <div className="list-container">
          <div className="controls">
            <NavigationButton className={prevButtonClass} 

              Previous Page
            </button>
            <button className="nextButton"
              onClick={this.pageForward.bind(this)}>
              Next Page
            </button>
          </div>

          <div className="list">
            <ExchangeList exchanges={this.state.exchanges} page={this.state.page}></ExchangeList>
          </div>
        </div>
      )
    }
  }
}

export default ExchangeListContainer;
