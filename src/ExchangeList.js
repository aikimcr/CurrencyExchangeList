import React from "react";

// Show the actual list of exchanges.
class ExchangeList extends React.Component {
  showDetails(exchangeId) {
    const url = new URL(location);
    url.pathname = '/exchange.html';
    url.searchParams.forEach((value, key, sp) => { sp.delete(key); });
    url.searchParams.set('id', exchangeId);

    if (Number(this.props.page) !== 1) {
      url.searchParams.set('page', this.props.page);
    }

    location.href = url.toString();
  }

  renderExchange(exchange) {
    return (
      <li key={exchange.id} className="exchange">
        <div className="logo"
          onClick={this.showDetails.bind(this, exchange.id)}
        >
          <img src={exchange.image} />
        </div>
        <div className="info">
          <div
            onClick={this.showDetails.bind(this, exchange.id)}
          >
            {exchange.name}
          </div>
          <div
            onClick={this.showDetails.bind(this, exchange.id)}
          >
            {exchange.country}
          </div>
          <div className="url"><a href={exchange.url} target="_blank">{exchange.url}</a></div>
          <div
            onClick={this.showDetails.bind(this, exchange.id)}
          >
            Trust Rank {exchange.trust_score_rank}
          </div>
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

// A container for the list(s) including controls to page forward and backward.
class ExchangeListContainer extends React.Component {
  constructor(props) {
    super(props);

    let startingPage = 1;
    const search = new URLSearchParams(location.search);

    if (search.has('page') && search.get('page') && !isNaN(search.get('page'))) {
      startingPage = search.get('page');
    }

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
    fetch('https://api.coingecko.com/api/v3/exchanges', {per_page: 10, page: page})
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

    const newUrl = new URL(location);
    newUrl.searchParams.forEach((value, key, sp) => { sp.delete(key); });

    if (newPage && Number(newPage) !== 1) {
      newUrl.searchParams.set('page', newPage);
    }

    location.href = newUrl.toString();
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

      const newUrl = new URL(location);
      newUrl.searchParams.forEach((value, key, sp) => { sp.delete(key); });

      if (newPage && Number(newPage) !== 1) {
        newUrl.searchParams.set('page', newPage);
      }

      location.href = newUrl.toString();
    }
  }

  render() {
    const { error, isLoaded, exchanges } = this.state;
    if (error) {
      return <div className="message">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="message">Loading...</div>;
    } else {
      // TODO: The prevButton really should be hidden on page 1
      const prevButtonClass = this.state.page === 1 ? 'hidden' : 'prevButton';
      return (
        <div className="list-container">
          <div className="controls">
            <button className={prevButtonClass}
              onClick={this.pageBack.bind(this)}>
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

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<ExchangeListContainer />);
