# Changelog

## [0.1.0]

### Frontend
- Add basic cards for getting weather data from a specific city
- Add delete button to remove specific card
- Use Nginx Reverse Proxy to communicate to BE API
- Update Dockerfile to allow nginx template environment variable substitution
- Update nginx.conf to get BE request URL at request time (prevent boot issue with BE host not found)

### Backend
- Add initial API structure
- Add /api/get-temp/:city endpoint
- Add /health endpoint
- Add basic debug logging
- Rewrite backend using Go
- Change get-temp endpoint to return temp to 1dp
- Remove healthcheck log
- Fix OpenWeatherMap request by removing newline from url
- Improve error handling around failed OpenWeatherMap responses
