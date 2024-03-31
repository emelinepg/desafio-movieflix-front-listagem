package com.devsuperior.movieflix.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieMaxDTO;
import com.devsuperior.movieflix.dto.MovieMinDTO;
import com.devsuperior.movieflix.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieResource {

	@Autowired
	private MovieService service;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieMaxDTO> findById(@PathVariable Long id) {
		MovieMaxDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<MovieMinDTO>> findByGenre(
			@RequestParam(value = "genreId", defaultValue = "0") Long genreId, 
			Pageable pageable) {
		Page<MovieMinDTO> page = service.findByGenre(genreId, pageable);
		return ResponseEntity.ok().body(page);
	}
}
