package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.dto.ReviewInsertDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class ReviewService {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private ReviewRepository repository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Transactional(readOnly = true) 
	public List<ReviewDTO> findByMovieId(Long movieId) {
		Optional<Movie> opt = movieRepository.findById(movieId);
		Movie movie = opt.orElseThrow(() -> new ResourceNotFoundException("Entity not found")); 
		List<Review> reviews = repository.findByMovie(movie);
		return reviews.stream().map(x -> new ReviewDTO(x, new UserDTO(x.getUser()))).collect(Collectors.toList());
	}
	
	@Transactional
	public ReviewDTO insert(ReviewInsertDTO dto) {
		Review review = new Review();
		review.setText(dto.getText());
		Movie movie = movieRepository.getOne(dto.getMovieId());
		review.setMovie(movie);
		User user = authService.authenticated();
		review.setUser(user);
		review = repository.save(review);
		return new ReviewDTO(review, new UserDTO(user));
	}
}
