package com.weatherapp.repository;

import com.weatherapp.model.FavoriteCity;
import com.weatherapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FavoriteCityRepository extends JpaRepository<FavoriteCity, Long> {
    List<FavoriteCity> findByUser(User user);
    Optional<FavoriteCity> findByCityNameAndUser(String cityName, User user);
    
    @Transactional
    void deleteByCityNameAndUser(String cityName, User user);
}
