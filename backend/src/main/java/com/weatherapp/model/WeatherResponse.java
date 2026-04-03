package com.weatherapp.model;

public class WeatherResponse {
    private String cityName;
    private double temperature;
    private String weatherCondition;
    private int humidity;
    private double windSpeed;

    public WeatherResponse() {
    }

    public WeatherResponse(String cityName, double temperature, String weatherCondition, int humidity, double windSpeed) {
        this.cityName = cityName;
        this.temperature = temperature;
        this.weatherCondition = weatherCondition;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }

    // Getters and Setters
    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public String getWeatherCondition() {
        return weatherCondition;
    }

    public void setWeatherCondition(String weatherCondition) {
        this.weatherCondition = weatherCondition;
    }

    public int getHumidity() {
        return humidity;
    }

    public void setHumidity(int humidity) {
        this.humidity = humidity;
    }

    public double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(double windSpeed) {
        this.windSpeed = windSpeed;
    }
}
