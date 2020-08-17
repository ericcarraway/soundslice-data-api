username_expected="ericcarraway"
username_actual=$(npm whoami)

registry_expected="https://registry.npmjs.org/"
registry_actual=$(npm config get registry)

# verify that I'm logged in to the correct account
if [ "$username_actual" != $username_expected ]; then
  echo "publish.sh must be run as user: $username_expected"
  echo "you are currently $username_actual"

  exit 255
fi

# verify that I'm using the correct registry
if [ "$registry_actual" != $registry_expected ]; then
  echo "publish.sh must be run with registry: $registry_expected"
  echo "your current registry is $registry_actual"

  exit 255
fi

echo "OK"

# because the repository has a scope,
# we need to slightly adjust
# the `npm publish` command
npm publish --access public
