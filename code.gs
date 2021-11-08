/*
Scans event titles for a specific keywords and changes the event attributes
*/

function myFunction() {
 
  // =========== GETTING CALENDAR NAME =================
 
 //Uncomment the next line to get calendar names. Comment it back when done
 //let cals = CalendarApp.getAllCalendars(); for(let c in cals){Logger.log(cals[c].getName())}; return; 

  // =========== CONFIGURATION =================
 
  let calName = "john.smith@gmail.com"; //The name of the calendar to modify. See 'GETTING CALENDAR NAMES' above
  daysBackwards = 5; daysForward = 30; // The date range for scanning for events whenever the script runs

/*
Each rule allows you to define:
- prefix - The event prefix to look for. case insensitive. Searches in the beginning of the event title
- colorId - The desired event color. 1:blue, 2:green, 3:purple, 4:red, 5:yellow, 6:orange, 7:torquise, 8:gray, 9:bold blue
- visibility - "private" or "public" (or remove to keep default)
- reminders - Whether to keep the default reminders. If false, you can still add manual reminders to events.
*/
  let rules = [
    {
      "prefix":"*",
      "colorId":8,
      "reminders":false,
    },
    {
      "prefix":"f:",
      "colorId":7,
      "visibility":"private",
      "reminders":false,
    },
  ]

  // =========== END OF CONFIGURATION =================
  
  let calId = CalendarApp.getCalendarsByName(calName)[0].getId(); //Finds the calendar in your calendars based on the calName configured above
  
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBackwards);
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + daysForward);

  let optionalArgs = {
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: 'startTime'
  };
 
  // calls the Calendar API to get events that match the criteria above
  let service = Calendar.Events;
  let response = Calendar.Events.list(calId, optionalArgs); 
  let events = response.items;

  for (let v = 0; v < events.length; v++) { // Loops through all the events found   

    for (let r=0; r < rules.length; r++){ // Loops through all of your rules

      if (events[v].summary.toLowerCase().indexOf(rules[r].prefix.toLowerCase()) == 0){ // Checks each event to see if it matches any rule prefix 

        Logger.log(events[v].summary); //Prints the list of matching events
       
        //changing the event properties as configured in the rules
        if (rules[r].colorId!=undefined)      events[v].colorId =               rules[r].colorId; 
        if (rules[r].reminders!=undefined)    events[v].reminders.useDefault =  rules[r].reminders;
        if (rules[r].visibility!=undefined)   events[v].visibility =            rules[r].visibility;
        
        try{ 
          service.update(events[v], calId, events[v].id); //Updates the event on your calendar
        }
        catch(e){
          Logger.log(e); //Prints errors, if any found
        }
      }

    }
    
  }
}
