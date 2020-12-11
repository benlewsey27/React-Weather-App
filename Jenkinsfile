pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Prepare') {
            steps {
                'cd backend && npm install'
            }
        },
        stage('Test') {
            steps {
                'npm run test'
            }
        }
    }
}