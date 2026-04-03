package com.weatherapp.controller;

import com.weatherapp.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/weather/{city}")
    public ResponseEntity<?> getWeather(@PathVariable String city) {
        return ResponseEntity.ok(weatherService.getWeatherByCity(city));
    }

    @GetMapping("/forecast/{city}")
    public ResponseEntity<?> getForecast(@PathVariable String city) {
        return ResponseEntity.ok(weatherService.getForecastByCity(city));
    }
}
