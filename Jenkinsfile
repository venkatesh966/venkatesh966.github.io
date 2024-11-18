pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:${PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Dependencies') {
            steps {
                script {
                    sh '''
                    # Remove "react-reveal" from dependencies
                    sed -i '' '/"react-reveal":/d' package.json
                    npm install
                    '''
                    sh 'npm install react-reveal --legacy-peer-deps'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('/Users/venkateshmorpoju/Downloads/venkatesh/aboutme') {
                    script {
                        sh 'npm run build'
                        sh 'ls -l build'
                    }
                }
            }
        }

        stage('Verify Node.js') {
            steps {
                sh 'which node'
                sh 'node -v'
            }
        }

        stage('Deploy') {
            steps {
                dir('/Users/venkateshmorpoju/Downloads/venkatesh/aboutme') {
                    script {
                        sh '''
                        # Stop any running server instances
                        if pgrep -f "node app.js" > /dev/null; then
                            echo "Stopping the Node.js server..."
                            pkill -f "node app.js"
                        fi

                        echo "Verifying node path..."
                        which node
                        node -v

                        if [ ! -f "app.js" ]; then
                            echo "app.js not found!"
                            exit 1
                        fi

                        echo "Starting the Node.js server..."
                        nohup node app.js > server.log 2>&1 & disown
                        
                        sleep 10

                        echo "Server logs:"
                        tail -n 20 server.log
                        '''
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    sh '''
                    echo "Checking if server is running..."
                    if pgrep -f "node app.js" > /dev/null; then
                        echo "Node.js server is running."
                    else
                        echo "Node.js server is NOT running!"
                        exit 1
                    fi
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
    }
}
