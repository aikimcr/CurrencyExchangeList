import React from 'react';

import '../Exchange.css';

import NavigationButton from "../Navigation/NavigationButton";

import ExchangeListContext from "./ExchangeListContext";
import ExchangeList from "./ExchangeList";

import { loadList } from '../ExchangeLoader';

class ExchangeListContainer extends React.Component {
  constructor(props) {
    super(props);

    let startingPage = this.props.page || 1;

    this.state = {
      page: Number(startingPage),
      isLoaded: false,
      error: null,
      exchanges: [],
    }
  }

  componentDidMount() {
    this.loadExchanges(this.state.page);
  }

  componentDidUpdate() {
    if (Number(this.state.page) !== Number(this.context.page)) {
      this.setState({
        isLoaded: false,
        page: Number(this.context.page),
      });

      this.loadExchanges(Number(this.context.page));
    }

    if (!this.state.isLoaded) {
      this.loadExchanges(Number(this.state.page));
    }
  }

  loadExchanges(page) {
    loadList(page)
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

  pageForward(url, newState) {
    this.context.page = Number(newState.page);
    this.setState({
      page: Number(newState.page),
      isLoaded: false,
      error: null,
      exchanges: [],
    });
  }

  pageBack(url, newState) {
    this.context.page = Number(newState.page)
    this.setState({
      page: Number(newState.page),
      isLoaded: false,
      error: null,
      exchanges: [],
    });
  }

  render() {
    const { error, isLoaded, exchanges } = this.state;
    if (error) {
      return <div className="message">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="message">Loading Page {this.state.page}...</div>;
    } else {
      // TODO: The prevButton really should be hidden on page 1
      const prevButtonClass = Number(this.state.page) === 1 ? 'hidden' : 'prevButton';
      const prevButtonToPage = Math.max(0, Number(this.state.page) - 1);
      const nextButtonToPage = Number(this.state.page) + 1;

      return (
        <div className="list-container">
          <div className="header">
            <div className="title">Currency Exchange List</div>
            <div className="pageNumber">Page {this.state.page}</div>
          </div>
          <div className="controls">
            <NavigationButton className={prevButtonClass}
              searchParams={{page: prevButtonToPage}}
              navigationHandler={this.pageBack.bind(this)}
            >
              Previous Page
            </NavigationButton>
            <NavigationButton className="nextButton"
              searchParams={{page: nextButtonToPage}}
              navigationHandler={this.pageForward.bind(this)}
            >
              Next Page
            </NavigationButton>
          </div>

          <div className="list">
            <ExchangeList exchanges={exchanges} page={this.state.page}></ExchangeList>
          </div>
        </div>
      )
    }
  }
}
ExchangeListContainer.contextType = ExchangeListContext;

export default ExchangeListContainer;
