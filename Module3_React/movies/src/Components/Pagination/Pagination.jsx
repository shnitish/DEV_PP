import React, { Component } from "react";
import "./Pagination.css";
class Pagination extends Component {
	state = {};
	render() {
		let pages = this.props.pages;
		let currentPage = this.props.currentPage;
		let previousPage = this.props.previousPage;
		let setPage = this.props.setPage;
		let nextPage = this.props.nextPage;

		return (
			<nav>
				<ul className="pagination justify-content-center">
					{currentPage === 1 ? (
						<li className="page-item disabled">
							<a className="page-link">Previous</a>
						</li>
					) : (
						<li className="page-item" onClick={previousPage}>
							<a className="page-link">Previous</a>
						</li>
					)}
					{pages.map((pageCount) => {
						return pageCount === currentPage ? (
							<li className="page-item active">
								<a className="page-link">{pageCount}</a>
							</li>
						) : (
							<li
								className="page-item"
								onClick={() => {
									setPage(pageCount);
								}}
							>
								<a className="page-link">{pageCount}</a>
							</li>
						);
					})}
					{currentPage === pages.length ? (
						<li className="page-item disabled">
							<a className="page-link">Next</a>
						</li>
					) : (
						<li className="page-item" onClick={nextPage}>
							<a className="page-link">Next</a>
						</li>
					)}
				</ul>
			</nav>
		);
	}
}

export default Pagination;
