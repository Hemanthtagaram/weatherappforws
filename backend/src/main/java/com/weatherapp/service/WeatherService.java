package com.weatherapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    @Value("${openweathermap.api.url}")
    private String apiUrl;

    @Value("${openweathermap.api.key}")
    private String apiKey;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object getWeatherByCity(String city) {
        if ("YOUR_API_KEY".equals(apiKey)) {
            return getMockWeather(city);
        }
        try {
            String url = apiUrl + "/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
            ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Weather API Error: " + e.getMessage());
            return getMockWeather(city); // Fallback to mock on error
        }
    }

    public Object getForecastByCity(String city) {
        if ("YOUR_API_KEY".equals(apiKey)) {
            return getMockForecast(city);
        }
        try {
            String url = apiUrl + "/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";
            ResponseEntity<Object> response = restTemplate.getForEntity(url, Object.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Forecast API Error: " + e.getMessage());
            return getMockForecast(city); // Fallback to mock on error
        }
    }

    private Object getMockWeather(String city) {
        try {
            java.util.Map wttr = restTemplate.getForObject("https://wttr.in/" + city + "?format=j1", java.util.Map.class);
            java.util.List currentCondList = (java.util.List) wttr.get("current_condition");
            java.util.Map cond = (java.util.Map) currentCondList.get(0);
            
            java.util.List nearestList = (java.util.List) wttr.get("nearest_area");
            java.util.Map nearest = (java.util.Map) nearestList.get(0);
            
            String country = (String) ((java.util.Map)((java.util.List)nearest.get("country")).get(0)).get("value");
            String area = (String) ((java.util.Map)((java.util.List)nearest.get("areaName")).get(0)).get("value");
            String desc = (String) ((java.util.Map)((java.util.List)cond.get("weatherDesc")).get(0)).get("value");
            
            double lat = Double.parseDouble(((java.util.Map)((java.util.List)nearest.get("latitude")).get(0)).get("value").toString());
            double lon = Double.parseDouble(((java.util.Map)((java.util.List)nearest.get("longitude")).get(0)).get("value").toString());

            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("name", area != null ? area : city);
            response.put("visibility", Double.parseDouble(cond.get("visibility").toString()) * 1000);
            
            java.util.Map<String, Object> coord = new java.util.HashMap<>();
            coord.put("lat", lat);
            coord.put("lon", lon);
            response.put("coord", coord);

            java.util.Map<String, Object> sys = new java.util.HashMap<>();
            sys.put("country", country);
            response.put("sys", sys);
            
            java.util.Map<String, Object> main = new java.util.HashMap<>();
            main.put("temp", Double.parseDouble(cond.get("temp_C").toString()));
            main.put("feels_like", Double.parseDouble(cond.get("FeelsLikeC").toString()));
            main.put("humidity", Integer.parseInt(cond.get("humidity").toString()));
            main.put("pressure", Integer.parseInt(cond.get("pressure").toString()));
            main.put("temp_min", Double.parseDouble(cond.get("temp_C").toString()) - 2);
            main.put("temp_max", Double.parseDouble(cond.get("temp_C").toString()) + 2);
            response.put("main", main);

            java.util.List<java.util.Map<String, Object>> weather = new java.util.ArrayList<>();
            java.util.Map<String, Object> w = new java.util.HashMap<>();
            w.put("main", desc.toLowerCase().contains("cloud") ? "Clouds" : (desc.toLowerCase().contains("rain") ? "Rain" : (desc.toLowerCase().contains("snow") ? "Snow" : "Clear")));
            w.put("description", desc);
            w.put("icon", "01d");
            weather.add(w);
            response.put("weather", weather);

            java.util.Map<String, Object> wind = new java.util.HashMap<>();
            wind.put("speed", Double.parseDouble(cond.get("windspeedKmph").toString()) * 1000 / 3600);
            response.put("wind", wind);

            return response;
        } catch (Exception ex) {
            System.err.println("Error fetching from wttr.in: " + ex.getMessage());
            java.util.Map<String, Object> fallback = new java.util.HashMap<>();
            fallback.put("name", "Unknown (" + city + ")");
            java.util.Map<String, Object> coord = new java.util.HashMap<>();
            coord.put("lat", 0.0);
            coord.put("lon", 0.0);
            fallback.put("coord", coord);
            java.util.Map<String, Object> sys = new java.util.HashMap<>();
            sys.put("country", "XX");
            fallback.put("sys", sys);
            java.util.Map<String, Object> main = new java.util.HashMap<>();
            main.put("temp", 0.0);
            main.put("feels_like", 0.0);
            main.put("humidity", 0);
            main.put("pressure", 0);
            fallback.put("main", main);
            java.util.Map<String, Object> wind = new java.util.HashMap<>();
            wind.put("speed", 0.0);
            fallback.put("wind", wind);
            return fallback;
        }
    }

    private Object getMockForecast(String city) {
        try {
            java.util.Map wttr = restTemplate.getForObject("https://wttr.in/" + city + "?format=j1", java.util.Map.class);
            java.util.List weatherList = (java.util.List) wttr.get("weather");
            
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            java.util.List<java.util.Map<String, Object>> list = new java.util.ArrayList<>();
            
            long now = System.currentTimeMillis() / 1000;
            for (int i=0; i<weatherList.size(); i++) {
                java.util.Map day = (java.util.Map) weatherList.get(i);
                java.util.List hourlyList = (java.util.List) day.get("hourly");
                if (hourlyList != null && !hourlyList.isEmpty()) {
                    java.util.Map hour = (java.util.Map) hourlyList.get(hourlyList.size() / 2);
                    java.util.Map<String, Object> item = new java.util.HashMap<>();
                    item.put("dt", now + (i * 86400));
                    
                    java.util.Map<String, Object> main = new java.util.HashMap<>();
                    main.put("temp", Double.parseDouble(hour.get("tempC").toString()));
                    item.put("main", main);
                    
                    String desc = (String) ((java.util.Map)((java.util.List)hour.get("weatherDesc")).get(0)).get("value");
                    
                    java.util.List<java.util.Map<String, Object>> wlist = new java.util.ArrayList<>();
                    java.util.Map<String, Object> w = new java.util.HashMap<>();
                    w.put("main", desc.toLowerCase().contains("cloud") ? "Clouds" : (desc.toLowerCase().contains("rain") ? "Rain" : (desc.toLowerCase().contains("snow") ? "Snow" : "Clear")));
                    w.put("description", desc);
                    w.put("icon", "01d");
                    wlist.add(w);
                    item.put("weather", wlist);
                    
                    item.put("dt_txt", day.get("date") + " 12:00:00");
                    list.add(item);
                }
            }
            response.put("list", list);
            return response;
        } catch(Exception ex) {
            System.err.println("Error fetching forecast from wttr.in: " + ex.getMessage());
            java.util.Map<String, Object> fallback = new java.util.HashMap<>();
            fallback.put("list", new java.util.ArrayList<>());
            return fallback;
        }
    }
}
