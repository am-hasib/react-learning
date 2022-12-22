import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import Pagination from "./common/pagination";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };
  handleDelete = (movie_id) => {
    const movies = this.state.movies;
    const updateMoviesList = movies.filter((movie) => movie._id !== movie_id);
    this.setState({ movies: updateMoviesList });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePage = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { movies: allMovies, currentPage, pageSize } = this.state;
    let count = this.state.movies.length;
    if (count === 0) return <p>There is no Movies in the database</p>;
    const movies = paginate(allMovies, pageSize, currentPage);
    console.log(movies);
    return (
      <div className="mt-3">
        {<p>There is {count} movies in the database</p>}
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Loved</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  {
                    <Like
                      liked={movie.liked}
                      onLike={() => this.handleLike(movie)}
                    />
                  }
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePage}
        />
      </div>
    );
  }
}
