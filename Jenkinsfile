pipeline {
    agent {
        docker { image 'docker:dind' }
    }
    stages {
        stage('Create Backend Image') {
            steps {
                sh 'docker images'
            }
        }
    }
}