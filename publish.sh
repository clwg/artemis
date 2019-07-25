#!/bin/sh
WORKING_DIRECTORY="$PWD"

[ -z "$GITHUB_PAGES_REPO" ] && GITHUB_PAGES_REPO=forth-ics-inspire/artemis
[ -z "$GITHUB_PAGES_BRANCH" ] && GITHUB_PAGES_BRANCH=gh-pages
[ -z "$HELM_CHARTS_SOURCE" ] && HELM_CHARTS_SOURCE="$WORKING_DIRECTORY/"
[ -z "$HELM_VERSION" ] && HELM_VERSION=2.8.1

echo "GITHUB_PAGES_REPO=$GITHUB_PAGES_REPO"
echo "GITHUB_PAGES_BRANCH=$GITHUB_PAGES_BRANCH"
echo "HELM_CHARTS_SOURCE=$HELM_CHARTS_SOURCE"
echo "HELM_VERSION=$HELM_VERSION"

echo '>> Prepare...'
mkdir -p /tmp/helm/bin
mkdir -p /tmp/helm/publish

echo '>> Installing Helm...'
cd /tmp/helm/bin
wget "https://storage.googleapis.com/kubernetes-helm/helm-v${HELM_VERSION}-linux-amd64.tar.gz"
tar -zxf "helm-v${HELM_VERSION}-linux-amd64.tar.gz"
chmod +x linux-amd64/helm
alias helm=/tmp/helm/bin/linux-amd64/helm
helm version -c
helm init -c

echo ">> Checking out $GITHUB_PAGES_BRANCH branch from $GITHUB_PAGES_REPO"
cd /tmp/helm/publish
git clone "https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_PAGES_REPO.git" .
git checkout "$GITHUB_PAGES_BRANCH"
echo '>> Merging master...'
git merge master -X theirs
echo '>> Building chart...'
chart=artemis-chart
echo ">>> helm lint $chart"
helm lint -f other/example_values.yaml "$chart"
echo ">>> helm package $chart"
helm package "$chart"
echo '>>> helm repo index'
helm repo index . --url https://forth-ics-inspire.github.io/artemis

echo ">> Publishing to $GITHUB_PAGES_BRANCH branch of $GITHUB_PAGES_REPO"
git config user.email "$GITHUB_USER@users.noreply.github.com"
git config user.name SemaphoreCI
git add .
git status
git commit -m "Published by SemaphoreCI [skip ci]"
git push origin "$GITHUB_PAGES_BRANCH"