#!/usr/bin/groovy

// Jenkins configuration
def defaultNode = "docker"

node(defaultNode)
{
    // We do a custom checkout to pull the submodules
    stage("Checkout")
    {
        checkout scm
    }

    // Build the Docker image for this service in order to run the tests
    stage("Build")
    {
        sh "docker build ultimaker/react-web-components:test ."
    }
}
