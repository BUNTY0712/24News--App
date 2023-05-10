import React, { Component, useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const updateNews = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fd66eb516c9848c19db5e2c8622cc7c4&page=1&pageSize=${props.pageSize}`;
		setLoading(true);
		let data = await fetch(url);
		let parsedData = await data.json();
		console.log('update', parsedData);
		setArticles(parsedData.articles);
		console.log('aticles', articles);
		setTotalResults(parsedData.totalResults);
		setLoading(false);
	};

	useEffect(() => {
		updateNews();
	}, []);
	const handlePrevClick = async () => {
		console.log('Previous');
		let url = `https://newsapi.org/v2/top-headlines?country=${
			props.country
		}&category=${props.category}&apiKey=fd66eb516c9848c19db5e2c8622cc7c4&page=${
			page - 1
		}&pageSize=${props.pageSize}`;
		setLoading(true);
		let data = await fetch(url);
		let parsedData = await data.json();
		setArticles(parsedData.articles);
		setPage(parsedData.page);
		setLoading(false);
		console.log(parsedData);
	};

	const handleNextClick = async () => {
		console.log('Next');
		if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
			let url = `https://newsapi.org/v2/top-headlines?country=${
				props.country
			}&category=${
				props.category
			}&apiKey=fd66eb516c9848c19db5e2c8622cc7c4&page=${page + 1}&pageSize=${
				props.pageSize
			}`;
			setLoading(true);
			let data = await fetch(url);
			let parsedData = await data.json();
			setArticles(parsedData.articles);
			setPage(parsedData.page);
			setLoading(false);
			console.log(parsedData);
		}
	};
	return (
		<div className='container my-3'>
			<h1 className='text-center' style={{ margin: '35px 0px' }}>
				24News - Top Headlines{' '}
			</h1>
			{loading && <Spinner />}
			<div className='row'>
				{!loading &&
					articles.map((element) => {
						return (
							<div className='col-md-3' key={element.url}>
								<NewsItem
									title={element.title ? element.title.slice(0, 45) : ''}
									description={
										element.description ? element.description.slice(0, 88) : ''
									}
									imageUrl={element.urlToImage}
									newsUrl={element.url}
									author={element.author}
									date={element.publishedAt}
									source={element.source.name}
								/>
							</div>
						);
					})}
			</div>
			<div className='container d-flex justify-content-between'>
				<button
					disabled={page <= 1}
					type='button'
					className='btn btn-dark'
					onClick={handlePrevClick}>
					{' '}
					&larr; Previous
				</button>
				<button
					disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
					type='button'
					className='btn btn-dark'
					onClick={handleNextClick}>
					Next &rarr;{' '}
				</button>
			</div>
		</div>
	);
};

News.defaultProps = {
	country: 'in',
	pageSize: 8,
	category: 'general',
};

News.propsTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string,
};

export default News;
