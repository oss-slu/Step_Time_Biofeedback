# Step Time Biofeedback

### Setting Up and Using a Python Virtual Environment (venv)
This section is to outline the process of setting up a virtual enviornment (venv) for the STEP_TIME_BIOFEEDBACK project. Note: this process will vary depending on the operating system you are using so ensure you navigate based on which operating system you're working on.

#### Setting up the Virtual Enviornment
First ensure you have python installed on your local computer. If you have python installed one of the following commands should return the specific version of python you have:
```
python --version
```

<br />

After make sure you have the virtualenv package installed with the following command:
```
pip install virtualenv
```
or 
```
# if pip doesn't work you may have to specify version 
# if you had python3 you would do pip3 install virtualenv
pip<version> install virtualenv
```
where version is the number that corresponds to the version of python you have.

<br />

After installing virtualenv we can run the following command to create your new virtual enviornment called env:
```
virtualenv env
```
and a folder should be created called env in your root project directory.

#### Activating the Virtual Enviornment

Before activating the virtual enviornment ensure you are in the root project directory STEP_TIME_BIOFEEDBACK. 

###### Mac/Linux
To activate the virtual enviornment on MacOS or Linux use the source command as follows:
```
$ source env/bin/activate
``` 

###### Windows 
To activate the virtual enviornment on Windows the commands differ depending if you're using Powershell or cmd.exe, specified below:

```
# For cmd.exe
env/Scripts/activate.bat

# For Powershell
env/Scripts/Activate.ps1
```

<br />

If your virtual enviornment is activated you should see the following all the way the left in your terminal:
```
(env)
```

<br />

After activating your virtual enviornment make you should make sure you have the correct dependencies installed. Ensure your virtual enviornment is activated when running the following command to install the correct dependences from the requirements.txt file:

<br />

*Reminder: Ensure your virtual enviornment is activated before installing your dependencies. Otherwise, they will be installed globally, not inside the virtual enviornment*

```
pip install -r requirements.txt
```
or
```
# if pip doesn't work you may have to specify version
pip<version> install -r requirements.txt
```

<br />

If you need to undo the global installation you can unistall the dependencies that were unstalled globally using the following command:

```
pip uninstall -r requirements.txt
```
or
```
# if pip doesn't work you may have to specify version
pip<version> uninstall -r requirements.txt
```

#### Deactivating the Virtual Enviornment

To deactive the virtual enviornment type deactivate in your terminal like below:
```
deactivate
```

#### Updating requirements.txt

If you install dependencies and need to update the requirements.txt file you can either manually update it in the requirements.txt file or you can use the command below:

However, be very careful when using the following command as it will override anything currently in the requirements.txt file.
```
pip freeze < requirements.txt
```
or 
```
# if pip doesn't work you may have to specify version 
pip<version> freeze < requirements.txt
```

#### .gitignore

Please ensure that you don't remove env/ from the gitignore file so you don't push your local virtual enviornment to the repository.

### Setting Up and Testing Websockets
## Setting up the Websockets
1. Make 2 termials, for each termial make sure you are in your virtual env and have the requirments installed (if not look at the section in the README that tells you how to do this)
2. On one termial cd into backend
3. In the backend termial run <code>uvicorn main:app —reload</code>
4. On the other termial cd into frontend
5. Run <code>npm start</code>
6. You will see messages in the backend terminal that the react app is connected

## Running Backend Unit Tests in virtual env
1. Make sure you are in your virtual env and have the requirments installed (if not look at the section in the README that tells you how to do this)
2. Cd into backed
3. Run <code>python -m pytest -s -v websocketUnitTests.py</code>

## Running Frontend Unit Tests in virtual env
1. Make sure you are in your virtual env and have the requirments installed (if not look at the section in the README that tells you how to do this)
2. Cd into frontend
3. Run <code>npm test</code>