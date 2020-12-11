pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Create Backend Image') {
            steps {
                sh 'cd backend'
                sh 'docker build -t benlewsey27/react-weather-backend:1.0 .'
            }
        }
        stage('Push Images') {
            steps {
                sh 'docker push benlewsey27/react-weather-backend:1.0'
            }
        }
        stage('Clean Up') {
            steps {
                sh 'docker rmi benlewsey27/react-weather-backend:1.0'
            }
        }
    }
}