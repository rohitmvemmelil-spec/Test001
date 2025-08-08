pipeline {
  agent {
    docker {
      image 'cypress/included:13.17.0'
      args '-u root:root'
    }
  }

  triggers {
    // Run daily at a hashed time per Jenkins best practice
    cron('H H * * *')
  }

  options {
    timestamps()
    ansiColor('xterm')
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timeout(time: 30, unit: 'MINUTES')
  }

  parameters {
    string(name: 'WEB_BASE_URL', defaultValue: 'https://example.com', description: 'Base URL for web tests (avoid 404s)')
  }

  environment {
    CI = '1'
    # Useful if you want to cache inside the workspace; docker image already has Cypress
    CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'node -v && npm -v'
        sh 'npm ci || npm install'
      }
    }

    stage('Run Cucumber API') {
      steps {
        sh 'mkdir -p cypress/results'
        sh "npx cypress run --reporter junit --reporter-options mochaFile=cypress/results/api-[hash].xml --spec 'cypress/e2e/features/api-users.feature'"
      }
    }

    stage('Run Cucumber Web (offline smoke)') {
      steps {
        sh "npx cypress run --reporter junit --reporter-options mochaFile=cypress/results/web-inline-[hash].xml --spec 'cypress/e2e/features/web-inline.feature'"
      }
    }

    stage('Run Traditional API Specs') {
      steps {
        sh "npx cypress run --reporter junit --reporter-options mochaFile=cypress/results/traditional-api-[hash].xml --spec 'cypress/e2e/api/**/*.cy.ts'"
      }
    }

    // If you have a live web app, you can enable this stage and pass WEB_BASE_URL
    stage('Run Traditional Web Specs (optional)') {
      when { expression { return params.WEB_BASE_URL && params.WEB_BASE_URL != '' } }
      steps {
        sh "npx cypress run --env webBaseUrl=${params.WEB_BASE_URL} --reporter junit --reporter-options mochaFile=cypress/results/traditional-web-[hash].xml --spec 'cypress/e2e/web/**/*.cy.ts'"
      }
    }
  }

  post {
    always {
      archiveArtifacts allowEmptyArchive: true, artifacts: 'cypress/screenshots/**, cypress/videos/**, cypress/reports/**, cypress/results/**'
      // If you install the Jenkins JUnit plugin, this will publish test results
      junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'
    }
  }
}


