import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Select from "react-select";
import "./Books.css";

const styles = {
  control: base => ({
    ...base,
    maxWidth: 600
  })
};

const booksQuery = gql`
  query book($limit: Int!, $offset: Int!) {
    book(order_by: { title: asc }, limit: $limit, offset: $offset) {
      title
      id
    }
  }
`;

export default class Books extends Component {
  state = {
    offset: 0,
    limit: 10
  };
  updateNext = () => {
    this.state.offset < 90
      ? this.setState({ offset: this.state.offset + 10 })
      : this.setState({ offset: 0 });
  };
  updatePrev = () => {
    this.state.offset >= 10
      ? this.setState({ offset: this.state.offset - 10 })
      : this.setState({ offset: 90 });
  };

  render() {
    return (
      <Fragment>
        <Query
          query={booksQuery}
          variables={{ offset: this.state.offset, limit: this.state.limit }}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Error</p>;

            return (
              <div class="container">
                {data.book.map(({ id, title }) => (
                  <div class="grid-item" key={id}>
                    {title}
                  </div>
                ))}
              </div>
            );
          }}
        </Query>

        <button class="button" onClick={this.updateNext}>
          Next{" "}
        </button>
        <button class="button" onClick={this.updatePrev}>
          Prev{" "}
        </button>

        <Query query={booksQuery} variables={{ offset: 0, limit: 100 }}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Error</p>;

            let books = data.book.map(opt => ({
              label: opt.title,
              value: opt.id
            }));

            console.log("Books= ", books);

            return (
              <div className="app">
                <div className="container">
                  <Select
                    menuPortalTarget={document.querySelector(".search")}
                    styles={styles}
                    options={books}
                  />
                </div>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
