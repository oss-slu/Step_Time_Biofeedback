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
```
pip install -r requirements.txt
```
or
```
# if pip doesn't work you may have to specify version
pip<version> install -r requirements.txt
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