 pipeline {
    agent none
    environment {
		DOCKERHUB_CREDENTIALS=credentials('abdelhalim97')
	}
    stages {
        stage('Init') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
        stage('Build nest') {
            agent any
            when{
                changeset "**/nest/*.*"
                beforeAgent true
            }
            steps {
                dir('nest'){
                    sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/nest:$BUILD_ID .'
                    sh 'docker push $DOCKERHUB_CREDENTIALS_USR/nest:$BUILD_ID .'
                    // sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/nest:$BUILD_ID .'
                }
            }
        }
        stage('Build react') {
            agent any
            when{
                changeset "**/react/*.*"
                beforeAgent true
            }
            steps {
                dir('front'){
                    sh 'docker build -t $DOCKERHUB_CREDENTIALS_USR/react:$BUILD_ID .'
                    sh 'docker push $DOCKERHUB_CREDENTIALS_USR/react:$BUILD_ID .'
                    // sh 'docker rmi $DOCKERHUB_CREDENTIALS_USR/react:$BUILD_ID .'
                }
            }
        }
    }
}