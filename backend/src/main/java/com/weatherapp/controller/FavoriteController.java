package com.weatherapp.controller;

import com.weatherapp.model.FavoriteCity;
import com.weatherapp.model.User;
import com.weatherapp.repository.FavoriteCityRepository;
import com.weatherapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteCityRepository favoriteCityRepository;
    private final UserRepository userRepository;

    public FavoriteController(FavoriteCityRepository favoriteCityRepository, UserRepository userRepository) {
        this.favoriteCityRepository = favoriteCityRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(auth.getName()).orElseThrow();
    }

    @GetMapping
    public ResponseEntity<List<FavoriteCity>> getFavorites() {
        return ResponseEntity.ok(favoriteCityRepository.findByUser(getCurrentUser()));
    }

    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestBody Map<String, String> request) {
        User user = getCurrentUser();
        String cityName = request.get("cityName");
        
        if (favoriteCityRepository.findByCityNameAndUser(cityName, user).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "City already in favorites"));
        }
        
        FavoriteCity favorite = new FavoriteCity(cityName, user);
        favoriteCityRepository.save(favorite);
        return ResponseEntity.ok(favorite);
    }
    
    @DeleteMapping("/{cityName}")
    public ResponseEntity<?> removeFavorite(@PathVariable String cityName) {
        favoriteCityRepository.deleteByCityNameAndUser(cityName, getCurrentUser());
        return ResponseEntity.ok(Map.of("message", "City removed from favorites"));
    }
}
