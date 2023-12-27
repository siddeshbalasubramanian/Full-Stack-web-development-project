#! /bin/sh
echo "===================================================================="
echo "Welcome to to the setup.this will setup the local virtual env."
echo "And then it will install all the the required python libaries"
echo "You can return this without any issues"
echo "--------------------------------------------------------------------"
if [ -d ".env" ];
then
    echo " .env folder exists"
else
    echo "No Virtual env. Please run setup.sh first"
    python3.7 -m venv .env
fi

. .env/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

deactivate