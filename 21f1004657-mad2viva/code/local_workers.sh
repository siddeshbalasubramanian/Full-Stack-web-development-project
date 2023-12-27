# /bin/sh
echo "===================================================================="
echo "Welcome to to the setup.this will setup the local virtual env."
echo "And then it will install all the the required python libaries"
echo "You can return this without any issues"
echo "--------------------------------------------------------------------"
if [ -d ".env" ];
then
    echo "Enabling virtual env"
else
    echo "No Virtual env. Please run setup.sh first"
    exit N
fi

.  .env/bin/activate
export ENV=development
celery -A  main.celery worker -l info
deactivate






