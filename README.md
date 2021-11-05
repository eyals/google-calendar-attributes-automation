# Google Calendar Event Attributes Automation

### Intro
This script allows you to automatically set some properties of an event based on the event title prefix.

For example (these are the examples in the code):
1. Event names that start with `*` mark personal time slots (e.g `* Lunch break`) \
These events:
    - will be colored in gray
    - will not pop the default 5 min reminder (unless I manually add reminders to it)
    
2. Events that start with `f:` are my focus time. These are time slots where I want to block meeting invites (e.g `f: strategy presentation`).
These events
    - will be colored in torquise
    - will also not show default reminders
    - will be private, since I don't want others to know what I am working on.

### Installing
1. Go to https://script.google.com
2. Click 'New Project'. A new file called `code.gs` should automatically be created, with an empty `myFunction` function.
3. Click the `Untitled project` in the header to rename it to `Google Calendar Event Attributes Automation` (or whatever name you want).
4. Delete everything in this file and paste the script from the `code.gs` in this repository
5. Click 'Save'
6. Click the `+` next to `Services` on the left side menu
7. In the dialog, select  `Google Calendar API` and click `Add`. You should now see `Calendar` appearing under `Services`.
8. Click 'Run'
9. In the dialog that opens, click `Review permissions`
10. Select your Google account
11. You might see a warning about the app not being verified. That is because YOU are the developer of the app and Google does not know you.
Click `Advanced` at the bottom, and `Go to (your project name)`
12. Click `Allow`

### Configuration

##### Calendar name
The calendar name is usually your Google email address. Try to use it as the value of `calName`. \
If that does not work, or if you want to run this on a calendar other than your primary one, then uncomment the line that starts with `let cals =`, and click `Run`.\
This with log all your calendar names at the bottom so you can copy it from there.\

##### Date range
When this script runs, it will not scan your entire calendar.\
Instead, it will look in the range that you specify.\
The configuration in `code.gs` suggest going 5 days backwards (from when the script is run) and 30 days forward.

##### Rules
This is the fun part.\
This is where you define the prefix for each rule, and the resulting attributes.\
The guidelines and options for each attribute is described in the code.

### Scheduling / Running
After you set up the rules, test it:\
Create an evant that starts with one of the given prefixes, and click `Run`.\
Within a few seconds, you should see the event being updated.\
If it works as expected, you can move on to scheduling.

You can schedule it to run every hour, but what works even better is to run it whenever you make a change to your calendar, which also means whenever you add a new event or changer an event name:
1. Click `Triggers` (clock icon) on the left side menu
2. Click `Add trigger` on the bottom right corner of the screen
3. Under `Select event source`, choose `From calendar`. 
4. Type the calendar owner email at the last field, and hit `Save`

That's it!\
Try it - create a new event starting with a given prefix, and see how in a few seconds it gets the configured attributes.
