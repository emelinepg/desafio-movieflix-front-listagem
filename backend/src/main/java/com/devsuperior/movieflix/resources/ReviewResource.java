package com.devsuperior.movieflix.resources;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.dto.ReviewInsertDTO;
import com.devsuperior.movieflix.services.ReviewService;

@RestController
@RequestMapping
public class ReviewResource {

	@Autowired
	private ReviewService service;

	@GetMapping(value = "/movies/{id}/reviews")
	public ResponseEntity<List<ReviewDTO>> findByMovieId(@PathVariable Long id) {
		List<ReviewDTO> reviews = service.findByMovieId(id);
		return ResponseEntity.ok().body(reviews);
	}
	
	@PostMapping(value = "/reviews")
	public ResponseEntity<ReviewDTO> insert(@Valid @RequestBody ReviewInsertDTO dto) {
		ReviewDTO reviewDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(reviewDto.getId()).toUri();
		return ResponseEntity.created(uri).body(reviewDto);
	}
}
