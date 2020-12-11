pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Create Images') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Push Images') {
            steps {
                sh 'docker push benlewsey27/react-weather-backend:1.0'
                sh 'docker push benlewsey27/react-weather-frontend:1.0'
            }
        }
        stage('Clean Up') {
            steps {
                sh 'docker rmi benlewsey27/react-weather-backend:1.0'
                sh 'docker rmi benlewsey27/react-weather-frontend:1.0'
            }
        }
    }
}